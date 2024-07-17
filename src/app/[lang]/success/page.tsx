import { CircleCheckBig } from "lucide-react"
import Image from "next/image"
import React from "react"

const SuccessPage = async () => {
  return (
    <main className="relative min-h-screen">
      <Image
        fill
        src={"/demo/authBackground.png"}
        alt=""
        className="object-contain h-full w-full object-bottom bg-white -z-10"
      />
      <div className="flex flex-col gap-5 max-w-[506px] w-[90%] mx-auto pt-24 pb-64 z-10">
        <div className="flex flex-col gap-5 items-center">
          <Image src={"/Traviio.png"} alt="traviio" height={47} width={203} />
          <p className="text-center font-satoshi text-darkBlue text-2xl font-semibold ">
            Payment is successful
          </p>
          <CircleCheckBig className="size-14 stroke-green-400" />
        </div>
        <h1 className="text-xl text-center text-grey">
          you&apos;ll be charged as soon as your booking is Reviewed in less
          than 3 business days
        </h1>
      </div>
    </main>
  )
}

export default SuccessPage
