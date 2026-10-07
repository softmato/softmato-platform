'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Play } from 'lucide-react';

import { isVideoSrc } from './is-video';
import { MediaViewer } from './media-viewer';

/** Medium, the way a post sits in Instagram on the web: never wider than the column, never taller than most of the screen. */
const MEDIA = 'block h-auto max-h-[min(70vh,36rem)] w-auto max-w-full';

/**
 * An image or video in a blog body, in a medium frame. Clicking opens it in
 * the full-screen viewer, where a video plays.
 *
 * Everything rendered in place is phrasing content, because Markdown puts an
 * image inside a `<p>`; the viewer is portalled to `<body>` and only exists
 * while it is open.
 */
export function MediaFrame({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false);
  const video = isVideoSrc(src);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label={`${video ? 'Play video' : 'View image'}${alt ? `: ${alt}` : ''}`}
        className={`group relative mx-auto mt-2 block w-fit max-w-full overflow-hidden rounded-2xl border border-border bg-muted focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 ${video ? 'cursor-pointer' : 'cursor-zoom-in'}`}
      >
        {video ? (
          <>
            {/* `#t=0.1` makes Safari paint the first frame as a poster. */}
            <video
              src={`${src}#t=0.1`}
              muted
              playsInline
              preload="metadata"
              tabIndex={-1}
              className={MEDIA}
            />
            <span className="absolute inset-0 grid place-items-center bg-black/10 transition-colors duration-300 group-hover:bg-black/25">
              <span className="grid size-14 place-items-center rounded-full bg-white text-neutral-950 shadow-float transition-transform duration-300 group-hover:scale-105">
                <Play className="size-5 translate-x-px fill-current" />
              </span>
            </span>
          </>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt=""
            loading="lazy"
            decoding="async"
            className={`${MEDIA} transition-transform duration-500 ease-out group-hover:scale-[1.015]`}
          />
        )}
      </button>

      {alt ? (
        <span className="mt-2.5 block text-center text-[13px] text-muted-foreground">
          {alt}
        </span>
      ) : null}

      {open
        ? createPortal(
            <MediaViewer
              src={src}
              alt={alt}
              video={video}
              onClose={() => setOpen(false)}
            />,
            document.body,
          )
        : null}
    </>
  );
}
