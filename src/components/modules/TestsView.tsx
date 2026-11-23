import React, { useState, useEffect } from 'react';
import {
  CheckSquare,
  Award,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { AssessmentTest, EnglishLevel } from '../../types';

export const TestsView: React.FC = () => {
  const {
    currentUser,
    tests,
    submitTestScore,
    selectedTestId,
    setSelectedTestId
  } = useApp();

  const [activeTest, setActiveTest] = useState<AssessmentTest | null>(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [calculatedLevel, setCalculatedLevel] = useState<EnglishLevel>('B1');

  // Trigger test runner if selectedTestId is set
  useEffect(() => {
    if (selectedTestId) {
      const found = tests.find(t => t.id === selectedTestId);
      if (found) {
        startTest(found);
      }
    }
  }, [selectedTestId, tests]);

  // Timer countdown
  useEffect(() => {
    if (!activeTest || !activeTest.isTimed || isTestCompleted) return;
    if (timeLeft <= 0) {
      handleFinishTest();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [activeTest, timeLeft, isTestCompleted]);

  const startTest = (test: AssessmentTest) => {
    setActiveTest(test);
    setCurrentQIndex(0);
    setSelectedAnswers({});
    setTimeLeft(test.durationMinutes * 60);
    setIsTestCompleted(false);
    setFinalScore(0);
  };

  const handleFinishTest = () => {
    if (!activeTest) return;
    let correct = 0;
    activeTest.questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.correctIndex) {
        correct++;
      }
    });

    const scorePct = Math.round((correct / activeTest.questions.length) * 100);
    setFinalScore(scorePct);

    // Determine level recommendation
    let achieved: EnglishLevel = 'B1';
    if (activeTest.type === 'placement') {
      if (scorePct >= 90) achieved = 'C2';
      else if (scorePct >= 80) achieved = 'C1';
      else if (scorePct >= 65) achieved = 'B2';
      else if (scorePct >= 50) achieved = 'B1';
      else if (scorePct >= 35) achieved = 'A2';
      else achieved = 'A1';
    } else {
      achieved = activeTest.targetLevel || 'B1';
    }
    setCalculatedLevel(achieved);
    setIsTestCompleted(true);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}

    submitTestScore(activeTest.id, correct, activeTest.questions.length, achieved);
  };

  const placementTest = tests.find(t => t.type === 'placement');
  const levelTests = tests.filter(t => t.type === 'level');

  return (
    <div className="space-y-7 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight font-sans">
          Tests & CEFR Assessments
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Evaluate your proficiency across Grammar, Vocabulary, Reading, and Listening with real-time scoring.
        </p>
      </div>

      {/* SECTION A: PLACEMENT TEST HERO BANNER */}
      {placementTest && (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900 via-brand-800 to-indigo-900 p-6 sm:p-8 text-white shadow-card">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-brand-500/20 to-transparent pointer-events-none" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-bold uppercase tracking-wider backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Diagnostic Test
              </div>
              <h2 className="text-xl sm:text-2xl font-black">{placementTest.title}</h2>
              <p className="text-xs text-purple-100 leading-relaxed font-medium">
                {placementTest.description}
              </p>

              <div className="flex items-center gap-4 text-xs font-semibold text-purple-200 pt-2">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-amber-300" /> {placementTest.durationMinutes} Minutes Timed
                </span>
                <span className="flex items-center gap-1">
                  <CheckSquare className="w-4 h-4 text-amber-300" /> 5 Linguistic Competencies
                </span>
              </div>
            </div>

            <button
              onClick={() => startTest(placementTest)}
              className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-900 rounded-2xl text-xs font-black shadow-lg hover:shadow-xl transition-all flex items-center gap-2 shrink-0 transform hover:scale-105"
            >
              Start Placement Test <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* SECTION B: 6 CEFR LEVEL TESTS (A1 - C2) */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-4 font-sans">
          CEFR Level Tests (A1 to C2)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {levelTests.map(test => {
            const result = currentUser.testResults.find(r => r.testId === test.id);
            const isPassed = result && Math.round((result.score / result.maxScore) * 100) >= (test.passingScorePercent || 70);

            return (
              <div
                key={test.id}
                className="bg-white rounded-3xl border border-slate-100 shadow-soft hover:shadow-hover transition-all p-5 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-brand-50 text-brand-700 border border-brand-200">
                      Level {test.targetLevel}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {test.durationMinutes}m
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-800 leading-snug">
                    {test.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {test.description}
                  </p>

                  <div className="mt-4 p-2.5 rounded-xl bg-slate-50 text-[11px] font-semibold text-slate-600 flex items-center justify-between">
                    <span>Passing threshold:</span>
                    <span className="font-bold text-slate-800">{test.passingScorePercent || 75}%</span>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-50 flex items-center justify-between">
                  {result ? (
                    <div className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                      <CheckCircle2 className="w-4 h-4" /> Passed ({Math.round((result.score / result.maxScore) * 100)}%)
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 font-medium">Not taken yet</span>
                  )}

                  <button
                    onClick={() => startTest(test)}
                    className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1"
                  >
                    {result ? 'Retake' : 'Take Test'} <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* TEST RUNNER MODAL */}
      {activeTest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
            {/* Header with Countdown */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <span className="text-[10px] font-black uppercase text-brand-600">
                  {activeTest.type === 'placement' ? 'Diagnostic Assessment' : `CEFR ${activeTest.targetLevel}`}
                </span>
                <h3 className="font-extrabold text-sm text-slate-900">{activeTest.title}</h3>
              </div>

              <div className="flex items-center gap-3">
                {activeTest.isTimed && !isTestCompleted && (
                  <div className="px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 font-mono text-xs font-bold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>
                      {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                )}
                <button
                  onClick={() => {
                    setActiveTest(null);
                    setSelectedTestId(null);
                  }}
                  className="p-1.5 rounded-full hover:bg-slate-200 text-slate-400 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6">
              {!isTestCompleted ? (
                <div>
                  {/* Progress bar */}
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-2">
                    <span>Question {currentQIndex + 1} of {activeTest.questions.length}</span>
                    <span>{Math.round(((currentQIndex + 1) / activeTest.questions.length) * 100)}% Complete</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full mb-6 overflow-hidden">
                    <div
                      className="h-full bg-brand-600 transition-all duration-300"
                      style={{
                        width: `${((currentQIndex + 1) / activeTest.questions.length) * 100}%`
                      }}
                    />
                  </div>

                  {(() => {
                    const q = activeTest.questions[currentQIndex];
                    return (
                      <div className="space-y-4">
                        <span className="px-2.5 py-1 rounded-lg bg-brand-50 text-brand-700 text-[10px] font-black uppercase">
                          Competency: {q.category}
                        </span>
                        <h4 className="text-base font-bold text-slate-800 leading-snug">{q.prompt}</h4>

                        {/* Options */}
                        <div className="space-y-2.5 mt-4">
                          {q.options.map((opt, oIdx) => {
                            const isSelected = selectedAnswers[currentQIndex] === oIdx;
                            return (
                              <button
                                key={oIdx}
                                onClick={() => setSelectedAnswers({ ...selectedAnswers, [currentQIndex]: oIdx })}
                                className={`w-full text-left p-3.5 rounded-2xl border text-xs font-semibold transition-all flex items-center justify-between ${
                                  isSelected
                                    ? 'bg-brand-50 border-brand-500 text-brand-800 font-bold ring-2 ring-brand-300'
                                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                                }`}
                              >
                                <span>{opt}</span>
                                <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                                  isSelected ? 'border-brand-600 bg-brand-600 text-white' : 'border-slate-300 text-slate-400'
                                }`}>
                                  {String.fromCharCode(65 + oIdx)}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              ) : (
                /* Test Summary & CEFR Level Award */
                <div className="text-center py-6 space-y-5">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 text-slate-900 flex items-center justify-center mx-auto shadow-lg">
                    <Award className="w-10 h-10" />
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-slate-900">Assessment Complete!</h3>
                    <p className="text-xs text-slate-500 mt-1">Here is your verified evaluation.</p>
                  </div>

                  <div className="p-5 bg-brand-50 rounded-3xl border border-brand-100 max-w-sm mx-auto space-y-2">
                    <span className="text-4xl font-black text-brand-700 font-sans">{finalScore}%</span>
                    <p className="text-xs font-bold text-slate-600">Total Score</p>
                    <div className="pt-2 border-t border-brand-200/50">
                      <p className="text-[11px] text-brand-600 font-bold uppercase tracking-wider">
                        Assessed English Level:
                      </p>
                      <span className="text-xl font-black text-purple-700">Level {calculatedLevel}</span>
                    </div>
                  </div>

                  {/* Answers review list */}
                  <div className="text-left max-h-48 overflow-y-auto space-y-2 p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                    <p className="font-bold text-slate-700 mb-2">Question Analysis:</p>
                    {activeTest.questions.map((q, i) => {
                      const isCorrect = selectedAnswers[i] === q.correctIndex;
                      return (
                        <div key={i} className="p-2 rounded-xl bg-white border border-slate-100 text-[11px]">
                          <div className="flex items-center gap-1.5 font-bold">
                            {isCorrect ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                            )}
                            <span>{q.prompt}</span>
                          </div>
                          <p className="text-slate-500 mt-1">{q.explanation}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              {!isTestCompleted ? (
                <>
                  <button
                    disabled={currentQIndex === 0}
                    onClick={() => setCurrentQIndex(i => i - 1)}
                    className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 disabled:opacity-30"
                  >
                    Previous
                  </button>

                  {currentQIndex < activeTest.questions.length - 1 ? (
                    <button
                      onClick={() => setCurrentQIndex(i => i + 1)}
                      className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1"
                    >
                      Next <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={handleFinishTest}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black transition-all shadow-sm"
                    >
                      Submit Test
                    </button>
                  )}
                </>
              ) : (
                <button
                  onClick={() => {
                    setActiveTest(null);
                    setSelectedTestId(null);
                  }}
                  className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-sm"
                >
                  Return to Tests
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
