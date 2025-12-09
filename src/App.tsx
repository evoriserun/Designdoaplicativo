import { useState, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LoginScreen } from './components/LoginScreen';
import { SignupScreen } from './components/SignupScreen';
import { OnboardingHubScreen } from './components/OnboardingHubScreen';
import { AnamneseScreen } from './components/AnamneseScreen';
import { PendingTest1600 } from './components/PendingTest1600';
import { Test1600Tracking } from './components/Test1600Tracking';
import { WorkoutTracking } from './components/WorkoutTracking';
import { TrainingPreparing } from './components/TrainingPreparing';
import { TermsScreen } from './components/TermsScreen';
import { HomeScreen } from './components/HomeScreen';
import { TrainingScreen } from './components/TrainingScreen';
import { RankingScreen } from './components/RankingScreen';
import { RaceScheduleScreen } from './components/RaceScheduleScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { LessonsScreen } from './components/LessonsScreen';
import { ForgotPasswordScreen } from './components/ForgotPasswordScreen';
import { Home, Dumbbell, Trophy, GraduationCap } from 'lucide-react';

type Screen = 'welcome' | 'login' | 'signup' | 'onboardingHub' | 'anamnese' | 'pendingTest' | 'test1600Tracking' | 'workoutTracking' | 'trainingPreparing' | 'terms' | 'home' | 'training' | 'ranking' | 'races' | 'profile' | 'lessons' | 'forgotPassword';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [navigationHistory, setNavigationHistory] = useState<Screen[]>(['welcome']);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompletedAnamnese, setHasCompletedAnamnese] = useState(false);
  const [isFromTest, setIsFromTest] = useState(false);

  // Reset scroll to top when screen changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentScreen]);

  const navigateTo = (screen: Screen) => {
    setNavigationHistory(prev => [...prev, screen]);
    setCurrentScreen(screen);
  };

  const navigateBack = () => {
    if (navigationHistory.length > 1) {
      const newHistory = [...navigationHistory];
      newHistory.pop(); // Remove current screen
      const previousScreen = newHistory[newHistory.length - 1];
      setNavigationHistory(newHistory);
      setCurrentScreen(previousScreen);
    }
  };

  const handleWelcomeLogin = () => {
    navigateTo('login');
  };

  const handleWelcomeSignup = () => {
    navigateTo('signup');
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigateTo('onboardingHub');
  };

  const handleSignup = () => {
    setIsAuthenticated(true);
    navigateTo('onboardingHub');
  };

  const handleStartAnamnese = () => {
    navigateTo('anamnese');
  };

  const handleCompleteAnamnese = () => {
    setHasCompletedAnamnese(true);
    navigateTo('terms');
  };

  const handleAcceptTerms = () => {
    // Return to Hub instead of going directly to test
    navigateTo('onboardingHub');
  };

  const handleStartTest = () => {
    if (currentScreen === 'onboardingHub') {
       navigateTo('pendingTest');
    } else {
       setIsFromTest(true);
       navigateTo('test1600Tracking');
    }
  };

  const handleTestFinish = (data: any) => {
    console.log('Test completed:', data);
    navigateTo('trainingPreparing');
  };

  const handleTrainingPreparingComplete = () => {
    setIsFromTest(false);
    navigateTo('home');
  };

  const handleTestCancel = () => {
    setIsFromTest(false);
    navigateTo('pendingTest');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onLogin={handleWelcomeLogin} onSignup={handleWelcomeSignup} />;
      case 'login':
        return <LoginScreen onLogin={handleLogin} onNavigateToSignup={() => navigateTo('signup')} onNavigateBack={navigateBack} onNavigateToForgotPassword={() => navigateTo('forgotPassword')} />;
      case 'signup':
        return <SignupScreen onSignup={handleSignup} onNavigateToLogin={() => navigateTo('login')} onNavigateBack={navigateBack} />;
      case 'forgotPassword':
        return <ForgotPasswordScreen onNavigateBack={navigateBack} />;
      case 'onboardingHub':
        return <OnboardingHubScreen onStartAnamnese={handleStartAnamnese} onStartTest={() => navigateTo('pendingTest')} isAnamneseCompleted={hasCompletedAnamnese} />;
      case 'anamnese':
        return <AnamneseScreen onComplete={handleCompleteAnamnese} />;
      case 'pendingTest':
        return <PendingTest1600 onStartTest={() => { setIsFromTest(true); navigateTo('test1600Tracking'); }} />;
      case 'test1600Tracking':
        return <Test1600Tracking onFinish={handleTestFinish} onCancel={handleTestCancel} />;
      case 'workoutTracking':
        return <WorkoutTracking workoutName="Intervalado 5x400m" blocks={[{ distance: 1000, pace: "6:00", description: "1 km pace 6:00" }, { distance: 1600, pace: "4:40", description: "4x 400m pace 4:40" }, { distance: 400, pace: "4:00", description: "2x 200m pace 4:00" }, { distance: 500, pace: "6:00", description: "500m pace 6:00" }]} onFinish={(data) => { console.log('Workout completed:', data); navigateTo('home'); }} onCancel={() => navigateTo('training')} />;
      case 'trainingPreparing':
        return <TrainingPreparing onComplete={handleTrainingPreparingComplete} />;
      case 'terms':
        return <TermsScreen onAccept={handleAcceptTerms} />;
      case 'home':
        return <HomeScreen onNavigate={navigateTo} />;
      case 'training':
        return <TrainingScreen onNavigate={navigateTo} />;
      case 'ranking':
        return <RankingScreen onNavigate={navigateTo} />;
      case 'races':
        return <RaceScheduleScreen onNavigate={navigateTo} />;
      case 'profile':
        return <ProfileScreen onNavigate={navigateTo} />;
      case 'lessons':
        return <LessonsScreen onNavigate={navigateTo} />;
      default:
        return <HomeScreen onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="w-full h-dvh bg-white overflow-hidden flex flex-col relative">
      <div className="flex-1 relative z-0 flex flex-col min-h-0">
        {renderScreen()}
      </div>
      
      {/* Bottom Navigation - Refined Apple Design */}
      {isAuthenticated && !['welcome', 'login', 'signup', 'onboardingHub', 'anamnese', 'pendingTest', 'test1600Tracking', 'workoutTracking', 'trainingPreparing', 'terms', 'forgotPassword'].includes(currentScreen) && (
        <nav className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-2xl border-t border-gray-200 z-50 pb-8 pt-2">
          <div className="max-w-md mx-auto px-2 pb-2">
            {/* Subtle accent line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FFB300]/20 to-transparent opacity-50"></div>
            
            <div className="flex items-center justify-between px-4">
              <button
                onClick={() => navigateTo('home')}
                className={`relative flex flex-col items-center gap-1 p-2 rounded-2xl transition-all duration-300 touch-manipulation flex-1 ${
                  currentScreen === 'home' ? 'text-[#E53935]' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${currentScreen === 'home' ? 'bg-red-50' : 'bg-transparent opacity-0'} scale-90 ${currentScreen === 'home' ? 'opacity-100 scale-100' : ''} -z-10`}></div>
                <Home size={24} strokeWidth={currentScreen === 'home' ? 2.5 : 2} className="transition-transform duration-300" />
                <span className={`text-[10px] font-medium transition-all duration-300 ${currentScreen === 'home' ? 'font-semibold' : ''}`}>
                  Início
                </span>
              </button>

              <button
                onClick={() => navigateTo('training')}
                className={`relative flex flex-col items-center gap-1 p-2 rounded-2xl transition-all duration-300 touch-manipulation flex-1 ${
                  currentScreen === 'training' ? 'text-[#E53935]' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${currentScreen === 'training' ? 'bg-red-50' : 'bg-transparent opacity-0'} scale-90 ${currentScreen === 'training' ? 'opacity-100 scale-100' : ''} -z-10`}></div>
                <Dumbbell size={24} strokeWidth={currentScreen === 'training' ? 2.5 : 2} className="transition-transform duration-300" />
                <span className={`text-[10px] font-medium transition-all duration-300 ${currentScreen === 'training' ? 'font-semibold' : ''}`}>
                  Treino
                </span>
              </button>

              <button
                onClick={() => navigateTo('lessons')}
                className={`relative flex flex-col items-center gap-1 p-2 rounded-2xl transition-all duration-300 touch-manipulation flex-1 ${
                  currentScreen === 'lessons' ? 'text-purple-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${currentScreen === 'lessons' ? 'bg-purple-50' : 'bg-transparent opacity-0'} scale-90 ${currentScreen === 'lessons' ? 'opacity-100 scale-100' : ''} -z-10`}></div>
                <GraduationCap size={24} strokeWidth={currentScreen === 'lessons' ? 2.5 : 2} className="transition-transform duration-300" />
                <span className={`text-[10px] font-medium transition-all duration-300 ${currentScreen === 'lessons' ? 'font-semibold' : ''}`}>
                  Aulas
                </span>
              </button>

              <button
                onClick={() => navigateTo('ranking')}
                className={`relative flex flex-col items-center gap-1 p-2 rounded-2xl transition-all duration-300 touch-manipulation flex-1 ${
                  currentScreen === 'ranking' ? 'text-[#FFB300]' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${currentScreen === 'ranking' ? 'bg-amber-50' : 'bg-transparent opacity-0'} scale-90 ${currentScreen === 'ranking' ? 'opacity-100 scale-100' : ''} -z-10`}></div>
                <Trophy size={24} strokeWidth={currentScreen === 'ranking' ? 2.5 : 2} className="transition-transform duration-300" />
                <span className={`text-[10px] font-medium transition-all duration-300 ${currentScreen === 'ranking' ? 'font-semibold' : ''}`}>
                  Ranking
                </span>
              </button>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}
