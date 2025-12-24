import { useState } from "react";
import {
  Play,
  TrendingUp,
  Flame,
  Award,
  Flag,
  User,
  Calendar,
  Trophy,
  Timer,
} from "lucide-react";

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

const personalRecords = [
  { distance: "5 km", time: "24:15", pace: "4:51/km", date: "15 OUT 2025" },
  { distance: "10 km", time: "52:30", pace: "5:15/km", date: "22 SET 2025" },
  { distance: "21 km", time: "1:58:45", pace: "5:39/km", date: "10 AGO 2025" },
];

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
    <div className="w-full h-full bg-gray-50/50 overflow-hidden flex flex-col">
      <div className="flex-1 overflow-y-auto pb-28 no-scrollbar">
        {/* Header - Refined */}
        <div className="bg-white/95 backdrop-blur-sm px-6 pt-6 pb-2 sticky top-0 z-20 border-b border-gray-100/50">
          <div className="flex items-center justify-between mb-6">
            <div className="min-w-0 flex-1">
               <h1 className="text-xl font-bold text-gray-900 tracking-tight">Olá, Lucas</h1>
               <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Vamos treinar?</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-gradient-to-br from-[#E53935] to-[#B71C1C] px-3 py-1.5 rounded-full shadow-lg shadow-[#E53935]/20 flex-shrink-0">
                <Flame
                  className="text-[#FFB300] fill-[#FFB300]"
                  size={14}
                />
                <span className="text-white text-xs font-bold">
                  12
                </span>
                <span className="text-white/90 text-[10px] font-medium uppercase tracking-wider">
                  dias
                </span>
              </div>

              <button
                onClick={() => onNavigate("profile")}
                className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-all active:scale-95 touch-manipulation shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
              >
                <User size={18} />
              </button>
            </div>
          </div>

          {/* Weekly Progress - Premium Card */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] relative overflow-hidden group mb-4">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-50/50 to-red-50/50 rounded-bl-full -z-10 opacity-60"></div>

            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900 text-sm font-bold flex items-center gap-2 tracking-tight">
                <Calendar
                  size={16}
                  className="text-[#E53935]"
                />
                Progresso Semanal
              </h3>
              <span className="text-[#FFB300] text-[10px] font-bold bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100 uppercase tracking-wide">
                4/5 treinos
              </span>
            </div>

            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden border border-gray-100 mb-4">
              <div className="h-full bg-gradient-to-r from-[#E53935] to-[#FFB300] w-4/5 rounded-full shadow-[0_0_12px_rgba(229,57,53,0.4)]"></div>
            </div>

            <div className="flex items-center gap-6 text-xs">
              <div className="flex items-center gap-2">
                <TrendingUp
                  size={16}
                  className="text-[#FFB300]"
                />
                <div>
                    <span className="text-gray-900 font-bold block leading-none">
                    28.5 km
                    </span>
                    <span className="text-gray-400 text-[9px] font-bold uppercase tracking-wider">total</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Award size={16} className="text-[#E53935]" />
                <div>
                    <span className="text-gray-900 font-bold block leading-none">
                    +340
                    </span>
                    <span className="text-gray-400 text-[9px] font-bold uppercase tracking-wider">pontos</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Calendar - Enhanced Grid */}
        <div className="px-6 py-6">
          <h3 className="text-gray-900 mb-4 text-xs uppercase tracking-widest font-bold pl-1">
            Novembro 2025
          </h3>

          <div className="grid grid-cols-7 gap-1.5">
            {weekDays.map((day, index) => {
              const isSelected = selectedDay === index;
              let statusIcon = null;
              let borderColor = "border-transparent";
              let bgColor = "bg-white";
              let textColor = "text-gray-400";
              let dateColor = "text-gray-700";
              let shadow = "shadow-[0_2px_4px_rgba(0,0,0,0.02)]";

              if (day.type === "completed") {
                statusIcon = (
                  <div className="w-1 h-1 rounded-full bg-green-500 mx-auto mt-1"></div>
                );
                bgColor = "bg-green-50/30";
                dateColor = "text-green-700";
                borderColor = "border-green-100/50";
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
                shadow = "shadow-md shadow-red-500/10";
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
                bgColor = "bg-blue-50/30";
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
                  className={`${bgColor} border ${borderColor} ${shadow} rounded-xl py-3 flex flex-col items-center justify-center gap-0.5 transition-all duration-200 touch-manipulation active:scale-90`}
                >
                  <span
                    className={`text-[9px] uppercase font-bold tracking-wider ${textColor}`}
                  >
                    {day.day}
                  </span>
                  <span
                    className={`text-sm font-black tracking-tight ${dateColor}`}
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
          <div className="px-6 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1 min-w-0 pr-3">
                  <div className="flex items-center gap-2 mb-2">
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
                  <h4 className="text-2xl text-gray-900 font-black tracking-tighter truncate leading-tight">
                    {selectedDayData.workout}
                  </h4>
                </div>

                <div
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wide border ${
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

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex flex-col justify-between">
                  <p className="text-gray-400 text-[10px] mb-1 uppercase tracking-wide font-bold">
                    Distância
                  </p>
                  <p className="text-gray-900 text-lg font-black tracking-tight">
                    {selectedDayData.distance}
                  </p>
                </div>
                {selectedDayData.pace && (
                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex flex-col justify-between">
                    <p className="text-gray-400 text-[10px] mb-1 uppercase tracking-wide font-bold">
                      Pace Alvo
                    </p>
                    <p className="text-gray-900 text-lg font-black tracking-tight">
                      {selectedDayData.pace}
                    </p>
                  </div>
                )}
                {selectedDayData.location && (
                  <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100 col-span-2 flex flex-col justify-between">
                    <p className="text-blue-400 text-[10px] mb-1 uppercase tracking-wide font-bold">
                      Local
                    </p>
                    <p className="text-blue-900 text-lg font-black tracking-tight">
                      {selectedDayData.location}
                    </p>
                  </div>
                )}
              </div>

              {selectedDayData.type === "next" && (
                <button
                  onClick={() => onNavigate("training")}
                  className="w-full bg-[#E53935] text-white py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#D32F2F] transition-all shadow-lg shadow-red-500/20 touch-manipulation active:scale-[0.98] font-bold text-sm uppercase tracking-wide group"
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
                  className="w-full bg-[#00B0FF] text-white py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#0091EA] transition-all shadow-lg shadow-blue-500/20 touch-manipulation active:scale-[0.98] font-bold text-sm uppercase tracking-wide"
                >
                  <Flag size={16} />
                  Detalhes da Prova
                </button>
              )}
            </div>
          </div>
        )}

        {/* Personal Records - New Block */}
        <div className="px-6 mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900 text-sm font-bold flex items-center gap-2 tracking-tight">
              <Trophy size={16} className="text-[#FFB300]" />
              Recordes Pessoais
            </h3>
            <button className="text-[10px] font-bold text-[#E53935] uppercase tracking-wide bg-red-50 px-2.5 py-1 rounded-lg border border-red-100 hover:bg-red-100 transition-colors">
              Ver todos
            </button>
          </div>

          <div className="grid gap-3">
            {personalRecords.map((record, index) => (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-between hover:border-gray-200 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center border border-amber-100 group-hover:scale-105 transition-transform">
                    <span className="text-[#FFB300] font-black text-xs text-center leading-none">
                      {record.distance.split(' ')[0]}
                      <br />
                      <span className="text-[8px] font-bold text-orange-300">
                        {record.distance.split(' ')[1].toUpperCase()}
                      </span>
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-900 font-black text-base mb-0.5 tracking-tight">
                      {record.time}
                    </p>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                      {record.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100 group-hover:bg-gray-100 transition-colors">
                  <Timer size={14} className="text-gray-400" />
                  <span className="text-gray-600 text-xs font-bold">
                    {record.pace}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
