import { useEffect, useState } from 'react';
import { Zap, Brain, Sparkles } from 'lucide-react';

interface TrainingPreparingProps {
  onComplete: () => void;
}

export function TrainingPreparing({ onComplete }: TrainingPreparingProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [progress, setProgress] = useState(0);

  const DURATION = 5000; // 5 seconds

  useEffect(() => {
    if (!isCreating) return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(newProgress);

      if (elapsed >= DURATION) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isCreating, onComplete]);

  const handleCreatePlan = () => {
    setIsCreating(true);
  };

  if (!isCreating) {
    return (
      <div className="fixed inset-0 z-[60] bg-white flex flex-col h-dvh w-full items-center justify-center px-6 animate-in fade-in duration-500 pt-safe pb-safe">
        <div className="max-w-md mx-auto text-center w-full">
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto rounded-full bg-amber-50 flex items-center justify-center shadow-sm">
              <Sparkles size={48} className="text-[#FFB300]" />
            </div>
            <div className="absolute top-0 right-1/3 w-4 h-4 bg-[#E53935] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="absolute bottom-0 left-1/3 w-3 h-3 bg-[#00B0FF] rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
          </div>

          <div className="mb-10">
            <h2 className="text-gray-900 mb-3 text-2xl font-bold">Tudo Pronto!</h2>
            <p className="text-gray-600 max-w-xs mx-auto text-base leading-relaxed">
              Analisamos seus dados do teste de 1600m. Agora vamos estruturar sua jornada de evolução.
            </p>
          </div>

          <button
            onClick={handleCreatePlan}
            className="w-full py-5 rounded-2xl bg-[#E53935] text-white hover:bg-[#D32F2F] active:scale-[0.98] flex items-center justify-center gap-3 transition-all touch-manipulation shadow-lg shadow-red-500/20"
          >
            <Zap size={24} fill="white" />
            <span className="text-lg font-bold tracking-wide">CRIAR PLANO DE TREINO</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] bg-white flex flex-col h-dvh w-full items-center justify-center px-6 animate-in fade-in duration-500 pt-safe pb-safe">
      <div className="max-w-md mx-auto text-center w-full">
        {/* Icon with pulsing animation */}
        <div className="relative mb-10">
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-[#E53935] to-[#B71C1C] flex items-center justify-center animate-pulse shadow-lg shadow-[#E53935]/30">
            <Brain size={64} className="text-white" />
          </div>
          <div className="absolute top-0 right-1/2 transform translate-x-1/2 -translate-y-2">
            <div className="w-40 h-40 rounded-full bg-[#E53935]/10 animate-ping"></div>
          </div>
        </div>

        {/* Title */}
        <div className="mb-12">
          <h2 className="text-gray-900 mb-3 text-2xl font-bold">Criando Treino de Corrida</h2>
          <p className="text-gray-600 max-w-xs mx-auto text-base leading-relaxed">
            Personalizando suas cargas e volumes para maximizar sua performance
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 relative w-full">
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-gradient-to-r from-[#E53935] via-[#FFB300] to-[#E53935] bg-[length:200%_100%] animate-[shimmer_2s_infinite] transition-all duration-300 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500 font-medium">Processando IA...</p>
            <p className="text-sm text-[#E53935] font-bold">{Math.round(progress)}%</p>
          </div>
        </div>
        
        {/* Decorate elements */}
        <div className="grid grid-cols-3 gap-4 mt-8 opacity-50">
           <div className="h-1 bg-gray-100 rounded w-full animate-pulse" style={{ animationDelay: '0s' }}></div>
           <div className="h-1 bg-gray-100 rounded w-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
           <div className="h-1 bg-gray-100 rounded w-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
}
