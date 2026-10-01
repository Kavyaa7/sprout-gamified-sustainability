import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Flame, 
  Sprout, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Calendar,
  Trophy,
  Award
} from 'lucide-react';
import { triggerSproutConfetti } from '../utils/confetti';
import { playBubblePopSound, playCheerSound } from '../utils/sound';

export const DailyStreakCard: React.FC = () => {
  const { stats, actionLogs, setScreen, quickIncrementMetric, soundEnabled } = useApp();
  const [streakShieldActive, setStreakShieldActive] = useState(true);

  // Determine if user has logged any action today
  const hasLoggedToday = actionLogs.some((log) => {
    const ts = (log.timestamp || '').toLowerCase();
    return ts.includes('just now') || ts.includes('today') || ts.includes('minutes ago') || ts.includes('hours ago');
  });

  const streakDays = Math.max(1, stats.streakDays);

  // 7-day tracking window
  const weekDays = [
    { day: 'Mon', full: 'Monday', offset: -4 },
    { day: 'Tue', full: 'Tuesday', offset: -3 },
    { day: 'Wed', full: 'Wednesday', offset: -2 },
    { day: 'Thu', full: 'Thursday', offset: -1 },
    { day: 'Fri', full: 'Friday', isToday: true, offset: 0 },
    { day: 'Sat', full: 'Saturday', isFuture: true, offset: 1 },
    { day: 'Sun', full: 'Sunday', isFuture: true, offset: 2 },
  ];

  // Milestones
  const nextMilestone = streakDays < 7 ? 7 : streakDays < 14 ? 14 : streakDays < 30 ? 30 : 50;
  const daysToMilestone = Math.max(1, nextMilestone - streakDays);
  const milestoneProgress = Math.min(100, Math.round((streakDays / nextMilestone) * 100));

  const handleFlameClick = () => {
    playCheerSound(soundEnabled);
    triggerSproutConfetti();
  };

  const handleQuickIgnite = () => {
    playBubblePopSound(soundEnabled);
    // Quick log a quick deed to ignite today's streak if not logged
    quickIncrementMetric('water', 10);
  };

  return (
    <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-emerald-500/10 rounded-3xl p-6 sm:p-7 border-2 border-amber-300/80 shadow-md relative overflow-hidden transition-all">
      
      {/* Background ambient radial glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-amber-300/30 via-orange-300/20 to-transparent rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-60 h-60 bg-emerald-300/20 rounded-full blur-2xl pointer-events-none" />

      {/* Main Content Layout */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* Left Section: Visual Flame / Sprout Indicator & Streak Counter */}
        <div className="flex items-center gap-4 sm:gap-5">
          
          {/* Interactive Bouncy Flame & Sprout Emblem */}
          <button
            type="button"
            onClick={handleFlameClick}
            className="group relative flex items-center justify-center cursor-pointer shrink-0"
            title="Click to celebrate your daily streak!"
          >
            {/* Outer animated halo ring */}
            <div className={`absolute -inset-2 rounded-3xl blur-md transition-all ${
              hasLoggedToday
                ? 'bg-gradient-to-tr from-amber-500 via-orange-500 to-emerald-400 opacity-70 animate-pulse'
                : 'bg-amber-400/40 opacity-40'
            }`} />

            {/* Inner Icon Box */}
            <div className={`relative w-18 h-18 sm:w-20 sm:h-20 rounded-2xl flex flex-col items-center justify-center p-2 border-2 transition-transform duration-300 group-hover:scale-105 shadow-lg ${
              hasLoggedToday
                ? 'bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-400 border-amber-200 text-white shadow-orange-500/30'
                : 'bg-gradient-to-tr from-amber-100 to-orange-100 border-amber-300 text-amber-700 shadow-amber-300/20'
            }`}>
              <div className="relative">
                <Flame className={`w-8 h-8 sm:w-9 sm:h-9 ${hasLoggedToday ? 'fill-amber-200 text-white animate-bounce' : 'fill-amber-400 text-amber-600'}`} />
                <Sprout className="w-5 h-5 absolute -bottom-1 -right-1.5 text-emerald-900 bg-emerald-300 rounded-full p-0.5 shadow-xs" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider mt-0.5 text-slate-900/90 bg-white/70 px-1.5 py-0.2 rounded-md">
                {hasLoggedToday ? 'Active 🔥' : 'Pending ⏳'}
              </span>
            </div>

            {/* Micro Badge */}
            {hasLoggedToday && (
              <div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            )}
          </button>

          {/* Text & Streak Details */}
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-xs uppercase tracking-wider font-extrabold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300/70 inline-flex items-center gap-1">
                <Flame className="w-3 h-3 fill-amber-500 text-amber-600" />
                <span>Daily Streak Tracker</span>
              </span>
              
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300/70 inline-flex items-center gap-1">
                <Zap className="w-3 h-3 fill-emerald-500 text-emerald-600" />
                <span>x{Math.min(3, 1 + streakDays * 0.1).toFixed(1)} XP Multiplier</span>
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-slate-950 tracking-tight tabular-nums">
                {streakDays} <span className="text-xl sm:text-2xl font-bold text-amber-700">Days Active</span>
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-sm">
              {hasLoggedToday ? (
                <span className="text-emerald-800 font-semibold flex items-center gap-1">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  <span>Today's streak is lit! Come back tomorrow to maintain your combo.</span>
                </span>
              ) : (
                <span className="text-amber-900 font-medium">
                  Log at least 1 eco-action today to keep your streak flame alive and protect your bonus multiplier!
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Right Section: Streak Protection & Quick Action */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          
          {/* Streak Shield Status */}
          <div className="p-3 bg-white/80 backdrop-blur-xs rounded-2xl border border-amber-200/80 flex items-center gap-2.5 text-xs text-slate-700 shadow-2xs">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <div className="font-bold text-slate-900 flex items-center gap-1">
                <span>Streak Shield</span>
                <span className="text-[10px] text-emerald-700 font-extrabold uppercase bg-emerald-50 px-1 rounded">Active</span>
              </div>
              <div className="text-[11px] text-slate-500">1 Grace freeze available</div>
            </div>
          </div>

          {/* Action CTA based on today's status */}
          {!hasLoggedToday ? (
            <button
              onClick={handleQuickIgnite}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-heading font-bold text-xs sm:text-sm shadow-md shadow-orange-500/25 hover:shadow-orange-500/35 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Flame className="w-4 h-4 fill-amber-200" />
              <span>Log Action to Save Streak</span>
            </button>
          ) : (
            <button
              onClick={() => setScreen('action-logging')}
              className="px-5 py-3 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-200 font-heading font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sprout className="w-4 h-4 text-emerald-600" />
              <span>Log Another Green Habit</span>
            </button>
          )}

        </div>

      </div>

      {/* 7-Day Visual Calendar Track */}
      <div className="mt-6 pt-5 border-t border-amber-200/60">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-amber-600" />
            <span>7-Day Activity Horizon</span>
          </div>

          {/* Milestone Progress Snippet */}
          <div className="text-[11px] text-slate-500 flex items-center gap-1.5 font-medium">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>Next Goal: <strong>{nextMilestone}-Day Trophy</strong> ({daysToMilestone} days to go)</span>
          </div>
        </div>

        {/* 7 Day Bubbles Grid */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-3">
          {weekDays.map((item, idx) => {
            const isCompleted = item.offset < 0 || (item.isToday && hasLoggedToday);
            const isPendingToday = item.isToday && !hasLoggedToday;

            return (
              <div
                key={item.day}
                className={`flex flex-col items-center p-2 sm:p-3 rounded-2xl border transition-all ${
                  item.isToday
                    ? isCompleted
                      ? 'bg-amber-100/90 border-amber-400 shadow-sm ring-2 ring-amber-300'
                      : 'bg-white border-amber-300 border-dashed animate-pulse ring-2 ring-orange-400/40'
                    : isCompleted
                    ? 'bg-white/90 border-emerald-200 shadow-2xs'
                    : 'bg-slate-50/60 border-slate-200/80 text-slate-400'
                }`}
              >
                <span className={`text-[10px] sm:text-xs font-bold mb-1.5 ${
                  item.isToday ? 'text-amber-900 font-extrabold' : isCompleted ? 'text-slate-700' : 'text-slate-400'
                }`}>
                  {item.day}
                </span>

                {/* Day Visual Icon Indicator */}
                <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center transition-transform ${
                  isCompleted
                    ? 'bg-gradient-to-tr from-amber-500 to-orange-400 text-white shadow-xs scale-105'
                    : isPendingToday
                    ? 'bg-amber-50 text-amber-600 border border-amber-300'
                    : 'bg-slate-100 text-slate-300'
                }`}>
                  {isCompleted ? (
                    <Flame className="w-4 h-4 fill-white" />
                  ) : isPendingToday ? (
                    <Sprout className="w-4 h-4 text-emerald-600 animate-spin" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-slate-300" />
                  )}
                </div>

                <span className={`text-[9px] sm:text-[10px] mt-1 font-semibold ${
                  isCompleted ? 'text-emerald-700' : isPendingToday ? 'text-amber-700' : 'text-slate-400'
                }`}>
                  {isCompleted ? 'Done' : isPendingToday ? 'Today' : 'Upcoming'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Milestone Progress Bar */}
        <div className="mt-4 pt-3 flex items-center gap-3">
          <div className="flex-1 bg-slate-200/70 h-2.5 rounded-full overflow-hidden p-0.5">
            <div 
              className="bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500 h-full rounded-full transition-all duration-700"
              style={{ width: `${milestoneProgress}%` }}
            />
          </div>
          <span className="text-[11px] font-bold text-amber-900 tabular-nums shrink-0">
            {streakDays}/{nextMilestone} Days
          </span>
        </div>

      </div>

    </div>
  );
};
