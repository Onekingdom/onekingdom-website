"use client";
import SelectImage from "@/components/SelectImage";
import EditorComponent from "@/components/richeditor/content";
// import RichEditor from "@/components/RichEditor";

import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/datePicker";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useEvents from "@/hooks/useEvents";
import { eventSchema, imageSchemaType } from "@/schemas/event";
import { storage } from "@/utils/clientAppwrite";
import { zodResolver } from "@hookform/resolvers/zod";
import { Models } from "appwrite";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function page() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { addEvent } = useEvents();

  // const { elements, selectedElement } = useAppSelector((state) => state.pageBuilder); // Update the slice name

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

  // useEffect(() => {
  //   console.log(form.watch());
  // }, [form.watch()]);

  //handle submit
  const handleSubmit = async (data: z.infer<typeof eventSchema>) => {
    setIsLoading(true);
    try {
      await addEvent({
        ...data,
        description: "",
        published: true,
      });
      toast.success("Event created");
    } catch (error) {
      toast.error("Error creating event");
    } finally {
      setIsLoading(false);
    }
  };

  //add image
  const handleAddImage = (image: Models.File) => {
    form.setValue("Images", [
      ...form.getValues("Images"),
      {
        imageID: image.$id,
        bucketID: image.bucketId,
      },
    ]);
  };

  //remove image

  const handleRemoveImage = (imageID: string) => {
    const images = form.getValues("Images");
    form.setValue(
      "Images",
      images.filter((img) => img.imageID !== imageID)
    );
  };

  return (
    <>
      <h1 className="text-3xl font-bold">Create Event</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit, (error) => {
            console.log(error);
          })}
        >
          <div className="grid grid-cols-3 gap-4">
            <div>
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <label htmlFor="title" className="block font-semibold mb-1">
                      Title
                    </label>
                    <FormControl className="w-96">
                      <Input id="title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                name="eventDate"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <label htmlFor="eventDate" className="block font-semibold mb-1">
                      Event Date
                    </label>
                    <FormControl className="w-96">
                      <DatePicker onChange={(e) => field.onChange(e)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                name="Location"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <label htmlFor="Location" className="block font-semibold mb-1">
                      Location
                    </label>
                    <FormControl className="w-96">
                      <Input id="Location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="row-span-3">
              <FormField
                name="shortDescription"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <label htmlFor="shortDescription" className="block font-semibold mb-1">
                      Short Description
                    </label>
                    <FormControl className="">
                      <div>
                        <EditorComponent content="" setContent={field.onChange} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="row-span-3">
              <FormField
                name="Images"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <label htmlFor="shortDescription" className="block font-semibold mb-1">
                      Preview Images
                    </label>
                    <FormControl className="">
                      <>
                        <Dialog>
                          <DialogTrigger>Add Images</DialogTrigger>
                          <DialogContent>
                            <SelectImage
                              selectedFiles={form.getValues("Images").map((i) => i.imageID)}
                              onImageAdded={handleAddImage}
                              onImageRemoved={handleRemoveImage}
                            />
                          </DialogContent>
                        </Dialog>
                        <div className="flex">
                          {form.getValues("Images").map((image: imageSchemaType) => (
                            <img src={storage.getFilePreview(image.bucketID, image.imageID, 50, 50).href} />
                          ))}
                        </div>
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div>
            <Button type="submit" className="mt-4" disabled={isLoading}>
              Submit
            </Button>
          </div>
        </form>
      </Form>

      {/* <FormBuilder form={""}/> */}
    </>
  );
}
