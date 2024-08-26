"use client";

import FormContainer from "@/components/formContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useState, useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { saveCase } from "../../actions";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import useCaseContext from "@/components/context/useCaseContext";
import { Textarea } from "@/components/ui/textarea";

export default function CreateForm() {
  const [evidenceFile, setEvidenceFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();
  const { cases, setCases } = useCaseContext();

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const buttonSubmitHandler = async () => {
    const formData = new FormData();
    formData.append("title", form.getValues().title);
    formData.append("description", form.getValues().description);

    if (!evidenceFile) {
      toast({ title: "Please select a file" });
      return;
    }

    formData.append("file", evidenceFile);

    startTransition(async () => {
      try {
        const result = await saveCase(formData);
        if (result.success) {
          toast({ title: "File uploaded successfully!" });
          document.getElementById("create-trigger")?.click();
          setCases([...cases, result.newCase]);
        } else {
          throw new Error("File upload failed");
        }
      } catch (error) {
        toast({
          title: "Error initializing case: " + (error as Error).message,
        });
        console.log((error as Error).message);
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(buttonSubmitHandler)}
        className="w-full space-y-6"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="case title"
                  type="text"
                  {...field}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Case Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="case description"
                  {...field}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="file-input" className="mb-2">
            Input zip file
          </Label>
          <Input
            id="file-input"
            type="file"
            accept=".zip"
            required
            onChange={(e) => {
              e.target.files &&
                setEvidenceFile(e.target.files[0] as unknown as File);
            }}
          />

          <Button
            className="w-full flex gap-2 items-center mt-5"
            variant="outline"
            type="submit"
          >
            Submit{" "}
            <AiOutlineLoading3Quarters
              className={cn("animate-spin", { hidden: !isPending })}
            />
          </Button>
        </div>
      </form>
    </Form>
  );
}
