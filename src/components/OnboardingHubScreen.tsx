import { FileText, Zap, Lock, Check, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

interface OnboardingHubScreenProps {
  onStartAnamnese: () => void;
  onStartTest: () => void;
  isAnamneseCompleted: boolean;
}

export function OnboardingHubScreen({
  onStartAnamnese,
  onStartTest,
  isAnamneseCompleted,
}: OnboardingHubScreenProps) {
  return (
    <div className="w-full h-full bg-white flex flex-col p-6 overflow-y-auto">
      {/* Header Content */}
      <div className="mt-8 mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
          Antes de começar, vamos descobrir seu nível!
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          Prepare-se para realizar alguns testes e receber treinos feitos sob medida para sua evolução.
        </p>
      </div>

      {/* Main Dark Card */}
      <div className="bg-gray-900 rounded-3xl p-6 relative overflow-hidden flex-1 flex flex-col shadow-xl">
        {/* Background Gradient Effect */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-gray-800 to-transparent opacity-50 rounded-bl-full -mr-16 -mt-16 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-gray-800 to-transparent opacity-30 rounded-tr-full -ml-12 -mb-12 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col gap-8">
          
          {/* Step 1: Anamnese */}
          <div className="relative">
            <div className="flex items-start gap-4 mb-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 shrink-0 z-20 ${
                isAnamneseCompleted 
                  ? "bg-green-500 border-green-500 text-white" 
                  : "bg-white text-gray-900 border-white"
              }`}>
                {isAnamneseCompleted ? (
                  <Check size={20} strokeWidth={3} />
                ) : (
                  <FileText size={20} />
                )}
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-white font-bold text-lg mb-1">Questionário</h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-4">
                  Nessa etapa vamos fazer sua anamnese e coletar suas informações físicas e disponibilidade.
                </p>
                
                {isAnamneseCompleted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, x: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                    className="flex items-center gap-2 text-green-400 text-sm font-bold bg-green-400/10 px-3 py-1.5 rounded-lg w-fit"
                  >
                    <Check size={14} />
                    Concluído
                  </motion.div>
                ) : (
                  <button
                    onClick={onStartAnamnese}
                    className="bg-white text-gray-900 px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors flex items-center gap-2 active:scale-95"
                  >
                    Começar
                    <ChevronRight size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Vertical Connector Line */}
            <div className="absolute left-5 top-10 bottom-[-40px] w-0.5 z-10 bg-gray-700 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ height: "0%" }}
                  animate={{ height: isAnamneseCompleted ? "100%" : "0%" }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="w-full bg-green-500 absolute top-0 left-0"
                />
            </div>
          </div>

          {/* Step 2: Speed Test */}
          <div className="relative pt-2">
             <div className="flex items-start gap-4 mb-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 shrink-0 z-20 transition-colors ${
                isAnamneseCompleted 
                  ? "bg-white text-gray-900 border-white" 
                  : "bg-gray-800 text-gray-500 border-gray-700"
              }`}>
                <Zap size={20} fill={isAnamneseCompleted ? "currentColor" : "none"} />
              </div>
              <div className="flex-1 pt-1">
                <h3 className={`font-bold text-lg mb-1 ${isAnamneseCompleted ? "text-white" : "text-gray-500"}`}>
                  Avaliação de velocidade
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-4">
                  Processo para medir e analisar o desempenho em alta intensidade, identificando o nível atual de rapidez e eficiência do atleta.
                </p>
                
                <button
                  onClick={onStartTest}
                  disabled={!isAnamneseCompleted}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
                    isAnamneseCompleted
                      ? "bg-[#E53935] text-white hover:bg-red-600 active:scale-95 shadow-lg shadow-red-900/20"
                      : "bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700"
                  }`}
                >
                  {isAnamneseCompleted ? (
                    <>
                      Começar
                      <ChevronRight size={16} />
                    </>
                  ) : (
                    <>
                      <Lock size={14} />
                      Bloqueado
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
