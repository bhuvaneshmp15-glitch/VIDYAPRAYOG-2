import React, { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { PortalLayout } from './components/PortalLayout';
import { PortalId } from './types/portal';

export const App: React.FC = () => {
  const [view, setView] = useState<'login' | 'portal'>('login');
  const [activePortalId, setActivePortalId] = useState<PortalId>('industry');

  const handleSelectPortal = (portalId: PortalId) => {
    setActivePortalId(portalId);
    setView('portal');
  };

  const handleReturnToHome = () => {
    setView('login');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {view === 'login' ? (
        <LoginPage onSelectPortal={handleSelectPortal} />
      ) : (
        <PortalLayout
          currentPortalId={activePortalId}
          onSelectPortal={setActivePortalId}
          onReturnToHome={handleReturnToHome}
        />
      )}
    </div>
  );
};

export default App;
