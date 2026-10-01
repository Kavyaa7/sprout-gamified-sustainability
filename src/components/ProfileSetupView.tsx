import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SUSTAINABILITY_GOAL_OPTIONS, AVATAR_OPTIONS } from '../data/mockData';
import { triggerSproutConfetti } from '../utils/confetti';
import { playChimeSound, playBubblePopSound } from '../utils/sound';
import { 
  Sprout, 
  Check, 
  User, 
  Upload, 
  Sparkles, 
  ArrowRight,
  ShoppingBag,
  Droplets,
  Zap,
  Recycle,
  Bike,
  Apple
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  ShoppingBag,
  Droplets,
  Zap,
  Recycle,
  Bike,
  Apple,
};

export const ProfileSetupView: React.FC = () => {
  const { user, updateUser, setScreen, soundEnabled } = useApp();

  const [username, setUsername] = useState(user.username || 'KavyaGreen');
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar || AVATAR_OPTIONS[0].src);
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [selectedGoals, setSelectedGoals] = useState<string[]>(
    user.goals.length > 0 ? user.goals : ['Reducing Single-Use Plastic', 'Conserving Water Everyday', 'Cutting Energy Consumption']
  );
  const [bio, setBio] = useState(user.bio || 'Planting small green actions every single day!');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleGoal = (title: string) => {
    playBubblePopSound(soundEnabled);
    setSelectedGoals((prev) => {
      if (prev.includes(title)) {
        if (prev.length === 1) return prev; // keep at least 1 goal
        return prev.filter((g) => g !== title);
      } else {
        return [...prev, title];
      }
    });
  };

  const handleCustomAvatarApply = () => {
    if (customAvatarUrl.trim()) {
      setSelectedAvatar(customAvatarUrl.trim());
      setShowCustomInput(false);
    }
  };

  const handleStartJourney = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    updateUser({
      username: username.trim() || 'SproutHero',
      avatar: selectedAvatar,
      goals: selectedGoals,
      bio: bio.trim(),
    });

    playChimeSound(soundEnabled);
    triggerSproutConfetti();

    setTimeout(() => {
      setIsSubmitting(false);
      setScreen('dashboard');
    }, 450);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-emerald-50/40 via-white to-emerald-50/30">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Step 2 of 2 · Personalization</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Let's customize your green journey
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl mx-auto">
            Choose your hero avatar, creator handle, and the key sustainability habits you want to conquer.
          </p>
        </div>

        <form onSubmit={handleStartJourney} className="space-y-8">
          
          {/* Section 1: Choose Avatar */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-100/90 shadow-sm">
            <h3 className="font-heading font-bold text-lg text-slate-900 mb-1 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs flex items-center justify-center font-bold">1</span>
              <span>Select Your Profile Avatar</span>
            </h3>
            <p className="text-xs text-slate-500 mb-5 ml-8">
              Pick a playful sprout mascot or upload your own avatar picture.
            </p>

            <div className="ml-0 sm:ml-8">
              {/* Selected Avatar Highlight Box */}
              {(() => {
                const current = AVATAR_OPTIONS.find((a) => a.src === selectedAvatar) || {
                  name: 'Custom Avatar',
                  role: 'Personal Upload',
                  src: selectedAvatar,
                };
                return (
                  <div className="flex items-center gap-4 p-3.5 mb-5 rounded-2xl bg-emerald-50/80 border border-emerald-200/80">
                    <img
                      src={current.src}
                      alt={current.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500 shadow-sm bg-white"
                    />
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                        Selected Hero Character
                      </div>
                      <div className="font-heading font-bold text-base text-slate-900">
                        {current.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {current.role}
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Preset Avatar Selection Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
                {AVATAR_OPTIONS.map((item) => {
                  const isSelected = selectedAvatar === item.src;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        playBubblePopSound(soundEnabled);
                        setSelectedAvatar(item.src);
                        setShowCustomInput(false);
                      }}
                      className={`relative flex flex-col items-center p-2.5 rounded-2xl border-2 transition-all cursor-pointer text-center group ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/80 shadow-md scale-[1.03] ring-2 ring-emerald-500/20'
                          : 'border-slate-200/80 hover:border-emerald-300 hover:bg-slate-50 bg-white'
                      }`}
                    >
                      <img
                        src={item.src}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover bg-white shadow-2xs group-hover:scale-105 transition-transform"
                      />
                      <span className="font-heading font-bold text-xs text-slate-800 mt-2 truncate max-w-[90px]">
                        {item.name}
                      </span>
                      <span className="text-[10px] text-slate-500 truncate max-w-[90px]">
                        {item.role}
                      </span>
                      {isSelected && (
                        <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-xs">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Custom Image URL Toggle */}
              <div className="pt-2">
                {!showCustomInput ? (
                  <button
                    type="button"
                    onClick={() => setShowCustomInput(true)}
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Or enter a custom image URL</span>
                  </button>
                ) : (
                  <div className="flex gap-2 items-center max-w-md">
                    <input
                      type="url"
                      placeholder="https://example.com/avatar.jpg"
                      value={customAvatarUrl}
                      onChange={(e) => setCustomAvatarUrl(e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={handleCustomAvatarApply}
                      className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700 cursor-pointer"
                    >
                      Apply
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCustomInput(false)}
                      className="text-xs text-slate-500 hover:text-slate-700"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Set Username & Bio */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-100/90 shadow-sm">
            <h3 className="font-heading font-bold text-lg text-slate-900 mb-1 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs flex items-center justify-center font-bold">2</span>
              <span>Choose Your Eco Handle</span>
            </h3>
            <p className="text-xs text-slate-500 mb-5 ml-8">
              This will be displayed on the youth sustainability leaderboard and badges.
            </p>

            <div className="ml-0 sm:ml-8 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Username
                </label>
                <div className="relative max-w-md">
                  <div className="absolute left-3.5 top-3 text-xs font-bold text-emerald-600">@</div>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="KavyaGreen"
                    className="w-full pl-8 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all font-semibold text-slate-800"
                  />
                  <div className="absolute right-3 top-3 text-emerald-600" title="Username available">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Eco Motto / Short Bio (Optional)
                </label>
                <input
                  type="text"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="e.g. Zero-waste enthusiast & weekend cyclist!"
                  className="w-full max-w-md px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Sustainability Goals (5-6 Options) */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-100/90 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
              <div>
                <h3 className="font-heading font-bold text-lg text-slate-900 mb-1 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs flex items-center justify-center font-bold">3</span>
                  <span>Select Your Sustainability Goals</span>
                </h3>
                <p className="text-xs text-slate-500 ml-8">
                  Pick the areas where you want to earn points and build habits.
                </p>
              </div>
              <div className="text-xs font-bold text-emerald-700 ml-8 sm:ml-0 mt-2 sm:mt-0">
                {selectedGoals.length} Selected
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 ml-0 sm:ml-8">
              {SUSTAINABILITY_GOAL_OPTIONS.map((goal) => {
                const isSelected = selectedGoals.includes(goal.title);
                const Icon = ICON_MAP[goal.iconName] || Sprout;

                return (
                  <button
                    key={goal.id}
                    type="button"
                    onClick={() => toggleGoal(goal.title)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-start gap-3.5 ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/50 shadow-xs ring-1 ring-emerald-500/20'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 bg-white'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="font-heading font-bold text-sm text-slate-900 truncate">
                          {goal.title}
                        </span>
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-emerald-600 text-white'
                              : 'border border-slate-300 bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                        {goal.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Save Button */}
          <div className="text-center pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-base shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all inline-flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Sprout className="w-5 h-5" />
                  <span>Start my green journey</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
            <p className="text-xs text-slate-400 mt-2">
              You can always adjust these goals anytime from your profile settings.
            </p>
          </div>

        </form>

      </div>
    </div>
  );
};
