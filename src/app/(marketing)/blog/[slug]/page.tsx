import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft, Clock, Eye, Shield, Calendar } from 'lucide-react';
import { getBlogPosts } from '@/app/actions';

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return { title: 'Article Not Found — TickerGuard AI' };
  return {
    title: `${post.title} — TickerGuard AI Research`,
    description: post.summary,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) return notFound();

  const relatedPosts = posts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 2);

  return (
    <div className="relative flex flex-col">
      <div className="relative h-72 sm:h-96 bg-[#111111] border-b border-[#1A1A1A] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/40 to-[#0A0A0A]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Shield className="w-20 h-20 text-[#00E5A8]/20" />
        </div>
      </div>

      <main className="flex-1 px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-[#00E5A8] transition mb-8">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Research Hub
          </Link>

          <div className="flex flex-col gap-4 mb-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{post.category}</span>
              <span className="text-zinc-700">·</span>
              <span className="flex items-center gap-1 text-[10px] text-zinc-600 font-medium">
                <Calendar className="w-3 h-3" />
                {new Date(post.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="text-zinc-700">·</span>
              <span className="flex items-center gap-1 text-[10px] text-zinc-600 font-medium">
                <Clock className="w-3 h-3" /> {post.readingTime} min read
              </span>
              <span className="text-zinc-700">·</span>
              <span className="flex items-center gap-1 text-[10px] text-zinc-600 font-medium">
                <Eye className="w-3 h-3" /> {post.viewsCount.toLocaleString()} views
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">{post.title}</h1>
            <p className="text-sm text-zinc-400 leading-relaxed">{post.summary}</p>
          </div>

          <div className="flex flex-col gap-8">
            <article className="prose prose-invert max-w-none">
              <div className="flex flex-col gap-4 text-sm text-zinc-300 leading-relaxed">
                {post.content.split('\n').map((para, i) => {
                  if (para.startsWith('# ')) return <h2 key={i} className="text-xl font-bold text-white mt-6 first:mt-0">{para.slice(2)}</h2>;
                  if (para.startsWith('## ')) return <h3 key={i} className="text-lg font-bold text-white mt-5">{para.slice(3)}</h3>;
                  if (para.startsWith('### ')) return <h4 key={i} className="text-base font-bold text-white mt-4">{para.slice(4)}</h4>;
                  if (para.startsWith('> ')) return <blockquote key={i} className="border-l-2 border-[#00E5A8]/50 pl-4 py-1 text-zinc-400 italic">{para.slice(2)}</blockquote>;
                  if (para.startsWith('|')) return null;
                  if (para.startsWith('```')) return null;
                  if (para.startsWith('* ')) return <li key={i} className="ml-4 text-xs text-zinc-400">{para.slice(2)}</li>;
                  if (para.trim() === '') return <br key={i} />;
                  return <p key={i} className="text-sm text-zinc-300 leading-relaxed">{para}</p>;
                })}
              </div>
            </article>

            {post.relatedSymbols && post.relatedSymbols.length > 0 && (
              <div className="p-5 rounded-2xl bg-[#111111] border border-[#1A1A1A]">
                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Related Companies</h3>
                <div className="flex flex-wrap gap-2">
                  {post.relatedSymbols.map((s) => (
                    <span key={s} className="text-[10px] font-mono font-bold px-2 py-1 rounded bg-[#1A1A1A] text-zinc-300 border border-[#262626]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {relatedPosts.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-white mb-4">Related Articles</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedPosts.map((rp) => (
                    <Link
                      key={rp.slug}
                      href={`/blog/${rp.slug}`}
                      className="flex flex-col gap-2 p-4 rounded-xl bg-[#111111] border border-[#1A1A1A] hover:border-[#262626] transition group"
                    >
                      <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider">{rp.category}</span>
                      <h4 className="text-xs font-bold text-white group-hover:text-[#00E5A8] transition-colors leading-snug">{rp.title}</h4>
                      <span className="text-[10px] text-zinc-600">{rp.readingTime} min read</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
