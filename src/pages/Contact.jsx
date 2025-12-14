import { Mobile } from "iconsax-reactjs";
import MapAddress from "../components/MapAddress";
import FrequentlyAskedQuestions from "../components/FAQ";
import SendUsMessage from "../components/SendUsMessage";
import GetInTouch from "../components/GetInTouch";
import SocialMediaHero from "../components/SocialMediaHero";

function HeroContactPage() {
  return (
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
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas
            purus viverra accumsan in nisl nisi.
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
  );
}
function Contact() {
  return (
    <section className="contact-hero-section w-full mt-4 px-4 sm:px-0">
      <HeroContactPage />
      <div className="flex flex-col lg:flex-row gap-8 w-full mt-10">
        <GetInTouch />
        <SendUsMessage />
      </div>

      <div className="flex flex-col lg:flex-row gap-8 w-full mt-10 pb-10">
        <FrequentlyAskedQuestions />
        <MapAddress />
      </div>
    </section>
  );
}

export default Contact;
