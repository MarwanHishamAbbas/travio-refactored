import { cn } from "@/lib/utils"
import { HTMLAttributes, type FC } from "react"

interface MaxWidthProps extends HTMLAttributes<HTMLDivElement> {}

const MaxWidth: FC<MaxWidthProps> = ({ children, className, ...props }) => {
  return (
    <div className={cn("max-w-7xl mx-auto px-3", className)} {...props}>
      {children}
    </div>
  )
}

export default MaxWidth
