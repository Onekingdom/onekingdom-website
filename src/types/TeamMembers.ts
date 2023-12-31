import { Team } from "./events";
import { Media } from "./ImageSizes"
import { SocialMedia } from "./payload";

export interface TeamMemberRoot {
  docs: TeamMember[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage?: any;
  nextPage?: any; 
}


interface TeamMember{
  id: string
  gamertag: string
  name: string
  teams: Team[]
  socials: SocialMedia[]
  image: Media
  createdAt: Date;
  updatedAt: Date;
}


