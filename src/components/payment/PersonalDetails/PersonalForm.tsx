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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { CalendarDatePicker } from "./CalenderDatePicker"
import { useBookingStore } from "@/store/BookingProvider"
import { DateFormat } from "@/lib/utils"

interface PersonalFormProps {}

const PersonalForm: FC<PersonalFormProps> = ({}) => {
  const { setTripDetails } = useBookingStore((state) => state)
  const { nextStep, prevStep } = useStepper()
  // 1. Define your form.
  const form = useForm<TPersonalSchema>({
    resolver: zodResolver(personlSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      datePicker: {
        from: new Date(),
        to: new Date(),
      },
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: TPersonalSchema) {
    const {
      datePicker,
      email,
      firstName,
      lastName,
      location,
      middleName,
      mobile,
      nationality,
      prefix,
    } = values
    setTripDetails({
      primaryPassenger: {
        prefix,
        email,
        firstName,
        lastName,
        middleName,
        location,
        mobile,
        nationality,
        birthDate: DateFormat(datePicker.from),
      },
    })

    nextStep()
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold">1. Primary Passenger Details</h2>
        <p className="text-sm text-grey">
          Have you reviewed the details in the booking summary? If something
          isn&apos;t correct, you can adjust your details in the previous steps.
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" md:w-3/4">
            {/* Names */}
            <h1 className="font-medium my-2">Full Name</h1>
            <div className="grid grid-cols-4 gap-2 mb-4">
              <FormField
                control={form.control}
                name="prefix"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Prefix" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {personlSchema.shape.prefix.options.map(
                              (prefix: string, idx: number) => (
                                <SelectItem key={idx} value={prefix}>
                                  {prefix}
                                </SelectItem>
                              )
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormControl>
                      <Input placeholder="First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="middleName"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormControl>
                      <Input placeholder="Middle Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormControl>
                      <Input placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <h1 className="font-medium my-2">Date Of Birth</h1>
            <FormField
              control={form.control}
              name="datePicker"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormControl>
                    <CalendarDatePicker
                      date={field.value}
                      onDateSelect={({ from, to }) => {
                        form.setValue("datePicker", { from, to })
                      }}
                      variant="ghost"
                      numberOfMonths={1}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <h1 className="font-medium my-2">Nationality</h1>
            <FormField
              control={form.control}
              name="nationality"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Nationality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {personlSchema.shape.nationality.options.map(
                            (country: string, idx: number) => (
                              <SelectItem key={idx} value={country}>
                                {country}
                              </SelectItem>
                            )
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <h1 className="font-medium my-2">Email</h1>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email Adderss"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <h1 className="font-medium my-2">Mobile</h1>
            <div className="grid grid-cols-4 gap-2 mb-4">
              <FormField
                control={form.control}
                name="mobile.code"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Code" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {personlSchema.shape.mobile.shape.code.options.map(
                              (code: string, idx: number) => (
                                <SelectItem key={idx} value={code}>
                                  {code}
                                </SelectItem>
                              )
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mobile.number"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Mobile Number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <h1 className="font-medium my-2">Address</h1>
            <FormField
              control={form.control}
              name="location.address"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-4 grid grid-cols-2 gap-2 mb-4">
              <FormField
                control={form.control}
                name="location.town"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Town</FormLabel>
                    <FormControl>
                      <Input placeholder="Town" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location.state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="State" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="location.country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {personlSchema.shape.location.shape.country.options.map(
                            (country: string, idx: number) => (
                              <SelectItem key={idx} value={country}>
                                {country}
                              </SelectItem>
                            )
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="gap-2 flex justify-end mt-8">
              <Button
                className=" rounded-full"
                variant={"outline"}
                size={"lg"}
                onClick={prevStep}
              >
                Back
              </Button>
              <Button className=" rounded-full" size={"lg"}>
                Next
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default PersonalForm
