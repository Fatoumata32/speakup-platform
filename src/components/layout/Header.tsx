import React, { useState } from 'react';
import { Search, Bell, Check, Shield, GraduationCap, UserCheck, RefreshCw, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const Header: React.FC = () => {
  const {
    currentUser,
    switchUserRole,
    notifications,
    markAllNotificationsRead,
    setIsGlobalSearchOpen,
    resetAllData,
    setActiveNav
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const unreadNotifs = notifications.filter(n => !n.read);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-3.5 bg-white/90 backdrop-blur-md border-b border-surface-border">
      {/* Search Bar matching reference image */}
      <div className="flex-1 max-w-2xl mr-6">
        <div
          onClick={() => setIsGlobalSearchOpen(true)}
          className="relative flex items-center w-full px-4 py-2.5 bg-[#F6F7FB] hover:bg-[#F0F2FA] rounded-full border border-transparent hover:border-brand-200 cursor-pointer transition-all text-slate-400 group shadow-sm"
        >
          <Search className="w-4 h-4 text-slate-400 group-hover:text-brand-600 transition-colors mr-3" />
          <span className="text-sm text-slate-500 font-medium select-none">
            Search for lessons, exercises, or topics...
          </span>
          <kbd className="hidden sm:inline-flex items-center gap-1 ml-auto px-2 py-0.5 text-[11px] font-semibold text-slate-400 bg-white border border-slate-200 rounded-md shadow-xs">
            /
          </kbd>
        </div>
      </div>

      {/* Right Controls: Role Switcher Pill, Notifications & User Avatar */}
      <div className="flex items-center space-x-4">
        {/* Active Role Indicator */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 border border-brand-200 rounded-full text-xs font-semibold text-brand-700 capitalize">
          <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse" />
          Role: <span className="font-bold underline">{currentUser.role}</span>
        </div>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setIsNotifOpen(!isNotifOpen);
              setIsProfileMenuOpen(false);
            }}
            className="relative p-2.5 text-slate-600 hover:text-brand-600 hover:bg-brand-50 rounded-full transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadNotifs.length > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                {unreadNotifs.length}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {isNotifOpen && (
            <div className="absolute right-0 mt-3 w-84 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-800 text-sm">Notifications</h3>
                  {unreadNotifs.length > 0 && (
                    <span className="px-2 py-0.5 text-xs bg-brand-100 text-brand-700 font-bold rounded-full">
                      {unreadNotifs.length} new
                    </span>
                  )}
                </div>
                {unreadNotifs.length > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-xs font-medium text-brand-600 hover:text-brand-800 flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" /> Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto space-y-2.5 divide-y divide-slate-50">
                {notifications.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-6">No notifications yet.</p>
                ) : (
                  notifications.map(n => (
                    <div
                      key={n.id}
                      className={`pt-2 flex gap-3 items-start p-2 rounded-xl transition-colors ${
                        n.read ? 'bg-transparent' : 'bg-brand-50/50'
                      }`}
                    >
                      <div className="w-2 h-2 mt-1.5 rounded-full bg-brand-600 shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-slate-800">{n.title}</p>
                          <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5">{n.message}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar / Role Switcher Menu */}
        <div className="relative">
          <button
            onClick={() => {
              setIsProfileMenuOpen(!isProfileMenuOpen);
              setIsNotifOpen(false);
            }}
            className="flex items-center gap-2 p-1 pl-2 pr-2.5 bg-slate-50 hover:bg-brand-50 border border-slate-200 rounded-full transition-all"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-brand-500/30 flex items-center justify-center bg-brand-600 text-white font-bold text-sm">
              {currentUser.avatar ? (
                <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
              ) : (
                currentUser.name.charAt(0)
              )}
            </div>
            <span className="hidden sm:inline-block text-xs font-bold text-slate-700">
              {currentUser.name.split(' ')[0]}
            </span>
          </button>

          {/* Profile Menu Dropdown */}
          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 mb-3">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-brand-500"
                />
                <div>
                  <h4 className="font-bold text-sm text-slate-800">{currentUser.name}</h4>
                  <p className="text-xs text-slate-500">{currentUser.email}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold bg-purple-100 text-purple-700 rounded-full">
                    Level {currentUser.level}
                  </span>
                </div>
              </div>

              {/* Role Switcher */}
              <div className="mb-3">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Switch Active Role:
                </label>
                <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-xl">
                  {(['student', 'teacher', 'admin'] as UserRole[]).map(role => (
                    <button
                      key={role}
                      onClick={() => {
                        switchUserRole(role);
                        setIsProfileMenuOpen(false);
                      }}
                      className={`py-1.5 text-xs font-bold rounded-lg capitalize transition-all ${
                        currentUser.role === role
                          ? 'bg-brand-600 text-white shadow-sm'
                          : 'text-slate-600 hover:text-brand-600'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1 pt-1 border-t border-slate-100 text-xs">
                <button
                  onClick={() => {
                    setActiveNav('Profile');
                    setIsProfileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-brand-50 text-slate-700 font-semibold flex items-center gap-2"
                >
                  <GraduationCap className="w-4 h-4 text-brand-600" /> View Full Profile & Progress
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Reset all demo lessons, messages, and state back to default?')) {
                      resetAllData();
                      setIsProfileMenuOpen(false);
                    }
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 font-semibold flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" /> Reset Demo Data
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
