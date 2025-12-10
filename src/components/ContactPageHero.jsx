import {
  Call,
  Clock,
  DirectInbox,
  Instagram,
  Location,
  Send2,
  UserOctagon,
  User,
  Subtitle,
  Whatsapp,
} from "iconsax-react";
import { ContactForm } from "./ContactForm";
import { Mobile } from "iconsax-reactjs";

function SocialMediaHero() {
  return (
    <section className="flex flex-col gap-4 sm:flex-row sm:gap-6 justify-between">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        <a
          href="https://www.instagram.com/Taharezazade1/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-base sm:text-lg font-light text-white">
          <Instagram size="26" color="#ffffff" />
          Instagram
        </a>

        <a
          href="https://t.me/Taharezazade1/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-base sm:text-lg font-light text-white">
          <Send2 size="26" color="#ffffff" />
          Telegram
        </a>

        <a
          href="tel:+989991382333"
          className="flex items-center gap-2 text-base sm:text-lg font-light text-white">
          <Call size="24" color="#ffffff" />
          +98 999 1382 333
        </a>

        <a
          href="https://wa.me/989991382333"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-base sm:text-lg font-light text-white">
          <Whatsapp size="24" color="#ffffff" />
          WhatsApp
        </a>
      </div>
    </section>
  );
}

function GetInTouch() {
  const contacts = [
    {
      icon: <Location size="32" color="#ff7d5d" variant="Bulk" />,
      title: "Location",
      info: "155 Main Street, Tehran, Iran",
    },
    {
      icon: <Call size="32" color="#ff7d5d" variant="Bulk" />,
      title: "Phone",
      info: "+98 912 345 6789",
    },
    {
      icon: <DirectInbox size="32" color="#ff7d5d" variant="Bulk" />,
      title: "Email",
      info: "contact@example.com",
    },
    {
      icon: <Clock size="32" color="#ff7d5d" variant="Bulk" />,
      title: "Working Hours",
      info: "Mon-Fri: 9am - 6pm",
    },
  ];

  return (
    <section className="w-full lg:w-1/2 px-4 lg:px-0">
      <h2 className="text-secondary font-black text-2xl sm:text-3xl mb-2">
        Get in Touch
      </h2>

      <p className="text-sm sm:text-base text-white/60 font-light mb-6">
        Reach out to us through any of the following channels. We're here to
        help.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {contacts.map((contact, idx) => (
          <div
            key={idx}
            className="bg-base-300 p-4 rounded-2xl flex items-center gap-4 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-xl shrink-0">
              {contact.icon}
            </div>

            <div>
              <p className="font-semibold text-white">{contact.title}</p>
              <span className="text-sm text-gray-300 break-words">
                {contact.info}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SendUsMessage() {
  return (
    <section className="w-full lg:w-1/2 px-4 lg:px-0">
      <h2 className="text-secondary font-black text-2xl sm:text-3xl mb-2">
        Send us a Message
      </h2>

      <p className="text-sm sm:text-base text-white/60 font-light mb-6">
        Fill out the form below and we'll get back to you.
      </p>

      <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="input input-secondary bg-base-300 input-lg rounded-2xl flex items-center gap-2">
          <User size="22" color="#ff7d5d" />
          <input type="text" placeholder="Username" required />
        </label>

        <label className="input input-secondary bg-base-300 input-lg rounded-2xl flex items-center gap-2">
          <DirectInbox size="22" color="#ff7d5d" />
          <input type="email" placeholder="mail@site.com" required />
        </label>

        <label className="input input-secondary bg-base-300 input-lg rounded-2xl flex items-center gap-2">
          <Mobile size="22" color="#ff7d5d" />
          <input type="tel" placeholder="Phone" required />
        </label>

        <label className="input input-secondary bg-base-300 input-lg rounded-2xl flex items-center gap-2">
          <Subtitle size="22" color="#ff7d5d" />
          <input type="text" placeholder="Subject" required />
        </label>

        <textarea
          className="textarea textarea-secondary sm:col-span-2 resize-none min-h-[6rem]"
          placeholder="Your Message"
        />

        <button className="btn btn-secondary sm:col-span-2 mt-2">
          Send Message
        </button>
      </form>
    </section>
  );
}

function FrequentlyAskedQuestions() {}

function ContactPageHero() {
  return (
    <section className="contact-hero-section w-full mt-4 px-4 sm:px-0">
      {/* HERO */}
      <div
        className="
          bg-[url(/image/ContactPageHero.jpg)]
          rounded-2xl
          flex
          p-6 sm:p-10
          items-start
          justify-start
          w-full
          bg-cover
          bg-center
          bg-no-repeat
        ">
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h1 className="text-secondary font-black text-3xl sm:text-4xl lg:text-5xl">
              Contact Us
            </h1>

            <p className="text-white font-light text-sm sm:text-base lg:text-lg leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Egestas purus viverra accumsan in nisl nisi.
            </p>
          </div>

          <div className="divider text-white opacity-70 text-xs sm:text-sm lg:text-base">
            We'd love to hear from you.
          </div>

          <div className="card bg-transparent rounded-box h-fit">
            <SocialMediaHero />
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex flex-col lg:flex-row gap-8 w-full mt-10">
        <GetInTouch />
        <SendUsMessage />
      </div>

      <FrequentlyAskedQuestions />
    </section>
  );
}

export default ContactPageHero;
