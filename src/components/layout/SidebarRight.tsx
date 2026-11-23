import React, { useState } from 'react';
import { Flame, ChevronLeft, ChevronRight, TrendingUp, Sparkles, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SidebarRight: React.FC = () => {
  const { currentUser, courses, setActiveNav } = useApp();

  const [currentMonthIndex, setCurrentMonthIndex] = useState(5); // June (0-indexed)
  const [currentYear, setCurrentYear] = useState(2026);
  const [selectedDay, setSelectedDay] = useState(25);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    if (currentMonthIndex === 0) {
      setCurrentMonthIndex(11);
      setCurrentYear(y => y - 1);
    } else {
      setCurrentMonthIndex(m => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonthIndex === 11) {
      setCurrentMonthIndex(0);
      setCurrentYear(y => y + 1);
    } else {
      setCurrentMonthIndex(m => m + 1);
    }
  };

  // June 2026 starts on Monday (1)
  const daysInMonth = 30;
  const startDayOfWeek = 0; // Monday-indexed

  const calendarDays = [];
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  // Days with courses
  const courseDays = [25, 27, 28, 30];

  return (
    <aside className="w-80 bg-[#FBFBFE] border-l border-surface-border flex flex-col gap-5 p-5 shrink-0 min-h-screen select-none">
      {/* 1. Streak Society Card */}
      <div className="relative overflow-hidden p-5 rounded-3xl bg-gradient-to-br from-[#FFF3D6] via-[#FFEAA7]/40 to-[#FFF8E7] border border-[#FDE68A] shadow-soft">
        <div className="flex items-center justify-between">
          <div className="inline-block px-3 py-1 rounded-full bg-[#FEF3C7] border border-[#FCD34D] text-[10px] font-extrabold uppercase tracking-wider text-[#B45309]">
            STREAK SOCIETY
          </div>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#F59E0B] to-[#FBBF24] shadow-md flex items-center justify-center text-white transform rotate-3">
            <Flame className="w-7 h-7 fill-white text-transparent animate-bounce" />
          </div>
        </div>

        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-[#3B2800] tracking-tight font-sans">
              {currentUser.streakDays}
            </span>
            <span className="text-xs font-bold text-[#92400E] uppercase tracking-wide">
              DAY STREAK
            </span>
          </div>
          <p className="text-xs text-[#78350F] font-medium mt-1">
            Today you're one step closer to a bigger streak! 🔥
          </p>
        </div>
      </div>

      {/* 2. Interactive Calendar Card */}
      <div className="p-4 bg-white rounded-3xl border border-slate-100 shadow-soft">
        <div className="flex items-center justify-between mb-4 px-1">
          <button
            onClick={handlePrevMonth}
            className="p-1 rounded-full text-slate-400 hover:text-brand-600 hover:bg-slate-100 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold text-slate-800 tracking-wide">
            {monthNames[currentMonthIndex]} {currentYear}
          </span>
          <button
            onClick={handleNextMonth}
            className="p-1 rounded-full text-slate-400 hover:text-brand-600 hover:bg-slate-100 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-slate-400 mb-2">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium">
          {calendarDays.map(day => {
            const isSelected = day === selectedDay;
            const hasEvent = courseDays.includes(day);

            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`h-8 w-8 mx-auto flex flex-col items-center justify-center rounded-full relative transition-all ${
                  isSelected
                    ? 'bg-brand-600 text-white font-bold shadow-sm ring-2 ring-brand-300'
                    : 'text-slate-600 hover:bg-brand-50 hover:text-brand-700'
                }`}
              >
                <span>{day}</span>
                {hasEvent && !isSelected && (
                  <span className="w-1 h-1 rounded-full bg-brand-500 absolute bottom-1" />
                )}
              </button>
            );
          })}
        </div>

        {/* Event indicator preview */}
        {courseDays.includes(selectedDay) && (
          <div
            onClick={() => setActiveNav('Online Courses')}
            className="mt-3 p-2 bg-brand-50/60 rounded-xl border border-brand-100 text-[11px] font-semibold text-brand-700 flex items-center justify-between cursor-pointer hover:bg-brand-100/60 transition-colors"
          >
            <span className="truncate">Live Class on June {selectedDay}!</span>
            <span className="text-[10px] text-brand-500 underline font-bold shrink-0">View</span>
          </div>
        )}
      </div>

      {/* 3. Your Progress Card with Gauge & Smooth Trend Line Chart */}
      <div className="p-4 bg-white rounded-3xl border border-slate-100 shadow-soft">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-brand-600" />
            <h4 className="text-xs font-bold text-slate-800">Your Progress</h4>
          </div>
        </div>
        <p className="text-[11px] text-slate-400 -mt-2 mb-3">Overall Learning Progress</p>

        {/* Circular Progress Gauge */}
        <div className="flex items-center justify-center gap-4 py-2">
          <div className="relative w-20 h-20 flex items-center justify-center">
            {/* SVG Ring Gauge */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-brand-600 transition-all duration-1000 ease-out"
                strokeDasharray="60, 100"
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-base font-extrabold text-slate-800 font-sans">60%</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-extrabold text-slate-800">12 / 20</p>
            <p className="text-xs text-slate-400 font-medium">Weeks Completed</p>
          </div>
        </div>

        {/* Smooth Trend Line Chart (SVG) */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="h-16 w-full relative">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 200 60">
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Area fill */}
              <path
                d="M 10 50 Q 50 45 80 35 T 140 25 T 190 10 L 190 60 L 10 60 Z"
                fill="url(#progressGradient)"
              />
              {/* Smooth curve */}
              <path
                d="M 10 50 Q 50 45 80 35 T 140 25 T 190 10"
                fill="none"
                stroke="#5452F6"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Data points */}
              <circle cx="10" cy="50" r="3" fill="#5452F6" />
              <circle cx="80" cy="35" r="3" fill="#5452F6" />
              <circle cx="140" cy="25" r="3" fill="#5452F6" />
              <circle cx="190" cy="10" r="4" fill="#5452F6" stroke="#FFFFFF" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>

      {/* 4. Motivational Quote Card matching screenshot */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-brand-50 to-purple-50/60 border border-brand-100/60 text-center shadow-xs">
        <p className="text-xs font-bold text-slate-700 italic flex items-center justify-center gap-1.5">
          <span>“You can do it!”</span>
          <Heart className="w-3.5 h-3.5 text-brand-600 fill-brand-600 inline" />
        </p>
        <span className="text-[11px] font-semibold text-brand-600 block mt-1">
          — SpeakUp Team
        </span>
      </div>
    </aside>
  );
};
