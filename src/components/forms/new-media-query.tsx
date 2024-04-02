import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import useEditor from "@/hooks/useEditor";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { NewMediaQureySchema } from "@/schemas/new-media-query";

interface Props {
  handleClose?: (value: boolean) => void;
}

export default function NewMediaQueryForm({ handleClose }: Props) {
  const { dispatch, state } = useEditor();

  const form = useForm<z.infer<typeof NewMediaQureySchema>>({
    defaultValues: {
      width: state.editor.width,
    },
  });

  function onSubmit(values: z.infer<typeof NewMediaQureySchema>) {
    dispatch({
      type: "pageEditor/ADD_MEDIA_QUERY",
      payload: {
        value: values.width,
      }
    });

    if (handleClose) {
      handleClose(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="width"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex justify-between">New media query width</FormLabel>
              <FormControl>
                <Input placeholder="1920" {...field} />
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
