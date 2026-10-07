/** A product's stage, in the emerald pill the home page's "After launch" card wears. */
export function StatusPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[11.5px] font-medium text-primary">
      <span className="size-1.5 rounded-full bg-primary" />
      {children}
    </span>
  );
}
