'use server';

import { redirect } from 'next/navigation';
import { db } from '@softmato/db';

import { recordAudit } from '@/lib/audit';
import { contentKind, getContent, tableFor } from '@/lib/cms';

import { revalidateContent } from './revalidate';
import { requireAdmin, requireKind } from './shared';

/**
 * Starts a new piece of content as an untitled draft and opens it in the
 * editor. A draft is invisible on the site, so the founder names it, writes it
 * and publishes it there, through the same save and publish as everything else.
 */
export async function createContent(form: FormData): Promise<void> {
  const adminId = await requireAdmin();
  const kindSlug = requireKind(form.get('kind'));
  const kind = contentKind(kindSlug);

  if (!kind.blank) throw new Error(`${kind.label} cannot be created here`);

  const table = tableFor(kindSlug);
  const [row] = await db
    .insert(table)
    .values({ ...kind.blank(), updatedBy: Number(adminId) } as never)
    .returning({ id: table.id });

  if (!row) throw new Error('The new draft was not created');

  await recordAudit({
    actorType: 'admin',
    actorId: adminId,
    action: 'cms.create',
    resourceType: kindSlug,
    resourceId: String(row.id),
    afterState: await getContent(kindSlug, row.id),
  });

  revalidateContent(kindSlug);
  redirect(`/admin/cms/${kindSlug}/${row.id}`);
}
