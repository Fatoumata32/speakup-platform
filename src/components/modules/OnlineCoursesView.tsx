import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Video,
  Users,
  Plus,
  ExternalLink,
  Check,
  CalendarCheck,
  Filter,
  Trash2,
  X,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EnglishLevel, OnlineCourse } from '../../types';

export const OnlineCoursesView: React.FC = () => {
  const {
    currentUser,
    courses,
    addCourse,
    toggleCourseRegistration
  } = useApp();

  const [activeView, setActiveView] = useState<'calendar' | 'list'>('list');
  const [filterType, setFilterType] = useState<'all' | 'registered'>('all');
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  // New course state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newLevel, setNewLevel] = useState<EnglishLevel>('B1');
  const [newDate, setNewDate] = useState('2026-11-26');
  const [newStartTime, setNewStartTime] = useState('18:00');
  const [newEndTime, setNewEndTime] = useState('19:15');
  const [newPlatform, setNewPlatform] = useState<'Google Meet' | 'Zoom'>('Google Meet');
  const [newMeetingUrl, setNewMeetingUrl] = useState('https://meet.google.com/spk-speaking-live');
  const [newCapacity, setNewCapacity] = useState(15);

  const displayedCourses = courses.filter(c => {
    if (filterType === 'registered') {
      return c.registeredStudentIds.includes(currentUser.id);
    }
    return true;
  });

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addCourse({
      title: newTitle,
      description: newDesc,
      level: newLevel,
      teacherId: currentUser.id,
      teacherName: currentUser.name,
      teacherAvatar: currentUser.avatar,
      date: newDate,
      startTime: newStartTime,
      endTime: newEndTime,
      meetingPlatform: newPlatform,
      meetingUrl: newMeetingUrl,
      maxCapacity: Number(newCapacity),
      status: 'upcoming'
    });

    setIsScheduleModalOpen(false);
    setNewTitle('');
    setNewDesc('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Module Title Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight font-sans">
            Online Courses & Live Speaking Sessions
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Join interactive virtual classrooms, pronunciation workshops, and debate clubs with certified teachers.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Filter Pills */}
          <div className="flex items-center p-1 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
                filterType === 'all'
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-brand-600'
              }`}
            >
              All Classes ({courses.length})
            </button>
            <button
              onClick={() => setFilterType('registered')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
                filterType === 'registered'
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-brand-600'
              }`}
            >
              My Registered
            </button>
          </div>

          {(currentUser.role === 'teacher' || currentUser.role === 'admin') && (
            <button
              onClick={() => setIsScheduleModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-2xl shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" /> Schedule Class
            </button>
          )}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {displayedCourses.map(course => {
          const isRegistered = course.registeredStudentIds.includes(currentUser.id);
          const isFull = course.registeredStudentIds.length >= course.maxCapacity;

          return (
            <div
              key={course.id}
              className="bg-white rounded-3xl border border-slate-100 shadow-soft hover:shadow-hover transition-all p-6 flex flex-col justify-between group"
            >
              <div>
                {/* Level + Platform Badges */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-purple-100 text-purple-700">
                      Level {course.level}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 flex items-center gap-1">
                      <Video className="w-3 h-3 text-blue-600" /> {course.meetingPlatform}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" /> {course.registeredStudentIds.length} / {course.maxCapacity} seats
                  </span>
                </div>

                <h3 className="font-bold text-base sm:text-lg text-slate-800 leading-snug">
                  {course.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {course.description}
                </p>

                {/* Timing & Teacher Badge */}
                <div className="mt-4 p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={course.teacherAvatar}
                      alt={course.teacherName}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-300"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-800">{course.teacherName}</p>
                      <span className="text-[10px] font-semibold text-brand-600">Certified SpeakUp Tutor</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-bold text-slate-800 flex items-center gap-1 justify-end">
                      <Calendar className="w-3.5 h-3.5 text-brand-600" /> {course.date}
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1 justify-end mt-0.5">
                      <Clock className="w-3 h-3" /> {course.startTime} - {course.endTime}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-4 border-t border-slate-50 flex items-center justify-between">
                {isRegistered ? (
                  <button
                    onClick={() => toggleCourseRegistration(course.id)}
                    className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" /> Registered (Cancel)
                  </button>
                ) : (
                  <button
                    disabled={isFull}
                    onClick={() => toggleCourseRegistration(course.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      isFull
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-brand-50 hover:bg-brand-100 text-brand-700'
                    }`}
                  >
                    {isFull ? 'Session Full' : 'Reserve My Seat'}
                  </button>
                )}

                <a
                  href={course.meetingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                >
                  <Video className="w-4 h-4" /> Join Live Room <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* SCHEDULE COURSE MODAL (ADMIN / TEACHER) */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-extrabold text-base text-slate-900">Schedule Online Course</h3>
              <button onClick={() => setIsScheduleModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleCreateCourse} className="p-6 space-y-4 text-xs font-medium">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Course Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Masterclass on Job Interviews in English"
                  className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  placeholder="What students will practice and achieve..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Class Level</label>
                  <select
                    value={newLevel}
                    onChange={e => setNewLevel(e.target.value as EnglishLevel)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-brand-500"
                  >
                    {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(lvl => (
                      <option key={lvl} value={lvl}>{lvl}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Date</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={e => setNewDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Start Time</label>
                  <input
                    type="time"
                    value={newStartTime}
                    onChange={e => setNewStartTime(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">End Time</label>
                  <input
                    type="time"
                    value={newEndTime}
                    onChange={e => setNewEndTime(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Meeting Platform</label>
                  <select
                    value={newPlatform}
                    onChange={e => setNewPlatform(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-brand-500"
                  >
                    <option value="Google Meet">Google Meet</option>
                    <option value="Zoom">Zoom</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Seat Capacity</label>
                  <input
                    type="number"
                    value={newCapacity}
                    onChange={e => setNewCapacity(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Meeting URL Link</label>
                <input
                  type="text"
                  value={newMeetingUrl}
                  onChange={e => setNewMeetingUrl(e.target.value)}
                  placeholder="https://meet.google.com/..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-brand-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="px-4 py-2 text-slate-600 font-bold hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold shadow-sm"
                >
                  Publish & Notify Students
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
