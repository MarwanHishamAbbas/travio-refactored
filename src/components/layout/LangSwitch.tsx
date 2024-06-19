"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { i18n } from "@/language"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

export default function LangSwitch({ locale }: { locale: string }) {
  const pathname = usePathname()

  const redirectedPathName = (locale: string) => {
    if (!pathname) return "/"
    const segments = pathname.split("/")
    segments[1] = locale
    return segments.join("/")
  }

  const flags = {
    en: "/languages/en.svg",
    es: "/languages/es.png",
    por: "/languages/por.png",
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={"sm"}
          variant="secondary"
          className="rounded-full flex items-center gap-1 "
        >
          {" "}
          {/* @ts-expect-error */}
          <Image src={flags[locale]} width={22} height={22} alt="Flag" />
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        {i18n.languages.map((lang) => (
          <DropdownMenuCheckboxItem key={lang.id}>
            <Link
              href={redirectedPathName(lang.id)}
              className=" w-full flex gap-1"
            >
              {/* @ts-expect-error */}
              <Image src={flags[lang.id]} width={25} height={25} alt="Flag" />
              {/* @ts-expect-error */}
              {lang.title[locale]}
            </Link>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
