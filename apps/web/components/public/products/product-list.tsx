import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

import { StaggerIn } from '@/components/motion/stagger-in';
import { EmptyState } from '@/components/ui/empty-state';
import { UPCOMING_PRODUCTS } from '@/lib/products/upcoming';

import { ProductFloatIcon } from './product-float-icon';
import { siteHost } from './product-icon';
import { UpcomingProductItem } from './upcoming-product-item';

interface ProductItem {
  id: number;
  slug: string;
  title: string;
  tagline: string | null;
  logoUrl: string | null;
  siteUrl: string | null;
}

/**
 * Products without boxes: a floating app icon, the name, the product's own
 * one-liner, and a rule that draws itself in on hover. The whole item links to
 * the product page; the site link sits above that overlay. Products still in
 * development follow the published ones.
 */
export function ProductList({ products }: { products: ProductItem[] }) {
  if (products.length + UPCOMING_PRODUCTS.length === 0) {
    return (
      <EmptyState
        className="mt-12"
        title="Nothing here yet"
        description="Products appear here once their pages are published."
      />
    );
  }

  return (
    <StaggerIn
      as="ul"
      onScroll
      className="grid gap-x-12 gap-y-16 md:grid-cols-2"
    >
      {products.map((product, i) => (
        <li key={product.id} className="group relative">
          <ProductFloatIcon
            src={product.logoUrl}
            name={product.title}
            delay={i * 0.9}
          />

          <h3 className="headline mt-8 text-[clamp(1.6rem,3vw,2.1rem)]">
            <Link
              href={`/products/${product.slug}`}
              className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:ring-[3px] focus-visible:after:ring-ring/50"
            >
              {product.title}
            </Link>
          </h3>

          {product.tagline ? (
            <p className="mt-3 max-w-[46ch] text-[15.5px] leading-relaxed text-muted-foreground">
              {product.tagline}
            </p>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[14px] font-medium">
            <span className="inline-flex items-center gap-1.5">
              Read more
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </span>
            {product.siteUrl ? (
              <a
                href={product.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 inline-flex items-center gap-1 text-primary underline-offset-4 hover:underline"
              >
                {siteHost(product.siteUrl)}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            ) : null}
          </div>

          <span aria-hidden="true" className="mt-8 block h-px bg-border">
            <span className="block h-px w-0 bg-primary transition-[width] duration-500 ease-out group-hover:w-full" />
          </span>
        </li>
      ))}
      {UPCOMING_PRODUCTS.map((product, i) => (
        <UpcomingProductItem
          key={product.slug}
          product={product}
          delay={(products.length + i) * 0.9}
        />
      ))}
    </StaggerIn>
  );
}
