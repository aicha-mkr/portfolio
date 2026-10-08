import type { Contact as ContactData } from "@/data/portfolio";
import { ContactForm } from "./ContactForm";
import { Mixed } from "./text";

export function Contact({ contact }: { contact: ContactData }) {
  return (
    <section id="contact" data-theme="light" aria-labelledby="contact-title" className="py-28 md:py-40">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 id="contact-title" data-split className="headline-alt text-hero font-medium uppercase">
            {contact.headline.map((line) => (
              <span key={line} className="block">
                <Mixed line={line} />{" "}
              </span>
            ))}
          </h2>
          <p data-fade className="mt-8 max-w-md text-lg leading-relaxed text-fg/80 md:text-xl">
            {contact.intro}
          </p>
        </div>

        <div data-fade className="lg:col-span-6 lg:col-start-7 lg:pt-4">
          <ContactForm email={contact.email} />
        </div>
      </div>
    </section>
  );
}
