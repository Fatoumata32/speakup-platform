import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Download,
  CheckCircle2,
  Edit3,
  ExternalLink,
  BookOpen,
  Sparkles,
  ArrowRight,
  X,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { WorkbookItem } from '../../types';

export const WorkbookView: React.FC = () => {
  const {
    currentUser,
    workbooks,
    markWorkbookCompleted,
    selectedWorkbookId,
    setSelectedWorkbookId
  } = useApp();

  const [activeWb, setActiveWb] = useState<WorkbookItem | null>(null);
  const [digitalAnswers, setDigitalAnswers] = useState<Record<string, string>>({});
  const [showModelAnswers, setShowModelAnswers] = useState<Record<string, boolean>>({});

  const handleOpenWorkbook = (wb: WorkbookItem) => {
    setActiveWb(wb);
    setDigitalAnswers({});
    setShowModelAnswers({});
  };

  const handleToggleModelAnswer = (qId: string) => {
    setShowModelAnswers(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleSaveAndComplete = (wbId: string) => {
    markWorkbookCompleted(wbId);
    alert('Great job! Your digital worksheet answers have been recorded.');
    setActiveWb(null);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight font-sans">
          Workbook & Interactive Worksheets
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Download PDF worksheets or complete practical grammar and sentence construction drills directly on screen.
        </p>
      </div>

      {/* Worksheets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {workbooks.map(wb => {
          const isDone = currentUser.completedWorkbooks.includes(wb.id);

          return (
            <div
              key={wb.id}
              className="bg-white rounded-3xl border border-slate-100 shadow-soft hover:shadow-hover transition-all overflow-hidden flex flex-col justify-between group"
            >
              {/* Preview Image with Diagram */}
              <div
                onClick={() => handleOpenWorkbook(wb)}
                className="h-44 bg-slate-50 cursor-pointer overflow-hidden p-3 flex items-center justify-center border-b border-slate-100 relative"
              >
                <img
                  src={wb.previewImage}
                  alt={wb.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 rounded-lg text-[10px] font-black uppercase text-brand-700 shadow-xs">
                  Level {wb.level}
                </span>

                {isDone && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 bg-emerald-500 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                  </span>
                )}
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600">
                    {wb.category}
                  </span>
                  <h3
                    onClick={() => handleOpenWorkbook(wb)}
                    className="font-bold text-sm sm:text-base text-slate-800 mt-1 cursor-pointer hover:text-brand-600 leading-snug line-clamp-1"
                  >
                    {wb.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                    {wb.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-5 pt-3 border-t border-slate-50 flex items-center justify-between">
                  <a
                    href={wb.pdfDownloadUrl}
                    download
                    className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-colors flex items-center gap-1 text-xs font-bold"
                    title="Download Worksheet File"
                  >
                    <Download className="w-4 h-4" /> PDF
                  </a>

                  <button
                    onClick={() => handleOpenWorkbook(wb)}
                    className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Fill Digitally
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* INTERACTIVE DIGITAL WORKBOOK RUNNER MODAL */}
      {activeWb && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <span className="text-[10px] font-black uppercase text-brand-600">
                  {activeWb.category} • Level {activeWb.level}
                </span>
                <h3 className="font-extrabold text-base text-slate-900">{activeWb.title}</h3>
              </div>
              <button onClick={() => setActiveWb(null)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Scrollable Questions */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Infographic Preview */}
              <div className="p-3 bg-purple-50/50 rounded-2xl border border-purple-100 text-center">
                <img
                  src={activeWb.previewImage}
                  alt="Worksheet Infographic"
                  className="max-h-60 mx-auto object-contain rounded-xl shadow-xs"
                />
              </div>

              {/* Digital fill-in exercises */}
              {activeWb.interactiveExercises && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-brand-600" /> Digital Interactive Worksheet Practice
                  </h4>

                  {activeWb.interactiveExercises.map((ex, idx) => (
                    <div
                      key={ex.id}
                      className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3 text-xs"
                    >
                      <p className="font-bold text-brand-700">{idx + 1}. {ex.instructions}</p>
                      <p className="font-medium text-slate-800 leading-relaxed text-sm bg-white p-3 rounded-xl border border-slate-100">
                        {ex.prompt}
                      </p>

                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold text-slate-600">Your Answer:</label>
                        <input
                          type="text"
                          value={digitalAnswers[ex.id] || ''}
                          onChange={e => setDigitalAnswers({ ...digitalAnswers, [ex.id]: e.target.value })}
                          placeholder="Type your response here..."
                          className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold focus:border-brand-500 outline-none"
                        />
                      </div>

                      {/* Check answer toggle */}
                      <div className="flex items-center justify-between pt-1">
                        <button
                          type="button"
                          onClick={() => handleToggleModelAnswer(ex.id)}
                          className="text-[11px] font-bold text-brand-600 hover:underline"
                        >
                          {showModelAnswers[ex.id] ? 'Hide Model Solution' : 'Reveal Model Solution'}
                        </button>
                      </div>

                      {showModelAnswers[ex.id] && (
                        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1">
                          <p className="font-bold">Correct Sample Answer: {ex.sampleAnswer}</p>
                          {ex.notes && <p className="text-[11px] text-emerald-700 italic">Teacher Note: {ex.notes}</p>}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setActiveWb(null)}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800"
              >
                Close
              </button>

              <button
                onClick={() => handleSaveAndComplete(activeWb.id)}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" /> Save Worksheet & Mark Complete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
