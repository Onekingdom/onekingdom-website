"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Icons } from "./icons";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "@/schemas/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { account } from "@/utils/clientAppwrite";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import SocialIcon from "./SocialIcon";
import TwitchLogin from "./TwitchLogin";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    try {
      const login = await account.createEmailSession(values.email, values.password);
      router.push("/admin");
    } catch (error: any) {
      if (error === 401) {
        toast.error("Invalid email or password.");
        return;
      }
      toast.error("Something went wrong, please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (error) => {
            console.log(error);
          })}
        >
          <div className="grid gap-2">
            <div className="grid gap-1">
              <div>
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Title</FormLabel> */}
                      <FormControl className="w-96">
                        <Input
                          id="email"
                          placeholder="user@example.net"
                          type="email"
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
              </div>
              <div className="my-2">
                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Title</FormLabel> */}
                      <FormControl className="w-96">
                        <Input
                          id="password"
                          placeholder="********"
                          type="password"
                          autoCapitalize="none"
                          autoComplete="password"
                          autoCorrect="off"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button disabled={isLoading}>
              {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              Sign In with Email
            </Button>
          </div>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <TwitchLogin />
    </div>
  );
}
