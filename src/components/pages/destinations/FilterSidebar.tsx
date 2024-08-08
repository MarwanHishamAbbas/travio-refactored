import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { durationItems, filterItems, priceItems } from "./data"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useCallback } from "react"

export default function FilterSidebar({
  locale,
  data,
  priceTags,
  durationTags,
}: any) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const createDestinationQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (params.has(name, value)) {
        params.delete(name, value)
      } else {
        params.append(name, value)
      }

      return params.toString()
    },
    [searchParams]
  )

  return (
    <div className="max-md:pb-3 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.06)] flex flex-col rounded-t-[16px] gap-3">
      <Accordion
        type="single"
        collapsible
        className="w-full flex flex-col gap-3 font-satoshi max-md:px-4 max-md:rounded-b-[16px]"
      >
        {filterItems.map((item: any, index: number) => (
          <AccordionItem key={index} value={item.name}>
            <AccordionTrigger
              className={`text-darkBlue md:text-lg font-medium md:p-[18px] p-3 bg-lightBlue ${
                index == 0 && " md:rounded-t-[16px]"
              } max-md:rounded-[8px\]`}
            >
              {item.name?.[locale]}
            </AccordionTrigger>
            <AccordionContent className="grid grid-cols-2 gap-y-2.5 justify-between items-center">
              {data?.map((country: any, index: number) => (
                <div
                  key={index}
                  className="flex gap-2 px-6 items-center pt-2.5"
                >
                  <input
                    type="radio"
                    className="w-3.5 h-3.5 hover:cursor-pointer"
                    id={country.slug.current}
                    onClick={() => {
                      router.push(
                        pathname +
                          "?" +
                          createDestinationQueryString(
                            "destinationTags",
                            country.slug.current
                          ),
                        {
                          scroll: false,
                        }
                      )
                    }}
                  />
                  <label
                    className="text-xs text-grey font-medium hover:cursor-pointer"
                    htmlFor={country.slug.current}
                  >
                    {country?.name?.[locale]}
                  </label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Accordion
        type="single"
        collapsible
        className="w-full flex flex-col gap-3 font-satoshi rounded-t-[16px] max-md:px-4 max-md:rounded-b-[16px]"
      >
        {priceItems.map((item: any, index: number) => (
          <AccordionItem key={index} value={item.name}>
            <AccordionTrigger
              className={`text-darkBlue md:text-lg font-medium md:p-[18px] p-3 bg-lightBlue max-md:rounded-[8px]`}
            >
              {item.name?.[locale]}
            </AccordionTrigger>
            <AccordionContent className="grid grid-cols-2 gap-y-2.5 justify-between items-center">
              <RadioGroup
                onValueChange={(e) => {
                  router.push(pathname + "?" + createQueryString("price", e), {
                    scroll: false,
                  })
                }}
                defaultValue=""
              >
                {priceTags?.map((country: any, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={country.name[locale]}
                      id={`r-${index}`}
                    />
                    <Label htmlFor={`r-${index}`}>{country.name[locale]}</Label>
                  </div>
                ))}
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Accordion
        type="single"
        collapsible
        className="w-full flex flex-col gap-3 font-satoshi rounded-t-[16px] max-md:px-4 max-md:rounded-b-[16px]"
      >
        {durationItems.map((item: any, index: number) => (
          <AccordionItem key={index} value={item.name}>
            <AccordionTrigger
              className={`text-darkBlue md:text-lg font-medium md:p-[18px] p-3 bg-lightBlue max-md:rounded-[8px]`}
            >
              {item.name?.[locale]}
            </AccordionTrigger>
            <AccordionContent className="grid grid-cols-2 gap-y-2.5 justify-between items-center">
              <RadioGroup
                onValueChange={(e) => {
                  router.push(
                    pathname + "?" + createQueryString("duration", e),
                    { scroll: false }
                  )
                }}
                defaultValue=""
              >
                {durationTags?.map((country: any, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={country.name[locale]}
                      id={`r-${index}`}
                    />
                    <Label htmlFor={`r-${index}`}>{country.name[locale]}</Label>
                  </div>
                ))}
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
