import { Play, Target, TrendingUp, MapPin, Info } from 'lucide-react';

interface PendingTest1600Props {
  onStartTest: () => void;
}

export function PendingTest1600({ onStartTest }: PendingTest1600Props) {
  return (
    <div className="fixed inset-0 z-[60] bg-white flex flex-col h-dvh w-full">
      {/* Scrollable Content */}
      <div className="flex-1 w-full overflow-y-auto overflow-x-hidden scroll-smooth bg-white scrolling-touch">
        <div className="w-full max-w-md mx-auto flex flex-col min-h-full p-6">
          
          {/* Header - Minimalist & Premium */}
          <div className="pt-safe mt-10 mb-8 text-center space-y-3">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 leading-tight">
              Teste de 1600 metros
            </h1>
            <p className="text-base text-gray-500 font-medium leading-relaxed max-w-xs mx-auto">
              Próxima etapa para personalizar seu plano de treino
            </p>
          </div>

          {/* Info Cards - Grid Layout for Modern Feel */}
          <div className="space-y-4 mb-8">
            {/* Card 1: Context */}
            <div className="bg-gray-50/80 p-5 rounded-2xl flex items-start gap-4 transition-all hover:bg-gray-50">
              <div className="flex-shrink-0 w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600">
                <Target size={20} strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-gray-900 font-bold text-sm mb-1">O que é o teste?</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Você irá correr 1600 metros (4 voltas em uma pista padrão) em seu ritmo máximo sustentável.
                </p>
              </div>
            </div>

            {/* Card 2: Objective */}
            <div className="bg-gray-50/80 p-5 rounded-2xl flex items-start gap-4 transition-all hover:bg-gray-50">
              <div className="flex-shrink-0 w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-amber-600">
                <TrendingUp size={20} strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-gray-900 font-bold text-sm mb-1">Objetivo</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Medir sua velocidade, resistência e condicionamento aeróbico atual de forma precisa.
                </p>
              </div>
            </div>

            {/* Card 3: Mechanism */}
            <div className="bg-gray-50/80 p-5 rounded-2xl flex items-start gap-4 transition-all hover:bg-gray-50">
              <div className="flex-shrink-0 w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-green-600">
                <MapPin size={20} strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-gray-900 font-bold text-sm mb-1">Como funciona</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  O app monitora seu ritmo, distância e tempo via GPS. Mantenha o celular com você.
                </p>
              </div>
            </div>
          </div>

          {/* Premium "Important" Section */}
          <div className="mb-2 bg-gray-900 rounded-2xl p-6 relative overflow-hidden group">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
            
            <div className="relative z-10 flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <Info size={16} className="text-white" />
              </div>
              <div className="space-y-1">
                <h4 className="text-white font-bold text-sm">Importante</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Este teste é fundamental para calibrar seu plano de treino. Certifique-se de estar descansado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA - Premium & Fixed */}
      <div className="flex-shrink-0 bg-white border-t border-gray-100 px-6 py-5 pb-safe z-20">
        <div className="max-w-md mx-auto space-y-4">
          <button
            onClick={onStartTest}
            className="w-full bg-[#E53935] text-white py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#D32F2F] active:scale-[0.98] transition-all shadow-xl shadow-red-500/20 group relative overflow-hidden"
          >
             <span className="relative z-10 font-bold text-base tracking-wide flex items-center gap-2">
              <Play size={18} fill="currentColor" />
              INICIAR TESTE AGORA
            </span>
          </button>
          <p className="text-center text-xs text-gray-400 font-medium tracking-wide uppercase">
            Duração estimada: 6-12 minutos
          </p>
        </div>
      </div>
    </div>
  );
}
