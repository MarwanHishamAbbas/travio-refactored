"use client"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { urlFor } from "@/lib/sanity/sanity-image"
import Image from "next/image"

import Link from "next/link"
import { useState, type FC } from "react"
import { Card, CardContent, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { getDictionary } from "@/language/getLanguage"
import { ChevronDown } from "lucide-react"

interface DestinationsMenuProps {
  locale: string
  destinationsLinks:
    | {
        _type: "tour_dropdown"
        _key: string
        destinations_title: {
          _type: "locale_string"
          en: string
          es: string
          por: string
        }
        tours_title: {
          _type: "locale_string"
          en: string
          es: string
          por: string
        }
        destinations: Array<{
          _type: "destination_link"
          destination: Record<string, unknown> // Replace with appropriate type if known
          _key: string
          tours: Array<Record<string, unknown>> // Replace with appropriate type if known
          text_tours: Array<Record<string, unknown>> // Replace with appropriate type if known
        }>
      }
    | any
}

const DestinationsMenu: FC<DestinationsMenuProps> = ({
  destinationsLinks,
  locale,
}) => {
  const [activeTour, setActiveTour] = useState<any>(
    destinationsLinks.destinations[0]
  )
  // console.log(destinationsLinks)
  console.log(activeTour.tours[0].overview_card.about)

  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex text-xl md:text-sm items-center gap-1">
          <p>{destinationsLinks.destinations_title[locale]}</p>
          <ChevronDown className="size-5" />
        </div>
      </SheetTrigger>
      <SheetContent
        side="top"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-10"
      >
        <div className="flex flex-col gap-5">
          <h1 className="text-lg font-medium">
            {" "}
            {destinationsLinks.destinations_title[locale]}
          </h1>
          <div className="flex flex-col gap-2 text-sm">
            {destinationsLinks.destinations.map((item: any, idx: number) => (
              <SheetClose key={idx} asChild>
                <a
                  onMouseEnter={() => setActiveTour(item)}
                  href={`/${locale}/destinations/${item?.destination.slug?.current}`}
                >
                  {item.destination.name?.[locale]}
                </a>
              </SheetClose>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="text-lg font-medium">
            {" "}
            {destinationsLinks.tours_title[locale]}
          </h1>
          <div className="flex flex-col gap-2 text-sm">
            {activeTour?.text_tours.map((item: any, idx: number) => (
              <SheetClose key={idx} asChild>
                <a href={`/${locale}/tours/${item?.slug}`}>
                  {item.title?.[locale]}
                </a>
              </SheetClose>
            ))}
          </div>
        </div>

        <div className="hidden md:grid grid-cols-2 gap-2 md:col-span-2">
          {activeTour?.tours.map((item: any, idx: number) => (
            <SheetClose asChild key={idx}>
              <Link href={`/${locale}/tours/${item?.slug.current}`}>
                <Card>
                  <CardTitle>
                    <Image
                      src={urlFor(item.hero_section.image)}
                      width={500}
                      height={500}
                      alt="Image"
                      className="w-full h-56 object-cover"
                    />
                  </CardTitle>
                  <CardContent>
                    <h1 className=" font-medium">
                      {item.hero_section.title[locale]}
                    </h1>
                    <p className="text-sm text-slate-500">
                      {item.overview_card.about[locale]}
                    </p>
                    {/* TODO: Create client version for getting translations */}
                    <Button variant="link">Read More</Button>
                  </CardContent>
                </Card>
              </Link>
            </SheetClose>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default DestinationsMenu
