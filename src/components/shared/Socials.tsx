import Facebook, { Instagram, WhatsApp, XTwitter } from "@/assets/icons";
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
    url: "#",
    icon: <Facebook />,
  },
  {
    name: "instagram",
    url: "#",
    icon: <Instagram />,
  },
  {
    name: "twitter",
    url: "#",
    icon: <XTwitter />,
  },
  {
    name: "whatsapp",
    url: "#",
    icon: <WhatsApp />,
  },
];
