import {
  isWednesday,
  isMonday,
  addDays,
  areIntervalsOverlapping,
  isTuesday,
  isThursday,
  isFriday,
  isSaturday,
  isSunday,
} from "date-fns"

// Seperate time from Date for comparrison
export const stripTime = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

const checkDay = (date: Date) => {
  if (isMonday(date)) return "mon"
  if (isTuesday(date)) return "tue"
  if (isWednesday(date)) return "wed"
  if (isThursday(date)) return "thu"
  if (isFriday(date)) return "fri"
  if (isSaturday(date)) return "sat"
  if (isSunday(date)) return "sun"
}

type DateRange = {
  from: Date
  to: Date
}

const getDates = (
  startDate: Date,
  endDate: Date,
  duration: any,
  data: any,
  locale: string
) => {
  const start_date = new Date(startDate)
  const end_date = new Date(endDate)
  const dates = [] as DateRange[]
  for (
    let currentDate = start_date;
    currentDate <= end_date;
    currentDate = addDays(currentDate, 1)
  ) {
    if (data?.days[locale]?.includes(checkDay(currentDate))) {
      dates.push({
        from: new Date(currentDate),
        to: new Date(addDays(currentDate, duration)),
      })
    }
  }
  return dates
}

const dayNames = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]

const isMatchingDay = (date: Date, days: string[]): boolean => {
  const dayName = dayNames[date.getDay()]
  return days.includes(dayName)
}

export function generateNewPriceList(
  data: any,
  locale: string,
  duration?: number
) {
  const price = data.price ?? {}
  const fixedDays = data.fixed_days ?? []
  const priceOverrides = data.price_overrides ?? []
  const startDate = data.weekly_schedule?.start_date
  const endDate = data.weekly_schedule?.end_date
  const days = data.days[locale] ?? []

  const dates = getDates(
    new Date(startDate),
    new Date(endDate),
    duration,
    data,
    locale
  )

  console.log(dates[32])

  const priceList = dates.map((date) => {
    const override = priceOverrides.find((item: any) =>
      areIntervalsOverlapping(
        {
          start: new Date(item.timeline.start_date),
          end: new Date(item.timeline.end_date),
        },
        {
          start: date.from,
          end: date.to,
        },
        { inclusive: true }
      )
    )

    return {
      from: date.from,
      to: date.to,
      actualPrice: override
        ? override.price.initial_price
        : price.initial_price,
      currentPrice: override
        ? override.price.discounted_price
        : price.discounted_price,
    }
  })

  const filteredPriceList = priceList.filter((item) =>
    isMatchingDay(item.from, days)
  )

  const myList = filteredPriceList.filter(
    (item) =>
      !fixedDays.some((day: any) =>
        areIntervalsOverlapping(
          {
            start: item.from,
            end: item.to,
          },
          {
            start: new Date(day.from),
            end: new Date(day.to),
          },
          { inclusive: true }
        )
      )
  )

  fixedDays.forEach((item: any) => {
    myList.push({
      from: new Date(item.from),
      to: new Date(item.to),
      actualPrice: item.price.initial_price,
      currentPrice: item.price.discounted_price,
    })
  })

  return myList.sort(
    (a, b) => Number(new Date(a.from)) - Number(new Date(b.from))
  )
}

export const formatDateToYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0") // Months are zero-based, so we add 1
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}
