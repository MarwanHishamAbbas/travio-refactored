import { type FC } from "react"
import MaxWidth from "../common/MaxWidth"
import { AlignRight, ChevronDown } from "lucide-react"
import { getBaseLayout } from "@/query/layout"
import Image from "next/image"
import { urlFor } from "@/lib/sanity/sanity-image"
import { NavLink } from "@/types/sanity"
import LangSwitch from "./LangSwitch"
import Link from "next/link"
import DestinationsMenu from "./DestinationsMenu"

interface NavbarProps {
  locale: string
}

const Navbar: FC<NavbarProps> = async ({ locale }) => {
  const content = await getBaseLayout()

  return (
    <header>
      <div className="bg-lightBlue justify-end h-8 hidden md:flex">
        <MaxWidth className=" flex items-center justify-end w-full">
          <div className="flex gap-2 items-center">
            <Image
              src={"/icons/whatsapp_logo.svg"}
              width={25}
              height={25}
              alt="Whatsapp Logo"
            />
            <p className="text-xs md:text-sm">
              {content.banner.watts_banner.contact_number}
            </p>
          </div>
        </MaxWidth>
      </div>
      <div className="h-16 flex items-center">
        <MaxWidth className="flex items-center justify-between w-full ">
          <Image
            src={urlFor(content.navbar.logo)}
            alt="Image"
            width={140}
            height={70}
          />
          <ul className="md:flex items-center gap-6 hidden text-sm">
            {content.navbar.links.map((link: NavLink, idx: number) => {
              if (link._type !== "link")
                return (
                  <DestinationsMenu
                    key={idx}
                    locale={locale}
                    destinationsLinks={link}
                  />
                )
              return (
                <Link href={`/${locale}/${link.url}`} key={idx} className="">
                  {/* @ts-expect-error */}
                  {link.text[locale]}
                </Link>
              )
            })}
          </ul>
          <div className="hidden md:block">
            <LangSwitch locale={locale} />
          </div>
          <div className="md:hidden flex items-center gap-2">
            <Image
              src={"/icons/whatsapp_logo.svg"}
              width={30}
              height={30}
              className="md:hidden"
              alt="Whatsapp Logo"
            />
            <LangSwitch locale={locale} />
            <AlignRight />
          </div>
        </MaxWidth>
        {/* Promo Banner */}
      </div>
      {content.banner.promo_banner.show && (
        <div className="bg-darkBlue text-white md:h-8 flex items-center py-1">
          <MaxWidth className="text-xs md:text-sm flex items-center flex-wrap justify-center gap-1">
            <p>{content.banner.promo_banner.text[locale]}</p>
            <Link
              href={`/${locale}/${content.banner.promo_banner.link.url}`}
              className="underline"
            >
              {content.banner.promo_banner.link.text[locale]}
            </Link>
          </MaxWidth>
        </div>
      )}
    </header>
  )
}

export default Navbar
