import { Trophy, Award, TrendingUp, Settings, LogOut, ChevronRight, Flame, Calendar, User, Zap } from 'lucide-react';

interface ProfileScreenProps {
  onNavigate: (screen: string) => void;
}

const stats = [
  { label: 'Distância', value: '487', unit: 'km', icon: TrendingUp, color: 'text-[#E53935]', bg: 'bg-white' },
  { label: 'Treinos', value: '42', unit: '', icon: Zap, color: 'text-[#E53935]', bg: 'bg-white' },
  { label: 'Sequência', value: '12', unit: 'dias', icon: Flame, color: 'text-[#E53935]', bg: 'bg-white' },
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
  { title: 'Corrida Noturna 10K', date: '28 Out', time: '48:32', position: '#142' },
  { title: '5K Parque Ibirapuera', date: '15 Set', time: '23:15', position: '#89' },
  { title: 'Meia Maratona', date: '20 Ago', time: '1:52:34', position: '#267' },
];

export function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  return (
    <div className="w-full h-full bg-gray-50/50 overflow-hidden flex flex-col">
      <div className="flex-1 overflow-y-auto pb-28 no-scrollbar">
        {/* Header - Clean & Modern */}
        <div className="bg-white px-6 pt-6 pb-6 sticky top-0 z-20 border-b border-gray-100/50">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-xl text-gray-900 font-bold tracking-tight">Perfil</h1>
            <button className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-all active:scale-95 border border-transparent">
              <Settings size={20} />
            </button>
          </div>
          
          {/* Profile Card */}
          <div className="flex items-center gap-6">
            <div className="relative group">
               <div className="w-24 h-24 bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2rem] flex items-center justify-center text-white text-2xl font-bold border-[4px] border-white shadow-xl shadow-gray-200">
                 LS
               </div>
               <div className="absolute -bottom-2 -right-2 bg-[#E53935] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border-[3px] border-white shadow-sm">
                 Nível 12
               </div>
            </div>
            
            <div className="flex-1 min-w-0 py-1">
              <h2 className="text-2xl text-gray-900 font-bold truncate tracking-tight mb-1">Lucas Silva</h2>
              <p className="text-gray-400 text-sm font-medium mb-3">Membro desde 2024</p>
              <div className="flex items-center gap-2">
                <span className="bg-white text-gray-900 px-3 py-1 rounded-md text-[10px] font-bold border border-gray-200 uppercase tracking-wide shadow-sm">
                  Intermediário
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="px-6 py-6">
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col items-center justify-center gap-2"
              >
                <stat.icon size={18} className={stat.color} />
                <div className="text-center">
                  <p className="text-gray-900 text-xl font-black tracking-tight leading-none mb-0.5">{stat.value}</p>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Badges */}
        <div className="px-6 pb-6">
          <div className="flex items-center justify-between mb-4">
             <h3 className="text-gray-900 font-bold text-sm tracking-tight">Conquistas</h3>
             <button className="text-[#E53935] text-xs font-bold uppercase tracking-wide hover:opacity-80 transition-opacity">Ver todas</button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {badges.map((badge, index) => (
              <div
                key={index}
                className={`rounded-2xl p-3 flex flex-col items-center justify-center gap-3 border transition-all aspect-square ${
                  badge.earned
                    ? 'bg-white border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)]'
                    : 'bg-gray-50/50 border-gray-100/50 opacity-40 grayscale'
                }`}
              >
                <span className="text-2xl">{badge.emoji}</span>
                <p className={`text-[9px] text-center font-bold leading-tight uppercase tracking-wide ${badge.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                  {badge.name}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recent Achievements */}
        <div className="px-6 pb-6">
          <h3 className="text-gray-900 font-bold text-sm mb-4 tracking-tight">Últimas Provas</h3>
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 text-gray-400 group-hover:text-[#FFB300] transition-colors">
                      <Award size={20} />
                   </div>
                   <div>
                     <h4 className="text-gray-900 text-sm font-bold mb-0.5">{achievement.title}</h4>
                     <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wide">{achievement.date} • {achievement.time}</p>
                   </div>
                </div>
                
                <div className="bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
                  <span className="text-gray-900 text-xs font-bold">{achievement.position}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Menu Items */}
        <div className="px-6 pb-8 space-y-4">
           <h3 className="text-gray-900 font-bold text-sm tracking-tight">Configurações</h3>
           <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
             {['Dados Pessoais', 'Notificações', 'Privacidade', 'Suporte'].map((item, i) => (
               <button key={i} className={`w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors touch-manipulation active:bg-gray-100 ${i !== 3 ? 'border-b border-gray-50' : ''}`}>
                 <span className="text-gray-700 text-sm font-bold">{item}</span>
                 <ChevronRight size={16} className="text-gray-300" />
               </button>
             ))}
           </div>
           
           <button className="w-full bg-white text-gray-400 py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-red-50 hover:text-[#E53935] transition-all touch-manipulation active:scale-[0.98] font-bold mt-2 text-xs uppercase tracking-widest border border-transparent hover:border-red-100">
              <LogOut size={16} />
              <span>Sair da Conta</span>
            </button>
        </div>
      </div>
    </div>
  );
}
