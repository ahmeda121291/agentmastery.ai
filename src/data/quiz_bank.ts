export type QuizCategory =
  | "Cold Email"
  | "Sales Engagement"
  | "Database"
  | "CRM"
  | "Video"
  | "Writing/SEO"
  | "Chatbots"
  | "Scheduling/PM"
  | "Audio/Voice"

export type QuizItem = {
  id: string
  q: string
  choices: string[]
  answerIdx: number
  explain?: string
  tags?: string[]
}

export const QUIZ_BANK: Record<QuizCategory, QuizItem[]> = {
  "Cold Email": [
    {
      id: "ce001",
      q: "What's the ideal warmup period for a new email domain?",
      choices: ["3-5 days", "2-4 weeks", "6-8 weeks", "3 months"],
      answerIdx: 2,
      explain: "6-8 weeks of gradual volume increase ensures best deliverability"
    },
    {
      id: "ce002",
      q: "What's the recommended daily cold email limit per mailbox?",
      choices: ["10-20", "30-50", "100-150", "200+"],
      answerIdx: 1,
      explain: "30-50 emails per day per mailbox maintains good sender reputation"
    },
    {
      id: "ce003",
      q: "Which factor most impacts email deliverability?",
      choices: ["Subject line length", "Sender reputation", "Email design", "Time of sending"],
      answerIdx: 1,
      explain: "Sender reputation is the primary factor ESPs consider"
    },
    {
      id: "ce004",
      q: "What's the best practice for email personalization tokens?",
      choices: ["Use 5+ per email", "1-2 relevant ones", "None needed", "Only in subject"],
      answerIdx: 1,
      explain: "1-2 relevant personalization tokens perform best without seeming robotic"
    },
    {
      id: "ce005",
      q: "How often should you rotate email copy in campaigns?",
      choices: ["Daily", "Weekly", "Every 2-3 weeks", "Never"],
      answerIdx: 2,
      explain: "Rotating every 2-3 weeks prevents pattern detection while gathering data"
    },
    {
      id: "ce006",
      q: "What's the optimal subject line length for cold emails?",
      choices: ["Under 10 chars", "30-40 chars", "50-60 chars", "Over 70 chars"],
      answerIdx: 1,
      explain: "30-40 characters ensures full visibility on mobile devices"
    },
    {
      id: "ce007",
      q: "Which day typically has the highest cold email open rates?",
      choices: ["Monday", "Tuesday", "Friday", "Sunday"],
      answerIdx: 1,
      explain: "Tuesday consistently shows highest B2B engagement rates"
    },
    {
      id: "ce008",
      q: "What's multibox rotation in cold email?",
      choices: ["Using multiple templates", "Sending from multiple mailboxes", "Multiple follow-ups", "A/B testing"],
      answerIdx: 1,
      explain: "Distributing sends across multiple mailboxes to maintain deliverability"
    },
    {
      id: "ce009",
      q: "What's the recommended reply rate to aim for?",
      choices: ["1-2%", "5-10%", "15-20%", "30%+"],
      answerIdx: 1,
      explain: "5-10% reply rate indicates healthy campaign performance"
    },
    {
      id: "ce010",
      q: "How many follow-ups typically optimize response rates?",
      choices: ["1-2", "3-5", "7-10", "10+"],
      answerIdx: 1,
      explain: "3-5 follow-ups capture most responses without being pushy"
    },
    {
      id: "ce011",
      q: "What's the best time to send B2B cold emails?",
      choices: ["6-8 AM", "10-11 AM", "2-4 PM", "After 6 PM"],
      answerIdx: 1,
      explain: "10-11 AM aligns with morning email checking habits"
    },
    {
      id: "ce012",
      q: "What percentage of emails should include images?",
      choices: ["0%", "25%", "50%", "100%"],
      answerIdx: 0,
      explain: "Images often trigger spam filters in cold outreach"
    },
    {
      id: "ce013",
      q: "What's SPF in email authentication?",
      choices: ["Spam Prevention Filter", "Sender Policy Framework", "Server Protection Feature", "Send Priority Flag"],
      answerIdx: 1,
      explain: "SPF verifies authorized sending servers for a domain"
    },
    {
      id: "ce014",
      q: "What's the ideal email word count for cold outreach?",
      choices: ["Under 50", "50-125", "150-200", "200+"],
      answerIdx: 1,
      explain: "50-125 words balances value with brevity"
    },
    {
      id: "ce015",
      q: "What's DMARC's role in email?",
      choices: ["Design markup", "Domain authentication", "Data management", "Delivery monitoring"],
      answerIdx: 1,
      explain: "DMARC provides domain-level email authentication policy"
    },
    {
      id: "ce016",
      q: "How should you handle out-of-office replies?",
      choices: ["Remove immediately", "Pause for return date", "Continue sending", "Mark as bounced"],
      answerIdx: 1,
      explain: "Pausing until return date respects recipient preferences"
    },
    {
      id: "ce017",
      q: "What's the bounce rate threshold to maintain?",
      choices: ["Under 2%", "Under 5%", "Under 10%", "Under 20%"],
      answerIdx: 0,
      explain: "Keeping bounces under 2% protects sender reputation"
    },
    {
      id: "ce018",
      q: "What's email throttling?",
      choices: ["Blocking emails", "Controlling send rate", "Filtering spam", "Compressing content"],
      answerIdx: 1,
      explain: "Throttling controls send rate to avoid triggering spam filters"
    },
    {
      id: "ce019",
      q: "Which metric best indicates campaign health?",
      choices: ["Open rate", "Click rate", "Reply rate", "Bounce rate"],
      answerIdx: 2,
      explain: "Reply rate directly measures engagement quality"
    },
    {
      id: "ce020",
      q: "What's the purpose of email warming services?",
      choices: ["Heat tracking pixels", "Build sender reputation", "Increase open rates", "Speed up delivery"],
      answerIdx: 1,
      explain: "Warming services gradually build positive sender reputation"
    }
  ],

  "Sales Engagement": [
    {
      id: "se001",
      q: "What's the optimal length for a sales sequence?",
      choices: ["3-5 steps", "7-10 steps", "12-15 steps", "20+ steps"],
      answerIdx: 1,
      explain: "7-10 steps balance persistence with respect"
    },
    {
      id: "se002",
      q: "Which channel typically has highest engagement?",
      choices: ["Email", "Phone", "LinkedIn", "Multi-channel"],
      answerIdx: 3,
      explain: "Multi-channel approaches see 3x higher engagement"
    },
    {
      id: "se003",
      q: "What's the best day for cold calling?",
      choices: ["Monday", "Wednesday", "Friday", "Tuesday/Thursday"],
      answerIdx: 3,
      explain: "Tuesday and Thursday show highest connect rates"
    },
    {
      id: "se004",
      q: "How many dials before leaving a voicemail?",
      choices: ["Every call", "2nd attempt", "3rd attempt", "Never"],
      answerIdx: 2,
      explain: "Waiting until 3rd attempt avoids voicemail fatigue"
    },
    {
      id: "se005",
      q: "What's the ideal call-to-email ratio in sequences?",
      choices: ["1:1", "1:3", "1:5", "All email"],
      answerIdx: 1,
      explain: "1 call per 3 emails balances effort with impact"
    },
    {
      id: "se006",
      q: "When should you disqualify a prospect?",
      choices: ["After 3 touches", "After 5 touches", "After 10 touches", "Never"],
      answerIdx: 2,
      explain: "10 touches without engagement signals low interest"
    },
    {
      id: "se007",
      q: "What's the best time for cold calls?",
      choices: ["8-9 AM", "11-12 PM", "4-5 PM", "Both A and C"],
      answerIdx: 3,
      explain: "Early morning and late afternoon see highest connect rates"
    },
    {
      id: "se008",
      q: "How long should a cold call opener be?",
      choices: ["5 seconds", "10 seconds", "30 seconds", "1 minute"],
      answerIdx: 1,
      explain: "10-second opener respects time while creating interest"
    },
    {
      id: "se009",
      q: "What's the purpose of a breakup email?",
      choices: ["End rudely", "Create urgency", "Delete contact", "Complain"],
      answerIdx: 1,
      explain: "Breakup emails create urgency and often trigger responses"
    },
    {
      id: "se010",
      q: "How many LinkedIn touches per sequence?",
      choices: ["0", "1-2", "3-4", "5+"],
      answerIdx: 1,
      explain: "1-2 LinkedIn touches add value without being intrusive"
    },
    {
      id: "se011",
      q: "What's the ideal voicemail length?",
      choices: ["Under 20 sec", "30-45 sec", "1 minute", "2+ minutes"],
      answerIdx: 0,
      explain: "Under 20 seconds ensures full listen and callback potential"
    },
    {
      id: "se012",
      q: "When to send the first follow-up?",
      choices: ["Same day", "Next day", "After 2-3 days", "After a week"],
      answerIdx: 2,
      explain: "2-3 days gives time to respond without losing momentum"
    },
    {
      id: "se013",
      q: "What's sequence priority scoring?",
      choices: ["Email ranking", "Task ordering by value", "Lead scoring", "Rep ranking"],
      answerIdx: 1,
      explain: "Prioritizing high-value activities within sequences"
    },
    {
      id: "se014",
      q: "How to handle 'not interested' replies?",
      choices: ["Keep pushing", "Ask why", "Thank and pause", "Delete immediately"],
      answerIdx: 2,
      explain: "Thanking and pausing for 6-12 months maintains relationship"
    },
    {
      id: "se015",
      q: "What's the golden hours for sales?",
      choices: ["9-5 PM", "8-10 AM & 4-6 PM", "Lunch time", "After hours"],
      answerIdx: 1,
      explain: "8-10 AM and 4-6 PM show highest engagement"
    },
    {
      id: "se016",
      q: "What's parallel dialing?",
      choices: ["Two phones", "Multiple numbers simultaneously", "Team calling", "Speed dialing"],
      answerIdx: 1,
      explain: "Dialing multiple numbers at once to increase efficiency"
    },
    {
      id: "se017",
      q: "How to measure sequence effectiveness?",
      choices: ["Email opens", "Meeting book rate", "Activity count", "Hours worked"],
      answerIdx: 1,
      explain: "Meeting book rate directly ties to revenue outcomes"
    },
    {
      id: "se018",
      q: "What's the 3x3 research rule?",
      choices: ["3 calls, 3 emails", "3 minutes, 3 facts", "3 touches, 3 channels", "3 days, 3 attempts"],
      answerIdx: 1,
      explain: "Spend 3 minutes finding 3 relevant facts per prospect"
    },
    {
      id: "se019",
      q: "When should you use video in outreach?",
      choices: ["First touch", "After interest shown", "Never", "Every touch"],
      answerIdx: 1,
      explain: "Video works best after initial interest is established"
    },
    {
      id: "se020",
      q: "What's the ideal talk-to-listen ratio on calls?",
      choices: ["80:20", "50:50", "30:70", "10:90"],
      answerIdx: 2,
      explain: "Prospect should talk 70% of the time for engagement"
    }
  ],

  "Database": [
    {
      id: "db001",
      q: "What's typical B2B database accuracy decay rate?",
      choices: ["5% yearly", "15% yearly", "30% yearly", "50% yearly"],
      answerIdx: 2,
      explain: "B2B data decays at ~30% annually due to job changes"
    },
    {
      id: "db002",
      q: "What's contact enrichment?",
      choices: ["Adding emails", "Finding social profiles", "Appending missing data", "Cleaning duplicates"],
      answerIdx: 2,
      explain: "Enrichment fills in missing data fields from various sources"
    },
    {
      id: "db003",
      q: "What percentage of B2B buyers are typically in-market?",
      choices: ["1-3%", "5-10%", "20-30%", "50%+"],
      answerIdx: 0,
      explain: "Only 1-3% of your TAM is actively buying at any time"
    },
    {
      id: "db004",
      q: "What's technographic data?",
      choices: ["Technical skills", "Technology stack used", "Tech company data", "Digital behavior"],
      answerIdx: 1,
      explain: "Technographics show what technologies a company uses"
    },
    {
      id: "db005",
      q: "What's the best match rate for email finding?",
      choices: ["30-40%", "50-60%", "70-80%", "90%+"],
      answerIdx: 2,
      explain: "Top providers achieve 70-80% email match rates"
    },
    {
      id: "db006",
      q: "What's intent data?",
      choices: ["Survey responses", "Buying signals from behavior", "Email opens", "Sales notes"],
      answerIdx: 1,
      explain: "Intent data tracks digital behaviors signaling purchase interest"
    },
    {
      id: "db007",
      q: "How often should you clean your database?",
      choices: ["Monthly", "Quarterly", "Annually", "Never"],
      answerIdx: 1,
      explain: "Quarterly cleaning maintains data quality efficiently"
    },
    {
      id: "db008",
      q: "What's a data waterfall approach?",
      choices: ["Backup strategy", "Layered enrichment sources", "Data deletion", "Reporting method"],
      answerIdx: 1,
      explain: "Using multiple data sources in priority order for enrichment"
    },
    {
      id: "db009",
      q: "What's typical mobile number coverage in B2B?",
      choices: ["5-10%", "20-30%", "40-50%", "70%+"],
      answerIdx: 1,
      explain: "20-30% mobile coverage is standard for B2B databases"
    },
    {
      id: "db010",
      q: "What's firmographic data?",
      choices: ["Law firm data", "Company characteristics", "Financial data", "Employee info"],
      answerIdx: 1,
      explain: "Firmographics describe company size, industry, location, etc."
    },
    {
      id: "db011",
      q: "What's the GDPR impact on B2B data?",
      choices: ["No impact", "Requires consent", "Legitimate interest okay", "Banned in EU"],
      answerIdx: 2,
      explain: "B2B outreach can use legitimate interest under GDPR"
    },
    {
      id: "db012",
      q: "What's data co-op in B2B context?",
      choices: ["Shared workspace", "Pooled customer data", "Team collaboration", "API sharing"],
      answerIdx: 1,
      explain: "Companies pool anonymized data for better insights"
    },
    {
      id: "db013",
      q: "What's typical email verification accuracy?",
      choices: ["60-70%", "80-85%", "95-98%", "100%"],
      answerIdx: 2,
      explain: "Good verification services achieve 95-98% accuracy"
    },
    {
      id: "db014",
      q: "What's a ICP in data context?",
      choices: ["Internal Contact Person", "Ideal Customer Profile", "Internet Connection Protocol", "Integrated Campaign Plan"],
      answerIdx: 1,
      explain: "ICP defines your perfect customer characteristics"
    },
    {
      id: "db015",
      q: "How many data points define a complete contact?",
      choices: ["5-10", "15-20", "25-30", "50+"],
      answerIdx: 1,
      explain: "15-20 fields typically constitute a complete B2B contact"
    },
    {
      id: "db016",
      q: "What's reverse IP lookup used for?",
      choices: ["Security", "Identifying website visitors", "Email finding", "Phone lookup"],
      answerIdx: 1,
      explain: "Identifies companies visiting your website anonymously"
    },
    {
      id: "db017",
      q: "What's typical data append cost per record?",
      choices: ["$0.01-0.05", "$0.10-0.50", "$1-2", "$5+"],
      answerIdx: 1,
      explain: "$0.10-0.50 per record is standard for quality appends"
    },
    {
      id: "db018",
      q: "What's a suppression list?",
      choices: ["Hidden contacts", "Do-not-contact list", "VIP list", "Inactive users"],
      answerIdx: 1,
      explain: "List of contacts to exclude from outreach"
    },
    {
      id: "db019",
      q: "What's account-based data strategy?",
      choices: ["Banking data", "Company-first approach", "User accounts", "CRM strategy"],
      answerIdx: 1,
      explain: "Organizing data around target accounts vs individual leads"
    },
    {
      id: "db020",
      q: "What's the half-life of a B2B email?",
      choices: ["6 months", "12 months", "18 months", "24 months"],
      answerIdx: 1,
      explain: "B2B emails typically become invalid after 12 months"
    }
  ],

  "CRM": [
    {
      id: "crm001",
      q: "What's the average CRM adoption rate?",
      choices: ["30-40%", "50-60%", "70-80%", "90%+"],
      answerIdx: 1,
      explain: "Most organizations see 50-60% actual CRM usage"
    },
    {
      id: "crm002",
      q: "What's pipeline velocity?",
      choices: ["Deal count", "Speed through stages", "Total value", "Win rate"],
      answerIdx: 1,
      explain: "How quickly deals move through sales stages"
    },
    {
      id: "crm003",
      q: "What's the ideal number of pipeline stages?",
      choices: ["3-4", "5-7", "8-10", "10+"],
      answerIdx: 1,
      explain: "5-7 stages balance granularity with simplicity"
    },
    {
      id: "crm004",
      q: "What's lead scoring?",
      choices: ["Rating reviews", "Ranking lead quality", "Counting leads", "Speed scoring"],
      answerIdx: 1,
      explain: "Automatically ranking leads based on fit and behavior"
    },
    {
      id: "crm005",
      q: "When should you create a custom field?",
      choices: ["Always", "For any new data", "When truly unique to business", "Never"],
      answerIdx: 2,
      explain: "Only when standard fields can't capture business-critical data"
    },
    {
      id: "crm006",
      q: "What's opportunity weighting?",
      choices: ["Deal size", "Probability-adjusted forecasting", "Rep importance", "Time weighting"],
      answerIdx: 1,
      explain: "Adjusting forecast by probability of closing"
    },
    {
      id: "crm007",
      q: "What's the 2-minute rule in CRM?",
      choices: ["Call duration", "Log immediately if under 2 min", "Response time", "Login timeout"],
      answerIdx: 1,
      explain: "If data entry takes under 2 minutes, do it immediately"
    },
    {
      id: "crm008",
      q: "What's deal slippage?",
      choices: ["Lost deals", "Deals moving to next period", "Price reduction", "Data loss"],
      answerIdx: 1,
      explain: "Deals that don't close in forecasted period"
    },
    {
      id: "crm009",
      q: "What's the ideal win rate benchmark?",
      choices: ["10-15%", "20-30%", "40-50%", "70%+"],
      answerIdx: 1,
      explain: "20-30% win rate is healthy for most B2B"
    },
    {
      id: "crm010",
      q: "What's activity capture?",
      choices: ["Screenshot tool", "Automatic logging of emails/calls", "Exercise tracking", "Time tracking"],
      answerIdx: 1,
      explain: "Automatically logging sales activities to CRM"
    },
    {
      id: "crm011",
      q: "What's territory management?",
      choices: ["Land ownership", "Assigning accounts to reps", "Office locations", "Travel planning"],
      answerIdx: 1,
      explain: "Dividing and assigning accounts among sales team"
    },
    {
      id: "crm012",
      q: "What's the biggest CRM failure reason?",
      choices: ["Cost", "Poor user adoption", "Technology issues", "Bad vendor"],
      answerIdx: 1,
      explain: "Poor user adoption kills most CRM initiatives"
    },
    {
      id: "crm013",
      q: "What's conversion rate optimization in CRM?",
      choices: ["Currency conversion", "Improving stage-to-stage movement", "Data conversion", "System migration"],
      answerIdx: 1,
      explain: "Improving progression rates between pipeline stages"
    },
    {
      id: "crm014",
      q: "What's duplicate detection frequency?",
      choices: ["Real-time", "Daily", "Weekly", "Monthly"],
      answerIdx: 0,
      explain: "Real-time duplicate detection prevents data issues"
    },
    {
      id: "crm015",
      q: "What's the average sales cycle in B2B SaaS?",
      choices: ["1-2 weeks", "1-2 months", "3-6 months", "12+ months"],
      answerIdx: 2,
      explain: "3-6 months is typical for B2B SaaS sales cycles"
    },
    // TODO: Add 5 more CRM questions
  ],

  "Video": [
    {
      id: "v001",
      q: "What's the ideal video length for sales outreach?",
      choices: ["Under 30 sec", "30-60 sec", "2-3 min", "5+ min"],
      answerIdx: 1,
      explain: "30-60 seconds maintains attention while delivering value"
    },
    {
      id: "v002",
      q: "What's the best thumbnail strategy?",
      choices: ["Logo only", "Smiling face", "Screenshot", "Text overlay"],
      answerIdx: 1,
      explain: "Human faces increase click rates by 30%+"
    },
    {
      id: "v003",
      q: "When should you use AI avatars vs real video?",
      choices: ["Always AI", "Scale campaigns", "Never AI", "Only demos"],
      answerIdx: 1,
      explain: "AI avatars work best for scalable, consistent messaging"
    },
    {
      id: "v004",
      q: "What's video completion rate benchmark?",
      choices: ["20-30%", "40-50%", "60-70%", "80%+"],
      answerIdx: 2,
      explain: "60-70% completion rate indicates engaging content"
    },
    {
      id: "v005",
      q: "What's the best video email subject line?",
      choices: ["VIDEO:", "[Video]", "Personal message for {name}", "Watch this"],
      answerIdx: 2,
      explain: "Personalized subjects outperform video indicators"
    },
    {
      id: "v006",
      q: "What frame rate for professional videos?",
      choices: ["15 fps", "24-30 fps", "60 fps", "120 fps"],
      answerIdx: 1,
      explain: "24-30 fps provides smooth, professional appearance"
    },
    {
      id: "v007",
      q: "What's the ideal aspect ratio for LinkedIn?",
      choices: ["16:9", "1:1", "9:16", "4:3"],
      answerIdx: 0,
      explain: "16:9 horizontal works best for LinkedIn feed"
    },
    {
      id: "v008",
      q: "How many videos increase reply rates?",
      choices: ["10%", "30%", "3x", "10x"],
      answerIdx: 2,
      explain: "Video in outreach typically triples reply rates"
    },
    {
      id: "v009",
      q: "What's the best video CTA placement?",
      choices: ["Beginning", "Middle", "End", "Throughout"],
      answerIdx: 2,
      explain: "End placement after value delivery works best"
    },
    {
      id: "v010",
      q: "What's optimal video file size for email?",
      choices: ["Under 1MB", "Under 5MB", "Under 25MB", "Size doesn't matter"],
      answerIdx: 1,
      explain: "Under 5MB ensures delivery and quick loading"
    },
    {
      id: "v011",
      q: "What lighting setup works best?",
      choices: ["Behind camera", "Natural window light", "Ring light", "No lighting needed"],
      answerIdx: 1,
      explain: "Natural light facing you provides best appearance"
    },
    {
      id: "v012",
      q: "Should you use virtual backgrounds?",
      choices: ["Always", "Never", "Only if messy", "For branding"],
      answerIdx: 2,
      explain: "Only when real background is unprofessional"
    },
    {
      id: "v013",
      q: "What's the best day to share video content?",
      choices: ["Monday", "Tuesday-Thursday", "Friday", "Weekend"],
      answerIdx: 1,
      explain: "Mid-week sees highest video engagement"
    },
    {
      id: "v014",
      q: "What's video SEO?",
      choices: ["Camera settings", "Optimizing for discovery", "Editing software", "Upload speed"],
      answerIdx: 1,
      explain: "Optimizing titles, descriptions, tags for search"
    },
    {
      id: "v015",
      q: "What's the minimum video resolution today?",
      choices: ["480p", "720p", "1080p", "4K"],
      answerIdx: 2,
      explain: "1080p is the minimum professional standard"
    },
    // TODO: Add 5 more video questions
  ],

  "Writing/SEO": [
    {
      id: "ws001",
      q: "What's the ideal blog post length for SEO?",
      choices: ["300-500 words", "800-1200 words", "1500-2500 words", "3000+ words"],
      answerIdx: 2,
      explain: "1500-2500 words typically rank best for competitive terms"
    },
    {
      id: "ws002",
      q: "What's keyword density best practice?",
      choices: ["1-2%", "5-7%", "10%+", "Doesn't matter"],
      answerIdx: 0,
      explain: "1-2% keyword density appears natural to search engines"
    },
    {
      id: "ws003",
      q: "How many H1 tags per page?",
      choices: ["0", "1", "2-3", "Unlimited"],
      answerIdx: 1,
      explain: "One H1 tag per page follows SEO best practices"
    },
    {
      id: "ws004",
      q: "What's the best meta description length?",
      choices: ["50-100 chars", "120-155 chars", "200-300 chars", "No limit"],
      answerIdx: 1,
      explain: "120-155 characters displays fully in search results"
    },
    {
      id: "ws005",
      q: "What's content velocity?",
      choices: ["Writing speed", "Publishing frequency", "Page load speed", "Viral growth"],
      answerIdx: 1,
      explain: "How often you publish new content"
    },
    {
      id: "ws006",
      q: "What's the E-E-A-T principle?",
      choices: ["Eating guidelines", "Experience, Expertise, Authoritativeness, Trustworthiness", "Email standards", "Editorial guidelines"],
      answerIdx: 1,
      explain: "Google's quality guidelines for content"
    },
    {
      id: "ws007",
      q: "What's the ideal URL structure?",
      choices: ["Long and descriptive", "Short with keywords", "Numbers only", "Random strings"],
      answerIdx: 1,
      explain: "Short URLs with target keywords perform best"
    },
    {
      id: "ws008",
      q: "How often should you update old content?",
      choices: ["Never", "Annually", "Every 6 months", "Every 3 months"],
      answerIdx: 2,
      explain: "Refreshing content every 6 months maintains rankings"
    },
    {
      id: "ws009",
      q: "What's topic cluster strategy?",
      choices: ["Random topics", "Pillar content with related posts", "Single topic only", "News coverage"],
      answerIdx: 1,
      explain: "Central pillar page with related content clusters"
    },
    {
      id: "ws010",
      q: "What's the best internal linking strategy?",
      choices: ["No links", "3-5 relevant links", "10+ links", "Link every keyword"],
      answerIdx: 1,
      explain: "3-5 contextually relevant internal links per post"
    },
    {
      id: "ws011",
      q: "What's semantic SEO?",
      choices: ["Grammar checking", "Related topics and entities", "Keyword stuffing", "Meta tags"],
      answerIdx: 1,
      explain: "Optimizing for related topics and search intent"
    },
    {
      id: "ws012",
      q: "What's the ideal image alt text?",
      choices: ["Keyword only", "Descriptive with keyword", "Empty", "File name"],
      answerIdx: 1,
      explain: "Descriptive text including target keyword when relevant"
    },
    {
      id: "ws013",
      q: "What's content cannibalization?",
      choices: ["Copying content", "Multiple pages competing for same keyword", "Deleting content", "Content theft"],
      answerIdx: 1,
      explain: "When multiple pages compete for the same search terms"
    },
    {
      id: "ws014",
      q: "What's the best publishing time?",
      choices: ["Midnight", "Early morning", "Noon", "Evening"],
      answerIdx: 1,
      explain: "Early morning captures both early and regular readers"
    },
    {
      id: "ws015",
      q: "What's cornerstone content?",
      choices: ["First post", "Most important pages", "Footer content", "Paid content"],
      answerIdx: 1,
      explain: "Your most important, comprehensive articles"
    },
    // TODO: Add 5 more writing/SEO questions
  ],

  "Chatbots": [
    {
      id: "cb001",
      q: "What's the ideal chatbot response time?",
      choices: ["Instant", "1-2 seconds", "5-10 seconds", "1 minute"],
      answerIdx: 1,
      explain: "1-2 second delay feels more human and natural"
    },
    {
      id: "cb002",
      q: "What percentage of queries should chatbots handle?",
      choices: ["20-30%", "40-50%", "60-70%", "100%"],
      answerIdx: 2,
      explain: "60-70% automation with human handoff for complex issues"
    },
    {
      id: "cb003",
      q: "What's the best chatbot greeting length?",
      choices: ["1-2 words", "1 sentence", "2-3 sentences", "Full paragraph"],
      answerIdx: 1,
      explain: "One sentence greeting is welcoming but not overwhelming"
    },
    {
      id: "cb004",
      q: "When should chatbots identify as AI?",
      choices: ["Never", "Immediately", "When asked", "After conversation"],
      answerIdx: 1,
      explain: "Transparency upfront builds trust"
    },
    {
      id: "cb005",
      q: "What's conversation abandonment rate benchmark?",
      choices: ["10-20%", "30-40%", "50-60%", "70%+"],
      answerIdx: 1,
      explain: "30-40% abandonment is typical for chatbots"
    },
    {
      id: "cb006",
      q: "What's the ideal conversation flow depth?",
      choices: ["1-2 levels", "3-5 levels", "6-10 levels", "Unlimited"],
      answerIdx: 1,
      explain: "3-5 levels before human handoff prevents frustration"
    },
    {
      id: "cb007",
      q: "What's NLP in chatbot context?",
      choices: ["New Language Protocol", "Natural Language Processing", "Network Link Protocol", "Native Language Platform"],
      answerIdx: 1,
      explain: "Technology enabling chatbots to understand human language"
    },
    {
      id: "cb008",
      q: "What's intent recognition accuracy target?",
      choices: ["60-70%", "75-85%", "90-95%", "100%"],
      answerIdx: 2,
      explain: "90-95% accuracy ensures good user experience"
    },
    {
      id: "cb009",
      q: "When are chatbots most active?",
      choices: ["Business hours", "After hours", "24/7 equally", "Weekends"],
      answerIdx: 1,
      explain: "After-hours queries show chatbot value"
    },
    {
      id: "cb010",
      q: "What's fallback rate?",
      choices: ["System crashes", "Unable to understand queries", "Backup responses", "Response time"],
      answerIdx: 1,
      explain: "Percentage of queries the bot can't handle"
    },
    {
      id: "cb011",
      q: "What's the best button vs text input ratio?",
      choices: ["All buttons", "70% buttons", "50/50", "All text"],
      answerIdx: 1,
      explain: "70% quick buttons speeds common interactions"
    },
    {
      id: "cb012",
      q: "What's conversation context window?",
      choices: ["Chat interface", "Memory of previous messages", "Time limit", "Browser window"],
      answerIdx: 1,
      explain: "How much conversation history the bot remembers"
    },
    {
      id: "cb013",
      q: "What's proactive messaging?",
      choices: ["Aggressive selling", "Bot initiating conversation", "Error messages", "Notifications"],
      answerIdx: 1,
      explain: "Bot starting conversations based on user behavior"
    },
    {
      id: "cb014",
      q: "What's the ideal typing indicator duration?",
      choices: ["No indicator", "0.5-1 second", "2-3 seconds", "5+ seconds"],
      answerIdx: 1,
      explain: "Brief typing indicator feels natural without delay"
    },
    {
      id: "cb015",
      q: "What's containment rate?",
      choices: ["Storage capacity", "Resolved without human help", "Response accuracy", "User retention"],
      answerIdx: 1,
      explain: "Percentage resolved without human intervention"
    },
    // TODO: Add 5 more chatbot questions
  ],

  "Scheduling/PM": [
    {
      id: "sp001",
      q: "What's the ideal meeting buffer time?",
      choices: ["0 minutes", "5-10 minutes", "15-20 minutes", "30 minutes"],
      answerIdx: 1,
      explain: "5-10 minute buffers prevent back-to-back fatigue"
    },
    {
      id: "sp002",
      q: "What's the two-pizza rule?",
      choices: ["Lunch planning", "Team size limit", "Budget control", "Party planning"],
      answerIdx: 1,
      explain: "Teams should be small enough to feed with two pizzas"
    },
    {
      id: "sp003",
      q: "What's the best default meeting length?",
      choices: ["15 minutes", "25 minutes", "30 minutes", "60 minutes"],
      answerIdx: 1,
      explain: "25-minute meetings create natural buffers"
    },
    {
      id: "sp004",
      q: "What's time blocking?",
      choices: ["Blocking calendars", "Dedicated time slots for tasks", "Vacation planning", "Clock stopping"],
      answerIdx: 1,
      explain: "Scheduling specific time blocks for focused work"
    },
    {
      id: "sp005",
      q: "What's the ideal sprint length?",
      choices: ["1 week", "2 weeks", "1 month", "3 months"],
      answerIdx: 1,
      explain: "2-week sprints balance planning and flexibility"
    },
    {
      id: "sp006",
      q: "What's WIP limit?",
      choices: ["VIP access", "Work in Progress limit", "Weekly planning", "Whip measurement"],
      answerIdx: 1,
      explain: "Maximum number of tasks in progress simultaneously"
    },
    {
      id: "sp007",
      q: "What's the best day for recurring meetings?",
      choices: ["Monday", "Tuesday", "Wednesday", "Friday"],
      answerIdx: 1,
      explain: "Tuesday avoids Monday chaos and Friday fatigue"
    },
    {
      id: "sp008",
      q: "What's velocity in project management?",
      choices: ["Speed of work", "Story points per sprint", "Team size", "Budget burn"],
      answerIdx: 1,
      explain: "Amount of work completed per sprint"
    },
    {
      id: "sp009",
      q: "What's the ideal standup duration?",
      choices: ["5 minutes", "15 minutes", "30 minutes", "1 hour"],
      answerIdx: 1,
      explain: "15 minutes keeps standups focused and efficient"
    },
    {
      id: "sp010",
      q: "What's calendar blocking effectiveness?",
      choices: ["Blocks spam", "Protects focus time", "Prevents meetings", "Hides availability"],
      answerIdx: 1,
      explain: "Blocking time for deep work improves productivity"
    },
    // TODO: Add 10 more scheduling/PM questions
  ],

  "Audio/Voice": [
    {
      id: "av001",
      q: "What's the ideal podcast episode length?",
      choices: ["5-10 min", "20-30 min", "45-60 min", "2+ hours"],
      answerIdx: 1,
      explain: "20-30 minutes matches average commute time"
    },
    {
      id: "av002",
      q: "What audio bitrate for professional quality?",
      choices: ["64 kbps", "128 kbps", "192 kbps", "320 kbps"],
      answerIdx: 2,
      explain: "192 kbps balances quality with file size"
    },
    {
      id: "av003",
      q: "What's voice cloning accuracy today?",
      choices: ["50-60%", "70-80%", "90-95%", "99%+"],
      answerIdx: 2,
      explain: "Modern AI achieves 90-95% voice similarity"
    },
    {
      id: "av004",
      q: "What's the best microphone distance?",
      choices: ["1-2 inches", "6-8 inches", "12-18 inches", "3+ feet"],
      answerIdx: 1,
      explain: "6-8 inches prevents breathing noise while maintaining clarity"
    },
    {
      id: "av005",
      q: "What's room tone?",
      choices: ["Paint color", "Ambient room sound", "Temperature", "Mood"],
      answerIdx: 1,
      explain: "Natural room silence used in audio editing"
    },
    {
      id: "av006",
      q: "What's the ideal speaking pace?",
      choices: ["100-120 wpm", "140-160 wpm", "180-200 wpm", "200+ wpm"],
      answerIdx: 1,
      explain: "140-160 words per minute is optimal for clarity"
    },
    {
      id: "av007",
      q: "What's noise floor?",
      choices: ["Ground level", "Background noise level", "Building floor", "Volume limit"],
      answerIdx: 1,
      explain: "The level of background noise in a recording"
    },
    {
      id: "av008",
      q: "When to use voice AI vs human recording?",
      choices: ["Always AI", "Scale and consistency needs", "Never AI", "Only tests"],
      answerIdx: 1,
      explain: "AI voice works best for scalable, consistent content"
    },
    {
      id: "av009",
      q: "What's the best audio file format?",
      choices: ["MP3", "WAV", "AAC", "FLAC"],
      answerIdx: 0,
      explain: "MP3 offers best compatibility and compression"
    },
    {
      id: "av010",
      q: "What's dynamic range in audio?",
      choices: ["Movement", "Loud to quiet ratio", "Frequency range", "File size"],
      answerIdx: 1,
      explain: "Difference between loudest and quietest parts"
    },
    // TODO: Add 10 more audio/voice questions
  ]
}