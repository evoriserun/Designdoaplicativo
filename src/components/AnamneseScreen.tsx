import { useState } from "react";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";

interface AnamneseScreenProps {
  onComplete: () => void;
}

const steps = [
  {
    id: "nivel",
    title: "Qual seu nível como corredor?",
    subtitle:
      "Seja honesto para personalizar melhor seu treino",
    options: [
      {
        value: "iniciante",
        label: "Iniciante",
        icon: "🌱",
        desc: "0–6 meses correndo, ritmo leve, distância curta",
      },
      {
        value: "intermediario",
        label: "Intermediário",
        icon: "💪",
        desc: "6 meses–2 anos correndo, treinos regulares, prova de 5–10 km",
      },
      {
        value: "avancado",
        label: "Avançado",
        icon: "🏆",
        desc: "2–5 anos correndo, ritmo forte, provas de 10–21 km",
      },
      {
        value: "elite",
        label: "Elite",
        icon: "⚡",
        desc: "Alto desempenho, treinos intensos, provas de 21–42 km",
      },
    ],
  },
  {
    id: "objetivo",
    title: "Qual seu objetivo principal no esporte?",
    subtitle: "Escolha o que mais motiva você",
    options: [
      {
        value: "performance",
        label: "Performance",
        icon: "⚡",
        desc: "Superar limites e quebrar recordes",
      },
      {
        value: "saude",
        label: "Saúde",
        icon: "❤️",
        desc: "Qualidade de vida e bem-estar",
      },
      {
        value: "emagrecimento",
        label: "Emagrecimento",
        icon: "🔥",
        desc: "Perder peso com saúde",
      },
      {
        value: "constancia",
        label: "Constância",
        icon: "🎯",
        desc: "Criar hábito e disciplina",
      },
    ],
  },
  {
    id: "meta",
    title: "Qual sua distância foco?",
    subtitle: "Objetivo de prova ou desafio",
    options: [
      { value: "5k", label: "5 km", icon: "🎯" },
      { value: "10k", label: "10 km", icon: "⚡" },
      { value: "15k", label: "15 km", icon: "🏃" },
      { value: "21k", label: "21 km (Meia)", icon: "🏅" },
      { value: "42k", label: "42 km (Maratona)", icon: "🏆" },
    ],
  },
  {
    id: "frequencia",
    title: "Dias da semana que deseja treinar",
    subtitle: "Selecione todos os dias disponíveis",
    multiSelect: true,
    options: [
      { value: "seg", label: "Segunda" },
      { value: "ter", label: "Terça" },
      { value: "qua", label: "Quarta" },
      { value: "qui", label: "Quinta" },
      { value: "sex", label: "Sexta" },
      { value: "sab", label: "Sábado" },
      { value: "dom", label: "Domingo" },
    ],
  },
  {
    id: "complementar",
    title: "Pratica atividade complementar?",
    subtitle: "Outras atividades que você realiza",
    options: [
      { value: "nenhuma", label: "Nenhuma", icon: "🚫" },
      {
        value: "artes-marciais",
        label: "Arte Marcial",
        icon: "🥋",
      },
      { value: "natacao", label: "Natação", icon: "🏊" },
      { value: "academia", label: "Academia", icon: "💪" },
      { value: "outros", label: "Outros", icon: "🏃" },
    ],
  },
];

export function AnamneseScreen({
  onComplete,
}: AnamneseScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPersonalData, setShowPersonalData] =
    useState(false);
  const [answers, setAnswers] = useState<Record<string, any>>(
    {},
  );
  const [personalData, setPersonalData] = useState({
    peso: "",
    altura: "",
    dataNascimento: "",
    sexo: "",
  });

  const currentStepData = steps[currentStep];
  const totalSteps = steps.length + 1; // +1 para dados pessoais
  const progress = showPersonalData
    ? ((currentStep + 2) / totalSteps) * 100
    : ((currentStep + 1) / totalSteps) * 100;

  const handleOptionSelect = (value: string) => {
    if (currentStepData.multiSelect) {
      const currentSelections =
        answers[currentStepData.id] || [];
      const newSelections = currentSelections.includes(value)
        ? currentSelections.filter((v: string) => v !== value)
        : [...currentSelections, value];
      setAnswers({
        ...answers,
        [currentStepData.id]: newSelections,
      });
    } else {
      setAnswers({ ...answers, [currentStepData.id]: value });
    }
  };

  const isOptionSelected = (value: string) => {
    if (currentStepData.multiSelect) {
      return (answers[currentStepData.id] || []).includes(
        value,
      );
    }
    return answers[currentStepData.id] === value;
  };

  const canProceed = () => {
    if (showPersonalData) {
      return (
        personalData.peso &&
        personalData.altura &&
        personalData.dataNascimento &&
        personalData.sexo
      );
    }
    if (currentStepData.multiSelect) {
      return (answers[currentStepData.id] || []).length > 0;
    }
    return !!answers[currentStepData.id];
  };

  const handleNext = () => {
    if (!showPersonalData && currentStep === steps.length - 1) {
      setShowPersonalData(true);
    } else if (showPersonalData) {
      onComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (showPersonalData) {
      setShowPersonalData(false);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-white flex flex-col h-dvh w-full">
      {/* Progress Bar - Fixed Top */}
      <div className="flex-shrink-0 z-20 bg-white border-b border-gray-200 pt-safe">
        <div className="h-1.5 bg-gray-100">
          <div
            className="h-full bg-gradient-to-r from-[#E53935] to-[#FFB300] transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="p-3 flex items-center justify-between">
          {/* Back button logic: hide if currentStep is 0 AND personal data is not showing */}
          {(!showPersonalData && currentStep === 0) ? (
            <div className="w-8 h-8"></div> // Empty placeholder to maintain alignment
          ) : (
            <button
              onClick={handleBack}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors touch-manipulation active:scale-95"
            >
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
          )}
          
          <span className="text-xs text-gray-500 font-medium">
            {showPersonalData
              ? `${steps.length + 1}`
              : `${currentStep + 1}`}{" "}
            de {totalSteps}
          </span>
        </div>
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 w-full overflow-y-auto overflow-x-hidden scroll-smooth bg-white scrolling-touch">
        <div className="w-full max-w-md mx-auto flex flex-col min-h-full px-4 py-4 pb-6">
          {!showPersonalData ? (
            <>
              {/* Question */}
              <div className="mb-5">
                <h2 className="text-xl sm:text-2xl text-gray-900 mb-2">
                  {currentStepData.title}
                </h2>
                <p className="text-sm text-gray-500">
                  {currentStepData.subtitle}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentStepData.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() =>
                      handleOptionSelect(option.value)
                    }
                    className={`w-full text-left border-2 rounded-xl p-3.5 sm:p-4 transition-all touch-manipulation active:scale-95 ${
                      isOptionSelected(option.value)
                        ? "border-[#E53935] bg-red-50 shadow-md shadow-[#E53935]/10"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-start gap-2.5 sm:gap-3">
                      {option.icon && (
                        <span className="text-xl sm:text-2xl flex-shrink-0">
                          {option.icon}
                        </span>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3
                            className={`font-medium text-sm sm:text-base ${isOptionSelected(option.value) ? "text-[#E53935]" : "text-gray-900"}`}
                          >
                            {option.label}
                          </h3>
                          {isOptionSelected(option.value) && (
                            <Check
                              size={18}
                              className="text-[#E53935] flex-shrink-0"
                            />
                          )}
                        </div>
                        {option.desc && (
                          <p className="text-gray-600 text-xs sm:text-sm mt-1">
                            {option.desc}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Personal Data Form */}
              <div className="mb-5">
                <h2 className="text-xl sm:text-2xl text-gray-900 mb-2">
                  Dados Pessoais
                </h2>
                <p className="text-sm text-gray-500">
                  Para personalizar ainda mais seu treino
                </p>
              </div>

              <div className="space-y-3.5">
                <div>
                  <label className="block text-gray-700 mb-1.5 text-sm font-medium">
                    Peso (kg)
                  </label>
                  <input
                    type="number"
                    value={personalData.peso}
                    onChange={(e) =>
                      setPersonalData({
                        ...personalData,
                        peso: e.target.value,
                      })
                    }
                    placeholder="Ex: 75"
                    className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-[#E53935] focus:outline-none transition-colors text-base"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1.5 text-sm font-medium">
                    Altura (cm)
                  </label>
                  <input
                    type="number"
                    value={personalData.altura}
                    onChange={(e) =>
                      setPersonalData({
                        ...personalData,
                        altura: e.target.value,
                      })
                    }
                    placeholder="Ex: 175"
                    className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-[#E53935] focus:outline-none transition-colors text-base"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1.5 text-sm font-medium">
                    Data de Nascimento
                  </label>
                  <input
                    type="date"
                    value={personalData.dataNascimento}
                    onChange={(e) =>
                      setPersonalData({
                        ...personalData,
                        dataNascimento: e.target.value,
                      })
                    }
                    className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-[#E53935] focus:outline-none transition-colors text-base"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1.5 text-sm font-medium">
                    Sexo
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      onClick={() =>
                        setPersonalData({
                          ...personalData,
                          sexo: "masculino",
                        })
                      }
                      className={`border-2 rounded-xl p-3 transition-all touch-manipulation active:scale-95 text-sm ${
                        personalData.sexo === "masculino"
                          ? "border-[#E53935] bg-red-50 text-[#E53935] font-medium"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      Masculino
                    </button>
                    <button
                      onClick={() =>
                        setPersonalData({
                          ...personalData,
                          sexo: "feminino",
                        })
                      }
                      className={`border-2 rounded-xl p-3 transition-all touch-manipulation active:scale-95 text-sm ${
                        personalData.sexo === "feminino"
                          ? "border-[#E53935] bg-red-50 text-[#E53935] font-medium"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      Feminino
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Spacer to ensure content isn't hidden behind footer if screen is small */}
          <div className="h-4 w-full"></div>
        </div>
      </div>

      {/* Fixed Footer - Floating Effect */}
      <div className="w-full bg-white/80 backdrop-blur-xl border-t border-gray-100 p-6 pb-safe flex-shrink-0 z-20">
        <div className="max-w-md mx-auto w-full mb-2">
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 transition-all font-bold touch-manipulation text-base shadow-lg ${
              canProceed()
                ? "bg-gradient-to-r from-[#E53935] to-[#B71C1C] text-white shadow-[#E53935]/25 hover:shadow-red-500/40 active:scale-[0.98] hover:-translate-y-0.5"
                : "bg-gray-100 text-gray-400 cursor-not-allowed shadow-gray-200/50"
            }`}
          >
            <span>
              {showPersonalData
                ? "Concluir Anamnese"
                : "Próximo"}
            </span>
            <ChevronRight size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
