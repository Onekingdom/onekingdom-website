"use client";

import SelectImage from "@/components/SelectImage";
import SocialIcon from "@/components/SocialIcon";
import TeamCard from "@/components/TeamCard";
import { Button, buttonVariants } from "@/components/ui/button";
import { CheckboxLabel } from "@/components/ui/checkboxLabel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useMembers from "@/hooks/useMembers";
import { cn } from "@/lib/utils";
import { memberSchema } from "@/schemas/member";
import { memberStorage } from "@/types/database/members";
import { Socialmedia } from "@/types/payload";
import { storage } from "@/utils/clientAppwrite";
import { zodResolver } from "@hookform/resolvers/zod";
import { Models } from "appwrite";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [member, setMember] = useState<memberStorage>();
  const { createMember, getMemberByID, updateMember } = useMembers();
  const searchParmas = useSearchParams();
  const router = useRouter();

  const form = useForm<z.infer<typeof memberSchema>>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      name: "",
      description: "",
      partneredStreamer: false,
      staffMember: false,
      socialMedia: [],
    },
  });

  const handleSubmit = async (data: z.infer<typeof memberSchema>) => {
    setIsLoading(true);
    if (isEditing) {
      const memberID = searchParmas.get("memberID");
      if (memberID) {
        const res = await updateMember(memberID, data);
        if (res) {
          toast.success("Member updated successfully");
          setMember(res);
          form.reset(res);
        }
      }
    } else {
      toast.promise(createMember(data), {
        success(data) {
          router.push("/admin/members/edit?memberID=" + data.$id);
          return "Member created successfully";
        },
        loading: "Creating member",
        error: "Error creating member",
      });
    }
  };

  const handleAddImage = (image: Models.File) => {
    form.setValue("image", {
      $id: member?.image?.$id,
      bucketID: image.bucketId,
      imageID: image.$id,
    });
  };

  const handleSocialMediaChange = (value: string, href: string) => {
    const prev = form.getValues("socialMedia");
    const index = prev.find((item) => item.value === value);

    if (!href || href === "" || href.length === 0) {
      form.setValue(
        "socialMedia",
        prev.filter((item) => item.value !== value)
      );
      return;
    }

    if (index) {
      const newSocialMedia = prev.map((item) => {
        if (item.value === value) {
          return {
            ...item,
            value,
            href,
          };
        }
        return item;
      });
      form.setValue("socialMedia", newSocialMedia);
    } else {
      form.setValue("socialMedia", [...prev, { value, href }]);
    }
  };

  useEffect(() => {
    const memberID = searchParmas.get("memberID");
    if (memberID) {
      const fetchMember = async () => {
        let res = await getMemberByID(memberID);

        console.log("res", res);

        if (res) {
          setMember(res);

          form.reset({
            name: res.name,
            description: res.description,
            partneredStreamer: res.partneredStreamer,
            staffMember: res.staffMember,
            socialMedia: res.socialMedia,
            image: Array.isArray(res.image) ? undefined : res.image,
          });
        }

        if (!res) toast.error("Member with the given ID does not exist in the database");
      };
      fetchMember();
      setIsEditing(true);
    }
  }, [searchParmas]);

  useEffect(() => {
    console.log(form.watch());
  }, [form.watch()]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit, (error) => {
          console.log(error);
        })}
      >
        <div className="grid grid-cols-3 gap-4">
          <div>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <label htmlFor="title" className="block font-semibold mb-1">
                    Name
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
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <label htmlFor="eventDate" className="block font-semibold mb-1">
                    Description
                  </label>
                  <FormControl className="w-96">
                    <Input id="title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="">
            <label htmlFor="shortDescription" className="block font-semibold mb-1">
              Teams
            </label>
            <div className="[&>*]:my-2">
              <FormField
                name="partneredStreamer"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="">
                      <CheckboxLabel label="Partnered Streamer" checked={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="staffMember"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="">
                      <CheckboxLabel label="Staff Member" checked={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="row-span-3">
            <FormField
              name="image"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <label htmlFor="shortDescription" className="block font-semibold mb-1">
                    Profile Image
                  </label>
                  <FormControl className="">
                    <>
                      <Dialog>
                        <DialogTrigger className={cn(buttonVariants({ variant: "outline" }))}>Add Images</DialogTrigger>
                        <DialogContent className="w-1/2">
                          <SelectImage
                            onImageAdded={handleAddImage}
                            selectedFiles={field.value ? [field.value.imageID] : []}
                            onImageRemoved={() => {}}
                            bucketID="65b8a8e6f1d34d3c7fea"
                          />
                        </DialogContent>
                      </Dialog>
                      <div>
                        {field.value && (
                          <img
                            src={`${storage.getFilePreview(field.value.bucketID, field.value.imageID, 250, 250).href}`}
                            alt="profile image"
                            className="w-20 h-20 object-cover rounded-full"
                          />
                        )}
                      </div>
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="row-span-3">
            <FormField
              name="socialMedia"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <label htmlFor="shortDescription" className="block font-semibold mb-1">
                    Social Media
                  </label>
                  <FormControl className="">
                    <ul>
                      {Object.entries(Socialmedia)
                        .reverse()
                        .map(([key, value]) => (
                          <li key={key} className="my-2 flex items-center">
                            <SocialIcon value={value} />
                            <Input
                              className="w-96 ml-4"
                              onChange={(e) => {
                                handleSocialMediaChange(key, e.target.value);
                              }}
                              value={field.value.find((item) => item.value === key)?.href || ""}
                            />
                          </li>
                        ))}
                    </ul>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="row-span-3 w-1/2">
            <label htmlFor="shortDescription" className="block font-semibold mb-1">
              Card Preview
            </label>
            <TeamCard
              name={form.watch("name")}
              description={form.watch("description")}
              img={form.watch("image")}
              socials={form.watch("socialMedia")}
            />
          </div>
        </div>
        <div>
          <Button type="submit" className="mt-4">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
