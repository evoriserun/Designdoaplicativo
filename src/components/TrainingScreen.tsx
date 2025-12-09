import { useState } from "react";
import {
  Play,
  ChevronLeft,
  Target,
  TrendingUp,
  Award,
  CheckCircle,
  Circle,
  Zap,
  Brain,
  BarChart3,
  Dumbbell,
  Calendar,
} from "lucide-react";

interface TrainingScreenProps {
  onNavigate: (screen: string) => void;
}

const weekPlan = [
  {
    day: "Segunda",
    date: 11,
    completed: true,
    workout: "Corrida Leve",
    distance: "5 km",
    pace: "6:00/km",
    time: "30min",
  },
  {
    day: "Terça",
    date: 12,
    completed: true,
    workout: "Intervalado",
    distance: "8 km",
    pace: "5:20/km",
    time: "43min",
  },
  {
    day: "Quarta",
    date: 13,
    completed: true,
    workout: "Regenerativo",
    distance: "6 km",
    pace: "6:30/km",
    time: "39min",
  },
  {
    day: "Quinta",
    date: 14,
    completed: false,
    current: true,
    workout: "Intervalado 5x400m",
    distance: "8 km",
    pace: "5:20/km",
    time: "45min",
  },
  {
    day: "Sexta",
    date: 15,
    completed: false,
    workout: "Corrida Longa",
    distance: "14 km",
    pace: "6:00/km",
    time: "84min",
  },
  {
    day: "Sábado",
    date: 16,
    completed: false,
    workout: "Descanso Ativo",
    distance: "4 km",
    pace: "7:00/km",
    time: "28min",
  },
  {
    day: "Domingo",
    date: 17,
    completed: false,
    workout: "Descanso Total",
    distance: "-",
    pace: "-",
    time: "-",
  },
];

export function TrainingScreen({
  onNavigate,
}: TrainingScreenProps) {
  const [activeTab, setActiveTab] = useState<
    "plan" | "coach" | "history"
  >("plan");
  const currentWorkout = weekPlan.find((w) => w.current);

  return (
    <div className="w-full h-full bg-white overflow-hidden flex flex-col">
      <div className="flex-1 overflow-y-auto pb-28 no-scrollbar">
        {/* Header */}
        <div className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-20">
          <div className="p-5">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <button
                  onClick={() => onNavigate("home")}
                  className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-900 hover:bg-gray-100 active:scale-95 transition-all border border-gray-100"
                >
                  <ChevronLeft size={20} />
                </button>
                <h1 className="text-2xl text-gray-900 font-bold tracking-tight">
                  Treinamento
                </h1>
              </div>
              <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center border border-red-100">
                <Dumbbell
                  className="text-[#E53935]"
                  size={20}
                />
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-1 bg-gray-100 p-1.5 rounded-2xl">
              {[
                { id: "plan", label: "Plano Semanal" },
                { id: "coach", label: "Coach IA" },
                { id: "history", label: "Histórico" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-2.5 px-3 rounded-xl transition-all text-xs font-bold touch-manipulation ${
                    activeTab === tab.id
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Plano Semanal Tab */}
        {activeTab === "plan" && (
          <div className="p-5 space-y-6">
            {/* Today's Workout Highlight */}
            {currentWorkout && (
              <div className="bg-gradient-to-br from-[#E53935] to-[#C62828] rounded-3xl p-6 text-white shadow-lg shadow-red-500/20 relative overflow-hidden group">
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl"></div>

                <div className="flex items-start justify-between mb-6 relative z-10">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Zap
                        className="text-[#FFB300] fill-[#FFB300]"
                        size={16}
                      />
                      <p className="text-white/90 text-xs font-bold uppercase tracking-wider">
                        Treino de Hoje
                      </p>
                    </div>
                    <h3 className="text-2xl font-bold mb-1 truncate">
                      {currentWorkout.workout}
                    </h3>
                    <p className="text-white/80 text-sm font-medium">
                      {currentWorkout.day},{" "}
                      {currentWorkout.date} Nov
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6 relative z-10">
                  <div className="bg-black/20 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                    <p className="text-white/70 text-[10px] mb-1 uppercase tracking-wide font-bold">
                      Distância
                    </p>
                    <p className="text-white text-sm font-bold">
                      {currentWorkout.distance}
                    </p>
                  </div>
                  <div className="bg-black/20 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                    <p className="text-white/70 text-[10px] mb-1 uppercase tracking-wide font-bold">
                      Pace
                    </p>
                    <p className="text-white text-sm font-bold">
                      {currentWorkout.pace}
                    </p>
                  </div>
                  <div className="bg-black/20 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                    <p className="text-white/70 text-[10px] mb-1 uppercase tracking-wide font-bold">
                      Tempo
                    </p>
                    <p className="text-white text-sm font-bold">
                      {currentWorkout.time}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate("workoutTracking")}
                  className="w-full bg-white text-[#E53935] py-3.5 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-all font-bold shadow-sm touch-manipulation active:scale-[0.98] relative z-10"
                >
                  <Play size={16} fill="currentColor" />
                  Iniciar Corrida
                </button>
              </div>
            )}

            {/* Weekly Plan List */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <Calendar size={16} className="text-gray-400" />
                <h3 className="text-gray-900 font-bold text-sm">
                  Semana Completa
                </h3>
              </div>

              {weekPlan.map((workout, index) => (
                <div
                  key={index}
                  className={`bg-white border rounded-2xl p-4 transition-all ${
                    workout.current
                      ? "border-[#E53935] shadow-md shadow-red-500/5 ring-1 ring-[#E53935]/20"
                      : workout.completed
                        ? "border-green-100 bg-green-50/30"
                        : "border-gray-100"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex-shrink-0">
                      {workout.completed ? (
                        <CheckCircle
                          className="text-green-500"
                          size={20}
                        />
                      ) : workout.current ? (
                        <div className="relative">
                          <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20"></div>
                          <Circle
                            className="text-[#E53935] fill-[#E53935]"
                            size={20}
                          />
                        </div>
                      ) : (
                        <Circle
                          className="text-gray-300"
                          size={20}
                        />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1 gap-2">
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-sm font-bold truncate ${workout.current ? "text-[#E53935]" : "text-gray-900"}`}
                          >
                            {workout.workout}
                          </p>
                          <p className="text-gray-500 text-xs font-medium">
                            {workout.day}, {workout.date} Nov
                          </p>
                        </div>
                        {workout.completed && (
                          <span className="text-green-700 text-[10px] font-bold bg-green-100 px-2 py-1 rounded-full uppercase tracking-wide flex-shrink-0">
                            Concluído
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-xs text-gray-600 mt-2 font-medium">
                        <span className="bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                          {workout.distance}
                        </span>
                        <span className="bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                          {workout.pace}
                        </span>
                        <span className="bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                          {workout.time}
                        </span>
                      </div>

                      {/* Botão de ação */}
                      {!workout.completed &&
                        workout.distance !== "-" && (
                          <button className="w-full mt-3 bg-gray-900 text-white py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-black transition-all font-semibold shadow-sm touch-manipulation active:scale-[0.98] text-xs">
                            <Play
                              size={12}
                              fill="currentColor"
                            />
                            Iniciar Treino
                          </button>
                        )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Coach IA Tab */}
        {activeTab === "coach" && (
          <div className="p-5 space-y-6">
            {/* AI Assistant Header */}
            <div className="bg-gradient-to-br from-amber-400 to-amber-600 rounded-3xl p-6 text-white shadow-lg shadow-amber-500/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                  <Brain className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">
                    Coach EVORISE
                  </h3>
                  <p className="text-white/90 text-sm font-medium">
                    Assistente Inteligente
                  </p>
                </div>
              </div>
              <div className="bg-black/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <p className="text-white text-sm leading-relaxed font-medium">
                  "Bom dia, Lucas! Você está mantendo um ótimo
                  ritmo. Hoje é dia de treino intervalado -
                  vamos alcançar novos patamares! 💪"
                </p>
              </div>
            </div>

            {/* AI Insights */}
            <div className="space-y-3">
              <h3 className="text-gray-900 text-sm font-bold">
                Análise Inteligente
              </h3>

              <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Target
                      className="text-[#E53935]"
                      size={20}
                    />
                  </div>
                  <div>
                    <p className="text-gray-900 text-sm font-bold mb-1">
                      Meta da Semana
                    </p>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      Você está a apenas 1 treino de completar
                      sua meta semanal. Mantenha o foco!
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp
                      className="text-green-600"
                      size={20}
                    />
                  </div>
                  <div>
                    <p className="text-gray-900 text-sm font-bold mb-1">
                      Evolução de Pace
                    </p>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      Seu pace médio melhorou 15s/km nas últimas
                      2 semanas. Excelente progresso!
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Award
                      className="text-[#FFB300]"
                      size={20}
                    />
                  </div>
                  <div>
                    <p className="text-gray-900 text-sm font-bold mb-1">
                      Próximo Desafio
                    </p>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      Complete mais 2 treinos para desbloquear o
                      badge "Consistência de Ouro"!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Commands */}
            <div className="space-y-3">
              <h3 className="text-gray-900 text-sm font-bold">
                Comandos Rápidos
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Ajustar Pace",
                  "Ver Análise",
                  "Nova Meta",
                  "Reagendar",
                ].map((cmd, i) => (
                  <button
                    key={i}
                    className="bg-white border border-gray-100 rounded-2xl p-4 hover:border-gray-300 transition-all text-left touch-manipulation active:scale-[0.98] hover:shadow-md"
                  >
                    <p className="text-gray-900 text-sm font-bold">
                      {cmd}
                    </p>
                    <p className="text-gray-400 text-xs mt-1 font-medium">
                      Toque para iniciar
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Histórico Tab */}
        {activeTab === "history" && (
          <div className="p-5 space-y-6">
            <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center border border-amber-100">
                  <BarChart3
                    className="text-[#FFB300]"
                    size={20}
                  />
                </div>
                <h3 className="text-gray-900 font-bold">
                  Resumo Mensal
                </h3>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-5">
                <div className="text-center">
                  <p className="text-2xl text-gray-900 font-bold tracking-tight mb-1">
                    18
                  </p>
                  <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wide">
                    Treinos
                  </p>
                </div>
                <div className="text-center border-x border-gray-100">
                  <p className="text-2xl text-gray-900 font-bold tracking-tight mb-1">
                    124
                  </p>
                  <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wide">
                    km Total
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl text-gray-900 font-bold tracking-tight mb-1">
                    5:45
                  </p>
                  <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wide">
                    Pace Médio
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                <div className="flex justify-between text-xs mb-2 font-medium">
                  <span className="text-gray-600">
                    Progresso da Meta
                  </span>
                  <span className="text-[#E53935]">75%</span>
                </div>
                <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#E53935] to-[#FFB300] w-3/4 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Recent Workouts */}
            <div className="space-y-3">
              <h3 className="text-gray-900 text-sm font-bold">
                Treinos Recentes
              </h3>

              {[
                {
                  date: "13 Nov",
                  workout: "Regenerativo",
                  distance: "6 km",
                  pace: "6:30/km",
                  time: "39min",
                },
                {
                  date: "12 Nov",
                  workout: "Intervalado",
                  distance: "8 km",
                  pace: "5:20/km",
                  time: "43min",
                },
                {
                  date: "11 Nov",
                  workout: "Corrida Leve",
                  distance: "5 km",
                  pace: "6:00/km",
                  time: "30min",
                },
              ].map((workout, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-gray-900 text-sm font-bold">
                        {workout.workout}
                      </p>
                      <p className="text-gray-400 text-xs font-medium">
                        {workout.date}
                      </p>
                    </div>
                    <CheckCircle
                      className="text-green-500"
                      size={20}
                    />
                  </div>
                  <div className="flex gap-2 text-xs text-gray-600 font-medium">
                    <span className="bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                      {workout.distance}
                    </span>
                    <span className="bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                      {workout.pace}
                    </span>
                    <span className="bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                      {workout.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}