import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { REWARDS_CATALOG } from '../data/mockData';
import { 
  Award, 
  Sparkles, 
  Trophy, 
  Lock, 
  CheckCircle2, 
  Gift, 
  History, 
  Copy, 
  Check, 
  Flame, 
  Droplet, 
  ShoppingBag, 
  Wind, 
  Zap, 
  Trees, 
  Store, 
  Ticket, 
  UtensilsCrossed 
} from 'lucide-react';

const REWARD_ICON_MAP: Record<string, React.ElementType> = {
  Trees,
  UtensilsCrossed,
  Store,
  Ticket,
  Sparkles,
};

export const RewardsView: React.FC = () => {
  const { 
    user, 
    stats, 
    badges, 
    redeemedHistory, 
    redeemReward, 
    setScreen 
  } = useApp();

  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; error?: boolean } | null>(null);

  // Level progress
  const levelMin = stats.pointsForCurrentLevel;
  const levelMax = stats.pointsForNextLevel;
  const pointsInCurrentLevel = Math.max(0, stats.points - levelMin);
  const levelRange = Math.max(1, levelMax - levelMin);
  const progressPercent = Math.min(100, Math.round((pointsInCurrentLevel / levelRange) * 100));
  const pointsRequired = Math.max(0, levelMax - stats.points);

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleRedeem = (rewardId: string) => {
    const res = redeemReward(rewardId);
    if (res.success) {
      setFeedbackMsg({ text: res.message });
    } else {
      setFeedbackMsg({ text: res.message, error: true });
    }
    setTimeout(() => setFeedbackMsg(null), 5000);
  };

  return (
    <div className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* 1. Header Banner: Username, Profile Picture, Current Level & Progress Bar */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-emerald-800/15 relative overflow-hidden">
        
        {/* Soft background aura */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          {/* User Profile Info */}
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.username}
                referrerPolicy="no-referrer"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover bg-white/20 border-3 border-emerald-300 shadow-md"
              />
              <div className="absolute -bottom-2 -right-2 bg-amber-400 text-emerald-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                Lv. {stats.level}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs uppercase tracking-wider font-bold text-emerald-200">
                  Green Journey Champion
                </span>
                <span className="text-emerald-300">·</span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-300">
                  <Flame className="w-3.5 h-3.5 fill-amber-300" />
                  <span>{stats.streakDays}-Day Streak</span>
                </span>
              </div>

              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
                {user.username}
              </h1>

              <p className="text-xs sm:text-sm text-emerald-100 mt-1">
                Current Level: <strong className="text-white">{stats.levelTitle}</strong>
              </p>
            </div>
          </div>

          {/* Current Points Counter Box */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 flex flex-col items-center md:items-end justify-center">
            <span className="text-xs uppercase font-semibold text-emerald-200 tracking-wider">
              Available Sprout Points
            </span>
            <div className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight tabular-nums flex items-baseline gap-1 mt-0.5">
              <span>{stats.points}</span>
              <span className="text-base text-emerald-200 font-semibold">pts</span>
            </div>
            <button
              onClick={() => setScreen('action-logging')}
              className="mt-2 text-xs font-bold text-emerald-100 hover:text-white underline cursor-pointer"
            >
              + Earn more points today
            </button>
          </div>

        </div>

        {/* Level Progression Progress Bar inside Header */}
        <div className="relative z-10 mt-6 pt-5 border-t border-white/20 space-y-2">
          <div className="flex items-center justify-between text-xs text-emerald-100">
            <span className="font-semibold">
              Level {stats.level} ({stats.levelTitle})
            </span>
            <span className="font-bold text-amber-300 bg-emerald-900/60 px-3 py-1 rounded-full border border-emerald-500/30">
              {pointsRequired} points required to reach Level {stats.level + 1}
            </span>
          </div>

          <div className="w-full h-3 bg-black/20 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-amber-300 to-emerald-300 rounded-full transition-all duration-700 shadow-xs"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex justify-between text-[11px] text-emerald-200">
            <span>{stats.pointsForCurrentLevel} pts</span>
            <span>{progressPercent}% completed</span>
            <span>{stats.pointsForNextLevel} pts (Next Tier)</span>
          </div>
        </div>

      </div>

      {/* 2. Overall Green Journey Cards */}
      <div>
        <div className="mb-4">
          <h2 className="font-heading font-bold text-xl text-slate-900">
            Overall Green Journey Stats
          </h2>
          <p className="text-xs text-slate-500">
            Cumulative positive environmental footprint tracked across your Sprout journey.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          
          <div className="bg-white rounded-3xl p-5 border border-emerald-100/90 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-3">
              <Droplet className="w-5 h-5 fill-cyan-500/20" />
            </div>
            <div className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 tabular-nums">
              {stats.litresWaterSaved} <span className="text-xs font-semibold text-slate-400">L</span>
            </div>
            <div className="text-xs font-bold text-slate-700 mt-1">Water Conserved</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Total lifetime freshwater saved</p>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-emerald-100/90 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 tabular-nums">
              {stats.plasticItemsReduced} <span className="text-xs font-semibold text-slate-400">items</span>
            </div>
            <div className="text-xs font-bold text-slate-700 mt-1">Plastic Items Diverted</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Eliminated single-use waste</p>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-emerald-100/90 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-3">
              <Wind className="w-5 h-5" />
            </div>
            <div className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 tabular-nums">
              {stats.co2PreventedKg} <span className="text-xs font-semibold text-slate-400">kg</span>
            </div>
            <div className="text-xs font-bold text-slate-700 mt-1">CO2 Emissions Prevented</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Through transit and green diet</p>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-emerald-100/90 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
              <Zap className="w-5 h-5 fill-amber-500/20" />
            </div>
            <div className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 tabular-nums">
              {stats.totalActionsLogged} <span className="text-xs font-semibold text-slate-400">deeds</span>
            </div>
            <div className="text-xs font-bold text-slate-700 mt-1">Total Actions Logged</div>
            <p className="text-[11px] text-slate-400 mt-0.5">{stats.streakDays} consecutive active days</p>
          </div>

        </div>
      </div>

      {/* 3. Earned Badges Showcase (Featuring Plastic Warrior and Solar Scout) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-100/90 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-heading font-bold text-xl text-slate-900 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>Achievement Badges</span>
            </h2>
            <p className="text-xs text-slate-500">
              Collect all badges by completing green milestones and saving the environment.
            </p>
          </div>
          <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            {badges.filter((b) => b.isUnlocked).length} of {badges.length} Badges Unlocked
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {badges.map((badge) => {
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-3xl border-2 transition-all relative flex flex-col justify-between ${
                  badge.isUnlocked
                    ? 'border-emerald-300 bg-emerald-50/40 shadow-xs'
                    : 'border-slate-200 bg-slate-50/60 opacity-75'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    
                    {/* Uniform 3D Enameled Badge Medal */}
                    <div className="relative group/badge">
                      <div className={`relative w-20 h-20 rounded-2xl overflow-hidden p-0.5 border-2 transition-transform duration-300 group-hover/badge:scale-105 ${
                        badge.isUnlocked
                          ? 'border-amber-400 bg-gradient-to-tr from-amber-200 to-emerald-200 shadow-md shadow-amber-300/20'
                          : 'border-slate-300 bg-slate-100 opacity-60 grayscale'
                      }`}>
                        <img
                          src={badge.imageSrc}
                          alt={badge.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover rounded-xl"
                        />
                        {!badge.isUnlocked && (
                          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px] flex items-center justify-center">
                            <div className="w-7 h-7 rounded-full bg-slate-900/80 text-amber-300 flex items-center justify-center shadow-xs">
                              <Lock className="w-3.5 h-3.5" />
                            </div>
                          </div>
                        )}
                      </div>
                      {badge.isUnlocked && (
                        <div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-gradient-to-tr from-emerald-500 to-teal-400 text-white rounded-full flex items-center justify-center shadow-md border-2 border-white animate-pulse">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>

                    {/* Rarity & Status */}
                    <div className="text-right">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        badge.rarity === 'Legendary'
                          ? 'bg-purple-100 text-purple-800'
                          : badge.rarity === 'Epic'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {badge.rarity}
                      </span>
                      <div className="text-[11px] text-slate-400 mt-1">
                        {badge.isUnlocked ? `Unlocked ${badge.unlockedAt}` : `Requires ${badge.pointsRequired} pts`}
                      </div>
                    </div>
                  </div>

                  <h3 className="font-heading font-bold text-base text-slate-900 mb-1">
                    {badge.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {badge.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-medium">{badge.category}</span>
                  {badge.isUnlocked ? (
                    <span className="font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Earned</span>
                    </span>
                  ) : (
                    <span className="font-semibold text-slate-500 flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      <span>{Math.max(0, badge.pointsRequired - stats.points)} pts needed</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Feedback banner for redemption actions */}
      {feedbackMsg && (
        <div
          className={`p-4 rounded-2xl border text-sm font-semibold flex items-center justify-between animate-in fade-in ${
            feedbackMsg.error
              ? 'bg-rose-50 border-rose-200 text-rose-800'
              : 'bg-emerald-50 border-emerald-200 text-emerald-800'
          }`}
        >
          <span>{feedbackMsg.text}</span>
          <button
            onClick={() => setFeedbackMsg(null)}
            className="text-xs underline ml-4 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 4. Rewards Unlocked / Rewards Store */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-100/90 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-heading font-bold text-xl text-slate-900 flex items-center gap-2">
              <Gift className="w-5 h-5 text-emerald-600" />
              <span>Redeem Rewards & Eco-Prizes</span>
            </h2>
            <p className="text-xs text-slate-500">
              Exchange your points for direct tree planting, zero-waste products, and sustainable transit discounts.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-600">
            Balance: <span className="text-emerald-700 font-extrabold">{stats.points} pts</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {REWARDS_CATALOG.map((reward) => {
            const Icon = REWARD_ICON_MAP[reward.iconName] || Gift;
            const canAfford = stats.points >= reward.pointsCost;

            return (
              <div
                key={reward.id}
                className="p-5 rounded-3xl border border-emerald-100/90 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between bg-white group"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    <div className="font-heading font-extrabold text-sm text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-300/60 tabular-nums">
                      {reward.pointsCost} pts
                    </div>
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {reward.category}
                  </span>

                  <h3 className="font-heading font-bold text-base text-slate-900 mt-0.5 group-hover:text-emerald-800 transition-colors">
                    {reward.title}
                  </h3>

                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {reward.description}
                  </p>

                  <div className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-100">
                    Partner: <span className="font-semibold text-slate-600">{reward.sponsorOrPartner}</span>
                  </div>
                </div>

                <div className="pt-4 mt-3">
                  <button
                    type="button"
                    onClick={() => handleRedeem(reward.id)}
                    disabled={!canAfford}
                    className={`w-full py-2.5 px-4 rounded-xl font-heading font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      canAfford
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 active:scale-95'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {canAfford ? (
                      <>
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span>Redeem Prize</span>
                      </>
                    ) : (
                      <span>Need {reward.pointsCost - stats.points} more pts</span>
                    )}
                  </button>
                  <p className="text-[10px] text-slate-400 text-center mt-1.5">
                    {reward.expiryNotice}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Redemption History Section for Previous Prizes */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-100/90 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-bold text-xl text-slate-900 flex items-center gap-2">
            <History className="w-5 h-5 text-emerald-600" />
            <span>Redemption History</span>
          </h2>
          <span className="text-xs text-slate-500">
            {redeemedHistory.length} rewards claimed
          </span>
        </div>

        {redeemedHistory.length === 0 ? (
          <p className="text-sm text-slate-400 py-6 text-center">
            No rewards redeemed yet. Earn points by logging actions and redeem your first reward!
          </p>
        ) : (
          <div className="divide-y divide-slate-100">
            {redeemedHistory.map((item) => (
              <div
                key={item.id}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-heading font-semibold text-sm sm:text-base text-slate-900">
                      {item.title}
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {item.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                    <span>Redeemed on {item.redeemedDate}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-emerald-700">-{item.pointsSpent} pts</span>
                  </div>
                </div>

                {/* Claim Code with Quick Copy Button */}
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-xl self-start sm:self-auto">
                  <span className="text-xs text-slate-400">Code:</span>
                  <code className="text-xs font-mono font-bold text-slate-800 tracking-wider">
                    {item.claimCode}
                  </code>
                  <button
                    type="button"
                    onClick={() => handleCopyCode(item.claimCode)}
                    className="p-1 hover:bg-slate-200/70 rounded-md text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
                    title="Copy claim voucher code"
                  >
                    {copiedCode === item.claimCode ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
