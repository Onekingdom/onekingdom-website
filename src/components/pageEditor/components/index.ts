import { ElementSidebar } from "@/types/pageEditor";
import * as BasicElements from "./basicElements";
import * as Layout from "./layout";
import * as Discord from "./discord";
import * as Hero from "./Hero";
import * as OneKingdom from "./onekingdom";

const allElements = {
  ...Layout,
  ...BasicElements,
  ...Discord,
  ...Hero,
  ...OneKingdom,
  
};

const elements: ElementSidebar<any>[] = Object.values(allElements).map((element) => {
  return element;
});

export { elements };
