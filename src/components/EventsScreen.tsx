import { MapPin, Calendar, Users, Navigation, Clock, ChevronRight } from 'lucide-react';

const upcomingEvents = [
  {
    title: 'Treino Intervalado em Grupo',
    date: '15 Nov, 2025',
    time: '06:00',
    location: 'Parque Ibirapuera',
    city: 'São Paulo - SP',
    distance: 12.5,
    participants: 45,
    maxParticipants: 60,
    type: 'Treino',
    difficulty: 'Intermediário',
  },
  {
    title: 'Long Run Domingo',
    date: '17 Nov, 2025',
    time: '07:00',
    location: 'Parque Villa-Lobos',
    city: 'São Paulo - SP',
    distance: 18,
    participants: 32,
    maxParticipants: 50,
    type: 'Treino',
    difficulty: 'Avançado',
  },
  {
    title: 'Corrida Regenerativa',
    date: '20 Nov, 2025',
    time: '06:30',
    location: 'Aterro do Flamengo',
    city: 'Rio de Janeiro - RJ',
    distance: 8,
    participants: 28,
    maxParticipants: 40,
    type: 'Treino',
    difficulty: 'Iniciante',
  },
  {
    title: 'EVORISE Running Festival',
    date: '25 Nov, 2025',
    time: '08:00',
    location: 'Lagoa Rodrigo de Freitas',
    city: 'Rio de Janeiro - RJ',
    distance: 21.1,
    participants: 156,
    maxParticipants: 200,
    type: 'Evento',
    difficulty: 'Todos os níveis',
  },
];

export function EventsScreen() {
  return (
    <div className="min-h-screen bg-black pb-24 max-w-md mx-auto overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-b from-zinc-900 to-black p-4 pb-3 safe-top">
        <h1 className="text-xl sm:text-2xl text-white mb-1.5">Eventos Presenciais</h1>
        <p className="text-zinc-400 text-xs sm:text-sm">Encontre treinos e eventos perto de você</p>
      </div>
      
      {/* Map Preview */}
      <div className="px-6 mb-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl h-48 relative overflow-hidden">
          {/* Map placeholder with gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black"></div>
          
          {/* Location pins */}
          <div className="absolute top-1/4 left-1/3">
            <div className="relative">
              <div className="absolute inset-0 bg-[#FF5E00] blur-lg opacity-50 animate-pulse"></div>
              <MapPin className="text-[#FF5E00] relative z-10" size={32} fill="currentColor" />
            </div>
          </div>
          <div className="absolute top-1/2 left-2/3">
            <MapPin className="text-[#FF5E00]" size={28} fill="currentColor" />
          </div>
          <div className="absolute bottom-1/4 left-1/2">
            <MapPin className="text-[#FF5E00]" size={28} fill="currentColor" />
          </div>
          
          {/* Map controls */}
          <button className="absolute bottom-4 right-4 bg-white text-black p-3 rounded-full shadow-lg hover:bg-zinc-100 transition-all">
            <Navigation size={20} />
          </button>
          
          {/* Location badge */}
          <div className="absolute top-4 left-4 bg-black/80 backdrop-blur px-3 py-2 rounded-lg border border-zinc-700">
            <p className="text-white text-sm">São Paulo, SP</p>
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="px-6 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button className="bg-[#FF5E00] text-white px-4 py-2 rounded-full text-sm whitespace-nowrap">
            Todos
          </button>
          <button className="bg-zinc-900 text-zinc-400 px-4 py-2 rounded-full text-sm whitespace-nowrap border border-zinc-800 hover:text-white transition-colors">
            Esta semana
          </button>
          <button className="bg-zinc-900 text-zinc-400 px-4 py-2 rounded-full text-sm whitespace-nowrap border border-zinc-800 hover:text-white transition-colors">
            Próximo mês
          </button>
          <button className="bg-zinc-900 text-zinc-400 px-4 py-2 rounded-full text-sm whitespace-nowrap border border-zinc-800 hover:text-white transition-colors">
            Eventos especiais
          </button>
        </div>
      </div>
      
      {/* Events List */}
      <div className="px-6 space-y-4">
        <h3 className="text-white text-sm mb-3">Próximos Eventos</h3>
        
        {upcomingEvents.map((event, index) => {
          const isSpecialEvent = event.type === 'Evento';
          const spotsLeft = event.maxParticipants - event.participants;
          const fillPercentage = (event.participants / event.maxParticipants) * 100;
          
          return (
            <div
              key={index}
              className={`rounded-xl p-5 transition-all hover:scale-[1.02] ${
                isSpecialEvent
                  ? 'bg-gradient-to-br from-[#FF5E00]/20 to-[#ff4500]/10 border-2 border-[#FF5E00]'
                  : 'bg-zinc-900 border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {/* Event Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {isSpecialEvent && (
                      <span className="bg-[#FF5E00] text-white text-xs px-2 py-1 rounded">
                        ESPECIAL
                      </span>
                    )}
                    <span className={`text-xs px-2 py-1 rounded ${
                      event.difficulty === 'Iniciante' ? 'bg-green-900/50 text-green-400' :
                      event.difficulty === 'Intermediário' ? 'bg-blue-900/50 text-blue-400' :
                      event.difficulty === 'Avançado' ? 'bg-red-900/50 text-red-400' :
                      'bg-purple-900/50 text-purple-400'
                    }`}>
                      {event.difficulty}
                    </span>
                  </div>
                  <h4 className="text-white text-lg mb-1">{event.title}</h4>
                </div>
                <ChevronRight className="text-zinc-500" size={20} />
              </div>
              
              {/* Event Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Calendar size={16} />
                  <span className="text-sm">{event.date}</span>
                  <Clock size={16} className="ml-2" />
                  <span className="text-sm">{event.time}</span>
                </div>
                
                <div className="flex items-center gap-2 text-zinc-400">
                  <MapPin size={16} />
                  <span className="text-sm">{event.location}</span>
                </div>
                
                <div className="flex items-center gap-2 text-zinc-400">
                  <Navigation size={16} />
                  <span className="text-sm">{event.city} • {event.distance} km</span>
                </div>
              </div>
              
              {/* Participants */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Users size={16} />
                    <span>{event.participants} confirmados</span>
                  </div>
                  <span className={`${spotsLeft <= 10 ? 'text-[#FF5E00]' : 'text-zinc-500'}`}>
                    {spotsLeft} vagas restantes
                  </span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      fillPercentage > 80 ? 'bg-gradient-to-r from-[#FF5E00] to-red-600' : 'bg-gradient-to-r from-[#FF5E00] to-[#ff4500]'
                    }`}
                    style={{ width: `${fillPercentage}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Action Button */}
              <button className={`w-full py-3 rounded-xl transition-all ${
                isSpecialEvent
                  ? 'bg-[#FF5E00] text-white hover:bg-[#ff6e1a]'
                  : 'bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700'
              }`}>
                Confirmar Presença
              </button>
            </div>
          );
        })}
      </div>
      
      {/* Quick Stats */}
      <div className="px-6 mt-6">
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 rounded-xl p-4">
          <h4 className="text-white mb-3 text-sm">Seus Eventos</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-[#FF5E00] text-xl">3</p>
              <p className="text-zinc-500 text-xs">Confirmados</p>
            </div>
            <div>
              <p className="text-[#FF5E00] text-xl">7</p>
              <p className="text-zinc-500 text-xs">Participados</p>
            </div>
            <div>
              <p className="text-[#FF5E00] text-xl">142</p>
              <p className="text-zinc-500 text-xs">Km em eventos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
