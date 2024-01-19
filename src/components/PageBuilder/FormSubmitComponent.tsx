"use client";

import { FormElementInstance, FormElements } from "./FormElements";

function FormSubmitComponent({ content }: { content: FormElementInstance[];}) {
  return (
    <>
      {content.map((element) => {
        const FormElement = FormElements[element.type].formComponent;
        return <FormElement key={element.id} elementInstance={element} />;
      })}
    </>
  );
}

export default FormSubmitComponent;
