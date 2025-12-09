import { useState } from 'react';
import { ArrowLeft, Mail, Phone, ArrowRight, ShieldCheck } from 'lucide-react';

interface ForgotPasswordScreenProps {
  onNavigateBack: () => void;
}

export function ForgotPasswordScreen({ onNavigateBack }: ForgotPasswordScreenProps) {
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [inputValue, setInputValue] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue) {
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 z-[60] bg-white flex flex-col h-dvh w-full px-6 pt-safe pb-safe animate-in fade-in slide-in-from-right-4 duration-300">
         <div className="flex-1 flex flex-col items-center justify-center text-center max-w-sm mx-auto">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8 shadow-sm ring-1 ring-green-100">
              <ShieldCheck size={40} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Código Enviado!</h2>
            <p className="text-gray-500 mb-10 leading-relaxed">
              Enviamos as instruções de recuperação para:<br/>
              <span className="font-semibold text-gray-900">{inputValue}</span>
            </p>
            
            <button 
              onClick={onNavigateBack}
              className="w-full py-4 bg-gray-900 text-white rounded-2xl font-semibold active:scale-[0.98] transition-all shadow-lg shadow-gray-200 hover:shadow-xl"
            >
              Voltar ao Login
            </button>
         </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] bg-white flex flex-col h-dvh w-full">
      {/* Scrollable Content */}
      <div className="flex-1 w-full overflow-y-auto overflow-x-hidden scroll-smooth bg-white scrolling-touch">
        <div className="min-h-full max-w-md mx-auto flex flex-col px-6 pt-safe pb-safe">
          {/* Header */}
          <div className="flex items-center mb-8 flex-shrink-0 mt-4">
            <button 
              onClick={onNavigateBack}
              className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-900 hover:bg-gray-100 active:scale-95 transition-all border border-gray-100"
            >
              <ArrowLeft size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col justify-center pb-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">Recuperar Senha</h1>
              <p className="text-gray-500 leading-relaxed">
                Não se preocupe. Insira seu e-mail ou telefone para receber o código de recuperação.
              </p>
            </div>

            {/* Tabs */}
            <div className="flex p-1.5 bg-gray-50 rounded-2xl mb-8 border border-gray-100">
              <button
                onClick={() => setMethod('email')}
                className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
                  method === 'email' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                E-mail
              </button>
              <button
                onClick={() => setMethod('phone')}
                className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
                  method === 'phone' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Telefone
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2 ml-1">
                  {method === 'email' ? 'E-mail' : 'Número de Telefone'}
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#E53935] transition-colors">
                    {method === 'email' ? <Mail size={22} /> : <Phone size={22} />}
                  </div>
                  <input
                    type={method === 'email' ? 'email' : 'tel'}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#E53935]/20 focus:ring-4 focus:ring-[#E53935]/10 transition-all outline-none text-lg"
                    placeholder={method === 'email' ? 'seu@email.com' : '(11) 99999-9999'}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#E53935] to-[#C62828] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-red-500/30 active:scale-[0.98] transition-all shadow-md shadow-red-500/20"
              >
                <span>Enviar código</span>
                <ArrowRight size={20} />
              </button>
            </form>
          </div>
          
          {/* Spacer for safety */}
          <div className="h-8"></div>
        </div>
      </div>
    </div>
  );
}
