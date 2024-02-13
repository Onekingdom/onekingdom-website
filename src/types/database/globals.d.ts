import { socialMediaType } from "@/schemas/socialMedia"
import { Models } from "appwrite"

export interface GlobalStorage extends Models.Document {
  socialMedia: socialMediaType[]
}