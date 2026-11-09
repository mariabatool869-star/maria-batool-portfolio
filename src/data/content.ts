/**
 * ─────────────────────────────────────────────────────────────
 *  ALL EDITABLE CONTENT FOR MARIA BATOOL'S PORTFOLIO.
 *  Components read from here. Search for "SWAP:" to find every
 *  placeholder still waiting for Maria's details or media.
 * ─────────────────────────────────────────────────────────────
 */

export const config = {
  name: 'Maria Batool',
  monogram: 'MB',
  title: 'Cybersecurity & AI Engineer',
  // Gradient line under the name (her one-line tagline).
  tagline: 'Cybersecurity research, explainable AI and secure full-stack engineering.',
  location: 'Aberdeen, UK',
  workModes: 'Remote worldwide',

  email: 'mariabatool869@gmail.com',
  // SWAP: Calendly link. While empty ("email only"), booking buttons open an email.
  bookingUrl: '',
  // SWAP: Maria's CV PDF → /public/cv/Maria-Batool-CV.pdf, then set this to that path.
  // Kept empty (button hidden) so visitors never hit a broken download.
  cvUrl: '',

  // Wording agreed to match her CV.
  availability: 'Open to cybersecurity, AI engineering and Python development roles',
  clearance: '', // Only add clearance eligibility when verified for specific role requirements.
  languages: 'English (Professional), Urdu (Fluent), Punjabi (Fluent)',
  // Hero buttons.
  ctaPrimary: 'Explore my work',
  ctaSecondary: 'Contact me about roles',
  // Not provided: empty hides the "Response" row.
  responseTime: '',

  // Hero video: 9 s seamless loop, no audio (supplied 1280×720; a 1920×1080 source would be sharper).
  heroVideo: '/hero.mp4',
  heroVideoWebm: '/hero.webm',
  heroPoster: '/images/hero-poster.webp',

  // Portrait 800px (hero) and 192px avatar (nav, contact, footer); "MB" if either fails.
  portrait: '/images/portrait',

  // Shown in the footer. Update whenever the content changes.
  lastUpdated: 'November 2026',

  socials: {
    linkedin: 'https://www.linkedin.com/in/mariabatool7/',
    x: '',
    github: 'https://github.com/mariabatool869-star',
    instagram: '',
  },
}

/** Booking buttons: Calendly once set; until then ("email only") a pre-addressed email. */
export const bookingHref =
  config.bookingUrl || `mailto:${config.email}?subject=${encodeURIComponent('Discovery call')}`

/** The button inside Contact: booking link, else email (once set), else #contact. */
export const contactCtaHref =
  config.bookingUrl ||
  (config.email ? `mailto:${config.email}?subject=${encodeURIComponent('Discovery call')}` : '#contact')

// No patents, so no Patents link.
export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Research', href: '#research' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export const hero = {
  trustLine: 'Three master’s degrees · Applied security research · Full-stack AI delivery',
  // No awards: empty hides the amber award badge.
  award: '',
  valueProp:
    'I build cybersecurity research tools, AI automation and secure web applications. My flagship project, NovaShield, investigates explainable intrusion detection and validates the network measurements that AI models depend on. I bring three master’s degrees and practical Python, React and backend engineering experience.',
  // Not used for Maria (empty hides the "Past engagements" row).
  pastClients: [] as string[],
  stats: [
    { value: 468, suffix: '/468', label: 'Feature comparisons matched' },
    { value: 5, suffix: '', label: 'Synthetic research fixtures' },
    { value: 29, suffix: '+', label: 'Full-stack routes built' },
    { value: 3, suffix: '', label: 'Master’s degrees' },
  ],
}

/** No awards: the strip shows her three degrees (no institution names). */
export const awards = [
  { kind: 'education' as const, image: '', glow: 'blue' as const, title: 'MSc Cyber Security', body: 'NCSC-Certified · 2023' },
  { kind: 'education' as const, image: '', glow: 'blue' as const, title: 'MS Computer Science', body: '2017 · NCBA&E' },
  { kind: 'education' as const, image: '', glow: 'blue' as const, title: 'Master in Technology', body: '2009 · University of Gujrat' },
]

export type Project = {
  id: string
  title: string
  client: string
  /** Path without extension: <path>.webp served, <path>.jpg fallback. */
  image: string
  video?: { webm: string; mp4: string }
  metrics: { value: number | null; prefix?: string; suffix?: string; text?: string; label: string }[]
  /** Full description paragraph (shown on the flagship card). */
  summary?: string
  how: string[]
  stack: string[]
  liveUrl: string
  caseStudyUrl: string
}

// SWAP: flagship images from the Gemini Imagen prompts → /public/images/projects/<id>.webp + .jpg (1600×900)
export const projects: Project[] = [
  {
    id: 'novashield',
    title: 'NovaShield — Explainable AI Intrusion Detection Research',
    client: 'Independent research · Open-source software · 2026',
    image: '/images/projects/novashield',
    metrics: [
      { value: 468, suffix: '/468', label: 'Feature comparisons matched' },
      { value: 5, label: 'Controlled synthetic fixtures' },
      { value: null, text: 'DOI', label: 'Citable Zenodo software release' },
    ],
    summary: 'Designed and developed NovaShield, a modular cybersecurity research prototype investigating whether AI-driven intrusion detection can be more explainable and trustworthy. Built a network-flow feature-processing workflow, experimental Random Forest and LightGBM inference with SHAP-based explanations, bounded packet-observation utilities, and an authenticated Flask SOC Console. Revalidated 468/468 numerical feature comparisons against preserved CICFlowMeter references across five controlled synthetic fixtures. The components are research-stage; continuous live AI-to-firewall enforcement is not implemented.',
    how: [
      '468/468 numerical feature comparisons matched across five controlled synthetic fixtures',
      'All 10 supporting PCAP/CSV evidence hashes verified (SHA-256)',
      'Offline ML experiments with Random Forest, LightGBM and SHAP explanations',
      'Authenticated analyst console with separately collected real-network telemetry',
      'Published technical manuscript, open-source code and citable Zenodo release',
    ],
    stack: ['Python', 'Flask', 'Scapy', 'Scikit-learn', 'LightGBM', 'SHAP', 'Network Flow Analysis'],
    liveUrl: 'https://github.com/mariabatool869-star/nova_shield',
    caseStudyUrl: 'https://github.com/mariabatool869-star/nova_shield/blob/main/research/reports/NovaShield_Flow_Validation_Research_Report.pdf',
  },
  {
    id: 'a2m-tax-count',
    title: 'A²M Tax Count — AI Tax Assistant with Citation-Backed RAG',
    client: 'Personal project · Sole developer',
    image: '/images/projects/a2m-tax-count',
    metrics: [
      { value: 300, suffix: '+', label: 'HMRC sections indexed, every answer cited' },
      { value: null, text: 'Live', label: 'In production with auth, billing and credits' },
      { value: null, text: 'VAT', label: 'Real-time financial and VAT dashboard' },
    ],
    summary: 'Built an AI tax assistant from scratch that answers real UK tax questions with HMRC-aligned, citation-backed responses rather than generic advice. Built a real-time financial control panel to track income, expenses, profit, and estimated tax, plus a receipt-upload expense tracker with automatic categorisation and VAT tracking. Engineered a production RAG pipeline over 300+ HMRC sections using Cohere embeddings and Pinecone semantic search, with Groq powering ultra-fast LLM responses and LangGraph orchestrating multi-step agentic reasoning. Solved the harder problem of trustworthy RAG — ensuring every AI answer cites its source. Deployed a hybrid architecture: Next.js frontend on Vercel alongside Python microservices on Railway, with authentication, billing, and credits handled end-to-end.',
    how: [
      '300+ HMRC sections indexed with citation verification',
      'Real-time financial dashboard with VAT tracking',
      'LangGraph multi-step agentic reasoning',
      'Production deployment with auth + billing + credits',
    ],
    stack: ['Next.js 14', 'TypeScript', 'Python FastAPI', 'Cohere', 'Pinecone', 'Groq', 'LangGraph', 'Neon PostgreSQL', 'Prisma', 'Vercel', 'Railway'],
    liveUrl: 'https://a3-m-lab.vercel.app',
    caseStudyUrl: '',
  },
  {
    id: 'job-finder-agent',
    title: 'Job Finder AI Agent — End-to-End Automation Pipeline',
    client: 'Personal project · Sole developer',
    image: '/images/projects/job-finder-agent',
    metrics: [
      { value: null, text: 'Gmail', label: 'Job alerts ingested via the Gmail API' },
      { value: null, text: 'Gemini', label: 'Scoring and tailored draft proposals' },
      { value: null, text: 'Live', label: 'Streamlit dashboard on Render' },
    ],
    summary: 'Engineered an automated pipeline that reads job-alert emails via the Gmail API, scores each opportunity against a defined skills profile, and generates tailored proposals using the Google Gemini API. Integrated Google Sheets and Slack APIs to auto-log scored jobs and trigger real-time alerts for qualifying matches. Built and deployed a live Streamlit analytics dashboard on Render for reviewing scored jobs and generated proposals. End-to-end automation eliminates manual job tracking and proposal drafting, allowing high-volume, high-quality applications with minimal effort.',
    how: [
      'Gmail API integration for job-alert ingestion',
      'Gemini AI for proposal generation',
      'Google Sheets + Slack auto-logging',
      'Live Streamlit dashboard on Render',
    ],
    stack: ['Python', 'Gmail API', 'Gemini API', 'Sheets API', 'Slack API', 'Streamlit', 'Render'],
    liveUrl: 'https://github.com/mariabatool869-star/upwork-proposal-agent',
    caseStudyUrl: '',
  },
  {
    id: 'multi-portal-platform',
    title: 'Multi-Portal Domain Management Platform',
    client: 'RNDTEK UK · Contract · Full-Stack Developer & Security Analyst',
    image: '/images/projects/multi-portal-platform',
    metrics: [
      { value: 29, suffix: '+', label: 'Routes across customer, broker and admin portals' },
      { value: 5, label: 'Role-based portal types (RBAC)' },
      { value: 40, suffix: '+', label: 'Database models designed' },
    ],
    summary: 'Led full-stack development of a multi-portal domain registration and management platform (customer, broker, and admin portals) from concept to MVP. Built 29+ routes covering the public site, customer dashboard, and admin dashboard using Next.js 16, React 19, and TypeScript. Implemented authentication and role-based access control (RBAC) across five distinct portal types using Auth.js (NextAuth v5). Designed the database architecture in PostgreSQL (Neon) with Prisma ORM, including schema modelling and migrations for a 40+ model system. Built production-ready integrations for Stripe payments and the OpenSRS domain registration API, including webhook-driven order fulfilment.',
    how: [
      '29+ routes across 3 portals',
      '5 distinct RBAC portal types',
      '40+ database models designed',
      'Stripe + OpenSRS production integrations',
    ],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'PostgreSQL (Neon)', 'Prisma', 'Auth.js', 'Stripe', 'OpenSRS', 'Splunk'],
    liveUrl: '', // private (NDA): details only, no screenshots
    caseStudyUrl: '',
  },
  {
    id: 'resume-screener',
    title: 'Automated Resume Screener',
    client: 'Personal project · Sole developer',
    image: '/images/projects/resume-screener',
    metrics: [
      { value: null, text: 'PDF', label: 'and DOCX resume parsing' },
      { value: null, text: 'Gemini', label: 'Candidate-to-job match scoring' },
      { value: null, text: 'Fast', label: 'Recruiter-friendly triage interface' },
    ],
    summary: 'Built an AI screening tool that parses resumes (PyPDF2, docx2txt) in both PDF and DOCX formats and uses the Google Gemini API to compare candidates against a job description, producing an automated match score. Delivered results through a clean, recruiter-friendly Streamlit interface for fast candidate triage.',
    how: [
      'PDF + DOCX parsing',
      'Gemini-powered candidate scoring',
      'Streamlit recruiter dashboard',
    ],
    stack: ['Python', 'Gemini API', 'PyPDF2', 'docx2txt', 'Streamlit'],
    liveUrl: 'https://github.com/mariabatool869-star',
    caseStudyUrl: '',
  },
]

/** No patents for Maria: the Patents section is not rendered. */
export const patents = {
  intro: '',
  process: [] as { step: string; icon: string; body: string }[],
  filings: [] as { title: string; programme: string; status: string }[],
}

export const capabilities = [
  { icon: 'brain', image: '', title: 'AI & explainable ML', body: 'Machine learning, SHAP, LLM agents, RAG, LangGraph workflows' },
  { icon: 'cube', image: '', title: 'Full-stack development', body: 'Next.js, React, TypeScript, Tailwind, end-to-end platform delivery' },
  { icon: 'chip', image: '', title: 'Backend & APIs', body: 'Python, FastAPI, REST API design, Auth.js & RBAC, webhook integrations' },
  { icon: 'database', image: '', title: 'Databases & data modelling', body: 'PostgreSQL (Neon), Prisma ORM, SQLite, MySQL, Pinecone vector DB' },
  { icon: 'shield', image: '', title: 'Cybersecurity & detection research', body: 'Network flows, explainable intrusion detection, threat intelligence, secure API design' },
  { icon: 'rocket', image: '', title: 'Deployment & automation', body: 'Vercel, Render, Railway, CI/CD, n8n, Stripe, OpenSRS integrations' },
] as const

export const techStack: { group: string; items: string[] }[] = [
  { group: 'AI & LLM', items: ['Google Gemini API', 'OpenAI API', 'Cohere', 'Groq', 'LangGraph', 'Pinecone', 'RAG', 'n8n', 'Cursor AI', 'Claude'] },
  { group: 'Frontend', items: ['Next.js 16 / 14', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'JavaScript', 'HTML', 'CSS', 'Streamlit', 'Tkinter'] },
  { group: 'Backend', items: ['Python', 'FastAPI', 'Flask', 'REST API design', 'Auth.js (NextAuth v5)', 'RBAC', 'Webhooks'] },
  { group: 'Databases', items: ['PostgreSQL (Neon)', 'Prisma ORM', 'SQLite', 'MySQL', 'Pinecone (vector DB)'] },
  { group: 'Integrations', items: ['Stripe', 'OpenSRS', 'Gmail API', 'Slack API', 'Google Sheets API', 'VirusTotal', 'AbuseIPDB', 'CoinGecko'] },
  { group: 'ML & Data', items: ['Scikit-learn', 'LightGBM', 'SHAP', 'Pandas', 'Network flow features', 'Random Forest'] },
  { group: 'Deployment', items: ['Vercel', 'Render', 'Railway', 'Git', 'GitHub', 'CI/CD', 'Figma', 'Google AI Studio'] },
  { group: 'Security', items: ['Intrusion detection research', 'CICFlowMeter feature validation', 'Network traffic analysis', 'Threat intelligence', 'Secure API design', 'Splunk SIEM'] },
]

/** Degrees are not certifications, so the "Certified" row stays hidden. */
export const certifications: string[] = []

/**
 * Atmospheric section backgrounds. `opacity` is the desktop value; phones get
 * 70% of it (the --bg-k variable in index.css). The global layer is set in
 * index.css (body::before) at 8%.
 */
export const backgrounds = {
  awards: { src: '/images/backgrounds/bg-awards.webp', opacity: 0.08, position: 'center' },
  projects: { src: '/images/backgrounds/bg-projects.webp', opacity: 0.06, position: 'top center' },
  capabilities: { src: '/images/backgrounds/bg-capabilities.webp', opacity: 0.08, position: 'center' },
  skills: { src: '/images/backgrounds/bg-skills.webp', opacity: 0.08, position: 'center' },
  experience: { src: '/images/backgrounds/bg-experience.webp', opacity: 0.08, position: 'center' },
  patents: { src: '/images/backgrounds/bg-patents.webp', opacity: 0.08, position: 'center' },
  contact: { src: '/images/backgrounds/bg-contact.webp', opacity: 0.08, position: 'center' },
  footer: { src: '/images/backgrounds/bg-footer.webp', opacity: 0.08, position: 'center top' },
  allProjects: { src: '/images/backgrounds/bg-all-projects.webp', opacity: 0.08, position: 'center' },
} as const
export type Background = (typeof backgrounds)[keyof typeof backgrounds]

/** Icon beside each employer: corporate = building, startup = rocket, government = landmark. */
export const experience = [
  { years: 'Current', company: 'RNDTEK UK', kind: 'startup' as const, role: 'Full-Stack Developer & Security Analyst · Remote', summary: 'Led full-stack development of multi-portal domain management platform (29+ routes, 40+ models). Security-first practices: input validation, SQL/XSS prevention, GDPR compliance, Splunk SIEM.', metric: '29+', metricLabel: 'routes shipped' },
  { years: 'Oct 2014 – Sep 2022', company: 'University of Gujrat', kind: 'corporate' as const, role: 'IT Support Analyst · Pakistan', summary: 'Supported 500+ users, 200+ IT assets, Active Directory, Windows, Linux. Improved issue-resolution time by 40%.', metric: '500+', metricLabel: 'users supported' },
  { years: 'Nov 2009 – Oct 2014', company: 'Punjab College', kind: 'corporate' as const, role: 'Office Administrator · Pakistan', summary: 'Managed admin operations with 99% accuracy. Implemented software-based process improvements.', metric: '99%', metricLabel: 'accuracy' },
]

/** Real, permission-cleared quotes only (DMCC Act 2024). Hidden while empty. */
export const testimonials: { quote: string; name: string; role: string }[] = []

export const businessValue = {
  services: [
    { icon: 'brain', title: 'AI Agents & Automation', body: 'Production LLM agents with LangGraph, n8n and custom pipelines.' },
    { icon: 'rocket', title: 'Full-Stack Delivery', body: 'Concept-to-MVP shipping across multi-portal platforms.' },
    { icon: 'shield', title: 'Security-First Engineering', body: 'RBAC, input validation, SQL/XSS prevention and GDPR-aware design.' },
    { icon: 'fileBadge', title: 'Citation-Backed RAG', body: 'Trustworthy AI answers with verified sources, not hallucinations.' },
    { icon: 'coins', title: 'Payment & API Integrations', body: 'Stripe, OpenSRS, Gmail, Slack, Google Sheets and webhook-driven flows.' },
    { icon: 'radar', title: 'Threat Intelligence & SOC Tooling', body: 'AbuseIPDB, VirusTotal, Splunk SIEM and MITRE ATT&CK.' },
    { icon: 'database', title: 'Data Architecture', body: 'PostgreSQL schema modelling, Prisma ORM and vector database design.' },
  ],
  pillars: [
    { title: 'What I bring to the product', body: 'End-to-end engineering — from database schema and API design to front-end polish and production deployment. I ship products that work, scale, and stay secure.' },
    { title: 'What I bring to the idea', body: 'AI-first thinking. I combine LLM agents, RAG pipelines, and automation to turn manual workflows into autonomous systems — and I prove every AI answer with citations.' },
    { title: 'What I bring to the organisation', body: 'An MSc in Cyber Security plus hands-on full-stack delivery. I close the gap between AI innovation and enterprise security — building production systems that pass real-world audits.' },
  ],
}

export type ProjectCategory = 'ai' | 'enterprise' | 'security' | 'ecommerce' | 'healthcare' | 'mobile' | 'games' | 'web'

/** Filter buttons, in display order. Categories with no projects are hidden. */
export const projectCategories: { id: ProjectCategory; label: string }[] = [
  { id: 'ai', label: 'AI & Innovation' },
  { id: 'enterprise', label: 'Enterprise' },
  { id: 'security', label: 'Cyber Security' },
  { id: 'ecommerce', label: 'E-commerce' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'mobile', label: 'Mobile Apps' },
  { id: 'games', label: 'Games' },
  { id: 'web', label: 'Web & Other' },
]

export type WorkItem = {
  title: string; category: ProjectCategory; description: string; tech: string[]
  /** Path without extension: <path>.webp (card), <path>.jpg (fallback), <path>-lg.webp (lightbox). */
  image?: string
  video?: { webm: string; mp4: string }
  url?: string
  pending?: boolean; featured?: boolean
}

// SWAP: card images from the Gemini Imagen prompts → /public/images/work/<slug>.webp, .jpg and -lg.webp
export const allProjects: WorkItem[] = [
  { title: 'NovaShield — Explainable AI Intrusion Detection', image: '/images/work/novashield', url: 'https://github.com/mariabatool869-star/nova_shield', featured: true, category: 'security', description: 'Open-source research: 468/468 flow-feature comparisons matched; SHAP + analyst SOC Console', tech: ['Python', 'Flask', 'LightGBM', 'SHAP', 'Network Security'] },
  { title: 'A²M Tax Count', image: '/images/work/a2m-tax-count', url: 'https://a3-m-lab.vercel.app', featured: true, category: 'ai', description: 'Citation-backed AI tax assistant with RAG', tech: ['Next.js', 'FastAPI', 'Cohere', 'Pinecone', 'Groq', 'LangGraph'] },
  { title: 'Job Finder AI Agent', image: '/images/work/job-finder-agent', url: 'https://github.com/mariabatool869-star/upwork-proposal-agent', featured: true, category: 'ai', description: 'Job-alert automation with Gemini', tech: ['Python', 'Gmail API', 'Gemini', 'Sheets', 'Slack'] },
  { title: 'Multi-Portal Domain Platform', image: '/images/work/multi-portal-platform', featured: true, category: 'enterprise', description: '29+ route multi-portal with Stripe + OpenSRS', tech: ['Next.js 16', 'React 19', 'PostgreSQL', 'Prisma'] },
  { title: 'Automated Resume Screener', image: '/images/work/resume-screener', url: 'https://github.com/mariabatool869-star', featured: true, category: 'ai', description: 'AI candidate screening', tech: ['Python', 'Gemini', 'PyPDF2', 'docx2txt'] },
  { title: 'Smart Contract Vulnerability Detector', image: '/images/work/smart-contract-detector', featured: true, category: 'ai', description: 'AI-assisted Solidity security analysis', tech: ['Python', 'OpenAI API', 'Web3.py', 'Solidity'] },
  { title: 'SOC IOC Hunter', image: '/images/work/soc-ioc-hunter', featured: true, category: 'security', description: 'IP reputation checks', tech: ['Python', 'AbuseIPDB API'] },
  { title: 'DNS Threat Hunter', image: '/images/work/dns-threat-hunter', featured: true, category: 'security', description: 'Malicious domain detection across 70+ AV engines', tech: ['Python', 'VirusTotal API'] },
  { title: 'Gmail Cleaner Pro', image: '/images/work/gmail-cleaner', featured: true, category: 'security', description: 'Bulk email cleanup with OAuth2', tech: ['Python', 'Gmail API', 'Tkinter', 'OAuth2'] },
]

/** "Ask about Maria" widget: five pre-written answers, used exactly as supplied. */
export const askQA: { q: string; a: string }[] = [
  { q: "What's Maria's strongest skill?", a: 'Combining cybersecurity research, Python automation and full-stack AI engineering, with a focus on explainability, validation and secure design.' },
  { q: 'What AI projects has she built?', a: 'NovaShield (explainable intrusion detection research), A²M Tax Count (citation-backed AI tax assistant), Job Finder AI Agent, Automated Resume Screener and other Python automation tools.' },
  { q: 'Is she available for work?', a: 'Maria is exploring cybersecurity, security automation, Python, AI engineering and full-stack opportunities. Reach her directly through the contact section.' },
  { q: 'What degrees does she hold?', a: 'MSc Cyber Security (Robert Gordon University), MS Computer Science (NCBA&E) and Master in Technology (University of Gujrat).' },
  { q: 'How can I contact her?', a: 'Email: mariabatool869@gmail.com or LinkedIn: linkedin.com/in/mariabatool7' },
]

/** Section headings and short copy (kept here so each client is a content swap). */
export const copy = {
  navStatus: 'Available now',
  pastClientsLabel: 'Past engagements',
  educationHeading: 'Education',
  projects: { title: 'Selected engineering & research work', subtitle: 'Evidence-led cybersecurity research, AI automation and secure full-stack delivery.' },
  flagshipListLabel: 'Key achievements',
  allProjects: { title: 'More projects', subtitle: 'Browse security automation, AI applications and enterprise engineering.' },
  capabilities: { title: 'What I bring to your team', subtitle: 'Research-minded validation, Python and AI engineering, and secure full-stack product delivery.' },
  business: { title: 'What I bring to the business', subtitle: 'The engineering, security and integration work that turns an AI idea into a dependable product.' },
  techStack: { title: 'Technical arsenal', subtitle: 'The tools I reach for, grouped by where they sit in a system.' },
  experience: { title: 'Experience', subtitle: 'From IT operations to full-stack AI and security engineering.' },
  testimonials: { title: 'What clients say' },
  contact: { heading: 'Let’s discuss a role or collaboration', subhead: 'Open to cybersecurity, security automation, AI engineering and Python development opportunities. I’d welcome a conversation about how I can contribute.' },
  footerTagline: 'Built with precision. Designed for impact.',
}
