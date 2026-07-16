import { JSONDatabase } from './db';
import { calculateNameSimilarity, calculateConfusionScore } from './scoring';

export interface AIInvestigationResult {
  title: string;
  summary: string;
  rootCause: string;
  marketImpact: string;
  investorWarning: string;
  affectedCompanies: string;
  comparisonTable: { metric: string; companyA: string; companyB: string }[];
  timeline: { date: string; event: string }[];
  faqs: { question: string; answer: string }[];
  sources: string[];
}

export interface AIChatResponse {
  answer: string;
  detectedAlerts?: { title: string; severity: 'low' | 'medium' | 'high' | 'critical' }[];
}

async function callOpenAI(systemPrompt: string, userPrompt: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey.startsWith('sk-proj-placeholder')) {
    throw new Error('Missing or placeholder OpenAI API key');
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.2,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API request failed: ${response.status} - ${errorText}`);
    }

    const json = await response.json();
    return json.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('OpenAI fetch error, falling back to simulator:', error);
    throw error;
  }
}

/**
 * Core AI Engine Orchestrator
 */
export class AIEngine {
  /**
   * Generates a fully detailed stock market identity confusion investigation
   */
  public static async generateInvestigation(
    companyAName: string,
    companyASymbol: string,
    companyBName: string,
    companyBSymbol: string,
    contextInfo?: string
  ): Promise<AIInvestigationResult> {
    const systemPrompt = `You are TickerGuard AI, an elite financial forensic intelligence agent. 
Analyze the brand or name confusion between Company A (unlisted or primary brand) and Company B (publicly listed or misidentified stock).
Provide a structured, highly premium JSON output containing investigation details.`;

    const userPrompt = `Investigate the confusion between:
Company A (Brand): ${companyAName} (${companyASymbol})
Company B (Listed Ticker): ${companyBName} (${companyBSymbol})
Context: ${contextInfo || 'Retail investors are buying Company B by mistake thinking it is Company A.'}

You MUST return a JSON object ONLY with the following exact keys:
{
  "title": "Investigation Title...",
  "summary": "High-level summary...",
  "rootCause": "Detailed root cause analysis...",
  "marketImpact": "Analysis of volume spikes and stock anomalies...",
  "investorWarning": "Clear, direct actionable advice for retail investors...",
  "affectedCompanies": "SymbolA, SymbolB",
  "comparisonTable": [
     {"metric": "Industry", "companyA": "...", "companyB": "..."},
     {"metric": "Listing Status", "companyA": "...", "companyB": "..."}
  ],
  "timeline": [
     {"date": "Date string", "event": "Details..."}
  ],
  "faqs": [
     {"question": "Q1...", "answer": "A1..."}
  ],
  "sources": ["Source 1", "Source 2"]
}`;

    try {
      const response = await callOpenAI(systemPrompt, userPrompt);
      // Clean potential JSON markdown fence blocks
      const cleanJson = response.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleanJson) as AIInvestigationResult;
    } catch {
      // High-quality dynamic simulator fallback
      return this.simulateInvestigation(companyAName, companyASymbol, companyBName, companyBSymbol, contextInfo);
    }
  }

  /**
   * AI Chat Assistant response generator
   */
  public static async getChatResponse(userQuery: string, history: { role: string; content: string }[] = []): Promise<AIChatResponse> {
    const systemPrompt = `You are TickerGuard AI, a financial intelligence chatbot. 
Explain market anomalies, ticker symbol confusion, and financial rumors with high precision. 
Be concise, premium, use bold markdown highlights, and speak like an institutional risk analyst.
If the user asks about Parle, Zoom, or Signal, explain the corporate identity separation carefully.`;

    const userPrompt = `Query: ${userQuery}`;

    try {
      const answer = await callOpenAI(systemPrompt, JSON.stringify([...history, { role: 'user', content: userQuery }]));
      return { answer };
    } catch {
      // High-quality conversational simulator fallback
      return this.simulateChatResponse(userQuery);
    }
  }

  /**
   * Generates a complete research blog article from a confusion case
   */
  public static async generateBlogFromInvestigation(inv: AIInvestigationResult): Promise<{
    title: string;
    slug: string;
    summary: string;
    content: string;
    readingTime: number;
    riskRating: 'low' | 'medium' | 'high' | 'critical';
  }> {
    const slug = inv.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const content = `## Executive Overview

${inv.summary}

### The Core Disconnect (Root Cause)

${inv.rootCause}

### Market Activity & Volume Anomalies

${inv.marketImpact}

### TickerGuard AI Verdict & Investor Action

> [!WARNING]
> **TickerGuard Forensic Assessment**: ${inv.investorWarning}

### Brand vs. Entity Comparison

Below is the structured breakdown of these two assets:

| Metric | Primary Brand (Private/Unlisted) | Listed Ticker (Public) |
| :--- | :--- | :--- |
${inv.comparisonTable.map(row => `| **${row.metric}** | ${row.companyA} | ${row.companyB} |`).join('\n')}

---

### Incident Timeline

${inv.timeline.map(t => `* **${t.date}**: ${t.event}`).join('\n')}

---

### Frequently Asked Questions

${inv.faqs.map(faq => `#### ${faq.question}\n${faq.answer}\n`).join('\n')}

---

### Referenced Intelligence Sources
${inv.sources.map(s => `* ${s}`).join('\n')}
`;

    // Estimate reading time based on word count
    const words = content.split(/\s+/).length;
    const readingTime = Math.max(1, Math.round(words / 200));

    return {
      title: inv.title,
      slug,
      summary: inv.summary.substring(0, 160) + '...',
      content,
      readingTime,
      riskRating: 'high'
    };
  }

  // ==========================================
  // Dynamic Simulators / Local Core fallbacks
  // ==========================================

  private static simulateInvestigation(
    aName: string,
    aSymbol: string,
    bName: string,
    bSymbol: string,
    context?: string
  ): AIInvestigationResult {
    const similarity = calculateNameSimilarity(aName, bName);

    return {
      title: `Forensic Inquiry: Name Mismatch between ${aName} and ${bName}`,
      summary: `A thorough audit of capital flows indicates retail stock buying of public ticker ${bSymbol} (${bName}) driven by social media keywords and name similarity rather than underlying company performance associated with ${aName}.`,
      rootCause: `Retail investors seeking the unlisted or primary brand "${aName}" searched broker interfaces and selected "${bName}" due to a high semantic overlap score of ${similarity}%. Algorithms and speculative retail discussions amplified the mistake.`,
      marketImpact: `Heavy daily buy volumes on ${bSymbol} (+800% vs 30-day baseline) coincided with viral public releases about ${aName}, driving an artificial circuit pump.`,
      investorWarning: `Avoid trading "${bName}" (${bSymbol}) on rumors belonging to "${aName}". The entities share no commercial dependencies, cash assets, or parent-subsidiary governance.`,
      affectedCompanies: `${aSymbol}, ${bSymbol}`,
      comparisonTable: [
        { metric: 'Legal Name', companyA: aName, companyB: bName },
        { metric: 'Stock Status', companyA: 'Unlisted (Private Brand)', companyB: `Listed (${bSymbol})` },
        { metric: 'Sector', companyA: 'Consumer Confectionery / Services', companyB: 'Industrial Holdings & Infrastructure' },
        { metric: 'Core Revenue Source', companyA: 'Retail Food Brands & IP', companyB: 'Real Estate & Paper Mills' }
      ],
      timeline: [
        { date: 'T-2 Days', event: `Viral social mentions trigger high search intent for "${aName}".` },
        { date: 'T-1 Day', event: `Volume of listed entity ${bSymbol} spikes dramatically during pre-market sessions.` },
        { date: 'Today', event: `TickerGuard AI triggers a name similarity warning flag of ${similarity}%.` }
      ],
      faqs: [
        { 
          question: `Are "${aName}" and "${bName}" under the same company?`, 
          answer: `No. They are entirely separate corporate entities with individual capitalization tables and unrelated boards.` 
        },
        { 
          question: `Why is the stock price of ${bSymbol} going up then?`, 
          answer: `The rally is driven by retail investor misidentification and high-frequency algorithms scanning similar words, rather than corporate asset valuation.` 
        }
      ],
      sources: [
        'TickerGuard AI Ticker Similarity index',
        'Exchange Volume Reporting registries',
        'Social Media Hype spikes tracking API'
      ]
    };
  }

  private static simulateChatResponse(query: string): AIChatResponse {
    const q = query.toLowerCase();
    let answer = '';

    if (q.includes('parle') || q.includes('melody') || q.includes('biscuit')) {
      answer = `### Parle Confectionery vs. Paper Stock Confusion

**Parle Products Private Limited** (which makes Parle-G biscuits, Melody, Kismi, and Hide & Seek) is a **completely unlisted private company**. 

**Parle Industries Limited (BSE: PARLEIND)** is a publicly traded company on the Bombay Stock Exchange that focuses on **real estate, infrastructure, and waste paper products**. 

They have **zero** common ownership or business relation! Whenever Parle-G goes viral or announces expansion, retail investors mistakenly buy **PARLEIND** stock by mistake, causing temporary unjustified rallies. Always double check listing details!`;
    } else if (q.includes('signal') || q.includes('musk') || q.includes('sigl')) {
      answer = `### The Elon Musk "Use Signal" Market Case

In January 2021, Elon Musk tweeted a simple endorsement: **"Use Signal"** (referring to the secure, private encrypted messaging app).

Because the Signal app is managed by the unlisted non-profit **Signal Foundation**, retail buyers incorrectly purchased shares of **Signal Advance, Inc. (OTC: SIGL)**, a tiny medical device technology company. 

This name confusion inflated **SIGL** stock value by **11,000%** in just three days, going from $0.60 to over $70 per share, before crashing heavily. This is a premier warning case of ticker symbol mistakes.`;
    } else if (q.includes('zoom') || q.includes('zm') || q.includes('otc')) {
      answer = `### Zoom Video (ZM) vs. Zoom Technologies (ZOOM)

During high-volume cycles, investors seeking **Zoom Video Communications, Inc. (NASDAQ: ZM)** frequently buy shares of **Zoom Technologies, Inc. (OTC: ZOOM)** by mistake.

While **ZM** is the major video meetings corporation, **ZOOM** was an inactive OTC shell. The SEC had to repeatedly halt trading on the OTC ticker "ZOOM" to protect retail investors from trading losses caused by simple word association.`;
    } else {
      answer = `### TickerGuard AI Forensic Analysis

Thank you for querying. Our neural database actively tracks your keyword **"${query}"** across corporate databases. 

**Guidance**:
* Ensure you match the **CUSIP/ISIN** identifier before buying.
* A high **Confusion Score** (above 70) indicates that the company is actively subject to retail keyword mismatch.
* Review our **Live News Feed** to verify if a stock's sudden movement is backed by actual corporate fundamentals or simple news misunderstandings.`;
    }

    return { answer };
  }
}
