/**
 * ─────────────────────────────────────────────────────────────
 *  PORTFOLIO SETTINGS — edit this file to personalise the site.
 *  All visible text lives in src/i18n/translations.ts (EN/IT/NL/FR).
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: 'Attiq',
  /** Short brand shown next to the logo mark */
  brand: 'Attiq.dev',
  /** Public URL once deployed (used for SEO / social previews) */
  url: 'https://portfolio-sael.vercel.app',
  /** Full name and job title, used in Google's structured data */
  fullName: 'Muhammad Attiq',
  jobTitle: 'Freelance Full-Stack & AI Chatbot Developer',

  /** Where you are based (used for local SEO: "web developer Firenze") */
  city: 'Florence',
  region: 'Tuscany',
  country: 'IT',
  /** Approximate city-centre coordinates — not your home address */
  geo: { lat: 43.7696, lng: 11.2558 },

  // TODO: replace with your real contact details
  email: 'hello@example.com',
  /** International format, digits only — used for the WhatsApp link */
  whatsapp: '390000000000',
  linkedin: 'https://www.linkedin.com/in/attique-dev/',
  github: 'https://github.com/attiq78',
  /** e.g. a Calendly / Cal.com link. Leave '' to hide the "Book a call" link. */
  booking: '',

  /** Currency for the pricing section */
  currency: 'EUR',
};

/** "Starting from" prices shown in the pricing section (same order as plans in translations). */
export const planPrices: (number | null)[] = [
  990, // Website / landing page
  1490, // AI chatbot
  null, // Custom web or mobile app → "Custom quote"
];

export type ProjectStatus = 'live' | 'concept';

export interface Project {
  /** Key used to find the texts in translations.work.projects */
  id: 'flock' | 'assistant' | 'booking' | 'brand';
  status: ProjectStatus;
  tags: string[];
  /** Internal path or external URL. '' = no link */
  href: string;
  /** Visual theme for the generated preview */
  accent: 'violet' | 'cyan' | 'amber' | 'rose';
}

/**
 * Showcase projects. "flock" is the full-stack shop, kept in its own repo (Flock-by-Attiq).
 * The others are marked as concepts — replace them with real client work as you get it.
 */
export const projects: Project[] = [
  {
    id: 'flock',
    status: 'live',
    tags: ['Next.js', 'MongoDB', 'Stripe', 'AI assistant'],
    href: 'https://github.com/attiq78/Flock-by-Attiq',
    accent: 'violet',
  },
  {
    id: 'assistant',
    status: 'concept',
    tags: ['OpenAI / Claude', 'RAG', 'WhatsApp', 'Node.js'],
    href: '',
    accent: 'cyan',
  },
  {
    id: 'booking',
    status: 'concept',
    tags: ['React Native', 'Expo', 'Supabase'],
    href: '',
    accent: 'amber',
  },
  {
    id: 'brand',
    status: 'concept',
    tags: ['Figma', 'Design system', 'Branding'],
    href: '',
    accent: 'rose',
  },
];

export const techStack = [
  'Next.js',
  'React',
  'TypeScript',
  'Node.js',
  'React Native',
  'Flutter',
  'OpenAI',
  'Claude',
  'LangChain',
  'Python',
  'Tailwind CSS',
  'MongoDB',
  'PostgreSQL',
  'Supabase',
  'Stripe',
  'Figma',
  'Vercel',
  'AWS',
];
