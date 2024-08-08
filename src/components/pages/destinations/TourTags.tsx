import { Button } from "@/components/ui/button"
import { FC, useCallback } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

interface tagProps {
  _id: string
  slug: string
  name: any
}

interface Props {
  data: tagProps[]
  locale: string
}

const ToureTags: FC<Props> = ({ data, locale }) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isSelected = (item: string) =>
    searchParams?.getAll("tags").includes(item?.toLowerCase())

  const createQueryString = useCallback(
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
    <div className="mt-4 flex gap-2.5 max-w-full overflow-x-auto">
      {data.map((tag: any, index: number) => (
        <Button
          key={tag._id}
          id={tag._id}
          variant="outline"
          className={`rounded-full text-grey text-xs max-md:text-[12px] font-medium max-md:h-7
                    ${isSelected(tag.slug?.current) ? " bg-[#3FA9F5] text-white" : "bg-white"}
                    `}
          onClick={() =>
            router.push(
              pathname + "?" + createQueryString("tags", tag.slug.current),
              { scroll: false }
            )
          }
          aria-label={`Toggle tag ${tag.name?.[locale]}`}
          aria-pressed={isSelected(tag.slug?.current) ? "true" : "false"}
          tabIndex={0}
        >
          {tag.name?.[locale]}
        </Button>
      ))}
    </div>
  )
}

export default ToureTags
