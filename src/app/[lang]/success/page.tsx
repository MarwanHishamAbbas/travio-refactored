"use client"

import MaxWidth from "@/components/common/MaxWidth"
import { Button } from "@/components/ui/button"
import { api } from "@/trpc/TRPCProvider"
import React from "react"

const SuccessPage = () => {
  const {
    isPending,
    mutate: approveBooking,
    status,
  } = api.booking.approveBooking.useMutation({
    onSuccess: async (data) => {
      console.log(data)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const approveTourHandler = () => {
    approveBooking()
  }
  return (
    <MaxWidth>
      <h1>Your Booking in pending approval</h1>
      <Button disabled={isPending} onClick={approveTourHandler}>
        Approve Payment
      </Button>
      {status === "success" && "Done"}
      {status === "error" && "Something Went Wrong"}
    </MaxWidth>
  )
}

export default SuccessPage
