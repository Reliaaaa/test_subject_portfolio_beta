import React, { useState } from 'react';
import { PERSONAL_DATA } from '@/constants';
import { Mail, Github, Instagram, Linkedin, Send } from 'lucide-react';

export default function Footer() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <footer className="border-t border-line bg-bg py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <h2 className="text-3xl font-serif italic mb-6">Let's connect</h2>
          <p className="text-muted max-w-md mb-8">
            I'm always open to new opportunities and collaborations. 
            Feel free to reach out if you have a project in mind or just want to say hi.
          </p>
          <div className="space-y-4 mb-12">
            <a 
              href={`mailto:${PERSONAL_DATA.email}`}
              className="text-xl font-medium hover:underline underline-offset-8 transition-all block"
            >
              {PERSONAL_DATA.email}
            </a>
          </div>

          <div className="flex gap-6">
            <SocialLink icon={<Github size={20} />} href={PERSONAL_DATA.socials.github} />
            <SocialLink icon={<Instagram size={20} />} href={PERSONAL_DATA.socials.instagram} />
            <SocialLink icon={<Linkedin size={20} />} href={PERSONAL_DATA.socials.linkedin} />
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Name"
                required
                className="bg-transparent border-b border-line py-4 focus:border-ink outline-none transition-colors"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                required
                className="bg-transparent border-b border-line py-4 focus:border-ink outline-none transition-colors"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <textarea
              placeholder="Message"
              required
              rows={4}
              className="w-full bg-transparent border-b border-line py-4 focus:border-ink outline-none transition-colors resize-none"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="flex items-center gap-3 text-sm uppercase tracking-widest font-medium group disabled:opacity-50"
            >
              {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent' : 'Send Message'}
              <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
            {status === 'error' && (
              <p className="text-xs text-red-500 uppercase tracking-widest">Something went wrong. Please try again.</p>
            )}
          </form>
          
          <div className="mt-20 text-xs uppercase tracking-widest text-muted">
            © {new Date().getFullYear()} {PERSONAL_DATA.name}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a 
      href={href} 
      className="w-10 h-10 rounded-full border border-line flex items-center justify-center text-muted hover:text-ink hover:border-ink transition-all"
    >
      {icon}
    </a>
  );
}
