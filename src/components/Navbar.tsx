import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sprout, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  RotateCcw,
  User,
  Award,
  PlusCircle,
  LayoutDashboard,
  Trophy
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { screen, setScreen, stats, user, soundEnabled, toggleSound, resetAllData } = useApp();

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-emerald-100/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Brand Wordmark (Single text element with sprout symbol) */}
        <button
          onClick={() => setScreen('welcome')}
          className="flex items-center gap-2.5 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-1 text-left"
          title="Sprout - App Introduction & Info"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center text-white shadow-sm shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Sprout className="w-5 h-5 transition-transform group-hover:rotate-6" />
          </div>
          <span className="font-heading font-extrabold text-2xl tracking-tight text-emerald-950">
            Sprout
          </span>
        </button>

        {/* Zone 2: Navigation Links (Clean text links with hover styling) */}
        {screen !== 'welcome' && screen !== 'auth' && (
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            <button
              onClick={() => setScreen('dashboard')}
              className={`flex items-center gap-1.5 transition-colors py-1 border-b-2 ${
                screen === 'dashboard'
                  ? 'border-emerald-600 text-emerald-900 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-emerald-700'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setScreen('action-logging')}
              className={`flex items-center gap-1.5 transition-colors py-1 border-b-2 ${
                screen === 'action-logging'
                  ? 'border-emerald-600 text-emerald-900 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-emerald-700'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>Log Action</span>
            </button>

            <button
              onClick={() => setScreen('leaderboard')}
              className={`flex items-center gap-1.5 transition-colors py-1 border-b-2 ${
                screen === 'leaderboard'
                  ? 'border-emerald-600 text-emerald-900 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-emerald-700'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Leaderboard</span>
            </button>

            <button
              onClick={() => setScreen('rewards')}
              className={`flex items-center gap-1.5 transition-colors py-1 border-b-2 ${
                screen === 'rewards'
                  ? 'border-emerald-600 text-emerald-900 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-emerald-700'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Rewards & Badges</span>
            </button>

            <button
              onClick={() => setScreen('profile-setup')}
              className={`flex items-center gap-1.5 transition-colors py-1 border-b-2 ${
                screen === 'profile-setup'
                  ? 'border-emerald-600 text-emerald-900 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-emerald-700'
              }`}
            >
              <User className="w-4 h-4" />
              <span>My Journey</span>
            </button>
          </nav>
        )}

        {/* Zone 3: Actions & Quick Profile Info */}
        <div className="flex items-center gap-3">
          {screen === 'welcome' && (
            <button
              onClick={() => setScreen('dashboard')}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-xs shadow-xs hover:shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Go to Dashboard</span>
            </button>
          )}

          {screen !== 'welcome' && screen !== 'auth' && (
            <div 
              onClick={() => setScreen('rewards')}
              className="cursor-pointer flex items-center gap-2 bg-emerald-50/90 hover:bg-emerald-100/90 text-emerald-900 px-3 py-1.5 rounded-xl border border-emerald-200/80 transition-colors"
              title="Click to view rewards & level progress"
            >
              <Sparkles className="w-4 h-4 text-emerald-600 fill-emerald-500" />
              <div className="flex items-baseline gap-1 text-xs">
                <span className="font-bold tabular-nums text-sm text-emerald-800">{stats.points}</span>
                <span className="text-emerald-600 font-medium">pts</span>
              </div>
            </div>
          )}

          {/* Sound Mute/Unmute */}
          <button
            onClick={toggleSound}
            aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-emerald-700 hover:bg-emerald-50/60 transition-colors"
            title={soundEnabled ? 'Sound effects on' : 'Sound effects muted'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Reset Demo State button */}
          <button
            onClick={() => {
              if (window.confirm('Reset Sprout demo data to initial state?')) {
                resetAllData();
              }
            }}
            className="w-9 h-9 rounded-xl hidden sm:flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title="Reset demo data"
            aria-label="Reset demo data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* User Avatar & Login / Switch */}
          {screen !== 'welcome' && screen !== 'auth' ? (
            <button
              onClick={() => setScreen('profile-setup')}
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-slate-100 transition-colors"
              title="Edit Profile & Goals"
            >
              <img
                src={user.avatar}
                alt={user.username}
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full object-cover border-2 border-emerald-500 bg-emerald-50 shadow-xs"
              />
              <span className="hidden lg:inline text-xs font-semibold text-slate-700 max-w-[100px] truncate">
                {user.username}
              </span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setScreen('auth')}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-800 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => setScreen('profile-setup')}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors"
              >
                Join Sprout
              </button>
            </div>
          )}

        </div>
      </div>
    </header>
  );
};
