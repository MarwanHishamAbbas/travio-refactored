import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getLocalizedText = (
  localizedString: { [x: string]: any; en: any },
  language: string
) => {
  return localizedString[language] || localizedString.en
}

export function joinStrings(separator: string, ...strings: string[]): string {
  return strings.filter(Boolean).join(` ${separator.trim()} `)
}

export function displayNumber(
  count: number | undefined,
  singular: string,
  plural: string = singular + "s"
): string {
  return count !== undefined
    ? `${count} ${count === 1 ? singular : plural}`
    : `No ${plural}`
}

export function getChars(chars: string, length: number) {
  if (chars) {
    return chars.length > length ? chars.substring(0, length) + "..." : chars
  }
  return "We are sorry! this content is only available in english"
}
export function getPriceSymbol(locale: string) {
  if (locale === "en") return "$"
  else if (locale === "es") return "€"
  else if (locale === "por") return "€"
  else return "$"
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "November",
  "December",
]

const shortMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

export function DateFormat(date: Date, short: boolean = false) {
  if (short)
    return (
      date.getDate() +
      " " +
      shortMonths[date.getMonth()] +
      " " +
      date.getFullYear()
    )
  return (
    months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()
  )
}
