import { i18n } from "@/language"
import { NextRequest, NextResponse } from "next/server"
import Negotiator from "negotiator"
import { match } from "@formatjs/intl-localematcher"

const locales: string[] = i18n.languages.map((l) => l.id)

function getLocale(request: NextRequest): string | undefined {
  const acceptedLanguage = request.headers.get("accept-language") ?? undefined
  let headers = { "accept-language": acceptedLanguage }

  let languages = new Negotiator({ headers }).languages()

  return match(languages, locales, i18n.base as string)
}

export async function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(new URL(`/${locale}/${pathname}`, request.url))
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, assets, api)
    "/((?!api|_next|studio|.*\\..*).*)",
    "/",
    // Optional: only run on root (/) URL
    // '/'
  ],
}
