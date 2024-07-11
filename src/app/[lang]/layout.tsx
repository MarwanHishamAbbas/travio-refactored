import type { Metadata } from "next"

import "../globals.css"
// import Navbar from "@/components/layout/Navbar"
// import { getBaseLayout } from "@/query/layout"
import { TRPCReactProvider } from "@/trpc/TRPCProvider"
import localFont from "next/font/local"
const satoshiVariable = localFont({
  src: [
    {
      path: "../../fonts/satoshi/Satoshi-Variable.woff2",
      style: "normal",
    },
    {
      path: "../../fonts/satoshi/Satoshi-Black.woff2",
      style: "black",
      weight: "900",
    },
    {
      path: "../../fonts/satoshi/Satoshi-Bold.woff2",
      style: "bold",
      weight: "700",
    },
    {
      path: "../../fonts/satoshi/Satoshi-Light.woff2",
      style: "light",
      weight: "300",
    },
    {
      path: "../../fonts/satoshi/Satoshi-Medium.woff2",
      style: "medium",
      weight: "500",
    },
  ],
  variable: "--font-satoshi",
})

const montserratFont = localFont({
  src: [
    {
      path: "../../fonts/montserrat/Montserrat-Black.woff2",
      weight: "900",
      style: "black",
    },
    {
      path: "../../fonts/montserrat/Montserrat-Bold.woff2",
      weight: "700",
      style: "bold",
    },
    {
      path: "../../fonts/montserrat/Montserrat-ExtraBold.woff2",
      weight: "800",
      style: "extrabold",
    },
    {
      path: "../../fonts/montserrat/Montserrat-Light.woff2",
      weight: "300",
      style: "light",
    },
    {
      path: "../../fonts/montserrat/Montserrat-Medium.woff2",
      weight: "500",
      style: "medium",
    },
    {
      path: "../../fonts/montserrat/Montserrat-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/montserrat/Montserrat-SemiBold.woff2",
      weight: "600",
      style: "semibold",
    },
    {
      path: "../../fonts/montserrat/Montserrat-Thin.woff2",
      weight: "100",
      style: "thin",
    },
    {
      path: "../../fonts/montserrat/Montserrat-ExtraLight.woff2",
      weight: "200",
      style: "extralight",
    },
  ],
  variable: "--font-montserrat",
})

const novo = localFont({
  src: "../../fonts/ProximaNovaRegular.woff",
  variable: "--font-nova",
})

const plain = localFont({
  src: "../../fonts/Plain.woff",
  variable: "--font-plain",
})

export const metadata: Metadata = {
  title: "Traviio Tours",
  description: "Traviio Tours",
  openGraph: {
    images:
      "https://travel-tour-ya83.vercel.app/_next/static/media/logo.5f25ce06.png",
    url: "https://www.promotravel.tours/en/",
    type: "website",
  },
  keywords:
    "travel, tour, app, destination, trip, book, favorite, destination, travel and tour app, travel and tour, travel app, tour app, travel and tour app,",
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: {
    lang: string
  }
}>) {
  // const content = await getBaseLayout()
  return (
    <html lang="en">
      <body
        className={`${satoshiVariable.variable} ${montserratFont.variable} ${novo.variable} ${plain.variable}`}
      >
        <TRPCReactProvider>
          {/* <Navbar content={content} locale={params.lang} /> */}
          <div>{children}</div>
        </TRPCReactProvider>
      </body>
    </html>
  )
}
