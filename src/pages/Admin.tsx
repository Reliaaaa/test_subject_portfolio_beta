import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Calendar, User, MessageSquare } from 'lucide-react';

interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export default function Admin() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/contacts')
      .then(res => res.json())
      .then(data => {
        setContacts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="pt-32 px-6 max-w-7xl mx-auto pb-20">
      <header className="mb-12">
        <h1 className="text-4xl font-serif italic mb-4">Message Inbox</h1>
        <p className="text-muted">Review inquiries and messages from your portfolio visitors.</p>
      </header>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-muted border-t-ink rounded-full animate-spin" />
        </div>
      ) : contacts.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-line rounded-2xl">
          <MessageSquare className="mx-auto mb-4 text-muted" size={48} />
          <p className="text-muted">No messages yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {contacts.map((contact) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 border border-line rounded-2xl bg-zinc-950/30 hover:border-muted transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-line flex items-center justify-center">
                    <User size={18} className="text-muted" />
                  </div>
                  <div>
                    <h3 className="font-medium">{contact.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-muted mt-1">
                      <Mail size={12} />
                      {contact.email}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted font-mono">
                  <Calendar size={12} />
                  {new Date(contact.created_at).toLocaleDateString()} {new Date(contact.created_at).toLocaleTimeString()}
                </div>
              </div>
              <p className="text-muted leading-relaxed whitespace-pre-wrap">
                {contact.message}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
