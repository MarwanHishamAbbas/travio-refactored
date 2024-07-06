import { FC } from "react"

interface SectionHeaderProps {
  title: string
  subtitle: string
  centerLine?: boolean
  content?: any
}

const SectionHeader: FC<SectionHeaderProps> = ({
  title,
  subtitle,
  centerLine,
  content,
}) => {
  return (
    <div
      id="section-header"
      className={`flex flex-col mb-8
      ${centerLine ? "items-center text-center" : ""}
      `}
    >
      <div className="flex flex-col">
        <span className="font-medium uppercase text-xs md:text-sm text-primary">
          {title}
        </span>
        <h1 className="font-bold  md:text-4xl text-2xl mt-2 mb-1">
          {subtitle}
        </h1>
      </div>
      <div className="w-[65px] md:w-[100px] border-[#FFBB0B] text-yellow rounded-full md:rounded-[3px] border-b-[3px]" />
      <div className="mt-5 w-3/4 mx-auto">
        <h1 className="md:text-base leading-6 text-sm">{content}</h1>
      </div>
    </div>
  )
}

export default SectionHeader
