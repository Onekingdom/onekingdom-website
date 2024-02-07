import { z } from "zod";
import { imageSchema } from "./image";


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

export type socialMediaType = z.infer<typeof socailMediaSchema>;
export type memberSchemaType = z.infer<typeof memberSchema>;
