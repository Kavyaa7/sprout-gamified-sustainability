import React from 'react';
import { useApp } from '../context/AppContext';
import { LayoutDashboard, PlusCircle, Trophy, Award, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { screen, setScreen } = useApp();

  if (screen === 'welcome' || screen === 'auth') {
    return null;
  }

  const items = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'action-logging', label: 'Log', icon: PlusCircle },
    { id: 'leaderboard', label: 'Ranks', icon: Trophy },
    { id: 'rewards', label: 'Rewards', icon: Award },
    { id: 'profile-setup', label: 'Profile', icon: User },
  ] as const;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-emerald-100 shadow-lg px-2 pb-safe">
      <div className="grid grid-cols-5 items-center h-16 max-w-lg mx-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = screen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setScreen(item.id)}
              className="flex flex-col items-center justify-center min-h-[44px] py-1 text-center transition-colors group"
            >
              <div
                className={`p-1 rounded-xl transition-all ${
                  isActive
                    ? 'text-emerald-700 bg-emerald-100/70 scale-105'
                    : 'text-slate-400 group-hover:text-slate-700'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span
                className={`text-[11px] font-medium tracking-tight mt-0.5 truncate max-w-[70px] ${
                  isActive ? 'text-emerald-800 font-bold' : 'text-slate-500'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
