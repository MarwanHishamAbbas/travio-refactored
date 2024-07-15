import React from "react"
import Image from "next/image"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
interface BlogChooseProps {
  items: {
    title: string
    link: string
    images: string[]
  }[]
}

function BlogChoose(props: BlogChooseProps) {
  const { items } = props

  const searchParams = useSearchParams()

  const isSelected = (item: any) =>
    searchParams?.getAll("tag").includes(item?.link?.toLowerCase())

  const router = useRouter()

  const pathname = usePathname()

  const handleTagClick = (item: any) => {
    const existingTags = searchParams?.getAll("tag")
    const newTags = Array.isArray(existingTags) ? existingTags : []
    const tag = item.link.toLowerCase()
    if (newTags.includes(tag)) {
      newTags.splice(newTags.indexOf(tag), 1)
    } else {
      newTags.push(tag)
    }
    if (pathname) {
      router.push(`${pathname}?${newTags.map((t) => `tag=${t}`).join("&")}`, {
        scroll: false,
      })
    }
  }

  return (
    <div className="flex gap-4 my-12 flex-wrap">
      {items.map((item, index) => (
        <a
          key={index}
          onClick={() => handleTagClick(item)}
          className="cursor-pointer"
          role="button" // Add ARIA role
          aria-label={`Toggle tag ${item.title}`} // Add ARIA label
          aria-pressed={isSelected(item) ? "true" : "false"} // Add ARIA pressed state
          tabIndex={0}
        >
          <BlogButton
            title={item.title}
            images={item.images}
            selected={isSelected(item)}
          />
        </a>
      ))}
    </div>
  )
}

export interface BlogButtonProps {
  title: string
  images: string[]
  selected?: boolean
}

function BlogButton(props: BlogButtonProps) {
  const { title, images, selected } = props
  return (
    <div
      className={`w-fit flex items-center font-satoshi md:h-[42px] h-[28px] justify-center gap-2 md:py-3 md:px-4 px-3 rounded-md border-gray ${
        selected
          ? " bg-[#3FA9F5] "
          : " bg-transparent border-2 border-opacity-10"
      }`}
    >
      {images?.map((image, index) => {
        return (
          <Image src={image} height={18} width={18} alt={title} key={index} />
        )
      })}
      <p
        className={`md:text-[14px] md:leading-[18px] text-[12px] leading-5 md:font-medium font-normal whitespace-nowrap ${
          selected ? "text-white" : "text-grey"
        }`}
      >
        {title}
      </p>
    </div>
  )
}

export default BlogChoose
