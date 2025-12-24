import React from 'react';
import logo from "figma:asset/639e1260750357b506326bf78768d5b983b4c121.png";

interface SemovLogoProps {
  variant?: 'full' | 'icon';
  className?: string;
}

export function SemovLogo({ variant = 'full', className = '' }: SemovLogoProps) {
  if (variant === 'icon') {
    // For the icon variant, we want to display only the "S" mark from the logo.
    // Since the logo is "S" + "SMOVA", the "S" is on the left.
    // We'll use a container with overflow hidden and position the image to show the left part.
    // We assume the logo aspect ratio is roughly wide (e.g. 4:1)
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <img
          src={logo}
          alt="Semov Icon"
          className="max-w-none h-full absolute left-0 top-0 object-contain object-left"
          style={{ width: '300%' }} // Initial guess: The image is 3x wider than the icon itself?
        />
      </div>
    );
  }

  return (
    <img
      src={logo}
      alt="Semov Logo"
      className={`object-contain ${className}`}
    />
  );
}
