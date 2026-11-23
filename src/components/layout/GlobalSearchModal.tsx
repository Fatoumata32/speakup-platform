import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, CheckSquare, Library, Languages, Calendar, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GlobalSearchModal: React.FC = () => {
  const {
    isGlobalSearchOpen,
    setIsGlobalSearchOpen,
    lessons,
    exercises,
    books,
    dictionary,
    courses,
    setActiveNav,
    setSelectedLessonId,
    setSelectedExerciseId,
    setSelectedBookForKoko
  } = useApp();

  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === '/' || (e.ctrlKey && e.key === 'k')) && !isGlobalSearchOpen) {
        // Prevent default only if not typing in an input
        if (['INPUT', 'TEXTAREA'].indexOf((e.target as HTMLElement).tagName) === -1) {
          e.preventDefault();
          setIsGlobalSearchOpen(true);
        }
      }
      if (e.key === 'Escape' && isGlobalSearchOpen) {
        setIsGlobalSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGlobalSearchOpen, setIsGlobalSearchOpen]);

  if (!isGlobalSearchOpen) return null;

  const q = query.toLowerCase().trim();

  const matchedLessons = q ? lessons.filter(l => l.title.toLowerCase().includes(q) || l.category.toLowerCase().includes(q)) : [];
  const matchedExercises = q ? exercises.filter(e => e.title.toLowerCase().includes(q) || e.category.toLowerCase().includes(q)) : [];
  const matchedBooks = q ? books.filter(b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)) : [];
  const matchedDictionary = q ? dictionary.filter(d => d.word.toLowerCase().includes(q) || d.frenchTranslation.toLowerCase().includes(q)) : [];
  const matchedCourses = q ? courses.filter(c => c.title.toLowerCase().includes(q) || c.teacherName.toLowerCase().includes(q)) : [];

  const totalResults = matchedLessons.length + matchedExercises.length + matchedBooks.length + matchedDictionary.length + matchedCourses.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Input Field */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-brand-600 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Type to search lessons, grammar topics, books, dictionary..."
            className="flex-1 text-base font-medium text-slate-800 placeholder-slate-400 outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsGlobalSearchOpen(false)}
            className="px-2.5 py-1 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg"
          >
            Esc
          </button>
        </div>

        {/* Results Area */}
        <div className="p-4 overflow-y-auto space-y-4">
          {!query && (
            <div className="text-center py-10">
              <p className="text-sm font-semibold text-slate-600">Quick Searches</p>
              <div className="flex flex-wrap gap-2 justify-center mt-3">
                {['Tenses', 'Phrasal Verbs', 'Business English', 'Pronunciation', 'Placement Test', 'Resilient'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 text-xs font-medium bg-brand-50 hover:bg-brand-100 text-brand-700 rounded-full transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && totalResults === 0 && (
            <div className="text-center py-12 text-slate-400 text-sm">
              No matching resources found for "{query}". Try checking the English Dictionary!
            </div>
          )}

          {/* Lessons */}
          {matchedLessons.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-brand-600" /> Lessons ({matchedLessons.length})
              </h4>
              <div className="space-y-1.5">
                {matchedLessons.map(l => (
                  <div
                    key={l.id}
                    onClick={() => {
                      setActiveNav('Lessons & Exercises');
                      setSelectedLessonId(l.id);
                      setIsGlobalSearchOpen(false);
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-brand-50 cursor-pointer transition-colors group"
                  >
                    <div>
                      <p className="text-xs font-bold text-slate-800 group-hover:text-brand-700">{l.title}</p>
                      <p className="text-[11px] text-slate-400">{l.category} • Level {l.level}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-600 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dictionary matches */}
          {matchedDictionary.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Languages className="w-3.5 h-3.5 text-purple-600" /> Dictionary Entries ({matchedDictionary.length})
              </h4>
              <div className="space-y-1.5">
                {matchedDictionary.map(d => (
                  <div
                    key={d.word}
                    onClick={() => {
                      setActiveNav('English Dictionary');
                      setIsGlobalSearchOpen(false);
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-purple-50 cursor-pointer transition-colors group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-800 capitalize">{d.word}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{d.ipa}</span>
                      </div>
                      <p className="text-[11px] text-purple-700 font-medium">FR: {d.frenchTranslation}</p>
                    </div>
                    <span className="text-xs text-brand-600 font-semibold group-hover:underline">Lookup</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Books matches */}
          {matchedBooks.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Library className="w-3.5 h-3.5 text-amber-600" /> Books & Koko ({matchedBooks.length})
              </h4>
              <div className="space-y-1.5">
                {matchedBooks.map(b => (
                  <div
                    key={b.id}
                    onClick={() => {
                      setActiveNav('Library');
                      setSelectedBookForKoko(b);
                      setIsGlobalSearchOpen(false);
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-amber-50 cursor-pointer transition-colors group"
                  >
                    <div>
                      <p className="text-xs font-bold text-slate-800 group-hover:text-amber-700">{b.title}</p>
                      <p className="text-[11px] text-slate-400">by {b.author} • {b.genre}</p>
                    </div>
                    <span className="text-xs text-amber-700 font-bold bg-amber-100 px-2 py-0.5 rounded-md">Read on Koko</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
