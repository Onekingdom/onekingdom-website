"use client";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useAppSelector } from "@/hooks/redux";
import { globals } from "@/schemas/globals";
import { Socialmedia } from "@/types/payload";

import { zodResolver } from "@hookform/resolvers/zod";
import { use, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import SocialIcon from "../SocialIcon";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { database } from "@/lib/appwrite";

export default function SocialMedia() {
  const { session } = useAppSelector((state) => state.auth);
  const form = useForm<z.infer<typeof globals>>({
    resolver: zodResolver(globals),
    defaultValues: {
      socialMedia: [],
    },
  });

  const fetch = async () => {
    const data = await database.getDocument("658fabb7b076a84d06d2", "65cb8829068faba84505", "65cb9004b80c8a26af33");
    form.setValue("socialMedia", data.socialMedia);
  };
  useEffect(() => {
    fetch();
  }, []);

  const handleSubmit = (data: z.infer<typeof globals>) => {
    toast.promise(
      async () => {
        await database.updateDocument("658fabb7b076a84d06d2", "65cb8829068faba84505", "65cb9004b80c8a26af33", {
          socialMedia: data.socialMedia,
          lastUpdatedBy: session.username,
        });

        await fetch();
      },
      {
        loading: "Saving...",
        success: "Saved!",
        error(error) {
          console.log(error);
          return "Failed to save";
        },
      }
    );
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

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit, (error) => {
            console.log(error);
          })}
        >
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

          <Button type="submit">Save</Button>
        </form>
      </Form>
    </div>
  );
}
