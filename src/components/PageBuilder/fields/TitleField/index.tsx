import { MdTextFields, MdTitle } from "react-icons/md";
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../../FormElements";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import PropertiesComponent from "./PropertiesComponent";
import FormComponent from "./FormComponent";
import DesignerComponent from "./DesignerComponent";

const type: ElementsType = "TitleField";

const extraAttributes = {
  title: "blank",
};

export const TitleFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: MdTitle,
    label: "Title",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true,
};

export type CustomTitleInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};





