/**
 * Video upload rules, the sibling of `./image-validation.ts` and held to the
 * same discipline: the type is decided by magic bytes, never by the extension
 * or the client-declared content type.
 *
 * MP4 and WebM only — the two containers every current browser plays. An
 * iPhone `.mov` is refused at the sign step rather than stored and left to
 * fail in a visitor's browser.
 *
 * Pure, no `server-only`: the browser mirrors the rules and the tests call it.
 */

/** Blog videos go browser → R2 directly, so this is a product rule, not the 4.5 MB body limit. */
export const MAX_VIDEO_BYTES = 50 * 1024 * 1024;

export type VideoMime = 'video/mp4' | 'video/webm';

const VIDEO_TYPES: { mime: VideoMime; extension: string }[] = [
  { mime: 'video/mp4', extension: 'mp4' },
  { mime: 'video/webm', extension: 'webm' },
];

export function isVideoMime(value: unknown): value is VideoMime {
  return VIDEO_TYPES.some((type) => type.mime === value);
}

export function isVideoExtension(extension: string): boolean {
  return VIDEO_TYPES.some((type) => type.extension === extension);
}

export function videoExtensionForMime(mime: VideoMime): string {
  return VIDEO_TYPES.find((type) => type.mime === mime)!.extension;
}

const FTYP = [0x66, 0x74, 0x79, 0x70];
const EBML = [0x1a, 0x45, 0xdf, 0xa3];

/**
 * MP4 is an ISO media file: a size, then the `ftyp` box name at byte 4. WebM
 * opens with the EBML magic. Returns null for anything else.
 */
export function detectVideo(
  bytes: Uint8Array,
): { mime: VideoMime; extension: string } | null {
  if (FTYP.every((b, i) => bytes[4 + i] === b)) return VIDEO_TYPES[0]!;
  if (EBML.every((b, i) => bytes[i] === b)) return VIDEO_TYPES[1]!;
  return null;
}
