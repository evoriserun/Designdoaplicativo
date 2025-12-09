import { Play, Timer, Route, Target, TrendingUp } from 'lucide-react';

interface PendingTest1600Props {
  onStartTest: () => void;
}

export function PendingTest1600({ onStartTest }: PendingTest1600Props) {
  return (
    <div className="fixed inset-0 z-[60] bg-white flex flex-col h-dvh w-full">
      {/* Scrollable Content */}
      <div className="flex-1 w-full overflow-y-auto overflow-x-hidden scroll-smooth bg-white scrolling-touch">
        <div className="w-full max-w-md mx-auto flex flex-col min-h-full">
          {/* Header */}
          <div className="px-6 pt-safe pb-8 flex-shrink-0 mt-8">
            <div className="flex items-center justify-center w-16 h-16 bg-red-50 rounded-2xl mb-6 mx-auto">
              <Timer size={32} className="text-[#E53935]" />
            </div>
            <h1 className="text-center text-gray-900 mb-3 text-2xl font-bold">
              Teste de 1600 metros
            </h1>
            <p className="text-center text-gray-600 max-w-xs mx-auto">
              Próxima etapa para personalizar seu plano de treino
            </p>
          </div>

          {/* Content */}
          <div className="px-6 pb-10 flex-1">
            <div className="space-y-6">
              {/* Info Card */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Target size={20} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1 font-semibold text-sm">O que é o teste?</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Você irá correr 1600 metros (4 voltas em uma pista padrão) em ritmo máximo sustentável.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                    <TrendingUp size={20} className="text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1 font-semibold text-sm">Objetivo</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Medir sua velocidade, resistência e condicionamento aeróbico atual.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                    <Route size={20} className="text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1 font-semibold text-sm">Como funciona</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Durante o teste, o app acompanhará seu ritmo, distância e tempo em tempo real com GPS.
                    </p>
                  </div>
                </div>
              </div>

              {/* Important Note */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 shadow-sm">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-amber-900 mb-1 font-semibold text-sm">Importante</h4>
                    <p className="text-amber-800 text-sm leading-relaxed">
                      Somente após concluir este teste, o app poderá gerar seu plano de treino completamente personalizado.
                    </p>
                  </div>
                </div>
              </div>

              {/* Preparation Tips */}
              <div className="space-y-4 mb-6 bg-gray-50 p-5 rounded-2xl border border-gray-100">
                <h3 className="text-gray-900 font-semibold text-sm">Antes de começar:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm text-gray-600">
                    <div className="flex-shrink-0 w-5 h-5 bg-white border border-gray-200 rounded-full flex items-center justify-center mt-0.5 text-[10px] font-bold">
                      1
                    </div>
                    <span>Faça um aquecimento de 10-15 minutos</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-gray-600">
                    <div className="flex-shrink-0 w-5 h-5 bg-white border border-gray-200 rounded-full flex items-center justify-center mt-0.5 text-[10px] font-bold">
                      2
                    </div>
                    <span>Escolha um local plano e seguro para correr</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-gray-600">
                    <div className="flex-shrink-0 w-5 h-5 bg-white border border-gray-200 rounded-full flex items-center justify-center mt-0.5 text-[10px] font-bold">
                      3
                    </div>
                    <span>Permita o acesso ao GPS quando solicitado</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-gray-600">
                    <div className="flex-shrink-0 w-5 h-5 bg-white border border-gray-200 rounded-full flex items-center justify-center mt-0.5 text-[10px] font-bold">
                      4
                    </div>
                    <span>Mantenha o celular com você durante a corrida</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Spacer for safety */}
            <div className="h-4 w-full"></div>
          </div>
        </div>
      </div>

      {/* Bottom CTA - Fixed */}
      <div className="flex-shrink-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 px-6 py-5 pb-safe z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="max-w-md mx-auto space-y-3 w-full">
          <button
            onClick={onStartTest}
            className="w-full bg-[#E53935] text-white py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#D32F2F] active:scale-[0.98] transition-all touch-manipulation shadow-lg shadow-red-500/20 font-bold"
          >
            <Play size={20} fill="white" />
            <span>Iniciar Teste Agora</span>
          </button>
          <p className="text-center text-xs text-gray-500 font-medium">
            Duração estimada: 6-12 minutos
          </p>
        </div>
      </div>
    </div>
  );
}
