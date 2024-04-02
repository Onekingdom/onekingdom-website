import { z } from "zod";

export const NewMediaQureySchema = z.object({
  width: z.number().min(0).max(10000),
});


export type NewMediaQureyType = z.infer<typeof NewMediaQureySchema>;