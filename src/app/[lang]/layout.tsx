import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import Navbar from "@/components/layout/Navbar"

const inter = Inter({ subsets: ["latin"] })

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

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: {
    lang: string
  }
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar locale={params.lang} />
        <div>{children}</div>
      </body>
    </html>
  )
}
