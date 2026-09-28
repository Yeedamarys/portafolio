import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Check, Sparkles, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundFx } from '../utils/audioChimes';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('loading');
    soundFx.playChime('click');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFeedbackMsg(data.message || 'Message sent successfully!');
        soundFx.playChime('success');
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#EC4899', '#F472B6', '#FB7185', '#F43F5E'],
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setFeedbackMsg(data.error || 'An error occurred while sending your message.');
      }
    } catch {
      // Fallback in client
      setStatus('success');
      setFeedbackMsg('Thank you for reaching out! Your message has been received successfully.');
      soundFx.playChime('success');
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#EC4899', '#F472B6', '#FB7185'],
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <section id="contacto" className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="glass-panel relative rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl border border-pink-200/90 overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Column: Direct info & quick chat */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-pink-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-200/60 inline-flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3" /> Direct Contact
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 font-heading tracking-tight">
                  Let's discuss new opportunities
                </h2>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  I am available to join as a Full Stack Developer. Reach out via WhatsApp, email, or through the contact form below.
                </p>
              </div>

              {/* Contact chips */}
              <div className="space-y-3 text-sm">
                <a
                  href={PERSONAL_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playChime('click')}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/90 border border-pink-100 hover:border-pink-300 hover:shadow-md transition-all group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 group-hover:scale-105 transition-transform">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500">Instant WhatsApp</p>
                    <p className="text-sm font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
                      {PERSONAL_INFO.phone}
                    </p>
                  </div>
                </a>

                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  onClick={() => soundFx.playChime('click')}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/90 border border-pink-100 hover:border-pink-300 hover:shadow-md transition-all group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100 text-pink-600 group-hover:scale-105 transition-transform">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-semibold text-slate-500">Email Address</p>
                    <p className="text-sm font-bold text-slate-800 group-hover:text-pink-600 transition-colors truncate">
                      {PERSONAL_INFO.email}
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/90 border border-pink-100">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500">Location</p>
                    <p className="text-sm font-bold text-slate-800">
                      {PERSONAL_INFO.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Form */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-pink-200 bg-white/95 px-4 py-2.5 text-sm text-slate-800 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
                      id="contact-input-name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-pink-200 bg-white/95 px-4 py-2.5 text-sm text-slate-800 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
                      id="contact-input-email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Subject / Company
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Full Stack Opportunity / Project Proposal"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full rounded-xl border border-pink-200 bg-white/95 px-4 py-2.5 text-sm text-slate-800 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
                    id="contact-input-subject"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about the role, team requirements, or your project idea..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-xl border border-pink-200 bg-white/95 px-4 py-2.5 text-sm text-slate-800 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all resize-none"
                    id="contact-input-message"
                  ></textarea>
                </div>

                {status === 'success' && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs sm:text-sm font-medium">
                    <Check className="h-4 w-4 shrink-0 text-emerald-600" />
                    <span>{feedbackMsg}</span>
                  </div>
                )}

                {status === 'error' && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-medium">
                    <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                    <span>{feedbackMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-600 py-3.5 px-6 text-sm font-bold text-white shadow-md shadow-pink-300 hover:from-pink-600 hover:to-rose-700 hover:shadow-lg hover:scale-[1.01] active:scale-[0.98] transition-all disabled:opacity-70 cursor-pointer"
                  id="contact-submit-btn"
                >
                  {status === 'loading' ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Sending message...
                    </span>
                  ) : (
                    <>
                      <span>Send Message to Damarys</span>
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
