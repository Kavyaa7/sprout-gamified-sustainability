import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ECO_ACTIONS } from '../data/mockData';
import { ActionCategory, EcoAction } from '../types';
import { 
  Sprout, 
  Droplet, 
  ShoppingBag, 
  Zap, 
  Recycle, 
  Bike, 
  Apple, 
  Plus, 
  Check, 
  Clock, 
  Sparkles, 
  Calendar, 
  X,
  Filter,
  CheckCircle2,
  Trash2,
  ShowerHead,
  Utensils,
  PackageCheck,
  PowerOff,
  Sun,
  Wind,
  Wrench,
  Bus,
  Salad
} from 'lucide-react';

const CATEGORY_TABS = [
  { id: 'all', label: 'All Actions', icon: Sprout },
  { id: 'water', label: 'Water', icon: Droplet },
  { id: 'plastic', label: 'Plastic-Free', icon: ShoppingBag },
  { id: 'energy', label: 'Energy Saving', icon: Zap },
  { id: 'waste', label: 'Zero-Waste', icon: Recycle },
  { id: 'transport', label: 'Green Travel', icon: Bike },
  { id: 'food', label: 'Climate Diet', icon: Apple },
] as const;

const DAYS_OF_WEEK = [
  { id: 'Mon', label: 'Monday', short: 'Mon' },
  { id: 'Tue', label: 'Tuesday', short: 'Tue' },
  { id: 'Wed', label: 'Wednesday', short: 'Wed' },
  { id: 'Thu', label: 'Thursday', short: 'Thu' },
  { id: 'Fri', label: 'Friday', short: 'Fri' },
  { id: 'Sat', label: 'Saturday', short: 'Sat' },
  { id: 'Sun', label: 'Sunday', short: 'Sun' },
];

export const ActionLoggingView: React.FC = () => {
  const { logAction, actionLogs } = useApp();

  // Days of week state (defaults to current day)
  const currentDayIndex = new Date().getDay();
  const dayKeys = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const todayKey = dayKeys[currentDayIndex];
  const [selectedDay, setSelectedDay] = useState<string>(todayKey);

  // Category filter
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Custom action modal state
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customCategory, setCustomCategory] = useState<ActionCategory>('plastic');
  const [customPoints, setCustomPoints] = useState(25);
  const [customImpact, setCustomImpact] = useState('');
  const [customNote, setCustomNote] = useState('');

  // Filter actions
  const filteredActions = ECO_ACTIONS.filter((act) => {
    if (selectedCategory === 'all') return true;
    return act.category === selectedCategory;
  });

  const handleLogCardAction = (action: EcoAction) => {
    logAction({
      actionName: action.name,
      category: action.category,
      points: action.points,
      impactMetric: action.impactMetric,
      impactValue: action.impactValue,
      impactUnit: action.impactUnit,
      dayOfWeek: selectedDay,
      note: `Logged for ${selectedDay}`,
    });
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim()) return;

    logAction({
      actionName: customTitle.trim(),
      category: customCategory,
      points: customPoints,
      impactMetric: customImpact.trim() || 'Custom positive eco deed',
      dayOfWeek: selectedDay,
      note: customNote.trim() || `Custom action logged on ${selectedDay}`,
    });

    // Reset and close
    setCustomTitle('');
    setCustomImpact('');
    setCustomNote('');
    setIsCustomModalOpen(false);
  };

  const getCategoryColor = (cat: ActionCategory) => {
    switch (cat) {
      case 'water':
        return 'text-cyan-700 bg-cyan-50 border-cyan-200';
      case 'plastic':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'energy':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'waste':
        return 'text-lime-800 bg-lime-50 border-lime-200';
      case 'transport':
        return 'text-teal-700 bg-teal-50 border-teal-200';
      case 'food':
        return 'text-emerald-800 bg-green-50 border-green-200';
      default:
        return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6 sm:space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-1.5 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Habit Tracking Hub</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight">
            Log Your Sustainable Actions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Pick the day of the week, choose your category, and collect Sprout points!
          </p>
        </div>

        {/* Custom Action Button */}
        <button
          onClick={() => setIsCustomModalOpen(true)}
          className="self-start sm:self-auto px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-sm shadow-md shadow-emerald-600/25 transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add Custom Action</span>
        </button>
      </div>

      {/* 1. Days of the Week Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-emerald-100/90 shadow-sm">
        <div className="flex items-center justify-between mb-3 text-xs">
          <span className="font-bold text-slate-700 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>Select Day of the Week</span>
          </span>
          <span className="text-slate-400">
            Logging for: <strong className="text-emerald-700">{selectedDay === todayKey ? `${selectedDay} (Today)` : selectedDay}</strong>
          </span>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {DAYS_OF_WEEK.map((day) => {
            const isSelected = selectedDay === day.short;
            const isToday = todayKey === day.short;
            const logCountForDay = actionLogs.filter((l) => l.dayOfWeek === day.short).length;

            return (
              <button
                key={day.id}
                type="button"
                onClick={() => setSelectedDay(day.short)}
                className={`flex flex-col items-center justify-center py-2.5 sm:py-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-600 text-white shadow-md shadow-emerald-600/25 scale-[1.03]'
                    : isToday
                    ? 'border-emerald-300 bg-emerald-50/70 text-slate-800 hover:border-emerald-400'
                    : 'border-slate-100 bg-slate-50/80 text-slate-600 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <span className={`text-[10px] sm:text-xs font-semibold uppercase tracking-wider ${
                  isSelected ? 'text-emerald-100' : 'text-slate-400'
                }`}>
                  {day.short}
                </span>
                <span className="font-heading font-bold text-base sm:text-lg">
                  {day.label.slice(0, 3)}
                </span>
                
                {/* Activity Dots */}
                <div className="flex gap-1 mt-1">
                  {logCountForDay > 0 ? (
                    <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-amber-300' : 'bg-emerald-500'}`} />
                  ) : (
                    <span className="w-1.5 h-1.5" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Category of Action Taken (Segmented/Filter Buttons) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-emerald-600" />
            <span>Category of Action</span>
          </span>
          <span>{filteredActions.length} Actions Available</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORY_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = selectedCategory === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20'
                    : 'bg-white text-slate-600 hover:text-emerald-900 hover:bg-emerald-50/60 border border-slate-200/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Action Cards Grid of Selected Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filteredActions.map((action) => {
          const badgeClass = getCategoryColor(action.category);

          return (
            <div
              key={action.id}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-emerald-100/90 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Category & Points Pill Header */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${badgeClass} uppercase tracking-wider`}>
                    {action.category}
                  </span>
                  
                  <div className="font-heading font-extrabold text-sm text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/80">
                    +{action.points} pts
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 group-hover:text-emerald-800 transition-colors">
                    {action.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {action.description}
                  </p>
                </div>

                {/* Impact Metric display */}
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{action.impactMetric}</span>
                </div>
              </div>

              {/* Log Action Button */}
              <div className="pt-4 mt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => handleLogCardAction(action)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-heading font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Log Action (+{action.points} pts)</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Recent Activity Log Timeline for Visibility */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-100/90 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-bold text-lg sm:text-xl text-slate-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-600" />
            <span>Recent Activity Stream</span>
          </h2>
          <span className="text-xs text-slate-500">
            {actionLogs.length} total logged
          </span>
        </div>

        {actionLogs.length === 0 ? (
          <p className="text-sm text-slate-400 py-6 text-center">
            No actions logged yet today. Choose an action above to start earning points!
          </p>
        ) : (
          <div className="divide-y divide-slate-100">
            {actionLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-sm text-slate-900">
                      {log.actionName}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span>{log.dayOfWeek}</span>
                      <span aria-hidden="true">·</span>
                      <span>{log.impactMetric}</span>
                      {log.note && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="italic text-slate-400 max-w-[200px] truncate">{log.note}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="font-heading font-bold text-sm text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80 tabular-nums">
                  +{log.points} pts
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. Custom Action Modal */}
      {isCustomModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div 
            className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-100"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsCustomModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <Plus className="w-6 h-6 stroke-[3]" />
            </div>

            <h3 className="font-heading font-bold text-2xl text-slate-900 mb-1">
              Log a Custom Green Action
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Did something eco-friendly not listed in the presets? Add it here and claim your points!
            </p>

            <form onSubmit={handleCustomSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Action Title
                </label>
                <input
                  type="text"
                  required
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="e.g. Swapped clothing with friends instead of buying new"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Category
                  </label>
                  <select
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value as ActionCategory)}
                    className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  >
                    <option value="water">Water Conservation</option>
                    <option value="plastic">Plastic Reduction</option>
                    <option value="energy">Energy Efficiency</option>
                    <option value="waste">Zero-Waste & Recycling</option>
                    <option value="transport">Green Mobility</option>
                    <option value="food">Sustainable Diet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Points Earned
                  </label>
                  <select
                    value={customPoints}
                    onChange={(e) => setCustomPoints(Number(e.target.value))}
                    className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  >
                    <option value={15}>+15 pts (Quick deed)</option>
                    <option value={25}>+25 pts (Solid effort)</option>
                    <option value={35}>+35 pts (Super habit)</option>
                    <option value={50}>+50 pts (Heroic community impact)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Environmental Impact Description
                </label>
                <input
                  type="text"
                  value={customImpact}
                  onChange={(e) => setCustomImpact(e.target.value)}
                  placeholder="e.g. 2 garments saved from landfill waste"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Personal Reflection / Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="How did this feel? Share a small victory!"
                  className="w-full px-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsCustomModalOpen(false)}
                  className="w-1/2 py-2.5 px-4 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 px-4 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Log Custom Deed</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
