"use client";

import { createTenant } from "./actions";

import { zodResolver } from "@hookform/resolvers/zod";
import { City, Discipline, TenantRole, TenantStatus } from "@prisma/client";
import { CaretSortIcon, CheckIcon, PlusIcon } from "@radix-ui/react-icons";
import { Session } from "next-auth";
import { useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";

import { SchemaTenant } from "@/libs/schema";
import { cn } from "@/libs/utils";

import { toast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormKey = keyof z.infer<typeof SchemaTenant>;

function CustomLabel({ label }: { label: FormKey }) {
  return (
    <FormLabel
      className={cn(
        "capitalize",
        "flex",
        "items-center",
        "gap-2",
        "justify-between",
        "px-2",
      )}
    >
      {label}{" "}
      <FormMessage
        className={cn(
          "whitespace-nowrap",
          "overflow-hidden",
          "text-ellipsis",
          "text-xs",
          "leading-none",
        )}
      />
    </FormLabel>
  );
}

function Combobox(props: {
  form: UseFormReturn<z.infer<typeof SchemaTenant>>;
  name: FormKey;
  items: string[];
  description?: string;
}) {
  const { form, name, items, description } = props;
  const [query, setQuery] = useState<string | null>(null);
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("col-span-3")}>
          <CustomLabel label={name} />
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="secondary"
                  role="combobox"
                  className={cn(
                    "w-full justify-between",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value ?? `Select ${name}`}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>

            <PopoverContent className="w-full p-0" align="start">
              <Command filter={(v, s) => (v.includes(s) ? 1 : 0)}>
                <CommandInput
                  placeholder={`Search ${name}...`}
                  onValueChange={(v) => setQuery(v)}
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty
                    className={cn("p-1")}
                    onClick={() => {
                      if (!query) return;
                      form.setValue(name, query);
                    }}
                  >
                    <Button
                      type="button"
                      variant={"secondary"}
                      className={cn("w-full", "justify-start")}
                    >
                      {query ? (
                        <>
                          <PlusIcon /> {query}
                        </>
                      ) : (
                        `No ${name} found.`
                      )}
                    </Button>
                  </CommandEmpty>

                  <CommandGroup>
                    {items.map((item, i) => (
                      <CommandItem
                        key={i}
                        value={item}
                        onSelect={() => form.setValue(name, item)}
                      >
                        {item}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            item === field.value ? "opacity-100" : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {description && (
            <FormDescription className={cn("px-2")}>
              {description}
            </FormDescription>
          )}
        </FormItem>
      )}
    />
  );
}

export default function NewTenant({
  cities,
  disciplines,
  session,
}: {
  cities: City[];
  disciplines: Discipline[];
  session: Session;
}) {
  const form = useForm<z.infer<typeof SchemaTenant>>({
    resolver: zodResolver(SchemaTenant),
  });

  async function onSubmit(data: z.infer<typeof SchemaTenant>) {
    const formData = new FormData();
    const keys = Object.keys(data) as FormKey[];
    const arr = keys.map((item) => ({ key: item, value: data[item] }));
    arr.forEach((item) => formData.append(item.key, item.value || ""));
    const { errors, ...rest } = await createTenant({}, formData);

    if (errors) {
      const newErrors = keys.map((item) => ({
        key: item,
        value: errors[item],
      }));
      newErrors.forEach(
        (item) =>
          item.value &&
          form.setError(item.key, { message: item.value?.join(", ") }),
      );
    } else {
      toast({
        title: rest.message,
        description: <p>{data.name} has been created</p>,
      });
      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form
        className={cn("space-y-6")}
        onSubmit={form.handleSubmit(onSubmit)}
        onReset={() => form.reset()}
      >
        <div className={cn("grid", "grid-cols-6", "gap-1")}>
          <Combobox
            name="city"
            form={form}
            items={cities
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((item) => item.name)}
            description="City of domicile"
          />
          <Combobox
            name="discipline"
            form={form}
            items={disciplines
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((item) => item.name)}
            description="Your discipline"
          />
        </div>

        <div className={cn("grid", "grid-cols-6", "gap-1")}>
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className={cn("col-span-3")}>
                <CustomLabel label="role" />
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.keys(TenantRole).map((item, i) => (
                      <SelectItem key={i} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          {session && session.user && session.user.role !== "USER" && (
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className={cn("col-span-3")}>
                  <CustomLabel label="status" />
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(TenantStatus).map((item, i) => (
                        <SelectItem key={i} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          )}
        </div>

        <FormField
          control={form.control}
          name="name"
          defaultValue=""
          render={(item) => (
            <FormItem>
              <CustomLabel label="name" />
              <FormControl>
                <Input {...item.field} placeholder="This name..." />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="website"
          defaultValue=""
          render={(item) => (
            <FormItem>
              <CustomLabel label="website" />
              <FormControl>
                <Input {...item.field} placeholder="This website..." />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instagram"
          defaultValue=""
          render={(item) => (
            <FormItem>
              <CustomLabel label="instagram" />
              <FormControl>
                <Input {...item.field} placeholder="This instagram..." />
              </FormControl>
            </FormItem>
          )}
        />

        <div>
          <Button type="reset" variant="ghost">
            Reset
          </Button>
          <Button
            type="submit"
            variant="secondary"
            disabled={form.formState.disabled}
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
