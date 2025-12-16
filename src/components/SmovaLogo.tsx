import React from 'react';

interface SmovaLogoProps {
  variant?: 'full' | 'icon' | 'vertical' | 'white';
  className?: string;
}

export function SmovaLogo({ variant = 'full', className = '' }: SmovaLogoProps) {
  const gradientId = "semov-speed-gradient";
  const whiteGradientId = "semov-white-gradient";

  // CONCEPT: "The Shifted Layers" (Camadas Deslocadas)
  // Three geometric bars that form an abstract "S".
  // Represents: Steps, Daily Progress, Rhythm, Forward Motion.
  // Style: High-impact, memorable, visually distinct.
  const SportSymbol = () => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF3D00" /> {/* Vibrant Safety Orange */}
          <stop offset="100%" stopColor="#BF360C" /> {/* Deep Burn Orange */}
        </linearGradient>
        <linearGradient id={whiteGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#EEEEEE" />
        </linearGradient>
      </defs>

      {/* 
         The Shape: "The Forward Stack"
         3 Parallel quadrilateral shapes, stacked and shifted.
         They create an implied "S" motion through the negative space and positioning.
      */}
      <g transform="skewX(-15)">
         {/* Top Bar - Shifted Right (The Goal/Head) */}
         <path 
           d="M 50 15 L 95 15 L 85 35 L 40 35 Z" 
           fill={variant === 'white' ? `url(#${whiteGradientId})` : `url(#${gradientId})`}
         />

         {/* Middle Bar - The Core (Connecting) */}
         <path 
           d="M 25 40 L 80 40 L 70 60 L 15 60 Z" 
           fill={variant === 'white' ? `url(#${whiteGradientId})` : `url(#${gradientId})`}
         />

         {/* Bottom Bar - Shifted Left (The Foundation/Start) */}
         <path 
           d="M 5 65 L 50 65 L 40 85 L -5 85 Z" 
           fill={variant === 'white' ? `url(#${whiteGradientId})` : `url(#${gradientId})`}
         />
      </g>
    </svg>
  );

  // CUSTOM TYPOGRAPHY "SEMOV"
  // Refined for "Speed & Precision".
  // Features:
  // - Deep Italic (-15deg) to match the symbol.
  // - "Dynamic Cuts": Vertical cuts on horizontal strokes for sharpness.
  // - Consistent stroke width.
  const Logotype = () => (
    <svg viewBox="0 0 400 100" className="h-full w-auto fill-current" preserveAspectRatio="xMidYMid meet">
       <g transform="skewX(-15)">
          {/* S - Sharp, angular spine */}
          <path d="M 70 15 L 20 15 L 10 45 L 50 45 L 50 55 L 10 55 L 0 85 L 60 85 L 70 55 L 30 55 L 30 45 L 70 45 L 80 15 Z" />
          
          {/* E - Dynamic layers, matching the symbol */}
          <path d="M 90 15 L 150 15 L 145 30 L 110 30 L 110 42 L 140 42 L 135 57 L 110 57 L 110 70 L 150 70 L 145 85 L 90 85 L 90 15 Z" />
          
          {/* M - Solid, grounded legs */}
          <path d="M 170 15 L 195 15 L 215 60 L 235 15 L 260 15 L 260 85 L 240 85 L 240 45 L 220 85 L 210 85 L 190 45 L 190 85 L 170 85 L 170 15 Z" />
          
          {/* O - Boxy tech curve */}
          <path d="M 280 15 L 330 15 L 340 40 L 340 60 L 330 85 L 280 85 L 270 60 L 270 40 L 280 15 Z M 295 35 L 295 65 L 315 65 L 315 35 L 295 35 Z" />
          
          {/* V - The Finish Line */}
          <path d="M 360 15 L 385 15 L 405 85 L 380 85 L 360 15 Z M 430 15 L 455 15 L 415 85 L 390 85 L 430 15 Z" />
       </g>
    </svg>
  );

  const textColorClass = variant === 'white' ? 'text-white' : 'text-[#121212]';

  if (variant === 'icon') {
    return (
      <div className={`aspect-square ${className}`}>
        <SportSymbol />
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col items-center gap-3 ${className}`}>
        <div className="w-24 h-24">
           <SportSymbol />
        </div>
        <div className={`h-8 mt-1 ${textColorClass}`}>
           <Logotype />
        </div>
      </div>
    );
  }

  // Default 'full' horizontal
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Symbol */}
      <div className="h-[1.5em] w-[1.5em] flex-shrink-0 flex items-center justify-center">
         <SportSymbol />
      </div>
      
      {/* Text */}
      <div className={`h-[1em] flex items-center ${textColorClass}`}>
         <Logotype />
      </div>
    </div>
  );
}
