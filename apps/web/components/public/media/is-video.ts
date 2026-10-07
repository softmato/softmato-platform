/** A `.mp4` or `.webm` source plays as a video; anything else is an image. */
export const isVideoSrc = (src: string) =>
  /\.(mp4|webm)$/i.test(src.split(/[?#]/)[0] ?? '');
