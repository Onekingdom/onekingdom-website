import React from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import useEditor from "@/hooks/useEditor";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { database } from "@/utils/clientAppwrite";
import { ID } from "appwrite";
import { useAppSelector } from "@/hooks/redux";

interface Props {
  handleClose: (value: boolean) => void;
}

export default function SaveComponentForm({ handleClose }: Props) {
  const { auth, pageEditor } = useAppSelector((state) => state);
  const { dispatch } = useEditor();
  const nameSchema = z.object({
    name: z.string(),
  });

  const form = useForm<z.infer<typeof nameSchema>>({
    resolver: zodResolver(nameSchema),
    defaultValues: { name: pageEditor.editor.selectedElement.name },
  });

  async function onSubmit(values: z.infer<typeof nameSchema>) {
    const component = JSON.stringify(pageEditor.editor.selectedElement);

    toast.promise(
      async () => {
        await database.createDocument("658fabb7b076a84d06d2", "65fb950e074d992c0289", ID.unique(), {
          madeBy: auth.session.username,
          name: values.name,
          component,
        });
      },
      {
        loading: "Saving...",
        success: "Saved",
        error: "Error",
      }
    );
    handleClose(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex justify-between">Component Name</FormLabel>
              <FormControl>
                <Input placeholder="My super cool component" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
