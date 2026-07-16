import fs from 'fs/promises';
import path from 'path';

export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'user' | 'admin';
  tier: 'starter' | 'pro' | 'enterprise';
  createdAt: string;
}

export interface Company {
  id: string;
  symbol: string;
  name: string;
  brandName?: string;
  isListed: boolean;
  industry?: string;
  parentCompany?: string;
  description?: string;
  riskHistory: { date: string; score: number }[];
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: 'confusion' | 'news_spike' | 'social_hype' | 'abnormal_movement';
  symbol: string;
  createdAt: string;
  isResolved?: boolean;
}

export interface NewsArticle {
  id: string;
  title: string;
  source: string;
  url?: string;
  sentiment: number; 
  riskScore: number; 
  content: string;
  publishedAt: string;
  symbols: string[];
  isConfusionEvent?: boolean;
  isViral?: boolean;
}

export interface ConfusionCase {
  id: string;
  companyA: { name: string; symbol: string; isListed: boolean; brandName?: string };
  companyB: { name: string; symbol: string; isListed: boolean; brandName?: string };
  similarityScore: number;
  riskLevel: 'green' | 'yellow' | 'red';
  explanation: string;
  verdict: string;
  createdAt: string;
}

export interface SocialMention {
  id: string;
  platform: 'reddit' | 'twitter' | 'youtube' | 'forum';
  symbol: string;
  mentionsCount: number;
  growthRate: number; 
  sentiment: number; 
  suspiciousScore: number; 
  timestamp: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string; 
  coverImage: string;
  readingTime: number;
  publishDate: string;
  riskRating: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  viewsCount: number;
  author: string;
  relatedSymbols?: string[];
}

export interface Investigation {
  id: string;
  title: string;
  summary: string;
  rootCause: string;
  marketImpact: string;
  investorWarning: string;
  affectedCompanies: string; 
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

export interface DatabaseSchema {
  users: User[];
  companies: Company[];
  alerts: Alert[];
  newsArticles: NewsArticle[];
  confusionCases: ConfusionCase[];
  socialMentions: SocialMention[];
  blogPosts: BlogPost[];
  investigations: Investigation[];
  chatHistory: ChatMessage[];
}

const DB_FILE_PATH = path.join(process.cwd(), 'db.json');

const DEFAULT_SEED_DATA: DatabaseSchema = {
  users: [
    {
      id: 'usr_dev_admin',
      email: 'admin@tickerguard.ai',
      name: 'Developer Admin',
      role: 'admin',
      tier: 'enterprise',
      createdAt: new Date().toISOString(),
    }
  ],
  companies: [
    {
      id: 'co_parle_products',
      symbol: 'PARLEPROD',
      name: 'Parle Products Private Limited',
      brandName: 'Parle-G, Melody, Kismi',
      isListed: false,
      industry: 'FMCG & Biscuits',
      parentCompany: 'House of Parle',
      description: 'An unlisted Indian biscuit, confectionery, and food company. Owner of the legendary Parle-G, Kismi, and Melody brands. Totally private and not traded on public stock exchanges.',
      riskHistory: [{ date: '2026-05-28', score: 10 }, { date: '2026-05-29', score: 85 }, { date: '2026-05-30', score: 92 }, { date: '2026-06-01', score: 88 }]
    },
    {
      id: 'co_parle_ind',
      symbol: 'PARLEIND',
      name: 'Parle Industries Limited',
      brandName: 'Parle Industries',
      isListed: true,
      industry: 'Infrastructure & Paper',
      parentCompany: 'None',
      description: 'A publicly listed company traded on the Bombay Stock Exchange (BSE) engaged in infrastructure, real estate, and paper manufacturing. Often mistakenly purchased during viral news cycles about Parle Products biscuits.',
      riskHistory: [{ date: '2026-05-28', score: 10 }, { date: '2026-05-29', score: 82 }, { date: '2026-05-30', score: 90 }, { date: '2026-06-01', score: 87 }]
    },
    {
      id: 'co_signal_messenger',
      symbol: 'SIGNALAPP',
      name: 'Signal Messenger LLC',
      brandName: 'Signal Private Messenger',
      isListed: false,
      industry: 'Social Networking & Technology',
      parentCompany: 'Signal Foundation',
      description: 'A non-profit open-source encrypted communication service. Operates the Signal app. Completely unlisted and funded solely by donations and grants.',
      riskHistory: [{ date: '2026-05-28', score: 5 }, { date: '2026-05-29', score: 98 }, { date: '2026-05-30', score: 96 }, { date: '2026-06-01', score: 40 }]
    },
    {
      id: 'co_signal_advance',
      symbol: 'SIGL',
      name: 'Signal Advance, Inc.',
      brandName: 'Signal Advance',
      isListed: true,
      industry: 'Medical Devices & Tech',
      parentCompany: 'None',
      description: 'A tiny publicly traded medical technology firm. Not related to Signal Messenger in any way. Experienced an 11,000% rally when Elon Musk tweeted "Use Signal".',
      riskHistory: [{ date: '2026-05-28', score: 5 }, { date: '2026-05-29', score: 99 }, { date: '2026-05-30', score: 95 }, { date: '2026-06-01', score: 35 }]
    },
    {
      id: 'co_zoom_video',
      symbol: 'ZM',
      name: 'Zoom Video Communications, Inc.',
      brandName: 'Zoom Cloud Meetings',
      isListed: true,
      industry: 'Enterprise Communications',
      parentCompany: 'None',
      description: 'A prominent cloud video conferencing platform. Listed on Nasdaq under ticker ZM. Went viral and experienced massive legitimate growth during remote work booms.',
      riskHistory: [{ date: '2026-05-28', score: 12 }, { date: '2026-05-29', score: 25 }, { date: '2026-05-30', score: 68 }, { date: '2026-06-01', score: 55 }]
    },
    {
      id: 'co_zoom_tech',
      symbol: 'ZOOM',
      name: 'Zoom Technologies, Inc.',
      brandName: 'Zoom Tech',
      isListed: true,
      industry: 'Electronic Components (OTC)',
      parentCompany: 'None',
      description: 'An obscure OTC holding company with zero operations related to video communication. Mistakenly purchased by thousands of retail traders during the ZM IPO and viral meetings boom.',
      riskHistory: [{ date: '2026-05-28', score: 10 }, { date: '2026-05-29', score: 22 }, { date: '2026-05-30', score: 72 }, { date: '2026-06-01', score: 52 }]
    }
  ],
  alerts: [
    {
      id: 'alt_001',
      title: 'Critical Identity Confusion Detected: PARLE',
      message: 'Retail volumes on BSE listed PARLEIND (Parle Industries) have spiked +1,200% following a viral Twitter rumor that Parle G is launching an AI biscuit factory. Note: Biscuit brand Parle-G belongs to PARLEPROD (Parle Products), which is completely unlisted and private.',
      severity: 'critical',
      type: 'confusion',
      symbol: 'PARLEIND',
      createdAt: new Date().toISOString(),
      isResolved: false
    },
    {
      id: 'alt_002',
      title: 'Hype Spike: SIGL (Signal Advance)',
      message: 'Social discussions on r/wallstreetbets and X have escalated +450% quoting "Use Signal". This is causing active buying pressure on SIGL (medical device company), entirely detached from their underlying financials.',
      severity: 'high',
      type: 'social_hype',
      symbol: 'SIGL',
      createdAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
      isResolved: false
    },
    {
      id: 'alt_003',
      title: 'Extreme Volatility Divergence: ZOOM',
      message: 'OTC stock ZOOM (Zoom Technologies) has risen +48% in early trading sessions. This is highly correlated with news of Zoom Video (ZM) releasing new virtual-reality meeting specs, pointing to continuing historical name mistakes.',
      severity: 'medium',
      type: 'abnormal_movement',
      symbol: 'ZOOM',
      createdAt: new Date(Date.now() - 10 * 3600 * 1000).toISOString(),
      isResolved: false
    }
  ],
  newsArticles: [
    {
      id: 'art_001',
      title: 'Melody Candy Goes Viral After Parle Products Announces Billion-Dollar Sweet Innovation',
      source: 'Financial Times India',
      sentiment: 0.85,
      riskScore: 88,
      content: 'Shares of Parle Industries Limited surged by 20% today, hitting the upper circuit. Analysts cite a massive social media campaign around the iconic "Melody" chocolate, which went viral following a press announcement by parent biscuit group Parle Products Private Ltd regarding a next-gen confectionery manufacturing line. However, financial researchers warn that Parle Products (the candy manufacturer) is entirely private and not related to the listed paper infrastructure firm Parle Industries.',
      publishedAt: new Date().toISOString(),
      symbols: ['PARLEPROD', 'PARLEIND'],
      isConfusionEvent: true,
      isViral: true
    },
    {
      id: 'art_002',
      title: 'Elon Musk Tweets "Use Signal": The Aftermath of Secure Messenger Recommendations',
      source: 'TechPulse Media',
      sentiment: 0.12,
      riskScore: 92,
      content: 'When prominent billionaire Elon Musk tweeted the two-word advice "Use Signal" as a secure alternative to major WhatsApp policy updates, retail stock pickers quickly rushed to purchase public shares. In a bizarre twist, ticker symbol SIGL belonging to Signal Advance Inc (a tiny medical tech manufacturer) experienced an astronomical rise, shooting up from $0.60 to over $70 per share in days. The secure communications app itself is run by the non-profit Signal Messenger LLC, which is unlisted.',
      publishedAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
      symbols: ['SIGNALAPP', 'SIGL'],
      isConfusionEvent: true,
      isViral: true
    },
    {
      id: 'art_003',
      title: 'Securities Commission Halts Trading on Zoom OTC Stock to Protect Confused Traders',
      source: 'SEC Intelligence',
      sentiment: -0.45,
      riskScore: 70,
      content: 'In response to persistent identity mistakes, regulators have stepped in to halt trading on OTC symbol ZOOM. Retail buyers seeking ZM (Zoom Video Communications) have repeatedly funneled capital into Zoom Technologies (ZOOM) by mistake, generating artificial bubble rallies which have forced compliance audits.',
      publishedAt: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
      symbols: ['ZM', 'ZOOM'],
      isConfusionEvent: false,
      isViral: false
    }
  ],
  confusionCases: [
    {
      id: 'cc_001',
      companyA: { name: 'Parle Products Private Ltd', symbol: 'PARLEPROD', isListed: false, brandName: 'Melody, Parle-G' },
      companyB: { name: 'Parle Industries Limited', symbol: 'PARLEIND', isListed: true, brandName: 'Parle Industries' },
      similarityScore: 90,
      riskLevel: 'red',
      explanation: 'Name overlap is extremely high (90% match). Both use the brand trademark word "Parle". One is an unlisted FMCG empire, and the other is a listed infrastructure business. Highly vulnerable to brand confusion.',
      verdict: 'Active Danger. Retail buying spikes on PARLEIND are highly correlated with PARLEPROD confectionery viral trends.',
      createdAt: new Date().toISOString()
    },
    {
      id: 'cc_002',
      companyA: { name: 'Signal Messenger LLC', symbol: 'SIGNALAPP', isListed: false, brandName: 'Signal App' },
      companyB: { name: 'Signal Advance, Inc.', symbol: 'SIGL', isListed: true, brandName: 'Signal Advance' },
      similarityScore: 82,
      riskLevel: 'red',
      explanation: 'Both share the core brand identifier word "Signal". Signal Messenger is a private app, whereas Signal Advance is a small medical equipment firm. Elon Musk\'s tweet caused total retail displacement.',
      verdict: 'High Historical Risk. Ticker confusion resulted in an 11,000% unjustified market pump.',
      createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString()
    },
    {
      id: 'cc_003',
      companyA: { name: 'Zoom Video Communications', symbol: 'ZM', isListed: true, brandName: 'Zoom Meetings' },
      companyB: { name: 'Zoom Technologies, Inc.', symbol: 'ZOOM', isListed: true, brandName: 'Zoom Tech' },
      similarityScore: 88,
      riskLevel: 'yellow',
      explanation: 'Shares spelling match ("Zoom"). Main videoconference is listed under ZM, whereas ZOOM is an OTC shell corporation. Highly misleading to basic keyword searches on stock brokers.',
      verdict: 'Moderate Risk. Regulators actively supervise OTC trades but retail name matching spikes persist during high volume.',
      createdAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString()
    }
  ],
  socialMentions: [
    {
      id: 'sm_001',
      platform: 'twitter',
      symbol: 'PARLEIND',
      mentionsCount: 2450,
      growthRate: 340.5,
      sentiment: 0.72,
      suspiciousScore: 94,
      timestamp: new Date().toISOString()
    },
    {
      id: 'sm_002',
      platform: 'reddit',
      symbol: 'SIGL',
      mentionsCount: 1890,
      growthRate: 120.2,
      sentiment: 0.45,
      suspiciousScore: 85,
      timestamp: new Date().toISOString()
    },
    {
      id: 'sm_003',
      platform: 'forum',
      symbol: 'ZOOM',
      mentionsCount: 520,
      growthRate: 42.1,
      sentiment: 0.15,
      suspiciousScore: 60,
      timestamp: new Date().toISOString()
    }
  ],
  blogPosts: [
    {
      id: 'bp_001',
      title: 'Why Did Parle Industries Rally After Melody Went Viral?',
      slug: 'why-did-parle-industries-rally-after-melody-went-viral',
      summary: 'An inside look at how brand confusion sparked a major speculative rally in a completely unrelated listed paper stock, after a candy trademark went viral on social media channels.',
      content: `## Executive Summary

In May 2026, shares of Parle Industries unexpectedly jumped about 5% after a viral moment involving Prime Minister Narendra Modi and Indian Melody toffees. Investors had mistaken the stock for Parle Products — the private company that actually makes Melody — triggering a brief rally.

In reality Parle Industries is a separate listed firm (in infrastructure and recycling) with no link to the candy brand. This article unpacks the timeline of events, root causes (name confusion, social-media hype and herd trading), the market impact (price and volume spike) and key takeaways for investors.

## Timeline of Events

**May 20, 2026:** Italian PM Giorgia Meloni posts a viral tweet thanking PM Modi for the "very very good" Melody toffee gift. The video (and the now-famous "Melodi" meme) spreads rapidly on social media.

**May 20, 2026:** Traders react on Dalal Street. Parle Industries stock rockets up 5%, hitting the BSE upper circuit limit for the day. Many buyers are chasing "Parle" without realizing Parle Products (the candy maker) is private.

**May 21, 2026:** The rally continues. Parle Industries climbs another ~5% to close at ₹5.51, with trading volume surging (~8.6 lakh shares, about 3× the two-week average). Financial media begin noting the peculiar nature of the move.

**May 21, 2026:** Clarifications emerge in the press. Journalists and analysts point out the mix-up: Parle Industries has nothing to do with Melody toffees. Parle Products is a privately held, unlisted company. Crucially, Parle Industries made no business announcement or statement to justify the surge, confirming the rally was driven by viral hype.

## Root Cause Analysis

**Name confusion:** The root cause was a classic mistaken-identity. The viral Melody moment led many retail investors to search for "Parle" stocks. They assumed Parle Industries was behind the candy, not knowing that Parle Products (the confectionery brand maker) is a separate, private firm.

**Social amplification:** The Modi-Meloni video and online "Melodi" memes amplified attention. Social media and news outlets made the gift exchange headlines, which funneled speculative interest into any stock with "Parle" in its name.

**Momentum trading:** Once Parle Industries began ticking up, a feedback loop kicked in. Retail traders chased the rising price, further driving it up with no regard to fundamentals. As NDTV noted, this episode was a textbook case of herd behavior overriding logic.

**Lack of corporate clarity:** Neither Parle Industries nor Parle Products issued clear public guidance during the spike. Parle Industries released no statement on the surge, and Parle Products simply expressed gratitude for the publicity. This absence of clarification allowed the confusion to persist temporarily.

## Market Impact

**Price Move:** Parle Industries stock surged to its 5% daily limit two days in a row. On May 20 it jumped to ₹5.25 (from ~₹5.00), and on May 21 it reached ₹5.51. Over just 48 hours, the stock gained roughly 10%.

**Volume Spike:** Trading volume exploded. Around 857,000 shares changed hands on May 20 (about 3× its 2-week average). High volume continued into the next session. Such turnover confirms this was a frenzied, retail-driven event, not typical for a penny-stock with a ₹25 crore market cap.

**No Fundamental News:** Importantly, analysts found no real business news to justify the move. Parle Industries had reported modest FY2025 results (revenue ₹4.68 Cr, profit ₹0.46 Cr) but no new orders or developments. In fact, media pointed out that Parle Industries "did not release any official statement" about the rally, underscoring that the bump was purely based on mistaken identity.

## Investor Takeaways (Practical Checklist)

- **Double-check names & tickers:** Always confirm the exact company behind a stock before buying on news. In this case Parle Industries and Parle Products sound similar but one is unlisted.
- **Verify with official sources:** Consult exchange filings, company websites or press releases. Parle Industries BSE announcements showed nothing new. Use APIs or portals (NSE, BSE, Alpha Vantage) for up-to-date price/volume data.
- **Use credible news:** Rely on reputable financial media and avoid unverified social-media tips. Major outlets quickly exposed this Parle mix-up.
- **Beware herd behavior:** Social-media hype can create false rallies, especially in small-cap or thinly-traded stocks. If a move seems sensational, wait for validation or clarification.
- **Diversify & be cautious:** Treat viral stock tips as warnings, not sure-bets. Maintain a diversified portfolio and don't chase short-lived spikes with unclear rationale.

## FAQ

**Q: Are Parle Industries and Parle Products related?**
A: No. Parle Products (known for Parle-G biscuits and Melody toffees) is a private, family-owned confectionery firm. Parle Industries (formerly Parle Software) is a separate listed company in infrastructure and recycling, with no confectionery business.

**Q: Why did Parle Industries stock rally after the Modi-Meloni meeting?**
A: Investors mistakenly believed Parle Industries was linked to the viral Melody toffee moment. The social-media buzz caused traders to pile into Parle Industries shares, even though the company has nothing to do with Melody toffees.

**Q: How can I avoid this kind of mistake?**
A: Always fact-check viral stock tips. Verify company details (e.g. through NSE/BSE data or official websites) and check if the stock symbol matches the brand. As seen here, Parle Industries never announced any related business news. Use reliable financial news and be skeptical of hype, especially in penny stocks.`,
      coverImage: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop',
      readingTime: 4,
      publishDate: new Date().toISOString(),
      riskRating: 'critical',
      category: 'Market Confusion Cases',
      viewsCount: 1450,
      author: 'TickerGuard AI Research',
      relatedSymbols: ['PARLEPROD', 'PARLEIND']
    },
    {
      id: 'bp_002',
      title: 'Signal App vs Signal Advance: The 11,000% Ticker Symbol Catastrophe',
      slug: 'signal-app-vs-signal-advance-the-11000-ticker-symbol-catastrophe',
      summary: 'A deep-dive analysis of Elon Musk’s simple tweet recommendation and the resulting retail rush that inflated a medical company’s valuation by millions due to symbol mismatch.',
      content: `## A Simple Tweet, A Massive Mismatch

On January 7, tech mogul Elon Musk sent out a viral two-word message on X: **"Use Signal"**. He was advising users to switch to the open-source, encrypted messenger Signal to bypass controversial WhatsApp privacy revisions.

However, retail stock markets operate on keywords, fast algorithms, and retail speculation. The result was a legendary market disconnect.

### The Displacement Wave

The encrypted **Signal Messenger** is owned by the non-profit **Signal Foundation** and is completely private. However, automated algorithms and enthusiastic retail traders searched for the ticker symbol or name "Signal". 

They discovered **Signal Advance, Inc. (OTC: SIGL)**, a tiny medical device technology company with a handful of employees.

Within three trading days:
* **SIGL stock** rallied from **$0.60 to $70.85** (an 11,000% pump).
* Valuation expanded from $55 million to over **$3 billion** in market cap.
* Public volume expanded by a factor of 10,000.

\`\`\`mermaid
graph TD
    A["Elon Musk Tweets: 'Use Signal'"] --> B["Unlisted: Signal Messenger APP (Private)"]
    A --> C["Misidentified Target: Signal Advance Inc (SIGL)"]
    C --> D["Retail FOMO & Momentum Algorithms"]
    D --> E["11,000% Unjustified Valuation Spike"]
\`\`\`

### Fundamental Lessons

When market volumes expand on keywords, fundamental diligence frequently falls out the window. If you are ever trading on quick social trends, TickerGuard AI strongly recommends:
1. Checking if the target brand matches the SEC corporate registration.
2. Confirming that the ticker is for the *correct* company, not a tiny OTC shell company.
3. Checking the **TickerGuard AI Scoring Engine** to detect automated anomalies before you buy.`,
      coverImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop',
      readingTime: 5,
      publishDate: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
      riskRating: 'high',
      category: 'Fake News Detection',
      viewsCount: 2890,
      author: 'TickerGuard AI Research',
      relatedSymbols: ['SIGNALAPP', 'SIGL']
    }
  ],
  investigations: [
    {
      id: 'inv_001',
      title: 'Investigation #TG-2026-PARLE: Biscuit Fame Mismatch',
      summary: 'Full investigation into the viral confectionery rumor driving BSE listed Parle Industries (PARLEIND) paper stock to consecutive upper circuit rallies.',
      rootCause: 'Nostalgic viral tweets about "Melody" chocolates combined with a genuine automation press release from unlisted Parle Products Private Ltd led retail search tools to redirect capital to listed Parle Industries due to keyword similarity.',
      marketImpact: 'PARLEIND experienced a +20% daily gain for three consecutive sessions, trading at 45 times historical average daily volumes, driven entirely by brand confusion.',
      investorWarning: 'Parle Industries has ZERO connection to Parle-G, Melody, or the food industry. Current trading valuation is highly speculative and subject to rapid correction once retail confusion dissipates.',
      affectedCompanies: 'PARLEPROD, PARLEIND',
      createdAt: new Date().toISOString()
    },
    {
      id: 'inv_002',
      title: 'Investigation #TG-2026-SIGNAL: Elon Musk Social Amplification',
      summary: 'Comprehensive audit of the 11,000% ticker symbol mismatch between private messenger Signal LLC and medical device maker Signal Advance (SIGL).',
      rootCause: 'Billionaire social media recommendation of secure app "Signal" triggered high-frequency algorithms and momentum traders to bulk buy OTC ticker SIGL (Signal Advance) due to a direct word match.',
      marketImpact: 'Market cap inflated by $2.9 billion in days, followed by a -94% crash when structural separation became widely understood, wiping out late retail entrants.',
      investorWarning: 'Never buy OTC tickers on general word-association without matching the exact SEC-CIK identifier or verifying company operations.',
      affectedCompanies: 'SIGNALAPP, SIGL',
      createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString()
    }
  ],
  chatHistory: [
    {
      id: 'ch_001',
      role: 'user',
      content: 'Is Parle Industries related to Melody chocolate?',
      createdAt: new Date(Date.now() - 600 * 1000).toISOString()
    },
    {
      id: 'ch_002',
      role: 'assistant',
      content: 'No, **Parle Industries Limited (PARLEIND)** is completely unrelated to **Melody chocolate**. Melody is manufactured by **Parle Products Private Limited**, which is a private, unlisted FMCG company. Parle Industries is a listed company focused on infrastructure, real estate, and paper manufacturing. The shared word "Parle" is a common brand trademark but they operate as separate businesses.',
      createdAt: new Date(Date.now() - 598 * 1000).toISOString()
    }
  ]
};

// Database Engine Helper Class
export class JSONDatabase {
  private static async initDb(): Promise<void> {
    try {
      await fs.access(DB_FILE_PATH);
    } catch {
      // If db.json doesn't exist, create it with initial seed data
      await fs.writeFile(DB_FILE_PATH, JSON.stringify(DEFAULT_SEED_DATA, null, 2), 'utf-8');
    }
  }

  public static async getDb(): Promise<DatabaseSchema> {
    await this.initDb();
    const data = await fs.readFile(DB_FILE_PATH, 'utf-8');
    return JSON.parse(data) as DatabaseSchema;
  }

  public static async saveDb(data: DatabaseSchema): Promise<void> {
    await fs.writeFile(DB_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
  }

  // Get a whole collection
  public static async getCollection<K extends keyof DatabaseSchema>(
    name: K
  ): Promise<DatabaseSchema[K]> {
    const db = await this.getDb();
    return db[name];
  }

  // Save/Overwrite a collection
  public static async saveCollection<K extends keyof DatabaseSchema>(
    name: K,
    data: DatabaseSchema[K]
  ): Promise<void> {
    const db = await this.getDb();
    db[name] = data;
    await this.saveDb(db);
  }

  // Get a single item from a collection by ID or custom filter
  public static async getItem<K extends keyof DatabaseSchema>(
    collectionName: K,
    id: string
  ): Promise<DatabaseSchema[K][number] | null> {
    const collection = await this.getCollection(collectionName);
    const item = (collection as any[]).find((i: any) => i.id === id);
    return item || null;
  }

  // Insert a new item into a collection
  public static async insertItem<K extends keyof DatabaseSchema>(
    collectionName: K,
    item: Omit<DatabaseSchema[K][number], 'id' | 'createdAt'> & { id?: string; createdAt?: string }
  ): Promise<DatabaseSchema[K][number]> {
    const collection = await this.getCollection(collectionName);
    const newItem = {
      ...item,
      id: item.id || `id_${Math.random().toString(36).substring(2, 11)}`,
      createdAt: item.createdAt || new Date().toISOString()
    } as DatabaseSchema[K][number];

    (collection as any[]).push(newItem);
    await this.saveCollection(collectionName, collection);
    return newItem;
  }

  // Update an existing item in a collection
  public static async updateItem<K extends keyof DatabaseSchema>(
    collectionName: K,
    id: string,
    updates: Partial<DatabaseSchema[K][number]>
  ): Promise<DatabaseSchema[K][number] | null> {
    const collection = await this.getCollection(collectionName);
    const index = (collection as any[]).findIndex((i: any) => i.id === id);
    if (index === -1) return null;

    const updatedItem = {
      ...collection[index],
      ...updates
    } as DatabaseSchema[K][number];

    collection[index] = updatedItem;
    await this.saveCollection(collectionName, collection);
    return updatedItem;
  }

  // Delete an item from a collection
  public static async deleteItem<K extends keyof DatabaseSchema>(
    collectionName: K,
    id: string
  ): Promise<boolean> {
    const collection = await this.getCollection(collectionName);
    const index = (collection as any[]).findIndex((i: any) => i.id === id);
    if (index === -1) return false;

    (collection as any[]).splice(index, 1);
    await this.saveCollection(collectionName, collection);
    return true;
  }
}
