import { cn } from "@/lib/utils";
import Link from "next/link";

interface ContactListProps {
  contactList: { name: string[]; icon: JSX.Element; link?: string[] }[];
}

export default function ContactList({ contactList }: ContactListProps) {
  return (
    <ul className="footer_main-contacts_list flex flex-col gap-3">
      {contactList.map((contact, index) => (
        <li className="flex items-center gap-4" key={index}>
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm text-primary",
            )}
          >
            {contact.icon}
          </div>
          <div className="flex flex-col gap-2">
            {contact.name.map((item, index) =>
              contact?.link ? (
                <Link
                  href={contact.link[index]}
                  key={index}
                  className="block text-inherit"
                >
                  {item}
                </Link>
              ) : (
                <p key={index} className="max-w-[280px] text-inherit">
                  {item}
                </p>
              ),
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
