"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { useTransition } from "react";
import { loginWithEmailAndPassword } from "../actions";

const FormSchema = z.object({
  email: z
    .string()
    .email()
    .refine(
      (value) => {
        const validEmails = [
          "police@gmail.com",
          "courtclerk@gmail.com",
          "judge@gmail.com",
          "lawyer@gmail.com",
        ];
        return validEmails.includes(value);
      },
      { message: "This email isn't registered" }
    ),
  password: z.string().min(1, { message: "Password can not be empty" }),
});

export default function AuthForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      // email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      loginWithEmailAndPassword(data);
    });
  }

  return (
    <div className="w-96">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the password"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormDescription>
                  {"contact your admin if you forgot your password"}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="outline"
            className="w-full flex items-center gap-2"
          >
            Login{" "}
            <AiOutlineLoading3Quarters
              className={cn("animate-spin", {
                hidden: !isPending,
              })}
            />
          </Button>
        </form>
      </Form>
    </div>
  );
}
