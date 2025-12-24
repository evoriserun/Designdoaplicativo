import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ChevronLeft } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
  onNavigateToSignup: () => void;
  onNavigateBack: () => void;
  onNavigateToForgotPassword: () => void;
}

export function LoginScreen({ onLogin, onNavigateToSignup, onNavigateBack, onNavigateToForgotPassword }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="fixed inset-0 z-[60] bg-white flex flex-col h-dvh w-full overflow-hidden">
      {/* Background Decor - Minimalist */}
      <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-gray-50/50 to-transparent -z-10"></div>
      
      {/* Scrollable Content */}
      <div className="flex-1 w-full overflow-y-auto overflow-x-hidden scroll-smooth bg-transparent scrolling-touch">
        <div className="min-h-full max-w-md mx-auto flex flex-col px-6 pt-safe pb-safe relative">
          
          {/* Header com botão voltar */}
          <div className="flex items-center justify-between mb-8 flex-shrink-0 mt-6">
            <button
              onClick={onNavigateBack}
              className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gray-900 hover:bg-gray-50 active:scale-95 transition-all border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="w-10"></div>
            <div className="w-10"></div>
          </div>

          {/* Conteúdo centralizado */}
          <div className="flex-1 flex flex-col justify-center pb-8 animate-in slide-in-from-bottom-4 fade-in duration-500">
            <div className="mb-12">
              <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter leading-none">
                Bem-vindo<br/>de volta.
              </h1>
              <p className="text-gray-500 font-medium text-lg tracking-tight">
                Continue sua evolução hoje.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-gray-900 text-xs font-bold uppercase tracking-wider ml-1">
                  Email
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#E53935] transition-colors" size={20} />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#E53935]/20 focus:ring-4 focus:ring-[#E53935]/5 transition-all outline-none text-base font-medium"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              {/* Senha */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-gray-900 text-xs font-bold uppercase tracking-wider ml-1">
                  Senha
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#E53935] transition-colors" size={20} />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-12 py-4 bg-gray-50 border border-transparent rounded-2xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#E53935]/20 focus:ring-4 focus:ring-[#E53935]/5 transition-all outline-none text-base font-medium"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 touch-manipulation p-2"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Esqueceu senha */}
              <div className="text-right">
                <button
                  type="button"
                  onClick={onNavigateToForgotPassword}
                  className="text-gray-500 text-xs hover:text-[#E53935] transition-colors font-bold uppercase tracking-wide"
                >
                  Esqueceu a senha?
                </button>
              </div>

              {/* Botão Login */}
              <button
                type="submit"
                className="w-full bg-[#E53935] text-white py-4 rounded-2xl font-bold shadow-lg shadow-[#E53935]/25 hover:shadow-xl hover:shadow-[#E53935]/40 hover:bg-[#D32F2F] transition-all active:scale-[0.98] touch-manipulation mt-6 tracking-wide text-sm uppercase"
              >
                Entrar
              </button>

              {/* Link para cadastro */}
              <div className="text-center pt-6">
                <span className="text-gray-500 text-sm font-medium">
                  Não tem uma conta?{' '}
                </span>
                <button
                  type="button"
                  onClick={onNavigateToSignup}
                  className="text-[#E53935] text-sm hover:text-[#B71C1C] transition-colors font-black touch-manipulation uppercase tracking-wide"
                >
                  Cadastre-se
                </button>
              </div>
            </form>
          </div>
          
          {/* Spacer for safety */}
          <div className="h-8"></div>
        </div>
      </div>
    </div>
  );
}
