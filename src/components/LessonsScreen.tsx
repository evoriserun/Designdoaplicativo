import { useState } from "react";
import {
  Check,
  Star,
  Lock,
  Play,
  GraduationCap,
  ChevronLeft,
  Pause,
  RotateCcw,
  ChevronRight,
  Info
} from "lucide-react";

interface LessonsScreenProps {
  onNavigate: (screen: string) => void;
}

// Mock data structure
const modules = [
  {
    id: 1,
    title: "Fundamentos da Corrida",
    description: "Postura, respiração e ritmo básico",
    color: "from-blue-500 to-blue-600",
    shadow: "shadow-blue-200",
    lessons: [
      { 
        id: 1, 
        title: "Postura Correta", 
        type: "completed", 
        stars: 3,
        duration: "5:20",
        segments: [
          { title: "Alinhamento Corporal", duration: "1:30" },
          { title: "Posição dos Braços", duration: "2:00" },
          { title: "Pisada Eficiente", duration: "1:50" }
        ]
      },
      { 
        id: 2, 
        title: "Respiração", 
        type: "completed", 
        stars: 2,
        duration: "4:15",
        segments: [
          { title: "Ritmo Respiratório", duration: "1:15" },
          { title: "Respiração Diafragmática", duration: "1:30" },
          { title: "Sincronização", duration: "1:30" }
        ]
      },
      { 
        id: 3, 
        title: "Cadência Ideal", 
        type: "current", 
        stars: 0,
        duration: "6:00",
        segments: [
          { title: "O que é Cadência?", duration: "1:45" },
          { title: "Exercícios de Metrônomo", duration: "2:15" },
          { title: "Aumentando a Frequência", duration: "2:00" }
        ]
      },
      { 
        id: 4, 
        title: "Aquecimento Dinâmico", 
        type: "locked", 
        stars: 0,
        duration: "5:00",
        segments: [
          { title: "Mobilidade Articular", duration: "1:30" },
          { title: "Ativação Muscular", duration: "2:00" },
          { title: "Educativos", duration: "1:30" }
        ]
      },
    ],
  },
  {
    id: 2,
    title: "Fisiologia do Esporte",
    description: "Entendendo seu corpo e energia",
    color: "from-purple-500 to-purple-600",
    shadow: "shadow-purple-200",
    lessons: [
      { id: 5, title: "Zonas de Frequência", type: "locked", stars: 0, segments: [{},{},{}] },
      { id: 6, title: "Limiar de Lactato", type: "locked", stars: 0, segments: [{},{},{}] },
      { id: 7, title: "VO2 Max", type: "locked", stars: 0, segments: [{},{},{}] },
    ],
  },
];

export function LessonsScreen({
  onNavigate,
}: LessonsScreenProps) {
  const [activeLesson, setActiveLesson] = useState<any | null>(null);
  const [currentSegment, setCurrentSegment] = useState(0); // 0, 1, 2
  const [isPlaying, setIsPlaying] = useState(false);

  const handleLessonClick = (lesson: any) => {
    if (lesson.type === 'locked') return;
    setActiveLesson(lesson);
    setCurrentSegment(0);
    setIsPlaying(false);
  };

  const handleBack = () => {
    setActiveLesson(null);
  };

  const handleSegmentComplete = () => {
    if (currentSegment < 2) {
      setCurrentSegment(currentSegment + 1);
      setIsPlaying(false);
    } else {
      // Aula completa logic here
      alert("Aula concluída! Você ganhou 3 estrelas.");
      setActiveLesson(null);
    }
  };

  // Render Lesson Player
  if (activeLesson) {
    const progressPercentage = ((currentSegment + 1) / 3) * 100;
    
    return (
      <div className="w-full h-full bg-white flex flex-col z-50 fixed inset-0">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
          <button 
            onClick={handleBack}
            className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 active:scale-95 transition-transform"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="text-center">
            <h2 className="text-gray-900 font-bold text-sm uppercase tracking-wide">Video Aula</h2>
            <p className="text-gray-500 text-xs truncate max-w-[200px]">{activeLesson.title}</p>
          </div>
          <button className="w-10 h-10 rounded-full bg-transparent flex items-center justify-center text-gray-400">
            <Info size={20} />
          </button>
        </div>

        {/* Video Player Area */}
        <div className="w-full aspect-video bg-gray-900 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            {!isPlaying ? (
              <button 
                onClick={() => setIsPlaying(true)}
                className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
              >
                <Play size={32} fill="white" className="ml-1" />
              </button>
            ) : (
              <div className="w-full h-full relative" onClick={() => setIsPlaying(false)}>
                {/* Mock Video Content */}
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                   <p className="text-white/50 font-medium animate-pulse">Reproduzindo Segmento {currentSegment + 1}...</p>
                </div>
                {/* Controls Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-between">
                  <button onClick={(e) => { e.stopPropagation(); setIsPlaying(false); }} className="text-white">
                    <Pause size={20} fill="white" />
                  </button>
                  <span className="text-white text-xs font-medium">02:14 / {activeLesson.segments[currentSegment].duration || "05:00"}</span>
                  <button className="text-white">
                    <RotateCcw size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Lesson Content & Progress */}
        <div className="flex-1 overflow-y-auto bg-white p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{activeLesson.title}</h1>
            <p className="text-gray-500 text-sm leading-relaxed">
              Domine os fundamentos essenciais para melhorar sua performance e evitar lesões comuns.
            </p>
          </div>

          {/* 3-Part Progress System (The "Stars" Logic) */}
          <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 text-sm">Progresso da Aula</h3>
              <span className="text-xs font-bold text-[#E53935] bg-red-50 px-2 py-0.5 rounded-md">
                {currentSegment + 1}/3 Partes
              </span>
            </div>

            {/* Progress Bars */}
            <div className="flex gap-2 mb-6">
              {[0, 1, 2].map((idx) => (
                <div key={idx} className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden relative">
                   <div 
                      className={`absolute inset-0 bg-[#E53935] transition-all duration-500 ${
                        idx < currentSegment 
                          ? 'translate-x-0' // Completed
                          : idx === currentSegment
                            ? 'translate-x-0 w-1/2 animate-pulse' // Current (simulated partial)
                            : '-translate-x-full' // Future
                      }`}
                   ></div>
                </div>
              ))}
            </div>

            {/* Segments List */}
            <div className="space-y-3">
              {activeLesson.segments.map((segment: any, idx: number) => {
                const isCompleted = idx < currentSegment;
                const isCurrent = idx === currentSegment;
                const isLocked = idx > currentSegment;

                return (
                  <button 
                    key={idx}
                    disabled={isLocked}
                    onClick={() => setCurrentSegment(idx)}
                    className={`w-full flex items-center p-3 rounded-xl border transition-all ${
                      isCurrent 
                        ? 'bg-white border-[#E53935] shadow-sm ring-1 ring-[#E53935]/10' 
                        : isCompleted
                          ? 'bg-red-50/50 border-red-100'
                          : 'bg-gray-50 border-transparent opacity-60'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                       isCompleted ? 'bg-[#E53935] text-white' : 
                       isCurrent ? 'bg-[#E53935] text-white' : 
                       'bg-gray-200 text-gray-400'
                    }`}>
                      {isCompleted ? <Check size={14} strokeWidth={3} /> : <span className="text-xs font-bold">{idx + 1}</span>}
                    </div>
                    
                    <div className="flex-1 text-left">
                      <p className={`text-sm font-bold ${isCurrent ? 'text-gray-900' : 'text-gray-600'}`}>
                        {segment.title || `Parte ${idx + 1}`}
                      </p>
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <Play size={10} /> {segment.duration || "00:00"}
                      </p>
                    </div>

                    {isCompleted && (
                       <Star size={16} className="text-[#FFB300] fill-[#FFB300]" />
                    )}
                    {isCurrent && (
                        <div className="w-2 h-2 bg-[#E53935] rounded-full animate-pulse"></div>
                    )}
                    {isLocked && (
                        <Lock size={14} className="text-gray-300" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleSegmentComplete}
            className="w-full bg-gradient-to-r from-[#E53935] to-[#B71C1C] text-white py-4 rounded-xl font-bold text-sm shadow-lg shadow-[#E53935]/20 active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
          >
            {currentSegment < 2 ? (
              <>
                Próximo Segmento <ChevronRight size={18} />
              </>
            ) : (
              <>
                Concluir Aula <Check size={18} />
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white overflow-hidden flex flex-col">
      <div className="flex-1 overflow-y-auto pb-28 no-scrollbar">
        {/* Header */}
        <div className="bg-white/95 backdrop-blur-sm border-b border-gray-100 p-5 sticky top-0 z-20">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl text-gray-900 font-bold tracking-tight mb-0.5">
                Aulas
              </h1>
              <p className="text-gray-500 text-sm">
                Trilha de conhecimento
              </p>
            </div>
            <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100 shadow-sm">
              <Star
                size={16}
                className="text-[#FFB300] fill-[#FFB300]"
              />
              <span className="text-amber-700 font-bold text-sm">
                145
              </span>
            </div>
          </div>
        </div>

        {/* Content - Scrollable Path */}
        <div className="relative">
          {/* Background Path Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-2 bg-gray-100 -translate-x-1/2 z-0 rounded-full"></div>

          <div className="py-10 space-y-16 relative z-10">
            {modules.map((module) => (
              <div key={module.id} className="relative">
                {/* Module Header */}
                <div className="flex justify-center mb-10 px-6">
                  <div
                    className={`bg-white border border-gray-200 rounded-3xl p-5 shadow-md shadow-gray-100 w-full max-w-xs text-center relative z-20`}
                  >
                    <h3 className="text-gray-900 font-bold text-lg mb-1">
                      {module.title}
                    </h3>
                    <p className="text-gray-500 text-xs font-medium">
                      {module.description}
                    </p>
                    <div
                      className={`absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rotate-45 bg-white border-b border-r border-gray-200`}
                    ></div>
                  </div>
                </div>

                {/* Steps Path */}
                <div className="flex flex-col items-center gap-8">
                  {module.lessons.map((lesson, stepIndex) => {
                    // Zig-zag logic
                    const offset =
                      stepIndex % 2 === 0
                        ? "translate-x-12"
                        : "-translate-x-12";

                    return (
                      <div
                        key={lesson.id}
                        className={`relative transition-transform hover:scale-105 ${offset}`}
                      >
                        <button
                          onClick={() => handleLessonClick(lesson)}
                          className={`
                            w-20 h-20 rounded-full flex items-center justify-center border-b-[6px] transition-all active:border-b-0 active:translate-y-1.5 shadow-lg
                            ${
                              lesson.type === "completed"
                                ? "bg-amber-400 border-amber-600 text-white shadow-amber-200"
                                : lesson.type === "current"
                                  ? `bg-gradient-to-b ${module.color} border-b-[6px] border-black/20 text-white ring-4 ring-white shadow-xl`
                                  : "bg-gray-100 border-gray-200 text-gray-300 cursor-not-allowed"
                            }
                          `}
                        >
                          {lesson.type === "completed" ? (
                            <Check size={32} strokeWidth={4} />
                          ) : lesson.type === "locked" ? (
                            <Lock size={28} strokeWidth={2.5} />
                          ) : (
                            <Play
                              size={32}
                              fill="white"
                              className="ml-1"
                            />
                          )}
                        </button>

                        {/* Stars for completed steps */}
                        {lesson.type === "completed" && (
                          <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-1 bg-white px-2 py-0.5 rounded-full shadow-sm border border-gray-100">
                            {[...Array(3)].map((_, i) => (
                              <Star
                                key={i}
                                size={10}
                                className={`${i < lesson.stars ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}`}
                              />
                            ))}
                          </div>
                        )}

                        {/* Pulse effect for current step */}
                        {lesson.type === "current" && (
                          <div className="absolute -inset-4 rounded-full bg-current opacity-10 animate-pulse -z-10"></div>
                        )}
                        
                        {/* Label below */}
                        <div className={`absolute top-24 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/80 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-medium text-gray-600 border border-gray-100 shadow-sm ${lesson.type === 'locked' ? 'opacity-50' : ''}`}>
                          {lesson.title}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Final Trophy */}
            <div className="flex justify-center pt-8 pb-8">
              <div className="w-28 h-28 bg-gray-50 rounded-full flex items-center justify-center border-4 border-gray-100 text-gray-300">
                <GraduationCap size={48} strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
