import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { elements } from "../../components/index";

import PlaceHolder, { DatabasePlaceholder } from "@/components/pageEditor/components/placeholder";
import { savedComponentList } from "@/types/database/pages";
import { database } from "@/utils/clientAppwrite";
import { useEffect, useState } from "react";

export default function ComponentsTab() {
  const [savedComponents, setSavedComponents] = useState<
    {
      $id: string;
      name: string;
      component: string;
      madeBy: string;
    }[]
  >();

  useEffect(() => {
    const fetchComponents = async () => {
      const res = await database.listDocuments<savedComponentList>("658fabb7b076a84d06d2", "65fb950e074d992c0289");
      if (res && res.documents.length > 0) {
        const components = res.documents.map((doc) => {
          return {
            $id: doc.$id,
            name: doc.name,
            component: doc.component,
            madeBy: doc.madeBy,

          };
        });
        setSavedComponents(components);
      }
    };
    fetchComponents();
  }, []);

  const elementsByGroup = elements.reduce((acc: { [key: string]: any[] }, element) => {
    const { group } = element;

    if (!acc[group]) {
      acc[group] = [];
    }

    acc[group].push(element);
    return acc;
  }, {});


  const removeSavedComponent = async ($id: string) => {
    await database.deleteDocument("658fabb7b076a84d06d2", "65fb950e074d992c0289", $id);
    setSavedComponents((prev) => prev?.filter((component) => component.$id !== $id));
  };




  return (
    <Accordion type="multiple" className="w-full">
      {Object.entries(elementsByGroup).map(([groupName, elements]) => (
        <AccordionItem key={groupName} value={groupName} className="px-6 py-0 border-y-[1px]">
          <AccordionTrigger className="!no-underline capitalize">{groupName}</AccordionTrigger>
          <AccordionContent className="grid grid-cols-2 gap-2">
            {elements.map((element, index) => (
              <div key={index} className="flex flex-col items-center justify-center">
                <PlaceHolder Type={element.id} Icon={element.icon} />
                <span className="text-muted-foreground">{element.label}</span>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
      {savedComponents && savedComponents.length > 0 && (
        <AccordionItem value="saved" className="px-6 py-0 border-y-[1px]">
          <AccordionTrigger className="!no-underline capitalize">Saved Components</AccordionTrigger>
          <AccordionContent className="grid grid-cols-2 gap-2">
            {savedComponents.map((element, index) => (
              <div key={index} className="flex flex-col items-center justify-center">
                <DatabasePlaceholder component={element.component} />
                <span className="text-muted-foreground">{element.name}</span>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      )}
    </Accordion>
  );
}
