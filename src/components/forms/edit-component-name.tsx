import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import useEditor from "@/hooks/useEditor";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface Props {
  handleClose: (value: boolean) => void;
}

export default function EditComponentNameForm({ handleClose }: Props) {
  const { dispatch, state } = useEditor();
  const nameSchema = z.object({
    name: z.string(),
  });

  const form = useForm<z.infer<typeof nameSchema>>({
    resolver: zodResolver(nameSchema),
    defaultValues: { name: "" },
  });

  function onSubmit(values: z.infer<typeof nameSchema>) {
    dispatch({
      type: "pageEditor/updateAnElement",
      payload: {
        ...state.editor.selectedElement,
        name: values.name,
      },
    });
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
              <FormLabel className="flex justify-between">New Name</FormLabel>
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
