/* eslint-disable @next/next/no-img-element */
import React from "react"
// import LatestArticle from "../pages/BlogPage/LatestArticles";
import Image from "next/image"
import Link from "next/link"
import { wantToTn, tailTourTn, sidebarFooterTn } from "@/lib/utils"
import MaxWidth from "@/components/common/MaxWidth"
import { urlFor } from "@/lib/sanity/sanity-image"
import { Button } from "@/components/ui/button"

// const Search = () => (
//   <svg
//     width="32"
//     height="32"
//     viewBox="0 0 32 32"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <rect
//       x="0.197266"
//       width="31.8025"
//       height="32"
//       rx="15.9012"
//       fill="#3FA9F5"
//     />
//     <path
//       d="M15.4889 9.28711C12.1831 9.28711 9.49023 11.98 9.49023 15.2858C9.49023 18.5916 12.1831 21.2898 15.4889 21.2898C16.9009 21.2898 18.1996 20.7949 19.2259 19.9733L21.7246 22.4707C21.8507 22.5916 22.0191 22.6583 22.1938 22.6565C22.3685 22.6547 22.5355 22.5846 22.6591 22.4612C22.7827 22.3377 22.853 22.1708 22.855 21.9962C22.8571 21.8215 22.7906 21.653 22.6699 21.5267L20.1712 19.0281C20.9935 18.0001 21.4889 16.6995 21.4889 15.2858C21.4889 11.98 18.7947 9.28711 15.4889 9.28711ZM15.4889 10.6205C18.0742 10.6205 20.1543 12.7006 20.1543 15.2858C20.1543 17.871 18.0742 19.9564 15.4889 19.9564C12.9037 19.9564 10.8236 17.871 10.8236 15.2858C10.8236 12.7006 12.9037 10.6205 15.4889 10.6205Z"
//       fill="white"
//     />
//   </svg>
// );

function BlogSidebar({ data, locale }: any) {
  // const tags = ["India", "Jaipur", "Rajasthan", "Monuments"];
  return (
    <MaxWidth className="text-darkBlue px-0">
      <div className="bg-lightBlue md:w-full md:max-w-[346px] mt-36 px-5 py-10 rounded-[16px]">
        {/* Search */}
        {/* <h4 className="font-semibold text-xl">Search articles</h4>
        <div className="border-[#FFBB0B] rounded-full my-1 w-[66px] md:border-b-[3px] border-b-2" />
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full my-2 rounded-2xl px-3 py-2"
          />
          <div className="absolute top-3 right-2">
            <Search />
          </div>
        </div>
        <hr className="my-5 opacity-40 text-grey" /> */}

        {/* Latest Articles */}
        <h4 className="font-semibold text-xl">{data[0]?.title?.[locale]}</h4>
        <div className="border-[#FFBB0B] rounded-full my-1 w-[66px] md:border-b-[3px] border-b-2" />
        <div className="flex flex-col gap-3 py-5">
          {data[0]?.articles.map((article: any, index: number) => {
            // return <LatestArticle data={data?.[0]?.articles} key={index} />;
            return (
              <Link
                key={index}
                href={`/${locale}/blog${article?.slug?.current}`}
                className="p-3 rounded-xl flex items-center md:justify-center gap-2 bg-white shadow-md"
              >
                <div className="min-w-[95px] min-h-[75px] h-full rounded-xl overflow-hidden relative">
                  <Image
                    src={urlFor(article?.cover_image?.asset?._ref)}
                    fill
                    alt=""
                    style={{ objectFit: "cover", aspectRatio: 1 }}
                  />
                </div>
                <p className="font-bold md:text-base text-[12px] leading-[18px]">
                  {article?.title?.[locale]}
                </p>
              </Link>
            )
          })}
        </div>

        <hr className="my-5 opacity-40 text-grey" />

        {/* Related Tours */}
        <h4 className="font-semibold text-xl">{data[1]?.title?.[locale]}</h4>
        <div className="border-[#FFBB0B] rounded-full my-1 w-[66px] md:border-b-[3px] border-b-2" />
        <div className="flex flex-col gap-3 py-5">
          {data[1]?.tours.map((tour: any, index: number) => {
            return (
              <>
                <Link
                  href={`/${locale}/tours${tour?.slug?.current}`}
                  key={index}
                  className="p-3 rounded-xl flex gap-2 bg-white shadow-md"
                >
                  <div className="w-[87px] min-h-[94px] h-full rounded-xl overflow-hidden relative">
                    <Image
                      src={urlFor(tour?.hero_section?.image?.asset?._ref)}
                      quality={100}
                      fill
                      alt=""
                      style={{ objectFit: "cover", aspectRatio: 1 }}
                    />
                  </div>

                  <div className="max-w-[203px]">
                    <p className="font-bold md:text-base text-[12px] leading-[18px]">
                      {tour?.hero_section?.title?.[locale]}
                    </p>
                    <div className="grid grid-cols-2 mt-2">
                      <div className="flex gap-2 items-center">
                        <Image
                          src="/demo/calendar.svg"
                          height={18}
                          width={18}
                          alt="calendar"
                        />
                        <p className="md:text-[14px] font-medium md:leading-[22px] text-[10px] leading-[18px]">
                          {tour?.overview_card?.duration?.[locale]}
                        </p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Image
                          src="/demo/globe.svg"
                          height={18}
                          width={18}
                          alt="calendar"
                        />
                        <p className="md:text-[14px] font-medium md:leading-[22px] text-[10px] leading-[18px]">
                          {tour?.overview_card?.countries} countries
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <p className="line-through font-bold text-grey md:text-[12px] text-[10px] leading-5">
                        $
                        {tour.price_overrides[0].price.discounted_price[locale]}
                      </p>
                      <p className="font-bold text-destructive md:text-[12px] text-[10px] leading-5">
                        From $
                        {
                          tour?.price_overrides[0].price.discounted_price?.[
                            locale
                          ]
                        }
                      </p>
                    </div>
                  </div>
                </Link>
              </>
            )
          })}
        </div>

        <hr className="my-5 opacity-40 text-grey" />

        {/* Own tour */}
        {/* @ts-ignore */}

        <h4 className="font-semibold text-xl">{wantToTn?.[locale]}</h4>
        <div className="border md:border-b-[3px] w-[66px] border-b-2 rounded-full my-1 border-[#FFBB0B]" />
        <Link href={`/${locale}/tailor_your_tour`}>
          <Button className="my-5 py-3 w-full rounded-full">
            {/* @ts-ignore */}
            {tailTourTn?.[locale]}
          </Button>
        </Link>

        <hr className="my-5 opacity-40 text-grey" />

        {/* Tagd */}
        {/* <h4 className="font-semibold text-xl">Tags</h4>
        <div className="border md:border-b-[3px] w-[66px] border-b-2 rounded-full my-1 border-[#FFBB0B]" />
        <div className="flex flex-wrap gap-2 py-5">
          {tags.map((tag, index) => {
            return (
              <div
                key={index}
                className="rounded-md border border-darkBlue border-opacity-10 bg-white p-2 text-grey font-medium"
              >
                {tag}
              </div>
            );
          })}
        </div>
        <hr className="my-5 opacity-40 text-grey" />  */}
        <div className="flex flex-col items-center gap-6">
          <img
            src="/Traviio.png"
            className="max-w-[138px] min-h-[30px]"
            alt="logo"
          />
          <p className="md:text-darkBlue text-grey text-[12px] leading-5 md:text-[16px] md:leading-7 text-center">
            {/* @ts-ignore */}
            {sidebarFooterTn?.[locale]}
          </p>
        </div>
      </div>
    </MaxWidth>
  )
}

export default BlogSidebar
