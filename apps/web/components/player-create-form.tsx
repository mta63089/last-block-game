"use client"

import { useState } from "react"
import { PlayerClass } from "@/generated/prisma"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@last-block/ui/components/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@last-block/ui/components/form"
import { Input } from "@last-block/ui/components/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@last-block/ui/components/select"

import { createPlayer } from "@/lib/db"

import { Icons } from "./icons"

export default function CreatePlayer({ userId }: { userId: string }) {
  const [loading, setLoading] = useState(false)

  const formSchema = z.object({
    name: z
      .string()
      .min(1, { message: "This field is required" })
      .min(6, { message: "Must be at least 6 characters" })
      .max(15, { message: "Must be at most 15 characters" }),
    profession: z.string().min(1, { message: "This field is required" }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      profession: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    ;(async () => {
      const player = await createPlayer(
        values.name,
        userId,
        values.profession as PlayerClass,
        "/mta630.png"
      )
    })()
    setLoading(false)
  }

  function onReset() {
    form.reset()
    form.clearErrors()
  }

  return (
    <div className="flex h-svh flex-1 items-center justify-center">
      {loading ? (
        <>
          <Icons.spinner className="size-16 animate-spin text-green-500" />
          <span className="animate-pulse text-green-500">
            Creating Your Character...
          </span>
        </>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} onReset={onReset}>
            <div className="grid grid-cols-12 gap-4">
              <div
                key="text-0"
                id="text-0"
                className="col-span-12 col-start-auto"
              >
                <h3
                  style={{ textAlign: "left" }}
                  className="scroll-m-20 text-2xl font-semibold tracking-tight"
                >
                  <strong>Create a Character</strong>
                </h3>
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-12 col-start-auto flex flex-col items-start gap-2 space-y-0 self-end">
                    <FormLabel className="flex shrink-0">Name</FormLabel>

                    <div className="w-full">
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            key="text-input-0"
                            placeholder="John Doe"
                            type="text"
                            id="text-input-0"
                            className=" "
                            {...field}
                          />
                        </div>
                      </FormControl>

                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="profession"
                render={({ field }) => (
                  <FormItem className="col-span-12 col-start-auto flex flex-col items-start gap-2 space-y-0 self-end">
                    <FormLabel className="flex shrink-0">Class</FormLabel>

                    <div className="w-full">
                      <FormControl>
                        <Select
                          key="profession"
                          {...field}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a profession" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem key="zombie" value="zombie">
                              zombie
                            </SelectItem>

                            <SelectItem key="firefighter" value="firefighter">
                              Firefighter
                            </SelectItem>

                            <SelectItem key="police" value="police">
                              Police Officer
                            </SelectItem>

                            <SelectItem key="engineer" value="engineer">
                              Engineer
                            </SelectItem>

                            <SelectItem key="doctor" value="doctor">
                              Doctor
                            </SelectItem>

                            <SelectItem
                              key="fast_food_employee"
                              value="fast_food_employee"
                            >
                              Fast Food Employee
                            </SelectItem>

                            <SelectItem key="student" value="student">
                              Student
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>

                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormItem className="col-span-12 col-start-auto flex flex-col items-start gap-2 space-y-0 self-end">
                <FormLabel className="hidden shrink-0">Submit</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <Button
                      key="submit-button-0"
                      id="submit-button-0"
                      name=""
                      className="w-full"
                      type="submit"
                      variant="default"
                    >
                      Create
                    </Button>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}
