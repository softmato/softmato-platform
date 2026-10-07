/**
 * Products we are building that are not out yet, shown after the published
 * ones on `/products`, in the home page's "Products we build and run" row, and
 * on their own `/products/<slug>` page.
 *
 * These live in code rather than the CMS because a `product_pages` row needs a
 * ledger product behind it, and nothing is sold yet. When one launches, give
 * it a ledger product and a product page in the admin and delete it from here.
 */
export interface UpcomingProduct {
  slug: string;
  title: string;
  status: string;
  tagline: string;
  logoUrl: string;
  /** Markdown, cut into cards at each `##` like a CMS product body. */
  body: string;
  /** Screenshots of the app, shown under the body and opened full screen on click. */
  screens: { src: string; alt: string }[];
}

export const UPCOMING_PRODUCTS: UpcomingProduct[] = [
  {
    slug: 'spark',
    title: 'Spark',
    status: 'In development',
    tagline:
      'An AI personal assistant for individuals. It helps you manage tasks, reminders, and scheduling, draft emails and messages, answer questions and do research, and remember important notes over time.',
    logoUrl: '/products/spark/mark.svg',
    body: `## What it helps with

- **Tasks, reminders and scheduling**
- **Drafting emails and messages**
- **Answering questions and doing research**
- **Remembering important notes over time**

## Getting it

Spark is in development. [Join the waitlist](/contact) to hear when it is
ready.`,
    // The founder's screenshots of the desktop app, 2026-10-07.
    screens: [
      { src: '/products/spark/capabilities.webp', alt: 'Capabilities' },
      {
        src: '/products/spark/chat-controls.webp',
        alt: 'Chat, with quick controls',
      },
      {
        src: '/products/spark/chat-music.webp',
        alt: 'Chat, with the music player',
      },
      { src: '/products/spark/activity.webp', alt: 'Activity' },
      { src: '/products/spark/place-search.webp', alt: 'Place search' },
      { src: '/products/spark/chat.webp', alt: 'Chat' },
    ],
  },
];

export const upcomingProduct = (slug: string) =>
  UPCOMING_PRODUCTS.find((product) => product.slug === slug);

/** Where "Join the waitlist" goes. No waitlist backend; the contact form takes it. */
export const WAITLIST_HREF = '/contact';
