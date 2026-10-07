import { BlurIn } from '@/components/motion/blur-in';
import { Drift } from '@/components/motion/drift';
import { MediaFrame } from '@/components/public/media/media-frame';
import { ServiceSections } from '@/components/public/services/service-sections';
import { breadcrumbList } from '@/lib/seo/breadcrumbs';
import { JsonLd } from '@/lib/seo/json-ld';
import type { UpcomingProduct } from '@/lib/products/upcoming';

import { ProductIcon } from './product-icon';
import { StatusPill } from './status-pill';
import { WaitlistButton } from './waitlist-button';

/**
 * `/products/<slug>` for a product still in development: the launched
 * product page's header with its stage and the waitlist in place of "Visit",
 * the body as cards, then screenshots that open full screen.
 */
export function UpcomingProductPage({ product }: { product: UpcomingProduct }) {
  return (
    <article>
      <JsonLd
        id="breadcrumbs"
        data={breadcrumbList([
          { name: 'Products', path: '/products' },
          { name: product.title },
        ])}
      />

      <header className="flex flex-col items-center text-center">
        <Drift distance={6} duration={3.5}>
          <ProductIcon
            src={product.logoUrl}
            name={product.title}
            className="size-24 sm:size-28"
          />
        </Drift>

        <BlurIn
          as="h1"
          className="headline mt-8 text-[clamp(2.4rem,6vw,3.75rem)] leading-[1.05]"
        >
          {product.title}
        </BlurIn>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <StatusPill>{product.status}</StatusPill>
          <WaitlistButton />
        </div>

        <p className="mt-6 max-w-[56ch] text-[16.5px] leading-relaxed text-muted-foreground">
          {product.tagline}
        </p>
      </header>

      <ServiceSections body={product.body} />

      {product.screens.length ? (
        <section
          aria-label={`${product.title} screens`}
          className="mt-4 grid gap-4 md:grid-cols-2"
        >
          {product.screens.map((screen) => (
            <div key={screen.src}>
              <MediaFrame src={screen.src} alt={screen.alt} />
            </div>
          ))}
        </section>
      ) : null}
    </article>
  );
}
