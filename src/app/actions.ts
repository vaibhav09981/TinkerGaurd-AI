'use server';

import { JSONDatabase } from '@/lib/db';
import { AIEngine } from '@/lib/ai';

export async function getCompanies(searchQuery?: string) {
  const companies = await JSONDatabase.getCollection('companies');
  if (!searchQuery) return companies;
  const q = searchQuery.toLowerCase();
  return companies.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.symbol.toLowerCase().includes(q) ||
      c.brandName?.toLowerCase().includes(q)
  );
}

export async function getCompanyBySymbol(symbol: string) {
  const companies = await JSONDatabase.getCollection('companies');
  return companies.find((c) => c.symbol.toLowerCase() === symbol.toLowerCase());
}

export async function getAlerts() {
  return JSONDatabase.getCollection('alerts');
}

export async function resolveAlert(id: string) {
  const alerts = await JSONDatabase.getCollection('alerts');
  const alert = alerts.find((a) => a.id === id);
  if (!alert) return null;
  alert.isResolved = true;
  await JSONDatabase.saveCollection('alerts', alerts);
  return alert;
}

export async function getNews() {
  return JSONDatabase.getCollection('newsArticles');
}

export async function getConfusionCases() {
  return JSONDatabase.getCollection('confusionCases');
}

export async function getInvestigations() {
  return JSONDatabase.getCollection('investigations');
}

export async function getSocialMentions() {
  return JSONDatabase.getCollection('socialMentions');
}

export async function getBlogPosts(category?: string) {
  let posts = await JSONDatabase.getCollection('blogPosts');
  if (category) {
    posts = posts.filter((p) => p.category === category);
  }
  posts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  return posts;
}

export async function getBlogCategories() {
  const posts = await JSONDatabase.getCollection('blogPosts');
  const categories = Array.from(new Set(posts.map((p) => p.category)));
  return categories;
}

export async function runInvestigation(data: {
  companyAName: string;
  companyASymbol: string;
  companyBName: string;
  companyBSymbol: string;
  contextInfo?: string;
}) {
  const result = await AIEngine.generateInvestigation(
    data.companyAName,
    data.companyASymbol,
    data.companyBName,
    data.companyBSymbol,
    data.contextInfo
  );

  const blogPost = await AIEngine.generateBlogFromInvestigation(result);

  const investigation = {
    title: result.title,
    summary: result.summary,
    rootCause: result.rootCause,
    marketImpact: result.marketImpact,
    investorWarning: result.investorWarning,
    affectedCompanies: result.affectedCompanies,
    createdAt: new Date().toISOString(),
  };

  await JSONDatabase.insertItem('investigations', investigation);
  const blogData = {
    title: blogPost.title,
    slug: blogPost.slug,
    summary: blogPost.summary,
    content: blogPost.content,
    readingTime: blogPost.readingTime,
    riskRating: blogPost.riskRating,
    coverImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop',
    viewsCount: 0,
    author: 'TickerGuard AI Research',
    category: 'Market Confusion Cases',
    relatedSymbols: data.companyASymbol && data.companyBSymbol ? [data.companyASymbol, data.companyBSymbol] : undefined,
    publishDate: new Date().toISOString(),
  };

  await JSONDatabase.insertItem('blogPosts', blogData);

  return { result, blogPost: blogData };
}

export async function sendChatMessage(content: string) {
  const response = await AIEngine.getChatResponse(content);
  const messages = await JSONDatabase.getCollection('chatHistory');
  messages.push(
    { id: `ch_${Date.now()}_user`, role: 'user' as const, content, createdAt: new Date().toISOString() },
    { id: `ch_${Date.now()}_ai`, role: 'assistant' as const, content: response.answer, createdAt: new Date().toISOString() }
  );
  await JSONDatabase.saveCollection('chatHistory', messages.slice(-50));
  return response;
}

export async function getChatHistory() {
  return JSONDatabase.getCollection('chatHistory');
}
