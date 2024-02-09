import { MdTextFields, MdTitle } from "react-icons/md";
import { ElementsType, FormElement, FormElementInstance } from "../../FormElements";
import DesignerComponent from "./DesignerComponent";
import FormComponent from "./FormComponent";
import PropertiesComponent from "./PropertiesComponent";

const type: ElementsType = "TextField";

const extraAttributes = {
  textField: "Paragraph",
};

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),

  designerBtnElement: {
    icon: MdTextFields,
    label: "Paragraph",
  },

  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true,
};

export type CustomTitleInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};
