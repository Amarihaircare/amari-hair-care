import Facebook, {
  Instagram,
  LinkedIn,
  WhatsApp,
  XTwitter,
} from "@/assets/icons";
import Link from "next/link";

export default function Socials() {
  return (
    <ul className="socials flex items-center gap-4">
      {socials.map((social, index) => (
        <li className="list-item" key={index}>
          <Link
            className="link text-xl text-inherit"
            href={social.url}
            target="_blank"
            rel="noopener norefferer"
          >
            {social.icon}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export const socials = [
  {
    name: "facebook",
    url: "https://www.facebook.com/share/4aY5vvkqbUGZwp1A/?mibextid=LQQJ4d",
    icon: <Facebook />,
  },
  {
    name: "instagram",
    url: "https://www.instagram.com/amarihaircare?igsh=OXk3ZXQ0dzd3aTc1",
    icon: <Instagram />,
  },
  {
    name: "linkedin",
    url: "https://www.linkedin.com/company/amari-hair-care",
    icon: <LinkedIn />,
  },
  {
    name: "whatsapp",
    url: "http://dm.wa.link/4e02ip",
    icon: <WhatsApp />,
  },
];
