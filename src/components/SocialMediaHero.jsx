import { Call, Instagram, Send2, Whatsapp } from "iconsax-react";

function SocialMediaHero() {
  return (
    <section className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-between">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        <a
          href="https://www.instagram.com/Taharezazade1/"
          target="_blank"
          className="flex items-center gap-2 text-base sm:text-lg font-light text-white">
          <Instagram size="26" color="#ffffff" />
          Instagram
        </a>

        <a
          href="https://t.me/Taharezazade1/"
          target="_blank"
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
          className="flex items-center gap-2 text-base sm:text-lg font-light text-white">
          <Whatsapp size="24" color="#ffffff" />
          WhatsApp
        </a>
      </div>
    </section>
  );
}

export default SocialMediaHero;
