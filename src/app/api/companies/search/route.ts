import { NextResponse } from 'next/server';
import { JSONDatabase } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q')?.toLowerCase() || '';

    const companies = await JSONDatabase.getCollection('companies');

    if (!q) {
      return NextResponse.json(companies.slice(0, 20));
    }

    const filtered = companies.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.symbol.toLowerCase().includes(q) ||
        c.brandName?.toLowerCase().includes(q)
    );

    return NextResponse.json(filtered.slice(0, 20));
  } catch (error) {
    console.error('Company search error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
