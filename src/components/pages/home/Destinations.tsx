import React from "react"
import Link from "next/link"

import dynamic from "next/dynamic"
import MaxWidth from "@/components/common/MaxWidth"
import SectionHeader from "@/components/common/SectionHeader"
const DestinationCard = dynamic(
  () => import("@/components/common/DestinationCard")
)

const Destinations = ({ data, locale }: any) => {
  const validDestinations =
    data.destinations?.filter((destination: any) => destination.destination) ||
    []
  if (
    process.env.NEXT_PUBLIC_DEVELOPMENT &&
    data.destinations?.length &&
    data.destinations.length < 4
  ) {
    data.destinations?.push(data.destinations[0])
    data.destinations?.push(data.destinations[0])
    data.destinations?.push(data.destinations[0])
  }

  return (
    <MaxWidth className="mt-16">
      <SectionHeader title="Destinations" subtitle="Where We Can Go" />
      <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 max-sm:justify-center">
        {validDestinations.map((destination: any, idx: number) => (
          <Link
            key={idx}
            href={`${locale}/destinations${destination.destination?.slug?.current}`}
          >
            <DestinationCard
              key={destination._key + idx}
              data={destination}
              locale={locale}
              tourCount={destination.destination?.count?.length}
            />
          </Link>
        ))}
      </div>
    </MaxWidth>
  )
}

export default Destinations
