import { useState, useEffect, useRef } from 'react';
import { Square, Play, Pause, CheckCircle, ArrowUp, ArrowDown, Minus } from 'lucide-react';

interface WorkoutBlock {
  distance: number; // em metros
  pace: string; // formato "5:30"
  description: string; // ex: "1 km pace 6:00" ou "4x 400m pace 4:40"
}

interface WorkoutTrackingProps {
  workoutName: string;
  blocks: WorkoutBlock[];
  onFinish: (data: { totalDistance: number; totalTime: number }) => void;
  onCancel: () => void;
}

export function WorkoutTracking({ workoutName, blocks, onFinish, onCancel }: WorkoutTrackingProps) {
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [distance, setDistance] = useState(0);
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [currentPace, setCurrentPace] = useState('--:--');

  const timerRef = useRef<number | null>(null);
  const watchIdRef = useRef<number | null>(null);
  const lastPositionRef = useRef<GeolocationPosition | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const blockStartDistanceRef = useRef<number>(0);

  const currentBlock = blocks[currentBlockIndex];
  const totalDistance = blocks.reduce((acc, block) => acc + block.distance, 0);
  const completedDistance = blocks.slice(0, currentBlockIndex).reduce((acc, block) => acc + block.distance, 0);
  const blockProgress = distance - blockStartDistanceRef.current;

  // Calculate pace from speed
  const calculatePace = (speed: number): string => {
    if (speed <= 0) return '--:--';
    const paceMinPerKm = 1000 / (speed * 60);
    const minutes = Math.floor(paceMinPerKm);
    const seconds = Math.round((paceMinPerKm - minutes) * 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Format time
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate distance
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  // Compare pace
  const getPaceComparison = (): 'faster' | 'slower' | 'equal' | 'none' => {
    if (!currentBlock || currentPace === '--:--') return 'none';
    
    const [targetMin, targetSec] = currentBlock.pace.split(':').map(Number);
    const [currentMin, currentSec] = currentPace.split(':').map(Number);
    
    const targetSeconds = targetMin * 60 + targetSec;
    const currentSeconds = currentMin * 60 + currentSec;
    
    const diff = Math.abs(targetSeconds - currentSeconds);
    
    if (diff <= 3) return 'equal';
    return currentSeconds < targetSeconds ? 'faster' : 'slower';
  };

  // GPS tracking
  useEffect(() => {
    if (!isStarted || isPaused) return;

    if (!navigator.geolocation) {
      const simulationInterval = setInterval(() => {
        setDistance((prev) => prev + 10);
        setCurrentPace('5:30');
      }, 1000);
      return () => clearInterval(simulationInterval);
    }

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 1000,
    };

    const handleSuccess = (position: GeolocationPosition) => {
      if (lastPositionRef.current) {
        const dist = calculateDistance(
          lastPositionRef.current.coords.latitude,
          lastPositionRef.current.coords.longitude,
          position.coords.latitude,
          position.coords.longitude
        );

        if (dist > 0 && dist < 100) {
          setDistance((prev) => prev + dist);
        }

        if (position.coords.speed && position.coords.speed > 0) {
          setCurrentPace(calculatePace(position.coords.speed));
        }
      }
      lastPositionRef.current = position;
    };

    const handleError = () => {};

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options);
    watchIdRef.current = navigator.geolocation.watchPosition(handleSuccess, handleError, options);

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, [isStarted, isPaused]);

  // Timer
  useEffect(() => {
    if (isStarted && !isPaused) {
      timerRef.current = window.setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isStarted, isPaused]);

  // Check block completion and auto-advance
  useEffect(() => {
    if (!isStarted || isPaused) return;

    const blockEndDistance = completedDistance + currentBlock.distance;
    
    if (distance >= blockEndDistance) {
      // Block completed, move to next
      if (currentBlockIndex < blocks.length - 1) {
        setCurrentBlockIndex(prev => prev + 1);
        blockStartDistanceRef.current = distance;
      } else {
        // All blocks completed
        setTimeout(() => {
          handleFinish();
        }, 500);
      }
    }
  }, [distance, isStarted, isPaused]);

  const handleStart = () => {
    startTimeRef.current = Date.now();
    setIsStarted(true);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
    if (!isPaused) {
      startTimeRef.current = Date.now() - elapsedTime * 1000;
    }
  };

  const handleFinish = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }
    
    onFinish({
      totalDistance: distance,
      totalTime: elapsedTime,
    });
  };

  const progressPercentage = Math.min((distance / totalDistance) * 100, 100);
  const blockProgressPercentage = Math.min((blockProgress / currentBlock.distance) * 100, 100);
  const paceComparison = getPaceComparison();

  // Initial screen
  if (!isStarted) {
    return (
      <div className="fixed inset-0 z-[60] bg-white flex flex-col h-[100dvh] w-full items-center justify-center">
        {/* Scrollable Content Wrapper */}
        <div className="flex-1 w-full overflow-y-auto overflow-x-hidden scroll-smooth bg-white scrolling-touch flex items-center justify-center">
          <div className="min-h-full max-w-md mx-auto w-full px-6 py-8 flex flex-col justify-center">
            <div className="text-center mb-8">
              <h2 className="text-gray-900 mb-2 text-2xl font-bold">{workoutName}</h2>
              <p className="text-gray-600 text-sm font-medium">
                Treino com {blocks.length} bloco{blocks.length > 1 ? 's' : ''}
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-5 mb-8 space-y-3 border border-gray-100">
              {blocks.map((block, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                  <span className="text-gray-600 text-sm font-medium">{block.description}</span>
                  <span className="text-gray-900 font-bold text-sm">{block.pace}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleStart}
              className="w-full py-5 rounded-2xl bg-[#E53935] text-white hover:bg-[#D32F2F] active:scale-[0.98] flex items-center justify-center gap-3 transition-all touch-manipulation shadow-lg shadow-red-500/20"
            >
              <Play size={24} fill="white" />
              <span className="text-lg font-bold">INICIAR TREINO</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Running screen - NO SCROLL, compact layout
  return (
    <div className="fixed inset-0 z-[60] bg-white flex flex-col h-dvh w-full">
      {/* Top Section - Progress */}
      <div className="flex-shrink-0 px-6 pt-safe pb-4 bg-white border-b border-gray-100 mt-2">
        <div className="max-w-md mx-auto w-full">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-gray-900 font-bold text-lg leading-tight">{workoutName}</h3>
              <p className="text-xs text-gray-500 font-medium">Bloco {currentBlockIndex + 1} de {blocks.length}</p>
            </div>
            {isPaused && (
              <div className="bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-bold">
                Pausado
              </div>
            )}
          </div>
          
          {/* Overall Progress */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-gray-600 font-medium">Progresso Total</span>
              <span className="text-xs text-gray-900 font-bold">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#E53935] to-[#FFB300] transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Block Progress */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-gray-600 font-medium">Bloco Atual</span>
              <span className="text-xs text-gray-900 font-bold">{Math.round(blockProgressPercentage)}%</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#E53935] transition-all duration-300"
                style={{ width: `${blockProgressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Centered, No Scroll */}
      <div className="flex-1 flex items-center justify-center px-6 py-4">
        <div className="max-w-md mx-auto w-full">
          {/* Primary Stats - Hierarchical */}
          <div className="text-center mb-6">
            {/* Pace Atual - Most Important */}
            <div className="mb-6">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-bold">Pace Atual</p>
              <div className="flex items-center justify-center gap-3">
                <p className="text-7xl text-gray-900 leading-none tracking-tight font-mono font-medium">
                  {currentPace.split(':')[0]}
                  <span className="text-gray-400">:</span>
                  {currentPace.split(':')[1]}
                </p>
                {paceComparison !== 'none' && (
                  <div>
                    {paceComparison === 'faster' && (
                      <div className="bg-green-100 text-green-700 p-2 rounded-lg">
                        <ArrowUp size={24} strokeWidth={3} />
                      </div>
                    )}
                    {paceComparison === 'slower' && (
                      <div className="bg-red-100 text-red-700 p-2 rounded-lg">
                        <ArrowDown size={24} strokeWidth={3} />
                      </div>
                    )}
                    {paceComparison === 'equal' && (
                      <div className="bg-blue-100 text-blue-700 p-2 rounded-lg">
                        <Minus size={24} strokeWidth={3} />
                      </div>
                    )}
                  </div>
                )}
              </div>
              <p className="text-gray-500 text-sm mt-1 font-medium">min/km</p>
            </div>

            {/* Distance & Time - Secondary */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-bold">Distância</p>
                <p className="text-4xl text-gray-900 leading-none tracking-tight font-bold">
                  {(distance / 1000).toFixed(2)}
                </p>
                <p className="text-gray-400 text-xs mt-1 font-medium">km</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-bold">Tempo</p>
                <p className="text-4xl text-gray-900 leading-none tracking-tight font-mono font-medium">
                  {formatTime(elapsedTime)}
                </p>
              </div>
            </div>
          </div>

          {/* Current Block Goal - Below */}
          <div className="bg-gradient-to-br from-[#E53935] to-[#B71C1C] rounded-2xl p-4 text-white shadow-lg shadow-red-500/10">
            <p className="text-xs text-white/70 uppercase tracking-wider mb-2 font-bold">Objetivo Atual</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold">{currentBlock.description}</p>
                <p className="text-white/90 text-sm font-medium">Pace alvo: {currentBlock.pace} min/km</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{(currentBlock.distance / 1000).toFixed(2)}</p>
                <p className="text-white/80 text-xs font-medium">km</p>
              </div>
            </div>
          </div>

          {/* Completed Blocks */}
          {currentBlockIndex > 0 && (
            <div className="mt-4 space-y-2 hidden sm:block">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Concluídos</p>
              {blocks.slice(0, currentBlockIndex).map((block, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>{block.description}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Controls - Fixed */}
      <div className="flex-shrink-0 px-6 py-5 pb-safe border-t border-gray-100 bg-white">
        <div className="max-w-md mx-auto w-full">
          <button
            onClick={onCancel}
            className="w-full bg-gray-100 text-gray-900 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 active:scale-[0.98] transition-all touch-manipulation mb-3 font-medium"
          >
            <Square size={20} />
            <span>Cancelar Treino</span>
          </button>

          <button
            onClick={handlePause}
            className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all touch-manipulation font-bold shadow-lg ${
              isPaused 
                ? 'bg-[#E53935] text-white hover:bg-[#D32F2F] shadow-red-500/20'
                : 'bg-amber-500 text-white hover:bg-amber-600 shadow-amber-500/20'
            }`}
          >
            {isPaused ? (
              <>
                <Play size={20} fill="white" />
                <span>Retomar</span>
              </>
            ) : (
              <>
                <Pause size={20} />
                <span>Pausar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
