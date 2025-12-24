import {
  Trophy,
  TrendingUp,
  Flame,
  MapPin,
  Map,
  Flag,
  Globe,
  Clock,
  Lock
} from "lucide-react";
import { useState } from "react";

interface RankingScreenProps {
  onNavigate: (screen: string) => void;
}

// Generate Top 30 Mock Data
const generateRankingData = () => {
  const names = ["Rafael Santos", "Ana Paula", "Carlos Mendes", "Juliana Costa", "Pedro Oliveira", "Mariana Silva", "Lucas Pereira", "Fernanda Lima", "Bruno Costa", "Camila Rocha", "Ricardo Alves", "Amanda Souza", "Thiago Oliveira", "Beatriz Santos", "Gustavo Lima", "Patricia Gomes", "Felipe Rodrigues", "Larissa Ferreira", "André Barbosa", "Cristina Silva", "Gabriel Martins", "Daniela Costa", "Rodrigo Almeida", "Renata Sousa", "Marcelo Carvalho", "Vanessa Lopes", "Eduardo Ribeiro", "Tatiana Mendes", "Leonardo Ramos", "Sabrina Duarte"];
  
  return names.map((name, index) => ({
    position: index + 1,
    name: name,
    points: 1250 - (index * 25),
    streak: Math.max(2, 30 - Math.floor(index / 1.5)),
    avatar: name.split(' ').map(n => n[0]).join('').substring(0, 2),
    level: index < 5 ? "Elite" : index < 15 ? "Avançado" : "Intermediário",
    badge: index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "",
    isYou: false
  }));
};

const rankingData = generateRankingData();

const myUser = {
  position: 142,
  name: "Lucas Silva",
  points: 720,
  streak: 12,
  avatar: "LS",
  level: "Intermediário",
  badge: "",
  isYou: true,
};

export function RankingScreen({
  onNavigate,
}: RankingScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState("Local");

  const categories = [
    { id: "Local", icon: MapPin, label: "Local", locked: false },
    { id: "Estadual", icon: Map, label: "Estadual", locked: true },
    { id: "Nacional", icon: Flag, label: "Nacional", locked: true },
    { id: "Global", icon: Globe, label: "Global", locked: true },
  ];

  const currentCategory = categories.find(c => c.id === selectedCategory) || categories[0];

  return (
    <div className="w-full h-full bg-white overflow-hidden flex flex-col relative">
      <div className="flex-1 overflow-y-auto pb-40 no-scrollbar">
        {/* Header */}
        <div className="bg-white/95 backdrop-blur-sm border-b border-gray-100 p-5 sticky top-0 z-20">
          
          {/* Countdown Timer */}
          <div className="flex items-center justify-center gap-1.5 mb-4 bg-gray-50 py-1.5 px-3 rounded-full w-fit mx-auto border border-gray-100">
            <Clock size={12} className="text-[#E53935]" />
            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">
              Próximo reset em: <span className="text-gray-900">89 dias 14h 22m</span>
            </span>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl text-gray-900 font-bold tracking-tight mb-0.5">
                Ranking
              </h1>
              <p className="text-gray-500 text-sm">
                Compare seu desempenho
              </p>
            </div>
            <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center border border-amber-100">
              <Trophy className="text-[#FFB300]" size={20} />
            </div>
          </div>

          {/* Categories - Grid 4 columns fixed */}
          <div className="grid grid-cols-4 gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex flex-col items-center justify-center gap-1.5 py-3 rounded-2xl transition-all border relative ${
                  selectedCategory === cat.id
                    ? "bg-gray-900 text-white border-gray-900 shadow-md"
                    : "bg-gray-50 text-gray-600 border-transparent hover:bg-gray-100"
                }`}
              >
                <cat.icon size={16} />
                <span className="text-[10px] font-bold truncate w-full text-center px-1">
                  {cat.label}
                </span>
                {cat.locked && (
                   <div className={`absolute top-1 right-1 ${selectedCategory === cat.id ? "text-white/70" : "text-gray-400"}`}>
                     <Lock size={8} />
                   </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Locked State Banner */}
        {currentCategory.locked && (
          <div className="px-5 py-6">
             <div className="bg-gray-100 rounded-3xl p-8 flex flex-col items-center justify-center text-center border border-gray-200 min-h-[300px] relative overflow-hidden">
                <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-0"></div>
                <div className="relative z-10 flex flex-col items-center">
                   <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                      <Lock size={32} className="text-gray-400" />
                   </div>
                   <h3 className="text-gray-900 font-bold text-lg mb-2">Categoria Bloqueada</h3>
                   <p className="text-gray-500 text-sm max-w-[200px] font-medium leading-relaxed">
                     Fique no Top 10 para desbloquear esta categoria.
                   </p>
                </div>
             </div>
          </div>
        )}

        {/* Ranking List */}
        <div className={`px-5 mt-4 transition-all duration-500 ${currentCategory.locked ? 'opacity-30 filter blur-sm grayscale pointer-events-none select-none' : ''}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900 font-bold text-sm">
              Top 30
            </h3>
          </div>

          <div className="space-y-3">
            {rankingData.map((user) => (
              <div
                key={user.position}
                className={`bg-white border rounded-2xl p-4 flex items-center gap-4 transition-all border-gray-100 shadow-sm`}
              >
                {/* Position */}
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                    user.position === 1
                      ? "bg-amber-100 text-amber-700"
                      : user.position === 2
                        ? "bg-gray-100 text-gray-700"
                        : user.position === 3
                          ? "bg-orange-100 text-orange-800"
                          : "text-gray-400 bg-gray-50"
                  }`}
                >
                  {user.badge || user.position}
                </div>

                {/* Avatar */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm bg-gray-900`}
                >
                  {user.avatar}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold truncate text-gray-900">
                      {user.name}
                    </p>
                  </div>
                  <p className="text-gray-400 text-xs font-medium">
                    {user.level}
                  </p>
                </div>

                {/* Points */}
                <div className="text-right">
                  <p className="text-gray-900 text-sm font-bold">
                    {user.points}
                  </p>
                  <p className="text-gray-400 text-[10px] font-medium uppercase">
                    pts
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Current User Row - Only if unlocked */}
      {!currentCategory.locked && (
        <div className="absolute bottom-[80px] left-0 right-0 z-30 px-5 pb-2">
           <div className="bg-white border border-[#E53935] rounded-2xl p-4 flex items-center gap-4 shadow-[0_8px_24px_rgba(229,57,53,0.15)] w-full relative">
              {/* Position */}
              <div className="flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm bg-red-50 text-[#E53935]">
                {myUser.position}
              </div>

              {/* Avatar */}
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm bg-gradient-to-br from-[#E53935] to-[#C62828]">
                {myUser.avatar}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold truncate text-gray-900">
                    {myUser.name}
                  </p>
                  <span className="bg-red-50 text-[#E53935] text-[9px] px-1.5 py-0.5 rounded font-bold border border-red-100 uppercase tracking-wide">
                    Você
                  </span>
                </div>
                <p className="text-gray-400 text-xs font-medium">
                  {myUser.level}
                </p>
              </div>

              {/* Points */}
              <div className="text-right">
                <p className="text-gray-900 text-sm font-black tracking-tight">
                  {myUser.points}
                </p>
                <div className="flex items-center justify-end gap-1">
                   <TrendingUp size={12} className="text-green-500" />
                   <p className="text-gray-400 text-[9px] font-bold uppercase">pts</p>
                </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
