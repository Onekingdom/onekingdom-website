import { imageSchemaType } from "@/schemas/event";
import { MdImage } from "react-icons/md";
import { ElementsType, FormElement, FormElementInstance } from "../../FormElements";
import DesignerComponent from "./DesignerComponent";
import FormComponent from "./FormComponent";
import PropertiesComponent from "./PropertiesComponent";

const type: ElementsType = "ImageSlider";

const extraAttributes = {
  images: [] as imageSchemaType[],
};

export const ImageSliderFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),

  designerBtnElement: {
    icon: MdImage,
    label: "Image Slider",
  },

  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true,
};

export type CustomTitleInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};
