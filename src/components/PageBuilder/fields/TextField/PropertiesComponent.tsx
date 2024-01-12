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

const propertiesSchema = z.object({
  textField: z.string().min(2).max(500),
});

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

export default function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomTitleInstance;
  const dispatch = useAppDispatch();

  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      textField: element.extraAttributes.textField,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

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
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}