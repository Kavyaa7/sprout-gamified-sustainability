import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, X, CheckCircle, ArrowRight } from 'lucide-react';

export const CelebrationModal: React.FC = () => {
  const { celebration, closeCelebration, setScreen } = useApp();

  if (!celebration) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-emerald-100 text-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Soft background aura */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-emerald-200/50 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-amber-200/50 rounded-full blur-2xl pointer-events-none" />

        <button
          onClick={closeCelebration}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close celebration modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Badge or Icon Spotlight */}
        <div className="mx-auto w-24 h-24 mb-4 relative flex items-center justify-center">
          {celebration.badgeImage ? (
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-amber-400 to-emerald-400 blur-md opacity-70 animate-pulse" />
              <img
                src={celebration.badgeImage}
                alt={celebration.badgeName || 'Achievement Badge'}
                referrerPolicy="no-referrer"
                className="relative w-24 h-24 object-cover rounded-2xl shadow-xl border-3 border-amber-300"
              />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 animate-bounce">
              <Sparkles className="w-10 h-10" />
            </div>
          )}
        </div>

        {/* Title & Points pill */}
        <h3 className="font-heading font-bold text-xl text-slate-900 mb-1.5 leading-snug">
          {celebration.title}
        </h3>
        
        <p className="text-sm text-slate-600 mb-5 leading-relaxed">
          {celebration.subtitle}
        </p>

        <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-4 py-1.5 rounded-full font-bold text-sm mb-6">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>+{celebration.points} Points Earned</span>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={closeCelebration}
            className="w-full py-2.5 px-4 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            Awesome!
          </button>
          <button
            onClick={() => {
              closeCelebration();
              setScreen('rewards');
            }}
            className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>See Rewards</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
