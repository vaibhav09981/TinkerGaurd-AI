import { Metadata } from 'next';
import { getBlogPosts, getBlogCategories } from '@/app/actions';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: 'Research Blog — TickerGuard AI',
  description: 'AI-generated market investigations, investor education, and financial intelligence reports.',
};

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const categories = await getBlogCategories();

  return <BlogClient posts={posts} categories={categories} />;
}
