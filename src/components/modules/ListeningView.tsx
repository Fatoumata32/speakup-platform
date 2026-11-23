import React, { useState, useRef, useEffect } from 'react';
import {
  Headphones,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  FastForward,
  Clock,
  CheckCircle2,
  HelpCircle,
  FileText,
  Plus,
  X,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ListeningResource } from '../../types';

export const ListeningView: React.FC = () => {
  const {
    currentUser,
    listeningResources,
    selectedListeningId,
    setSelectedListeningId
  } = useApp();

  const [activeTrack, setActiveTrack] = useState<ListeningResource>(
    listeningResources.find(r => r.id === selectedListeningId) || listeningResources[0]
  );

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(405); // seconds
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(true);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (selectedListeningId) {
      const found = listeningResources.find(r => r.id === selectedListeningId);
      if (found) {
        setActiveTrack(found);
        setIsPlaying(false);
        setCurrentTime(0);
        setQuizSubmitted(false);
        setQuizAnswers({});
      }
    }
  }, [selectedListeningId, listeningResources]);

  // Audio simulation timer if no actual file plays
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playbackRate);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration, playbackRate]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setCurrentTime(val);
  };

  const skip10 = (forward: boolean) => {
    setCurrentTime(t => (forward ? Math.min(duration, t + 10) : Math.max(0, t - 10)));
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSpeakWord = (word: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight font-sans">
          Listening & Podcasts
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Train your ear for natural connected speech, native accents, and conversational cadences.
        </p>
      </div>

      {/* ACTIVE AUDIO PLAYER COMPONENT */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-card p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Cover Image & Meta */}
          <div className="w-full lg:w-72 shrink-0">
            <div className="rounded-2xl overflow-hidden aspect-square bg-slate-100 shadow-md relative group">
              <img
                src={activeTrack.coverImage}
                alt={activeTrack.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-xs rounded-xl text-[10px] font-black uppercase text-brand-700 shadow-xs">
                Level {activeTrack.level}
              </div>
            </div>

            <div className="mt-4">
              <span className="text-[11px] font-bold uppercase text-brand-600">
                {activeTrack.topic}
              </span>
              <h3 className="font-extrabold text-base text-slate-800 leading-snug mt-1">
                {activeTrack.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                {activeTrack.shortDescription}
              </p>
            </div>
          </div>

          {/* Player Controls & Interactive Transcripts */}
          <div className="flex-1 w-full space-y-6">
            {/* Audio Wave / Progress Scrubbing */}
            <div className="p-4 bg-brand-50/50 rounded-2xl border border-brand-100/60 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-500">
                <span>{formatTime(currentTime)}</span>
                <span className="text-[11px] font-sans font-bold text-brand-600">
                  {isPlaying ? 'Now Playing 🎙️' : 'Paused'}
                </span>
                <span>{formatTime(duration)}</span>
              </div>

              <input
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-2 bg-brand-200 rounded-full appearance-none cursor-pointer accent-brand-600"
              />

              {/* Controls Toolbar */}
              <div className="flex items-center justify-between pt-2">
                {/* Playback speed selector */}
                <div className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-xl border border-slate-200 shadow-xs text-xs font-bold text-slate-700">
                  {[0.75, 1, 1.25, 1.5].map(rate => (
                    <button
                      key={rate}
                      onClick={() => setPlaybackRate(rate)}
                      className={`px-1.5 py-0.5 rounded-md ${
                        playbackRate === rate ? 'bg-brand-600 text-white' : 'hover:text-brand-600'
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>

                {/* Main Action buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => skip10(false)}
                    className="p-2 text-slate-500 hover:text-brand-600 transition-colors"
                    title="Skip 10s backward"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>

                  <button
                    onClick={togglePlay}
                    className="w-12 h-12 rounded-full bg-brand-600 hover:bg-brand-700 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all"
                  >
                    {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white ml-0.5" />}
                  </button>

                  <button
                    onClick={() => skip10(true)}
                    className="p-2 text-slate-500 hover:text-brand-600 transition-colors"
                    title="Skip 10s forward"
                  >
                    <FastForward className="w-5 h-5" />
                  </button>
                </div>

                {/* Mute button */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 text-slate-500 hover:text-brand-600 rounded-xl"
                >
                  {isMuted ? <VolumeX className="w-5 h-5 text-red-500" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Transcripts Toggle & Content */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setShowTranscript(!showTranscript)}
                  className="flex items-center gap-1.5 text-xs font-bold text-brand-700 hover:underline"
                >
                  <FileText className="w-4 h-4" />
                  {showTranscript ? 'Hide Synchronized Transcript' : 'Show Synchronized Transcript'}
                </button>
                <span className="text-[11px] text-slate-400">Audio transcript verified</span>
              </div>

              {showTranscript && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 max-h-48 overflow-y-auto text-xs leading-relaxed text-slate-700 font-medium whitespace-pre-line shadow-inner">
                  {activeTrack.transcript}
                </div>
              )}
            </div>

            {/* Key Vocabulary Highlight Chips with Pronunciation */}
            {activeTrack.vocabulary && activeTrack.vocabulary.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Key Vocabulary from Episode
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeTrack.vocabulary.map((vocab, vIdx) => (
                    <div
                      key={vIdx}
                      className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs flex items-start justify-between"
                    >
                      <div>
                        <span className="text-xs font-black text-brand-700">{vocab.word}</span>
                        <p className="text-[11px] text-slate-600 mt-0.5">{vocab.definition}</p>
                      </div>
                      <button
                        onClick={() => handleSpeakWord(vocab.word)}
                        className="p-1 rounded-full text-brand-600 hover:bg-brand-50"
                        title="Pronounce word"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interactive Comprehension Quiz */}
            {activeTrack.quiz && activeTrack.quiz.length > 0 && (
              <div className="p-5 bg-purple-50/50 rounded-2xl border border-purple-100 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-900 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-purple-700" /> Listening Comprehension Quiz
                  </h4>
                  {quizSubmitted && (
                    <span className="text-xs font-black text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Evaluated
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  {activeTrack.quiz.map((q, qIdx) => (
                    <div key={qIdx} className="space-y-2 text-xs">
                      <p className="font-bold text-slate-800">{qIdx + 1}. {q.question}</p>
                      <div className="space-y-1.5">
                        {q.options.map((opt, oIdx) => {
                          const isSelected = quizAnswers[qIdx] === oIdx;
                          let btnClass = 'bg-white border-slate-200 text-slate-700 hover:bg-purple-100/40';

                          if (quizSubmitted) {
                            if (oIdx === q.correctIndex) {
                              btnClass = 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold';
                            } else if (isSelected) {
                              btnClass = 'bg-red-50 border-red-500 text-red-800';
                            }
                          } else if (isSelected) {
                            btnClass = 'bg-brand-100 border-brand-500 text-brand-800 font-bold';
                          }

                          return (
                            <button
                              key={oIdx}
                              disabled={quizSubmitted}
                              onClick={() => setQuizAnswers({ ...quizAnswers, [qIdx]: oIdx })}
                              className={`w-full text-left p-2.5 rounded-xl border font-medium transition-all ${btnClass}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {quizSubmitted && (
                        <p className="text-[11px] text-slate-500 italic mt-1 bg-white p-2 rounded-lg border border-slate-100">
                          Explanation: {q.explanation}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {!quizSubmitted && (
                  <button
                    onClick={() => setQuizSubmitted(true)}
                    className="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all"
                  >
                    Submit Quiz Answers
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* OTHER PODCAST EPISODES */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-4 font-sans">Other Listening Tracks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {listeningResources.map(track => {
            const isSelected = track.id === activeTrack.id;

            return (
              <div
                key={track.id}
                onClick={() => {
                  setActiveTrack(track);
                  setIsPlaying(true);
                  setCurrentTime(0);
                  setQuizSubmitted(false);
                }}
                className={`p-4 rounded-3xl border transition-all cursor-pointer flex items-center gap-4 group ${
                  isSelected
                    ? 'bg-brand-50/60 border-brand-300 ring-2 ring-brand-200'
                    : 'bg-white border-slate-100 hover:shadow-soft'
                }`}
              >
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 shrink-0 relative">
                  <img
                    src={track.coverImage}
                    alt={track.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white">
                    <Play className="w-5 h-5 fill-white" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-black uppercase text-purple-600">
                    Level {track.level} • {track.duration}
                  </span>
                  <h4 className="text-xs font-bold text-slate-800 truncate mt-0.5 group-hover:text-brand-600">
                    {track.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">{track.shortDescription}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
