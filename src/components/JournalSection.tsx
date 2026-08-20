import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { JOURNAL_POSTS } from '../data/portfolioData';
import { JournalPost } from '../types';
import { sound } from '../utils/audioEngine';
import { BookOpen, X, Clock, ArrowRight, Keyboard, Eye, ChevronDown, ChevronUp, Type, Sparkles, Check } from 'lucide-react';

export const JournalSection: React.FC = () => {
  const [activePost, setActivePost] = useState<JournalPost | null>(null);
  const [readingMode, setReadingMode] = useState<boolean>(false);
  const [expandedInlinePostId, setExpandedInlinePostId] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');

  const toggleReadingMode = () => {
    sound.playDialClick();
    setReadingMode(!readingMode);
  };

  const handleOpenPost = (post: JournalPost) => {
    sound.playDialClick();
    setActivePost(post);
  };

  const handleClosePost = () => {
    sound.playDialClick();
    setActivePost(null);
  };

  const handleToggleInlinePost = (postId: string) => {
    sound.playDialClick();
    setExpandedInlinePostId(expandedInlinePostId === postId ? null : postId);
  };

  useEffect(() => {
    if (!activePost) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClosePost();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePost]);

  // Typography scaling helpers for Reading Mode
  const getBodyFontSize = () => {
    if (fontSize === 'xlarge') return 'text-base sm:text-xl leading-relaxed sm:leading-[1.85]';
    if (fontSize === 'large') return 'text-sm sm:text-lg leading-relaxed sm:leading-[1.8]';
    return 'text-xs sm:text-base leading-relaxed sm:leading-[1.75]';
  };

  const getHeadingSize = () => {
    if (fontSize === 'xlarge') return 'text-xl sm:text-3xl';
    if (fontSize === 'large') return 'text-lg sm:text-2xl';
    return 'text-base sm:text-xl';
  };

  return (
    <section
      id="journal-section"
      className="py-16 sm:py-24 md:py-36 px-4 sm:px-6 md:px-16 max-w-[1440px] mx-auto text-[#1a1c1b] border-t border-black/10 select-none relative z-10"
    >
      {/* Header with Reading Mode Switch */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12 md:mb-16 pb-5 sm:pb-6 border-b border-black/10 gap-4"
      >
        <div>
          <span className="text-[11px] sm:text-[12px] tracking-[0.25em] sm:tracking-[0.3em] text-blue-700 font-bold mb-1.5 sm:mb-2 block uppercase font-mono">
            PERSPECTIVES & FIELD NOTES
          </span>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-serif font-bold text-neutral-900 uppercase leading-snug">
            THE JOURNAL
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <p className="text-xs sm:text-sm text-neutral-700 max-w-sm font-medium leading-relaxed">
            Reflections on visual pacing, camera craft, and moments behind the lens by Akhil.
          </p>

          {/* Reading Mode Toggle Button */}
          <button
            id="journal-reading-mode-toggle"
            onClick={toggleReadingMode}
            onMouseEnter={() => sound.playFocusTick()}
            className={`px-3.5 py-2 text-xs font-mono tracking-wider uppercase border transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
              readingMode
                ? 'bg-blue-700 text-white border-blue-700 font-semibold ring-2 ring-blue-500/20'
                : 'bg-white text-neutral-800 border-neutral-300 hover:border-black font-medium'
            }`}
            aria-pressed={readingMode}
            title="Toggle simplified reading mode for mobile and editorial reading"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{readingMode ? 'Reading Mode: Active' : 'Reading Mode'}</span>
            {readingMode && <Check className="w-3 h-3 ml-0.5" />}
          </button>
        </div>
      </motion.div>

      {/* Reading Mode Controls Toolbar */}
      {readingMode && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-8 p-3 sm:p-4 bg-amber-50/60 border border-amber-200/80 backdrop-blur-sm flex flex-wrap items-center justify-between gap-3 text-xs font-mono"
        >
          <div className="flex items-center gap-2 text-neutral-800">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span className="font-semibold uppercase tracking-wider text-[11px] sm:text-xs">
              Distraction-Free Mobile Reader View
            </span>
          </div>

          {/* Text Size Scale Controls */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-neutral-600 font-medium flex items-center gap-1">
              <Type className="w-3 h-3" />
              <span>Type Size:</span>
            </span>
            <div className="flex items-center border border-neutral-300 bg-white shadow-xs">
              <button
                onClick={() => {
                  sound.playFocusTick();
                  setFontSize('normal');
                }}
                className={`px-2.5 py-1 text-[11px] uppercase transition-colors cursor-pointer ${
                  fontSize === 'normal' ? 'bg-neutral-900 text-white font-bold' : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                Standard
              </button>
              <button
                onClick={() => {
                  sound.playFocusTick();
                  setFontSize('large');
                }}
                className={`px-2.5 py-1 text-[11px] uppercase transition-colors cursor-pointer border-l border-neutral-200 ${
                  fontSize === 'large' ? 'bg-neutral-900 text-white font-bold' : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                Large
              </button>
              <button
                onClick={() => {
                  sound.playFocusTick();
                  setFontSize('xlarge');
                }}
                className={`px-2.5 py-1 text-[11px] uppercase transition-colors cursor-pointer border-l border-neutral-200 ${
                  fontSize === 'xlarge' ? 'bg-neutral-900 text-white font-bold' : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                XL
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Simplified Layout in Reading Mode vs Standard Card Grid */}
      {readingMode ? (
        /* SIMPLIFIED READING MODE VIEW (Clean Linear Flow, Large Typography, Inline Essay Expansion) */
        <div className="space-y-6 max-w-3xl mx-auto">
          {JOURNAL_POSTS.map((post) => {
            const isExpanded = expandedInlinePostId === post.id;

            return (
              <motion.article
                key={post.id}
                id={`journal-reading-post-${post.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#faf9f6] border border-neutral-300 p-5 sm:p-8 shadow-sm transition-all"
              >
                {/* Meta details & number */}
                <div className="flex items-center justify-between gap-2 text-xs text-neutral-700 font-mono mb-2 pb-2 border-b border-neutral-200">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="font-bold text-blue-700 uppercase tracking-wider text-[11px]">
                      {post.category}
                    </span>
                    <span>•</span>
                    <span className="text-neutral-600">{post.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-neutral-600">
                      <Clock className="w-3 h-3 text-blue-600" />
                      {post.readTime}
                    </span>
                  </div>
                  <span className="font-bold text-neutral-500 text-[11px]">
                    NO. {post.number}
                  </span>
                </div>

                {/* Article Title */}
                <h3 className={`font-serif font-bold text-neutral-900 mb-3 leading-snug ${getHeadingSize()}`}>
                  {post.title}
                </h3>

                {/* Summary Excerpt */}
                <p className={`text-neutral-800 mb-4 font-normal ${getBodyFontSize()}`}>
                  {post.summary}
                </p>

                {/* Inline Full Article Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pt-4 mt-4 border-t border-neutral-300 space-y-4"
                    >
                      <div className="aspect-[21/9] w-full overflow-hidden bg-neutral-200 my-4 border border-neutral-300">
                        <img
                          src={post.coverUrl}
                          alt={post.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>

                      <div className={`space-y-4 text-neutral-900 font-serif ${getBodyFontSize()}`}>
                        {post.content.map((paragraph, pIdx) => (
                          <p key={pIdx} className="leading-relaxed sm:leading-loose">
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      <div className="p-3 sm:p-4 bg-neutral-100 border border-neutral-300 text-xs font-mono text-neutral-700 mt-4 flex items-center justify-between">
                        <span>Photographic Note by Akhil.A</span>
                        <span className="text-blue-700 font-semibold">{post.category} ARCHIVE</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Action Buttons Row */}
                <div className="mt-4 pt-3 border-t border-neutral-200 flex items-center justify-between gap-3">
                  <button
                    onClick={() => handleToggleInlinePost(post.id)}
                    onMouseEnter={() => sound.playFocusTick()}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-blue-700 hover:text-blue-900 py-1 cursor-pointer"
                  >
                    <span>{isExpanded ? 'Collapse Full Essay' : 'Read Full Essay Inline'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => handleOpenPost(post)}
                    onMouseEnter={() => sound.playFocusTick()}
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-neutral-600 hover:text-black uppercase cursor-pointer"
                  >
                    <Eye className="w-3 h-3" />
                    <span className="hidden sm:inline">Open Reader Modal</span>
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      ) : (
        /* STANDARD DUAL-CARD GRID */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          {JOURNAL_POSTS.map((post, idx) => (
            <motion.article
              key={post.id}
              id={`journal-post-${post.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => handleOpenPost(post)}
              onMouseEnter={() => sound.playFocusTick()}
              className="group cursor-pointer border border-neutral-300 p-5 sm:p-6 bg-white/90 backdrop-blur-md hover:bg-white hover:border-black transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl"
            >
              <div>
                <div className="aspect-[16/9] overflow-hidden bg-neutral-200 mb-4 sm:mb-6 relative">
                  <img
                    src={post.coverUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 bg-black/85 text-white text-[9px] sm:text-[10px] tracking-widest uppercase px-2 sm:px-2.5 py-1 font-mono font-semibold">
                    {post.category}
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 text-xs text-neutral-700 font-mono mb-2.5 sm:mb-3 font-medium">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-blue-600" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-neutral-900 mb-2.5 sm:mb-3 group-hover:text-blue-700 transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed mb-5 sm:mb-6 font-normal">
                  {post.summary}
                </p>
              </div>

              <div className="pt-3.5 sm:pt-4 border-t border-neutral-200 flex items-center justify-between">
                <span className="text-xs font-bold tracking-wider text-blue-700 group-hover:text-blue-900 uppercase flex items-center gap-1.5">
                  <span>Read Full Essay</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="text-xs font-mono text-neutral-600 font-bold">
                  NO. {post.number}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      )}

      {/* Modal for Reading Essay with Font Size Support */}
      {activePost && (
        <div
          id="journal-essay-modal"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-300"
          onClick={handleClosePost}
        >
          <div
            className="bg-[#faf9f7] max-w-3xl w-full max-h-[92vh] overflow-y-auto p-5 sm:p-8 md:p-10 border border-neutral-300 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-4 sm:top-6 right-4 sm:right-6 flex items-center gap-2 sm:gap-3">
              <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono uppercase text-neutral-700 font-semibold border border-neutral-300 px-2 py-1 bg-neutral-100">
                <Keyboard className="w-3 h-3 text-neutral-700" />
                <span>[ESC] TO CLOSE</span>
              </div>
              <button
                onClick={handleClosePost}
                className="p-1.5 sm:p-2 text-neutral-700 hover:text-black border border-neutral-400 hover:border-black transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 text-xs text-blue-700 font-mono tracking-widest uppercase mb-3 sm:mb-4 font-bold">
              <BookOpen className="w-4 h-4" />
              <span>{activePost.category} • {activePost.date}</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mb-4 sm:mb-6 leading-snug">
              {activePost.title}
            </h2>

            <div className="aspect-[21/9] w-full overflow-hidden bg-neutral-200 mb-6 sm:mb-8 border border-neutral-300">
              <img
                src={activePost.coverUrl}
                alt={activePost.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 text-sm sm:text-base md:text-lg text-neutral-900 leading-relaxed sm:leading-loose font-serif">
              {activePost.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-neutral-300 flex items-center justify-between text-xs text-neutral-700 font-mono font-medium">
              <span>Author: Akhil.A</span>
              <button
                onClick={handleClosePost}
                className="text-black font-bold uppercase tracking-wider underline hover:text-blue-700 cursor-pointer"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

