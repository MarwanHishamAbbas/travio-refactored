import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textVariants = cva("", {
  variants: {
    variant: {
      default: "text-primary",
      destructive: "text-destructive",
      darkblue: "text-darkBlue",
      tertiary: "text-tertiary",
      gray: "text-gray",
      paragraph: "text-topic",
    },

    font: {
      default: "font-satoshi",
      // black: "font-staoshiblack",
      montserrat: "font-montserrat",
      nova: "font-nova",
      // plain: "font-plain",
      secondary: "font-outfit",
    },
    fontWeight: {
      "100": "font-thin",
      "200": "font-extralight",
      "300": "font-light",
      default: "font-normal",
      "500": "font-medium",
      "600": "font-semibold",
      "700": "font-bold",
      "800": "font-extrabold",
      "900": "font-black",
    },

    // size: {
    //   default: "text-base", // fon-size = 16x line-height: 24px;
    //   extraSm: "text-extraSm", // 10px and 12px
    //   xss: "text-xs", // font-size = 12x line-height: 20px;
    //   xs: "text-xs", // 14px and 24px
    //   smm: "text-smm", // font-size = 14pxpx / line-height: 22px
    //   sm: "text-sm", // font-size = 14x line-height: 20px;
    //   lg: "text-lg", // font-size = 18x line-height: 28px.
    //   xl: "text-xl", // font-size = 20x and 28px
    //   xll: "text-xll", // 20px and 32 px
    //   "2xl": "text-2xl", // 24px and 32px
    //   hero: "text-hero", // 56px and 76px
    //   h1: "text-heading", // 40px and 50px
    // },
  },
  defaultVariants: {
    variant: "default",
    font: "default",
    // size: "default",
    fontWeight: "default",
  },
})

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  asChild?: boolean
  as?: React.ElementType // prop for the HTML element type
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  (
    {
      className,
      font,
      fontWeight,
      variant,
      asChild = false,
      as = "p",
      ...props
    },
    ref
  ) => {
    const Comp: React.ElementType | any = asChild ? Slot : as

    // Filter out undefined and null values from props
    const filteredProps: React.HTMLAttributes<HTMLParagraphElement> =
      Object.fromEntries(
        Object.entries(props).filter(
          ([_, value]) => value !== undefined && value !== null
        )
      )

    return (
      <Comp
        className={cn(textVariants({ variant, className, font, fontWeight }))}
        ref={ref}
        {...filteredProps}
      />
    )
  }
)

Text.displayName = "Text"

export { Text, textVariants }
