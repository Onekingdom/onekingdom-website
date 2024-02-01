import { z } from "zod";

export const imageSchema = z.object({
  $id: z.string().optional(),
  bucketID: z.string(),
  imageID: z.string(),
});

const socailMediaSchema = z.object({
  $id: z.string().optional(),
  value: z.string().min(4).max(50),
  href: z.string().min(4).max(50),
});

export const memberSchema = z.object({
  name: z.string().min(4).max(50),
  description: z.string().min(4).max(50),
  image: imageSchema,
  socialMedia: z.array(socailMediaSchema),
  partneredStreamer: z.boolean(),
  staffMember: z.boolean(),
});

//create type from imageSchema
export type imageSchemaType = z.infer<typeof imageSchema>;
export type socialMediaType = z.infer<typeof socailMediaSchema>;
export type memberSchemaType = z.infer<typeof memberSchema>;
