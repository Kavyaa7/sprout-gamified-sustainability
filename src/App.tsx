/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { WelcomeView } from './components/WelcomeView';
import { AuthView } from './components/AuthView';
import { ProfileSetupView } from './components/ProfileSetupView';
import { DashboardView } from './components/DashboardView';
import { ActionLoggingView } from './components/ActionLoggingView';
import { RewardsView } from './components/RewardsView';
import { LeaderboardView } from './components/LeaderboardView';
import { CelebrationModal } from './components/CelebrationModal';

const MainContent: React.FC = () => {
  const { screen } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf8] text-slate-800 antialiased selection:bg-emerald-200 selection:text-emerald-950 pb-20 md:pb-10">
      <Navbar />

      <main className="flex-1 w-full">
        {screen === 'welcome' && <WelcomeView />}
        {screen === 'auth' && <AuthView />}
        {screen === 'profile-setup' && <ProfileSetupView />}
        {screen === 'dashboard' && <DashboardView />}
        {screen === 'action-logging' && <ActionLoggingView />}
        {screen === 'leaderboard' && <LeaderboardView />}
        {screen === 'rewards' && <RewardsView />}
      </main>

      <BottomNav />
      <CelebrationModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
