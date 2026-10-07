import { Drift } from '@/components/motion/drift';

import { ProductIcon } from './product-icon';

/**
 * A product list item's floating app icon, with the glow that comes up on
 * hover. Needs a `group` ancestor.
 */
export function ProductFloatIcon({
  src,
  name,
  delay,
}: {
  src: string | null;
  name: string;
  delay: number;
}) {
  return (
    <Drift distance={6} duration={3.5} delay={delay} className="w-fit">
      <span className="relative block">
        <span
          aria-hidden="true"
          className="absolute -inset-5 -z-10 rounded-full bg-primary/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        />
        <ProductIcon
          src={src}
          name={name}
          className="size-24 transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:-rotate-3 group-hover:scale-105 sm:size-28"
        />
      </span>
    </Drift>
  );
}
