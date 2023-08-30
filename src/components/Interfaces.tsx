import { z } from "zod";

export interface Afbeelding {
  name: string,
  path: string,
}

export interface Kavel {
  nummer: string,
  name: string,
  omschrijving: string,
  afbeeldingen: Afbeelding[],
};

const AssetSchema = z.object({
  id: z.number(),
  alt: z.string(),
  name: z.string(),
  focus: z.string(),
  title: z.string(),
  source: z.string(),
  filename: z.string(),
  copyright: z.string(),
  fieldtype: z.string(),
  meta_data: z.object({})
})
export type AssetType = z.infer<typeof AssetSchema>;

const KavelContentSchema = z.object({
  _uid: z.string(),
  component: z.string(),
  afbeeldingen: z.array(AssetSchema),
  omschrijving: z.object({
    type: z.string(),
    content: z.array(
      z.object({
        type: z.string(),
        content: z.array(z.object({ text: z.string(), type: z.string() }))
      })
    )
  })
})

const KavelPageSchema = z.object({
  name: z.string(),
  created_at: z.string(),
  published_at: z.string(),
  id: z.number(),
  uuid: z.string(),
  content: KavelContentSchema,
  slug: z.string(),
  full_slug: z.string(),
  sort_by_date: z.null(),
  position: z.number(),
  tag_list: z.array(z.unknown()),
  is_startpage: z.boolean(),
  parent_id: z.number(),
  meta_data: z.null(),
  group_id: z.string(),
  first_published_at: z.string(),
  release_id: z.null(),
  lang: z.string(),
  path: z.null(),
  alternates: z.array(z.unknown()),
  default_full_slug: z.null(),
  translated_slugs: z.null()
})
export type KavelPageType = z.infer<typeof KavelPageSchema>;

export const TextSectionSchema = z.object({
  _uid: z.string(),
  component: z.literal('TextSection'),
  image: z.optional(AssetSchema).nullable().catch({
    "id": null,
    "alt": null,
    "name": "",
    "focus": null,
    "title": null,
    "source": null,
    "filename": "",
    "copyright": null,
    "fieldtype": "asset",
    "meta_data": {}
    }),
  text: z.any(),
})
export type TextSectionType = z.infer<typeof TextSectionSchema>

export const SpacerSchema = z.object({
  _uid: z.string(),
  component: z.literal('Spacer'),
})

export const BlockUnionSchema = z.discriminatedUnion('component', [TextSectionSchema, SpacerSchema])
export type BlockUnionType = z.infer<typeof BlockUnionSchema>