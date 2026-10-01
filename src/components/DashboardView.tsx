import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FUN_FACTS_AND_QUOTES } from '../data/mockData';
import { DailyStreakCard } from './DailyStreakCard';
import { 
  Sprout, 
  Droplet, 
  ShoppingBag, 
  Zap, 
  Wind, 
  Plus, 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft, 
  Quote, 
  Trophy,
  Target,
  Award
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { 
    user, 
    stats, 
    dailyChallenge, 
    completeDailyChallenge, 
    quickIncrementMetric, 
    setScreen 
  } = useApp();

  const [factIndex, setFactIndex] = useState(0);
  const activeFact = FUN_FACTS_AND_QUOTES[factIndex];

  const handleNextFact = () => {
    setFactIndex((prev) => (prev + 1) % FUN_FACTS_AND_QUOTES.length);
  };

  const handlePrevFact = () => {
    setFactIndex((prev) => (prev - 1 + FUN_FACTS_AND_QUOTES.length) % FUN_FACTS_AND_QUOTES.length);
  };

  // Progress math
  const levelMin = stats.pointsForCurrentLevel;
  const levelMax = stats.pointsForNextLevel;
  const pointsInCurrentLevel = Math.max(0, stats.points - levelMin);
  const levelRange = Math.max(1, levelMax - levelMin);
  const progressPercent = Math.min(100, Math.round((pointsInCurrentLevel / levelRange) * 100));
  const pointsNeeded = Math.max(0, levelMax - stats.points);

  return (
    <div className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6 sm:space-y-8">
      
      {/* 1. Greeting & User Snapshot Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 text-white rounded-3xl p-6 sm:p-8 shadow-lg shadow-emerald-700/15 relative overflow-hidden">
        
        {/* Soft atmospheric background shapes */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-teal-400/15 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex items-center gap-4">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.username}
              referrerPolicy="no-referrer"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover bg-white/20 border-3 border-amber-300 shadow-md shrink-0 hover:scale-105 transition-transform"
            />
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs uppercase tracking-wider animate-bounce">
              ⚡ XP x{Math.max(1, stats.streakDays)}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-xs uppercase tracking-wider font-extrabold text-emerald-200 bg-emerald-900/60 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                Eco-Hero Lv. {stats.level}
              </span>
              <span className="text-emerald-300">·</span>
              <span className="inline-flex items-center gap-1 text-xs font-black text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-400/30">
                <Flame className="w-3.5 h-3.5 fill-amber-300" />
                <span>{stats.streakDays}-Day Combo Streak!</span>
              </span>
            </div>
            
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-white flex items-center gap-2">
              <span>Hey, {user.username}!</span>
              <span className="text-2xl animate-sprout-bounce">🌱</span>
            </h1>
            
            <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-md">
              Level up your eco karma! Every small deed keeps our oceans clean and earns you rare badges.
            </p>
          </div>
        </div>

        {/* Quick Log Action CTA */}
        <div className="relative z-10 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setScreen('action-logging')}
            className="px-5 py-3 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-900 font-heading font-bold text-sm shadow-md transition-all flex items-center gap-2 hover:scale-[1.02] cursor-pointer"
          >
            <Plus className="w-4 h-4 text-emerald-600 stroke-[3]" />
            <span>Log Today's Action</span>
          </button>
          
          <button
            onClick={() => setScreen('leaderboard')}
            className="px-4 py-3 rounded-2xl bg-emerald-800/80 hover:bg-emerald-800 text-white font-heading font-semibold text-sm border border-emerald-500/40 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Trophy className="w-4 h-4 text-amber-300" />
            <span>Leaderboard</span>
          </button>

          <button
            onClick={() => setScreen('rewards')}
            className="px-4 py-3 rounded-2xl bg-emerald-800/80 hover:bg-emerald-800 text-white font-heading font-semibold text-sm border border-emerald-500/40 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Award className="w-4 h-4 text-emerald-200" />
            <span>Rewards</span>
          </button>
        </div>
      </div>

      {/* 2. Daily Streak Feature Card (Consecutive habit tracking with Flame & Sprout indicators) */}
      <DailyStreakCard />

      {/* 3. Level Progress & Points to Next Level Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-100/90 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-0.5">
              Level Progression
            </div>
            <h2 className="font-heading font-bold text-lg sm:text-xl text-slate-900">
              {stats.levelTitle}
            </h2>
          </div>

          <div className="flex items-baseline gap-2 text-right">
            <span className="font-heading font-extrabold text-2xl text-emerald-700 tabular-nums">
              {stats.points}
            </span>
            <span className="text-xs font-semibold text-slate-400">
              / {stats.pointsForNextLevel} total points
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700 ease-out shadow-xs"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>{progressPercent}% towards Level {stats.level + 1}</span>
            <span className="font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
              {pointsNeeded} points to reach next level
            </span>
          </div>
        </div>
      </div>

      {/* 3. Today's Progress Cards (Water saved, Plastic items reduced, etc.) */}
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <div>
            <h2 className="font-heading font-bold text-xl text-slate-900">
              Today's Eco-Impact
            </h2>
            <p className="text-xs text-slate-500">
              Real-world savings from your daily sustainable decisions.
            </p>
          </div>
          <span className="text-xs font-semibold text-emerald-700 hidden sm:inline">
            Tap (+) to quick-log instant deed
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Water Saved */}
          <div className="bg-white rounded-3xl p-5 border border-emerald-100/90 shadow-sm hover:shadow-md transition-shadow relative group">
            <div className="flex items-start justify-between mb-3">
              <div className="w-11 h-11 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <Droplet className="w-6 h-6 fill-cyan-500/20" />
              </div>
              <button
                onClick={() => quickIncrementMetric('water', 15)}
                className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-cyan-100 text-slate-500 hover:text-cyan-700 flex items-center justify-center transition-colors cursor-pointer"
                title="Quick log +15L water saved"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
            
            <div className="space-y-1">
              <div className="font-heading font-extrabold text-3xl text-slate-900 tabular-nums">
                {stats.litresWaterSaved} <span className="text-base font-semibold text-slate-500">L</span>
              </div>
              <div className="text-xs font-bold text-cyan-800">
                Litres of Water Saved
              </div>
              <p className="text-[11px] text-slate-500 leading-snug pt-1">
                Equivalent to 3 full bathtubs kept in natural reservoirs.
              </p>
            </div>
          </div>

          {/* Card 2: Plastic Reduced */}
          <div className="bg-white rounded-3xl p-5 border border-emerald-100/90 shadow-sm hover:shadow-md transition-shadow relative group">
            <div className="flex items-start justify-between mb-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <button
                onClick={() => quickIncrementMetric('plastic', 1)}
                className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-emerald-100 text-slate-500 hover:text-emerald-700 flex items-center justify-center transition-colors cursor-pointer"
                title="Quick log +1 single-use plastic avoided"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
            
            <div className="space-y-1">
              <div className="font-heading font-extrabold text-3xl text-slate-900 tabular-nums">
                {stats.plasticItemsReduced} <span className="text-base font-semibold text-slate-500">items</span>
              </div>
              <div className="text-xs font-bold text-emerald-800">
                Plastic Items Reduced
              </div>
              <p className="text-[11px] text-slate-500 leading-snug pt-1">
                Bottles, bags & straws diverted from oceans and landfills.
              </p>
            </div>
          </div>

          {/* Card 3: CO2 Prevented */}
          <div className="bg-white rounded-3xl p-5 border border-emerald-100/90 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="w-11 h-11 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <Wind className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                Transit & Diet
              </span>
            </div>
            
            <div className="space-y-1">
              <div className="font-heading font-extrabold text-3xl text-slate-900 tabular-nums">
                {stats.co2PreventedKg} <span className="text-base font-semibold text-slate-500">kg</span>
              </div>
              <div className="text-xs font-bold text-teal-800">
                CO2 Footprint Cut
              </div>
              <p className="text-[11px] text-slate-500 leading-snug pt-1">
                Equal to planting 0.7 mature urban shade trees!
              </p>
            </div>
          </div>

          {/* Card 4: Energy Conserved */}
          <div className="bg-white rounded-3xl p-5 border border-emerald-100/90 shadow-sm hover:shadow-md transition-shadow relative group">
            <div className="flex items-start justify-between mb-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Zap className="w-6 h-6 fill-amber-500/20" />
              </div>
              <button
                onClick={() => quickIncrementMetric('energy', 1)}
                className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-amber-100 text-slate-500 hover:text-amber-700 flex items-center justify-center transition-colors cursor-pointer"
                title="Quick log +1 kWh energy saved"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
            
            <div className="space-y-1">
              <div className="font-heading font-extrabold text-3xl text-slate-900 tabular-nums">
                {stats.energySavedKwh} <span className="text-base font-semibold text-slate-500">kWh</span>
              </div>
              <div className="text-xs font-bold text-amber-800">
                Clean Energy Saved
              </div>
              <p className="text-[11px] text-slate-500 leading-snug pt-1">
                Phantom power cut & eco laundry drying days.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* 4. Two-Column Row: Today's Challenge + Fun Facts & Quotes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left: Today's Challenge */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-emerald-100/90 shadow-sm flex flex-col justify-between relative overflow-hidden">
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
                <Target className="w-3.5 h-3.5 text-amber-600" />
                <span>Today's Daily Challenge</span>
              </div>

              <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                +{dailyChallenge.points} Bonus Points
              </div>
            </div>

            <h3 className="font-heading font-bold text-xl text-slate-900">
              {dailyChallenge.title}
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed">
              {dailyChallenge.description}
            </p>

            <div className="inline-flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/80">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{dailyChallenge.impactLabel}</span>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
            {dailyChallenge.isCompleted ? (
              <div className="inline-flex items-center gap-2 text-emerald-700 font-bold text-sm bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Completed today! +{dailyChallenge.points} pts added</span>
              </div>
            ) : (
              <button
                onClick={completeDailyChallenge}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>I Completed This Challenge</span>
              </button>
            )}

            <button
              onClick={() => setScreen('action-logging')}
              className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-emerald-700 transition-colors"
            >
              <span>View other actions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Right: Fun Facts and Quotes Interactive Carousel */}
        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-50 via-teal-50/60 to-white rounded-3xl p-6 sm:p-7 border border-emerald-200/60 shadow-sm flex flex-col justify-between">
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                <Quote className="w-4 h-4 text-emerald-600" />
                <span>{activeFact.tag}</span>
              </div>
              
              {/* Carousel Arrows */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrevFact}
                  className="w-7 h-7 rounded-lg bg-white/80 hover:bg-white text-slate-600 flex items-center justify-center shadow-2xs border border-emerald-100 cursor-pointer"
                  title="Previous fact"
                  aria-label="Previous fact"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextFact}
                  className="w-7 h-7 rounded-lg bg-white/80 hover:bg-white text-slate-600 flex items-center justify-center shadow-2xs border border-emerald-100 cursor-pointer"
                  title="Next fact"
                  aria-label="Next fact"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-slate-800 text-base sm:text-lg font-medium leading-snug italic mb-4 min-h-[72px]">
              "{activeFact.fact}"
            </p>
          </div>

          <div className="pt-3 border-t border-emerald-100/80 flex items-center justify-between text-xs text-slate-500">
            <div>
              {activeFact.author && (
                <span className="font-bold text-slate-700">{activeFact.author} · </span>
              )}
              <span>{activeFact.source}</span>
            </div>
            <span className="text-[11px] font-semibold text-emerald-700">
              {factIndex + 1}/{FUN_FACTS_AND_QUOTES.length}
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};
