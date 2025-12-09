import { Trophy, Award, TrendingUp, Settings, LogOut, ChevronRight, Flame, Calendar, User } from 'lucide-react';

interface ProfileScreenProps {
  onNavigate: (screen: string) => void;
}

const stats = [
  { label: 'Total de KM', value: '487', icon: TrendingUp, color: 'text-[#E53935]', bg: 'bg-red-50' },
  { label: 'Treinos', value: '42', icon: Calendar, color: 'text-[#FFB300]', bg: 'bg-amber-50' },
  { label: 'Conquistas', value: '18', icon: Award, color: 'text-[#00B0FF]', bg: 'bg-blue-50' },
  { label: 'Sequência', value: '12', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-50' },
];

const badges = [
  { name: 'Primeiro 5K', emoji: '🏃', earned: true },
  { name: 'Meia Maratona', emoji: '🏅', earned: true },
  { name: 'Streak 30 dias', emoji: '🔥', earned: true },
  { name: 'Top 10 Ranking', emoji: '🏆', earned: false },
  { name: 'Maratonista', emoji: '⭐', earned: false },
  { name: 'Ultra Runner', emoji: '💎', earned: false },
];

const achievements = [
  { title: 'Corrida Noturna 10K', date: '28 Out 2025', time: '48:32', position: '#142' },
  { title: '5K Parque Ibirapuera', date: '15 Set 2025', time: '23:15', position: '#89' },
  { title: 'Meia Maratona da Cidade', date: '20 Ago 2025', time: '1:52:34', position: '#267' },
];

export function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  return (
    <div className="w-full h-full bg-white overflow-hidden flex flex-col">
      <div className="flex-1 overflow-y-auto pb-28 no-scrollbar">
        {/* Header - Clean & Modern */}
        <div className="bg-white/95 backdrop-blur-sm border-b border-gray-100 p-5 sticky top-0 z-20">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl text-gray-900 font-bold tracking-tight">Perfil</h1>
            <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-all active:scale-95 border border-gray-100">
              <Settings size={20} />
            </button>
          </div>
          
          {/* Profile Card */}
          <div className="flex items-center gap-5">
            <div className="relative">
               <div className="w-20 h-20 bg-gradient-to-br from-[#E53935] to-[#C62828] rounded-2xl flex items-center justify-center text-white text-2xl font-bold border-2 border-white shadow-lg shadow-red-500/20">
                 LS
               </div>
               <div className="absolute -bottom-2 -right-2 bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-white shadow-sm">
                 Lvl 12
               </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h2 className="text-xl text-gray-900 font-bold truncate mb-1">Lucas Silva</h2>
              <p className="text-gray-500 text-sm font-medium mb-3">Corredor Intermediário</p>
              <div className="flex items-center gap-2">
                <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg text-xs font-bold border border-gray-200">
                  #12 Nacional
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="p-5 pb-4">
          <h3 className="text-gray-900 font-bold text-sm mb-4">Visão Geral</h3>
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.bg}`}>
                    <stat.icon size={16} className={stat.color} />
                  </div>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-wide">{stat.label}</p>
                </div>
                <p className="text-gray-900 text-2xl font-bold tracking-tight ml-1">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Badges */}
        <div className="px-5 pb-4">
          <div className="flex items-center justify-between mb-4">
             <h3 className="text-gray-900 font-bold text-sm">Badges</h3>
             <button className="text-[#E53935] text-xs font-bold hover:underline">Ver todos</button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {badges.map((badge, index) => (
              <div
                key={index}
                className={`rounded-2xl p-4 flex flex-col items-center justify-center gap-2 border transition-all aspect-square ${
                  badge.earned
                    ? 'bg-white border-amber-100 shadow-sm shadow-amber-100/50'
                    : 'bg-gray-50 border-gray-100 opacity-60 grayscale'
                }`}
              >
                <span className="text-3xl filter drop-shadow-sm">{badge.emoji}</span>
                <p className={`text-[10px] text-center font-bold leading-tight ${badge.earned ? 'text-gray-900' : 'text-gray-400'}`}>
                  {badge.name}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recent Achievements */}
        <div className="px-5 pb-4">
          <h3 className="text-gray-900 font-bold text-sm mb-4">Histórico de Provas</h3>
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:border-gray-300 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center border border-amber-100 group-hover:scale-105 transition-transform">
                        <Trophy size={18} className="text-[#FFB300]" />
                     </div>
                     <h4 className="text-gray-900 text-sm font-bold">{achievement.title}</h4>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-xs font-medium">
                  <span className="bg-gray-50 text-gray-600 px-2.5 py-1.5 rounded-lg border border-gray-100">{achievement.date}</span>
                  <span className="bg-gray-50 text-gray-900 px-2.5 py-1.5 rounded-lg border border-gray-100 font-bold">{achievement.time}</span>
                  <span className="bg-red-50 text-[#E53935] px-2.5 py-1.5 rounded-lg border border-red-100 font-bold ml-auto">{achievement.position}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Menu Items */}
        <div className="px-5 pb-8 space-y-3">
           <h3 className="text-gray-900 font-bold text-sm mb-4">Conta</h3>
           <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
             {['Editar Perfil', 'Preferências', 'Privacidade', 'Ajuda e Suporte'].map((item, i) => (
               <button key={i} className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors touch-manipulation active:bg-gray-100 ${i !== 3 ? 'border-b border-gray-50' : ''}`}>
                 <span className="text-gray-700 text-sm font-semibold">{item}</span>
                 <ChevronRight size={18} className="text-gray-300" />
               </button>
             ))}
           </div>
           
           <button className="w-full bg-white border-2 border-gray-100 text-gray-500 py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-50 hover:text-[#E53935] hover:border-red-100 transition-all touch-manipulation active:scale-[0.98] font-bold mt-4">
              <LogOut size={18} />
              <span>Sair da Conta</span>
            </button>
        </div>
      </div>
    </div>
  );
}
