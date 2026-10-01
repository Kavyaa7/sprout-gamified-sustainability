import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AppScreen,
  UserProfile,
  UserStats,
  Badge,
  ActionCategory,
  ActionLogItem,
  DailyChallenge,
  RedeemedPrize,
} from '../types';
import {
  INITIAL_BADGES,
  INITIAL_DAILY_CHALLENGE,
  INITIAL_REDEMPTION_HISTORY,
  INITIAL_USER_STATS,
  INITIAL_ACTION_LOGS,
  REWARDS_CATALOG,
} from '../data/mockData';
import { triggerSproutConfetti, triggerLevelUpConfetti } from '../utils/confetti';
import { playChimeSound, playLevelUpSound } from '../utils/sound';

interface CelebrationPayload {
  title: string;
  subtitle: string;
  points: number;
  badgeName?: string;
  badgeImage?: string;
}

interface AppContextType {
  screen: AppScreen;
  setScreen: (screen: AppScreen) => void;
  user: UserProfile;
  updateUser: (updates: Partial<UserProfile>) => void;
  stats: UserStats;
  badges: Badge[];
  actionLogs: ActionLogItem[];
  dailyChallenge: DailyChallenge;
  redeemedHistory: RedeemedPrize[];
  soundEnabled: boolean;
  toggleSound: () => void;
  logAction: (payload: {
    actionName: string;
    category: ActionCategory;
    points: number;
    impactMetric: string;
    impactValue?: number;
    impactUnit?: 'litres' | 'items' | 'kg_co2' | 'kwh' | 'trees';
    dayOfWeek?: string;
    note?: string;
  }) => void;
  completeDailyChallenge: () => void;
  redeemReward: (rewardId: string) => { success: boolean; message: string; claimCode?: string };
  quickIncrementMetric: (type: 'water' | 'plastic' | 'energy', amount: number) => void;
  celebration: CelebrationPayload | null;
  closeCelebration: () => void;
  resetAllData: () => void;
}

const DEFAULT_USER: UserProfile = {
  id: 'usr_sprout_kavya',
  username: 'KavyaGreen',
  email: 'kavya.s1790@gmail.com',
  avatar: '/src/assets/images/avatar_cartoon_sprout_1790838973264.jpg',
  avatarType: 'preset',
  goals: ['Reducing Single-Use Plastic', 'Conserving Water Everyday', 'Cutting Energy Consumption'],
  joinedDate: 'September 2026',
  bio: 'Eco-enthusiast planting small daily habits for a greener tomorrow!',
};

const LEVEL_THRESHOLDS = [
  { level: 1, title: 'Seedling Starter', minPoints: 0, nextPoints: 200 },
  { level: 2, title: 'Green Sprout', minPoints: 200, nextPoints: 500 },
  { level: 3, title: 'Eco-Champion Sprout', minPoints: 500, nextPoints: 1000 },
  { level: 4, title: 'Canopy Guardian', minPoints: 1000, nextPoints: 1800 },
  { level: 5, title: 'Sprout Earth Legend', minPoints: 1800, nextPoints: 3000 },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation screen
  const [screen, setScreenState] = useState<AppScreen>(() => {
    const saved = localStorage.getItem('sprout_screen');
    return (saved as AppScreen) || 'welcome';
  });

  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('sprout_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Automatically migrate old human or external dicebear avatars to the cartoon mascot
        if (
          !parsed.avatar ||
          parsed.avatar.includes('dicebear') ||
          parsed.avatar.includes('avatar_eco_adventurer') ||
          parsed.avatar.includes('avatar_solar_scout_boy') ||
          parsed.avatar.includes('avatar_ocean_guardian') ||
          parsed.avatar.includes('avatar_pedal_pioneer')
        ) {
          parsed.avatar = '/src/assets/images/avatar_cartoon_sprout_1790838973264.jpg';
        }
        return parsed;
      } catch {
        // fallback
      }
    }
    return DEFAULT_USER;
  });

  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('sprout_stats');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_USER_STATS;
  });

  const [badges, setBadges] = useState<Badge[]>(() => {
    const saved = localStorage.getItem('sprout_badges');
    if (saved) {
      try {
        const parsed: Badge[] = JSON.parse(saved);
        // Ensure all badges have their uniform 3D achievement medal imageSrc
        return parsed.map((b) => {
          const fresh = INITIAL_BADGES.find((init) => init.id === b.id);
          return {
            ...b,
            imageSrc: fresh?.imageSrc || b.imageSrc,
          };
        });
      } catch {
        // fallback
      }
    }
    return INITIAL_BADGES;
  });

  const [actionLogs, setActionLogs] = useState<ActionLogItem[]>(() => {
    const saved = localStorage.getItem('sprout_logs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_ACTION_LOGS;
  });

  const [dailyChallenge, setDailyChallenge] = useState<DailyChallenge>(() => {
    const saved = localStorage.getItem('sprout_challenge');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_DAILY_CHALLENGE;
  });

  const [redeemedHistory, setRedeemedHistory] = useState<RedeemedPrize[]>(() => {
    const saved = localStorage.getItem('sprout_redeemed');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_REDEMPTION_HISTORY;
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('sprout_sound');
    return saved !== null ? saved === 'true' : true;
  });

  const [celebration, setCelebration] = useState<CelebrationPayload | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('sprout_screen', screen);
  }, [screen]);

  useEffect(() => {
    localStorage.setItem('sprout_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('sprout_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('sprout_badges', JSON.stringify(badges));
  }, [badges]);

  useEffect(() => {
    localStorage.setItem('sprout_logs', JSON.stringify(actionLogs));
  }, [actionLogs]);

  useEffect(() => {
    localStorage.setItem('sprout_challenge', JSON.stringify(dailyChallenge));
  }, [dailyChallenge]);

  useEffect(() => {
    localStorage.setItem('sprout_redeemed', JSON.stringify(redeemedHistory));
  }, [redeemedHistory]);

  useEffect(() => {
    localStorage.setItem('sprout_sound', String(soundEnabled));
  }, [soundEnabled]);

  const setScreen = (newScreen: AppScreen) => {
    setScreenState(newScreen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  const closeCelebration = () => {
    setCelebration(null);
  };

  // Check level based on points
  const computeLevelInfo = (totalPoints: number) => {
    let currentTier = LEVEL_THRESHOLDS[0];
    for (const tier of LEVEL_THRESHOLDS) {
      if (totalPoints >= tier.minPoints) {
        currentTier = tier;
      }
    }
    return currentTier;
  };

  // Log action
  const logAction = (payload: {
    actionName: string;
    category: ActionCategory;
    points: number;
    impactMetric: string;
    impactValue?: number;
    impactUnit?: 'litres' | 'items' | 'kg_co2' | 'kwh' | 'trees';
    dayOfWeek?: string;
    note?: string;
  }) => {
    const newPoints = stats.points + payload.points;
    const oldLevel = stats.level;
    const levelInfo = computeLevelInfo(newPoints);
    const didLevelUp = levelInfo.level > oldLevel;

    // Update specific impact metrics
    let addedWater = 0;
    let addedPlastic = 0;
    let addedCo2 = 0;
    let addedEnergy = 0;

    if (payload.impactUnit === 'litres' && payload.impactValue) {
      addedWater = payload.impactValue;
    } else if (payload.impactUnit === 'items' && payload.impactValue) {
      addedPlastic = payload.impactValue;
    } else if (payload.impactUnit === 'kg_co2' && payload.impactValue) {
      addedCo2 = payload.impactValue;
    } else if (payload.impactUnit === 'kwh' && payload.impactValue) {
      addedEnergy = payload.impactValue;
    } else {
      // sensible defaults based on category
      if (payload.category === 'water') addedWater = 15;
      if (payload.category === 'plastic') addedPlastic = 2;
      if (payload.category === 'transport') addedCo2 = 1.5;
      if (payload.category === 'energy') addedEnergy = 1.0;
    }

    const updatedStats: UserStats = {
      ...stats,
      points: newPoints,
      level: levelInfo.level,
      levelTitle: levelInfo.title,
      pointsForCurrentLevel: levelInfo.minPoints,
      pointsForNextLevel: levelInfo.nextPoints,
      litresWaterSaved: Number((stats.litresWaterSaved + addedWater).toFixed(1)),
      plasticItemsReduced: stats.plasticItemsReduced + addedPlastic,
      co2PreventedKg: Number((stats.co2PreventedKg + addedCo2).toFixed(1)),
      energySavedKwh: Number((stats.energySavedKwh + addedEnergy).toFixed(1)),
      totalActionsLogged: stats.totalActionsLogged + 1,
    };

    setStats(updatedStats);

    // Create log item
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentDay = days[new Date().getDay()];
    const newLog: ActionLogItem = {
      id: `log_${Date.now()}`,
      actionName: payload.actionName,
      category: payload.category,
      points: payload.points,
      timestamp: 'Just now',
      dayOfWeek: payload.dayOfWeek || currentDay,
      impactMetric: payload.impactMetric,
      note: payload.note,
    };

    setActionLogs((prev) => [newLog, ...prev]);

    // Check for badge unlocks
    let newlyUnlockedBadge: Badge | undefined;
    setBadges((prevBadges) => {
      return prevBadges.map((badge) => {
        if (!badge.isUnlocked && newPoints >= badge.pointsRequired) {
          newlyUnlockedBadge = { ...badge, isUnlocked: true, unlockedAt: 'Just now' };
          return newlyUnlockedBadge;
        }
        return badge;
      });
    });

    if (didLevelUp) {
      playLevelUpSound(soundEnabled);
      triggerLevelUpConfetti();
      setCelebration({
        title: `Level Up! Level ${levelInfo.level}: ${levelInfo.title}`,
        subtitle: `Fantastic green dedication! You reached ${newPoints} points!`,
        points: payload.points,
      });
    } else if (newlyUnlockedBadge) {
      playLevelUpSound(soundEnabled);
      triggerSproutConfetti();
      setCelebration({
        title: `Badge Unlocked: ${newlyUnlockedBadge.name}!`,
        subtitle: newlyUnlockedBadge.description,
        points: payload.points,
        badgeName: newlyUnlockedBadge.name,
        badgeImage: newlyUnlockedBadge.imageSrc,
      });
    } else {
      playChimeSound(soundEnabled);
      triggerSproutConfetti();
      setCelebration({
        title: `+${payload.points} Sprout Points Logged!`,
        subtitle: `${payload.actionName} · ${payload.impactMetric}`,
        points: payload.points,
      });
    }
  };

  // Complete daily challenge
  const completeDailyChallenge = () => {
    if (dailyChallenge.isCompleted) return;
    setDailyChallenge((prev) => ({
      ...prev,
      isCompleted: true,
      currentCount: prev.targetCount,
    }));

    logAction({
      actionName: dailyChallenge.title,
      category: dailyChallenge.category,
      points: dailyChallenge.points,
      impactMetric: dailyChallenge.impactLabel,
      note: "Daily Sprout Challenge Completed! 🌟",
    });
  };

  // Quick increment metrics from Dashboard
  const quickIncrementMetric = (type: 'water' | 'plastic' | 'energy', amount: number) => {
    let metricLabel = '';
    let category: ActionCategory = 'water';
    let pts = 15;

    if (type === 'water') {
      metricLabel = `+${amount} Litres saved`;
      category = 'water';
      pts = 20;
    } else if (type === 'plastic') {
      metricLabel = `+${amount} Single-use plastic item avoided`;
      category = 'plastic';
      pts = 15;
    } else {
      metricLabel = `+${amount} kWh energy conserved`;
      category = 'energy';
      pts = 20;
    }

    logAction({
      actionName: `Quick Log: ${type.toUpperCase()} saver`,
      category,
      points: pts,
      impactMetric: metricLabel,
      impactValue: amount,
      impactUnit: type === 'water' ? 'litres' : type === 'plastic' ? 'items' : 'kwh',
    });
  };

  // Redeem reward
  const redeemReward = (rewardId: string) => {
    const item = REWARDS_CATALOG.find((r) => r.id === rewardId);
    if (!item) {
      return { success: false, message: 'Reward not found.' };
    }

    if (stats.points < item.pointsCost) {
      return {
        success: false,
        message: `You need ${item.pointsCost - stats.points} more points to redeem this prize. Keep logging actions!`,
      };
    }

    // Deduct points
    const remainingPoints = stats.points - item.pointsCost;
    const levelInfo = computeLevelInfo(remainingPoints);
    setStats((prev) => ({
      ...prev,
      points: remainingPoints,
      level: levelInfo.level,
      levelTitle: levelInfo.title,
    }));

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const code = `${item.codePrefix}-${randomSuffix}`;

    const newRedeemed: RedeemedPrize = {
      id: `redeem_${Date.now()}`,
      rewardId: item.id,
      title: item.title,
      pointsSpent: item.pointsCost,
      redeemedDate: 'Today',
      claimCode: code,
      status: 'Active Voucher',
    };

    setRedeemedHistory((prev) => [newRedeemed, ...prev]);
    playChimeSound(soundEnabled);
    triggerSproutConfetti();

    return {
      success: true,
      message: `Successfully redeemed "${item.title}"! Voucher code: ${code}`,
      claimCode: code,
    };
  };

  const resetAllData = () => {
    localStorage.removeItem('sprout_screen');
    localStorage.removeItem('sprout_user');
    localStorage.removeItem('sprout_stats');
    localStorage.removeItem('sprout_badges');
    localStorage.removeItem('sprout_logs');
    localStorage.removeItem('sprout_challenge');
    localStorage.removeItem('sprout_redeemed');
    setUser(DEFAULT_USER);
    setStats(INITIAL_USER_STATS);
    setBadges(INITIAL_BADGES);
    setActionLogs(INITIAL_ACTION_LOGS);
    setDailyChallenge(INITIAL_DAILY_CHALLENGE);
    setRedeemedHistory(INITIAL_REDEMPTION_HISTORY);
    setScreen('welcome');
  };

  return (
    <AppContext.Provider
      value={{
        screen,
        setScreen,
        user,
        updateUser,
        stats,
        badges,
        actionLogs,
        dailyChallenge,
        redeemedHistory,
        soundEnabled,
        toggleSound,
        logAction,
        completeDailyChallenge,
        redeemReward,
        quickIncrementMetric,
        celebration,
        closeCelebration,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
