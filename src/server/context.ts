import { NextRequest } from "next/server"

export const createContext = async (opts: { req: NextRequest }) => {
  return {
    headers: opts.req.headers,
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
