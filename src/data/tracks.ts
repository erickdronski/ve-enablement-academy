export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  content: string[];
  keyTakeaways: string[];
  quiz: QuizQuestion[];
  flashcards: Flashcard[];
  xpReward: number;
}

export interface Track {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  modules: Module[];
  certificationTitle: string;
}

export const tracks: Track[] = [
  {
    id: 'roi-value',
    title: 'ROI & Value Assessment',
    description: 'Master the art of building compelling ROI business cases that win deals.',
    icon: '📊',
    color: '#00E6B9',
    certificationTitle: 'ROI & Value Assessment Certified',
    modules: [
      {
        id: 'understanding-ve',
        title: 'Understanding Value Engineering',
        description: 'Learn what VE is, why it matters, and how it transforms customer conversations.',
        xpReward: 100,
        content: [
          'Value Engineering (VE) is a systematic approach to maximizing the value a customer receives from their technology investments. Unlike traditional sales that focus on features and functionality, VE centers the conversation around measurable business outcomes — cost reduction, risk mitigation, productivity gains, and strategic enablement.',
          'The core difference between VE and standard selling is the shift from "what our product does" to "what our product is worth to you." When a sales engineer walks into a room and starts clicking through a product demo, the customer is mentally comparing features against competitors. When a VE practitioner walks in and asks about their biggest operational challenges, the conversation shifts to value.',
          'VE practitioners work alongside sales teams as strategic advisors. They are not replacing the SE or the account executive — they are augmenting the deal with financial rigor. A typical VE engagement begins with discovery (understanding the customer environment), moves to assessment (mapping capabilities and maturity), then modeling (building the ROI case), and finally presentation (delivering the business case to executives).',
          'The VE engagement lifecycle has four distinct phases. Phase 1: Discovery — understand the customer current state through structured questions. Phase 2: Assessment — evaluate their maturity across business capabilities. Phase 3: Modeling — build a data-driven ROI case using improvement factors. Phase 4: Delivery — present findings to decision-makers with clear financial impact.',
          'Why do customers respond to value-based conversations? Because executives don\'t buy technology — they buy outcomes. A CIO doesn\'t care that your ITSM platform has 47 workflow templates. They care that it can reduce their mean time to resolution by 35% and save $2.1M over three years. VE gives you the data and the story to make that case.',
          'The key metrics that VE impacts fall into four categories: Total Cost of Ownership (TCO) — how much does it cost to run IT operations today vs. with Ivanti? Return on Investment (ROI) — what is the payback period and 3-year return? Risk Reduction — what is the financial exposure from security gaps, compliance failures, or unplanned downtime? Productivity Gains — how much time can employees and IT staff reclaim?',
          'VE is a competitive differentiator. Most vendors show up with a demo and a pricing sheet. When Ivanti shows up with a customized ROI analysis that quantifies the customer\'s specific pain points, it changes the dynamic. The customer sees a partner who understands their business, not just a vendor pushing product.',
          'As you progress through this academy, you\'ll learn the specific frameworks, tools, and techniques that make VE work in practice. Every module builds on the last, taking you from understanding the basics to facilitating full value assessments independently.'
        ],
        keyTakeaways: [
          'VE is about outcomes, not features',
          '4-phase lifecycle: Discovery → Assessment → Modeling → Delivery',
          'Key metrics: TCO, ROI, Risk Reduction, Productivity Gains',
          'VE augments sales — it doesn\'t replace SEs or AEs',
          'Executives buy outcomes, not technology'
        ],
        flashcards: [
          { id: 'f1-1', front: 'What are the 4 phases of a VE engagement?', back: 'Discovery → Assessment → Modeling → Delivery', category: 'VE Basics' },
          { id: 'f1-2', front: 'What 4 metric categories does VE impact?', back: 'TCO, ROI, Risk Reduction, Productivity Gains', category: 'VE Basics' },
          { id: 'f1-3', front: 'How does VE differ from a product demo?', back: 'VE focuses on measurable business outcomes and customer-specific value, not feature comparisons', category: 'VE Basics' },
          { id: 'f1-4', front: 'Who does the VE practitioner work with?', back: 'Sales teams (SEs and AEs) as a strategic advisor adding financial rigor to deals', category: 'VE Basics' },
        ],
        quiz: [
          { id: 'q1-1', question: 'What is the primary focus of Value Engineering?', options: ['Product features and functionality', 'Measurable business outcomes and ROI', 'Competitive feature comparison', 'Technical architecture review'], correctIndex: 1, explanation: 'VE centers conversations around measurable business outcomes like cost reduction, risk mitigation, and productivity gains — not product features.' },
          { id: 'q1-2', question: 'What are the four phases of a VE engagement?', options: ['Plan, Build, Test, Deploy', 'Discovery, Assessment, Modeling, Delivery', 'Research, Design, Implement, Support', 'Qualify, Demo, Propose, Close'], correctIndex: 1, explanation: 'The VE lifecycle follows Discovery (understand current state), Assessment (evaluate maturity), Modeling (build ROI), and Delivery (present to executives).' },
          { id: 'q1-3', question: 'Why do executives respond better to value conversations?', options: ['They enjoy financial analysis', 'They buy outcomes, not technology', 'They don\'t understand product features', 'They prefer shorter meetings'], correctIndex: 1, explanation: 'Executives make decisions based on business outcomes and financial impact. They care about what a solution is worth to their organization.' },
          { id: 'q1-4', question: 'How does VE function within the sales team?', options: ['It replaces the SE role', 'It augments deals with financial rigor', 'It handles contract negotiations', 'It manages customer onboarding'], correctIndex: 1, explanation: 'VE practitioners work alongside SEs and AEs as strategic advisors, adding data-driven financial analysis to strengthen the business case.' },
          { id: 'q1-5', question: 'Which is NOT a key metric category in VE?', options: ['Total Cost of Ownership', 'Return on Investment', 'Net Promoter Score', 'Risk Reduction'], correctIndex: 2, explanation: 'The four key VE metric categories are TCO, ROI, Risk Reduction, and Productivity Gains. NPS is a customer satisfaction metric, not a VE financial metric.' },
        ],
      },
      {
        id: 'roi-framework',
        title: 'The ROI Factor Framework',
        description: 'Master the three-factor model that drives every ROI calculation.',
        xpReward: 100,
        content: [
          'Every ROI calculation in Value Engineering is built on three types of factors that chain together: Driver Factors, Improvement Factors, and Financial Factors. Understanding how these work together is the foundation of building credible business cases.',
          'Driver Factors are the baseline metrics that describe the customer\'s current state. These are raw numbers: annual ticket volume (e.g., 60,000), number of endpoints (e.g., 10,000), IT headcount (e.g., 125 FTEs), number of change requests per year, average incidents per month. These come directly from the customer during discovery.',
          'Improvement Factors represent the percentage improvement that Ivanti solutions can deliver. These are the "what gets better" numbers: 15% ticket deflection through self-service, 25% reduction in mean time to resolution, 10% decrease in unauthorized changes, 30% reduction in patch deployment time. We keep these conservative — typically 2% to 20% — to maintain credibility.',
          'Financial Factors translate improvements into dollars: average IT FTE fully-loaded salary ($89,000), cost per ticket ($15-$25), average breach exposure ($4.44M), compliance penalty risk ($250,000), hourly employee productivity cost. These are either customer-provided or industry benchmarks.',
          'Here\'s how the factors chain: Driver × Improvement × Financial = Benefit Value. Example: 60,000 annual tickets × 15% self-service deflection = 9,000 deflected tickets. 9,000 tickets × $15 average cost per ticket = $135,000 annual savings. Over 3 years with compounding improvements: Year 1 = $135K, Year 2 = $148K, Year 3 = $163K = $446K total.',
          'Why do we keep improvement percentages conservative at 2-20%? Because credibility is everything. If you walk into a CFO\'s office claiming 80% improvement, you\'ve lost the room. A 15% improvement in ticket deflection is believable, achievable, and still produces compelling ROI. The customer can see themselves achieving it.',
          'The 3-year cumulative model is standard because most enterprise software deals are evaluated on a 3-year horizon. Year 1 often shows partial-year benefit (implementation ramp), Year 2 shows full benefit, and Year 3 shows matured benefit with potential improvement uplift. This gives the customer a realistic timeline.',
          'When presenting ROI, distinguish between hard savings (actual cost reduction — fewer FTEs needed, reduced licensing costs) and soft benefits (productivity gains, risk avoidance, faster time-to-market). Both matter, but CFOs weight hard savings more heavily. Lead with hard savings, support with soft benefits.'
        ],
        keyTakeaways: [
          'Three factor types: Driver, Improvement, Financial',
          'Formula: Driver × Improvement × Financial = Benefit Value',
          'Keep improvement ranges conservative: 2-20%',
          'Standard 3-year cumulative model',
          'Lead with hard savings, support with soft benefits'
        ],
        flashcards: [
          { id: 'f2-1', front: 'What are the 3 types of ROI factors?', back: 'Driver Factors (baseline metrics), Improvement Factors (% gains), Financial Factors ($ values)', category: 'ROI Framework' },
          { id: 'f2-2', front: 'What is the ROI chain formula?', back: 'Driver × Improvement × Financial = Benefit Value', category: 'ROI Framework' },
          { id: 'f2-3', front: 'Why keep improvement factors at 2-20%?', back: 'Credibility — conservative estimates are believable and achievable; aggressive numbers lose executive trust', category: 'ROI Framework' },
          { id: 'f2-4', front: 'Calculate: 60K tickets × 15% deflection × $15/ticket', back: '$135,000 annual savings (9,000 deflected tickets × $15 each)', category: 'ROI Framework' },
        ],
        quiz: [
          { id: 'q2-1', question: 'What are Driver Factors?', options: ['Percentage improvements Ivanti delivers', 'Baseline metrics describing current customer state', 'Dollar values for cost translation', 'Executive presentation templates'], correctIndex: 1, explanation: 'Driver Factors are raw baseline numbers from the customer: ticket volume, endpoint count, headcount, etc.' },
          { id: 'q2-2', question: 'Calculate: 60,000 tickets × 15% deflection × $15/ticket =', options: ['$90,000', '$135,000', '$150,000', '$225,000'], correctIndex: 1, explanation: '60,000 × 0.15 = 9,000 deflected tickets. 9,000 × $15 = $135,000 annual savings.' },
          { id: 'q2-3', question: 'What is the recommended range for improvement factors?', options: ['50-80%', '30-50%', '2-20%', '1-5%'], correctIndex: 2, explanation: 'Conservative 2-20% ranges maintain credibility with executives. Aggressive percentages lose trust.' },
          { id: 'q2-4', question: 'Why use a 3-year cumulative model?', options: ['Legal requirements', 'Enterprise deals are evaluated on 3-year horizons', 'Shorter models show less ROI', 'Industry standard minimum'], correctIndex: 1, explanation: 'Most enterprise software purchases are evaluated with a 3-year lens: Year 1 ramp, Year 2 full benefit, Year 3 matured with uplift.' },
          { id: 'q2-5', question: 'What should you lead with when presenting ROI to a CFO?', options: ['Soft benefits like employee satisfaction', 'Hard savings with actual cost reductions', 'Total Cost of Ownership only', 'Competitor comparison pricing'], correctIndex: 1, explanation: 'CFOs weight hard savings (real cost reductions) more heavily. Lead with those, then support with soft benefits like productivity and risk avoidance.' },
        ],
      },
      {
        id: 'benefit-stories',
        title: 'Benefit Stories & Talk Tracks',
        description: 'Learn to tell compelling benefit stories that resonate with every customer.',
        xpReward: 100,
        content: [
          'A benefit story is a structured narrative that connects an Ivanti capability to a real-world customer outcome. Every benefit story follows four parts: Scenario (the customer situation), Talk Track (how you describe it conversationally), Why It Matters (the business impact), and Example Metric (a concrete number).',
          'There are 21 core benefits across four solution areas: ITSM (8 benefits covering incident management, problem resolution, change velocity, knowledge adoption, self-service, analyst productivity, service levels, and service quality), ESM/LOB (8 benefits extending IT practices to HR, facilities, legal, and other departments), UEM (5 benefits around endpoint management, security posture, and device compliance), and Security (5 benefits for vulnerability management, patch compliance, and risk reduction).',
          'Here is an example benefit story for Incident Management: SCENARIO — "Your service desk handles 60,000 tickets per year. Agents spend an average of 22 minutes per ticket, and 60% get escalated because tier-1 lacks context." TALK TRACK — "What if your agents had contextual knowledge articles automatically surfaced when a ticket comes in? We typically see a 15% reduction in handle time and 25% fewer escalations." WHY IT MATTERS — "That\'s 9,000 tickets deflected and 198,000 minutes saved annually — roughly 6 FTE-equivalents of productive time reclaimed." EXAMPLE METRIC — "$135K-$534K annual savings depending on organization size."',
          'For Knowledge Management: SCENARIO — "You have a knowledge base but adoption is under 20%. Agents rarely search it because articles are outdated or hard to find." TALK TRACK — "We see this all the time. The fix isn\'t creating more articles — it\'s making knowledge contextual and actionable. With Ivanti, knowledge surfaces automatically in the agent workspace based on ticket classification." WHY IT MATTERS — "Organizations that reach 60%+ knowledge adoption see 30-40% faster resolution times. That translates directly to lower cost per ticket and higher CSAT." EXAMPLE METRIC — "15-25% improvement in first-contact resolution rate."',
          'The key to a great benefit story is authenticity. You are not reading a script — you are having a conversation. Use phrases like "What we typically see..." and "Organizations in your space usually..." and "The math on this is pretty straightforward..." This positions you as someone who has done this many times before.',
          'Tips for delivering benefit stories effectively: (1) Listen first — never lead with a story until you understand their specific pain. (2) Customize the numbers — swap in their actual metrics whenever possible. (3) Keep it short — a benefit story should take 60-90 seconds, not 5 minutes. (4) End with a question — "Does that resonate with what you\'re seeing?" pulls them into the conversation. (5) Have 3-4 stories ready per meeting — not all 21.',
          'The best VE practitioners have their top 5 benefit stories memorized cold. They can adapt them on the fly based on what the customer says. If the customer mentions high escalation rates, you immediately pivot to the Incident Management story. If they mention compliance concerns, you pull out the Patch Management story.',
          'Practice these stories out loud. Read them, say them, record yourself. The difference between reading a benefit story and telling one naturally is the difference between a forgettable meeting and a deal-winning conversation.'
        ],
        keyTakeaways: [
          'Benefit story structure: Scenario → Talk Track → Why It Matters → Metric',
          '21 core benefits across ITSM, ESM, UEM, Security',
          'Keep stories to 60-90 seconds',
          'Always end with a question to engage the customer',
          'Have 3-4 stories ready per meeting, customize with their data'
        ],
        flashcards: [
          { id: 'f3-1', front: 'What are the 4 parts of a benefit story?', back: 'Scenario, Talk Track, Why It Matters, Example Metric', category: 'Benefit Stories' },
          { id: 'f3-2', front: 'How many core benefits are there across all solutions?', back: '21 benefits: ITSM (8), ESM/LOB (8), UEM (5), Security (5)', category: 'Benefit Stories' },
          { id: 'f3-3', front: 'How long should a benefit story take to deliver?', back: '60-90 seconds — keep it conversational and concise', category: 'Benefit Stories' },
          { id: 'f3-4', front: 'What should you always do at the end of a benefit story?', back: 'Ask a question: "Does that resonate with what you\'re seeing?" to pull them into conversation', category: 'Benefit Stories' },
        ],
        quiz: [
          { id: 'q3-1', question: 'What are the four parts of a benefit story?', options: ['Problem, Solution, Price, Timeline', 'Scenario, Talk Track, Why It Matters, Example Metric', 'Introduction, Body, Conclusion, Call to Action', 'Pain, Gain, Proof, Ask'], correctIndex: 1, explanation: 'Every benefit story follows: Scenario (customer situation), Talk Track (conversational pitch), Why It Matters (business impact), Example Metric (concrete number).' },
          { id: 'q3-2', question: 'How many total core benefits exist across all solution areas?', options: ['15', '21', '36', '49'], correctIndex: 1, explanation: '21 core benefits: ITSM (8) + ESM/LOB (8) + UEM (5) + Security (5) = 21 total.' },
          { id: 'q3-3', question: 'How long should a benefit story take to deliver?', options: ['30 seconds', '60-90 seconds', '3-5 minutes', '10+ minutes'], correctIndex: 1, explanation: 'Keep benefit stories to 60-90 seconds. Longer stories lose attention. Be concise and conversational.' },
          { id: 'q3-4', question: 'What should you do BEFORE telling a benefit story?', options: ['Show a product demo', 'Listen and understand their specific pain first', 'Present the ROI model', 'Share customer references'], correctIndex: 1, explanation: 'Never lead with a story until you understand their pain. Listen first, then select the most relevant benefit story.' },
          { id: 'q3-5', question: 'How many benefit stories should you prepare per meeting?', options: ['All 21', '3-4 relevant ones', 'Just 1 strong one', 'At least 10'], correctIndex: 1, explanation: 'Have 3-4 stories ready per meeting — enough variety to adapt to the conversation, but not so many that you\'re information dumping.' },
        ],
      },
      {
        id: 'discovery-mastery',
        title: 'Discovery Questions & Customer Conversations',
        description: 'Master the art of asking the right questions to uncover customer value.',
        xpReward: 100,
        content: [
          'Discovery is the foundation of every successful VE engagement. Without understanding the customer\'s current state, pain points, and priorities, you cannot build a credible ROI case. The quality of your discovery directly determines the quality of your value assessment.',
          'The SPIN framework (Situation, Problem, Implication, Need-Payoff) is particularly effective in VE conversations. Situation questions establish the baseline: "How many tickets does your service desk handle annually?" Problem questions identify pain: "What happens when a critical incident isn\'t resolved within SLA?" Implication questions quantify impact: "What does that downtime cost per hour?" Need-Payoff questions guide to value: "If you could reduce resolution time by 25%, what would that mean for your team?"',
          'Different personas need different question approaches. For a CIO: Focus on strategic alignment, digital transformation progress, and board-level concerns. "What are your top 3 IT initiatives this year?" For a CISO: Focus on risk exposure, compliance gaps, and breach preparedness. "How confident are you in your current patch compliance rate?" For an IT Director: Focus on operational efficiency, tool consolidation, and team productivity. "How many tools does your team switch between during incident resolution?"',
          'For a Service Desk Manager: Focus on agent experience, escalation rates, and ticket metrics. "What percentage of your tickets get resolved at tier-1 without escalation?" These operational questions yield the Driver Factors you need for ROI modeling. The more specific the answers, the more credible your business case.',
          'Open vs. closed questions serve different purposes. Open questions ("Tell me about your change management process") encourage the customer to share context and reveal pain you didn\'t anticipate. Closed questions ("Do you currently use automated patch deployment?") confirm specific data points. Start broad with open questions, then narrow with closed questions.',
          'Building rapport before diving into data is critical. Don\'t start a meeting with "How many endpoints do you have?" Start with "What\'s keeping you up at night?" or "What would a win look like for your team this quarter?" These questions show you care about their success, not just collecting numbers for a spreadsheet.',
          'A common mistake is asking too many questions without giving value back. After every 3-4 questions, share an insight: "That\'s interesting — we see similar patterns with organizations your size. Typically that means..." This creates a conversation, not an interrogation.',
          'Document everything. Capture answers in real-time (or immediately after). These responses become the inputs to your ROI model and the foundation of your maturity assessment. Missing data means gaps in your business case that executives will question.'
        ],
        keyTakeaways: [
          'SPIN: Situation → Problem → Implication → Need-Payoff',
          'Tailor questions to persona: CIO, CISO, IT Director, Service Desk Manager',
          'Start open, then narrow with closed questions',
          'Share insights every 3-4 questions — conversation, not interrogation',
          'Document everything — answers become ROI model inputs'
        ],
        flashcards: [
          { id: 'f4-1', front: 'What does SPIN stand for?', back: 'Situation, Problem, Implication, Need-Payoff', category: 'Discovery' },
          { id: 'f4-2', front: 'What type of questions should you ask a CISO?', back: 'Risk exposure, compliance gaps, breach preparedness, patch rates', category: 'Discovery' },
          { id: 'f4-3', front: 'What\'s the rule for sharing insights during discovery?', back: 'After every 3-4 questions, give value back with an insight — keep it conversational, not an interrogation', category: 'Discovery' },
          { id: 'f4-4', front: 'Why start with open questions before closed ones?', back: 'Open questions reveal unexpected pain and context; closed questions confirm specific data points', category: 'Discovery' },
        ],
        quiz: [
          { id: 'q4-1', question: 'What does the "I" in SPIN stand for?', options: ['Investigation', 'Implementation', 'Implication', 'Integration'], correctIndex: 2, explanation: 'Implication questions quantify the impact of problems: "What does that downtime cost per hour?"' },
          { id: 'q4-2', question: 'What type of question would you ask a CIO first?', options: ['"How many endpoints do you manage?"', '"What are your top 3 IT initiatives this year?"', '"What is your patch compliance rate?"', '"How many tier-1 agents do you have?"'], correctIndex: 1, explanation: 'CIOs focus on strategic alignment. Start with big-picture questions about initiatives and priorities, not operational details.' },
          { id: 'q4-3', question: 'After asking 3-4 discovery questions, you should:', options: ['Move to the product demo', 'Ask 3-4 more questions', 'Share a relevant insight to give value back', 'Transition to pricing discussion'], correctIndex: 2, explanation: 'Share insights every 3-4 questions to create a conversation, not an interrogation. This builds trust and credibility.' },
          { id: 'q4-4', question: 'Why is discovery documentation critical?', options: ['Legal compliance requirements', 'Customer answers become ROI model inputs', 'CRM tracking mandates', 'Manager reporting needs'], correctIndex: 1, explanation: 'Discovery answers are the Driver Factors for your ROI model. Missing data creates gaps that executives will question.' },
          { id: 'q4-5', question: 'What\'s wrong with starting a meeting by asking "How many endpoints do you have?"', options: ['It\'s too technical', 'It shows you care about data, not their success', 'It\'s a closed question', 'Endpoints are irrelevant'], correctIndex: 1, explanation: 'Start with rapport-building questions like "What\'s keeping you up at night?" — show you care about their outcomes before collecting data.' },
        ],
      },
      {
        id: 'product-benefit-map',
        title: 'Product ↔ Benefit Mapping',
        description: 'Know exactly which products deliver which benefits — and find cross-sell opportunities.',
        xpReward: 100,
        content: [
          'Product-to-Benefit mapping answers a critical question every VE practitioner faces: "The customer has this pain point — which Ivanti products address it, and what measurable benefit can we quantify?" This bidirectional map is your playbook for connecting customer needs to specific solutions.',
          'Ivanti\'s portfolio spans 16+ products across several categories: ITSM (Neurons for ITSM, Service Manager), ESM (extending ITSM to lines of business), UEM (Neurons for UEM, Endpoint Manager), Security (Neurons for RBVM, Patch Management, Zero Trust Access), DEX (Neurons for Digital Experience), and Asset Management (IT Asset Management, Software Asset Management).',
          'Starting from the product side: If a customer is evaluating Neurons for ITSM, the relevant benefits include Incident Resolution Efficiency, Knowledge-Driven Deflection, Change Velocity & Risk Reduction, Self-Service Adoption, Analyst Productivity, Service Level Achievement, and Service Quality Analytics. Each maps to specific improvement factors you can model.',
          'Starting from the benefit side: If discovery reveals the customer\'s biggest pain is "slow incident resolution," the products that address this include Neurons for ITSM (core incident workflows), Knowledge Management (contextual article surfacing), Automation (ticket routing and auto-remediation), and DEX (proactive issue detection before users report). This is where cross-sell opportunities live.',
          'Cross-sell identification is one of VE\'s most powerful contributions to the sales team. When you map a customer\'s pain points to benefits, you often discover needs they haven\'t articulated yet. A customer complaining about incident volume might also benefit from Knowledge Management (deflection) and DEX (proactive detection) — products they weren\'t originally considering.',
          'The mapping isn\'t one-to-one. A single product often delivers multiple benefits (Neurons for ITSM drives 6+ benefit categories), and a single benefit often requires multiple products (full security posture needs RBVM + Patch Management + Endpoint Security). Understanding these relationships lets you build comprehensive, multi-product value cases.',
          'When presenting product-benefit maps to customers, never show all 16 products at once. Filter to the 3-5 most relevant based on discovery. Map each to 2-3 quantifiable benefits. This keeps the conversation focused and the ROI model manageable.',
          'Practice mapping in both directions: "Given this product, what can we quantify?" AND "Given this pain, which products help?" The best VE practitioners can do this in real-time during customer meetings, adapting the value story on the fly.'
        ],
        keyTakeaways: [
          '16+ Ivanti products across ITSM, ESM, UEM, Security, DEX, Asset Management',
          'Mapping is bidirectional: Product → Benefits AND Pain → Products',
          'Cross-sell opportunities emerge from benefit mapping',
          'Filter to 3-5 relevant products per customer engagement',
          'A single product delivers multiple benefits; a single benefit may need multiple products'
        ],
        flashcards: [
          { id: 'f5-1', front: 'How many Ivanti products span the portfolio?', back: '16+ products across ITSM, ESM, UEM, Security, DEX, and Asset Management', category: 'Product Mapping' },
          { id: 'f5-2', front: 'What makes product-benefit mapping bidirectional?', back: 'You can start from product (what can we quantify?) or from pain (which products help?)', category: 'Product Mapping' },
          { id: 'f5-3', front: 'How many products should you present per customer?', back: '3-5 most relevant — filter based on discovery, don\'t overwhelm with the full portfolio', category: 'Product Mapping' },
        ],
        quiz: [
          { id: 'q5-1', question: 'What is the primary purpose of product-benefit mapping?', options: ['Creating pricing proposals', 'Connecting customer pain to quantifiable product value', 'Comparing Ivanti to competitors', 'Managing license allocation'], correctIndex: 1, explanation: 'Product-benefit mapping answers "which products address this pain and what benefit can we quantify?"' },
          { id: 'q5-2', question: 'A customer complaining about incident volume might also benefit from which unexpected product?', options: ['RBVM', 'DEX (proactive detection)', 'Software Asset Management', 'Zero Trust Access'], correctIndex: 1, explanation: 'DEX proactively detects issues before users report them, reducing incident volume — a cross-sell opportunity from benefit mapping.' },
          { id: 'q5-3', question: 'How many products should you include in a customer-facing value case?', options: ['All 16+ products', '3-5 most relevant', 'Only 1 product', '8-10 products'], correctIndex: 1, explanation: 'Filter to 3-5 products based on discovery. Too many overwhelms the conversation and makes the ROI model unwieldy.' },
          { id: 'q5-4', question: 'What key insight does cross-sell identification provide?', options: ['Higher deal value only', 'Needs the customer hasn\'t articulated yet', 'Competitive pricing advantages', 'Implementation timeline estimates'], correctIndex: 1, explanation: 'Benefit mapping often reveals unarticulated needs — products the customer wasn\'t considering but would clearly benefit from.' },
          { id: 'q5-5', question: 'True or False: Each Ivanti product maps to exactly one benefit.', options: ['True', 'False — products deliver multiple benefits and benefits may need multiple products', 'True for ITSM products only', 'It depends on the customer size'], correctIndex: 1, explanation: 'The mapping isn\'t one-to-one. Neurons for ITSM drives 6+ benefit categories, and full security posture needs multiple products.' },
        ],
      },
      {
        id: 'value-case-capstone',
        title: 'Capstone: Building a Complete Value Case',
        description: 'Put it all together — build an end-to-end value case from discovery to executive presentation.',
        xpReward: 200,
        content: [
          'This capstone brings everything together: discovery, capability assessment, benefit selection, ROI calculation, and executive presentation. You will walk through a complete value engagement from first meeting to final deliverable.',
          'SCENARIO: Acme Corp is a 5,000-employee manufacturing company with 125 IT staff, 60,000 annual tickets, 10,000 endpoints, and growing security concerns. They currently use a legacy ITSM tool and have no unified endpoint management. Their CIO is evaluating Ivanti and two competitors.',
          'STEP 1 — DISCOVERY: In your first meeting with Acme\'s IT Director, you learn: average ticket resolution is 4.2 hours, 62% of tickets are escalated beyond tier-1, knowledge base exists but has under 20% adoption, change management is manual with no CAB process (2-3 unplanned outages per month from changes), patches are 45+ days behind on critical systems. These are your Driver Factors.',
          'STEP 2 — CAPABILITY ASSESSMENT: Using the maturity framework, you assess Acme: Incident Management = Medium (they have a process but it\'s slow), Change Management = Low (no formal process), Knowledge Management = Medium (exists but low adoption), Patch Management = Low (critically behind), UEM = Low (three different tools, no single pane). You flag Incident, Change, Patch, and UEM as priorities.',
          'STEP 3 — BENEFIT SELECTION: Based on the assessment, you select 5 core benefits to model: (1) Incident Resolution Efficiency — 20% handle time reduction = $534K/3yr, (2) Knowledge-Driven Deflection — 15% self-service deflection = $405K/3yr, (3) Change Velocity & Risk Reduction — 60% fewer change-related outages = $720K/3yr, (4) Patch Compliance Acceleration — reduce exposure window by 70% = $888K risk reduction/3yr, (5) Endpoint Management Consolidation — tool consolidation savings = $360K/3yr.',
          'STEP 4 — ROI CALCULATION: Total 3-year benefit: $2.91M. Estimated Ivanti investment: $850K over 3 years. Net value: $2.06M. ROI: 242%. Payback period: 11 months. These are the numbers that win the deal.',
          'STEP 5 — EXECUTIVE PRESENTATION: Structure your 30-minute exec presentation: (5 min) Current state challenges — what we heard from your team, (10 min) Maturity assessment findings — where you are today vs where you could be, (10 min) Financial impact — the ROI model with conservative assumptions, (5 min) Recommended roadmap — phased implementation plan. Keep slides visual. Let the numbers do the talking.',
          'The value case doesn\'t end at the presentation. It becomes the foundation for the customer success plan post-sale. The maturity scores become baseline metrics. The improvement factors become success KPIs. The ROI becomes the realization target. VE drives the full customer lifecycle.'
        ],
        keyTakeaways: [
          '5-step process: Discovery → Assessment → Benefit Selection → ROI Calc → Presentation',
          'Drive Factor data comes directly from discovery conversations',
          'Select 3-5 highest-impact benefits to model (not all 21)',
          'Executive presentation: 30 min — challenges, maturity, ROI, roadmap',
          'The value case becomes the customer success baseline post-sale'
        ],
        flashcards: [
          { id: 'f6-1', front: 'What are the 5 steps of building a complete value case?', back: 'Discovery → Capability Assessment → Benefit Selection → ROI Calculation → Executive Presentation', category: 'Value Case' },
          { id: 'f6-2', front: 'How should a 30-min exec presentation be structured?', back: '5 min challenges, 10 min maturity findings, 10 min financial impact, 5 min roadmap', category: 'Value Case' },
          { id: 'f6-3', front: 'What happens to the value case after the sale?', back: 'It becomes the customer success baseline — maturity scores become metrics, improvement factors become KPIs, ROI becomes realization target', category: 'Value Case' },
          { id: 'f6-4', front: 'How many benefits should you model per value case?', back: '3-5 highest-impact benefits (not all 21)', category: 'Value Case' },
        ],
        quiz: [
          { id: 'q6-1', question: 'In the Acme Corp scenario, what was the total 3-year benefit?', options: ['$850K', '$1.5M', '$2.91M', '$4.2M'], correctIndex: 2, explanation: 'The five modeled benefits totaled $2.91M over 3 years against an $850K investment for 242% ROI.' },
          { id: 'q6-2', question: 'How many benefits should you model in a value case?', options: ['All 21 for completeness', '3-5 highest impact', 'Only 1 for simplicity', '10-15 for thoroughness'], correctIndex: 1, explanation: 'Select 3-5 high-impact benefits. Too many dilutes the message; too few undervalues the solution.' },
          { id: 'q6-3', question: 'What becomes the post-sale success baseline?', options: ['The pricing proposal', 'The value case (maturity scores + ROI targets)', 'The product demo recording', 'The competitive analysis'], correctIndex: 1, explanation: 'The value case drives the customer lifecycle: maturity scores become metrics, improvement factors become KPIs, and ROI becomes the realization target.' },
          { id: 'q6-4', question: 'In the exec presentation, what should you lead with?', options: ['Product demo', 'Current state challenges from discovery', 'Pricing and timeline', 'Customer references'], correctIndex: 1, explanation: 'Lead with what you heard — their challenges. This shows you listened and builds credibility before presenting numbers.' },
          { id: 'q6-5', question: 'What was Acme Corp\'s payback period?', options: ['6 months', '11 months', '18 months', '24 months'], correctIndex: 1, explanation: 'With $2.91M benefit vs $850K investment, the payback period was approximately 11 months.' },
        ],
      },
    ],
  },
  {
    id: 'capability-maturity',
    title: 'Capability & Maturity Assessment',
    description: 'Learn to assess, score, and roadmap customer maturity across 36 business capabilities.',
    icon: '🎯',
    color: '#8B5CF6',
    certificationTitle: 'Capability & Maturity Assessment Certified',
    modules: [
      {
        id: '36-capabilities',
        title: 'The 36 Business Capabilities',
        description: 'Understand the four domains and all 36 capabilities in the Ivanti framework.',
        xpReward: 100,
        content: [
          'The Ivanti Business Capability Framework organizes 36 capabilities across four domains. These capabilities represent the core functions an organization needs to manage effectively. Understanding them is the foundation of every maturity assessment.',
          'Enterprise Service Management (ESM) — 12 capabilities: This is the largest domain, covering everything from incident response to employee onboarding. The 12 capabilities are: Incident Management, Problem Management, Change Management, Knowledge Management, Self-Service & Request Management, Analyst Workspace, Automation & Predictive Intelligence, CI Inventory, Field Worker & Agent Mobility, Service Level Management, Service Quality & Analytics, and Enterprise Onboarding/Transitions/Offboarding.',
          'Exposure Management — 4 capabilities: This domain focuses on identifying and reducing security risk. The 4 capabilities are: Risk-Based Vulnerability Management (RBVM), Attack Surface Management, Patch & Deployment Controls, and Application Security Posture Management. These capabilities are increasingly critical as organizations face growing cyber threats.',
          'Endpoint Management & Security — 12 capabilities: This domain covers device management, security, and user experience. The 12 capabilities are: Unified Endpoint Management (UEM), Endpoint Security, Zero Trust Network Access (ZTNA), Physical Asset Inventory, IT Asset Management (ITAM), Software Procurement, Digital Experience Management (DEX), Proactive & Remote Support, Dependency & Service Mapping, BYOD Management, Mobile & Field Device Security, and IoT/IIoT Access Security.',
          'Foundations — 8 capabilities: These are the cross-cutting capabilities that enable everything else. The 8 capabilities are: Governance Risk & Compliance (GRC), Data Management, Continual Improvement & Process Optimization, Business Continuity, Network Discovery, Third Party Connectors/APIs/Integrations, Configuration Management Database (CMDB), and Reporting.',
          'Why capabilities matter more than features: When you talk to a customer about "features," they compare checkboxes against competitors. When you talk about "capabilities," you discuss their organizational maturity and where they need to improve. Capabilities frame the conversation around the customer\'s journey, not your product\'s spec sheet.',
          'The capability framework is used in two key contexts: (1) During assessment workshops to evaluate where the customer stands today, and (2) During value modeling to identify which capabilities to improve and quantify the financial impact of those improvements.',
          'Each capability has associated features & benefits, key performance indicators (KPIs), and "things to consider" — questions and challenges that help facilitate deeper conversations during workshops. These capability cards are the assessment toolkit that guides every engagement.'
        ],
        keyTakeaways: [
          '36 capabilities across 4 domains',
          'ESM: 12 capabilities (largest domain)',
          'Exposure Management: 4 capabilities (security-focused)',
          'Endpoint Management & Security: 12 capabilities',
          'Foundations: 8 cross-cutting capabilities',
          'Capabilities frame customer journey, not product specs'
        ],
        flashcards: [
          { id: 'fc1-1', front: 'How many total business capabilities are in the framework?', back: '36 capabilities across 4 domains', category: 'Capabilities' },
          { id: 'fc1-2', front: 'Name the 4 domains and their capability counts', back: 'Enterprise Service Management (12), Exposure Management (4), Endpoint Management & Security (12), Foundations (8)', category: 'Capabilities' },
          { id: 'fc1-3', front: 'Why talk capabilities instead of features?', back: 'Capabilities frame the customer\'s maturity journey; features just create competitor checkbox comparisons', category: 'Capabilities' },
          { id: 'fc1-4', front: 'What 3 elements does each capability card contain?', back: 'Features & Benefits, Key Performance Indicators (KPIs), Things to Consider', category: 'Capabilities' },
        ],
        quiz: [
          { id: 'qc1-1', question: 'How many business capabilities are in the Ivanti framework?', options: ['24', '30', '36', '42'], correctIndex: 2, explanation: '36 capabilities organized across 4 domains: ESM (12), Exposure (4), Endpoint (12), Foundations (8).' },
          { id: 'qc1-2', question: 'Which domain has the most capabilities?', options: ['Exposure Management', 'Foundations', 'Enterprise Service Management (tied with Endpoint)', 'Endpoint Management & Security (tied with ESM)'], correctIndex: 2, explanation: 'Both ESM and Endpoint Management have 12 capabilities each, making them the largest domains.' },
          { id: 'qc1-3', question: 'RBVM, Attack Surface, Patch & Deployment, and App Security Posture belong to which domain?', options: ['ESM', 'Exposure Management', 'Endpoint Management', 'Foundations'], correctIndex: 1, explanation: 'These 4 security-focused capabilities make up the Exposure Management domain.' },
          { id: 'qc1-4', question: 'Why are capabilities more effective than features in customer conversations?', options: ['They are easier to explain', 'They frame the customer\'s maturity journey instead of creating competitor comparisons', 'They require less technical knowledge', 'They are industry-standard terminology'], correctIndex: 1, explanation: 'Capabilities shift the conversation from product comparison to organizational improvement journey.' },
          { id: 'qc1-5', question: 'Which of these is a Foundations capability?', options: ['Incident Management', 'ZTNA', 'CMDB', 'RBVM'], correctIndex: 2, explanation: 'CMDB (Configuration Management Database) is one of the 8 Foundations capabilities. Incident is ESM, ZTNA is Endpoint, RBVM is Exposure.' },
        ],
      },
      {
        id: 'maturity-levels',
        title: 'Maturity Levels & Scoring',
        description: 'Learn what Low, Medium, and High maturity mean and how to score capabilities.',
        xpReward: 100,
        content: [
          'The maturity assessment uses three levels: Low, Medium, and High. Each level represents a distinct stage of organizational capability. Understanding what these levels actually mean in practice is essential for accurate assessment.',
          'Low Maturity (Red) means reactive and ad-hoc. The organization acknowledges the capability exists but has no formal process. Things happen on a case-by-case basis. Example: Change Management at Low means changes are made without a formal approval process, documentation is inconsistent, and unplanned outages from changes are common.',
          'Medium Maturity (Yellow/Orange) means defined with gaps. The organization has established processes but they are inconsistently followed, partially automated, or missing key elements. Example: Incident Management at Medium means there is a ticketing system and basic SLAs, but knowledge integration is weak, escalation rates are high, and agent productivity varies significantly.',
          'High Maturity (Green) means optimized and measurable. Processes are well-defined, consistently followed, largely automated, and measured against KPIs. Continuous improvement is embedded. Example: Patch Management at High means automated patch testing and deployment, risk-based prioritization, compliance reporting, and patch windows under 48 hours for critical vulnerabilities.',
          'Priority flagging is a critical part of the assessment. Not every Low-maturity capability needs immediate attention. Priority flags indicate which capabilities are strategically important to the customer — either because they cause the most pain, align with executive initiatives, or represent the biggest risk. During workshops, you ask: "Is this a priority for your organization?"',
          'Common patterns you will see: Most organizations are Medium in core ITSM capabilities (they have a ticketing system) but Low in security capabilities (patch management, vulnerability management). Foundations capabilities like CMDB and Reporting are often Low because they are seen as "plumbing" rather than strategic. DEX is almost always Low because it is a newer discipline.',
          'Interpreting results requires context. A Low in IoT Security for a financial services firm might be less critical than a Low in Patch Management. The assessment is not about achieving High in everything — it is about identifying the gaps that matter most to the customer\'s business objectives and risk profile.',
          'Assessment data becomes the input for your value case. Low and Medium capabilities that are flagged as priorities become the focus of your ROI model. You are quantifying the cost of staying at their current maturity and the value of improving.'
        ],
        keyTakeaways: [
          'Low = reactive/ad-hoc, Medium = defined with gaps, High = optimized/measurable',
          'Priority flags identify strategically important capabilities',
          'Most orgs: Medium in ITSM, Low in security and foundations',
          'Not every Low needs attention — context matters',
          'Assessment data feeds directly into the ROI model'
        ],
        flashcards: [
          { id: 'fc2-1', front: 'What does Low maturity mean?', back: 'Reactive and ad-hoc — capability exists but no formal process, things happen case by case', category: 'Maturity' },
          { id: 'fc2-2', front: 'What does Medium maturity mean?', back: 'Defined with gaps — processes exist but inconsistently followed, partially automated, missing key elements', category: 'Maturity' },
          { id: 'fc2-3', front: 'What does High maturity mean?', back: 'Optimized and measurable — well-defined, consistently followed, automated, measured against KPIs', category: 'Maturity' },
          { id: 'fc2-4', front: 'What is the typical maturity pattern for most organizations?', back: 'Medium in core ITSM, Low in security capabilities (patch, vuln mgmt), Low in Foundations (CMDB, Reporting)', category: 'Maturity' },
        ],
        quiz: [
          { id: 'qc2-1', question: 'What does a "Medium" maturity rating indicate?', options: ['No process exists', 'Defined processes with inconsistencies and gaps', 'Fully optimized and automated', 'Currently being implemented'], correctIndex: 1, explanation: 'Medium means processes exist but are inconsistently followed, partially automated, or missing key elements.' },
          { id: 'qc2-2', question: 'What is the purpose of priority flagging?', options: ['To mark capabilities for deletion', 'To identify strategically important capabilities for focused attention', 'To indicate which capabilities are already at High maturity', 'To assign ownership to team members'], correctIndex: 1, explanation: 'Priority flags indicate which capabilities matter most — because of pain, executive alignment, or risk.' },
          { id: 'qc2-3', question: 'What is the most common maturity pattern?', options: ['High in everything', 'Low across the board', 'Medium in ITSM, Low in security and foundations', 'High in security, Low in ITSM'], correctIndex: 2, explanation: 'Most organizations have basic ITSM processes (Medium) but lag in security capabilities and foundational elements.' },
          { id: 'qc2-4', question: 'Should the goal always be High maturity in every capability?', options: ['Yes, always aim for High', 'No — focus on gaps that matter to business objectives and risk', 'Only for security capabilities', 'Only if the budget allows'], correctIndex: 1, explanation: 'Assessment is about identifying gaps that matter most. A Low in IoT Security may be less urgent than a Low in Patch Management depending on context.' },
          { id: 'qc2-5', question: 'How does assessment data connect to the value case?', options: ['It replaces the need for discovery', 'Low/Medium priorities become focus areas for ROI modeling', 'It is only used for the executive summary', 'It determines product pricing'], correctIndex: 1, explanation: 'Low and Medium capabilities flagged as priorities become the focus of the ROI model — quantifying the cost of current state vs. improved state.' },
        ],
      },
      {
        id: 'running-workshops',
        title: 'Running a Capability Workshop',
        description: 'Facilitation techniques for leading successful assessment workshops.',
        xpReward: 100,
        content: [
          'The Capability Assessment Workshop is the centerpiece of the maturity framework. It is a structured session where you guide customer stakeholders through evaluating their organization\'s maturity across relevant capabilities. A well-run workshop builds trust, surfaces real pain, and generates the data you need for a compelling value case.',
          'Workshop logistics: Plan for 60-90 minutes. Ideal group size is 4-8 stakeholders from different levels (IT Director, Service Desk Manager, Security Lead, etc.). Multiple perspectives are critical — a CIO\'s view of Incident Management may differ dramatically from a tier-1 agent\'s. Use the assessment tool at cap.vantosico.com to facilitate live.',
          'Opening the workshop: Start with a 5-minute overview of what you will do and why. Set expectations: "We are going to walk through your key IT capabilities together. For each one, we will discuss where you are today and whether it is a priority for improvement. There are no wrong answers — this is about getting an honest picture." This reduces defensiveness.',
          'Facilitating maturity ratings: For each capability, read the description aloud, then ask: "Based on your experience, would you say this is Low, Medium, or High maturity in your organization?" Let the room discuss. If there is disagreement, that is valuable — it reveals different perspectives. Mark the consensus rating.',
          'Flagging priorities: After rating, ask: "Is this a priority for your organization right now?" If yes, probe deeper: "What are the top 1-2 issues you face here? Who does it impact?" These priority notes become gold for your value case. They are the customer\'s own words describing their pain.',
          'Handling disagreements: When stakeholders disagree on maturity levels, do not force consensus. Instead, ask each person to explain their rating. Often the disagreement reveals a gap — a manager may think processes are Medium because they exist on paper, while the practitioners know they are Low because nobody follows them. Document both perspectives.',
          'Time management: You will not assess all 36 capabilities in one session. Focus on the most relevant domain(s) based on discovery. If the customer is primarily interested in ITSM transformation, focus on ESM capabilities. If security is the driver, focus on Exposure and Endpoint. Target 10-15 capabilities per workshop.',
          'Closing the workshop: Summarize what you heard. Highlight the top 3-5 priority areas. Set expectations for next steps: "Based on what we discussed today, I am going to build a maturity roadmap and quantify the financial impact of addressing these priority areas. We will review that together in our next session." Always end with a clear next step.'
        ],
        keyTakeaways: [
          '60-90 minutes, 4-8 stakeholders from different levels',
          'Set expectations early — honest assessment, no wrong answers',
          'Let disagreements surface — they reveal real gaps',
          'Target 10-15 capabilities per session, not all 36',
          'Close with clear next steps: roadmap and financial impact'
        ],
        flashcards: [
          { id: 'fc3-1', front: 'What is the ideal workshop group size?', back: '4-8 stakeholders from different levels (IT Director, Service Desk, Security Lead)', category: 'Workshops' },
          { id: 'fc3-2', front: 'How many capabilities should you target per workshop?', back: '10-15 capabilities — focus on relevant domain(s) based on discovery', category: 'Workshops' },
          { id: 'fc3-3', front: 'What should you do when stakeholders disagree on maturity?', back: 'Don\'t force consensus — ask each to explain. Disagreements reveal real gaps between policy and practice.', category: 'Workshops' },
          { id: 'fc3-4', front: 'What tool do you use to facilitate the live assessment?', back: 'cap.vantosico.com — the Capability Assessment Canvas', category: 'Workshops' },
        ],
        quiz: [
          { id: 'qc3-1', question: 'What is the recommended workshop duration?', options: ['30 minutes', '60-90 minutes', '2-3 hours', 'Half day'], correctIndex: 1, explanation: '60-90 minutes is the sweet spot — enough time for meaningful discussion without losing attention.' },
          { id: 'qc3-2', question: 'When stakeholders disagree on a maturity rating, you should:', options: ['Go with the senior person\'s rating', 'Average the ratings', 'Explore the disagreement — it reveals gaps', 'Skip that capability'], correctIndex: 2, explanation: 'Disagreements are valuable. A manager may rate Medium because a process exists, while practitioners know it\'s Low because nobody follows it.' },
          { id: 'qc3-3', question: 'How many capabilities should you assess per workshop?', options: ['All 36', '10-15 focused on relevant domains', '5 maximum', '20-25'], correctIndex: 1, explanation: 'Focus on 10-15 relevant capabilities. Assessing all 36 in one session leads to assessment fatigue and shallow responses.' },
          { id: 'qc3-4', question: 'What is the most important thing to do when closing a workshop?', options: ['Ask for a purchase commitment', 'Set clear next steps — roadmap and financial impact review', 'Rate all remaining capabilities quickly', 'Send a thank-you email'], correctIndex: 1, explanation: 'Always close with clear next steps. The customer should know exactly what comes next and when.' },
          { id: 'qc3-5', question: 'Why include stakeholders from different levels?', options: ['To fill the room', 'Multiple perspectives reveal the true state — managers and practitioners often see differently', 'Company policy requires it', 'To increase meeting importance'], correctIndex: 1, explanation: 'Different levels have different views. A CIO may see things differently than a tier-1 agent — both perspectives are needed for accurate assessment.' },
        ],
      },
      {
        id: 'capability-deep-dive',
        title: 'Capability Cards Deep Dive',
        description: 'Master the capability cards — features, KPIs, and conversation starters for each capability.',
        xpReward: 100,
        content: [
          'Every one of the 36 capabilities has an associated capability card — a structured reference that provides everything you need to facilitate a meaningful conversation about that capability during a workshop. Understanding how to use these cards effectively is what separates a mediocre facilitator from an excellent one.',
          'Each capability card has three sections: Features & Benefits (what Ivanti enables for this capability), Key Performance Indicators (how to measure maturity and improvement), and Things to Consider (questions and challenges that drive deeper discussion). Together, these three sections give you the complete toolkit for each capability.',
          'Features & Benefits tell you what is possible. For example, Incident Management\'s features include: boost employee productivity, restore services, classification and prioritization, single-pane agent view, increase incident deflection, and improve agent productivity. These are not just marketing bullets — they are conversation starters for discussing what the customer currently has vs. what they could have.',
          'KPIs tell you how to measure. For Incident Management: employee productivity, incident deflection, agent productivity, incident experience (CSAT), and incident handle time. When assessing maturity, ask: "Are you tracking these KPIs today? What are your current numbers?" This naturally generates the Driver Factors you need for ROI modeling.',
          'Things to Consider are the deep-dive questions. These are designed to uncover nuance: "Are incidents being classified and prioritized automatically or manually? Do agents have contextual knowledge available during ticket handling? Are you measuring first-contact resolution rate?" These questions transform a surface-level assessment into a meaningful diagnostic conversation.',
          'In practice, you do not read the full card to the customer. Instead, you internalize the key points and use them conversationally. When assessing Knowledge Management, you might say: "So you mentioned your KB exists but adoption is low. One of the things we look at is whether knowledge surfaces contextually — does it appear automatically when an agent opens a related ticket, or do they have to search for it?" That question comes directly from the card but sounds natural.',
          'The cards also help you identify connections between capabilities. When a customer rates Knowledge Management as Low, that directly impacts Incident Management (no deflection), Self-Service (no useful articles), and Analyst Productivity (agents reinvent solutions). Capability cards help you tell the interconnected story.',
          'Invest time studying the cards for the 10-12 most common capabilities you will assess. You do not need all 36 memorized — but you should know ESM capabilities cold, plus Patch Management, RBVM, UEM, and CMDB. These come up in almost every engagement.'
        ],
        keyTakeaways: [
          '3 card sections: Features & Benefits, KPIs, Things to Consider',
          'KPIs generate Driver Factors for ROI modeling',
          'Don\'t read cards — internalize and use conversationally',
          'Cards reveal connections between related capabilities',
          'Know 10-12 common capabilities cold'
        ],
        flashcards: [
          { id: 'fc4-1', front: 'What are the 3 sections of a capability card?', back: 'Features & Benefits, Key Performance Indicators, Things to Consider', category: 'Capability Cards' },
          { id: 'fc4-2', front: 'How should you use capability cards during workshops?', back: 'Don\'t read them — internalize key points and use conversationally', category: 'Capability Cards' },
          { id: 'fc4-3', front: 'How do KPIs from capability cards help ROI modeling?', back: 'KPI questions generate Driver Factors — current metrics that feed into the ROI calculation', category: 'Capability Cards' },
        ],
        quiz: [
          { id: 'qc4-1', question: 'What are the three sections of a capability card?', options: ['Problem, Solution, Cost', 'Features & Benefits, KPIs, Things to Consider', 'Low, Medium, High', 'Overview, Details, Summary'], correctIndex: 1, explanation: 'Every card has Features & Benefits, KPIs, and Things to Consider — the complete conversation toolkit.' },
          { id: 'qc4-2', question: 'How should you use capability cards in a workshop?', options: ['Read them verbatim to the customer', 'Internalize the key points and use them conversationally', 'Hand them out as reference sheets', 'Only reference them after the workshop'], correctIndex: 1, explanation: 'Cards are your prep material. Internalize the key points so questions and insights flow naturally in conversation.' },
          { id: 'qc4-3', question: 'When a customer rates Knowledge Management as Low, which related capabilities are impacted?', options: ['Only Knowledge Management itself', 'Incident Management, Self-Service, and Analyst Productivity', 'Change Management and Problem Management', 'RBVM and Patch Management'], correctIndex: 1, explanation: 'Low Knowledge Management means no deflection (Incident), no useful self-service articles, and agents reinvent solutions (Analyst Productivity).' },
          { id: 'qc4-4', question: 'How many capabilities should you know well?', options: ['All 36 equally', '10-12 most common ones cold', 'Only 4-5 from one domain', 'Just the ones the customer asks about'], correctIndex: 1, explanation: 'Know 10-12 common capabilities (core ESM, Patch, RBVM, UEM, CMDB) thoroughly. These appear in almost every engagement.' },
          { id: 'qc4-5', question: 'What do KPI questions during assessment naturally generate?', options: ['Product requirements', 'Driver Factors for ROI modeling', 'Implementation timelines', 'Staffing recommendations'], correctIndex: 1, explanation: 'KPI questions like "What are your current numbers?" generate the baseline metrics (Driver Factors) needed for ROI calculations.' },
        ],
      },
      {
        id: 'assessment-to-roadmap',
        title: 'From Assessment to Roadmap',
        description: 'Turn maturity gaps into actionable customer roadmaps.',
        xpReward: 100,
        content: [
          'An assessment without a roadmap is just a report card. The real value of a maturity assessment is translating gaps into a prioritized action plan that the customer can execute. This is where VE practitioners earn their seat at the strategic table.',
          'The first step is gap analysis: Compare current maturity (what we assessed) against target maturity (where the customer wants to be). Not every capability needs to reach High. A manufacturing company may target High in Patch Management (security-critical) but accept Medium in Self-Service (lower priority). Let the customer\'s business objectives drive the targets.',
          'Prioritization frameworks help decide what to tackle first. Use a simple 2×2 matrix: Impact (High/Low) vs. Effort (High/Low). High Impact + Low Effort = Quick Wins (do these first). High Impact + High Effort = Strategic Projects (plan these). Low Impact + Low Effort = Fill-Ins (nice to have). Low Impact + High Effort = Deprioritize.',
          'Quick wins are critical for building momentum and proving value. If the assessment shows Knowledge Management at Low maturity and the customer already has Ivanti ITSM, enabling contextual knowledge in the agent workspace could be a quick win — low effort, measurable impact within weeks. Start with these to build trust.',
          'For strategic projects (high impact, high effort), build a phased approach. Example roadmap: Phase 1 (0-3 months) — Quick wins in Incident and Knowledge Management. Phase 2 (3-6 months) — Change Management process formalization. Phase 3 (6-12 months) — Full endpoint management consolidation with UEM. Phase 4 (12-18 months) — Advanced security posture with RBVM and automated patching.',
          'Each roadmap phase should have clear success metrics tied back to the assessment. If Incident Management was rated Medium with a priority flag, the success metric might be: "Reduce mean time to resolution from 4.2 hours to under 2 hours by end of Phase 1." These metrics come directly from the capability KPIs and the ROI model.',
          'The roadmap becomes a living document. It should be reviewed quarterly as the customer matures. Re-assess at 6-month and 12-month intervals to measure progress, celebrate wins, and adjust priorities. This creates an ongoing VE relationship, not a one-time engagement.',
          'Present the roadmap visually. Executives love timelines — a simple left-to-right phased plan with capability names, maturity targets, and expected outcomes for each phase. Keep it to one page. If it takes more than one page to explain, it is too complex.'
        ],
        keyTakeaways: [
          'Gap analysis: current state vs. target state (not everything needs to be High)',
          'Prioritize with Impact × Effort matrix: Quick Wins first',
          'Phase the roadmap: 0-3, 3-6, 6-12, 12-18 months',
          'Tie each phase to measurable success metrics from assessment KPIs',
          'Re-assess at 6 and 12 months — make it a living document'
        ],
        flashcards: [
          { id: 'fc5-1', front: 'What is the Impact × Effort prioritization matrix?', back: 'High Impact + Low Effort = Quick Wins (first), High Impact + High Effort = Strategic Projects, Low Impact + Low Effort = Fill-Ins, Low Impact + High Effort = Deprioritize', category: 'Roadmapping' },
          { id: 'fc5-2', front: 'Why are quick wins critical?', back: 'They build momentum, prove value quickly, and earn trust for larger strategic investments', category: 'Roadmapping' },
          { id: 'fc5-3', front: 'How often should the roadmap be reviewed?', back: 'Quarterly, with formal re-assessments at 6 and 12 months', category: 'Roadmapping' },
        ],
        quiz: [
          { id: 'qc5-1', question: 'What type of initiative should you tackle first in a roadmap?', options: ['Strategic projects with high impact', 'Quick wins — high impact, low effort', 'Everything simultaneously', 'The most complex items first'], correctIndex: 1, explanation: 'Quick wins build momentum, prove value fast, and earn trust for bigger investments.' },
          { id: 'qc5-2', question: 'Should every capability target High maturity?', options: ['Yes, always', 'No — targets should align with business objectives and risk profile', 'Only security capabilities', 'Only if the customer requests it'], correctIndex: 1, explanation: 'Let business objectives drive targets. A company may target High in Patch Management but accept Medium in Self-Service.' },
          { id: 'qc5-3', question: 'What makes a roadmap a "living document"?', options: ['It is stored in a wiki', 'It is reviewed quarterly and re-assessed at 6/12 month intervals', 'It has version numbers', 'It is updated whenever a new product launches'], correctIndex: 1, explanation: 'Regular review and re-assessment keep the roadmap relevant and create an ongoing VE relationship.' },
          { id: 'qc5-4', question: 'How should an executive roadmap be presented?', options: ['10+ page detailed document', 'One-page visual timeline with phases, capabilities, and outcomes', 'Spreadsheet with all 36 capabilities', 'Verbal summary only'], correctIndex: 1, explanation: 'Keep it visual, one page, left-to-right phased plan. If it needs more than one page, simplify.' },
          { id: 'qc5-5', question: 'Where do roadmap success metrics come from?', options: ['Industry benchmarks only', 'Assessment KPIs and ROI model targets', 'The sales team\'s quotas', 'Customer satisfaction surveys'], correctIndex: 1, explanation: 'Success metrics tie directly back to capability KPIs from the assessment and improvement targets from the ROI model.' },
        ],
      },
      {
        id: 'facilitation-capstone',
        title: 'Capstone: Full Assessment Facilitation',
        description: 'End-to-end walkthrough — from prep to report to recommendations.',
        xpReward: 200,
        content: [
          'This capstone takes you through a complete Capability & Maturity Assessment from start to finish. You will walk through preparation, facilitation, scoring, reporting, and recommendations using a real-world scenario.',
          'SCENARIO: Global Financial Services Corp (GFS) has 12,000 employees, 300 IT staff, and offices in 15 countries. They are consolidating from 5 different ITSM tools to one platform. Their CISO is pushing for better vulnerability management after a recent near-miss security incident. The CIO wants measurable improvement in IT service delivery.',
          'PREPARATION (1-2 days before): Review discovery notes from the account team. GFS cares about: service consolidation, security posture, and operational efficiency. Select 15 capabilities to assess: all 12 ESM capabilities (since they are consolidating ITSM), plus Patch & Deployment, RBVM, and CMDB (requested by the CISO). Prepare the assessment tool with these capabilities loaded. Brief the account team on the workshop flow.',
          'FACILITATION (90-minute workshop): Attendees: VP of IT Operations, Service Desk Director, Security Operations Lead, 2 IT Managers, IT Architect. Open with the overview and ground rules. Work through capabilities systematically — ESM first since it is their primary focus. For each: read description, discuss, rate, check priority, capture notes on priority items. The VP and Service Desk Director disagree on Change Management — VP says Medium (policy exists), Director says Low (nobody follows it). Document both views, mark Low with a note.',
          'KEY FINDINGS: After 90 minutes, the assessment reveals: 3 capabilities at High (Incident Management, Problem Management, Service Levels — strong ITSM foundation), 7 at Medium (Knowledge, Self-Service, Analyst Workspace, CI Inventory, Mobility, Quality Analytics, CMDB), 5 at Low (Change Management, Automation, Onboarding, Patch & Deployment, RBVM). Priority flags: Change Management, Patch & Deployment, RBVM, Automation, and Knowledge Management.',
          'SCORING & ANALYSIS: The 5 priority areas tell a clear story — GFS has decent reactive capabilities (handling incidents, tracking problems) but is weak on proactive and preventive capabilities (change process, automation, patch management, security). This is a common pattern for organizations that grew fast and are now trying to mature.',
          'REPORT GENERATION: Using the assessment tool\'s Download Report feature, generate a comprehensive report with: maturity heatmap, priority capability analysis, stakeholder notes, and recommended next steps. The report includes data captured during the session — maturity levels, priority flags, and the specific issues documented for each priority capability.',
          'RECOMMENDATIONS: Present three strategic recommendations: (1) Quick Win — Enable contextual Knowledge Management and self-service improvements (Medium → High in 3 months, $400K+ annual savings in ticket deflection). (2) Strategic — Implement formal Change Management with automated CAB workflows (Low → Medium in 6 months, 60%+ reduction in change-related outages). (3) Security Imperative — Deploy RBVM and automated Patch Management (Low → Medium in 6-9 months, 70% reduction in vulnerability exposure window). Total estimated 3-year value: $4.2M.'
        ],
        keyTakeaways: [
          'Preparation: select 10-15 capabilities based on customer priorities',
          'Facilitation: 90 minutes, document disagreements, capture priority notes',
          'Analysis: identify patterns (reactive vs proactive capabilities)',
          'Report: maturity heatmap + priority analysis + stakeholder notes',
          'Recommendations: Quick Wins + Strategic Projects + Imperatives with ROI'
        ],
        flashcards: [
          { id: 'fc6-1', front: 'How many capabilities should you select for a workshop?', back: '10-15 based on customer priorities and discovery notes', category: 'Facilitation' },
          { id: 'fc6-2', front: 'What pattern often emerges in maturing organizations?', back: 'Strong reactive capabilities (incident handling) but weak proactive ones (change, automation, patch, security)', category: 'Facilitation' },
          { id: 'fc6-3', front: 'What should a post-workshop report include?', back: 'Maturity heatmap, priority capability analysis, stakeholder notes, and recommended next steps with ROI', category: 'Facilitation' },
          { id: 'fc6-4', front: 'How should recommendations be structured?', back: 'Quick Wins (fast value), Strategic Projects (phased), and Imperatives (risk-driven) — each with estimated financial impact', category: 'Facilitation' },
        ],
        quiz: [
          { id: 'qc6-1', question: 'In the GFS scenario, why was Change Management rated Low despite the VP saying Medium?', options: ['The VP was wrong', 'The Service Desk Director had operational evidence that nobody follows the policy', 'Low is always the default', 'The facilitator overruled the VP'], correctIndex: 1, explanation: 'The VP saw the policy (Medium), but the Director had ground-level evidence it wasn\'t followed (Low). Practitioner perspective won with documentation of both views.' },
          { id: 'qc6-2', question: 'What pattern did the GFS assessment reveal?', options: ['All capabilities were Low', 'Strong reactive capabilities but weak proactive/preventive ones', 'Security was mature but ITSM was weak', 'Foundations were the strongest domain'], correctIndex: 1, explanation: 'GFS was good at reacting (incidents, problems, SLAs) but weak at preventing issues (change process, automation, patches, security).' },
          { id: 'qc6-3', question: 'What was recommended as the Quick Win for GFS?', options: ['Deploy RBVM', 'Implement Change Management', 'Enable Knowledge Management and self-service improvements', 'Consolidate all 5 ITSM tools'], correctIndex: 2, explanation: 'Knowledge Management improvement (Medium → High) was a quick win with fast ROI through ticket deflection.' },
          { id: 'qc6-4', question: 'What was the total estimated 3-year value for GFS?', options: ['$850K', '$2.1M', '$4.2M', '$6.5M'], correctIndex: 2, explanation: 'Combined Quick Win + Strategic + Security Imperative recommendations totaled $4.2M in estimated 3-year value.' },
          { id: 'qc6-5', question: 'What should you do with stakeholder disagreements during assessment?', options: ['Delete the conflicting data', 'Document both perspectives and note the rationale', 'Always go with the more senior person', 'Skip that capability'], correctIndex: 1, explanation: 'Document both views — disagreements reveal gaps between policy and practice, which is valuable assessment data.' },
        ],
      },
    ],
  },
];

export function getTrackById(id: string): Track | undefined {
  return tracks.find(t => t.id === id);
}

export function getModuleById(trackId: string, moduleId: string): Module | undefined {
  const track = getTrackById(trackId);
  return track?.modules.find(m => m.id === moduleId);
}
