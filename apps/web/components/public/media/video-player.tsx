'use client';

import { useRef, useState, type CSSProperties } from 'react';
import { Maximize, Pause, Play, Volume2, VolumeX } from 'lucide-react';

/** 75 → "1:15". */
const clock = (seconds: number) => {
  const s = Number.isFinite(seconds) ? Math.floor(seconds) : 0;
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};

const ROUND = 'grid size-9 place-items-center rounded-full transition-colors';

/**
 * The site's video player: black ground, white controls, one emerald line for
 * progress. The controls fade while it plays and come back on hover or focus;
 * on a touch screen a tap on the video pauses it and brings them back.
 * Styles for the seek bar and the fade are in `app/video-player.css`.
 */
export function VideoPlayer({ src, label }: { src: string; label: string }) {
  const frame = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) void v.play();
    else v.pause();
  };

  const fullscreen = () => {
    if (document.fullscreenElement) return void document.exitFullscreen();
    if (frame.current?.requestFullscreen) {
      return void frame.current.requestFullscreen();
    }
    // iPhone Safari only takes a video element full screen.
    (
      video.current as { webkitEnterFullscreen?: () => void } | null
    )?.webkitEnterFullscreen?.();
  };

  const seek = { '--seek': `${duration ? (time / duration) * 100 : 0}%` };

  return (
    <div
      ref={frame}
      data-playing={playing || undefined}
      className="video-player relative animate-rise overflow-hidden rounded-2xl bg-black"
    >
      <video
        ref={video}
        src={src}
        autoPlay
        playsInline
        aria-label={label}
        onClick={toggle}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
        className="block max-h-[calc(100dvh-8rem)] w-auto max-w-[min(calc(100vw-2rem),72rem)]"
      />

      {playing ? null : (
        <button
          type="button"
          onClick={toggle}
          aria-label="Play"
          className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-neutral-950 shadow-float transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
        >
          <Play className="size-6 translate-x-px fill-current" />
        </button>
      )}

      <div className="video-controls absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-3 pb-3 pt-14 sm:gap-3 sm:px-4">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? 'Pause' : 'Play'}
          className={`${ROUND} bg-white text-neutral-950 hover:bg-white/85`}
        >
          {playing ? (
            <Pause className="size-4 fill-current" />
          ) : (
            <Play className="size-4 translate-x-px fill-current" />
          )}
        </button>

        <span className="numeric shrink-0 text-[12px] text-white/80">
          {clock(time)} / {clock(duration)}
        </span>

        <input
          type="range"
          min={0}
          max={duration || 0}
          step="any"
          value={time}
          onChange={(e) => {
            if (video.current)
              video.current.currentTime = Number(e.target.value);
          }}
          aria-label="Seek"
          style={seek as CSSProperties}
          className="video-seek min-w-0 flex-1"
        />

        <button
          type="button"
          onClick={() => {
            if (video.current) video.current.muted = !video.current.muted;
          }}
          aria-label={muted ? 'Unmute' : 'Mute'}
          className={`${ROUND} text-white hover:bg-white/15`}
        >
          {muted ? (
            <VolumeX className="size-[18px]" />
          ) : (
            <Volume2 className="size-[18px]" />
          )}
        </button>

        <button
          type="button"
          onClick={fullscreen}
          aria-label="Full screen"
          className={`${ROUND} text-white hover:bg-white/15`}
        >
          <Maximize className="size-[18px]" />
        </button>
      </div>
    </div>
  );
}
