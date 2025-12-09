import { useState } from 'react';
import { Play, Pause, Square, ChevronLeft, Activity, Timer, TrendingUp, Heart } from 'lucide-react';

interface WorkoutScreenProps {
  onNavigate: (screen: string) => void;
}

export function WorkoutScreen({ onNavigate }: WorkoutScreenProps) {
  const [isRunning, setIsRunning] = useState(false);

  return (
    <div className="min-h-screen bg-black pb-24 max-w-md mx-auto overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-b from-zinc-900 to-black p-4 pb-3 safe-top">
        <button
          onClick={() => onNavigate('home')}
          className="text-zinc-400 mb-3 flex items-center gap-2 hover:text-white transition-colors touch-manipulation"
        >
          <ChevronLeft size={18} />
          <span className="text-xs">Voltar</span>
        </button>
        
        <h1 className="text-xl sm:text-2xl text-white mb-1">Corrida Intervalada</h1>
        <p className="text-zinc-400 text-xs sm:text-sm">5x400m com recuperação ativa</p>
      </div>
      
      {/* Main Stats */}
      <div className="px-6 mb-6">
        <div className="bg-gradient-to-br from-[#FF5E00] to-[#ff4500] rounded-2xl p-8 shadow-xl shadow-[#FF5E00]/30 text-center">
          <p className="text-orange-200 text-sm mb-2">Tempo Decorrido</p>
          <h2 className="text-6xl text-white mb-8">24:32</h2>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-orange-200 text-xs mb-1">Distância</p>
              <p className="text-white text-xl">4.2 km</p>
            </div>
            <div>
              <p className="text-orange-200 text-xs mb-1">Pace Atual</p>
              <p className="text-white text-xl">5:30/km</p>
            </div>
            <div>
              <p className="text-orange-200 text-xs mb-1">Calorias</p>
              <p className="text-white text-xl">285</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Control Buttons */}
      <div className="px-6 mb-6 flex gap-3">
        {!isRunning ? (
          <button
            onClick={() => setIsRunning(true)}
            className="flex-1 bg-white text-[#FF5E00] py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-100 transition-all"
          >
            <Play size={24} fill="currentColor" />
            <span>Iniciar</span>
          </button>
        ) : (
          <>
            <button
              onClick={() => setIsRunning(false)}
              className="flex-1 bg-zinc-800 text-white py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-700 transition-all border border-zinc-700"
            >
              <Pause size={24} />
              <span>Pausar</span>
            </button>
            <button className="bg-red-600 text-white px-6 py-4 rounded-xl hover:bg-red-700 transition-all">
              <Square size={24} />
            </button>
          </>
        )}
      </div>
      
      {/* Detailed Stats */}
      <div className="px-6 mb-6">
        <h3 className="text-white mb-3 text-sm">Estatísticas em Tempo Real</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="text-[#FF5E00]" size={20} />
              <span className="text-zinc-400 text-sm">Velocidade</span>
            </div>
            <p className="text-white text-xl">11.2 km/h</p>
          </div>
          
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="text-red-500" size={20} />
              <span className="text-zinc-400 text-sm">Batimentos</span>
            </div>
            <p className="text-white text-xl">145 bpm</p>
          </div>
          
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="text-blue-500" size={20} />
              <span className="text-zinc-400 text-sm">Elevação</span>
            </div>
            <p className="text-white text-xl">12 m</p>
          </div>
          
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Timer className="text-green-500" size={20} />
              <span className="text-zinc-400 text-sm">Cadência</span>
            </div>
            <p className="text-white text-xl">165 spm</p>
          </div>
        </div>
      </div>
      
      {/* Interval Progress */}
      <div className="px-6 mb-6">
        <h3 className="text-white mb-3 text-sm">Progresso do Intervalo</h3>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white">Série 3 de 5</span>
            <span className="text-[#FF5E00]">60%</span>
          </div>
          
          <div className="h-2 bg-zinc-700 rounded-full overflow-hidden mb-4">
            <div className="h-full bg-gradient-to-r from-[#FF5E00] to-[#ff4500] w-3/5 rounded-full"></div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">1</span>
              </div>
              <span className="text-zinc-500 text-sm">400m - 2:08 (Completo)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">2</span>
              </div>
              <span className="text-zinc-500 text-sm">400m - 2:10 (Completo)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-[#FF5E00] rounded-full flex items-center justify-center">
                <span className="text-white text-xs">3</span>
              </div>
              <span className="text-white text-sm">400m - Em andamento</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-zinc-700 rounded-full flex items-center justify-center">
                <span className="text-zinc-400 text-xs">4</span>
              </div>
              <span className="text-zinc-500 text-sm">400m - Pendente</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-zinc-700 rounded-full flex items-center justify-center">
                <span className="text-zinc-400 text-xs">5</span>
              </div>
              <span className="text-zinc-500 text-sm">400m - Pendente</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Map Placeholder */}
      <div className="px-6 mb-6">
        <h3 className="text-white mb-3 text-sm">Rota GPS</h3>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl h-48 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900"></div>
          <div className="relative z-10 text-center">
            <Activity className="text-[#FF5E00] mb-2 mx-auto" size={32} />
            <p className="text-zinc-500 text-sm">Rastreamento GPS Ativo</p>
          </div>
          {/* Animated pulse effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#FF5E00] rounded-full blur-3xl opacity-20 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
