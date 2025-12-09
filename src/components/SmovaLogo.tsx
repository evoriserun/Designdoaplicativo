import React from "react";

interface SmovaLogoProps {
  className?: string;
  variant?: "icon" | "full";
  theme?: "dark" | "light";
}

export function SmovaLogo({ className = "", variant = "full", theme = "light" }: SmovaLogoProps) {
  // Brand Colors
  const primaryColor = "#E53935"; // Red
  const secondaryColor = "#FFB300"; // Amber (for accents if needed)
  const textColor = theme === "dark" ? "#FFFFFF" : "#111827"; // White or Gray-900

  return (
    <svg
      viewBox={variant === "icon" ? "0 0 48 48" : "0 0 180 48"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="SMOVA Logo"
    >
      <defs>
        <linearGradient id="smovaGradient" x1="0" y1="48" x2="48" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C62828" />
          <stop offset="100%" stopColor="#FF5252" />
        </linearGradient>
      </defs>

      {/* SYMBOL: The "Velocity S" */}
      {/* Concept: Two dynamic shapes interlocking to form an abstract S and suggesting forward motion/evolution */}
      <g transform="skewX(-10)">
        {/* Bottom Shape - Foundation/Strength */}
        <path
          d="M10 42 H34 C38.4183 42 42 38.4183 42 34 V28 L14 28 C9.58172 28 6 31.5817 6 36 V38 C6 40.2091 7.79086 42 10 42Z"
          fill="url(#smovaGradient)"
        />
        
        {/* Top Shape - Speed/Evolution (Offset to right and top) */}
        <path
          d="M38 6 H14 C9.58172 6 6 9.58172 6 14 V20 L34 20 C38.4183 20 42 16.4183 42 12 V10 C42 7.79086 40.2091 6 38 6Z"
          fill="url(#smovaGradient)"
        />
        
        {/* Center Accent - The "Spark" of movement */}
        <path
          d="M42 22 L6 26"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          className="opacity-20"
        />
      </g>

      {/* TEXT: SMOVA */}
      {variant === "full" && (
        <g transform="translate(60, 4)">
          <text
            x="0"
            y="32"
            fill={textColor}
            fontFamily="sans-serif"
            fontWeight="900"
            fontSize="32"
            fontStyle="italic"
            letterSpacing="-1.5"
            style={{ textTransform: "uppercase" }}
          >
            SMOVA
          </text>
          {/* Geometric Cut on the A */}
          <path d="M106 32 L116 32 L106 5 Z" fill={theme === "dark" ? "#111827" : "#FFFFFF"} className="opacity-0" /> 
        </g>
      )}
    </svg>
  );
}
