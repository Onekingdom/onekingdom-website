import { FormElementInstance, SubmitFunction } from "../../FormElements";
import { CustomTitleInstance } from "./index";

export default function FormComponent({ elementInstance }: { elementInstance: FormElementInstance; submitValue?: SubmitFunction; isInvalid?: boolean }) {
  const element = elementInstance as CustomTitleInstance;
  const { title } = element.extraAttributes;

  return <h2>{title}</h2>;
}
