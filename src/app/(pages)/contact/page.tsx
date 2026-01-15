import type { Metadata } from "next";
import en from "@/language/en";
import ContactForm from "@/components/contact/ContactForm";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import Socials from "@/components/shared/Socials";
import { LocationIcon, PhoneIcon, EmailIconOpen } from "@/assets/icons";
import ContactList from "@/components/shared/ContactList";

export const metadata: Metadata = {
  title: en.contactPageMetaTitle,
  description: en.contactPageMetaDescription,
};

export default function Contact() {
  const LeafletMap = useMemo(
    () =>
      dynamic(() => import("@/components/contact/LeafletMap"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    [],
  );

  return (
    <section className="flex w-full flex-col items-center justify-center bg-white pb-10 pt-10 lg:pb-20 lg:pt-20">
      <div className="flex w-full flex-col justify-between gap-10 px-4 md:max-w-screen-sm lg:flex-row lg:px-0 xl:max-w-[95%] 2xl:max-w-screen-xl">
        <div className="contact_form flex flex-col gap-10 lg:w-[42%]">
          <div className="contact_header flex flex-col gap-4">
            <h2 className="contacts_form-header_title text-2xl font-bold lg:text-4xl">
              {en.haveAnyQuestion}
            </h2>
            <p className="contacts_form-header_text">{en.contactDescription}</p>
          </div>
          <ContactForm />
        </div>

        <div className="flex flex-col gap-10 lg:w-[50%]">
          <LeafletMap />
          <div className="contact_info flex flex-col gap-10 text-primary">
            <ContactList contactList={contactList} />
            <Socials />
          </div>
        </div>
      </div>
    </section>
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
    name: [en.emailAddress],
    icon: <EmailIconOpen />,
    link: [`mailto:${en.emailAddress}`],
  },
];
