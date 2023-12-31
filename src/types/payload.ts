import { Team } from "./events";
import { Media } from "./ImageSizes";

export interface richText {
  type: string;
  children: {
    text: string;
    code?: boolean;
    type?: string;
    children?: {
      text: string;
    }[]
  }[]
}

export interface Buttons {
  buttons: string;
  link: string;
  id: string;
}

export interface Content {
  image?: Media;
  Title?: string;
  paragraph?: richText[];
  button?: boolean;
  Buttons?: Buttons[];
  id: string;
  blockType: string;
  serverID?: number;
  height?: number;
  width?: number;
}

export interface Service {
  title: string;
  desc: string;
  id: string;
}

export interface Investor {
  companyLogo: string;
  websiteURL: string;
  id: string;
}

interface Block {
  id: string;
  blockType: string;
}

interface Hero extends Block {
  Title: string;
  subtitle: string;
  description: string;
  backgroudVideo: Media;
}

export interface GuaranteeList {
  Title: string;
  Description: string;
  icon: Media;
  id: string;
}

export interface Blocks {
  Team: Team;
  list: GuaranteeList[];
  Content: Content[];
  hero: Hero;
  subtitle: string;
  Title: any;
  companyLogo: string;
  websiteURL: string;
  description: string;
  backgroundVideo: Media;
  id: string;
  blockType: string;
  Services: Service[];
  link: string;
  backgroudImage: string;
  videoURL: string;
}

export interface Doc {
  id: string;
  layout: Blocks[];
  createdAt: Date;
  updatedAt: Date;
  PageName: string;
  slug: string;
}

export interface RootObject {
  docs: Doc[];
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

export enum blockTypes {
  Hero = "Hero",
  Content = "Content",
  Services = "Services",
  Image = "image",
  Discord = "Discord",
  Paragraph = "paragraph",
  Timeline = "Timeline",
  Investors = "Sponsors",
  GuaranteeList = "GuaranteeList",
  Video = "video",
  TeamMember = "Teammember",
}

export enum Socialmedia {
  Twitter = "twitter",
  Instagram = "instagram",
  YouTube = "youtube",
  Twitch = "twitch",
  TikTok = "tiktok",
  Facebook = "facebook",
  Discord = "discord",
}

export interface SocialMedia {
  platform: string;
  link: string;
  id: string;
}
