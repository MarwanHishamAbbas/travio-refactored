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

export default function LangSwitch({ locale }: { locale: string }) {
  const pathname = usePathname()

  const redirectedPathName = (locale: string) => {
    if (!pathname) return "/"
    const segments = pathname.split("/")
    segments[1] = locale
    return segments.join("/")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Language</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {i18n.languages.map((lang) => (
          <DropdownMenuCheckboxItem checked={lang.id === locale} key={lang.id}>
            <Link href={redirectedPathName(lang.id)} className=" w-full">
              {/* @ts-expect-error */}
              {lang.title[locale]}
            </Link>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
