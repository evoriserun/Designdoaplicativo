import { useState } from "react";
import {
  Play,
  TrendingUp,
  Flame,
  Award,
  Flag,
  User,
  Calendar,
} from "lucide-react";
import { SmovaLogo } from "./SmovaLogo";

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

const weekDays = [
  {
    day: "SEG",
    date: 11,
    type: "completed",
    workout: "Corrida Leve",
    distance: "5 km",
    pace: "6:00/km",
  },
  {
    day: "TER",
    date: 12,
    type: "completed",
    workout: "Intervalado",
    distance: "8 km",
    pace: "5:20/km",
  },
  {
    day: "QUA",
    date: 13,
    type: "completed",
    workout: "Regenerativo",
    distance: "6 km",
    pace: "6:30/km",
  },
  {
    day: "QUI",
    date: 14,
    type: "next",
    workout: "Intervalado 5x400m",
    distance: "8 km",
    pace: "5:20/km",
  },
  {
    day: "SEX",
    date: 15,
    type: "upcoming",
    workout: "Corrida Longa",
    distance: "14 km",
    pace: "6:00/km",
  },
  {
    day: "SAB",
    date: 16,
    type: "race",
    workout: "Meia Maratona SP",
    distance: "21 km",
    location: "São Paulo",
  },
  {
    day: "DOM",
    date: 17,
    type: "rest",
    workout: "Descanso Ativo",
    distance: "-",
  },
];

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const [selectedDay, setSelectedDay] = useState(3);
  const selectedDayData = weekDays[selectedDay];

  return (
    <div className="w-full h-full bg-white overflow-hidden flex flex-col">
      <div className="flex-1 overflow-y-auto pb-28 no-scrollbar">
        {/* Header - Refined */}
        <div className="bg-white/95 backdrop-blur-sm p-5 pt-6 sticky top-0 z-20">
          <div className="flex items-center justify-between mb-6">
            <div className="min-w-0 flex-1">
              <SmovaLogo variant="full" className="h-6 text-gray-900" />
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-gradient-to-br from-[#E53935] to-[#B71C1C] px-3 py-1.5 rounded-full shadow-md shadow-[#E53935]/20 flex-shrink-0">
                <Flame
                  className="text-[#FFB300] fill-[#FFB300]"
                  size={14}
                />
                <span className="text-white text-xs font-bold">
                  12
                </span>
                <span className="text-white/90 text-[10px] font-medium">
                  dias
                </span>
              </div>

              <button
                onClick={() => onNavigate("profile")}
                className="w-9 h-9 bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:border-gray-300 transition-all active:scale-95 touch-manipulation shadow-sm"
              >
                <User size={18} />
              </button>
            </div>
          </div>

          {/* Weekly Progress - Premium Card */}
          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-50 to-red-50 rounded-bl-full -z-10 opacity-50"></div>

            <div className="flex items-center justify-between mb-3">
              <h3 className="text-gray-900 text-sm font-semibold flex items-center gap-2">
                <Calendar
                  size={16}
                  className="text-[#E53935]"
                />
                Progresso Semanal
              </h3>
              <span className="text-[#FFB300] text-xs font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">
                4/5 treinos
              </span>
            </div>

            <div className="h-2 bg-gray-100 rounded-full overflow-hidden border border-gray-100 mb-3">
              <div className="h-full bg-gradient-to-r from-[#E53935] to-[#FFB300] w-4/5 rounded-full shadow-[0_0_10px_rgba(229,57,53,0.3)]"></div>
            </div>

            <div className="flex items-center gap-6 text-xs">
              <div className="flex items-center gap-1.5">
                <TrendingUp
                  size={14}
                  className="text-[#FFB300]"
                />
                <span className="text-gray-900 font-medium">
                  28.5 km
                </span>
                <span className="text-gray-400">totais</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award size={14} className="text-[#E53935]" />
                <span className="text-gray-900 font-medium">
                  +340
                </span>
                <span className="text-gray-400">pontos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Calendar - Enhanced Grid */}
        <div className="px-5 py-6">
          <h3 className="text-gray-400 mb-4 text-[10px] uppercase tracking-widest font-bold pl-1">
            Novembro 2025
          </h3>

          <div className="grid grid-cols-7 gap-1.5">
            {weekDays.map((day, index) => {
              const isSelected = selectedDay === index;
              let statusIcon = null;
              let borderColor = "border-transparent";
              let bgColor = "bg-gray-50";
              let textColor = "text-gray-400";
              let dateColor = "text-gray-700";
              let shadow = "";

              if (day.type === "completed") {
                statusIcon = (
                  <div className="w-1 h-1 rounded-full bg-green-500 mx-auto mt-1"></div>
                );
                bgColor = "bg-green-50/50";
                dateColor = "text-green-700";
                if (isSelected) {
                  bgColor = "bg-green-100";
                  borderColor = "border-green-300";
                  shadow = "shadow-sm";
                }
              } else if (day.type === "next") {
                statusIcon = (
                  <div className="w-1 h-1 rounded-full bg-[#E53935] mx-auto mt-1 animate-pulse"></div>
                );
                bgColor = "bg-white";
                borderColor = "border-[#E53935]";
                dateColor = "text-[#E53935]";
                shadow = "shadow-md shadow-red-100";
                if (isSelected) {
                  bgColor = "bg-[#E53935]";
                  dateColor = "text-white";
                  textColor = "text-white/70";
                  statusIcon = (
                    <div className="w-1 h-1 rounded-full bg-white mx-auto mt-1"></div>
                  );
                }
              } else if (day.type === "race") {
                statusIcon = (
                  <div className="w-1 h-1 rounded-full bg-[#00B0FF] mx-auto mt-1"></div>
                );
                bgColor = "bg-blue-50/50";
                dateColor = "text-[#00B0FF]";
                if (isSelected) {
                  bgColor = "bg-blue-100";
                  borderColor = "border-blue-300";
                  shadow = "shadow-sm";
                }
              }

              if (
                isSelected &&
                !["completed", "next", "race"].includes(
                  day.type,
                )
              ) {
                bgColor = "bg-gray-900";
                dateColor = "text-white";
                textColor = "text-white/70";
                shadow = "shadow-md";
              }

              return (
                <button
                  key={index}
                  onClick={() => setSelectedDay(index)}
                  className={`${bgColor} border ${borderColor} ${shadow} rounded-xl py-2.5 flex flex-col items-center justify-center gap-0.5 transition-all duration-200 touch-manipulation active:scale-90`}
                >
                  <span
                    className={`text-[9px] uppercase font-bold tracking-wider ${textColor}`}
                  >
                    {day.day}
                  </span>
                  <span
                    className={`text-sm font-bold ${dateColor}`}
                  >
                    {day.date}
                  </span>
                  {statusIcon || (
                    <div className="w-1 h-1 mt-1"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Day Details - Card Design */}
        {selectedDayData && (
          <div className="px-5 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0 pr-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        selectedDayData.type === "completed"
                          ? "bg-green-500"
                          : selectedDayData.type === "next"
                            ? "bg-[#E53935]"
                            : selectedDayData.type === "race"
                              ? "bg-[#00B0FF]"
                              : "bg-gray-300"
                      }`}
                    ></span>
                    <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">
                      {selectedDayData.day} •{" "}
                      {selectedDayData.date} NOV
                    </p>
                  </div>
                  <h4 className="text-xl text-gray-900 font-bold truncate leading-tight">
                    {selectedDayData.workout}
                  </h4>
                </div>

                <div
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                    selectedDayData.type === "completed"
                      ? "bg-green-50 text-green-700 border-green-100"
                      : selectedDayData.type === "next"
                        ? "bg-red-50 text-[#E53935] border-red-100"
                        : selectedDayData.type === "race"
                          ? "bg-blue-50 text-[#00B0FF] border-blue-100"
                          : "bg-gray-50 text-gray-500 border-gray-100"
                  }`}
                >
                  {selectedDayData.type === "completed"
                    ? "Concluído"
                    : selectedDayData.type === "next"
                      ? "Hoje"
                      : selectedDayData.type === "race"
                        ? "Prova"
                        : selectedDayData.type === "rest"
                          ? "Descanso"
                          : "Futuro"}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-gray-50 rounded-2xl p-3 border border-gray-100">
                  <p className="text-gray-400 text-[10px] mb-1 uppercase tracking-wide font-bold">
                    Distância
                  </p>
                  <p className="text-gray-900 text-base font-bold">
                    {selectedDayData.distance}
                  </p>
                </div>
                {selectedDayData.pace && (
                  <div className="bg-gray-50 rounded-2xl p-3 border border-gray-100">
                    <p className="text-gray-400 text-[10px] mb-1 uppercase tracking-wide font-bold">
                      Pace Alvo
                    </p>
                    <p className="text-gray-900 text-base font-bold">
                      {selectedDayData.pace}
                    </p>
                  </div>
                )}
                {selectedDayData.location && (
                  <div className="bg-blue-50 rounded-2xl p-3 border border-blue-100 col-span-2">
                    <p className="text-blue-400 text-[10px] mb-1 uppercase tracking-wide font-bold">
                      Local
                    </p>
                    <p className="text-blue-900 text-base font-bold">
                      {selectedDayData.location}
                    </p>
                  </div>
                )}
              </div>

              {selectedDayData.type === "next" && (
                <button
                  onClick={() => onNavigate("training")}
                  className="w-full bg-gradient-to-r from-[#E53935] to-[#C62828] text-white py-3.5 rounded-2xl flex items-center justify-center gap-2.5 hover:shadow-lg hover:shadow-red-500/20 transition-all shadow-md shadow-red-500/10 touch-manipulation active:scale-[0.98] font-semibold text-sm group"
                >
                  <div className="bg-white/20 p-1 rounded-full group-hover:scale-110 transition-transform">
                    <Play
                      size={14}
                      fill="currentColor"
                      className="ml-0.5"
                    />
                  </div>
                  Iniciar Treino
                </button>
              )}

              {selectedDayData.type === "race" && (
                <button
                  onClick={() => onNavigate("races")}
                  className="w-full bg-gradient-to-r from-[#00B0FF] to-[#0091EA] text-white py-3.5 rounded-2xl flex items-center justify-center gap-2.5 hover:shadow-lg hover:shadow-blue-500/20 transition-all shadow-md shadow-blue-500/10 touch-manipulation active:scale-[0.98] font-semibold text-sm"
                >
                  <Flag size={16} />
                  Detalhes da Prova
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
