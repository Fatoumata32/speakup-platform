import React, { useState } from 'react';
import {
  Play,
  Newspaper,
  BookOpen,
  Calendar,
  Users,
  ArrowRight,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  Volume2,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DashboardView: React.FC = () => {
  const {
    currentUser,
    lessons,
    courses,
    setActiveNav,
    setSelectedLessonId,
    dictionary
  } = useApp();

  const [quickWord, setQuickWord] = useState('');
  const [quickLookupResult, setQuickLookupResult] = useState<any>(null);

  const handleQuickDictionarySearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!quickWord.trim()) return;
    const found = dictionary.find(
      d => d.word.toLowerCase() === quickWord.trim().toLowerCase()
    );
    if (found) {
      setQuickLookupResult(found);
    } else {
      setQuickLookupResult({
        word: quickWord.trim(),
        ipa: '/.../',
        wordType: 'word',
        frenchTranslation: 'Recherche en cours...',
        englishDefinition: `Word definition for "${quickWord.trim()}". Open English Dictionary for full pronunciation and synonyms.`,
        exampleEn: `SpeakUp helps learners expand vocabulary every day.`,
        exampleFr: `SpeakUp aide les apprenants à enrichir leur vocabulaire chaque jour.`
      });
    }
  };

  const handleAudioSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-7 pb-10">
      {/* 1. Hero Welcome Banner matching screenshot exactly */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#FFFBEA] via-[#FFF6E0] to-[#F1EEFE] p-6 sm:p-8 border border-[#FDE68A]/50 shadow-soft">
        {/* Decorative sparkles */}
        <div className="absolute top-4 left-1/3 text-amber-400">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
        <div className="absolute bottom-4 left-1/2 text-purple-400">
          <Sparkles className="w-4 h-4 animate-pulse" />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          {/* Welcome Text */}
          <div className="space-y-2 max-w-md">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B4B] tracking-tight font-sans">
              What's up, {currentUser.name.split(' ')[0]}?
            </h1>
            <p className="text-slate-700 text-sm sm:text-base font-semibold">
              You have a progress this week.
            </p>
            <p className="text-brand-700 font-extrabold text-sm sm:text-base flex items-center gap-1.5">
              Keep going! <span className="text-purple-600">💜</span>
            </p>
          </div>

          {/* Center Arc Gauge: 60% (12 weeks of 20 weeks) */}
          <div className="flex flex-col items-center">
            <div className="relative w-36 h-20 flex items-end justify-center">
              <svg className="w-36 h-20 overflow-visible" viewBox="0 0 100 55">
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <path
                  d="M 10 50 A 40 40 0 0 1 75 20"
                  fill="none"
                  stroke="#5452F6"
                  strokeWidth="8"
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute bottom-0 text-center">
                <span className="text-2xl font-black text-slate-900 font-sans">60%</span>
              </div>
            </div>
            <p className="text-xs font-bold text-slate-500 mt-2">12 weeks of 20 weeks</p>
          </div>

          {/* Illustration of smiling woman with purple hijab and headphones */}
          <div className="relative shrink-0 flex items-center justify-center">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-purple-200 to-indigo-100 p-1 shadow-inner relative flex items-center justify-center">
              {/* Illustrated Avatar */}
              <div className="w-full h-full rounded-full overflow-hidden bg-[#5B4FE1] flex items-center justify-center relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"
                  alt="Fatoumata"
                  className="w-full h-full object-cover mix-blend-luminosity brightness-110"
                />
                <div className="absolute inset-0 bg-brand-600/30" />
                {/* Visual headphone icon overlay */}
                <div className="absolute top-2 w-20 h-10 border-t-4 border-white rounded-t-full" />
                <div className="absolute top-7 left-2 w-3.5 h-6 bg-white rounded-full shadow-md" />
                <div className="absolute top-7 right-2 w-3.5 h-6 bg-white rounded-full shadow-md" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. "Start to enjoy" section matching screenshot exactly */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-4 font-sans">Start to enjoy</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {/* Card 1: Podcast or Video (Green) */}
          <div
            onClick={() => setActiveNav('Listening')}
            className="p-4 rounded-2xl bg-[#EAFBF3] hover:bg-[#DCF8EC] border border-[#B7F0D6] cursor-pointer transition-all duration-200 group flex flex-col justify-between h-36"
          >
            <p className="text-xs font-bold text-slate-800 leading-tight">
              Podcast or<br />Video
            </p>
            <div className="flex items-center justify-between mt-auto">
              <div className="w-9 h-9 rounded-xl bg-white shadow-xs flex items-center justify-center text-[#10B981]">
                <Play className="w-4 h-4 fill-[#10B981]" />
              </div>
              <div className="w-7 h-7 rounded-full bg-[#10B981] text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Card 2: News or Magazine (Lavender) */}
          <div
            onClick={() => setActiveNav('Reading')}
            className="p-4 rounded-2xl bg-[#F2EFFE] hover:bg-[#ECE7FE] border border-[#DDD6FE] cursor-pointer transition-all duration-200 group flex flex-col justify-between h-36"
          >
            <p className="text-xs font-bold text-slate-800 leading-tight">
              News or<br />Magazine
            </p>
            <div className="flex items-center justify-between mt-auto">
              <div className="w-9 h-9 rounded-xl bg-white shadow-xs flex items-center justify-center text-[#7C3AED]">
                <Newspaper className="w-4 h-4" />
              </div>
              <div className="w-7 h-7 rounded-full bg-[#7C3AED] text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Card 3: Book or Blog (Peach) */}
          <div
            onClick={() => setActiveNav('Library')}
            className="p-4 rounded-2xl bg-[#FFF3E8] hover:bg-[#FFEAD6] border border-[#FED7AA] cursor-pointer transition-all duration-200 group flex flex-col justify-between h-36"
          >
            <p className="text-xs font-bold text-slate-800 leading-tight">
              Book or<br />Blog
            </p>
            <div className="flex items-center justify-between mt-auto">
              <div className="w-9 h-9 rounded-xl bg-white shadow-xs flex items-center justify-center text-[#F97316]">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="w-7 h-7 rounded-full bg-[#F97316] text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Card 4: Online Courses (Light Blue) */}
          <div
            onClick={() => setActiveNav('Online Courses')}
            className="p-4 rounded-2xl bg-[#EBF5FF] hover:bg-[#E0EFFE] border border-[#BFDBFE] cursor-pointer transition-all duration-200 group flex flex-col justify-between h-36"
          >
            <p className="text-xs font-bold text-slate-800 leading-tight">
              Online<br />Courses
            </p>
            <div className="flex items-center justify-between mt-auto">
              <div className="w-9 h-9 rounded-xl bg-white shadow-xs flex items-center justify-center text-[#2563EB]">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="w-7 h-7 rounded-full bg-[#2563EB] text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Card 5: Speak with Others (Pink / Lilac) */}
          <div
            onClick={() => setActiveNav('Messages')}
            className="p-4 rounded-2xl bg-[#FDF0F6] hover:bg-[#FCE4F0] border border-[#FBCFE8] cursor-pointer transition-all duration-200 group flex flex-col justify-between h-36 col-span-2 sm:col-span-1"
          >
            <p className="text-xs font-bold text-slate-800 leading-tight">
              Speak with<br />Others
            </p>
            <div className="flex items-center justify-between mt-auto">
              <div className="w-9 h-9 rounded-xl bg-white shadow-xs flex items-center justify-center text-[#DB2777]">
                <Users className="w-4 h-4" />
              </div>
              <div className="w-7 h-7 rounded-full bg-[#DB2777] text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. "Library" preview section matching screenshot */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-brand-600" />
            <h2 className="text-lg font-bold text-slate-900 font-sans">Library</h2>
          </div>
          <button
            onClick={() => setActiveNav('Library')}
            className="text-xs font-bold text-slate-500 hover:text-brand-600 flex items-center gap-1 transition-colors"
          >
            See all <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="text-xs text-slate-400 mb-4">Explore our English library: articles, stories, and more!</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* Card 1: English Articles */}
          <div
            onClick={() => setActiveNav('Reading')}
            className="bg-white rounded-2xl border border-slate-100 p-3 shadow-soft hover:shadow-hover transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="h-28 rounded-xl overflow-hidden mb-3 bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=300"
                alt="English Articles"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">English Articles</h4>
              <button className="text-[11px] font-bold text-brand-600 group-hover:text-brand-800 flex items-center gap-1 mt-2">
                Read now <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Card 2: Stories & Real Life */}
          <div
            onClick={() => setActiveNav('Library')}
            className="bg-white rounded-2xl border border-slate-100 p-3 shadow-soft hover:shadow-hover transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="h-28 rounded-xl overflow-hidden mb-3 bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=300"
                alt="Stories & Real Life"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Stories & Real Life</h4>
              <button className="text-[11px] font-bold text-brand-600 group-hover:text-brand-800 flex items-center gap-1 mt-2">
                Read now <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Card 3: Listening Practice */}
          <div
            onClick={() => setActiveNav('Listening')}
            className="bg-white rounded-2xl border border-slate-100 p-3 shadow-soft hover:shadow-hover transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="h-28 rounded-xl overflow-hidden mb-3 bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=300"
                alt="Listening Practice"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Listening Practice</h4>
              <button className="text-[11px] font-bold text-brand-600 group-hover:text-brand-800 flex items-center gap-1 mt-2">
                Listen now <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Card 4: Grammar Tips */}
          <div
            onClick={() => setActiveNav('Lessons & Exercises')}
            className="bg-white rounded-2xl border border-slate-100 p-3 shadow-soft hover:shadow-hover transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="h-28 rounded-xl overflow-hidden mb-3 bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=300"
                alt="Grammar Tips"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Grammar Tips</h4>
              <button className="text-[11px] font-bold text-brand-600 group-hover:text-brand-800 flex items-center gap-1 mt-2">
                Learn more <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. "English Dictionary" widget matching screenshot */}
      <div className="relative overflow-hidden p-6 rounded-3xl bg-white border border-slate-100 shadow-soft">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand-100 flex items-center justify-center text-brand-600">
              <BookOpen className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-base text-slate-900">English Dictionary</h3>
          </div>
          <button
            onClick={() => setActiveNav('English Dictionary')}
            className="text-xs font-bold text-brand-600 hover:underline flex items-center gap-1"
          >
            Open Full Dictionary <ExternalLink className="w-3 h-3" />
          </button>
        </div>
        <p className="text-xs text-slate-400 mt-0.5 mb-4">Look up any word, anytime!</p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Search bar */}
          <form onSubmit={handleQuickDictionarySearch} className="flex-1 w-full flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={quickWord}
                onChange={e => setQuickWord(e.target.value)}
                placeholder="Enter a word..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#F6F7FB] border border-transparent focus:border-brand-300 focus:bg-white rounded-full text-xs font-medium text-slate-800 outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#5452F6] hover:bg-brand-700 text-white text-xs font-bold rounded-full shadow-sm transition-all"
            >
              Search
            </button>
          </form>

          {/* Cute ABC book illustration matching reference */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-amber-50/70 rounded-2xl border border-amber-100 text-amber-700">
            <span className="text-xs font-bold">A B C</span>
            <div className="w-8 h-8 rounded-lg bg-amber-200/60 flex items-center justify-center text-amber-800">
              📖
            </div>
          </div>
        </div>

        {/* Quick Result Drawer */}
        {quickLookupResult && (
          <div className="mt-4 p-4 rounded-2xl bg-brand-50/60 border border-brand-100 flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-sm font-extrabold text-slate-800 capitalize">
                  {quickLookupResult.word}
                </span>
                <span className="text-xs font-mono text-slate-500">{quickLookupResult.ipa}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-100 text-brand-700 capitalize">
                  {quickLookupResult.wordType}
                </span>
                <button
                  onClick={() => handleAudioSpeak(quickLookupResult.word)}
                  className="p-1 rounded-full bg-white hover:bg-brand-100 text-brand-600 transition-colors shadow-xs"
                  title="Listen pronunciation"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs font-semibold text-purple-800">
                FR: {quickLookupResult.frenchTranslation}
              </p>
              <p className="text-xs text-slate-600">{quickLookupResult.englishDefinition}</p>
            </div>
            <button
              onClick={() => setActiveNav('English Dictionary')}
              className="text-xs font-bold text-brand-600 underline shrink-0 ml-4"
            >
              Details & Examples
            </button>
          </div>
        )}
      </div>

      {/* 5. Recently Added Lessons */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 font-sans">Recently Added Lessons</h2>
          <button
            onClick={() => setActiveNav('Lessons & Exercises')}
            className="text-xs font-bold text-brand-600 hover:underline flex items-center gap-1"
          >
            All Lessons <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lessons.slice(0, 2).map(lesson => {
            const isCompleted = currentUser.completedLessons.includes(lesson.id);
            return (
              <div
                key={lesson.id}
                onClick={() => {
                  setActiveNav('Lessons & Exercises');
                  setSelectedLessonId(lesson.id);
                }}
                className="p-4 bg-white rounded-2xl border border-slate-100 shadow-soft hover:shadow-hover transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-purple-100 text-purple-700">
                      Level {lesson.level}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {lesson.durationMinutes} min
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-800 leading-snug line-clamp-1 mb-1">
                    {lesson.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{lesson.shortDescription}</p>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-50">
                  <span className="text-[11px] font-medium text-slate-400">By {lesson.authorName}</span>
                  {isCompleted ? (
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-brand-600 flex items-center gap-1">
                      Start Lesson <ArrowRight className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
