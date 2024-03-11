import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import usePageEditor from "@/hooks/usePageEditor";
import { newPageSchema } from "@/schemas/new-page";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function NewPageForm() {
  const { createNewPage } = usePageEditor();
  const router = useRouter();
  const form = useForm<z.infer<typeof newPageSchema>>({
    resolver: zodResolver(newPageSchema),
    defaultValues: {
      name: "",
      path: "",
    },
  });

  async function onSubmit(values: z.infer<typeof newPageSchema>) {
    try {
      const res = await createNewPage({
        name: values.name,
        pathName: values.path,
        content: "",
        createdAt: new Date(),
        order: 0,
        visits: 0,
        previewImage: null,
        updatedAt: new Date(),
      } as any);

      router.push(`/admin/pages/editor?pageID=${res.$id}`);
    } catch (error) {
      toast.error("Error creating page");
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex justify-between">Page Name</FormLabel>
              <FormControl>
                <Input placeholder="About Us" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="path"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex justify-between">Path</FormLabel>
              <FormControl>
                <Input placeholder="/about" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" className="ml-4">
            Create Page
          </Button>
        </div>
      </form>
    </Form>
  );
}
