import SectionHeader from "@/components/common/SectionHeader"
import { Button } from "@/components/ui/button"
import { backTn, loadingTn, nextStepTn, submitTn } from "@/lib/utils"
import React, { useState, useTransition } from "react"

export default function Steps({
  disableNext,
  Step1,
  Step2,
  Step3,
  children,
  onSubmit,
  loading,
  locale,
}: {
  loading: boolean
  disableNext?: boolean
  children?: any[]
  Step1: any
  Step2: any
  Step3: any
  locale: string
  onSubmit: () => void
}) {
  const [step, setStep] = useState(1)
  const [isPending, startTransition] = useTransition()

  return (
    <div className="flex mt-8 flex-col gap-5 items-center sm:w-[90%] md:mx-auto">
      <SectionHeader
        title={
          step == 1
            ? Step1.tagline?.[locale]
            : step === 2
              ? Step2.tagline?.[locale]
              : Step3.tagline?.[locale]
        }
        subtitle={
          step == 1
            ? Step1.title?.[locale]
            : step == 2
              ? Step2.title?.[locale]
              : Step3.title?.[locale]
        }
        centerLine
      />
      <div
        className={`${
          step == 1 ? " bg-white" : "bg-lightBlue"
        }  sm:rounded-[20px] md:pt-10 md:pb-12 py-10 flex flex-col gap-4 md:w-auto w-[100%]`}
        // style={{ minHeight: "450px" }}
      >
        {children && (
          <>
            {children[step - 1]}
            <div className="w-full flex justify-center md:mt-6 gap-3 items-center md:px-24 mt-4 flex-wrap">
              {step > 1 ? (
                <Button
                  variant="outline"
                  onClick={() => {
                    startTransition(() => {
                      setStep(step - 1)
                    })
                  }}
                  className="px-[30px] py-3 h-12 w-[246px] max-md:max-w-[160px] max-[375px]:max-w-[120px] max-md:h-10"
                >
                  {/* @ts-ignore */}
                  {isPending ? loadingTn?.[locale] : backTn?.[locale]}
                </Button>
              ) : (
                <></>
              )}
              {step < children.length ? (
                <Button
                  className="h-12 w-[246px] max-md:max-w-[160px] max-[375px]:max-w-[120px] max-md:h-10"
                  onClick={() => {
                    startTransition(() => {
                      setStep(step + 1)
                    })
                  }}
                  disabled={disableNext}
                >
                  {/* @ts-ignore */}

                  {isPending ? loadingTn?.[locale] : nextStepTn?.[locale]}
                </Button>
              ) : (
                <Button
                  disabled={loading}
                  className="h-12 w-[246px] max-md:max-w-[160px] max-[375px]:max-w-[120px] max-md:h-10"
                  onClick={onSubmit}
                >
                  {loading
                    ? // @ts-ignore
                      submitTn?.submitting?.[locale]
                    : // @ts-ignore
                      submitTn?.[locale]}
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
