import React, { useState } from 'react';
import {
  BookMarked,
  Clock,
  CheckCircle2,
  HelpCircle,
  Volume2,
  Sparkles,
  ArrowRight,
  X,
  Type
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ReadingMaterial } from '../../types';

export const ReadingView: React.FC = () => {
  const { readingMaterials } = useApp();

  const [activeReading, setActiveReading] = useState<ReadingMaterial>(readingMaterials[0]);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [activeVocabPopup, setActiveVocabPopup] = useState<any>(null);

  // Comprehension questions state
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelectAnswer = (qId: string, optIndex: number) => {
    if (isSubmitted) return;
    setUserAnswers({ ...userAnswers, [qId]: optIndex });
  };

  const handleSubmitQuiz = () => {
    let correct = 0;
    activeReading.questions.forEach(q => {
      if (userAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });
    const finalPct = Math.round((correct / activeReading.questions.length) * 100);
    setScore(finalPct);
    setIsSubmitted(true);
  };

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight font-sans">
          Reading & Comprehension Lab
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Read graded authentic articles, click terms for instant French translations, and test your comprehension.
        </p>
      </div>

      {/* Grid of articles to select from */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {readingMaterials.map(mat => {
          const isSelected = mat.id === activeReading.id;

          return (
            <div
              key={mat.id}
              onClick={() => {
                setActiveReading(mat);
                setIsSubmitted(false);
                setUserAnswers({});
                setActiveVocabPopup(null);
              }}
              className={`p-4 rounded-3xl border transition-all cursor-pointer flex gap-4 ${
                isSelected
                  ? 'bg-brand-50/70 border-brand-300 ring-2 ring-brand-200'
                  : 'bg-white border-slate-100 hover:shadow-soft'
              }`}
            >
              <img
                src={mat.coverImage}
                alt={mat.title}
                className="w-24 h-24 rounded-2xl object-cover shrink-0"
              />
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-purple-100 text-purple-700">
                      Level {mat.level}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {mat.estimatedMinutes} min read
                    </span>
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-800 line-clamp-1">
                    {mat.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                    {mat.shortDescription}
                  </p>
                </div>
                <span className="text-xs font-bold text-brand-600 mt-2 flex items-center gap-1">
                  {isSelected ? 'Currently Reading 📖' : 'Open Article'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ACTIVE ARTICLE READER */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-card p-6 sm:p-8 space-y-6">
        {/* Article Toolbar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600">
              {activeReading.category} • Level {activeReading.level}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 leading-snug">
              {activeReading.title}
            </h2>
          </div>

          {/* Font size toggle */}
          <button
            onClick={() => setFontSize(f => (f === 'normal' ? 'large' : 'normal'))}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-colors"
            title="Toggle Text Size"
          >
            <Type className="w-4 h-4" />
            <span>{fontSize === 'normal' ? 'Larger Text' : 'Standard Text'}</span>
          </button>
        </div>

        {/* Vocabulary Highlights Quick Bar */}
        <div className="p-3 bg-brand-50/60 rounded-2xl border border-brand-100 flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-brand-800 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" /> Click any highlighted term:
          </span>
          {activeReading.vocabularyHighlights.map((vocab, vIdx) => (
            <button
              key={vIdx}
              onClick={() => setActiveVocabPopup(vocab)}
              className="px-2.5 py-1 bg-white hover:bg-purple-100 border border-purple-200 text-purple-800 text-[11px] font-bold rounded-lg transition-all shadow-xs"
            >
              {vocab.word}
            </button>
          ))}
        </div>

        {/* Vocab Popup Tooltip */}
        {activeVocabPopup && (
          <div className="p-4 bg-purple-900 text-white rounded-2xl shadow-xl flex items-start justify-between animate-in fade-in duration-150">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-sm font-black capitalize">{activeVocabPopup.word}</span>
                {activeVocabPopup.phonetics && (
                  <span className="text-xs font-mono text-purple-200">{activeVocabPopup.phonetics}</span>
                )}
                <button
                  onClick={() => handleSpeak(activeVocabPopup.word)}
                  className="p-1 rounded-full bg-white/20 hover:bg-white/30 text-white"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs font-bold text-amber-300">
                FR: {activeVocabPopup.frenchTranslation}
              </p>
              <p className="text-xs text-purple-100">{activeVocabPopup.englishDef}</p>
            </div>
            <button
              onClick={() => setActiveVocabPopup(null)}
              className="p-1 text-purple-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Full Passage */}
        <div
          className={`leading-relaxed text-slate-800 font-medium whitespace-pre-line ${
            fontSize === 'large' ? 'text-base sm:text-lg leading-loose' : 'text-sm sm:text-base'
          }`}
        >
          {activeReading.passage}
        </div>

        {/* READING COMPREHENSION QUIZ */}
        <div className="pt-6 border-t border-slate-100 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-brand-600" /> Reading Comprehension Quiz
            </h3>
            {isSubmitted && (
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-black">
                Score: {score}%
              </span>
            )}
          </div>

          <div className="space-y-4">
            {activeReading.questions.map((q, idx) => (
              <div key={q.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                <p className="text-xs font-bold text-slate-800">
                  {idx + 1}. {q.prompt}
                </p>

                <div className="space-y-2">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = userAnswers[q.id] === oIdx;
                    let btnClass = 'bg-white border-slate-200 text-slate-700 hover:bg-brand-50/50';

                    if (isSubmitted) {
                      if (oIdx === q.correctIndex) {
                        btnClass = 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold';
                      } else if (isSelected) {
                        btnClass = 'bg-red-50 border-red-500 text-red-800';
                      }
                    } else if (isSelected) {
                      btnClass = 'bg-brand-50 border-brand-500 text-brand-800 font-bold ring-1 ring-brand-300';
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={isSubmitted}
                        onClick={() => handleSelectAnswer(q.id, oIdx)}
                        className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition-all ${btnClass}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {isSubmitted && (
                  <p className="text-[11px] text-slate-600 italic mt-2 bg-white p-2.5 rounded-xl border border-slate-100">
                    Explanation: {q.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>

          {!isSubmitted ? (
            <button
              onClick={handleSubmitQuiz}
              disabled={Object.keys(userAnswers).length === 0}
              className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 disabled:bg-slate-200 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
            >
              Submit Answers & Evaluate
            </button>
          ) : (
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Answers evaluated successfully!
              </span>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setUserAnswers({});
                }}
                className="text-xs font-bold text-emerald-700 underline"
              >
                Retry Quiz
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
