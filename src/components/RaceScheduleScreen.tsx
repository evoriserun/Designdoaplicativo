import { ChevronLeft, MapPin, Flag, Calendar, Users, Award } from 'lucide-react';

interface RaceScheduleScreenProps {
  onNavigate: (screen: string) => void;
}

const upcomingRaces = [
  {
    id: 1,
    name: 'Meia Maratona de São Paulo',
    date: '16 Nov 2025',
    distance: '21 km',
    city: 'São Paulo - SP',
    time: '07:00',
    goal: 'Sub 1h45',
    status: 'confirmed',
    participants: 5200,
  },
  {
    id: 2,
    name: 'Corrida do Trabalhador',
    date: '01 Dez 2025',
    distance: '10 km',
    city: 'São Paulo - SP',
    time: '08:00',
    goal: 'Sub 50min',
    status: 'registered',
    participants: 3500,
  },
  {
    id: 3,
    name: 'Maratona Internacional',
    date: '15 Jan 2026',
    distance: '42 km',
    city: 'Rio de Janeiro - RJ',
    time: '06:30',
    goal: 'Sub 3h30',
    status: 'interested',
    participants: 8000,
  },
];

const pastRaces = [
  {
    id: 4,
    name: 'Corrida Noturna',
    date: '28 Out 2025',
    distance: '10 km',
    city: 'São Paulo - SP',
    result: '48:32',
    position: 142,
  },
  {
    id: 5,
    name: '5K Parque Ibirapuera',
    date: '15 Set 2025',
    distance: '5 km',
    city: 'São Paulo - SP',
    result: '23:15',
    position: 89,
  },
];

export function RaceScheduleScreen({ onNavigate }: RaceScheduleScreenProps) {
  return (
    <div className="w-full h-full bg-white overflow-hidden flex flex-col">
      <div className="flex-1 overflow-y-auto pb-28 no-scrollbar">
        {/* Header */}
        <div className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-20">
          <div className="p-5">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <button 
                  onClick={() => onNavigate('home')}
                  className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-900 hover:bg-gray-100 active:scale-95 transition-all border border-gray-100"
                >
                  <ChevronLeft size={20} />
                </button>
                <h1 className="text-2xl text-gray-900 font-bold tracking-tight">Provas</h1>
              </div>
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center border border-blue-100">
                 <Flag className="text-[#00B0FF]" size={20} />
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 space-y-6">
          {/* Next Race Highlight */}
          <div className="bg-gradient-to-br from-[#00B0FF] to-[#0288D1] rounded-3xl p-6 text-white shadow-lg shadow-blue-500/20 relative overflow-hidden group">
            {/* Decoration */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
            
            <div className="flex items-start justify-between mb-6 relative z-10">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                   <Flag size={14} className="text-white/80" />
                   <p className="text-white/80 text-xs font-bold uppercase tracking-wider">Próxima Prova</p>
                </div>
                <h3 className="text-2xl font-bold mb-1 tracking-tight">Meia Maratona SP</h3>
                <p className="text-white/90 text-sm font-medium">16 Novembro • 07:00</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
              <div className="bg-black/20 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                <p className="text-white/70 text-[10px] mb-1 uppercase tracking-wide font-bold">Distância</p>
                <p className="text-white text-sm font-bold">21 km</p>
              </div>
              <div className="bg-black/20 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                <p className="text-white/70 text-[10px] mb-1 uppercase tracking-wide font-bold">Meta</p>
                <p className="text-white text-sm font-bold">Sub 1h45</p>
              </div>
              <div className="bg-black/20 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                <p className="text-white/70 text-[10px] mb-1 uppercase tracking-wide font-bold">Local</p>
                <p className="text-white text-sm font-bold">São Paulo</p>
              </div>
              <div className="bg-black/20 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                <p className="text-white/70 text-[10px] mb-1 uppercase tracking-wide font-bold">Atletas</p>
                <p className="text-white text-sm font-bold">5.200</p>
              </div>
            </div>
            
            <button className="w-full bg-white text-[#00B0FF] py-3.5 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-all font-bold shadow-sm touch-manipulation active:scale-[0.98] relative z-10">
              <Calendar size={18} />
              Ver Detalhes
            </button>
          </div>
          
          {/* Upcoming Races */}
          <div>
            <h3 className="text-gray-900 font-bold text-sm mb-4">Próximas Provas</h3>
            <div className="space-y-3">
              {upcomingRaces.map((race) => (
                <div
                  key={race.id}
                  className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-gray-200 transition-all group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 pr-2">
                      <h4 className="text-gray-900 text-sm font-bold mb-1 group-hover:text-[#00B0FF] transition-colors">{race.name}</h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                        <Calendar size={14} />
                        <span>{race.date}</span>
                        <span className="text-gray-300">•</span>
                        <span>{race.time}</span>
                      </div>
                    </div>
                    <div className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide border ${
                      race.status === 'confirmed'
                        ? 'bg-green-50 text-green-700 border-green-100'
                        : race.status === 'registered'
                        ? 'bg-blue-50 text-blue-700 border-blue-100'
                        : 'bg-gray-50 text-gray-600 border-gray-100'
                    }`}>
                      {race.status === 'confirmed' ? 'Confirmado' : race.status === 'registered' ? 'Inscrito' : 'Interesse'}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="bg-gray-50 border border-gray-100 rounded-xl p-2 text-center">
                      <p className="text-gray-400 text-[10px] mb-0.5 uppercase tracking-wide font-bold">KM</p>
                      <p className="text-gray-900 text-sm font-bold">{race.distance}</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-100 rounded-xl p-2 text-center">
                      <p className="text-gray-400 text-[10px] mb-0.5 uppercase tracking-wide font-bold">Meta</p>
                      <p className="text-gray-900 text-sm font-bold">{race.goal}</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-100 rounded-xl p-2 text-center">
                      <p className="text-gray-400 text-[10px] mb-0.5 uppercase tracking-wide font-bold">Atletas</p>
                      <p className="text-gray-900 text-sm font-bold">{race.participants}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-500 text-xs font-medium pt-2 border-t border-gray-50">
                    <MapPin size={14} />
                    <span>{race.city}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Past Races */}
          <div>
            <h3 className="text-gray-900 font-bold text-sm mb-4">Provas Realizadas</h3>
            <div className="space-y-3">
              {pastRaces.map((race) => (
                <div
                  key={race.id}
                  className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm opacity-90 hover:opacity-100 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-gray-900 text-sm font-bold mb-1">{race.name}</h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                        <Calendar size={14} />
                        <span>{race.date}</span>
                        <span className="text-gray-300">•</span>
                        <span>{race.distance}</span>
                      </div>
                    </div>
                    <Award size={20} className="text-[#FFB300]" />
                  </div>
                  
                  <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
                    <div className="bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                      <span className="text-gray-500 text-[10px] uppercase tracking-wide font-bold mr-2">Tempo</span>
                      <span className="text-gray-900 text-xs font-bold">{race.result}</span>
                    </div>
                    <div className="bg-red-50 px-3 py-1.5 rounded-lg border border-red-100">
                      <span className="text-red-400 text-[10px] uppercase tracking-wide font-bold mr-2">Posição</span>
                      <span className="text-[#E53935] text-xs font-bold">#{race.position}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Find Races Button */}
          <button className="w-full bg-white border-2 border-[#E53935] text-[#E53935] py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-red-50 transition-all font-bold touch-manipulation active:scale-[0.98] mb-6">
            <Flag size={20} />
            Buscar Novas Provas
          </button>
        </div>
      </div>
    </div>
  );
}
