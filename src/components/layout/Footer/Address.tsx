import { Mail, MapPin, PhoneCall } from "lucide-react"

const Address = ({
  heading,
  address,
  number,
  email,
}: {
  heading: string
  address: string
  number: string
  email: string
}) => {
  return (
    <div className="flex flex-col flex-none text-sm gap-3">
      <h1 className="md:text-base font-medium text-[12px]">{heading}</h1>
      <div className="flex items-center gap-2">
        <MapPin className="size-4 shrink-0" />
        <a
          href={`https://www.google.com/maps?q=${encodeURIComponent(address)}`}
          rel="noopener noreferrer"
          target="_blank"
          className="font-normal font-satoshi text-grey text-xs md:text-sm"
        >
          {address}
        </a>
      </div>
      <div className="flex items-center gap-2">
        <PhoneCall className="size-4 shrink-0" />
        <a
          href={`tel:${encodeURIComponent(
            number
              .replace(/[^\d]/g, "")
              .replace(/(\d{3})(\d{4})(\d{5})/, "+$1 $2 $3")
          )}`}
          className="font-normal font-satoshi text-grey text-xs md:text-sm"
        >
          {number}
        </a>
      </div>
      <div className="flex items-center gap-2">
        <Mail className="size-4 shrink-0" />
        <a
          href={`mailto:${encodeURIComponent(
            email.replace(/[^\x20-\x7E]/g, "")
          )}`}
          target="_blank"
          className="font-normal font-satoshi text-grey text-xs md:text-sm"
        >
          {email}
        </a>
      </div>
    </div>
  )
}

export default Address
