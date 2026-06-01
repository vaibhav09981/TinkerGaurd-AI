import { NextResponse } from 'next/server';
import { AIEngine } from '@/lib/ai';

export async function POST(request: Request) {
  try {
    const { query, history } = await request.json();

    if (!query || typeof query !== 'string') {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const response = await AIEngine.getChatResponse(query, history || []);
    return NextResponse.json(response);
  } catch (error) {
    console.error('AI chat error:', error);
    return NextResponse.json(
      { error: 'Failed to process AI request' },
      { status: 500 }
    );
  }
}
