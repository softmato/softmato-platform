'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

import { VideoPlayer } from './video-player';

/**
 * The full-screen viewer: one image or video on a near-black ground.
 *
 * A native modal `<dialog>`, like `ConfirmDialog`, for the focus trap, the
 * inert page and Escape. Closing it (Escape, the button, a click on the
 * ground) fires `close`, and the owner unmounts it.
 */
export function MediaViewer({
  src,
  alt,
  video,
  onClose,
}: {
  src: string;
  alt: string;
  video: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const close = () => ref.current?.close();

  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();

    // A modal still lets the wheel scroll the page under it; hold it still.
    const root = document.documentElement;
    const overflow = root.style.overflow;
    root.style.overflow = 'hidden';
    return () => {
      root.style.overflow = overflow;
    };
  }, []);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      aria-label={alt || (video ? 'Video' : 'Image')}
      data-lenis-prevent="true"
      className="m-0 size-full max-h-none max-w-none bg-transparent p-0 text-white backdrop:bg-neutral-950/90 backdrop:backdrop-blur-sm"
    >
      <div
        className="flex size-full items-center justify-center p-4 sm:p-12"
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        {video ? (
          <VideoPlayer src={src} label={alt || 'Video'} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className="max-h-full max-w-full animate-rise rounded-2xl object-contain"
          />
        )}
      </div>

      <button
        type="button"
        autoFocus
        onClick={close}
        aria-label="Close"
        className="fixed right-4 top-4 grid size-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <X className="size-5" aria-hidden="true" />
      </button>
    </dialog>
  );
}
