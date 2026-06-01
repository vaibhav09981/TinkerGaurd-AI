import { NextResponse } from 'next/server';
import { JSONDatabase } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '10');

    let posts = await JSONDatabase.getCollection('blogPosts');

    if (category) {
      posts = posts.filter((p) => p.category === category);
    }

    posts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

    return NextResponse.json(posts.slice(0, limit));
  } catch (error) {
    console.error('Blog fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}
