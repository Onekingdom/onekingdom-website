import { FormElementInstance, SubmitFunction } from "../../FormElements";
import { CustomTitleInstance } from ".";

export default function FormComponent({ elementInstance }: { elementInstance: FormElementInstance; submitValue?: SubmitFunction; isInvalid?: boolean }) {
  const element = elementInstance as CustomTitleInstance;
  const { textField } = element.extraAttributes;

  return <p>{textField}</p>;
}
