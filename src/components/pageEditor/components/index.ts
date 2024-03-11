import { ElementSidebar } from "@/types/pageEditor";

import * as Layout from "./layout";

const allElements = {
  ...Layout,
};

const elements: ElementSidebar<any>[] = Object.values(allElements).map((element) => {
  return element;
});

export { elements };
