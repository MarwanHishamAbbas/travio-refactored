import MaxWidth from "@/components/common/MaxWidth"
import { Carousel, CarouselContent } from "@/components/ui/carousel"
import { urlFor } from "@/lib/sanity/sanity-image"
import Image from "next/image"
import Link from "next/link"

export type GallerySectionProps = {
  // data: SanityGallerySection
  data: any
  banner?: any
  locale: string
  forTourPage?: boolean
}

const Gallery = (props: GallerySectionProps) => {
  const {
    data: { title, subtitle, images },
    locale,
    forTourPage,
  } = props

  return (
    <div className="mt-10 py-8 bg-lightBlue">
      <MaxWidth className="mb-6">
        <h2
          id="triphighlights"
          className={`${
            forTourPage
              ? "md:text-left text-center text-2xl"
              : "text-center text-2xl md:text-4xl"
          } font-satoshi text-darkblue font-bold`}
        >
          {title[locale]}
        </h2>
        {forTourPage && (
          <div className="border-b-orange max-md:hidden mt-[10px] ml-[107px] w-[122px] border-b-[3px]" />
        )}

        <p
          className={`${
            forTourPage
              ? "md:pl-[107px] md:mt-3 px-5 max-md:text-center"
              : "text-center px-5"
          } text-sm font-satoshi  md:text-lg text-grey `}
        >
          {subtitle[locale]?.substring(0, 5)[locale]}
          <span className="text-primary font-satoshi font-medium opacity-100">
            {subtitle[locale]?.substring(5, 32)}
          </span>
          {subtitle[locale]?.substring(32)}
        </p>
        {forTourPage ? null : (
          <Image
            quality={100}
            priority
            width={80}
            height={40}
            src={"/small-logo.svg"}
            alt={"small logo"}
            className={"mx-auto w-[80px] h-10"}
          />
        )}
      </MaxWidth>
      <Carousel className="bg-white">
        <CarouselContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 h-full">
          <div className="col-span-2 sm:col-span-1 md:col-span-2 bg-gray-50 h-auto md:h-full flex flex-col">
            <a
              href=""
              className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 flex-grow"
            >
              <Image
                src={urlFor(images[0])}
                alt=""
                width={1000}
                height={1000}
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
              />
            </a>
          </div>
          <div className="col-span-2 sm:col-span-1 md:col-span-2 bg-stone-50">
            <a
              href=""
              className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 mb-4"
            >
              <Image
                src={urlFor(images[1])}
                alt=""
                width={1000}
                height={1000}
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
              />
            </a>
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2">
              <Link
                href=""
                className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40"
              >
                <Image
                  src={urlFor(images[2])}
                  alt=""
                  width={1000}
                  height={1000}
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
              </Link>
              <Link
                href=""
                className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40"
              >
                <Image
                  src={urlFor(images[3])}
                  alt=""
                  width={1000}
                  height={1000}
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
              </Link>
            </div>
          </div>
          <div className="col-span-2 sm:col-span-1 md:col-span-1 bg-sky-50 h-auto md:h-full flex flex-col">
            <Link
              href=""
              className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 flex-grow"
            >
              <Image
                src={urlFor(images[4])}
                alt=""
                width={1000}
                height={1000}
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
              />
            </Link>
          </div>
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export default Gallery
