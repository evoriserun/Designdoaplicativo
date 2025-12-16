import { useState, useEffect, useRef } from 'react';
import { Square, Play, Pause, MapPin, Timer, Zap, CheckCircle2, Award, AlertTriangle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import svgPaths from '../imports/svg-x5tyicock6';

interface Test1600TrackingProps {
  onFinish: (data: { distance: number; time: number; pace: string }) => void;
  onCancel: () => void;
}

interface WorkoutBlock {
  distance: number;
  pace: string;
  description: string;
  type?: 'warmup' | 'active' | 'rest' | 'cooldown';
}

export function Test1600Tracking({ onFinish, onCancel }: Test1600TrackingProps) {
  // State for the flow: 'warmup' -> 'countdown' -> 'tracking' -> 'finished'
  const [viewState, setViewState] = useState<'warmup' | 'countdown' | 'tracking'>('warmup');
  const [countdown, setCountdown] = useState(5);
  
  // Warmup specific state
  const [warmupVideoCompleted, setWarmupVideoCompleted] = useState(false);
  const [isPlayingWarmup, setIsPlayingWarmup] = useState(false);

  // Tracking States
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [distance, setDistance] = useState(0);
  const [currentPace, setCurrentPace] = useState('--:--');
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  
  // For the Carousel (Single block for 1600m test, but reusing structure for consistency)
  const blocks: WorkoutBlock[] = [
    { distance: 1600, pace: 'Max', description: 'Teste Máximo 1600m', type: 'active' }
  ];
  // We can inject a dummy block for Warmup in the visual strip if we want, but logic handles it separately
  
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);

  const timerRef = useRef<number | null>(null);
  const watchIdRef = useRef<number | null>(null);
  const lastPositionRef = useRef<GeolocationPosition | null>(null);
  const startTimeRef = useRef<number>(0);
  const blockStartTimeRef = useRef<number>(0);
  
  const currentDistanceRef = useRef(0);
  useEffect(() => { currentDistanceRef.current = distance; }, [distance]);

  const currentBlock = blocks[0];
  
  const distanceInCurrentBlock = Math.max(0, distance);
  const remainingInBlock = Math.max(0, currentBlock.distance - distanceInCurrentBlock);
  const blockProgressPercentage = Math.min((distanceInCurrentBlock / currentBlock.distance) * 100, 100);

  // COUNTDOWN LOGIC
  useEffect(() => {
    if (viewState === 'countdown') {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        handleStartTracking();
      }
    }
  }, [viewState, countdown]);

  // DEMO AUTO-FINISH (Only in tracking mode)
  useEffect(() => {
    if (viewState !== 'tracking' || isPaused || showFinishModal) return;

    // Finish automatically after ~30 seconds for demo purposes or when distance reached
    // Real implementation would rely on GPS distance
    if (distance >= 1600) {
      handleFinish();
    }
  }, [viewState, isPaused, showFinishModal, distance]);

  // GPS & TIMER LOGIC
  useEffect(() => {
    if (viewState !== 'tracking' || isPaused) return;

    timerRef.current = window.setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);

    // SIMULAÇÃO ACELERADA (DEMO)
    const isDemoMode = true;

    if (isDemoMode || !navigator.geolocation) {
      const sim = setInterval(() => {
        setDistance(d => d + 83.5); // ~1km em 12s
        setCurrentPace('0:45'); // Pace sobre-humano para demo
      }, 1000);
      return () => {
        clearInterval(sim);
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }

    const options = { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 };
    const handleSuccess = (position: GeolocationPosition) => {
      if (lastPositionRef.current) {
        const dist = calculateDistance(
          lastPositionRef.current.coords.latitude,
          lastPositionRef.current.coords.longitude,
          position.coords.latitude,
          position.coords.longitude
        );
        if (dist > 0 && dist < 100) setDistance(d => d + dist);
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
      if (timerRef.current) clearInterval(timerRef.current);
      if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current);
    };
  }, [viewState, isPaused]);

  // ACTIONS
  const handleStartWarmup = () => {
    setIsPlayingWarmup(true);
    // Simulate video playing for 3 seconds then complete
    setTimeout(() => {
        setWarmupVideoCompleted(true);
        setIsPlayingWarmup(false);
    }, 3000);
  };

  const handleStartCountdown = () => {
    setCountdown(5);
    setViewState('countdown');
  };

  const handleStartTracking = () => {
    setViewState('tracking');
    startTimeRef.current = Date.now();
    blockStartTimeRef.current = Date.now();
    setIsPaused(false);
  };

  const handleFinish = () => {
      setIsPaused(true);
      setShowFinishModal(true);
  };
  
  const handleCancelClick = () => {
      setIsPaused(true);
      setShowCancelModal(true);
  };
  
  const confirmCancel = () => {
      setShowCancelModal(false);
      onCancel();
  };
  
  const dismissCancel = () => {
      setShowCancelModal(false);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
    if (!isPaused) {
      startTimeRef.current = Date.now() - elapsedTime * 1000;
    }
  };

  const calculatePace = (speed: number) => {
    if (speed <= 0) return '--:--';
    const paceMinPerKm = 1000 / (speed * 60);
    const min = Math.floor(paceMinPerKm);
    const sec = Math.round((paceMinPerKm - min) * 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3;
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;
    const a = Math.sin(Δφ/2)*Math.sin(Δφ/2) + Math.cos(φ1)*Math.cos(φ2)*Math.sin(Δλ/2)*Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // --- RENDER ---

  // 1. WARMUP SCREEN
  if (viewState === 'warmup') {
    return (
      <div className="bg-white relative h-dvh w-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="pt-safe px-6 pb-4 border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-900">Aquecimento</h1>
          <p className="text-sm text-gray-500">Prepare-se para o teste</p>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col">
            {/* Instruction Card */}
            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 mb-6">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Zap size={20} className="text-amber-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-amber-900 text-lg mb-2">Aquecimento Sugerido</h3>
                        <p className="text-amber-800 text-sm leading-relaxed">
                           Para obter o melhor resultado no teste de 1.600m, é crucial estar aquecido. Siga o vídeo rápido abaixo.
                        </p>
                    </div>
                </div>
            </div>

            {/* Video Placeholder */}
            <div className="w-full aspect-video bg-gray-900 rounded-2xl overflow-hidden relative shadow-lg mb-8 group cursor-pointer" onClick={handleStartWarmup}>
                {!isPlayingWarmup && !warmupVideoCompleted && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-transform group-active:scale-95">
                            <Play size={32} fill="white" className="text-white ml-1" />
                        </div>
                    </div>
                )}
                {isPlayingWarmup && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-white font-medium animate-pulse">Reproduzindo vídeo...</p>
                    </div>
                )}
                {warmupVideoCompleted && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
                        <CheckCircle2 size={48} className="text-green-400 mb-3" />
                        <p className="text-white font-bold">Aquecimento Concluído</p>
                    </div>
                )}
                
                {/* Simulated Seek Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
                    <div 
                        className="h-full bg-amber-500 transition-all duration-[3000ms] ease-linear"
                        style={{ width: isPlayingWarmup ? '100%' : warmupVideoCompleted ? '100%' : '0%' }}
                    />
                </div>
            </div>

            {/* Action Button */}
            <div className="mt-auto">
                <button 
                    onClick={warmupVideoCompleted ? handleStartCountdown : handleStartWarmup}
                    className={`w-full py-5 rounded-2xl flex items-center justify-center gap-3 font-bold text-lg shadow-lg active:scale-[0.98] transition-all ${
                        warmupVideoCompleted 
                        ? 'bg-[#E53935] text-white shadow-red-500/30' 
                        : 'bg-amber-500 text-white shadow-amber-500/30'
                    }`}
                >
                    {warmupVideoCompleted ? (
                        <>
                           <span>COMEÇAR TESTE</span>
                           <Play size={24} fill="white" />
                        </>
                    ) : (
                        <>
                           <Play size={24} fill="white" />
                           <span>INICIAR AQUECIMENTO</span>
                        </>
                    )}
                </button>
                {!warmupVideoCompleted && (
                    <button onClick={handleStartCountdown} className="w-full py-4 text-gray-400 text-sm font-medium mt-2">
                        Pular aquecimento
                    </button>
                )}
            </div>
        </div>
      </div>
    );
  }

  // 2. COUNTDOWN OVERLAY
  if (viewState === 'countdown') {
    return (
      <div className="bg-[#E53935] fixed inset-0 z-[70] flex flex-col items-center justify-center">
        <motion.div
          key={countdown}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="relative"
        >
           <span className="text-[180px] font-black text-white leading-none tracking-tighter">
             {countdown}
           </span>
        </motion.div>
        <p className="text-white/80 text-xl font-bold mt-4 uppercase tracking-widest animate-pulse">
           Prepare-se
        </p>
      </div>
    );
  }

  // 3. MAIN TRACKING UI (SIMPLIFIED FOR TEST)
  return (
    <div className="fixed inset-0 z-[60] bg-gray-50 flex flex-col h-dvh w-full overflow-hidden">
      
      {/* HEADER: Block Swimlane (Horizontal Tape) */}
      <div className="h-[140px] bg-white border-b border-gray-100 flex flex-col shadow-sm z-20">
         <div className="px-6 py-3 flex justify-between items-center">
             <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wide opacity-80">Teste de Performance</h2>
             <span className="text-xs font-mono text-gray-500">{formatTime(elapsedTime)}</span>
         </div>
         
         {/* Scrollable Strip - Just 2 Items here: Warmup and Test */}
         <div className="flex-1 overflow-x-auto overflow-y-hidden px-6 pb-2 hide-scrollbar flex items-center gap-4 snap-x snap-mandatory">
             {/* Virtual Warmup Block (Done) */}
             <div className="flex-shrink-0 w-[100px] opacity-40 grayscale">
                 <div className="relative overflow-hidden rounded-2xl p-3 flex flex-col justify-between h-[70px] bg-gray-100 border border-gray-200">
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-500" />
                      <div className="pl-3 flex justify-between items-start">
                          <span className="text-[10px] font-bold uppercase text-gray-500 leading-tight block truncate pr-1">Aquecimento</span>
                          <CheckCircle2 size={14} className="text-green-500 flex-shrink-0" />
                      </div>
                      <div className="pl-3">
                          <span className="text-sm text-gray-400 font-bold">Concluído</span>
                      </div>
                 </div>
             </div>

             {/* The Test Block (Active) */}
             <div className="flex-shrink-0 w-[180px] scale-100 opacity-100 snap-center">
                 <div className="relative overflow-hidden rounded-2xl p-3 flex flex-col justify-between h-[70px] bg-white border border-red-100 shadow-md ring-2 ring-red-500 ring-offset-2">
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-600" />
                      <div className="pl-3 flex justify-between items-start">
                          <span className="text-[10px] font-bold uppercase text-gray-500 leading-tight block truncate pr-1">Teste 1600m</span>
                      </div>
                      <div className="pl-3">
                          <span className="font-black tracking-tight text-xl text-gray-900">1600m</span>
                      </div>
                 </div>
             </div>
         </div>
      </div>

      {/* BODY: Active Block Focus */}
      <div className="flex-1 flex flex-col relative">
          {/* Progress Bar for Current Block */}
          <div className="h-1 bg-gray-200 w-full">
              <motion.div 
                 className="h-full bg-red-600"
                 initial={{ width: 0 }}
                 animate={{ width: `${blockProgressPercentage}%` }}
                 transition={{ ease: "linear", duration: 0.5 }}
              />
          </div>

          <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8">
              {/* Main Metric: Remaining Distance */}
              <div className="text-center space-y-2">
                 <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Restante</p>
                 <div className="flex items-baseline justify-center gap-1">
                     <span className="text-7xl font-black text-gray-900 tracking-tighter tabular-nums">
                        {Math.floor(remainingInBlock)}
                     </span>
                     <span className="text-xl font-bold text-gray-400">m</span>
                 </div>
              </div>

              {/* Secondary Metrics Grid */}
              <div className="grid grid-cols-2 gap-8 w-full max-w-xs">
                  <div className="text-center">
                     <div className="flex items-center justify-center gap-2 mb-1 opacity-60">
                         <Timer size={14} />
                         <span className="text-[10px] font-bold uppercase">Ritmo Atual</span>
                     </div>
                     <p className="text-3xl font-black text-gray-800 font-mono tracking-tight">{currentPace}</p>
                     <p className="text-[10px] text-gray-400 mt-1">min/km</p>
                  </div>
                  <div className="text-center">
                     <div className="flex items-center justify-center gap-2 mb-1 opacity-60">
                         <Zap size={14} />
                         <span className="text-[10px] font-bold uppercase">Esforço</span>
                     </div>
                     <p className="text-3xl font-black text-gray-800 font-mono tracking-tight">MÁX</p>
                     <p className="text-[10px] text-gray-400 mt-1">inten.</p>
                  </div>
              </div>
          </div>
      </div>

      {/* FOOTER: Controls */}
      <div className="bg-white border-t border-gray-100 p-6 pb-safe z-30">
          <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
             <button 
                onClick={handleCancelClick} 
                className="col-span-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-2xl flex items-center justify-center transition-colors active:scale-95 h-16"
             >
                <Square size={24} fill="currentColor" />
             </button>
             <button 
                onClick={handlePause} 
                className={`col-span-3 rounded-2xl flex items-center justify-center gap-3 font-bold text-lg shadow-lg active:scale-[0.98] transition-all h-16 ${
                    isPaused ? 'bg-green-500 text-white shadow-green-500/30' : 'bg-[#E53935] text-white shadow-red-500/30'
                }`}
             >
                {isPaused ? <><Play size={28} fill="currentColor" /><span>RETOMAR</span></> : <><Pause size={28} fill="currentColor" /><span>PAUSAR</span></>}
             </button>
         </div>
      </div>

      {/* MODALS */}
      <AnimatePresence>
        {showCancelModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
          >
             <motion.div 
               initial={{ scale: 0.9, y: 20 }}
               animate={{ scale: 1, y: 0 }}
               className="bg-white rounded-3xl w-full max-w-xs overflow-hidden shadow-2xl p-6"
             >
               <div className="flex flex-col items-center text-center mb-6">
                 <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mb-4">
                   <AlertTriangle size={32} />
                 </div>
                 <h3 className="text-xl font-bold text-gray-900 mb-2">Cancelar Teste?</h3>
                 <p className="text-sm text-gray-500">
                   Seu progresso será perdido.
                 </p>
               </div>
               
               <div className="grid grid-cols-2 gap-3">
                 <button 
                   onClick={dismissCancel}
                   className="py-3 px-4 rounded-xl bg-gray-100 text-gray-700 font-bold text-sm hover:bg-gray-200 transition-colors"
                 >
                   Voltar
                 </button>
                 <button 
                   onClick={confirmCancel}
                   className="py-3 px-4 rounded-xl bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
                 >
                   Encerrar
                 </button>
               </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showFinishModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl"
            >
              <div className="bg-[#E53935] p-8 flex flex-col items-center justify-center text-center">
                 <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4">
                    <Award size={40} className="text-white" />
                 </div>
                 <h2 className="text-2xl font-bold text-white mb-1">Teste Concluído!</h2>
                 <p className="text-white/80 text-sm font-medium">Missão cumprida.</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                   <div className="text-center p-3 bg-gray-50 rounded-2xl">
                      <p className="text-xs text-gray-400 font-bold uppercase">Distância</p>
                      <p className="text-xl font-bold text-gray-900">{(distance / 1000).toFixed(2)} km</p>
                   </div>
                   <div className="text-center p-3 bg-gray-50 rounded-2xl">
                      <p className="text-xs text-gray-400 font-bold uppercase">Tempo</p>
                      <p className="text-xl font-bold text-gray-900">{formatTime(elapsedTime)}</p>
                   </div>
                </div>
                <button 
                  onClick={() => onFinish({ distance, time: elapsedTime, pace: currentPace })}
                  className="w-full py-4 bg-[#E53935] text-white font-bold rounded-xl shadow-lg shadow-red-500/20 active:scale-[0.98] transition-all"
                >
                  Salvar Teste
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
