import { useState, useEffect, useRef } from 'react';
import { Square, Play, Pause, Timer } from 'lucide-react';

interface Test1600TrackingProps {
  onFinish: (data: { distance: number; time: number; pace: string }) => void;
  onCancel: () => void;
}

export function Test1600Tracking({ onFinish, onCancel }: Test1600TrackingProps) {
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [distance, setDistance] = useState(0);
  const [currentPace, setCurrentPace] = useState('--:--');
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const timerRef = useRef<number | null>(null);
  const watchIdRef = useRef<number | null>(null);
  const lastPositionRef = useRef<GeolocationPosition | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  const TARGET_DISTANCE = 1600; // 1.6 km
  const TEST_DURATION = 10; // 10 seconds for testing (MOCK for development)

  // Calculate pace from speed (m/s to min/km)
  const calculatePace = (speed: number): string => {
    if (speed <= 0) return '--:--';
    const paceMinPerKm = 1000 / (speed * 60);
    const minutes = Math.floor(paceMinPerKm);
    const seconds = Math.round((paceMinPerKm - minutes) * 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Format time (seconds to MM:SS)
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate distance between two coordinates
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
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

  // GPS tracking
  useEffect(() => {
    if (!isStarted || isPaused || showCompletionModal) return;

    if (!navigator.geolocation) {
      // Fallback: simulate tracking
      const simulationInterval = setInterval(() => {
        setDistance((prev) => prev + 8);
        setCurrentPace('5:15');
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
  }, [isStarted, isPaused, showCompletionModal]);

  // Timer
  useEffect(() => {
    if (isStarted && !isPaused && !showCompletionModal) {
      timerRef.current = window.setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isStarted, isPaused, showCompletionModal]);

  // Effect 1: Detect completion condition
  useEffect(() => {
    if (isStarted && !isPaused && !showCompletionModal) {
      // Check if 10 seconds elapsed OR distance reached
      if (elapsedTime >= TEST_DURATION || distance >= TARGET_DISTANCE) {
        // Stop tracking immediately
        if (timerRef.current) clearInterval(timerRef.current);
        if (watchIdRef.current !== null) {
          navigator.geolocation.clearWatch(watchIdRef.current);
        }
        
        // Show completion modal
        setShowCompletionModal(true);
      }
    }
  }, [elapsedTime, distance, isStarted, isPaused, showCompletionModal]);

  // Effect 2: Handle post-completion navigation
  useEffect(() => {
    if (showCompletionModal) {
      // After 5 seconds, proceed to next screen
      const timeoutId = window.setTimeout(() => {
        // Calculate final pace
        const finalPace = calculatePace(distance / (elapsedTime || 1)); // Avoid division by zero
        
        onFinish({
          distance,
          time: elapsedTime,
          pace: finalPace,
        });
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [showCompletionModal]);

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

  const progressPercentage = Math.min((distance / TARGET_DISTANCE) * 100, 100);

  // Initial screen
  if (!isStarted) {
    return (
      <div className="fixed inset-0 z-[60] bg-white flex flex-col h-[100dvh] w-full items-center justify-center px-6">
        <div className="max-w-md mx-auto text-center w-full">
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto rounded-full bg-red-50 flex items-center justify-center shadow-sm">
              <Timer size={48} className="text-[#E53935]" />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-gray-900 mb-2 text-2xl font-bold">Teste de 1600m</h2>
            <p className="text-gray-600 text-sm max-w-xs mx-auto">
              Corra 1,6 km o mais rápido possível. Este é um teste de performance - dê o seu melhor!
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 mb-12 border border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">Distância do teste</span>
              <span className="text-gray-900 text-xl font-bold">1,6 km</span>
            </div>
          </div>

          <button
            onClick={handleStart}
            className="w-full py-5 rounded-2xl bg-[#E53935] text-white hover:bg-[#D32F2F] active:scale-[0.98] flex items-center justify-center gap-3 transition-all touch-manipulation shadow-lg shadow-red-500/20"
          >
            <Play size={24} fill="white" />
            <span className="text-lg font-bold">INICIAR TESTE</span>
          </button>
        </div>
      </div>
    );
  }

  // Running screen - NO SCROLL, all above the fold
  return (
    <div className="fixed inset-0 z-[60] bg-white flex flex-col h-dvh w-full">
      {/* Top Section - Progress */}
      <div className="flex-shrink-0 px-6 pt-safe pb-4 bg-white border-b border-gray-100 mt-2">
        <div className="max-w-md mx-auto w-full">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-900 font-bold">Teste de 1600m</h3>
            {isPaused && (
              <div className="bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-bold">
                Pausado
              </div>
            )}
          </div>
          
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#E53935] to-[#FFB300] transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-xs text-gray-500 font-medium">{(distance / 1000).toFixed(2)} km</span>
            <span className="text-xs text-gray-500 font-medium">1,6 km</span>
          </div>
        </div>
      </div>

      {/* Main Content - Centered, No Scroll */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-md mx-auto w-full">
          {/* Primary Stats - Large Display */}
          <div className="text-center mb-8">
            {/* Distance - Most Important */}
            <div className="mb-6">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-bold">Distância</p>
              <p className="text-7xl text-gray-900 leading-none tracking-tight font-bold">
                {(distance / 1000).toFixed(2)}
              </p>
              <p className="text-gray-500 mt-1 font-medium">km</p>
            </div>

            {/* Time - Second Most Important */}
            <div className="mb-6">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-bold">Tempo</p>
              <p className="text-6xl text-gray-900 leading-none tracking-tight font-mono font-medium">
                {formatTime(elapsedTime)}
              </p>
            </div>

            {/* Current Pace - Optional Reference */}
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-bold">Pace Atual</p>
              <p className="text-4xl text-gray-600 leading-none tracking-tight font-mono">
                {currentPace}
              </p>
              <p className="text-gray-400 text-sm mt-1 font-medium">min/km</p>
            </div>
          </div>
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
            <span>Cancelar Teste</span>
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

          <p className="text-center text-xs text-gray-500 mt-3 font-medium">
            O teste finalizará automaticamente em 1,6 km
          </p>
        </div>
      </div>

      {/* Completion Modal - Overlay */}
      {showCompletionModal && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center px-6 z-[70] animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-in zoom-in duration-300">
            <div className="text-center">
              {/* Success Icon */}
              <div className="relative mb-6">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center animate-in zoom-in duration-500 shadow-lg shadow-green-500/30">
                  <svg
                    className="w-12 h-12 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-28 rounded-full bg-green-400/20 animate-ping"></div>
              </div>

              {/* Message */}
              <h3 className="text-gray-900 mb-2 text-xl font-bold">Teste Concluído!</h3>
              <p className="text-gray-600 mb-6 font-medium">
                Excelente trabalho! Vamos analisar seu desempenho e criar seu treino personalizado.
              </p>

              {/* Stats Summary */}
              <div className="bg-gray-50 rounded-2xl p-4 mb-6 border border-gray-100">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-xs mb-1 font-bold uppercase tracking-wider">Distância</p>
                    <p className="text-gray-900 font-bold text-lg">{(distance / 1000).toFixed(2)} km</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-1 font-bold uppercase tracking-wider">Tempo</p>
                    <p className="text-gray-900 font-bold text-lg">{formatTime(elapsedTime)}</p>
                  </div>
                </div>
              </div>

              {/* Loading indicator */}
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-[#E53935] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-[#E53935] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-[#E53935] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <p className="text-gray-500 text-xs mt-3 font-medium">Preparando próximos passos...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
