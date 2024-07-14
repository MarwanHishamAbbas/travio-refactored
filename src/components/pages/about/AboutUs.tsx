/* eslint-disable @next/next/no-img-element */
import MaxWidth from "@/components/common/MaxWidth"
import React from "react"
import styled from "styled-components"
// import { PortableText } from "@portabletext/react";

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
  margin-top: 48px;

  @media (max-width: 578px) {
    margin-top: 30px;
  }
`

const Text1 = styled.p`
  font-family: var(--font-satoshi);
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0em;
  text-transform: uppercase;
  color: #3fa9f5;

  @media (max-width: 578px) {
    font-size: 12px;
    line-height: 20px;
  }
`

const Text2 = styled.p`
  font-family: var(--font-satoshi);
  font-size: 40px;
  font-weight: 600;
  line-height: 50px;
  letter-spacing: 0px;
  color: #140d31;

  @media (max-width: 578px) {
    font-size: 24px;
    line-height: 32px;
  }
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  /* margin-top: 28px; */
`

const WelcomeText = styled.p`
  font-family: var(--font-satoshi);
  font-size: 16px;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0.02em;
  color: #140d31;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }

  @media (max-width: 578px) {
    font-size: 14px;
    line-height: 24px;
  }
`

const TextImgWrapper = styled.div`
  min-width: 100%;
`

const ExpertiesText = styled.p`
  font-family: var(--font-satoshi);
  font-size: 16px;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0.02em;
  color: #140d31;

  @media (max-width: 578px) {
    font-size: 14px;
    line-height: 24px;
  }
`

const TextImageContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: start;
  img {
    object-fit: cover;
    border-radius: 16px;
  }

  @media (max-width: 768px) {
    img {
      width: 100%;
      height: 300px;
    }
  }

  @media (max-width: 578px) {
    img {
      width: 100%;
      height: 200px;
    }
  }

  @media (max-width: 1024px) {
    flex-direction: column-reverse;
    gap: 18px;
  }
`

const ImgAlt = styled.p`
  font-family: var(--font-satoshi);
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0em;
  color: #140d31bf;
  text-align: center;
`

const MeetTeam = {
  en: "Meet the team at the Cairo office",
  es: "Conoce al equipo en la oficina de El Cairo",
  por: "Conheça a equipe no escritório do Cairo",
}

const AboutUs = ({ data, locale }: any) => {
  return (
    <MaxWidth className="px-0">
      <TitleWrapper>
        {/* <Text1>{data.tagline?.[locale]}</Text1>
      <Text2>{data.title?.[locale]}</Text2> */}
        <Text1>{data.tagline?.[locale]}</Text1>
        <Text2>{data.title?.[locale]}</Text2>
        <div className="md:border-b-[3px] border-b-2 border-b-[#FFBB0B] md:w-[117px] w-[89px]" />

        <Container className="md:mt-12 mt-[30px]">
          <WelcomeText>
            {data?.content?.[locale][0]?.children[0]?.text}
            {/* <PortableText value={data.content?.[locale]} /> */}
          </WelcomeText>
          <TextImageContainer>
            <Container>
              <TextImgWrapper>
                <ExpertiesText>
                  {data?.content?.[locale][1]?.items[1]?.items[0]?.text}
                </ExpertiesText>
              </TextImgWrapper>
              <TextImgWrapper>
                <ExpertiesText>
                  {data?.content?.[locale][1]?.items[1]?.items[1]?.text}
                </ExpertiesText>
              </TextImgWrapper>
            </Container>
            <Container>
              <img
                src={"/demo/team.png"}
                className="md:max-w-[619px] md:min-h-[296px] max-w-[335px] min-h-[161px] max-md:border-none"
                alt="Group Image"
              />
              {/* @ts-ignore */}
              <ImgAlt>“{MeetTeam[locale]}”</ImgAlt>
            </Container>
          </TextImageContainer>
        </Container>
      </TitleWrapper>
    </MaxWidth>
  )
}

export default AboutUs
