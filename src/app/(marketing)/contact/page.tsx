'use client';

import { useState } from 'react';

import { motion } from 'framer-motion';
import { Send, Mail, MessageSquare, ArrowRight, Users } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative flex flex-col">
      <section className="relative min-h-[40vh] flex flex-col items-center justify-center text-center px-4 pt-24 pb-16 overflow-hidden bg-grid-pattern">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-purple-500/6 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-6">
            <Mail className="w-3.5 h-3.5 text-muted-foreground" />
            Contact
          </span>
          <h1 className="max-w-4xl text-4xl sm:text-5xl font-bold tracking-tight leading-tight text-foreground">
            Get in <span className="text-muted-foreground">Touch</span>
          </h1>
          <p className="mt-4 max-w-lg text-base text-muted-foreground leading-relaxed">
            Have questions about TickerGuard AI? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-12 max-w-6xl mx-auto w-full">
        {submitted ? (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-muted border border-border flex items-center justify-center mb-4">
              <Send className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Message Sent!</h2>
            <p className="text-sm text-muted-foreground">Thanks for reaching out. We'll get back to you within 24 hours.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-3">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">First Name</label>
                    <input required placeholder="John" className="bg-card border border-input rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-ring transition" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Last Name</label>
                    <input required placeholder="Doe" className="bg-card border border-input rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-ring transition" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</label>
                  <input required type="email" placeholder="john@example.com" className="bg-card border border-input rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-ring transition" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Subject</label>
                  <select className="bg-card border border-input rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-ring transition">
                    <option>General Inquiry</option>
                    <option>Enterprise Sales</option>
                    <option>Technical Support</option>
                    <option>Partnership</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Message</label>
                  <textarea required rows={5} placeholder="How can we help?" className="bg-card border border-input rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-ring transition resize-none" />
                </div>
                <button type="submit" className="flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition">
                  Send Message <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
            <div className="md:col-span-2 flex flex-col gap-4">
              <div className="p-5 rounded-2xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-muted border border-border flex items-center justify-center">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                  </div>
                   <div>
                      <p className="text-xs font-bold text-foreground">Email</p>
                      <p className="text-xs text-muted-foreground">hello@tickerguard.ai</p>
                    </div>
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-muted border border-border flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">Live Chat</p>
                    <p className="text-xs text-muted-foreground">Available for Pro & Enterprise</p>
                  </div>
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-muted border border-border flex items-center justify-center">
                    <Users className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">Enterprise</p>
                    <p className="text-xs text-muted-foreground">Custom deployments available</p>
                  </div>
                </div>
              </div>
              <Link href="/pricing" className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition mt-2">
                View Pricing <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
