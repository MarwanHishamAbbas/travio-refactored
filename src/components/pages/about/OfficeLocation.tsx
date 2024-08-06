/* eslint-disable @next/next/no-img-element */
import React from "react"
import styled from "styled-components"

import useWindowSize from "@/hooks/useWindows"
import { urlFor } from "@/lib/sanity/sanity-image"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  margin-top: 80px;
  margin-bottom: 80px;

  .title {
    display: flex;
    flex-direction: column;
    padding: 0px 60px 0px 60px;
  }

  @media (max-width: 578px) {
    gap: 40px;
    margin-top: 50px;
    margin-bottom: 50px;

    .title {
      justify-content: center;
      align-items: center;
    }
  }
`

const Title = styled.p`
  font-family: var(--font-satoshi);

  font-size: 30px;
  font-weight: 600;
  line-height: 40px;
  letter-spacing: 0em;
  text-align: left;
  color: #140d31;

  @media (max-width: 1024px) {
    /* padding: 0px 40px 0px 40px; */
    font-size: 24px;
    line-height: 32px;
  }
`

const LocationsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f2faff;
  gap: 10px;
  padding: 28px 80px 28px 80px;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 40px;
    padding: 20px 40px 20px 40px;
  }

  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 320px) {
    padding: 5px;
  }
`

const TextImgWrapper = styled.div`
  display: flex;
  gap: 16px;

  img {
    width: 140px;
    height: 135px;
    border-radius: 8px;
    object-fit: cover;
  }

  @media (max-width: 578px) {
    gap: 12px;

    img {
      width: 110px;
      height: 120px;
    }
  }
`

const InformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 425px) {
    gap: 7px;
  }
`

const LocationTxt = styled.p`
  color: #140d31;
  font-size: 16px;
  font-family: var(--font-satoshi);
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0.32px;
  word-wrap: break-word;

  @media (max-width: 578px) {
    font-weight: 600;
  }
`

const IconTxtWrapper = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 578px) {
    gap: 4px;
  }
`

const InformTxt = styled.a`
  color: #726e83;
  font-size: 14px;
  font-family: var(--font-satoshi);
  font-weight: 400;
  line-height: 20px;
  word-wrap: break-word;

  @media (max-width: 578px) {
    font-size: 12px;
    line-height: 20px;
  }
`

const Divider = styled.hr`
  width: 100%;
  height: 100%;
  opacity: 0.1;
  border: 0.5px solid #1a4767;
`

const Location = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_6886_9271)">
      <path
        d="M10.0002 3.3335C6.3335 3.3335 3.3335 6.3335 3.3335 10.0002C3.3335 14.5002 9.16683 19.5835 9.41683 19.8335C9.75016 20.0835 10.1668 20.0835 10.5002 19.8335C10.8335 19.5835 16.6668 14.5002 16.6668 10.0002C16.6668 6.3335 13.6668 3.3335 10.0002 3.3335ZM10.0002 13.3335C8.16683 13.3335 6.66683 11.8335 6.66683 10.0002C6.66683 8.16683 8.16683 6.66683 10.0002 6.66683C11.8335 6.66683 13.3335 8.16683 13.3335 10.0002C13.3335 11.8335 11.8335 13.3335 10.0002 13.3335Z"
        fill="#726E83"
      />
    </g>
    <defs>
      <clipPath id="clip0_6886_9271">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

const Phone = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.4272 11.8856C13.0156 13.1362 11.4032 13.7602 10.2512 13.6562C8.67783 13.514 6.96581 12.6793 5.66625 11.7602C3.75601 10.4091 1.96666 8.3193 0.923987 6.1015C0.187092 4.53438 0.0217572 2.60725 1.11777 1.1788C1.5231 0.650794 1.96222 0.369014 2.62 0.336125C3.53379 0.29168 3.66179 0.814351 3.97557 1.62858C4.20935 2.23747 4.52135 2.85881 4.69557 3.48993C5.0218 4.66772 3.88134 4.7166 3.73734 5.67928C3.64845 6.28639 4.38357 7.10062 4.71602 7.53352C5.35681 8.37661 6.14164 9.09975 7.03426 9.66953C7.54093 9.98865 8.35693 10.5638 8.93649 10.2464C9.82895 9.75753 9.74539 8.25263 10.9925 8.76197C11.6387 9.02508 12.2645 9.40464 12.8814 9.73709C13.8352 10.25 13.7908 10.7815 13.4272 11.8856C13.6992 11.0607 13.1552 12.7104 13.4272 11.8856Z"
      fill="#726E83"
    />
  </svg>
)

const Mail = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.499 6.68923V13.6615C17.5003 13.6814 17.5003 13.7013 17.499 13.7212L13.2306 9.91719L17.499 6.68923ZM7.61536 9.58505L9.06327 10.6801C9.33323 10.8834 9.66202 10.9934 10 10.9934C10.338 10.9934 10.6668 10.8834 10.9367 10.6801L12.3846 9.58505L17.3278 5.84851C17.1975 5.5936 16.9995 5.37953 16.7555 5.22984C16.5115 5.08014 16.231 5.00062 15.9447 5H4.05526C3.769 5.00062 3.48846 5.08014 3.24446 5.22984C3.00047 5.37953 2.80246 5.5936 2.67222 5.84851L7.61536 9.58505ZM2.50096 6.68923V13.6615C2.49968 13.6814 2.49968 13.7013 2.50096 13.7212L6.76944 9.91719L2.50096 6.68923ZM11.4064 11.295C11.0012 11.6007 10.5075 11.766 10 11.766C9.49248 11.766 8.99877 11.6007 8.59361 11.295L7.40518 10.3946L2.76823 14.5282C2.91153 14.7402 3.10488 14.9136 3.33118 15.0331C3.55748 15.1526 3.80974 15.2145 4.06564 15.2132H15.9447C16.2006 15.2145 16.4529 15.1526 16.6792 15.0331C16.9055 14.9136 17.0988 14.7402 17.2422 14.5282L12.5948 10.3946L11.4064 11.295Z"
      fill="#726E83"
    />
  </svg>
)

const OfficeLocations = ({ title, data, locale }: any) => {
  const windowSize = useWindowSize()
  const isLaptop = windowSize.width < 1025

  const isMobile = windowSize.width < 768

  return (
    <Wrapper>
      <div className="title">
        <Title>{title}</Title>
        <div className="md:border-b-[3px] border-b-2 border-b-[#FFBB0B] md:w-[117px] w-[89px]" />
      </div>

      <LocationsWrapper>
        {data.map((data: any, index: number, array: any) => (
          <>
            <TextImgWrapper key={data._key}>
              <img
                src={urlFor(
                  isMobile
                    ? data?.image?.mobile?.asset?._ref
                    : data?.image.asset._ref
                )}
                alt={`Locations Pic-${data._key}`}
              />
              <InformationWrapper>
                <LocationTxt>{data.title?.[locale]}</LocationTxt>

                <IconTxtWrapper>
                  <Location />
                  <InformTxt
                    href={`https://www.google.com/maps?q=${encodeURIComponent(
                      data.address
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {data.address?.[locale]}
                  </InformTxt>
                </IconTxtWrapper>

                <IconTxtWrapper>
                  <Phone />
                  <InformTxt
                    href={`tel:${encodeURIComponent(
                      data.phone.en
                        .replace(/[^\d]/g, "")
                        .replace(/(\d{3})(\d{4})(\d{5})/, "+$1 $2 $3")
                    )}`}
                  >
                    {data.phone[locale]}
                  </InformTxt>
                </IconTxtWrapper>

                <IconTxtWrapper>
                  <Mail />
                  <InformTxt
                    href={`mailto:${encodeURIComponent(
                      data.email.en.replace(/[^\x20-\x7E]/g, "")
                    )}`}
                    target="_blank"
                  >
                    {data.email[locale]}
                  </InformTxt>
                </IconTxtWrapper>
              </InformationWrapper>
            </TextImgWrapper>
            {isLaptop && index !== array.length - 1 && <Divider />}
          </>
        ))}
      </LocationsWrapper>
    </Wrapper>
  )
}

export default OfficeLocations
