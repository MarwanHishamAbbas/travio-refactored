import { ReactNode } from "react"
import { SanityGlobals } from "@/types/sanity"

import Breadcrumbs, { Breadcrumb } from "@/components/common/BreadCrumb"
import Footer from "./Footer/Footer"

const Layout = ({
  children,
  globals,
  breadcrumbs,
  promo_banner,
  locale,
  head,
  maxWidth = true,
}: {
  children: ReactNode
  globals?: SanityGlobals
  breadcrumbs: Breadcrumb[]
  promo_banner?: any
  locale: any
  head?: any
  maxWidth?: boolean
}) => {
  return (
    <div className="bg-white">
      <div
        className="overflow-x-hidden text-black min-h-screen  flex flex-col"
        style={{
          width: process.env.NEXT_PUBLIC_DEVELOPMENT ? "" : "",
        }}
      >
        <main
          className={`grow w-full ${maxWidth ? "max-w-7xl mx-auto " : "w-full"}`}
        >
          <Breadcrumbs paths={breadcrumbs} locale={locale} />
          {children}
        </main>
        <Footer footer={globals?.footer} language={locale} />
      </div>
    </div>
  )
}

export default Layout
