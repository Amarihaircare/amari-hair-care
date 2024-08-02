import en from "@/language/en";
import { Input } from "../ui/input";

export default function NewsletterSection() {
  return (
    <section className="newsletter_section pb-20 lg:pb-40 w-full flex-col flex items-center justify-center bg-white">
      <div className="newsletter_container flex rounded bg-primary flex-col items-center justify-center w-full overflow-hidden px-4 md:max-w-[95%] 2xl:max-w-screen-xl relative py-20 text-white bg-no-repeat">
        <div className="newsletter_content flex flex-col items-center gap-4 max-w-[480px]">
          <div className="newsletter_header flex flex-col items-center gap-4">
            <h2 className="newsletter_header-title text-3xl lg:text-4xl text-center font-bold">
              {en.newsletterHeader}
            </h2>
            <p className="newsletter_header-text text-center text-white">
              {en.newsletterDescription}
            </p>
          </div>
          <form
            action="#"
            className="relative flex items-center w-full max-w-[340px]"
          >
            <Input
              placeholder={en.email}
              type="search"
              className="rounded-full py-6 bg-white"
            />
            <button
              className="header_user-search_btn  flex absolute right-0 bg-secondary px-8 top-0 bottom-0 rounded-full items-center justify-center font-semibold text-primary"
              type="submit"
              data-trigger="search"
            >
              {en.send}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
