import React, { useState } from 'react';
import {
  Megaphone,
  Calendar,
  ExternalLink,
  Plus,
  Trash2,
  Sparkles,
  Award,
  Bell,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UpdateAnnouncement } from '../../types';

export const UpdatesView: React.FC = () => {
  const { currentUser, updates, addUpdate, deleteUpdate } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New update form
  const [newTitle, setNewTitle] = useState('');
  const [newCat, setNewCat] = useState<any>('Platform Announcements');
  const [newDesc, setNewDesc] = useState('');
  const [newLink, setNewLink] = useState('');
  const [newCover, setNewCover] = useState('');
  const [isImportant, setIsImportant] = useState(false);

  const categories = [
    'All',
    'Platform Announcements',
    'Scholarships & Opportunities',
    'Competitions',
    'Upcoming Events',
    'Deadlines'
  ];

  const filteredUpdates = updates.filter(u => {
    if (selectedCategory === 'All') return true;
    return u.category === selectedCategory;
  });

  const handleCreateUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addUpdate({
      title: newTitle,
      category: newCat,
      description: newDesc,
      externalLink: newLink || undefined,
      coverImage: newCover || undefined,
      isImportant
    });

    setIsAddModalOpen(false);
    setNewTitle('');
    setNewDesc('');
    setNewLink('');
    setNewCover('');
    setIsImportant(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight font-sans">
            Updates & Community Announcements
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Official SpeakUp announcements, scholarship openings, debate tournaments, and learning deadlines.
          </p>
        </div>

        {(currentUser.role === 'admin' || currentUser.role === 'teacher') && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-2xl shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" /> Post Update
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 bg-white p-3 rounded-2xl border border-slate-100 shadow-soft">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              selectedCategory === cat
                ? 'bg-purple-100 text-brand-700 border border-brand-300 shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Updates Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUpdates.map(up => (
          <div
            key={up.id}
            className="bg-white rounded-3xl border border-slate-100 shadow-soft hover:shadow-hover transition-all overflow-hidden flex flex-col justify-between group"
          >
            {/* Cover Image */}
            {up.coverImage && (
              <div className="h-44 bg-slate-100 overflow-hidden relative">
                <img
                  src={up.coverImage}
                  alt={up.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {up.isImportant && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-red-600 text-white rounded-lg text-[10px] font-black uppercase flex items-center gap-1 shadow-sm">
                    <Bell className="w-3 h-3" /> Priority
                  </span>
                )}
              </div>
            )}

            {/* Body */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">
                    {up.category}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {up.publicationDate}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 leading-snug group-hover:text-brand-600 transition-colors">
                  {up.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {up.description}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-5 pt-3 border-t border-slate-50 flex items-center justify-between">
                {up.externalLink ? (
                  <a
                    href={up.externalLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-brand-600 hover:text-brand-800 flex items-center gap-1"
                  >
                    Learn More & Apply <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-xs text-slate-400 font-medium">Official Bulletin</span>
                )}

                {(currentUser.role === 'admin' || currentUser.role === 'teacher') && (
                  <button
                    onClick={() => deleteUpdate(up.id)}
                    className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
                    title="Delete Announcement"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* POST UPDATE MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-extrabold text-base text-slate-900">Post Announcement</h3>
              <button onClick={() => setIsAddModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleCreateUpdate} className="p-6 space-y-4 text-xs font-medium">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Free Cambridge Exam Vouchers Available"
                  className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Category</label>
                <select
                  value={newCat}
                  onChange={e => setNewCat(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-brand-500"
                >
                  <option value="Platform Announcements">Platform Announcements</option>
                  <option value="Scholarships & Opportunities">Scholarships & Opportunities</option>
                  <option value="Competitions">Competitions</option>
                  <option value="Upcoming Events">Upcoming Events</option>
                  <option value="Deadlines">Deadlines</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Full Description</label>
                <textarea
                  rows={4}
                  required
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  placeholder="Full text of the announcement..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">External Link URL (Optional)</label>
                <input
                  type="text"
                  value={newLink}
                  onChange={e => setNewLink(e.target.value)}
                  placeholder="https://..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Cover Image URL (Optional)</label>
                <input
                  type="text"
                  value={newCover}
                  onChange={e => setNewCover(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-brand-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="notifImportant"
                  checked={isImportant}
                  onChange={e => setIsImportant(e.target.checked)}
                  className="rounded text-brand-600"
                />
                <label htmlFor="notifImportant" className="text-slate-700 font-semibold cursor-pointer">
                  Mark as High-Priority Notification
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-slate-600 font-bold hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold shadow-sm"
                >
                  Publish Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
