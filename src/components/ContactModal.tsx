import React, { useState, useEffect } from 'react';
import { sound } from '../utils/audioEngine';
import { X, Send, CheckCircle2, Mail, Sparkles, Keyboard } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  preselectedService
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceType: preselectedService || 'Editorial Portraits',
    location: '',
    timeline: 'Within 3 Months',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, serviceType: preselectedService }));
    }
  }, [preselectedService]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        sound.playDialClick();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playDialClick();
    setIsSubmitting(true);

    setTimeout(() => {
      sound.playShutterSound();
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    sound.playDialClick();
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      serviceType: 'Editorial Portraits',
      location: '',
      timeline: 'Within 3 Months',
      message: ''
    });
    onClose();
  };

  return (
    <div
      id="contact-inquiry-modal"
      className="fixed inset-0 z-[90] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-300 select-none"
      onClick={onClose}
    >
      <div
        className="bg-[#faf9f7] text-[#1a1c1b] max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-neutral-300 shadow-2xl p-6 sm:p-10 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="absolute top-6 right-6 flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono uppercase text-neutral-700 font-semibold border border-neutral-300 px-2 py-1 bg-neutral-100">
            <Keyboard className="w-3 h-3 text-neutral-700" />
            <span>[ESC] TO CLOSE</span>
          </div>
          <button
            onClick={() => {
              sound.playDialClick();
              onClose();
            }}
            className="p-2 text-neutral-700 hover:text-black border border-neutral-400 hover:border-black transition-colors cursor-pointer"
            aria-label="Close Contact Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-12 text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-6 border border-emerald-300">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-xs font-mono text-blue-700 uppercase tracking-widest block mb-2 font-bold">
              COMMISSION INQUIRY RECEIVED
            </span>
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-4">
              Thank You, {formData.name || 'Friend'}
            </h2>
            <p className="text-neutral-700 max-w-md mx-auto text-sm leading-relaxed mb-8">
              Akhil reviews each inquiry personally. You will receive a bespoke moodboard proposal and availability confirmation within 24–48 hours.
            </p>
            <button
              onClick={handleReset}
              className="px-8 py-3 bg-black text-white text-xs tracking-widest uppercase font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Return to Portfolio
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs text-blue-700 font-mono tracking-widest uppercase mb-2 font-bold">
              <Sparkles className="w-4 h-4" />
              <span>DIRECT INQUIRY & BOOKINGS</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">
              Begin a Photographic Conversation
            </h2>
            <p className="text-xs sm:text-sm text-neutral-700 mb-8 leading-relaxed">
              Available for commissions across India, Europe, Americas, and worldwide locations.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[11px] font-mono tracking-widest uppercase text-neutral-800 font-bold mb-2">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full px-4 py-3 bg-white border border-neutral-400 focus:border-black focus:outline-none text-sm text-neutral-900 placeholder:text-neutral-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono tracking-widest uppercase text-neutral-800 font-bold mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@studio.com"
                    className="w-full px-4 py-3 bg-white border border-neutral-400 focus:border-black focus:outline-none text-sm text-neutral-900 placeholder:text-neutral-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono tracking-widest uppercase text-neutral-800 font-bold mb-2">
                    Commission Focus
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-neutral-400 focus:border-black focus:outline-none text-sm text-neutral-900 transition-colors"
                  >
                    <option value="Editorial Portraits">Editorial Portraits</option>
                    <option value="Documentary Events">Documentary Events</option>
                    <option value="Brand Narratives">Brand Narratives</option>
                    <option value="Wildlife Expedition & Print">Wildlife Expedition & Print</option>
                    <option value="Other Bespoke Project">Other Bespoke Project</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono tracking-widest uppercase text-neutral-800 font-bold mb-2">
                    Location / Destination
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Bangalore, Paris, Remote"
                    className="w-full px-4 py-3 bg-white border border-neutral-400 focus:border-black focus:outline-none text-sm text-neutral-900 placeholder:text-neutral-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono tracking-widest uppercase text-neutral-800 font-bold mb-2">
                    Anticipated Timeline
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-neutral-400 focus:border-black focus:outline-none text-sm text-neutral-900 transition-colors"
                  >
                    <option value="Immediate (Next 30 Days)">Immediate (Next 30 Days)</option>
                    <option value="Within 3 Months">Within 3 Months</option>
                    <option value="6-12 Months Ahead">6-12 Months Ahead</option>
                    <option value="Date In Discussion">Date In Discussion</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono tracking-widest uppercase text-neutral-800 font-bold mb-2">
                  Project Vision / Story Details *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share a few words on what you are looking to capture, stylistic references, or mood..."
                  className="w-full px-4 py-3 bg-white border border-neutral-400 focus:border-black focus:outline-none text-sm text-neutral-900 placeholder:text-neutral-500 transition-colors resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="text-[11px] text-neutral-700 font-mono font-medium flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-blue-600" />
                  <span>Direct to Akhil's studio desk</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 bg-black text-white text-xs tracking-widest uppercase font-semibold hover:bg-neutral-800 disabled:opacity-50 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>{isSubmitting ? 'Sending...' : 'Send Commission Request'}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
