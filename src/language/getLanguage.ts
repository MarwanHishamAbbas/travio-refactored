import "server-only"

export type Locale = keyof typeof dictionaries

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  de: () => import("@/dictionaries/es.json").then((module) => module.default),
  cn: () => import("@/dictionaries/por.json").then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]()
