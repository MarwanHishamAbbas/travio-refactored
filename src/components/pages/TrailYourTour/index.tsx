"use client"

import dynamic from "next/dynamic"
import Layout from "@/components/layout/Layout"
import { useCallback, useState } from "react"
import Steps from "./Steps"
const SelectDestinationSection = dynamic(() => import("./SelectDestiSection"))
const Step1 = dynamic(() => import("./Step1"))
const Step2 = dynamic(() => import("./Step2"))
import { useForm } from "react-hook-form"
import { useZodValidationResolver, validationSchema } from "./schema"
import FAQSection from "@/components/common/FAQ"

export type TailorTripFormData = {
  selectedDestination: string[]
  duration: string
  name: string
  email: string
  nationality: string
  phone: string
  numberOfAdults: string
  numberOfChildrens: string
  budget: string
  categories: string[]
  moreInfo: string
}

const TailorYourTour = ({ language, data }: any) => {
  const { layout, pageData } = data || {}

  const {
    faq_section: FAQSECTION,
    step_1: STEP_1,
    step_2: STEP_2,
    step_3: Step_3,
    place_cards: TOURS,
  } = pageData[0] || {}

  const [loading] = useState(false)
  const resolver = useZodValidationResolver(validationSchema)
  const [selectedDestination, setSelectedDestination] = useState<string[]>([])

  const handleSelectDestination = (value: string) => {
    const currentSelectedDestinations = getValues("selectedDestination")
    let updatedSelectedDestinations = [...currentSelectedDestinations]

    if (currentSelectedDestinations.includes(value)) {
      updatedSelectedDestinations = currentSelectedDestinations.filter(
        (item) => item !== value
      )
    } else {
      updatedSelectedDestinations.push(value)
    }

    setValue("selectedDestination", updatedSelectedDestinations, {
      shouldValidate: true,
    })
    setSelectedDestination(updatedSelectedDestinations)
  }

  const { control, handleSubmit, setValue, getValues } =
    useForm<TailorTripFormData>({
      defaultValues: {
        categories: [],
        numberOfAdults: "0",
        numberOfChildrens: "0",
        selectedDestination: [],
      },
      resolver: resolver,
    })

  return (
    <Layout
      locale={language}
      globals={layout}
      promo_banner={layout?.banner}
      breadcrumbs={[
        {
          label: "Tailor your tour",
          value: `/${language}/tailor_your_tour`,
        },
      ]}
    >
      {/* <div className="">
        <div className="bg-gray border-b-2 md:hidden" />
      </div> */}

      <div className="flex md:mt-10 flex-col mt-2">
        <Steps
          Step1={STEP_1}
          Step2={STEP_2}
          Step3={Step_3}
          locale={language}
          loading={loading}
          disableNext={getValues("duration") == ""}
          onSubmit={handleSubmit((data) => {
            console.log(data)
          })}
        >
          <SelectDestinationSection
            selectedDestination={selectedDestination}
            setSelectedDestination={handleSelectDestination}
            tours={TOURS}
            locale={language}
          />
          <Step1
            locale={language}
            onChange={useCallback(
              (value) => {
                setValue("duration", value, { shouldValidate: true })
              },
              [setValue]
            )}
          />
          <Step2 locale={language} control={control} setValue={setValue} />
        </Steps>

        <FAQSection data={FAQSECTION} locale={language} />
      </div>
    </Layout>
  )
}

export default TailorYourTour
