'use client';

import { useRef, useState } from 'react';
import { ImagePlus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { uploadImage } from '@/lib/admin/upload-image';
import {
  describeMediaRejection,
  MEDIA_ACCEPT_ATTRIBUTE,
  MEDIA_UPLOAD_HINT,
} from '@/lib/uploads/describe';

/**
 * Uploads an image or a video and writes it into the Markdown body at the
 * cursor, as `![](url)`. Plain Markdown either way: the site renders a `.mp4`
 * or `.webm` source as a video, so the body never needs custom syntax.
 *
 * The textarea stays uncontrolled; `setRangeText` edits it in place, so the
 * form submits whatever is in it, as before.
 */
export function MediaInsert({ target }: { target: string }) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(
    null,
  );

  async function insert(file: File) {
    const rejection = describeMediaRejection(file);
    if (rejection) return setStatus({ ok: false, text: rejection });

    setBusy(true);
    setStatus(null);
    const result = await uploadImage(file);
    setBusy(false);

    const area = document.getElementById(target);
    if (!result.ok || !result.url || !(area instanceof HTMLTextAreaElement)) {
      return setStatus({
        ok: false,
        text: result.message ?? 'Upload failed.',
      });
    }

    // Its own paragraph, so it renders as a block and not inside a sentence.
    area.setRangeText(
      `\n\n![](${result.url})\n\n`,
      area.selectionStart,
      area.selectionEnd,
      'end',
    );
    area.focus();
    setStatus({
      ok: true,
      text: 'Inserted. Write a caption between the [ ] if you want one.',
    });
  }

  return (
    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
      <input
        ref={input}
        type="file"
        accept={MEDIA_ACCEPT_ATTRIBUTE}
        className="sr-only"
        tabIndex={-1}
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.target.value = '';
          if (file) void insert(file);
        }}
      />
      <Button
        variant="secondary"
        size="sm"
        disabled={busy}
        onClick={() => input.current?.click()}
      >
        <ImagePlus aria-hidden="true" />
        {busy ? 'Uploading…' : 'Insert image or video'}
      </Button>
      <span
        aria-live="polite"
        className={`text-xs ${status && !status.ok ? 'text-destructive' : 'text-muted-foreground'}`}
      >
        {status?.text ?? MEDIA_UPLOAD_HINT}
      </span>
    </div>
  );
}
