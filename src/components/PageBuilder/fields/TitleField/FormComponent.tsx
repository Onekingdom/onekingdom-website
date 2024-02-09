import { FormElementInstance, SubmitFunction } from "../../FormElements";
import { CustomTitleInstance } from "./index";

export default function FormComponent({ elementInstance }: { elementInstance: FormElementInstance; submitValue?: SubmitFunction; isInvalid?: boolean }) {
  const element = elementInstance as CustomTitleInstance;
  const { title } = element.extraAttributes;

  return <h2 className="m-0 p-0 text-3xl font-medium leading-tight mb-3">{title}</h2>;
}
