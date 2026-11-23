import React, { useState } from 'react';
import {
  Library,
  BookOpen,
  Bookmark,
  ExternalLink,
  Star,
  Plus,
  Trash2,
  X,
  Sparkles,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Book, EnglishLevel } from '../../types';

export const LibraryView: React.FC = () => {
  const {
    currentUser,
    books,
    addBook,
    toggleSaveBook,
    selectedBookForKoko,
    setSelectedBookForKoko
  } = useApp();

  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);

  // New book state
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newLevel, setNewLevel] = useState<EnglishLevel>('B1');
  const [newGenre, setNewGenre] = useState('Personal Development');
  const [newCover, setNewCover] = useState('');
  const [newKokoUrl, setNewKokoUrl] = useState('https://koko.reader/books/sample-reading');

  const genres = ['All', 'Personal Development', 'African Literature', 'Graded Reader', 'Inspirational Fiction'];

  const filteredBooks = books.filter(b => {
    if (selectedGenre === 'All') return true;
    return b.genre === selectedGenre;
  });

  const handleCreateBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addBook({
      title: newTitle,
      author: newAuthor,
      shortDescription: newDesc,
      level: newLevel,
      genre: newGenre,
      coverImage: newCover || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=350',
      kokoBookId: `koko-${Date.now()}`,
      kokoUrl: newKokoUrl,
      pagesCount: 220,
      rating: 4.8
    });

    setIsAddBookModalOpen(false);
    setNewTitle('');
    setNewAuthor('');
    setNewDesc('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight font-sans">
            SpeakUp Digital Library & Koko Reader
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Curated graded readers and literature with seamless integration to the Koko reading ecosystem.
          </p>
        </div>

        {(currentUser.role === 'admin' || currentUser.role === 'teacher') && (
          <button
            onClick={() => setIsAddBookModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-2xl shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" /> Add Book to Library
          </button>
        )}
      </div>

      {/* Genre Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 bg-white p-3 rounded-2xl border border-slate-100 shadow-soft">
        {genres.map(g => (
          <button
            key={g}
            onClick={() => setSelectedGenre(g)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              selectedGenre === g
                ? 'bg-amber-100 text-amber-800 border border-amber-300 shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredBooks.map(book => {
          const isSaved = currentUser.savedBooks.includes(book.id);

          return (
            <div
              key={book.id}
              className="bg-white rounded-3xl border border-slate-100 shadow-soft hover:shadow-hover transition-all overflow-hidden flex flex-col justify-between group"
            >
              {/* Book Cover */}
              <div
                onClick={() => setSelectedBookForKoko(book)}
                className="h-64 bg-slate-900 overflow-hidden relative cursor-pointer"
              >
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-95 group-hover:opacity-100"
                />

                <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 rounded-lg text-[10px] font-black uppercase text-brand-700 shadow-xs">
                  Level {book.level}
                </div>

                <button
                  onClick={e => {
                    e.stopPropagation();
                    toggleSaveBook(book.id);
                  }}
                  className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-all ${
                    isSaved ? 'bg-amber-500 text-white' : 'bg-white/80 text-slate-700 hover:bg-white'
                  }`}
                  title={isSaved ? 'Remove bookmark' : 'Bookmark book'}
                >
                  <Bookmark className="w-4 h-4 fill-current" />
                </button>

                {/* Rating badge */}
                <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-amber-300 text-[10px] font-bold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-300" /> {book.rating}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                    {book.genre}
                  </span>
                  <h3
                    onClick={() => setSelectedBookForKoko(book)}
                    className="font-bold text-sm sm:text-base text-slate-800 mt-2 line-clamp-1 cursor-pointer hover:text-brand-600 leading-snug"
                  >
                    {book.title}
                  </h3>
                  <p className="text-[11px] font-semibold text-slate-400 mt-0.5">by {book.author}</p>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {book.shortDescription}
                  </p>
                </div>

                {/* Koko Integration Button */}
                <div className="mt-4 pt-3 border-t border-slate-50">
                  <button
                    onClick={() => setSelectedBookForKoko(book)}
                    className="w-full py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5" /> Read on Koko Reader
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* KOKO READER INTEGRATION MODAL */}
      {selectedBookForKoko && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-amber-50/60">
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold text-amber-900">Koko Digital Book Reader</span>
                <span className="px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 text-[10px] font-bold">
                  Connected
                </span>
              </div>
              <button onClick={() => setSelectedBookForKoko(null)}>
                <X className="w-5 h-5 text-slate-400 hover:text-slate-600" />
              </button>
            </div>

            <div className="p-6 space-y-5 text-xs">
              <div className="flex gap-4">
                <img
                  src={selectedBookForKoko.coverImage}
                  alt={selectedBookForKoko.title}
                  className="w-28 h-40 rounded-2xl object-cover shadow-md shrink-0"
                />
                <div className="space-y-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 text-[10px] font-bold uppercase">
                    Level {selectedBookForKoko.level} • {selectedBookForKoko.genre}
                  </span>
                  <h3 className="text-base font-black text-slate-900 leading-snug">
                    {selectedBookForKoko.title}
                  </h3>
                  <p className="text-slate-500 font-semibold">Author: {selectedBookForKoko.author}</p>
                  <p className="text-slate-600 leading-relaxed pt-1">
                    {selectedBookForKoko.shortDescription}
                  </p>
                </div>
              </div>

              {/* Koko Integration Notice per specification */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" /> About SpeakUp × Koko Reader
                </h4>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  SpeakUp connects directly to <strong>Koko</strong> to provide a distraction-free, responsive reading interface with adjustable typography and page syncing. Your reading progress and bookmarked notes remain preserved in SpeakUp.
                </p>
              </div>

              {/* Reader Action */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setSelectedBookForKoko(null)}
                  className="px-4 py-2 font-bold text-slate-500 hover:text-slate-800"
                >
                  Back to Library
                </button>
                <a
                  href={selectedBookForKoko.kokoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl font-bold shadow-md flex items-center gap-2"
                >
                  Launch Koko Reader <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD BOOK MODAL */}
      {isAddBookModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-sm text-slate-900">Add Book & Koko Link</h3>
              <button onClick={() => setIsAddBookModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleCreateBook} className="space-y-3 text-xs font-medium">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Book Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Sapiens (Adapted English)"
                  className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Author</label>
                <input
                  type="text"
                  required
                  value={newAuthor}
                  onChange={e => setNewAuthor(e.target.value)}
                  placeholder="e.g. Yuval Noah Harari"
                  className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-brand-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Level</label>
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
                  <label className="block text-slate-700 font-bold mb-1">Genre</label>
                  <select
                    value={newGenre}
                    onChange={e => setNewGenre(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-brand-500"
                  >
                    {genres.filter(g => g !== 'All').map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Koko Reader URL Link</label>
                <input
                  type="text"
                  value={newKokoUrl}
                  onChange={e => setNewKokoUrl(e.target.value)}
                  placeholder="https://koko.reader/books/..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={newCover}
                  onChange={e => setNewCover(e.target.value)}
                  placeholder="https://..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-brand-500"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddBookModalOpen(false)}
                  className="px-3.5 py-2 text-slate-600 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold shadow-sm"
                >
                  Save Book
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
