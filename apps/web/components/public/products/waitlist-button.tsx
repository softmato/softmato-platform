import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { cn } from '@/lib/cn';
import { WAITLIST_HREF } from '@/lib/products/upcoming';

/** "Join the waitlist", in the pill a launched product's "Visit" button wears. */
export function WaitlistButton({ className }: { className?: string }) {
  return (
    <Link
      href={WAITLIST_HREF}
      className={cn(
        'inline-flex h-10 items-center gap-1.5 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
        className,
      )}
    >
      Join the waitlist
      <ArrowRight className="size-4" aria-hidden="true" />
    </Link>
  );
}
