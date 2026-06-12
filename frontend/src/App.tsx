import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { DashboardLayout } from './pages/DashboardLayout';

type View = 'landing' | 'auth' | 'dashboard';

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const [view, setView] = useState<View>('landing');

  if (isAuthenticated) return <DashboardLayout />;
  if (view === 'auth') return <AuthPage onBack={() => setView('landing')} />;
  return <LandingPage onGetStarted={() => setView('auth')} />;
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
