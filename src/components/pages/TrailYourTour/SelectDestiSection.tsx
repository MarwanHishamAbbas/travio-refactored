import { urlFor } from "@/lib/sanity/sanity-image"
import Image from "next/image"
// import { tailorArray } from "./data";
import styled from "styled-components"

const Root = styled.div`
  .img-wraper {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 20px;
    padding: 0 20px;
  }

  .name-85 {
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 0;
    padding: 6px 16px;
    width: fit-content;
    border-radius: 30px;
    /* backdrop-filter: blur(10px); */
    color: white;
    font-weight: 700;
  }

  @media (max-width: 1024px) {
    .img-wraper {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 768px) {
    .img-wraper {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    #qwa {
      height: 150px;
    }

    .name-85 {
      bottom: 5px;
      left: 5px;
      padding: 6px 16px;
      font-size: 14px;
      font-weight: 700;
    }

    @media (max-width: 375px) {
      .img-wraper {
        padding: 0px;
      }
    }
  }
`
const SelectDestinationSection = ({
  setSelectedDestination,
  selectedDestination,
  tours,
  locale,
}: any) => {
  return (
    <Root>
      <div className="img-wraper">
        {tours.map((item: any, index: number) => {
          const w = index % 3 < 2 ? 250 : 500
          const h = index % 3 < 2 ? 150 : 224

          return (
            <div
              key={index}
              onClick={() => setSelectedDestination(item.title?.[locale])}
              id="qwa"
              className={`relative w-full h-[224px] rounded-xl overflow-hidden cursor-pointer 
                                        ${
                                          w === 500
                                            ? "lg:col-span-2"
                                            : "col-span-1"
                                        }`}
            >
              <Image
                src={urlFor(item?.image?.asset?._ref)}
                width={w}
                height={h}
                className="object-cover object-center w-full h-full max-sm:hidden"
                alt={item?.title?.alt?.[locale]}
                quality={100}
              />
              <Image
                src={urlFor(item?.image?.mobile?.asset?._ref)}
                width={w}
                height={h}
                className="object-cover object-center w-full h-full sm:hidden"
                alt={item?.title?.alt?.[locale]}
                quality={100}
              />

              <h1
                className={`name-85 font-satoshi
                                        ${
                                          selectedDestination.includes(
                                            item?.title?.[locale]
                                          )
                                            ? "bg-[#3FA9F5]"
                                            : "bg-white/40 backdrop-blur"
                                        }`}
              >
                {item?.title?.[locale]}
              </h1>
            </div>
          )
        })}
      </div>
    </Root>
  )
}

export default SelectDestinationSection
