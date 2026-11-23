import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Play,
  FileText,
  Clock,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  Download,
  ArrowRight,
  Check,
  X,
  HelpCircle,
  Sparkles,
  Share2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EnglishLevel, Lesson, Exercise } from '../../types';

export const LessonsExercisesView: React.FC = () => {
  const {
    currentUser,
    lessons,
    exercises,
    addLesson,
    deleteLesson,
    markLessonCompleted,
    addExercise,
    submitExerciseResult,
    selectedLessonId,
    setSelectedLessonId,
    selectedExerciseId,
    setSelectedExerciseId
  } = useApp();

  const [activeTab, setActiveTab] = useState<'lessons' | 'exercises'>('lessons');
  const [selectedLevel, setSelectedLevel] = useState<EnglishLevel>('All');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Modals for admin/teacher creation
  const [isCreateLessonOpen, setIsCreateLessonOpen] = useState(false);
  const [isCreateExerciseOpen, setIsCreateExerciseOpen] = useState(false);

  // Lesson Create Form State
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonDesc, setNewLessonDesc] = useState('');
  const [newLessonLevel, setNewLessonLevel] = useState<EnglishLevel>('B1');
  const [newLessonCat, setNewLessonCat] = useState('Grammar & Fluency');
  const [newLessonDuration, setNewLessonDuration] = useState(25);
  const [newLessonYoutube, setNewLessonYoutube] = useState('');
  const [newLessonContent, setNewLessonContent] = useState('');
  const [newLessonObjectives, setNewLessonObjectives] = useState('');
  const [newLessonPresentation, setNewLessonPresentation] = useState('');

  // Exercise Runner State
  const activeExercise = exercises.find(e => e.id === selectedExerciseId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [matchingSelections, setMatchingSelections] = useState<Record<string, string>>({});
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [exerciseFinished, setExerciseFinished] = useState(false);
  const [exerciseScore, setExerciseScore] = useState(0);

  // Filter lessons
  const filteredLessons = lessons.filter(l => {
    const matchesLevel = selectedLevel === 'All' || l.level === selectedLevel;
    const matchesCat = !categoryFilter || l.category.toLowerCase().includes(categoryFilter.toLowerCase()) || l.title.toLowerCase().includes(categoryFilter.toLowerCase());
    return matchesLevel && matchesCat;
  });

  // Filter exercises
  const filteredExercises = exercises.filter(e => {
    const matchesLevel = selectedLevel === 'All' || e.level === selectedLevel;
    const matchesCat = !categoryFilter || e.category.toLowerCase().includes(categoryFilter.toLowerCase()) || e.title.toLowerCase().includes(categoryFilter.toLowerCase());
    return matchesLevel && matchesCat;
  });

  const getYoutubeVideoId = (url?: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const activeLesson = lessons.find(l => l.id === selectedLessonId);

  // Handle Lesson Submission
  const handleCreateLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLessonTitle.trim()) return;

    addLesson({
      title: newLessonTitle,
      shortDescription: newLessonDesc,
      level: newLessonLevel,
      category: newLessonCat,
      durationMinutes: Number(newLessonDuration),
      youtubeUrl: newLessonYoutube || undefined,
      objectives: newLessonObjectives.split('\n').filter(o => o.trim()),
      content: newLessonContent || 'Detailed lesson notes and practical grammar breakdown.',
      explanations: [
        { term: 'Key Rule', explanation: 'Essential grammar point for this unit.', example: 'Clear usage example.' }
      ],
      presentationUrl: newLessonPresentation || undefined,
      downloadableMaterials: [
        { name: `${newLessonTitle.slice(0, 20)}_Cheatsheet.pdf`, url: '#', size: '1.5 MB' }
      ],
      relatedExerciseIds: ['ex-1'],
      status: 'published'
    });

    setIsCreateLessonOpen(false);
    setNewLessonTitle('');
    setNewLessonDesc('');
    setNewLessonYoutube('');
    setNewLessonContent('');
  };

  // Handle Exercise Question Check
  const handleCheckQuestionAnswer = () => {
    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (!activeExercise) return;
    if (currentQuestionIndex < activeExercise.questions.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
      setIsAnswerSubmitted(false);
    } else {
      // Calculate final score
      let correctCount = 0;
      activeExercise.questions.forEach(q => {
        if (q.type === 'matching') {
          correctCount++;
        } else {
          const userAns = (userAnswers[q.id] || '').trim().toLowerCase();
          const correctAns = (q.correctAnswer as string).trim().toLowerCase();
          if (userAns === correctAns) {
            correctCount++;
          }
        }
      });
      const finalScore = Math.round((correctCount / activeExercise.questions.length) * 100);
      setExerciseScore(finalScore);
      setExerciseFinished(true);
      submitExerciseResult(activeExercise.id, finalScore);
    }
  };

  const startExercise = (ex: Exercise) => {
    setSelectedExerciseId(ex.id);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setMatchingSelections({});
    setIsAnswerSubmitted(false);
    setExerciseFinished(false);
    setExerciseScore(0);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header & Section Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight font-sans">
            Lessons & Exercises
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Structured English curriculum with video masterclasses, interactive quizzes, and downloadable slides.
          </p>
        </div>

        {/* Tab Toggle matching design */}
        <div className="flex items-center p-1 bg-white border border-slate-200 rounded-2xl shadow-xs">
          <button
            onClick={() => setActiveTab('lessons')}
            className={`px-5 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'lessons'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-brand-600'
            }`}
          >
            Lessons ({lessons.length})
          </button>
          <button
            onClick={() => setActiveTab('exercises')}
            className={`px-5 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'exercises'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-brand-600'
            }`}
          >
            Exercises ({exercises.length})
          </button>
        </div>
      </div>

      {/* Filter Bar: Level Chips + Search + Admin Action */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-100 shadow-soft">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(['All', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as EnglishLevel[]).map(lvl => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedLevel === lvl
                  ? 'bg-purple-100 text-brand-700 border border-brand-300 shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            placeholder="Filter by topic or title..."
            className="px-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 outline-none focus:border-brand-400 w-48"
          />

          {/* Teacher/Admin Create Button */}
          {(currentUser.role === 'teacher' || currentUser.role === 'admin') && (
            <button
              onClick={() => (activeTab === 'lessons' ? setIsCreateLessonOpen(true) : setIsCreateExerciseOpen(true))}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              {activeTab === 'lessons' ? 'New Lesson' : 'New Exercise'}
            </button>
          )}
        </div>
      </div>

      {/* SECTION A: LESSONS GRID */}
      {activeTab === 'lessons' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredLessons.map(lesson => {
            const isCompleted = currentUser.completedLessons.includes(lesson.id);
            const videoId = getYoutubeVideoId(lesson.youtubeUrl);
            const thumbnail = videoId
              ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
              : lesson.infographicImage || 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=400';

            return (
              <div
                key={lesson.id}
                className="bg-white rounded-3xl border border-slate-100 shadow-soft hover:shadow-hover transition-all duration-200 overflow-hidden flex flex-col justify-between group"
              >
                {/* Thumbnail Header */}
                <div
                  onClick={() => setSelectedLessonId(lesson.id)}
                  className="relative h-44 bg-slate-900 cursor-pointer overflow-hidden"
                >
                  <img
                    src={thumbnail}
                    alt={lesson.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 text-brand-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-brand-600 ml-0.5" />
                    </div>
                  </div>

                  {/* Level & Duration Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 text-[10px] font-black uppercase rounded-lg bg-white/95 text-brand-700 shadow-sm backdrop-blur-xs">
                      {lesson.level}
                    </span>
                    <span className="px-2 py-1 text-[10px] font-bold rounded-lg bg-black/60 text-white backdrop-blur-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {lesson.durationMinutes}m
                    </span>
                  </div>

                  {isCompleted && (
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-emerald-500 text-white text-[10px] font-bold flex items-center gap-1 shadow-sm">
                      <CheckCircle2 className="w-3 h-3" /> Completed
                    </div>
                  )}
                </div>

                {/* Content Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600">
                      {lesson.category}
                    </span>
                    <h3
                      onClick={() => setSelectedLessonId(lesson.id)}
                      className="font-bold text-sm sm:text-base text-slate-800 mt-1 leading-snug cursor-pointer hover:text-brand-600 line-clamp-2"
                    >
                      {lesson.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {lesson.shortDescription}
                    </p>
                  </div>

                  {/* Footer Meta */}
                  <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-400 text-[11px]">By {lesson.authorName}</span>
                    <div className="flex items-center gap-2">
                      {(currentUser.role === 'teacher' || currentUser.role === 'admin') && (
                        <button
                          onClick={() => deleteLesson(lesson.id)}
                          className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
                          title="Delete Lesson"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => setSelectedLessonId(lesson.id)}
                        className="px-3 py-1.5 rounded-xl bg-brand-50 hover:bg-brand-600 text-brand-600 hover:text-white transition-all text-xs font-bold flex items-center gap-1"
                      >
                        Study <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* SECTION B: EXERCISES GRID */}
      {activeTab === 'exercises' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredExercises.map(ex => {
            const userAttempt = currentUser.completedExercises.find(e => e.exerciseId === ex.id);

            return (
              <div
                key={ex.id}
                className="bg-white rounded-3xl border border-slate-100 shadow-soft hover:shadow-hover transition-all p-5 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-purple-100 text-purple-700">
                      Level {ex.level}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      ex.difficulty === 'Easy'
                        ? 'bg-emerald-100 text-emerald-700'
                        : ex.difficulty === 'Medium'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {ex.difficulty}
                    </span>
                  </div>

                  <span className="text-[11px] font-bold text-brand-600 uppercase tracking-wider">
                    {ex.category}
                  </span>
                  <h3 className="font-bold text-sm sm:text-base text-slate-800 mt-1 leading-snug">
                    {ex.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                    {ex.shortDescription}
                  </p>

                  <div className="mt-3 flex items-center gap-3 text-xs text-slate-400 font-medium">
                    <span className="flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5" /> {ex.questions.length} questions
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {ex.estimatedMinutes} mins
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-50 flex items-center justify-between">
                  {userAttempt ? (
                    <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4" /> Score: {userAttempt.score}%
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 font-medium">Not started</span>
                  )}

                  <button
                    onClick={() => startExercise(ex)}
                    className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1"
                  >
                    {userAttempt ? 'Retake' : 'Start Practice'} <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* DEDICATED LESSON DETAIL MODAL */}
      {activeLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-xl bg-purple-100 text-purple-700 text-xs font-black uppercase">
                  Level {activeLesson.level}
                </span>
                <span className="text-xs font-bold text-slate-500">{activeLesson.category}</span>
              </div>
              <button
                onClick={() => setSelectedLessonId(null)}
                className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  {activeLesson.title}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Published on {activeLesson.datePublished} by {activeLesson.authorName} • {activeLesson.durationMinutes} min study
                </p>
              </div>

              {/* YouTube Video Embed Player */}
              {activeLesson.youtubeUrl && (
                <div className="rounded-2xl overflow-hidden aspect-video bg-black shadow-lg">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${getYoutubeVideoId(activeLesson.youtubeUrl) || '0x64y7n6d3Q'}`}
                    title={activeLesson.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

              {/* Learning Objectives Checklist */}
              {activeLesson.objectives && activeLesson.objectives.length > 0 && (
                <div className="p-4 rounded-2xl bg-brand-50/60 border border-brand-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-800 mb-2.5 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-brand-600" /> Learning Objectives
                  </h4>
                  <ul className="space-y-2">
                    {activeLesson.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs font-medium text-slate-700">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Authentic Infographics if attached */}
              {activeLesson.infographicImage && (
                <div className="p-4 bg-purple-50/40 rounded-2xl border border-purple-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-800 mb-2">
                    Visual Grammar Diagram
                  </h4>
                  <div className="rounded-xl overflow-hidden border border-purple-200/50 shadow-sm max-h-96 flex items-center justify-center bg-white p-2">
                    <img
                      src={activeLesson.infographicImage}
                      alt="Lesson Diagram"
                      className="max-h-80 w-auto object-contain rounded-lg"
                    />
                  </div>
                </div>
              )}

              {/* Full Content Markdown / Formatted Text */}
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-3">
                <div className="whitespace-pre-line text-sm font-medium">
                  {activeLesson.content}
                </div>
              </div>

              {/* Explanations & Examples */}
              {activeLesson.explanations && activeLesson.explanations.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-800">Key Explanations & Definitions</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activeLesson.explanations.map((exp, idx) => (
                      <div key={idx} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                        <span className="text-xs font-black text-brand-700">{exp.term}</span>
                        <p className="text-xs text-slate-600 mt-1">{exp.explanation}</p>
                        <div className="mt-2 text-[11px] p-2 rounded-lg bg-white border border-slate-200/60 text-slate-700 italic">
                          "{exp.example}"
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Presentation Slides & Downloads */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {activeLesson.presentationUrl && (
                  <a
                    href={activeLesson.presentationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 flex items-center justify-between text-xs font-bold transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-amber-600" /> Open Lesson Slide Deck
                    </span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}

                {activeLesson.downloadableMaterials && activeLesson.downloadableMaterials.map((mat, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 flex items-center justify-between text-xs font-bold"
                  >
                    <span className="flex items-center gap-2 truncate">
                      <Download className="w-4 h-4 text-blue-600 shrink-0" /> {mat.name} ({mat.size})
                    </span>
                    <button
                      onClick={() => alert(`Downloading ${mat.name}...`)}
                      className="px-2.5 py-1 bg-blue-600 text-white rounded-lg text-[10px] font-bold"
                    >
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setSelectedLessonId(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800"
              >
                Close
              </button>

              <div className="flex items-center gap-3">
                {currentUser.completedLessons.includes(activeLesson.id) ? (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Lesson Completed!
                  </span>
                ) : (
                  <button
                    onClick={() => markLessonCompleted(activeLesson.id)}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" /> Mark as Completed
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DEDICATED EXERCISE RUNNER MODAL */}
      {activeExercise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="font-extrabold text-sm text-slate-800">{activeExercise.title}</h3>
                <span className="text-[11px] font-semibold text-slate-400">
                  Question {currentQuestionIndex + 1} of {activeExercise.questions.length}
                </span>
              </div>
              <button
                onClick={() => setSelectedExerciseId(null)}
                className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Exercise Runner or Results */}
            <div className="p-6">
              {!exerciseFinished ? (
                <div>
                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-slate-100 rounded-full mb-6 overflow-hidden">
                    <div
                      className="h-full bg-brand-600 transition-all duration-300"
                      style={{
                        width: `${((currentQuestionIndex + 1) / activeExercise.questions.length) * 100}%`
                      }}
                    />
                  </div>

                  {(() => {
                    const q = activeExercise.questions[currentQuestionIndex];
                    return (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 text-[10px] font-bold uppercase">
                            {q.type.replace('-', ' ')}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-slate-800">{q.prompt}</h4>

                        {/* Multiple Choice Options */}
                        {q.type === 'multiple-choice' && q.options && (
                          <div className="space-y-2.5 mt-3">
                            {q.options.map((opt, idx) => {
                              const isSelected = userAnswers[q.id] === opt;
                              let btnClass = 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50';
                              if (isAnswerSubmitted) {
                                if (opt === q.correctAnswer) {
                                  btnClass = 'border-emerald-500 bg-emerald-50 text-emerald-800 font-bold';
                                } else if (isSelected) {
                                  btnClass = 'border-red-500 bg-red-50 text-red-800';
                                }
                              } else if (isSelected) {
                                btnClass = 'border-brand-500 bg-brand-50 text-brand-800 font-bold ring-1 ring-brand-400';
                              }

                              return (
                                <button
                                  key={idx}
                                  disabled={isAnswerSubmitted}
                                  onClick={() => setUserAnswers({ ...userAnswers, [q.id]: opt })}
                                  className={`w-full text-left p-3.5 rounded-2xl border text-xs font-semibold transition-all flex items-center justify-between ${btnClass}`}
                                >
                                  <span>{opt}</span>
                                  {isAnswerSubmitted && opt === q.correctAnswer && (
                                    <Check className="w-4 h-4 text-emerald-600" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {/* Fill-in-the-blank input */}
                        {q.type === 'fill-in-the-blank' && (
                          <div className="space-y-2 mt-3">
                            <input
                              type="text"
                              disabled={isAnswerSubmitted}
                              value={userAnswers[q.id] || ''}
                              onChange={e => setUserAnswers({ ...userAnswers, [q.id]: e.target.value })}
                              placeholder="Type your answer here..."
                              className="w-full p-3.5 rounded-2xl border border-slate-300 text-xs font-medium focus:border-brand-500 outline-none"
                            />
                            {q.hint && (
                              <p className="text-[11px] text-amber-600 font-medium">💡 Hint: {q.hint}</p>
                            )}
                          </div>
                        )}

                        {/* Matching pairs */}
                        {q.type === 'matching' && q.matchingPairs && (
                          <div className="space-y-2 mt-3 p-3 bg-slate-50 rounded-2xl">
                            <p className="text-xs font-bold text-slate-600 mb-2">Connected matches:</p>
                            {q.matchingPairs.map((pair, pIdx) => (
                              <div key={pIdx} className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200 text-xs">
                                <span className="font-semibold text-slate-800">{pair.left}</span>
                                <ArrowRight className="w-3.5 h-3.5 text-brand-600" />
                                <span className="font-bold text-brand-700">{pair.right}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Explanation block when submitted */}
                        {isAnswerSubmitted && (
                          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                            <p className="font-bold text-slate-700">Explanation:</p>
                            <p className="text-slate-600 mt-0.5">{q.explanation}</p>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">Practice Completed!</h3>
                    <p className="text-xs text-slate-500 mt-1">Your results have been recorded on your profile.</p>
                  </div>
                  <div className="inline-block p-4 bg-brand-50 rounded-2xl border border-brand-100">
                    <span className="text-3xl font-black text-brand-700 font-sans">{exerciseScore}%</span>
                    <p className="text-xs font-bold text-slate-600 mt-1">Final Performance Score</p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              {!exerciseFinished ? (
                <>
                  {!isAnswerSubmitted ? (
                    <button
                      onClick={handleCheckQuestionAnswer}
                      className="ml-auto px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                    >
                      Check Answer
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="ml-auto px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1"
                    >
                      {currentQuestionIndex < activeExercise.questions.length - 1 ? 'Next Question' : 'View Summary'}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </>
              ) : (
                <button
                  onClick={() => setSelectedExerciseId(null)}
                  className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-sm"
                >
                  Done
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CREATE LESSON MODAL (ADMIN / TEACHER) */}
      {isCreateLessonOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-extrabold text-base text-slate-900">Create New Lesson</h3>
              <button onClick={() => setIsCreateLessonOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleCreateLesson} className="p-6 overflow-y-auto space-y-4 text-xs font-medium">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Lesson Title *</label>
                <input
                  type="text"
                  required
                  value={newLessonTitle}
                  onChange={e => setNewLessonTitle(e.target.value)}
                  placeholder="e.g. Master Conditional Sentences & Imaginary Situations"
                  className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">CEFR Level</label>
                  <select
                    value={newLessonLevel}
                    onChange={e => setNewLessonLevel(e.target.value as EnglishLevel)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-brand-500"
                  >
                    {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(lvl => (
                      <option key={lvl} value={lvl}>{lvl}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Category</label>
                  <input
                    type="text"
                    value={newLessonCat}
                    onChange={e => setNewLessonCat(e.target.value)}
                    placeholder="Grammar, Business, Idioms"
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Duration (Mins)</label>
                  <input
                    type="number"
                    value={newLessonDuration}
                    onChange={e => setNewLessonDuration(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={newLessonDesc}
                  onChange={e => setNewLessonDesc(e.target.value)}
                  placeholder="Brief summary visible on lesson card..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">YouTube Video Link</label>
                <input
                  type="text"
                  value={newLessonYoutube}
                  onChange={e => setNewLessonYoutube(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-brand-500"
                />
                <p className="text-[10px] text-slate-400 mt-1">Thumbnail is automatically fetched from the video ID.</p>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Learning Objectives (One per line)</label>
                <textarea
                  rows={3}
                  value={newLessonObjectives}
                  onChange={e => setNewLessonObjectives(e.target.value)}
                  placeholder="Understand zero vs first conditionals&#10;Differentiate hypothetical clauses&#10;Practice spoken dialogue"
                  className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Lesson Detailed Content</label>
                <textarea
                  rows={5}
                  value={newLessonContent}
                  onChange={e => setNewLessonContent(e.target.value)}
                  placeholder="Full text explanation, examples, and rules..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-brand-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateLessonOpen(false)}
                  className="px-4 py-2 text-slate-600 font-bold hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold shadow-sm"
                >
                  Publish Lesson
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
