import React, { useState } from 'react';
import {
  Search,
  Volume2,
  Bookmark,
  BookmarkCheck,
  Clock,
  Sparkles,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Languages,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DictionaryEntry } from '../../types';

export const DictionaryView: React.FC = () => {
  const {
    currentUser,
    dictionary,
    toggleSaveWord
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeEntry, setActiveEntry] = useState<DictionaryEntry>(dictionary[0]);
  const [searchHistory, setSearchHistory] = useState<string[]>([
    'resilient',
    'serendipity',
    'eloquent',
    'perseverance'
  ]);
  const [isLoadingApi, setIsLoadingApi] = useState(false);

  // Filter local dictionary
  const suggestions = searchQuery.trim()
    ? dictionary.filter(d =>
        d.word.toLowerCase().startsWith(searchQuery.trim().toLowerCase())
      )
    : [];

  const handleSearchWord = async (wordToSearch: string) => {
    const q = wordToSearch.trim().toLowerCase();
    if (!q) return;

    // Check if in local list
    const found = dictionary.find(d => d.word.toLowerCase() === q);
    if (found) {
      setActiveEntry(found);
      updateHistory(found.word);
      return;
    }

    // Try fetching from Free Dictionary API
    setIsLoadingApi(true);
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(q)}`);
      if (res.ok) {
        const data = await res.json();
        const first = data[0];
        const meaning = first?.meanings?.[0];
        const definition = meaning?.definitions?.[0]?.definition || 'Definition available.';
        const example = meaning?.definitions?.[0]?.example || `You can use "${q}" in conversational English.`;
        const ipa = first?.phonetic || first?.phonetics?.[0]?.text || `/${q}/`;
        const partOfSpeech = meaning?.partOfSpeech || 'noun';
        const syns = meaning?.synonyms?.slice(0, 4) || [];
        const ants = meaning?.antonyms?.slice(0, 3) || [];

        const newEntry: DictionaryEntry = {
          word: first.word,
          ipa,
          wordType: partOfSpeech as any,
          frenchTranslation: `(Traduction FR de "${first.word}")`,
          englishDefinition: definition,
          exampleEn: example,
          exampleFr: `Exemple traduit: ${example}`,
          synonyms: syns,
          antonyms: ants
        };

        setActiveEntry(newEntry);
        updateHistory(newEntry.word);
      } else {
        // Fallback custom entry
        const fallbackEntry: DictionaryEntry = {
          word: q,
          ipa: `/${q}/`,
          wordType: 'noun',
          frenchTranslation: `Terme anglais: "${q}"`,
          englishDefinition: `Vocabulary item "${q}" entered by student. Practice speaking and sentence building.`,
          exampleEn: `We practiced using the word "${q}" during the SpeakUp conversation club.`,
          exampleFr: `Nous nous sommes entraînés à utiliser le mot "${q}" au club de conversation SpeakUp.`,
          synonyms: [],
          antonyms: []
        };
        setActiveEntry(fallbackEntry);
        updateHistory(q);
      }
    } catch {
      // Fallback
      setActiveEntry({
        word: q,
        ipa: `/${q}/`,
        wordType: 'noun',
        frenchTranslation: `Terme: ${q}`,
        englishDefinition: `Definition for ${q}.`,
        exampleEn: `Practice using "${q}" regularly.`,
        exampleFr: `Entraînez-vous à utiliser "${q}" régulièrement.`,
        synonyms: [],
        antonyms: []
      });
      updateHistory(q);
    } finally {
      setIsLoadingApi(false);
    }
  };

  const updateHistory = (word: string) => {
    setSearchHistory(prev => [word, ...prev.filter(w => w !== word)].slice(0, 8));
  };

  const handleSpeak = (word: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const isFavorite = currentUser.savedWords.includes(activeEntry.word.toLowerCase());

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight font-sans">
          English-to-French Interactive Dictionary
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Look up definitions, listen to native phonetic pronunciation, learn idiomatic French translations and examples.
        </p>
      </div>

      {/* Prominent Search Bar with Autocomplete Suggestions */}
      <div className="relative">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSearchWord(searchQuery);
          }}
          className="flex items-center gap-3 p-2 bg-white rounded-3xl border border-slate-200 shadow-soft focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-200 transition-all"
        >
          <div className="pl-4 text-slate-400">
            <Search className="w-5 h-5 text-brand-600" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Type any English word (e.g., resilient, thrive, empower, serendipity)..."
            className="flex-1 py-2 text-sm sm:text-base font-semibold text-slate-800 placeholder-slate-400 outline-none"
          />
          <button
            type="submit"
            disabled={isLoadingApi}
            className="px-7 py-3 bg-[#5452F6] hover:bg-brand-700 disabled:bg-slate-300 text-white text-xs sm:text-sm font-extrabold rounded-full shadow-sm transition-all"
          >
            {isLoadingApi ? 'Searching...' : 'Search'}
          </button>
        </form>

        {/* Autocomplete Dropdown */}
        {searchQuery.trim().length > 0 && suggestions.length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-30 max-h-56 overflow-y-auto">
            {suggestions.map(s => (
              <div
                key={s.word}
                onClick={() => {
                  setActiveEntry(s);
                  setSearchQuery('');
                  updateHistory(s.word);
                }}
                className="p-2.5 rounded-xl hover:bg-brand-50 cursor-pointer flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-slate-800 capitalize">{s.word}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{s.ipa}</span>
                </div>
                <span className="text-xs text-purple-700 font-medium">FR: {s.frenchTranslation}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Entry Display Card */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-card p-6 sm:p-8 space-y-6">
        {/* Entry Header: Word, IPA, Pronounce & Bookmark */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight capitalize font-sans">
                {activeEntry.word}
              </h2>
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-purple-100 text-purple-700">
                {activeEntry.wordType}
              </span>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <span className="text-sm font-mono text-slate-500 font-bold">{activeEntry.ipa}</span>
              <button
                onClick={() => handleSpeak(activeEntry.word)}
                className="p-2 rounded-full bg-brand-50 hover:bg-brand-100 text-brand-600 transition-colors flex items-center gap-1.5 text-xs font-bold"
                title="Listen native pronunciation"
              >
                <Volume2 className="w-4 h-4" /> Listen
              </button>
            </div>
          </div>

          <button
            onClick={() => toggleSaveWord(activeEntry.word)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all ${
              isFavorite
                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {isFavorite ? (
              <>
                <BookmarkCheck className="w-4 h-4 text-amber-600 fill-amber-600" /> Saved to Favorites
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4" /> Save Word
              </>
            )}
          </button>
        </div>

        {/* French Translation & English Definition */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100">
            <span className="text-[10px] font-black uppercase tracking-wider text-purple-700">
              French Translation (Traduction Française)
            </span>
            <p className="text-base font-extrabold text-purple-950 mt-1">
              {activeEntry.frenchTranslation}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-brand-50/60 border border-brand-100">
            <span className="text-[10px] font-black uppercase tracking-wider text-brand-700">
              English Definition
            </span>
            <p className="text-xs sm:text-sm font-semibold text-slate-800 mt-1 leading-relaxed">
              {activeEntry.englishDefinition}
            </p>
          </div>
        </div>

        {/* Example Sentences */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Example Sentences & Usage
          </h3>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="flex items-start gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-600 shrink-0 mt-1.5" />
              <p className="text-xs sm:text-sm font-bold text-slate-800 italic">
                "{activeEntry.exampleEn}"
              </p>
            </div>
            <div className="pl-4 text-xs font-semibold text-purple-800">
              FR: "{activeEntry.exampleFr}"
            </div>
          </div>
        </div>

        {/* Synonyms & Antonyms */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {activeEntry.synonyms && activeEntry.synonyms.length > 0 && (
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 mb-2">
                Synonyms (Mots similaires)
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeEntry.synonyms.map(syn => (
                  <button
                    key={syn}
                    onClick={() => handleSearchWord(syn)}
                    className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-bold transition-colors"
                  >
                    {syn}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeEntry.antonyms && activeEntry.antonyms.length > 0 && (
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-red-700 mb-2">
                Antonyms (Mots contraires)
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeEntry.antonyms.map(ant => (
                  <button
                    key={ant}
                    onClick={() => handleSearchWord(ant)}
                    className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-800 border border-red-200 rounded-lg text-xs font-bold transition-colors"
                  >
                    {ant}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RECENT SEARCHES & FAVORITES DOCK */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Recent Searches */}
        <div className="p-5 bg-white rounded-3xl border border-slate-100 shadow-soft">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-slate-400" /> Recent Lookups
          </h3>
          <div className="flex flex-wrap gap-2">
            {searchHistory.map(w => (
              <button
                key={w}
                onClick={() => handleSearchWord(w)}
                className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-brand-50 hover:text-brand-700 text-slate-700 text-xs font-bold border border-slate-200/60 transition-colors capitalize"
              >
                {w}
              </button>
            ))}
          </div>
        </div>

        {/* Favorite Saved Vocabulary */}
        <div className="p-5 bg-white rounded-3xl border border-slate-100 shadow-soft">
          <h3 className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Bookmark className="w-4 h-4 fill-amber-500 text-amber-500" /> My Saved Words ({currentUser.savedWords.length})
          </h3>
          {currentUser.savedWords.length === 0 ? (
            <p className="text-xs text-slate-400">Click the bookmark icon on any word to save it here.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {currentUser.savedWords.map(w => (
                <button
                  key={w}
                  onClick={() => handleSearchWord(w)}
                  className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200 transition-colors capitalize"
                >
                  {w} ⭐
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
