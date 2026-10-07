/** Shared shapes for the CMS registry. No logic, no imports from kinds. */
import type { z } from 'zod';

export type FieldKind =
  | 'text'
  | 'textarea'
  | 'markdown'
  | 'number'
  | 'tags'
  /** URL plus an upload when R2 is configured. */
  | 'image';

export interface FieldSpec {
  name: string;
  label: string;
  kind: FieldKind;
  required?: boolean;
  /** Shown under the input. Use it to say what the field is for. */
  hint?: string;
  /** Markdown only: offer an image/video upload that inserts at the cursor. */
  media?: boolean;
}

export interface ListColumn {
  field: string;
  label: string;
}

export interface ContentKind {
  /** URL segment: /admin/cms/<slug>. */
  slug: string;
  label: string;
  /** Singular, for buttons and headings. */
  singular: string;
  description: string;
  fields: FieldSpec[];
  /** Validates and coerces the submitted form. */
  schema: z.ZodTypeAny;
  listColumns: ListColumn[];
  /** The date column the database demands before this kind can publish. */
  publishRequires?: 'publishedAt' | 'effectiveAt';
  canCreate: boolean;
  /** Explains a `canCreate: false` kind in the UI. */
  createNote?: string;
  /**
   * The row a "New" button inserts as a draft. Its slug must be unique and
   * satisfy the slug format. Kinds without one have no button.
   */
  blank?: () => Record<string, unknown>;
}

export type ContentRow = Record<string, unknown> & {
  id: number;
  status: 'draft' | 'published';
};
