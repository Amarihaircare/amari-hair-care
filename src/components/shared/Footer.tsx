import {
  CaretRight,
  LocationIcon,
  PhoneIcon,
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
import Socials from "./Socials";
import ContactList from "./ContactList";

export default function Footer() {
  return (
    <footer className="footer flex w-full justify-center bg-primary py-20 transition-all duration-300 lg:py-40">
      <div className="flex w-full flex-col flex-wrap items-center justify-between gap-10 px-4 md:max-w-[95%] lg:flex-row lg:items-start lg:gap-0 lg:gap-y-20 lg:px-0 2xl:max-w-screen-xl">
        <div className="flex flex-col gap-4 lg:max-w-[300px] lg:gap-6">
          <Link className="brand footer_main-about_brand" href="/">
            <Image src="/logo-white.svg" width={82} height={40} alt="logo" />
          </Link>
          <div className="footer_main-about_wrapper flex flex-col gap-6 text-secondary">
            <p className="text-white">{en.metaDescription}</p>

            <div className="flex items-center gap-2 text-white">
              <EmailIcon />
              <Link href={`mailto:${en.emailAddress}`}>{en.emailAddress}</Link>
            </div>

            <Socials />
          </div>
        </div>
        <div className="footer_main-contacts flex w-full flex-col gap-4 text-white lg:w-auto lg:gap-6">
          <h4 className="footer_main-header text-xl font-semibold text-white">
            {en.cotactInformation}
          </h4>
          <ContactList contactList={contactList} />
        </div>
        <div className="footer_main-catalogue flex w-full flex-col gap-4 lg:w-auto lg:gap-6">
          <h4 className="footer_main-header text-xl font-semibold text-white">
            {en.aboutUs}
          </h4>
          <ul className="footer_main-nav_list flex flex-col gap-2">
            {aboutLinks.map((link, index) => (
              <li className="list-item" key={index}>
                <Link
                  className="link flex items-center gap-2 text-white"
                  href={link.url}
                >
                  <CaretRight className="text-secondary" />
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer_main-instagram flex w-full flex-col gap-4 lg:w-auto lg:gap-6">
          <h4 className="footer_main-header text-xl font-semibold text-white">
            {en.instagram}
          </h4>
          <ul className="footer_main-instagram_list grid grid-cols-3 grid-rows-2 gap-4 lg:gap-6">
            {instagramPhotos.map((photo, index) => (
              <li className="list-item" key={index}>
                <Link
                  className="link"
                  href={en.instagramLink}
                  target="_blank"
                  rel="noopener norefferer"
                >
                  <Image
                    src={photo}
                    alt="instagram post"
                    width={100}
                    height={100}
                    className="h-[100px] w-full rounded object-cover lg:h-[50px]"
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

const contactList = [
  {
    name: [en.telephone, en.mobile],
    icon: <PhoneIcon />,
    link: [`tel:${en.telephone}`, `tel:${en.mobile}`],
  },
  {
    name: [en.ourAddress, en.ourCityState],
    icon: <LocationIcon />,
  },
  {
    name: [en.openFromTime, en.openFromWeek],
    icon: <ClockIcon />,
  },
];

const aboutLinks = [
  {
    name: en.whoWeAre,
    url: "/about",
  },
  {
    name: en.findAStockist,
    url: "/find-a-stockist",
  },
  {
    name: en.privacyPolicy,
    url: "/privacy",
  },
  {
    name: en.stockistTermsAndConditions,
    url: "/tos",
  },
  {
    name: en.wholesale,
    url: "/catalogue",
  },
  {
    name: en.becomeAnAffiliatePartner,
    url: "become-an-affiliate-partner",
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
