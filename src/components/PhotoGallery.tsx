import React, { useState, useEffect, useRef } from 'react';
import { Camera, Heart, Plus, X, Maximize2, Sparkles, Filter, Calendar, MapPin } from 'lucide-react';
import { fireCelebrationBurst, fireGoldenStars } from '../utils/confetti';
import { audioManager } from '../utils/audio';

// Static imported photo uploaded by user
import rafsanImg from '../assets/images/Rafsan.png';

export interface MemoryItem {
  id: string;
  title: string;
  category: 'milestones' | 'trips' | 'celebrations';
  year: string;
  location?: string;
  imageSrc: string;
  caption: string;
  likes: number;
  userLiked?: boolean;
}

const INITIAL_MEMORIES: MemoryItem[] = [
  {
    id: 'mem-1',
    title: 'The Trusted Pharmacist & Healthcare Hero',
    category: 'milestones',
    year: '2026',
    location: 'Care Pharmacy',
    imageSrc: rafsanImg,
    caption: 'Rafsan Bhai in his signature element! Delivering patient care, medical guidance, and spreading warmth with his reassuring smile every single day.',
    likes: 142,
    userLiked: true,
  },
  {
    id: 'mem-2',
    title: 'Celebrating Another Golden Year',
    category: 'celebrations',
    year: '2026',
    location: 'Birthday Gathering',
    imageSrc: rafsanImg,
    caption: 'The man of the hour! Celebrating another year of wisdom, boundless generosity, infectious laughter, and being the best big brother to all.',
    likes: 119,
  },
  {
    id: 'mem-3',
    title: 'Warm Smiles & Great Brotherhood',
    category: 'trips',
    year: '2025',
    location: 'Friends & Family Adda',
    imageSrc: rafsanImg,
    caption: 'Whenever Rafsan Bhai is in the room, the energy is peaceful, welcoming, and vibrant. An irreplaceable mentor, brother, and confidant.',
    likes: 98,
  },
  {
    id: 'mem-4',
    title: 'Dedication & Professional Milestones',
    category: 'milestones',
    year: '2024',
    location: 'Medical Excellence',
    imageSrc: rafsanImg,
    caption: 'Years of hard work, discipline, and compassionate service. Proud to stand alongside a brother who achieves excellence in everything he touches!',
    likes: 126,
  },
];

export const PhotoGallery: React.FC = () => {
  const [memories, setMemories] = useState<MemoryItem[]>(() => {
    const saved = localStorage.getItem('rafsan_bhai_memories');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Replace any deleted file paths with rafsanImg
          return parsed.map((item: MemoryItem) => {
            if (
              !item.imageSrc ||
              item.imageSrc.includes('rafsan_bhai_portrait') ||
              item.imageSrc.includes('rafsan_birthday_cake') ||
              item.imageSrc.includes('rafsan_travel_memory') ||
              item.imageSrc.includes('rafsan_graduation_milestone')
            ) {
              return { ...item, imageSrc: rafsanImg };
            }
            return item;
          });
        }
      } catch (e) {
        return INITIAL_MEMORIES;
      }
    }
    return INITIAL_MEMORIES;
  });

  const [activeFilter, setActiveFilter] = useState<'all' | 'milestones' | 'trips' | 'celebrations'>('all');
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Memory Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'milestones' | 'trips' | 'celebrations'>('celebrations');
  const [newYear, setNewYear] = useState('2026');
  const [newLocation, setNewLocation] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newImageBase64, setNewImageBase64] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem('rafsan_bhai_memories', JSON.stringify(memories));
  }, [memories]);

  const handleLike = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    setMemories((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const isLiked = m.userLiked;
          return {
            ...m,
            likes: isLiked ? m.likes - 1 : m.likes + 1,
            userLiked: !isLiked,
          };
        }
        return m;
      })
    );

    if (selectedMemory && selectedMemory.id === id) {
      setSelectedMemory((prev) =>
        prev
          ? {
              ...prev,
              likes: prev.userLiked ? prev.likes - 1 : prev.likes + 1,
              userLiked: !prev.userLiked,
            }
          : null
      );
    }

    fireCelebrationBurst();
    audioManager.playPopSound();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewImageBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAddMemorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCaption.trim()) return;

    const newMem: MemoryItem = {
      id: `mem-custom-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      year: newYear.trim() || '2026',
      location: newLocation.trim() || 'Precious Memories',
      imageSrc: newImageBase64 || rafsanImg,
      caption: newCaption.trim(),
      likes: 1,
      userLiked: true,
    };

    setMemories([newMem, ...memories]);
    setShowAddModal(false);
    setNewTitle('');
    setNewCaption('');
    setNewLocation('');
    setNewImageBase64(null);

    fireGoldenStars();
    audioManager.playPartyHorn();
  };

  const filteredMemories = memories.filter((m) => {
    if (activeFilter === 'all') return true;
    return m.category === activeFilter;
  });

  return (
    <section id="gallery" className="py-16 md:py-24 bg-white text-stone-900 border-b border-stone-200 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header and Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-600 mb-2">
              <Camera className="w-4 h-4 text-amber-500" />
              <span>Memories Through The Years</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Best Moments with Rafsan Bhai 📸
            </h2>
            <p className="mt-2 text-stone-600 text-sm sm:text-base max-w-xl">
              From academic milestones and dedicated healthcare work to hilarious weekend getaways and birthday feasts.
            </p>
          </div>

          {/* Add Memory Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="self-start md:self-auto px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-300 font-semibold text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add Memory Photo</span>
          </button>
        </div>

        {/* Filter Tabs (Interactive filter controls complying with Zero-Pill discipline) */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl w-fit mb-8 overflow-x-auto max-w-full">
          {(
            [
              { id: 'all', label: 'All Memories' },
              { id: 'milestones', label: 'Milestones & Career' },
              { id: 'trips', label: 'Trips & Hangouts' },
              { id: 'celebrations', label: 'Celebrations' },
            ] as const
          ).map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all shrink-0 ${
                activeFilter === filter.id
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMemories.map((memory) => (
            <div
              key={memory.id}
              onClick={() => setSelectedMemory(memory)}
              className="group bg-stone-50 rounded-2xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-4/3 overflow-hidden bg-stone-200">
                <img
                  src={memory.imageSrc}
                  alt={memory.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full text-stone-900 shadow">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Like Button on Photo */}
                <button
                  onClick={(e) => handleLike(memory.id, e)}
                  className={`absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 shadow transition-transform active:scale-90 ${
                    memory.userLiked
                      ? 'bg-rose-500 text-white'
                      : 'bg-stone-900/70 text-white hover:bg-stone-900/90'
                  }`}
                  title="Send love to this memory"
                >
                  <Heart className={`w-3.5 h-3.5 ${memory.userLiked ? 'fill-current' : ''}`} />
                  <span>{memory.likes}</span>
                </button>
              </div>

              {/* Memory Details - Clean unboxed metadata with typographic separators */}
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium mb-1">
                    <span>{memory.year}</span>
                    <span aria-hidden="true">·</span>
                    <span className="capitalize">{memory.category}</span>
                    {memory.location && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="truncate">{memory.location}</span>
                      </>
                    )}
                  </div>
                  <h3 className="font-display font-bold text-stone-900 text-base leading-snug group-hover:text-amber-600 transition-colors">
                    {memory.title}
                  </h3>
                  <p className="mt-1.5 text-stone-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                    {memory.caption}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-stone-200/60 flex items-center justify-between text-xs text-stone-500">
                  <span className="font-medium text-amber-600 group-hover:underline">
                    View Story →
                  </span>
                  <span>{memory.likes} ❤️</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox / Expanded Memory Modal */}
      {selectedMemory && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm p-4 flex items-center justify-center animate-fade-in"
          onClick={() => setSelectedMemory(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-300 relative max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedMemory(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-stone-900/70 hover:bg-stone-900 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative aspect-16/10 sm:aspect-16/9 bg-stone-950 flex items-center justify-center overflow-hidden">
              <img
                src={selectedMemory.imageSrc}
                alt={selectedMemory.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto">
              {/* Unboxed metadata */}
              <div className="flex items-center gap-2 text-xs text-stone-500 font-medium mb-1">
                <span>{selectedMemory.year}</span>
                <span aria-hidden="true">·</span>
                <span className="capitalize">{selectedMemory.category}</span>
                {selectedMemory.location && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{selectedMemory.location}</span>
                  </>
                )}
              </div>

              <h3 className="font-display font-bold text-2xl text-stone-900">
                {selectedMemory.title}
              </h3>

              <p className="mt-3 text-stone-700 text-base leading-relaxed">
                {selectedMemory.caption}
              </p>

              {/* Footer action */}
              <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between">
                <button
                  onClick={() => handleLike(selectedMemory.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
                    selectedMemory.userLiked
                      ? 'bg-rose-500 text-white'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-900'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${selectedMemory.userLiked ? 'fill-current' : ''}`} />
                  <span>{selectedMemory.userLiked ? 'Loved!' : 'Show Love'} ({selectedMemory.likes})</span>
                </button>

                <button
                  onClick={() => {
                    fireCelebrationBurst();
                    audioManager.playPartyHorn();
                  }}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 text-sm font-bold rounded-xl transition-all"
                >
                  🎉 Celebrate Moment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Memory Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm p-4 flex items-center justify-center animate-fade-in"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-300 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-amber-600 mb-1">
              <Camera className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Contribute a Memory</span>
            </div>
            <h3 className="font-display font-bold text-2xl text-stone-900 mb-4">
              Add a Photo with Rafsan Bhai
            </h3>

            <form onSubmit={handleAddMemorySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Memory Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Evening Tea at the Corner Café"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 focus:border-amber-500 text-sm outline-none bg-white"
                  >
                    <option value="celebrations">Celebrations</option>
                    <option value="trips">Trips & Hangouts</option>
                    <option value="milestones">Milestones & Career</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Year
                  </label>
                  <input
                    type="text"
                    placeholder="2026"
                    value={newYear}
                    onChange={(e) => setNewYear(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-amber-500 text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Location (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Old Town, Dhaka or University Campus"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-amber-500 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Upload Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="w-full text-xs text-stone-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-amber-100 file:text-amber-800 hover:file:bg-amber-200 cursor-pointer"
                />
                {newImageBase64 && (
                  <div className="mt-2 w-20 h-20 rounded-lg overflow-hidden border border-stone-300">
                    <img src={newImageBase64} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Memory Story / Caption *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Share what happened during this memory..."
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-amber-500 text-sm outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl text-stone-600 hover:text-stone-900 font-semibold text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-bold text-sm shadow hover:shadow-md active:scale-95 transition-all"
                >
                  Post to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
