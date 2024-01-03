import { z } from "zod";

export const imageSchema = z.object({
  bucketID: z.string(),
  imageID: z.string(),
});

export const eventSchema = z.object({
  title: z.string().min(4).max(50),
  eventDate: z.date(),
  Location: z.string().min(4).max(50),
  description: z.string().min(10).max(10000),
  shortDescription: z.string().min(10).max(1000),
  Images: z.array(imageSchema).min(1),
});

//create type from imageSchema
export type imageSchemaType = z.infer<typeof imageSchema>;
