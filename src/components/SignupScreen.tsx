import { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, ChevronLeft } from 'lucide-react';
import { SmovaLogo } from './SmovaLogo';

interface SignupScreenProps {
  onSignup: () => void;
  onNavigateToLogin: () => void;
  onNavigateBack: () => void;
}

export function SignupScreen({ onSignup, onNavigateToLogin, onNavigateBack }: SignupScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }
    onSignup();
  };

  return (
    <div className="fixed inset-0 z-[60] bg-white flex flex-col h-dvh w-full overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-red-50 to-transparent rounded-bl-full -z-10 opacity-60"></div>
      
      {/* Scrollable Content */}
      <div className="flex-1 w-full overflow-y-auto overflow-x-hidden scroll-smooth bg-transparent scrolling-touch">
        <div className="min-h-full max-w-md mx-auto flex flex-col px-6 pt-safe pb-safe">
          {/* Header com botão voltar */}
          <div className="flex items-center justify-between mb-8 flex-shrink-0 mt-4">
            <button
              onClick={onNavigateBack}
              className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-gray-900 hover:bg-gray-50 active:scale-95 transition-all border border-gray-100 shadow-sm"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex items-center justify-center">
               <SmovaLogo variant="full" className="h-6" />
            </div>
            <div className="w-12"></div>
          </div>

          {/* Conteúdo */}
          <div className="flex-1 flex flex-col justify-center pb-8">
            <div className="mb-8">
              <h1 className="text-4xl font-black text-gray-900 mb-3 tracking-tight leading-none">
                Crie sua<br/>conta
              </h1>
              <p className="text-gray-500 font-medium text-lg">Comece sua jornada na SEMOV.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nome */}
              <div>
                <label htmlFor="name" className="block text-gray-900 text-sm mb-2 font-bold ml-1">
                  Nome completo
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#E53935] transition-colors" size={22} />
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#E53935]/20 focus:ring-4 focus:ring-[#E53935]/10 transition-all outline-none text-base font-medium"
                    placeholder="Seu nome"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-gray-900 text-sm mb-2 font-bold ml-1">
                  Email
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#E53935] transition-colors" size={22} />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#E53935]/20 focus:ring-4 focus:ring-[#E53935]/10 transition-all outline-none text-base font-medium"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              {/* Senha */}
              <div>
                <label htmlFor="password" className="block text-gray-900 text-sm mb-2 font-bold ml-1">
                  Senha
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#E53935] transition-colors" size={22} />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#E53935]/20 focus:ring-4 focus:ring-[#E53935]/10 transition-all outline-none text-base font-medium"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 touch-manipulation p-1"
                  >
                    {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                  </button>
                </div>
              </div>

              {/* Confirmar Senha */}
              <div>
                <label htmlFor="confirmPassword" className="block text-gray-900 text-sm mb-2 font-bold ml-1">
                  Confirmar senha
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#E53935] transition-colors" size={22} />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#E53935]/20 focus:ring-4 focus:ring-[#E53935]/10 transition-all outline-none text-base font-medium"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 touch-manipulation p-1"
                  >
                    {showConfirmPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                  </button>
                </div>
              </div>

              {/* Botão Cadastrar */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#E53935] to-[#C62828] text-white py-4 rounded-2xl font-bold shadow-lg shadow-[#E53935]/20 hover:shadow-xl hover:shadow-red-500/30 transition-all active:scale-[0.98] touch-manipulation mt-6 tracking-wide"
              >
                CRIAR CONTA
              </button>

              {/* Link para login */}
              <div className="text-center pt-6">
                <span className="text-gray-500 text-sm font-medium">
                  Já tem uma conta?{' '}
                </span>
                <button
                  type="button"
                  onClick={onNavigateToLogin}
                  className="text-[#E53935] text-sm hover:text-[#B71C1C] transition-colors font-black touch-manipulation uppercase tracking-wide"
                >
                  Entrar
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
