import React, { useState } from 'react';
import {
  Home,
  BookOpen,
  Calendar,
  MessageSquare,
  CheckSquare,
  Headphones,
  BookMarked,
  FileSpreadsheet,
  Megaphone,
  Library,
  Languages,
  ChevronDown,
  ChevronUp,
  Award,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SidebarLeft: React.FC = () => {
  const {
    currentUser,
    activeNav,
    setActiveNav,
    conversations,
    setSelectedTestId,
    setActiveConversationId
  } = useApp();

  const [testsExpanded, setTestsExpanded] = useState(false);

  const totalUnreadMessages = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);

  const navItems = [
    { name: 'Home', icon: Home },
    { name: 'Lessons & Exercises', icon: BookOpen },
    { name: 'Online Courses', icon: Calendar },
    { name: 'Messages', icon: MessageSquare, badge: totalUnreadMessages > 0 ? totalUnreadMessages : undefined },
    {
      name: 'Tests',
      icon: CheckSquare,
      hasSubmenu: true,
      subItems: [
        { name: 'Placement Test', testId: 'test-placement' },
        { name: 'Level Tests (A1–C2)', testId: 'test-a1' }
      ]
    },
    { name: 'Listening', icon: Headphones },
    { name: 'Reading', icon: BookMarked },
    { name: 'Workbook', icon: FileSpreadsheet },
    { name: 'Updates', icon: Megaphone },
    { name: 'Library', icon: Library },
    { name: 'English Dictionary', icon: Languages }
  ];

  return (
    <aside className="w-64 bg-white border-r border-surface-border flex flex-col justify-between shrink-0 min-h-screen py-5 px-4 select-none">
      <div className="space-y-6">
        {/* Brand Header with SpeakUp Official Logo */}
        <div
          onClick={() => setActiveNav('Home')}
          className="flex items-center gap-3 px-2 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm flex items-center justify-center bg-white border border-slate-100 p-0.5">
            <img
              src="/assets/speakup-logo.jpg"
              alt="SpeakUp Logo"
              className="w-full h-full object-contain group-hover:scale-105 transition-transform"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-slate-800 flex items-center gap-1 font-sans">
              Speak<span className="text-[#FF5B79]">Up</span>
              <span className="text-xs text-brand-600">🎙️</span>
            </span>
            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
              Interactive English
            </span>
          </div>
        </div>

        {/* User Mini Profile Card matching screenshot */}
        <div
          onClick={() => setActiveNav('Profile')}
          className="flex flex-col items-center p-3 rounded-2xl bg-gradient-to-b from-brand-50/70 to-purple-50/30 border border-brand-100/60 cursor-pointer hover:border-brand-300 transition-all group"
        >
          <div className="relative mb-2">
            <div className="w-14 h-14 rounded-full overflow-hidden ring-3 ring-brand-500/30 shadow-md">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
          </div>
          <h3 className="font-bold text-sm text-slate-800 text-center leading-snug">
            {currentUser.name}
          </h3>
          <p className="text-[11px] font-semibold text-brand-700 flex items-center gap-1 mt-0.5">
            <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500" />
            {currentUser.level === 'B1' ? 'Intermediate Learner' : `${currentUser.level} Learner`}
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeNav === item.name || (item.name === 'Tests' && activeNav.startsWith('Tests'));

            if (item.hasSubmenu) {
              return (
                <div key={item.name} className="space-y-1">
                  <button
                    onClick={() => {
                      setActiveNav('Tests');
                      setTestsExpanded(!testsExpanded);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-brand-600 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-brand-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                      <span>{item.name}</span>
                    </div>
                    {testsExpanded ? (
                      <ChevronUp className="w-4 h-4 opacity-70" />
                    ) : (
                      <ChevronDown className="w-4 h-4 opacity-70" />
                    )}
                  </button>

                  {/* Submenu */}
                  {testsExpanded && (
                    <div className="pl-9 pr-2 py-1 space-y-1">
                      {item.subItems?.map(sub => (
                        <button
                          key={sub.name}
                          onClick={() => {
                            setActiveNav('Tests');
                            setSelectedTestId(sub.testId);
                          }}
                          className="w-full text-left py-1.5 px-2.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-brand-600 hover:bg-brand-50/50 transition-colors flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                          <span>{sub.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={item.name}
                onClick={() => setActiveNav(item.name)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-brand-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`px-2 py-0.5 text-[10px] font-extrabold rounded-full ${
                      isActive ? 'bg-white text-brand-700' : 'bg-red-500 text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Motivation Banner matching screenshot */}
      <div className="mt-6 p-3.5 rounded-2xl bg-gradient-to-r from-purple-50 to-brand-50 border border-brand-100/70 shadow-xs">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800 leading-tight">Keep going!</h4>
            <p className="text-[10px] text-slate-500">You're doing great!</p>
          </div>
        </div>

        {/* Mini progress bar and arrow */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-brand-200/50 rounded-full overflow-hidden">
            <div className="h-full bg-brand-600 rounded-full w-[65%]" />
          </div>
          <button
            onClick={() => setActiveNav('Lessons & Exercises')}
            className="w-6 h-6 rounded-full bg-brand-600 text-white flex items-center justify-center hover:bg-brand-700 transition-colors shrink-0 shadow-xs"
            title="Continue Learning"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
