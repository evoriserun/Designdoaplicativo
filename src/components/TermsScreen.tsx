import { useState, useRef, useEffect } from 'react';
import { CheckCircle, Shield } from 'lucide-react';

interface TermsScreenProps {
  onAccept: () => void;
}

export function TermsScreen({ onAccept }: TermsScreenProps) {
  const [agreed, setAgreed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Garantir que o scroll esteja no topo ao montar
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, []);

  return (
    <div className="fixed inset-0 z-[60] bg-white flex flex-col h-dvh w-full">
      {/* Área de Scroll Principal */}
      <div 
        ref={scrollRef}
        className="flex-1 w-full overflow-y-auto overflow-x-hidden scroll-smooth bg-white scrolling-touch"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div className="w-full max-w-md mx-auto flex flex-col min-h-full">
          
          {/* Header - Rola junto com o conteúdo */}
          <div className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-100 p-5 pt-safe flex-shrink-0">
            <div className="flex items-center gap-2.5 mb-1 mt-4">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shadow-sm flex-shrink-0">
                 <Shield className="text-[#E53935]" size={24} />
              </div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">Termo de Responsabilidade</h1>
            </div>
            <p className="text-gray-500 text-sm font-medium">Leia atentamente antes de prosseguir</p>
          </div>

          <div className="p-5 space-y-5 flex-grow pb-10">
            
            {/* Terms Content */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4 shadow-sm">
              <h3 className="text-gray-900 font-bold text-base">Riscos e Responsabilidades</h3>
              
              <div className="space-y-3 text-gray-600 text-sm leading-relaxed font-medium">
                <p>
                  <strong className="text-gray-900">1. Riscos de Saúde:</strong> A prática de atividades físicas intensas pode apresentar riscos caso você tenha problemas cardíacos, respiratórios, ortopédicos ou qualquer outra condição que possa comprometer sua saúde.
                </p>
                
                <p>
                  <strong className="text-gray-900">2. Confirmação de Responsabilidade:</strong> Ao utilizar este aplicativo, você confirma ser responsável por informar qualquer condição médica relevante e assumir os riscos associados à prática dos treinos propostos.
                </p>
                
                <p>
                  <strong className="text-gray-900">3. Orientação Médica:</strong> Você deve procurar orientação médica antes de iniciar ou continuar os treinos caso apresente sintomas como:
                </p>
                
                <ul className="list-disc list-inside space-y-1.5 ml-2 marker:text-[#E53935]">
                  <li>Dor no peito ou desconforto torácico</li>
                  <li>Tontura ou desmaios frequentes</li>
                  <li>Falta de ar intensa durante atividades leves</li>
                  <li>Palpitações cardíacas fortes ou irregulares</li>
                  <li>Dores articulares ou musculares persistentes</li>
                  <li>Histórico de problemas cardíacos ou respiratórios</li>
                </ul>
                
                <p>
                  <strong className="text-gray-900">4. Limitação de Responsabilidade:</strong> O SEMOV e seus desenvolvedores não se responsabilizam por lesões, danos ou problemas de saúde decorrentes do uso inadequado do aplicativo ou da não observância de suas condições médicas.
                </p>
                
                <p>
                  <strong className="text-gray-900">5. Recomendações:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1.5 ml-2 marker:text-[#E53935]">
                  <li>Realize avaliação médica periódica</li>
                  <li>Respeite seus limites físicos</li>
                  <li>Hidrate-se adequadamente</li>
                  <li>Interrompa o treino se sentir dor ou desconforto</li>
                  <li>Utilize equipamentos adequados</li>
                </ul>
              </div>
            </div>

            {/* Checkbox Agreement */}
            <div 
              className={`bg-white border-2 rounded-2xl p-4 transition-all shadow-sm cursor-pointer select-none ${
                agreed ? 'border-[#E53935]/50 bg-red-50/10' : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setAgreed(!agreed)}
            >
              <div className="flex items-start gap-3 pointer-events-none">
                <div className="relative flex items-center mt-0.5">
                  <div className={`w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center flex-shrink-0 ${
                    agreed ? 'bg-[#E53935] border-[#E53935]' : 'border-gray-300 bg-white'
                  }`}>
                    <CheckCircle className={`text-white transition-opacity duration-200 ${agreed ? 'opacity-100' : 'opacity-0'}`} size={16} strokeWidth={3} />
                  </div>
                </div>
                <span className="text-gray-600 text-sm leading-relaxed font-medium">
                  <strong className="text-gray-900">Li e concordo</strong> com todos os termos apresentados acima. Confirmo que estou ciente dos riscos e assumo total responsabilidade pela prática dos treinos propostos pelo SEMOV.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rodapé Fixo - Sempre visível */}
      <div className="w-full bg-white border-t border-gray-100 p-5 pb-safe flex-shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-20 relative">
        <div className="max-w-md mx-auto w-full mb-2">
          <button
            onClick={onAccept}
            disabled={!agreed}
            className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 transition-all font-bold touch-manipulation text-base shadow-lg ${
              agreed
                ? 'bg-gradient-to-r from-[#E53935] to-[#B71C1C] text-white shadow-red-500/20 active:scale-[0.98]'
                : 'bg-gray-100 text-gray-400 shadow-transparent cursor-not-allowed'
            }`}
          >
            {agreed && <CheckCircle size={20} />}
            <span>Prosseguir para o SEMOV</span>
          </button>
          
          {!agreed && (
            <p className="text-center text-gray-400 text-xs font-medium mt-3">
              Você precisa concordar com os termos para continuar
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
