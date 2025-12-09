import { useState } from 'react';
import { Play, Volume2, TrendingUp, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Check, Circle, MapPin, Zap, Brain } from 'lucide-react';

interface CoachScreenProps {
  onNavigate: (screen: string) => void;
}

const calendarData = [
  { date: 1, type: 'completed', workout: 'Corrida Leve', distance: '5 km' },
  { date: 2, type: 'rest', workout: 'Descanso', distance: '-' },
  { date: 3, type: 'completed', workout: 'Intervalado', distance: '8 km' },
  { date: 4, type: 'completed', workout: 'Corrida Longa', distance: '12 km' },
  { date: 5, type: 'completed', workout: 'Regenerativo', distance: '6 km' },
  { date: 6, type: 'rest', workout: 'Descanso', distance: '-' },
  { date: 7, type: 'completed', workout: 'Corrida Leve', distance: '7 km' },
  { date: 8, type: 'next', workout: 'Intervalado 5x400m', distance: '8 km', pace: '5:20/km' },
  { date: 9, type: 'upcoming', workout: 'Corrida Longa', distance: '14 km' },
  { date: 10, type: 'upcoming', workout: 'Regenerativo', distance: '6 km' },
  { date: 11, type: 'event', workout: 'Treino Presencial', distance: '10 km', location: 'Parque Ibirapuera' },
  { date: 12, type: 'rest', workout: 'Descanso', distance: '-' },
  { date: 13, type: 'upcoming', workout: 'Intervalado', distance: '8 km' },
  { date: 14, type: 'upcoming', workout: 'Corrida Leve', distance: '7 km' },
];

const upcomingWorkouts = [
  {
    title: 'Intervalado 5x400m',
    description: '5 séries de 400m com recuperação ativa',
    distance: '8 km',
    pace: '5:20/km',
    time: '45 min',
    color: 'from-[#E53935] to-[#B71C1C]',
  },
  {
    title: 'Corrida Longa',
    description: 'Ritmo confortável e constante',
    distance: '14 km',
    pace: '6:00/km',
    time: '84 min',
    color: 'from-[#00B0FF] to-[#0288D1]',
  },
  {
    title: 'Regenerativo',
    description: 'Corrida suave para recuperação',
    distance: '6 km',
    pace: '6:30/km',
    time: '39 min',
    color: 'from-[#FFB300] to-[#FF8F00]',
  },
];

const motivationalPhrases = [
  "Detectei 23% de aumento na sua performance. Continue assim.",
  "Seus batimentos indicam recuperação ideal. Sistema otimizado.",
  "Análise de pace: você está 12% mais rápido que no mês passado.",
  "Nível de consistência: Elite. Protocolo de treino ajustado.",
];

export function CoachScreen({ onNavigate }: CoachScreenProps) {
  const [selectedDay, setSelectedDay] = useState(8);
  const [currentPhrase] = useState(motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)]);
  const selectedWorkout = calendarData.find(d => d.date === selectedDay);

  return (
    <div className="min-h-screen bg-black pb-32 max-w-md mx-auto relative overflow-y-auto">
      {/* Jarvis-style background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1E1E1E] to-black"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FFB300] to-transparent opacity-50"></div>
      <div className="absolute top-20 right-10 w-48 h-48 bg-[#E53935] rounded-full blur-[120px] opacity-10 animate-pulse"></div>
      <div className="absolute bottom-40 left-10 w-48 h-48 bg-[#FFB300] rounded-full blur-[100px] opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Animated grid lines */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'linear-gradient(#FFB300 1px, transparent 1px), linear-gradient(90deg, #FFB300 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="bg-gradient-to-b from-[#1E1E1E] to-transparent p-4 pb-3 border-b border-[#FFB300]/20 safe-top">
          <button
            onClick={() => onNavigate('home')}
            className="text-zinc-400 mb-3 flex items-center gap-2 hover:text-[#FFB300] transition-colors touch-manipulation"
          >
            <ChevronLeft size={18} />
            <span className="text-xs">Voltar</span>
          </button>
          
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="relative">
              <div className="absolute inset-0 bg-[#FFB300] blur-xl opacity-50 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-[#E53935] to-[#B71C1C] p-2.5 rounded-xl border border-[#FFB300]">
                <Brain className="text-white" size={20} />
              </div>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl text-white">JARVIS Coach</h1>
              <p className="text-[#FFB300] text-xs sm:text-sm">Sistema de Inteligência de Treino</p>
            </div>
          </div>
        </div>
        
        {/* AI Status Banner */}
        <div className="px-6 py-4">
          <div className="bg-gradient-to-r from-[#1E1E1E] to-[#1E1E1E] border border-[#FFB300]/30 rounded-xl p-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#E53935] to-[#FFB300] animate-pulse"></div>
            <div className="pl-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-[#00B0FF] rounded-full animate-pulse"></div>
                <span className="text-[#FFB300] text-xs uppercase tracking-wider">IA Online</span>
              </div>
              <p className="text-white text-sm leading-relaxed">
                {currentPhrase}
              </p>
            </div>
          </div>
        </div>
        
        {/* Daily Command - HUD Style */}
        <div className="px-6 mb-6">
          <div className="relative">
            {/* Corner decorations */}
            <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[#FFB300]"></div>
            <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-[#FFB300]"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-[#FFB300]"></div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[#FFB300]"></div>
            
            <div className="bg-gradient-to-br from-[#1E1E1E] to-black border border-[#E53935]/30 rounded-xl p-6 relative overflow-hidden">
              {/* Energy lines */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FFB300] to-transparent opacity-20 blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="text-[#FFB300]" size={20} />
                  <p className="text-[#FFB300] text-xs uppercase tracking-wider">Comando do Dia</p>
                </div>
                <h3 className="text-white text-lg mb-4 leading-relaxed">
                  Hoje é dia de treino intervalado — 5x400m com recuperação ativa. Vamos nessa?
                </h3>
                
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => onNavigate('workout')}
                    className="flex-1 bg-gradient-to-r from-[#E53935] to-[#B71C1C] text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:from-[#ff6e6e] hover:to-[#E53935] transition-all border border-[#FFB300]/30 shadow-lg shadow-[#E53935]/30 touch-manipulation active:scale-95"
                  >
                    <Play size={18} fill="currentColor" />
                    <span className="text-sm">Iniciar Treino</span>
                  </button>
                  
                  <button className="bg-[#1E1E1E] text-white px-4 py-3 rounded-lg hover:bg-zinc-800 transition-all border border-[#FFB300]/30">
                    <Volume2 size={18} />
                  </button>
                </div>
                
                <button className="w-full bg-[#1E1E1E] text-zinc-300 py-3 rounded-lg hover:bg-zinc-800 transition-all text-sm border border-[#00B0FF]/30">
                  <div className="flex items-center justify-center gap-2">
                    <TrendingUp size={16} />
                    <span>Ver Análise de Desempenho</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Upcoming Workouts */}
        <div className="px-6 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#FFB300] to-transparent opacity-30"></div>
            <h3 className="text-white text-sm uppercase tracking-wider">Próximos Treinos</h3>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#FFB300] to-transparent opacity-30"></div>
          </div>
          <div className="space-y-3">
            {upcomingWorkouts.map((workout, index) => (
              <div
                key={index}
                className="bg-[#1E1E1E] border border-[#FFB300]/20 rounded-xl p-4 hover:border-[#FFB300]/50 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-white mb-1">{workout.title}</h4>
                    <p className="text-zinc-500 text-sm">{workout.description}</p>
                  </div>
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${workout.color} shadow-lg`}></div>
                </div>
                
                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-1 text-zinc-400">
                    <span>{workout.distance}</span>
                  </div>
                  <div className="flex items-center gap-1 text-zinc-400">
                    <span>{workout.pace}</span>
                  </div>
                  <div className="flex items-center gap-1 text-zinc-400">
                    <span>{workout.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Calendar Section - Futuristic */}
        <div className="px-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white text-sm uppercase tracking-wider">Matriz de Treinos</h3>
            <div className="flex items-center gap-2">
              <button className="text-zinc-400 hover:text-[#FFB300] transition-colors">
                <ChevronLeft size={20} />
              </button>
              <span className="text-[#FFB300] text-sm">Nov 2025</span>
              <button className="text-zinc-400 hover:text-[#FFB300] transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          
          {/* Calendar Grid */}
          <div className="bg-[#1E1E1E] border border-[#FFB300]/20 rounded-xl p-4">
            <div className="grid grid-cols-7 gap-2 mb-3">
              {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, i) => (
                <div key={i} className="text-center text-[#FFB300] text-xs">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {calendarData.map((day) => {
                const isSelected = selectedDay === day.date;
                let bgColor = 'bg-black border-zinc-800';
                let icon = null;
                let glowColor = '';
                
                if (day.type === 'completed') {
                  bgColor = 'bg-gradient-to-br from-green-900/30 to-green-800/20 border-green-600/50';
                  icon = <Check size={12} className="text-green-400" />;
                  glowColor = 'shadow-green-500/20';
                } else if (day.type === 'next') {
                  bgColor = 'bg-gradient-to-br from-[#E53935]/30 to-[#B71C1C]/20 border-[#E53935]/50';
                  icon = <Circle size={12} className="text-[#E53935]" />;
                  glowColor = 'shadow-[#E53935]/30';
                } else if (day.type === 'event') {
                  bgColor = 'bg-gradient-to-br from-[#00B0FF]/30 to-blue-800/20 border-[#00B0FF]/50';
                  icon = <MapPin size={12} className="text-[#00B0FF]" />;
                  glowColor = 'shadow-[#00B0FF]/20';
                } else if (day.type === 'rest') {
                  bgColor = 'bg-black border-zinc-800';
                }
                
                if (isSelected) {
                  bgColor = 'bg-gradient-to-br from-[#E53935] to-[#B71C1C] border-[#FFB300]';
                  glowColor = 'shadow-[#FFB300]/50';
                }
                
                return (
                  <button
                    key={day.date}
                    onClick={() => setSelectedDay(day.date)}
                    className={`aspect-square ${bgColor} border rounded-lg flex flex-col items-center justify-center hover:scale-105 transition-all relative shadow-lg ${glowColor} touch-manipulation active:scale-95`}
                  >
                    <span className={`text-xs ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                      {day.date}
                    </span>
                    {!isSelected && icon && (
                      <div className="absolute bottom-1">
                        {icon}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            
            {/* Legend - Futuristic */}
            <div className="flex gap-3 mt-4 pt-4 border-t border-[#FFB300]/20 flex-wrap justify-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-br from-green-900/50 to-green-800/30 border border-green-600/50 rounded shadow-sm shadow-green-500/20"></div>
                <span className="text-xs text-zinc-500">Concluído</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-br from-[#E53935]/30 to-[#B71C1C]/20 border border-[#E53935]/50 rounded shadow-sm shadow-[#E53935]/30"></div>
                <span className="text-xs text-zinc-500">Próximo</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-br from-[#00B0FF]/30 to-blue-800/20 border border-[#00B0FF]/50 rounded shadow-sm shadow-[#00B0FF]/20"></div>
                <span className="text-xs text-zinc-500">Evento</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Selected Day Details - HUD Style */}
        {selectedWorkout && (
          <div className="px-6 mb-6">
            <div className="bg-gradient-to-br from-[#1E1E1E] to-black border border-[#FFB300]/30 rounded-xl p-5 relative overflow-hidden">
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#E53935] opacity-50"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#E53935] opacity-50"></div>
              
              <div className="flex items-center gap-2 mb-3">
                <CalendarIcon size={20} className="text-[#FFB300]" />
                <h4 className="text-white">Dia {selectedWorkout.date} de Novembro</h4>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-zinc-400 text-sm">Tipo de Treino:</span>
                  <span className="text-white text-sm">{selectedWorkout.workout}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400 text-sm">Distância:</span>
                  <span className="text-white text-sm">{selectedWorkout.distance}</span>
                </div>
                {selectedWorkout.pace && (
                  <div className="flex justify-between">
                    <span className="text-zinc-400 text-sm">Pace Alvo:</span>
                    <span className="text-white text-sm">{selectedWorkout.pace}</span>
                  </div>
                )}
                {selectedWorkout.location && (
                  <div className="flex justify-between">
                    <span className="text-zinc-400 text-sm">Local:</span>
                    <span className="text-white text-sm">{selectedWorkout.location}</span>
                  </div>
                )}
              </div>
              
              {selectedWorkout.type === 'next' && (
                <div className="bg-gradient-to-r from-[#E53935]/10 to-[#FFB300]/10 border border-[#FFB300]/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-[#00B0FF] rounded-full animate-pulse"></div>
                    <p className="text-[#FFB300] text-xs uppercase tracking-wider">Análise JARVIS</p>
                  </div>
                  <p className="text-zinc-300 text-sm">
                    "Protocolo de intervalados otimizado. Mantenha cadência entre 165-175 spm nas séries intensas. Recuperação ativa essencial para maximizar adaptação."
                  </p>
                </div>
              )}
              
              {selectedWorkout.type === 'completed' && (
                <div className="bg-gradient-to-r from-green-900/20 to-green-800/10 border border-green-600/50 rounded-lg p-3">
                  <p className="text-green-400 text-xs mb-1 uppercase">Concluído</p>
                  <p className="text-zinc-300 text-sm">
                    "Treino executado com eficiência de 94%. Padrão de ritmo consistente detectado."
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
