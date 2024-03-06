"use client";
import SelectImage from "@/components/SelectImage";
import EditorComponent from "@/components/richeditor/content";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/datePicker";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import useEvents from "@/hooks/useEvents";
import { setElements } from "@/redux/pageBuilder/PageBuilderSlice";
import { eventSchema, imageSchemaType } from "@/schemas/event";
import { EventStorage } from "@/types/events";
import { storage } from "@/utils/clientAppwrite";
import { zodResolver } from "@hookform/resolvers/zod";
import { Models } from "appwrite";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlinePublish } from "react-icons/md";
import { toast } from "sonner";
import { z } from "zod";
import Image from "next/image";

export default function Page() {
  const { getEventbyID, updateEvent, addEvent } = useEvents();
  const [event, setEvent] = useState<EventStorage>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const searchParmas = useSearchParams();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { elements } = useAppSelector((state) => state.pageBuilder);
  const { session } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const router = useRouter();

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

  const handleSubmit = async (data: z.infer<typeof eventSchema>) => {
    setIsLoading(true);
    toast.promise(
      async () => {
        if (isEditing) {
          const eventID = searchParmas.get("eventID");
          if (!eventID) throw "Event ID not found";

          await updateEvent(eventID, {
            ...data,
            eventDate: data.eventDate.toISOString(),
            description: JSON.stringify(elements),
            published: true,
            author: session.username || "One Kingdom",
          });
         await getEvent(eventID);
        } else {
          const newEvent = await addEvent({
            ...data,
            description: "",
            published: true,
          } as any);
          router.push(`/admin/events/edit?eventID=${newEvent.$id}`);
        }
      },
      {
        loading: "Publishing...",
        success: "Event Published",
        // error: "Failed to Publish Event",
        error(error) {
          return error.message;
        },

        finally: () => setIsLoading(false),
      }
    );
  };

  //add image
  const handleAddImage = (image: Models.File) => {
    //find if image already exists

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

  const getEvent = async (eventID: string) => {
    const event = await getEventbyID(eventID);

    if (!event) return;

    setEvent(event);
    form.reset({
      ...event,
      shortDescription: event.shortDescription,
      eventDate: new Date(event.eventDate),
    });

    if (event.description) dispatch(setElements(JSON.parse(event.description)));

    setIsLoading(false);
  };

  useEffect(() => {
    const eventID = searchParmas.get("eventID");
    if (eventID) {
      getEvent(eventID);
      setIsEditing(true);
    }
    form.reset();
    setIsLoading(false);

    return () => {
      console.log("unmount");
      dispatch(setElements([]));
    };
  }, [searchParmas]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit, (error) => {
            console.log(error);
          })}
        >
          <div className="flex items-center gap-2 justify-end">
            {/* <PreviewDialogBtn /> */}
            {/* {!form.getValues("title") && ( */}
            <>
              {/* <Button
                variant={"outline"}
                className="gap-2"
                disabled={isLoading}
                onClick={() => {
                  // startTransition(updateFormContent);
                }}
                >
                <HiSaveAs className="h-4 w-4" />
                Save
                {isLoading && <FaSpinner className="animate-spin" />}
              </Button> */}

              <Button className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400" type="submit">
                <MdOutlinePublish className="h-4 w-4" />
                Publish
              </Button>
            </>
            {/* )} */}
          </div>
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
                      <DatePicker onChange={(e) => field.onChange(e)} Value={field.value} />
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
                        <EditorComponent
                          content={form.getValues("shortDescription")}
                          setContent={field.onChange}
                          limit={250}
                          initialContent={event?.shortDescription}
                        />
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
                          <DialogContent className="w-1/2">
                            <SelectImage
                              selectedFiles={form.getValues("Images").map((i) => i.imageID)}
                              onImageAdded={handleAddImage}
                              onImageRemoved={handleRemoveImage}
                              bucketID="658fad6a1cfcc5125a99"
                            />
                          </DialogContent>
                        </Dialog>
                        <div className="flex ">
                          {form.getValues("Images").map((image: imageSchemaType) => (
                            <Image
                              key={image.imageID}
                              src={storage.getFilePreview(image.bucketID, image.imageID, 50, 50).href}
                              alt=""
                              width={50}
                              height={50}
                              style={{
                                maxWidth: "100%",
                                height: "auto"
                              }} />
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
        </form>
      </Form>
      <div className="mt-8">
        {/* <FormBuilder form="" /> */}
      </div>
    </div>
  );
}
