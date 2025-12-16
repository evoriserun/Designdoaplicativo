import { SmovaLogo } from './SmovaLogo';

export function SplashScreen() {
  return (
    <div className="fixed inset-0 z-[100] w-full h-full flex items-center justify-center overflow-hidden bg-white">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-white"></div>
      
      {/* Subtle Motion Elements - Abstract speed lines or glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         {/* A soft warm glow following the logo's energy */}
         <div className="absolute top-[30%] left-[20%] w-[60%] h-[60%] bg-orange-50 rounded-full blur-[120px] opacity-40 animate-pulse" style={{ animationDuration: '4s' }}></div>
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center animate-in zoom-in-95 duration-700 fade-in p-8">
        
        {/* Main Logo Presentation - Iconic & Central */}
        <div className="scale-125 transform">
           <SmovaLogo variant="vertical" className="text-gray-900 drop-shadow-sm" />
        </div>

        {/* Loading Indicator or just clean space */}
        {/* Keeping it purely clean emphasizes confidence in the brand. */}
      </div>
    </div>
  );
}
