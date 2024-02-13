import { z } from "zod";
import { imageSchema } from "./image";
import { socailMediaSchema } from "./socialMedia";



export const memberSchema = z.object({
  name: z.string().min(4).max(50),
  description: z.string().min(4).max(50),
  image: imageSchema,
  socialMedia: z.array(socailMediaSchema),
  partneredStreamer: z.boolean(),
  staffMember: z.boolean(),
});

//create type from imageSchema


export type memberSchemaType = z.infer<typeof memberSchema>;
