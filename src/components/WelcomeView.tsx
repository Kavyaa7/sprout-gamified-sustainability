import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sprout, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  Leaf, 
  Flame, 
  Droplet,
  Users,
  Compass,
  Trophy,
  Gift,
  CheckCircle2,
  Zap,
  Globe2,
  Heart
} from 'lucide-react';

export const WelcomeView: React.FC = () => {
  const { setScreen, user, stats } = useApp();

  const isExistingUser = stats.totalActionsLogged > 0 || stats.points > 0;

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden bg-gradient-to-b from-emerald-50/50 via-white to-emerald-50/30">
      
      {/* Background Decorative Soft Blobs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-emerald-200/35 via-teal-200/25 to-lime-200/35 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 -left-20 w-80 h-80 bg-teal-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full space-y-16">
        
        {/* SECTION 1: HERO INTRODUCTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Animated Logo, Title & Value Prop */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Animated Sprout Logo Badge Lockup */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300/60 shadow-xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              <span className="text-xs font-semibold text-emerald-900 tracking-wide uppercase">
                Welcome to Sprout · App Introduction
              </span>
            </div>

            {/* Title */}
            <div className="space-y-3">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="animate-sprout-bounce p-3 bg-gradient-to-tr from-emerald-500 to-emerald-400 rounded-3xl shadow-lg shadow-emerald-500/25 text-white inline-flex">
                  <Sprout className="w-10 h-10 sm:w-12 sm:h-12" />
                </div>
                <h1 className="font-heading font-extrabold text-5xl sm:text-6xl lg:text-7xl tracking-tight text-slate-900">
                  Sprout<span className="text-emerald-600">.</span>
                </h1>
              </div>

              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-slate-800 leading-snug">
                Where small daily habits grow into <span className="text-emerald-700 underline decoration-emerald-300 decoration-wavy decoration-2">real environmental power</span>.
              </h2>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Sprout is an interactive, gamified sustainability tracker crafted for students, youth eco-clubs, and future earth guardians. Turn everyday decisions—from taking a shorter shower to packing a zero-waste lunch—into tangible points, collectible badges, and real-world planetary impact.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg mx-auto lg:mx-0">
              <div className="p-3.5 rounded-2xl bg-white/90 border border-emerald-100/90 shadow-xs text-left">
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-lg mb-0.5">
                  <Flame className="w-4 h-4 text-amber-500 fill-amber-400" />
                  <span>Combo</span>
                </div>
                <div className="text-xs text-slate-500 font-medium">Daily Habit Streaks</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/90 border border-emerald-100/90 shadow-xs text-left">
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-lg mb-0.5">
                  <Droplet className="w-4 h-4 text-cyan-500 fill-cyan-400" />
                  <span>Verified</span>
                </div>
                <div className="text-xs text-slate-500 font-medium">Impact Metrics</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/90 border border-emerald-100/90 shadow-xs text-left">
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-lg mb-0.5">
                  <Award className="w-4 h-4 text-emerald-600 fill-emerald-500" />
                  <span>3D Medals</span>
                </div>
                <div className="text-xs text-slate-500 font-medium">Uniform Badges</div>
              </div>
            </div>

            {/* Smart CTA Buttons */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              {isExistingUser ? (
                <button
                  onClick={() => setScreen('dashboard')}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-base shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Go to My Dashboard</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              ) : (
                <button
                  onClick={() => setScreen('auth')}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-base shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Start Your Green Journey</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              )}

              <button
                onClick={() => setScreen('dashboard')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 font-heading font-semibold text-base transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore App Features</span>
                <Sparkles className="w-4 h-4 text-emerald-600" />
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center lg:justify-start gap-4 text-xs text-slate-500 pt-2">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-emerald-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-emerald-800">🌱</div>
                <div className="w-7 h-7 rounded-full bg-teal-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-teal-800">🌊</div>
                <div className="w-7 h-7 rounded-full bg-amber-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-amber-800">⚡</div>
              </div>
              <span className="font-medium text-slate-600">Joined by 14,000+ youth eco-champions worldwide</span>
            </div>

          </div>

          {/* Right Column: Visual Mascot & Community Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Hero Mascot Card with 3D Image */}
            <div className="relative w-full max-w-md bg-white rounded-3xl p-5 shadow-xl border border-emerald-100/90 overflow-hidden">
              
              <div className="relative rounded-2xl overflow-hidden aspect-square mb-4 bg-emerald-50">
                <img
                  src="/src/assets/images/sprout_mascot_hero_1790693647187.jpg"
                  alt="Sprout playful green mascot"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                
                {/* Floating Micro Badge on image */}
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-emerald-100 flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-slate-800">Sproutly Mascot</span>
                </div>

                <div className="absolute top-3 right-3 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  Youth Eco Hub
                </div>
              </div>

              {/* Bottom Quick Feature Summary */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">Collective Youth Impact</span>
                  <span className="font-bold text-emerald-700">82% to Monthly Goal</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full w-[82%]" />
                </div>
                <p className="text-xs text-slate-500 italic text-center pt-1">
                  "Every reusable cup, pedal stroke, and turned-off tap counts."
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* SECTION 2: HOW SPROUT WORKS (3 SIMPLE PILLARS) */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-emerald-100 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
              <Compass className="w-3.5 h-3.5 text-emerald-600" />
              <span>How Sprout Works</span>
            </div>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
              Simple Habits. Gamified Fun. Real Planet Impact.
            </h3>
            <p className="text-sm text-slate-500">
              Sprout makes sustainability exciting, social, and rewarding through 3 core steps:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-heading font-black text-lg shadow-sm mb-4">
                  1
                </div>
                <h4 className="font-heading font-bold text-lg text-slate-900 mb-2">
                  Log Daily Eco-Deeds
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Log quick actions across Water, Plastic, Clean Energy, Zero Waste, and Food. Tap single-click (+) buttons or log detailed trips and meals.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-emerald-200/60 text-[11px] font-semibold text-emerald-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Earn instant XP points & chimes</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-amber-50/40 border border-amber-200/80 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-heading font-black text-lg shadow-sm mb-4">
                  2
                </div>
                <h4 className="font-heading font-bold text-lg text-slate-900 mb-2">
                  Level Up & Earn 3D Badges
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Maintain combo streaks, unlock metallic 3D enameled badges like <em>Plastic Warrior</em> and <em>Solar Scout</em>, and cheer classmates on the youth leaderboard.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-amber-200/80 text-[11px] font-semibold text-amber-900 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-600" />
                <span>Climb weekly & monthly rankings</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-teal-50/50 border border-teal-100 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-heading font-black text-lg shadow-sm mb-4">
                  3
                </div>
                <h4 className="font-heading font-bold text-lg text-slate-900 mb-2">
                  Redeem Real Eco Impact
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Convert your accumulated Sprout points into real planetary impact vouchers: plant mangrove trees, remove ocean plastic, or grab sustainable discounts.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-teal-200/60 text-[11px] font-semibold text-teal-800 flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5 text-teal-600" />
                <span>Verified partner conservation</span>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 3: KEY APP FEATURES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div 
            onClick={() => setScreen('dashboard')}
            className="p-5 rounded-3xl bg-white border border-emerald-100 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Sprout className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-bold text-base text-slate-900 mb-1">
              Personal Eco Dashboard
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Track level progression, live combo streaks, daily challenges, and real-time saved metrics.
            </p>
          </div>

          <div 
            onClick={() => setScreen('action-logging')}
            className="p-5 rounded-3xl bg-white border border-emerald-100 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-bold text-base text-slate-900 mb-1">
              Fast Action Logger
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Log verified eco-actions across 5 green categories with calculated CO2, water, and waste impact.
            </p>
          </div>

          <div 
            onClick={() => setScreen('leaderboard')}
            className="p-5 rounded-3xl bg-white border border-emerald-100 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Trophy className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-bold text-base text-slate-900 mb-1">
              Youth Leaderboard
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Compete on weekly and monthly podiums, send high-five cheers to peers, and celebrate top eco-heroes.
            </p>
          </div>

          <div 
            onClick={() => setScreen('rewards')}
            className="p-5 rounded-3xl bg-white border border-emerald-100 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-bold text-base text-slate-900 mb-1">
              Trophies & Prizes
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              View your 3D badge trophy case and redeem earned points for real environmental prizes.
            </p>
          </div>

        </div>

      </div>

      {/* Editorial Footer Strip */}
      <div className="border-t border-emerald-100/60 bg-white/70 py-4 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Sprout Youth Sustainability Initiative © 2026</span>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Verified Green Habits</span>
            <span aria-hidden="true">·</span>
            <span>Zero Slop Eco-Action</span>
            <span aria-hidden="true">·</span>
            <span>Real World Tree Planting</span>
          </div>
        </div>
      </div>
    </div>
  );
};
