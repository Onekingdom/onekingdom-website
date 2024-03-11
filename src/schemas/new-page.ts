import {z} from 'zod'

export const newPageSchema = z.object({
  name: z.string().min(4).max(50),
  path: z.string().min(4).max(50),
  


})