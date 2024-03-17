import ButtonForm from "@/components/forms/button-form";
import { EditorElement } from "@/types/pageEditor";
import { ButtonContent } from ".";
import { ButtonSchema } from "@/schemas/button";
import useEditor from "@/hooks/useEditor";

type Props = {
  element: EditorElement<ButtonContent>;
};

export default function Settings({ element }: Props) {
  const { dispatch } = useEditor();
  const {
    content: { href, openNewTab, icon },
  } = element;

  const updateContent = (X: ButtonSchema) => {
    const updatedContent = {
      ...element.content,
      href: X.link,
      openNewTab: X.openNewTab,
      icon: X.showIcon ? X.icon : undefined,
    };

    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: {
          ...element,
          content: updatedContent,
        },
      },
    });
  };

  return (
    <div className="flex flex-col">
      <ButtonForm
        devaultValues={{
          link: href,
          openNewTab: openNewTab,
          showIcon: !!icon,
          icon: icon,
        }}
        updateContent={updateContent}
      />
    </div>
  );
}
