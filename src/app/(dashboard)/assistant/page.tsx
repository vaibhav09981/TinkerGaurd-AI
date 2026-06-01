'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, User, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: 'Hello! I\'m TickerGuard AI, your financial intelligence assistant. Ask me about company confusion, ticker symbols, market anomalies, or any stock-related questions.', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userMessage.content }),
      });
      const data = await res.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.answer || 'Sorry, I couldn\'t process that request.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request.',
        timestamp: new Date(),
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-4xl h-[calc(100vh-8rem)]">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">AI Chat Assistant</h1>
        <p className="mt-1 text-sm text-zinc-500">Ask anything about market confusion, companies, or ticker symbols.</p>
      </div>

      <div className="flex-1 flex flex-col rounded-2xl bg-[#111111] border border-[#1A1A1A] overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  msg.role === 'user'
                    ? 'bg-[#262626]'
                    : 'bg-[#00E5A8]/10 border border-[#00E5A8]/20'
                }`}>
                  {msg.role === 'user' ? <User className="w-4 h-4 text-zinc-400" /> : <Sparkles className="w-4 h-4 text-[#00E5A8]" />}
                </div>
                <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[#262626] text-zinc-200 rounded-tr-sm'
                    : 'bg-[#0A0A0A] text-zinc-300 border border-[#1A1A1A] rounded-tl-sm'
                }`}>
                  {msg.content.split('\n').map((line, i) => {
                    if (line.startsWith('### ')) return <h3 key={i} className="text-sm font-bold text-white mt-2 first:mt-0">{line.slice(4)}</h3>;
                    if (line.startsWith('**') && line.endsWith('**')) return <p key={i} className="font-bold text-white mt-1">{line.slice(2, -2)}</p>;
                    if (line.startsWith('* ')) return <li key={i} className="ml-3 mt-1">{line.slice(2)}</li>;
                    if (line.trim() === '') return <br key={i} />;
                    return <p key={i} className="mt-1">{line}</p>;
                  })}
                </div>
              </div>
            </motion.div>
          ))}
          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-lg bg-[#00E5A8]/10 border border-[#00E5A8]/20 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-[#00E5A8]" />
              </div>
              <div className="p-3 rounded-2xl rounded-tl-sm bg-[#0A0A0A] border border-[#1A1A1A]">
                <RefreshCw className="w-4 h-4 text-[#00E5A8] animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={sendMessage} className="p-4 border-t border-[#1A1A1A]">
          <div className="flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about ticker confusion, companies, markets..."
              className="flex-1 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#00E5A8]/30 transition"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="px-4 py-2.5 rounded-xl bg-[#00E5A8] text-black text-sm font-bold disabled:opacity-40 hover:bg-[#00E5A8]/90 transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
