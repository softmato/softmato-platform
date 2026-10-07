import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import type { UpcomingProduct } from '@/lib/products/upcoming';

import { ProductFloatIcon } from './product-float-icon';
import { StatusPill } from './status-pill';
import { WaitlistButton } from './waitlist-button';

/**
 * A product that is not out yet, laid out like the published ones in
 * `ProductList`: the whole item links to its page, with its stage beside the
 * name and the waitlist button above that overlay.
 */
export function UpcomingProductItem({
  product,
  delay,
}: {
  product: UpcomingProduct;
  delay: number;
}) {
  return (
    <li className="group relative">
      <ProductFloatIcon
        src={product.logoUrl}
        name={product.title}
        delay={delay}
      />

      <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2">
        <h3 className="headline text-[clamp(1.6rem,3vw,2.1rem)]">
          <Link
            href={`/products/${product.slug}`}
            className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:ring-[3px] focus-visible:after:ring-ring/50"
          >
            {product.title}
          </Link>
        </h3>
        <StatusPill>{product.status}</StatusPill>
      </div>

      <p className="mt-3 max-w-[46ch] text-[15.5px] leading-relaxed text-muted-foreground">
        {product.tagline}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-[14px] font-medium">
        <span className="inline-flex items-center gap-1.5">
          Read more
          <ArrowRight
            className="size-4 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
        <WaitlistButton className="relative z-10" />
      </div>

      <span aria-hidden="true" className="mt-8 block h-px bg-border">
        <span className="block h-px w-0 bg-primary transition-[width] duration-500 ease-out group-hover:w-full" />
      </span>
    </li>
  );
}
