import { Zap } from 'lucide-react';

export function SplashScreen() {
  return (
    <div className="fixed inset-0 z-[100] w-full h-full flex items-center justify-center overflow-hidden bg-white">
      {/* Dynamic Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#121212] via-[#2a2a2a] to-[#000000] animate-gradient-xy opacity-100 z-0"></div>
      
      {/* Decorative Elements for Motion/Propulsion */}
      <div className="absolute inset-0 z-0 opacity-20 overflow-hidden">
         <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-[#E53935] rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '4s' }}></div>
         <div className="absolute bottom-[10%] right-[10%] w-[50%] h-[50%] bg-[#FFB300] rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s', animationDuration: '5s' }}></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center animate-in zoom-in duration-700 fade-in">
        {/* Logo Container */}
        <div className="relative mb-6">
           {/* Icon */}
           <div className="relative z-10 w-24 h-24 bg-gradient-to-br from-[#E53935] to-[#B71C1C] rounded-3xl flex items-center justify-center shadow-2xl shadow-red-900/50 transform -skew-x-6">
              <Zap className="text-white drop-shadow-md" size={48} strokeWidth={2.5} fill="currentColor" />
           </div>
           {/* Motion trails */}
           <div className="absolute top-0 left-0 w-24 h-24 bg-[#E53935]/30 rounded-3xl -z-10 transform -skew-x-6 translate-x-4 translate-y-2 blur-sm"></div>
           <div className="absolute top-0 left-0 w-24 h-24 bg-[#FFB300]/20 rounded-3xl -z-20 transform -skew-x-6 translate-x-8 translate-y-4 blur-md"></div>
        </div>
        
        {/* Brand Name */}
        <h1 className="text-5xl sm:text-6xl text-white font-black tracking-tighter italic transform -skew-x-6 drop-shadow-lg mb-4">
          SMOVA
        </h1>
        
        {/* Tagline */}
        <div className="flex flex-col items-center gap-2">
          <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-[#E53935] to-transparent"></div>
          <p className="text-gray-300 text-sm font-medium tracking-widest uppercase opacity-90">
            Se mova com propósito
          </p>
        </div>
      </div>
    </div>
  );
}
