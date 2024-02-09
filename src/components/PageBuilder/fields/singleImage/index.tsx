import { imageSchemaType } from "@/schemas/event";
import { MdImage } from "react-icons/md";
import { ElementsType, FormElement, FormElementInstance } from "../../FormElements";
import DesignerComponent from "./DesignerComponent";
import FormComponent from "./FormComponent";
import PropertiesComponent from "./PropertiesComponent";

const type: ElementsType = "singleImage";

const extraAttributes = {
  image: null as imageSchemaType | null,
};

export const singleImageFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),

  designerBtnElement: {
    icon: MdImage,
    label: "Single Image",
  },

  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true,
};

export type CustomTitleInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};
