import { NextResponse } from 'next/server';
import { AIEngine } from '@/lib/ai';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { companyAName, companyASymbol, companyBName, companyBSymbol, contextInfo } = body;

    if (!companyAName || !companyBName) {
      return NextResponse.json({ error: 'Company names are required' }, { status: 400 });
    }

    const result = await AIEngine.generateInvestigation(
      companyAName,
      companyASymbol || 'UNKNOWN',
      companyBName,
      companyBSymbol || 'UNKNOWN',
      contextInfo
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error('AI investigation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate investigation' },
      { status: 500 }
    );
  }
}
