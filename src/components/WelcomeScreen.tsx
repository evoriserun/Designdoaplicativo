import { SmovaLogo } from './SmovaLogo';

interface WelcomeScreenProps {
  onLogin: () => void;
  onSignup: () => void;
}

export function WelcomeScreen({ onLogin, onSignup }: WelcomeScreenProps) {
  const handleGoogleLogin = () => {
    // Mock Google Login - in a real app this would use Firebase Auth or similar
    onLogin();
  };

  return (
    <div className="w-full h-full bg-white overflow-hidden flex items-center justify-center">
      <div className="w-full h-full max-w-md mx-auto relative flex flex-col">
        {/* Content Container - Centered vertically and horizontally */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-safe pb-safe gap-10">
          
          {/* Brand Identity */}
          <div className="w-full flex flex-col items-center justify-center py-12">
            <div className="relative">
              {/* Subtle ambient glow behind the logo */}
              <div className="absolute inset-0 bg-[#E53935] blur-3xl opacity-10 rounded-full scale-150"></div>
              <SmovaLogo variant="full" className="h-20 sm:h-24 text-gray-900 relative z-10" />
            </div>
          </div>
          
          {/* Text Content - Perfectly centered */}
          <div className="w-full flex flex-col items-center space-y-4">
            <h2 className="text-2xl text-[#121212] text-center leading-tight font-bold whitespace-nowrap px-2">
              Construa sua evolução do zero
            </h2>
            
            <p className="text-base sm:text-lg text-[#676767] text-center leading-relaxed max-w-xs mx-auto font-medium">
              A comunidade de corrida mais completa para quem corre com propósito.
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="w-full space-y-3 mt-4">
            <button 
              onClick={handleGoogleLogin}
              className="w-full bg-white border border-gray-200 rounded-2xl py-4 shadow-sm hover:bg-gray-50 transition-all active:scale-[0.98] touch-manipulation flex items-center justify-center gap-3 group"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-gray-700 font-bold text-base">Entrar com Google</span>
            </button>

            <button 
              onClick={onLogin}
              className="w-full bg-gradient-to-r from-[#E53935] to-[#B71C1C] rounded-2xl py-4 shadow-lg shadow-[#E53935]/20 hover:shadow-xl hover:shadow-red-500/30 transition-all active:scale-[0.98] touch-manipulation"
            >
              <span className="text-white font-bold text-base tracking-wide">Entrar com email</span>
            </button>
            
            <div className="text-center py-4">
              <span className="text-[#676767] text-sm font-medium">
                Não tem uma conta?{' '}
              </span>
              <button
                onClick={onSignup}
                className="text-[#E53935] text-sm hover:text-[#B71C1C] transition-colors bg-transparent border-none font-bold touch-manipulation inline uppercase tracking-wide"
              >
                Cadastre-se
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
