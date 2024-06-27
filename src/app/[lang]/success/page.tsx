import MaxWidth from "@/components/common/MaxWidth"
import { Button } from "@/components/ui/button"
import React from "react"

const SuccessPage = () => {
  return (
    <MaxWidth>
      <h1>Your Booking in pending approval</h1>
      <Button>Approve Payment</Button>
    </MaxWidth>
  )
}

export default SuccessPage
