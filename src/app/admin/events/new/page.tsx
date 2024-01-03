"use client";
import Tiptap from "@/components/Tiptap";
import SelectImage from "@/components/SelectImage";
import { DatePickerDemo } from "@/components/ui/datePicker";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useEvents from "@/hooks/useEvents";
import { eventSchema, imageSchemaType } from "@/schemas/event";
import { storage } from "@/utils/clientAppwrite";
import { zodResolver } from "@hookform/resolvers/zod";
import { Models } from "appwrite";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function page() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { addEvent } = useEvents();
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit, (error) => {
          console.log(error);
        })}
      >
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl className="w-96">
                <Input id="title" placeholder="my cool event" type="text" autoCapitalize="none" autoCorrect="off" disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="eventDate"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>eventDate</FormLabel>
              <FormControl className="w-96">
                <DatePickerDemo />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="Location"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl className="w-96">
                <Input
                  id="title"
                  placeholder="my cool event"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="shortDescription"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>shortDescription</FormLabel>
              <FormControl className="w-96">
                <Input
                  id="shortDescription"
                  placeholder="my cool event"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl className="w-96">
                <Tiptap  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="Images"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>images</FormLabel>
              <FormControl className="w-96">
                <div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button type="button" className="btn btn-primary" disabled={isLoading}>
                        Select Image
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-5xl">
                      <DialogHeader>
                        <DialogTitle>Select Image</DialogTitle>
                      </DialogHeader>
                      <SelectImage
                        onImageAdded={addImages}
                        onImageRemoved={removeImage}
                        selectedFiles={form.getValues("Images").map((image) => image.imageID)}
                      />
                    </DialogContent>
                  </Dialog>
                  {/* preview images */}
                  <div className="flex flex-wrap">
                    {form.getValues("Images").length > 0 &&
                      form.getValues("Images").map((image, index) => (
                        <div key={index}>
                          <img src={storage.getFilePreview(image.bucketID, image.imageID, 100, 100).href} />
                          <button
                            type="button"
                            onClick={() =>
                              form.setValue(
                                "Images",
                                form.getValues("Images").filter((_, i) => i !== index)
                              )
                            }
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormControl className="w-96">
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              Submit
            </button>
          </FormControl>
        </FormItem>
      </form>
    </Form>
  );
}
