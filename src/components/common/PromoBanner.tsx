import Link from "next/link"
import { usePathname } from "next/navigation"

function PromoBanner({ banner, locale }: { banner?: any; locale: string }) {
  const pathname = usePathname()

  if (!banner) return null
  const url = `/${locale}`

  const isHome = pathname === url

  return (
    <div
      className={`max-md:min-h-[32px] font-satoshi min-h-[40px] flex flex-col items-center justify-center z-10 text-white bg-darkBlue ${
        isHome &&
        "rounded-t-[24px] max-xl:rounded-none relative z-20 max-w-[1280px] w-full mx-auto"
      }`}
    >
      <div>
        <div className={"font-medium text-[12px] md:text-sm text-center "}>
          {banner.promo_banner.text?.[locale]}
          <Link
            href={banner.promo_banner.link.url}
            className="underline cursor-pointer font-bold"
          >
            {banner.promo_banner.link?.text?.[locale]}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PromoBanner
