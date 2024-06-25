"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { type FC } from "react"
import {
  TPersonalSchema,
  personlSchema,
} from "@/lib/validators/PersonalFormSchema"
import { useStepper } from "@/components/ui/stepper"

interface PersonalFormProps {}

const PersonalForm: FC<PersonalFormProps> = ({}) => {
  const { nextStep, prevStep } = useStepper()
  // 1. Define your form.
  const form = useForm<TPersonalSchema>({
    resolver: zodResolver(personlSchema),
    defaultValues: {
      firstName: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: TPersonalSchema) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    console.log(values)
    nextStep()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="First Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="gap-2 flex justify-end">
          <Button
            className=" rounded-full"
            variant={"outline"}
            size={"lg"}
            onClick={prevStep}
          >
            Back
          </Button>
          <Button className=" rounded-full" size={"lg"} onClick={nextStep}>
            Next
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default PersonalForm
