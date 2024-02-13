import { z } from "zod";
import { imageSchema } from "./image";
import { socailMediaSchema } from "./socialMedia";



export const globals = z.object({
  socialMedia: z.array(socailMediaSchema),

});

//create type from imageSchema


export type globalsSchemaType = z.infer<typeof globals>;
