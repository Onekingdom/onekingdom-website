import { Models } from "appwrite";
import { Image } from "./events";

interface Investor {
  InvestorName: string;
  InvestorURL: string;
  InvestorLogo: Image
}


export interface InvestorStorage extends Investor, Models.Document {}
export interface InvestorsStorage extends Models.DocumentList<InvestorStorage> {}
