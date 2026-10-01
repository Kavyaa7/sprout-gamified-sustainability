import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_LEADERBOARD_USERS } from '../data/mockData';
import { LeaderboardUser } from '../types';
import { triggerSproutConfetti } from '../utils/confetti';
import { playChimeSound, playCheerSound } from '../utils/sound';
import {
  Trophy,
  Flame,
  Sparkles,
  Search,
  Users,
  Award,
  Crown,
  ThumbsUp,
  PlusCircle,
  Globe2,
  School,
  ArrowUp,
  Droplet,
  ShoppingBag
} from 'lucide-react';

export const LeaderboardView: React.FC = () => {
  const { user, stats, soundEnabled, setScreen } = useApp();

  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'allTime'>('weekly');
  const [scope, setScope] = useState<'global' | 'school'>('global');
  const [searchQuery, setSearchQuery] = useState('');
  const [cheeredUserIds, setCheeredUserIds] = useState<Record<string, number>>({});

  // Synthesize current user as an active participant on the leaderboard
  const currentUserEntry: LeaderboardUser = useMemo(() => {
    // Current user's weekly points estimated from total points ratio
    const weeklyPts = Math.min(stats.points, Math.round(stats.points * 0.45));
    const monthlyPts = Math.min(stats.points, Math.round(stats.points * 0.85));

    return {
      id: user.id || 'current_user',
      rank: 0, // will be computed dynamically
      username: user.username,
      avatar: user.avatar,
      level: stats.level,
      levelTitle: stats.levelTitle,
      weeklyPoints: weeklyPts,
      monthlyPoints: monthlyPts,
      allTimePoints: stats.points,
      streakDays: stats.streakDays,
      topBadge: 'Plastic Warrior',
      badgeImage: '/src/assets/images/badge_plastic_warrior_1790693682868.jpg',
      impactSnippet: `${stats.plasticItemsReduced} plastics reduced · ${stats.litresWaterSaved}L water saved`,
      cheersReceived: 26,
      isCurrentUser: true,
    };
  }, [user, stats]);

  // Combine other users with current user and sort dynamically
  const rankedUsers = useMemo(() => {
    const list = [...INITIAL_LEADERBOARD_USERS, currentUserEntry];

    // Filter by search query if any
    const filtered = list.filter((u) =>
      u.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort by selected timeframe points descending
    filtered.sort((a, b) => {
      const ptsA =
        timeframe === 'weekly'
          ? a.weeklyPoints
          : timeframe === 'monthly'
          ? a.monthlyPoints
          : a.allTimePoints;
      const ptsB =
        timeframe === 'weekly'
          ? b.weeklyPoints
          : timeframe === 'monthly'
          ? b.monthlyPoints
          : b.allTimePoints;
      return ptsB - ptsA;
    });

    // Reassign ranks
    return filtered.map((u, index) => ({
      ...u,
      rank: index + 1,
    }));
  }, [currentUserEntry, timeframe, searchQuery]);

  // Get current user's computed position
  const myRankedInfo = rankedUsers.find((u) => u.isCurrentUser);

  // Top 3 Podium champions
  const top1 = rankedUsers[0];
  const top2 = rankedUsers[1];
  const top3 = rankedUsers[2];
  const remainingList = rankedUsers.slice(3);

  const getPointsForTimeframe = (u: LeaderboardUser) => {
    if (timeframe === 'weekly') return u.weeklyPoints;
    if (timeframe === 'monthly') return u.monthlyPoints;
    return u.allTimePoints;
  };

  const handleCheer = (userId: string) => {
    setCheeredUserIds((prev) => ({
      ...prev,
      [userId]: (prev[userId] || 0) + 1,
    }));
    playCheerSound(soundEnabled);
    triggerSproutConfetti();
  };

  return (
    <div className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6 sm:space-y-8">
      
      {/* 1. Header Banner & Filter Navigation */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-emerald-800/15 relative overflow-hidden">
        
        {/* Soft decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-amber-400/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-500/40 text-xs font-bold text-emerald-200 mb-2.5">
              <Trophy className="w-3.5 h-3.5 text-amber-300" />
              <span>Youth Sustainability Rankings</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-white">
              Green Habit Champions
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-lg">
              Compete with students and eco-heroes globally. Every reusable cup, walk, and turned-off faucet pushes you higher!
            </p>
          </div>

          {/* Quick Action Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setScreen('action-logging')}
              className="px-5 py-3 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-950 font-heading font-bold text-sm shadow-md transition-all flex items-center gap-2 hover:scale-[1.02] cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-emerald-600" />
              <span>Log Action to Climb</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="relative z-10 mt-6 pt-5 border-t border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Timeframe Segmented Control */}
          <div className="flex p-1 bg-black/20 backdrop-blur-md rounded-2xl border border-white/10">
            <button
              type="button"
              onClick={() => setTimeframe('weekly')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                timeframe === 'weekly'
                  ? 'bg-white text-emerald-950 shadow-xs'
                  : 'text-emerald-100 hover:text-white'
              }`}
            >
              This Week
            </button>
            <button
              type="button"
              onClick={() => setTimeframe('monthly')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                timeframe === 'monthly'
                  ? 'bg-white text-emerald-950 shadow-xs'
                  : 'text-emerald-100 hover:text-white'
              }`}
            >
              This Month
            </button>
            <button
              type="button"
              onClick={() => setTimeframe('allTime')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                timeframe === 'allTime'
                  ? 'bg-white text-emerald-950 shadow-xs'
                  : 'text-emerald-100 hover:text-white'
              }`}
            >
              All-Time Legends
            </button>
          </div>

          {/* Community Scope Switcher */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setScope('global')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                scope === 'global'
                  ? 'bg-white/20 text-white border border-white/30'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>Global</span>
            </button>
            <button
              type="button"
              onClick={() => setScope('school')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                scope === 'school'
                  ? 'bg-white/20 text-white border border-white/30'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              <School className="w-3.5 h-3.5" />
              <span>Eco Clubs & High Schools</span>
            </button>
          </div>

        </div>

      </div>

      {/* 2. Current User Sticky Spotlight Card */}
      {myRankedInfo && (
        <div className="bg-emerald-50/90 rounded-3xl p-4 sm:p-5 border-2 border-emerald-300 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-heading font-extrabold text-lg flex items-center justify-center shadow-xs shrink-0">
              #{myRankedInfo.rank}
            </div>
            
            <img
              src={myRankedInfo.avatar}
              alt={myRankedInfo.username}
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-2xl object-cover border-2 border-emerald-500 bg-white shrink-0"
            />

            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-base text-slate-900">
                  {myRankedInfo.username} (You)
                </span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
                  Your Standing
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600 mt-0.5">
                <span className="font-medium text-emerald-800">Level {myRankedInfo.level}: {myRankedInfo.levelTitle}</span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1 text-amber-700 font-bold">
                  <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
                  <span>{myRankedInfo.streakDays}-day streak</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-5 pl-2 sm:pl-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-emerald-200">
            <div className="text-right">
              <div className="text-[11px] font-semibold uppercase text-emerald-700 tracking-wider">
                {timeframe === 'weekly' ? 'Weekly Points' : timeframe === 'monthly' ? 'Monthly Points' : 'Total Points'}
              </div>
              <div className="font-heading font-extrabold text-2xl text-emerald-950 tabular-nums">
                {getPointsForTimeframe(myRankedInfo)} <span className="text-sm font-semibold text-emerald-700">pts</span>
              </div>
            </div>

            <button
              onClick={() => setScreen('action-logging')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <ArrowUp className="w-3.5 h-3.5 stroke-[3]" />
              <span>Rank Up</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. Top 3 Podium (Gold, Silver, Bronze) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100/90 shadow-sm space-y-6">
        <div className="text-center max-w-md mx-auto">
          <h2 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 flex items-center justify-center gap-2">
            <Crown className="w-6 h-6 text-amber-500 fill-amber-400" />
            <span>Top Sprout Champions</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Leading the green movement for {timeframe === 'weekly' ? 'this week' : timeframe === 'monthly' ? 'this month' : 'all-time'}.
          </p>
        </div>

        {/* Podium Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 pt-4 items-end max-w-4xl mx-auto">
          
          {/* Rank 2: Silver (Left) */}
          {top2 && (
            <div className="order-2 md:order-1 bg-slate-50/80 rounded-3xl p-5 border-2 border-slate-200 text-center relative flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-slate-200 text-slate-800 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-xs border border-slate-300">
                🥈 2nd Place
              </div>

              <div className="pt-2">
                <div className="relative mx-auto w-20 h-20 mb-3">
                  <img
                    src={top2.avatar}
                    alt={top2.username}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 rounded-2xl object-cover border-3 border-slate-300 shadow-sm bg-white"
                  />
                  <div className="absolute -bottom-2 -right-1 bg-slate-800 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                    Lv. {top2.level}
                  </div>
                </div>

                <h3 className="font-heading font-bold text-base text-slate-900 truncate">
                  {top2.username}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {top2.levelTitle}
                </p>

                <div className="font-heading font-extrabold text-2xl text-slate-800 mt-3 tabular-nums">
                  {getPointsForTimeframe(top2)} <span className="text-xs font-bold text-slate-500">pts</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{top2.streakDays}-day streak</span>
                </div>
                <p className="text-[11px] text-emerald-700 italic mt-1 truncate">
                  {top2.impactSnippet}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-200/80">
                <button
                  type="button"
                  onClick={() => handleCheer(top2.id)}
                  className="w-full py-2 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Cheer ({top2.cheersReceived + (cheeredUserIds[top2.id] || 0)})</span>
                </button>
              </div>
            </div>
          )}

          {/* Rank 1: Gold (Center, Elevated) */}
          {top1 && (
            <div className="order-1 md:order-2 bg-gradient-to-b from-amber-50/90 to-amber-100/40 rounded-3xl p-6 border-2 border-amber-300 text-center relative flex flex-col justify-between shadow-lg shadow-amber-300/20 md:-translate-y-3">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1">
                <Crown className="w-3.5 h-3.5 fill-current" />
                <span>🥇 Champion</span>
              </div>

              <div className="pt-3">
                <div className="relative mx-auto w-24 h-24 mb-3">
                  <img
                    src={top1.avatar}
                    alt={top1.username}
                    referrerPolicy="no-referrer"
                    className="w-24 h-24 rounded-2xl object-cover border-4 border-amber-400 shadow-md bg-white"
                  />
                  <div className="absolute -bottom-2 -right-1 bg-amber-500 text-slate-950 text-xs font-black px-2 py-0.5 rounded-md shadow-xs">
                    Lv. {top1.level}
                  </div>
                </div>

                <h3 className="font-heading font-extrabold text-lg text-slate-900 truncate">
                  {top1.username}
                </h3>
                <p className="text-xs font-semibold text-amber-800 mt-0.5">
                  {top1.levelTitle}
                </p>

                <div className="font-heading font-extrabold text-3xl text-amber-950 mt-3 tabular-nums">
                  {getPointsForTimeframe(top1)} <span className="text-sm font-bold text-amber-700">pts</span>
                </div>
                <div className="text-xs text-amber-800 font-bold mt-1 flex items-center justify-center gap-1">
                  <Flame className="w-4 h-4 text-amber-600 fill-amber-500" />
                  <span>{top1.streakDays}-day active streak!</span>
                </div>
                <p className="text-xs text-emerald-800 font-medium italic mt-1.5 truncate">
                  {top1.impactSnippet}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-amber-200">
                <button
                  type="button"
                  onClick={() => handleCheer(top1.id)}
                  className="w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Cheer Champion ({top1.cheersReceived + (cheeredUserIds[top1.id] || 0)})</span>
                </button>
              </div>
            </div>
          )}

          {/* Rank 3: Bronze (Right) */}
          {top3 && (
            <div className="order-3 bg-orange-50/40 rounded-3xl p-5 border-2 border-orange-200 text-center relative flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-orange-200 text-orange-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-xs border border-orange-300">
                🥉 3rd Place
              </div>

              <div className="pt-2">
                <div className="relative mx-auto w-20 h-20 mb-3">
                  <img
                    src={top3.avatar}
                    alt={top3.username}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 rounded-2xl object-cover border-3 border-orange-300 shadow-sm bg-white"
                  />
                  <div className="absolute -bottom-2 -right-1 bg-orange-800 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                    Lv. {top3.level}
                  </div>
                </div>

                <h3 className="font-heading font-bold text-base text-slate-900 truncate">
                  {top3.username}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {top3.levelTitle}
                </p>

                <div className="font-heading font-extrabold text-2xl text-slate-800 mt-3 tabular-nums">
                  {getPointsForTimeframe(top3)} <span className="text-xs font-bold text-slate-500">pts</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{top3.streakDays}-day streak</span>
                </div>
                <p className="text-[11px] text-emerald-700 italic mt-1 truncate">
                  {top3.impactSnippet}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-orange-200">
                <button
                  type="button"
                  onClick={() => handleCheer(top3.id)}
                  className="w-full py-2 px-3 rounded-xl bg-white hover:bg-orange-50 text-slate-700 text-xs font-bold border border-orange-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Cheer ({top3.cheersReceived + (cheeredUserIds[top3.id] || 0)})</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* 4. Full Leaderboard Table & Search */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-100/90 shadow-sm space-y-4">
        
        {/* Search & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-heading font-bold text-xl text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-600" />
              <span>Full Community Rankings</span>
            </h2>
            <p className="text-xs text-slate-500">
              Showing active participants sorted by {timeframe === 'weekly' ? 'this week’s' : timeframe === 'monthly' ? 'monthly' : 'all-time'} points.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Find friends or usernames..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-slate-100 pt-2">
          {remainingList.length === 0 ? (
            <div className="text-center py-8 text-sm text-slate-400">
              No matching eco-champions found for "{searchQuery}".
            </div>
          ) : (
            remainingList.map((entry) => {
              const pts = getPointsForTimeframe(entry);
              const cheers = entry.cheersReceived + (cheeredUserIds[entry.id] || 0);

              return (
                <div
                  key={entry.id}
                  className={`py-3.5 px-3 rounded-2xl flex items-center justify-between gap-4 transition-colors ${
                    entry.isCurrentUser
                      ? 'bg-emerald-50/70 border border-emerald-200'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Rank Number */}
                    <span className="font-heading font-extrabold text-base text-slate-500 w-7 text-center shrink-0 tabular-nums">
                      #{entry.rank}
                    </span>

                    {/* User Avatar */}
                    <div className="relative shrink-0">
                      <img
                        src={entry.avatar}
                        alt={entry.username}
                        referrerPolicy="no-referrer"
                        className="w-11 h-11 rounded-xl object-cover border border-slate-200 bg-white"
                      />
                      {entry.isCurrentUser && (
                        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-600 rounded-full border border-white" />
                      )}
                    </div>

                    {/* User details */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-heading font-bold text-sm text-slate-900 truncate">
                          {entry.username} {entry.isCurrentUser && '(You)'}
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.2 rounded-full bg-slate-100 text-slate-600 shrink-0">
                          Lv. {entry.level}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5 truncate">
                        <span>{entry.impactSnippet}</span>
                        <span aria-hidden="true">·</span>
                        <span className="inline-flex items-center gap-0.5 text-amber-600 font-semibold shrink-0">
                          <Flame className="w-3 h-3 fill-amber-500" />
                          <span>{entry.streakDays}d streak</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Points & Cheer Button */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <div className="font-heading font-extrabold text-base text-slate-900 tabular-nums">
                        {pts} <span className="text-xs font-semibold text-slate-400">pts</span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {entry.topBadge}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCheer(entry.id)}
                      className="p-2 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-500 hover:text-emerald-700 border border-slate-200/80 transition-colors flex items-center gap-1 text-xs font-bold cursor-pointer"
                      title="Send sprout cheer!"
                      aria-label="Send cheer"
                    >
                      <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="tabular-nums">{cheers}</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>

    </div>
  );
};
