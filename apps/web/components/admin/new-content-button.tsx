import { Plus } from 'lucide-react';

import { createContent } from '@/app/(admin)/admin/cms/actions/create';
import { SubmitButton } from '@/components/admin/submit-button';
import type { ContentKind } from '@/lib/cms';

/** "New post" on a content list: makes an untitled draft and opens it. */
export function NewContentButton({ kind }: { kind: ContentKind }) {
  return (
    <form action={createContent}>
      <input type="hidden" name="kind" value={kind.slug} />
      <SubmitButton pendingLabel="Creating…">
        <Plus aria-hidden="true" />
        New {kind.singular}
      </SubmitButton>
    </form>
  );
}
