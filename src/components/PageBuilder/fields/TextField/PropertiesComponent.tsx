import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormElementInstance } from "../../FormElements";
import { CustomTitleInstance } from ".";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { updateElement } from "@/redux/pageBuilder/PageBuilderSlice";
import { useAppDispatch } from "@/hooks/redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import EditorComponent from "@/components/richeditor/content";

const propertiesSchema = z.object({
  textField: z.string().min(2),
});

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

export default function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomTitleInstance;
  const dispatch = useAppDispatch();

  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      textField: element?.extraAttributes?.textField || "",
    },
  });

  function applyChanges(values: propertiesFormSchemaType) {
    const { textField } = values;

    dispatch(
      updateElement({
        id: element.id,
        element: {
          ...element,
          extraAttributes: {
            ...element.extraAttributes,
            textField,
          },
        },
      })
    );
  }

  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(applyChanges)}
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="space-y-3"
      >
        <FormField
          control={form.control}
          name="textField"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text Field</FormLabel>
              <FormControl>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Edit Profile</Button>
                  </DialogTrigger>
                  <DialogContent className="w-1/3">
                    <EditorComponent content={form.watch("textField")} setContent={field.onChange} />

                    <DialogFooter>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
