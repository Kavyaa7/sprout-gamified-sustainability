export type AppScreen = 'welcome' | 'auth' | 'profile-setup' | 'dashboard' | 'action-logging' | 'rewards' | 'leaderboard';

export interface LeaderboardUser {
  id: string;
  rank: number;
  username: string;
  avatar: string;
  level: number;
  levelTitle: string;
  weeklyPoints: number;
  monthlyPoints: number;
  allTimePoints: number;
  streakDays: number;
  topBadge: string;
  badgeImage?: string;
  impactSnippet: string;
  cheersReceived: number;
  isCurrentUser?: boolean;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar: string;
  avatarType: 'preset' | 'custom';
  goals: string[];
  joinedDate: string;
  bio?: string;
}

export type ActionCategory = 
  | 'water'
  | 'plastic'
  | 'energy'
  | 'waste'
  | 'transport'
  | 'food';

export interface EcoAction {
  id: string;
  name: string;
  category: ActionCategory;
  points: number;
  description: string;
  impactMetric: string;
  impactValue: number;
  impactUnit: 'litres' | 'items' | 'kg_co2' | 'kwh' | 'trees';
  difficulty: 'Quick' | 'Medium' | 'Heroic';
  iconName: string;
}

export interface ActionLogItem {
  id: string;
  actionId?: string;
  actionName: string;
  category: ActionCategory;
  points: number;
  timestamp: string;
  dayOfWeek: string;
  impactMetric: string;
  note?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  category: string;
  pointsRequired: number;
  isUnlocked: boolean;
  unlockedAt?: string;
  imageSrc?: string;
  iconName: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
}

export interface RewardItem {
  id: string;
  title: string;
  category: string;
  pointsCost: number;
  description: string;
  sponsorOrPartner: string;
  iconName: string;
  codePrefix: string;
  expiryNotice: string;
}

export interface RedeemedPrize {
  id: string;
  rewardId: string;
  title: string;
  pointsSpent: number;
  redeemedDate: string;
  claimCode: string;
  status: 'Claimed' | 'Active Voucher' | 'Delivered';
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  category: ActionCategory;
  points: number;
  impactLabel: string;
  isCompleted: boolean;
  targetCount: number;
  currentCount: number;
}

export interface EcoFact {
  id: string;
  fact: string;
  source: string;
  tag: string;
  type: 'fact' | 'quote';
  author?: string;
}

export interface UserStats {
  points: number;
  level: number;
  levelTitle: string;
  pointsForCurrentLevel: number;
  pointsForNextLevel: number;
  streakDays: number;
  litresWaterSaved: number;
  plasticItemsReduced: number;
  co2PreventedKg: number;
  energySavedKwh: number;
  totalActionsLogged: number;
}
