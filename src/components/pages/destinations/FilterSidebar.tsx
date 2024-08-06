import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { durationItems, filterItems, priceItems } from "./data"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FilterSidebar({
  locale,
  data,
  priceTags,
  durationTags,
}: any) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isSelected = (item: string) =>
    searchParams?.getAll("tag").includes(item?.toLowerCase())

  const handleTagClick = (item: string) => {
    const existingTags = searchParams?.getAll("tag")
    const newTags = Array.isArray(existingTags) ? existingTags : []
    const tag = item.trim().toLowerCase()

    if (newTags.includes(tag)) {
      newTags.splice(newTags.indexOf(tag), 1)
    } else {
      newTags.push(tag)
    }

    const uniqueTags = Array.from(new Set(newTags)) // Ensure no duplicates

    if (pathname) {
      router.push(
        `${pathname}?${uniqueTags.map((t) => `tag=${encodeURIComponent(t)}`).join("&")}`,
        {
          scroll: false,
        }
      )
    }
  }

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
                    checked={isSelected(country.slug.current) ? true : false}
                    onClick={() => {
                      handleTagClick(country.slug.current)
                      isSelected(country.slug.current ? "true" : "false")
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
              className={`text-darkBlue md:text-lg font-medium md:p-[18px] p-3 bg-lightBlue max-md:rounded-[8px\]`}
            >
              {item.name?.[locale]}
            </AccordionTrigger>
            <AccordionContent className="grid grid-cols-2 gap-y-2.5 justify-between items-center">
              {priceTags?.map((country: any, index: number) => (
                <div
                  key={index}
                  className="flex gap-2 px-6 items-center pt-2.5"
                >
                  <input
                    type="radio"
                    className="w-3.5 h-3.5 hover:cursor-pointer"
                    id={country.slug.current}
                    checked={isSelected(country.slug.current) ? true : false}
                    onClick={() => {
                      handleTagClick(country.slug.current)
                      isSelected(country.slug.current ? "true" : "false")
                    }}
                  />
                  <label
                    className="text-xs text-grey font-medium whitespace-nowrap hover:cursor-pointer"
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
        {durationItems.map((item: any, index: number) => (
          <AccordionItem key={index} value={item.name}>
            <AccordionTrigger
              className={`text-darkBlue md:text-lg font-medium md:p-[18px] p-3 bg-lightBlue max-md:rounded-[8px\]`}
            >
              {item.name?.[locale]}
            </AccordionTrigger>
            <AccordionContent className="grid grid-cols-2 gap-y-2.5 justify-between items-center">
              {durationTags?.map((country: any, index: number) => (
                <div
                  key={index}
                  className="flex gap-2 px-6 items-center pt-2.5"
                >
                  <input
                    type="radio"
                    className="w-3.5 h-3.5 hover:cursor-pointer"
                    id={country.slug.current}
                    checked={isSelected(country.slug.current) ? true : false}
                    onClick={() => {
                      handleTagClick(country.slug.current)
                      isSelected(country.slug.current ? "true" : "false")
                    }}
                  />
                  <label
                    className="text-xs text-grey font-medium whitespace-nowrap hover:cursor-pointer"
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
    </div>
  )
}
