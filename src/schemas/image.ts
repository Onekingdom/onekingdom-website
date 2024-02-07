import { z } from "zod";

export const imageSchema = z.object({
  $id: z.string().optional(),
  bucketID: z.string(),
  imageID: z.string(),
});

export type imageSchemaType = z.infer<typeof imageSchema>;