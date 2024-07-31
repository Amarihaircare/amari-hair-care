import Facebook, {
  CaretRight,
  Instagram,
  LocationIcon,
  PhoneIcon,
  WhatsApp,
  XTwitter,
  ClockIcon,
  EmailIcon,
} from "@/assets/icons";
import en from "@/language/en";
import Image from "next/image";
import Link from "next/link";
import instagramOne from "../../assets/images/instagram-one.webp";
import instagramTwo from "../../assets/images/instagram-two.webp";
import instagramThree from "../../assets/images/instagram-three.webp";
import instagramFour from "../../assets/images/instagram-four.webp";
import instagramFive from "../../assets/images/instagram-five.webp";
import instagramSix from "../../assets/images/instagram-six.webp";

export default function Footer() {
  return (
    <footer className="footer py-20 lg:py-40 w-full flex justify-center bg-primary transition-all duration-300">
      <div className="flex flex-col lg:flex-row flex-wrap lg:gap-y-20 items-center lg:items-start justify-between md:max-w-screen-sm xl:max-w-[95%] 2xl:max-w-screen-xl w-full gap-10 lg:gap-0 px-4">
        <div className="flex flex-col gap-4 lg:gap-6 lg:max-w-[300px]">
          <Link className="brand footer_main-about_brand" href="/">
            <Image src="/logo-white.svg" width={82} height={40} alt="logo" />
          </Link>
          <div className="footer_main-about_wrapper flex flex-col gap-6">
            <p className="text-white">{en.metaDescription}</p>

            <div className="flex items-center gap-2 text-white">
              <EmailIcon />
              <Link href={`mailto:${en.emailAddress}`}>{en.emailAddress}</Link>
            </div>

            <ul className="socials flex items-center gap-4">
              {socials.map((social, index) => (
                <li className="list-item" key={index}>
                  <Link
                    className="link text-secondary text-xl"
                    href={social.url}
                    target="_blank"
                    rel="noopener norefferer"
                  >
                    {social.icon}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer_main-contacts flex flex-col gap-4 w-full lg:gap-6 lg:w-auto">
          <h4 className="footer_main-header text-white text-xl font-semibold">
            {en.cotactInformation}
          </h4>
          <ul className="footer_main-contacts_list flex flex-col gap-3">
            {contactList.map((contact, index) => (
              <li className="flex items-center gap-4" key={index}>
                <div className="bg-secondary w-10 h-10 rounded-full flex items-center justify-center text-sm">
                  {contact.icon}
                </div>
                {contact.split ? (
                  <div className="flex flex-col gap-2">
                    {contact.name.split(" ").map((item, index) => (
                      <Link
                        href={`tel:${item}`}
                        key={index}
                        className="block text-white"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-white max-w-[280px]">{contact.name}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="footer_main-catalogue flex flex-col gap-4 lg:gap-6 w-full lg:w-auto">
          <h4 className="footer_main-header text-white text-xl font-semibold">
            {en.aboutUs}
          </h4>
          <ul className="footer_main-nav_list flex gap-2 flex-col">
            {aboutLinks.map((link, index) => (
              <li className="list-item" key={index}>
                <Link
                  className="link text-white flex items-center gap-2"
                  href={link.url}
                >
                  <CaretRight className="text-secondary" />
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer_main-instagram flex flex-col gap-4 lg:gap-6 w-full lg:w-auto">
          <h4 className="footer_main-header text-white text-xl font-semibold">
            {en.instagram}
          </h4>
          <ul className="footer_main-instagram_list grid grid-cols-3 grid-rows-2 gap-4 lg:gap-6">
            {instagramPhotos.map((photo, index) => (
              <li className="list-item" key={index}>
                <Link
                  className="link"
                  href="#"
                  target="_blank"
                  rel="noopener norefferer"
                >
                  <Image
                    src={photo}
                    alt="instagram post"
                    width={100}
                    height={100}
                    className="rounded h-[100px] lg:h-[50px] w-full object-cover"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

const socials = [
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

const contactList = [
  {
    name: `${en.telephone} ${en.mobile}`,
    icon: <PhoneIcon />,
    split: true,
  },
  {
    name: en.address,
    icon: <LocationIcon />,
  },
  {
    name: en.openFrom,
    icon: <ClockIcon />,
  },
];

const aboutLinks = [
  {
    name: en.becomeAnAffiliatePartner,
    url: "#",
  },
  {
    name: en.privacyPolicy,
    url: "#",
  },
  {
    name: en.stockistTermsAndConditions,
    url: "#",
  },
  {
    name: en.wholesale,
    url: "#",
  },
  {
    name: en.findAStockist,
    url: "#",
  },
];

const instagramPhotos = [
  instagramOne,
  instagramTwo,
  instagramThree,
  instagramFour,
  instagramFive,
  instagramSix,
];
