import React from 'react';
import {
  User,
  Award,
  Flame,
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  Bookmark,
  Calendar,
  TrendingUp,
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProfileView: React.FC = () => {
  const { currentUser, lessons, exercises, tests, books, setActiveNav, setSelectedLessonId } = useApp();

  return (
    <div className="space-y-6 pb-12">
      {/* Profile Header Hero */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-soft p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-24 h-24 rounded-full object-cover ring-4 ring-brand-500/20 shadow-md"
            />
            <span className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white text-[10px]">
              ✓
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <h1 className="text-2xl font-black text-slate-900">{currentUser.name}</h1>
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-purple-100 text-purple-700">
                Level {currentUser.level}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">{currentUser.email}</p>
            <p className="text-xs text-brand-600 font-bold capitalize">
              Role: {currentUser.role} • SpeakUp Community Member
            </p>
          </div>
        </div>

        {/* Quick Stat Badges */}
        <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
          <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-center">
            <Flame className="w-5 h-5 text-amber-500 mx-auto" />
            <span className="text-lg font-black text-amber-900 block mt-1">{currentUser.streakDays}</span>
            <span className="text-[10px] font-bold text-amber-700 uppercase">Day Streak</span>
          </div>

          <div className="p-3.5 bg-purple-50 rounded-2xl border border-purple-200 text-center">
            <BookOpen className="w-5 h-5 text-purple-600 mx-auto" />
            <span className="text-lg font-black text-purple-900 block mt-1">{currentUser.completedLessons.length}</span>
            <span className="text-[10px] font-bold text-purple-700 uppercase">Lessons Done</span>
          </div>

          <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-center">
            <Clock className="w-5 h-5 text-emerald-600 mx-auto" />
            <span className="text-lg font-black text-emerald-900 block mt-1">{currentUser.totalStudyHours}h</span>
            <span className="text-[10px] font-bold text-emerald-700 uppercase">Study Time</span>
          </div>
        </div>
      </div>

      {/* Progress & Milestone Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Test Results & CEFR Certificates */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-soft p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Award className="w-4 h-4 text-brand-600" /> Assessment History & Certificates
          </h3>

          <div className="space-y-2.5">
            {currentUser.testResults.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">No assessments completed yet.</p>
            ) : (
              currentUser.testResults.map((tr, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs"
                >
                  <div>
                    <h4 className="font-bold text-slate-800">{tr.testName}</h4>
                    <span className="text-[11px] text-slate-400">Date: {tr.date}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-emerald-600 block">
                      Score: {Math.round((tr.score / tr.maxScore) * 100)}%
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 text-[10px] font-bold">
                      CEFR {tr.levelAchieved}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Saved Books & Bookmarks */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-soft p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-amber-500 fill-amber-500" /> Saved Library Books & Reading List
          </h3>

          <div className="space-y-2.5">
            {currentUser.savedBooks.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">No saved books yet.</p>
            ) : (
              currentUser.savedBooks.map(bId => {
                const book = books.find(b => b.id === bId);
                if (!book) return null;

                return (
                  <div
                    key={book.id}
                    className="p-3 rounded-2xl bg-amber-50/50 border border-amber-200/60 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <img src={book.coverImage} alt={book.title} className="w-9 h-12 rounded-lg object-cover" />
                      <div>
                        <h4 className="font-bold text-slate-800">{book.title}</h4>
                        <span className="text-[10px] text-slate-400">by {book.author}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveNav('Library')}
                      className="text-xs font-bold text-amber-700 underline"
                    >
                      Read
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Completed Lessons & Exercises List */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-soft p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Completed Learning Units
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentUser.completedLessons.map(lId => {
            const lesson = lessons.find(l => l.id === lId);
            if (!lesson) return null;

            return (
              <div
                key={lesson.id}
                onClick={() => {
                  setActiveNav('Lessons & Exercises');
                  setSelectedLessonId(lesson.id);
                }}
                className="p-3.5 rounded-2xl bg-emerald-50/40 border border-emerald-100 flex items-center justify-between text-xs cursor-pointer hover:bg-emerald-50 transition-colors"
              >
                <div>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase">
                    Level {lesson.level}
                  </span>
                  <h4 className="font-bold text-slate-800 mt-1">{lesson.title}</h4>
                </div>
                <span className="text-[11px] font-bold text-emerald-600 shrink-0">Review ➔</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
