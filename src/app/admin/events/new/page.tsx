"use client";
import FormBuilder from "@/components/PageBuilder/FormBuilder";
import { useAppSelector } from "@/hooks/redux";
import useEvents from "@/hooks/useEvents";
import { eventSchema, imageSchemaType } from "@/schemas/event";
import { zodResolver } from "@hookform/resolvers/zod";
import { Models } from "appwrite";
import React, { use, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function page() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { addEvent } = useEvents();

  const { elements, selectedElement } = useAppSelector((state) => state.pageBuilder); // Update the slice name

  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      eventDate: new Date(),
      Location: "",
      description: "",
      shortDescription: "",
      Images: [],
    },
  });


  useEffect(() => {
    console.log(elements)
  }, [elements]);

  const addImages = (image: Models.File) => {
    //get previous images
    const previousImages = form.getValues("Images");
    //get image URL

    const newImageArray: imageSchemaType[] = [
      ...previousImages,
      {
        bucketID: image.bucketId,
        imageID: image.$id,
      },
    ];

    form.setValue("Images", newImageArray);
  };

  //remove image
  const removeImage = (imageId: string) => {
    const previousImages = form.getValues("Images");
    const newImageArray = previousImages.filter((image) => image.imageID !== imageId);
    form.setValue("Images", newImageArray);
  };

  //handle submit
  const handleSubmit = async (data: z.infer<typeof eventSchema>) => {
    setIsLoading(true);
    try {
      await addEvent(data);
      toast.success("Event created");
    } catch (error) {
      toast.error("Error creating event");
    } finally {
      setIsLoading(false);
    }
  };




  return (
    // <div>
    //   <div className="flex justify-between">
    //     <h1>Create new Event</h1>
    //     <Sheet>
    //       <SheetTrigger>Add Component</SheetTrigger>
    //       <SheetContent>
    //         <div className="flex flex-col">
    //           <button className="btn btn-primary">Add Image</button>
    //           <button className="btn btn-primary">Add Video</button>
    //           <button className="btn btn-primary">Add Text</button>
    //         </div>
    //       </SheetContent>
    //     </Sheet>
    //   </div>
    // </div>
    <>

      <FormBuilder form={""}/>
    </>
  );
}
