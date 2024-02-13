import { FormElementInstance, SubmitFunction } from "../../FormElements";
import { CustomTitleInstance } from "./index";

export default function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunction;
  isInvalid?: boolean;
}) {
  const element = elementInstance as CustomTitleInstance;
  const { href } = element.extraAttributes;

  return (
    <div className="neoh_fn_video">
      <div className="bg_overlay">
        <div className="bg_image" data-bg-img="img/hero/bg.jpg" />
        <div className="bg_color" />
      </div>
      <div className="v_content">
        <a className="popup-youtube" href={href}>
          <img src="svg/play.svg" alt="" className="fn__svg" />
        </a>
      </div>
    </div>
  );
}
