import React from "react"

import {
  FacebookShare,
  TwitterShare,
  LinkedinShare,
  FacebookMessengerShare,
} from "react-share-kit"

export default function SharingOpt({
  url,
  appId,
}: {
  url: string
  appId?: string
}) {
  return (
    <>
      <FacebookShare url={url} size={25} borderRadius={50} />

      <FacebookMessengerShare
        url={url}
        size={25}
        borderRadius={50}
        appId={appId as string}
      />

      <LinkedinShare url={url} size={25} borderRadius={71} />

      <TwitterShare url={url} size={25} borderRadius={71} />
    </>
  )
}
