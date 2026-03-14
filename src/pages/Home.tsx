import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ArrowUp, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Background3D from '../components/Background3D';
import logo from '/src/Lemon Logo - Final.png';

// ─────────────────────────────────────────────
// PHOTO DATA — replace src with your real images
// ─────────────────────────────────────────────
const photos = [
  { id: 1,  src: './gallery/1.jpg',  title: 'Somon la grătar',         category: 'Feluri principale' },
  { id: 2,  src: './gallery/2.jpg',  title: 'Tiramisu',                category: 'Deserturi'         },
  { id: 3,  src: './gallery/3.jpg',  title: 'Bruschette cu roșii',     category: 'Aperitive'         },
  { id: 4,  src: './gallery/4.jpg',  title: 'Friptură de vită',        category: 'Feluri principale' },
  { id: 5,  src: './gallery/5.jpg',  title: 'Cheesecake cu lămâie',    category: 'Deserturi'         },
  { id: 6,  src: './gallery/6.jpg',  title: 'Carpaccio de vită',       category: 'Aperitive'         },
  { id: 7,  src: './gallery/7.jpg',  title: 'Paste carbonara',         category: 'Feluri principale' },
  { id: 8,  src: './gallery/8.jpg',  title: 'Panna cotta',             category: 'Deserturi'         },
  { id: 9,  src: './gallery/9.jpg',  title: 'Tartă cu fructe',         category: 'Deserturi'         },
  { id: 10, src: './gallery/10.jpg', title: 'Supă cremă de dovleac',   category: 'Aperitive'         },
  { id: 11, src: './gallery/11.jpg', title: 'Pui la cuptor',           category: 'Feluri principale' },
  { id: 12, src: './gallery/12.jpg', title: 'Salată Caesar',           category: 'Aperitive'         },
];

const CATEGORIES = ['Toate', 'Aperitive', 'Feluri principale', 'Deserturi'];

// ─────────────────────────────────────────────
// LIGHTBOX
// ─────────────────────────────────────────────
const Lightbox = ({ photos, currentIndex, onClose, onPrev, onNext }) => {
  const photo = photos[currentIndex];

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-white bg-yellow-500 bg-opacity-80 hover:bg-yellow-400 rounded-full p-2 transition-all duration-200"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 z-10 text-white bg-white bg-opacity-10 hover:bg-yellow-500 hover:bg-opacity-80 rounded-full p-3 transition-all duration-200"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>

      {/* Image */}
      <motion.div
        key={photo.id}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.25 }}
        className="relative max-w-4xl max-h-[85vh] mx-16"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photo.src}
          alt={photo.title}
          className="max-h-[80vh] max-w-full object-contain rounded-xl shadow-2xl"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent rounded-b-xl px-6 py-4">
          <p className="text-white font-serif text-xl">{photo.title}</p>
          <p className="text-yellow-400 text-sm tracking-widest uppercase">{photo.category}</p>
        </div>
      </motion.div>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 z-10 text-white bg-white bg-opacity-10 hover:bg-yellow-500 hover:bg-opacity-80 rounded-full p-3 transition-all duration-200"
      >
        <ChevronRight className="w-7 h-7" />
      </button>

      {/* Counter */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center">
        <span className="text-white text-sm bg-white bg-opacity-10 px-4 py-1 rounded-full tracking-widest">
          {currentIndex + 1} / {photos.length}
        </span>
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// MASONRY PHOTO CARD
// ─────────────────────────────────────────────
const PhotoCard = ({ photo, index, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05, duration: 0.45 }}
      className="relative group cursor-pointer break-inside-avoid mb-4 rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300"
      onClick={() => onClick(photo)}
    >
      <img
        src={photo.src}
        alt={photo.title}
        className="w-full object-cover transform group-hover:scale-105 transition-transform duration-500"
      />

      {/* Yellow overlay on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 bg-yellow-400 bg-opacity-70 flex flex-col items-center justify-center"
      >
        <p className="text-white font-serif text-lg font-bold text-center px-4 drop-shadow">
          {photo.title}
        </p>
        <p className="text-yellow-100 text-xs tracking-widest uppercase mt-1">
          {photo.category}
        </p>
      </motion.div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// MAIN GALLERY PAGE
// ─────────────────────────────────────────────
const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('Toate');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const filtered = activeCategory === 'Toate'
    ? photos
    : photos.filter(p => p.category === activeCategory);

  // Scroll-to-top button visibility
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openLightbox = useCallback((photo) => {
    const idx = filtered.findIndex(p => p.id === photo.id);
    setLightboxIndex(idx);
  }, [filtered]);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const prevPhoto = useCallback(() =>
    setLightboxIndex(i => (i - 1 + filtered.length) % filtered.length),
    [filtered.length]);

  const nextPhoto = useCallback(() =>
    setLightboxIndex(i => (i + 1) % filtered.length),
    [filtered.length]);

  return (
    <div className="min-h-screen">
      {/* Background same as Home */}
      <div className="fixed inset-0 z-0">
        <Background3D />
      </div>

      <div className="relative z-10">

        {/* ── PAGE TITLE ── */}
        <div className="text-center pt-12 pb-6 px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-5xl sm:text-7xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-yellow-400 drop-shadow-sm"
          >
            Galerie
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-yellow-700 font-serif italic text-lg mt-2"
          >
            Mâncare făcută cu drag, fotografiată cu mândrie
          </motion.p>
        </div>

        {/* ── CATEGORY FILTERS ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex justify-center flex-wrap gap-2 px-4 pb-8"
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow
                ${activeCategory === cat
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-lg scale-105'
                  : 'bg-white bg-opacity-80 text-yellow-700 hover:bg-yellow-50 hover:scale-105'
                }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* ── MASONRY GRID ── */}
        <div className="max-w-7xl mx-auto px-4 pb-16">
          <AnimatePresence>
            <div className="columns-2 sm:columns-3 lg:columns-4 gap-4">
              {filtered.map((photo, index) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  index={index}
                  onClick={openLightbox}
                />
              ))}
            </div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center text-yellow-600 font-serif italic text-xl py-20">
              Nu există fotografii în această categorie.
            </div>
          )}
        </div>
      </div>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photos={filtered}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevPhoto}
            onNext={nextPhoto}
          />
        )}
      </AnimatePresence>

      {/* ── SCROLL TO TOP ── */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 left-6 z-50 bg-white text-yellow-500 border-2 border-yellow-400 p-3 rounded-full shadow-xl hover:bg-yellow-400 hover:text-white transition-all duration-300"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;

