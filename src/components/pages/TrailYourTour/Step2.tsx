import React, { useEffect } from "react"
import { Control, UseFormSetValue } from "react-hook-form"

import { TailorTripFormData } from "./index"
import countries from "@/lib/countries.json"
import {
  Leaf,
  Cross,
  WaveTriangle,
  Car,
  Boat,
  Compass,
  FinnTheHuman,
  CrossSelected,
  CarSelected,
  WaveTriangleSelected,
  BoatSelected,
  CompassSelected,
  FinnTheHumanSelected,
  LeafSelected,
} from "./style"
import Input from "./Input"
import { formFieldsTn } from "@/lib/utils"

export default function Step2({
  control,
  setValue,
  locale,
}: {
  setValue: UseFormSetValue<TailorTripFormData>
  control: Control<any>
  locale: string
}) {
  const CategoriesOptions = [
    {
      name: {
        en: "Historic Sites",
        es: "Sitios históricos",
        por: "Locais históricos",
      },
      icon: <Leaf />,
      iconSelected: <LeafSelected />,
    },
    {
      name: {
        en: "Religious Sites",
        es: "Lugares religiosos",
        por: "Locais religiosos",
      },
      icon: <Cross />,
      iconSelected: <CrossSelected />,
    },
    {
      name: {
        en: "Beach",
        es: "Playa",
        por: "Praia",
      },
      icon: <WaveTriangle />,
      iconSelected: <WaveTriangleSelected />,
    },
    {
      name: {
        en: "Desert Safaris",
        es: "Safaris por el desierto",
        por: "Safaris no deserto",
      },
      icon: <Car />,
      iconSelected: <CarSelected />,
    },
    {
      name: {
        en: "Cruises",
        es: "Cruceros",
        por: "Cruzeiros",
      },
      icon: <Boat />,
      iconSelected: <BoatSelected />,
    },
    {
      name: {
        en: "Outdoor Activities",
        es: "Actividades al aire libre",
        por: "Atividades ao ar livre",
      },
      icon: <Compass />,
      iconSelected: <CompassSelected />,
    },
    {
      name: {
        en: "Wellness Activities",
        es: "Actividades de bienestar",
        por: "Atividades de bem-estar",
      },
      icon: <FinnTheHuman />,
      iconSelected: <FinnTheHumanSelected />,
    },
  ]
  const [mobileNumber] = React.useState({
    mobileCode: "+1",
    mobileNumber: "",
  })

  useEffect(() => {
    setValue(
      "phone",
      mobileNumber["mobileCode"] + mobileNumber["mobileNumber"],
      {
        shouldValidate: true,
      }
    )
  }, [mobileNumber, setValue])

  return (
    <div className="grid lg:grid-cols-2 font-satoshi grid-cols-1 gap-[18px] md:px-3 px-5 lg:px-12">
      <Input
        name="name"
        // @ts-ignore
        label={`${formFieldsTn?.[locale]?.name}*`}
        type="text"
        control={control}
      />
      <Input
        name="email"
        // @ts-ignore
        label={`${formFieldsTn?.[locale]?.email}*`}
        type="text"
        control={control}
      />
      <Input
        control={control}
        name="nationality"
        // @ts-ignore
        label={`${formFieldsTn?.[locale]?.nationality}*`}
        options={countries.map((c) => ({ value: c.name, label: c.name }))}
        type="select"
        placeholder="Select your Nationality"
        className="h-[38px]"
      />
      <div className="flex  font-medium text-base text-black flex-col gap-2">
        {/* @ts-ignore */}
        <label htmlFor="mobileNumber">{formFieldsTn?.[locale]?.mobile}</label>
        <div className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-3">
          <Input
            name="mobileCode"
            rules={{ required: true }}
            control={control}
            type="select"
            options={countries.map((c) => ({
              value: c.dial_code,
              label: `${c.name} (${c.dial_code})`,
            }))}
          />
          <Input
            name="mobileNumber"
            rules={{ required: true }}
            control={control}
            type="number"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-medium text-base text-black">
          {/* @ts-ignore */}
          {formFieldsTn?.[locale]?.people}*
        </p>
        <div className="grid grid-cols-2 gap-3">
          <Input
            name="numberOfAdults"
            // @ts-ignore
            placeholder={formFieldsTn?.[locale]?.adults}
            type="buttonNumber"
            control={control}
          />
          <Input
            name="numberOfChildrens"
            control={control}
            // @ts-ignore

            placeholder={formFieldsTn?.[locale]?.children}
            type="buttonNumber"
          />
        </div>
      </div>
      <Input
        control={control}
        label={
          <p className="flex gap-[6px] items-center">
            {/* @ts-ignore */}
            {formFieldsTn?.[locale]?.budget}
            <span className="font-normal text-xs text-grey">
              (Excluding international flights)
            </span>
          </p>
        }
        name="budget"
        type="select"
        options={[
          { value: "less than $1000", label: "less than $1000" },
          { value: "$1000-$2000", label: "$1000-$2000" },
          { value: "$2000-$3000", label: "$2000-$3000" },
          { value: "more than $3000", label: "more than $3000" },
        ]}
        className="h-[38px]"
      />
      <div className="col-span-full">
        <Input
          control={control}
          name="categories"
          type="boxSelection"
          options={CategoriesOptions}
          // @ts-ignore

          label={formFieldsTn?.[locale]?.cate}
          locale={locale}
        />
      </div>
      <div className="col-span-full">
        <Input
          control={control}
          type="textarea"
          // @ts-ignore

          label={formFieldsTn?.[locale]?.more}
          name="moreInfo"
        />
      </div>
    </div>
  )
}
