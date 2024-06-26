import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useStepper } from "@/components/ui/stepper"
import { useBookingStore } from "@/store/BookingProvider"
import Image from "next/image"
import { type FC } from "react"

interface PayBookingProps {}

const PayBooking: FC<PayBookingProps> = ({}) => {
  const { prevStep } = useStepper()
  const {
    tripData: { currency, startDate },
    totalCost,
    addOnes,
    roomCost,
    hotelCost,
  } = useBookingStore((state) => state)
  return (
    <Card>
      <CardHeader className="space-y-8">
        <p className="text-sm md:text-base text-grey">
          Have you reviewed the details in the booking summary? If something
          isn&apos;t correct, you can adjust your details in the previous steps.
        </p>
        <p className="p-4 rounded-xl bg-lightBlue text-grey">
          Please note that you won&apos;t be charged immediately, and your
          booking will be confirmed by our travel specialist within 1-4 days.
        </p>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold md:text-xl ">Payment Options</h3>
        <div className="flex items-center gap-2 my-6">
          <Checkbox checked />
          <p className="md:text-lg font-medium">
            Pay in full USD {currency}
            {Number(totalCost + addOnes + roomCost + hotelCost)}
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <Image
              className=""
              src="/icons/tour-page/duration.svg"
              alt="Calender Icon"
              width={25}
              height={25}
            />
            <p className="text-xs md:text-base">
              Payment plan available when you login into your account
            </p>
          </div>
          <div className="flex items-start gap-2">
            <Image
              className=""
              src="/icons/tour-page/cash.svg"
              alt="Cash Icon"
              width={25}
              height={25}
            />
            <div>
              <p className="text-xs md:text-base">
                Book now and change your mind if you have to
              </p>
              <span className="text-grey text-xs md:text-base">
                Get a full refund before {startDate}, terms and conditions apply
              </span>
            </div>
          </div>
        </div>
        <Image
          className="mt-8"
          src="/icons/tour-page/stripe.png"
          alt="Stripe"
          width={200}
          height={200}
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
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default PayBooking
