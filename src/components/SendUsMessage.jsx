import { DirectInbox, Mobile, Subtitle, User } from "iconsax-react";

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
          className="textarea textarea-secondary bg-base-300 sm:col-span-2 rounded-2xl w-full resize-none min-h-[6rem]"
          placeholder="Your Message"
        />

        <button className="btn btn-secondary sm:col-span-2 mt-2">
          Send Message
        </button>
      </form>
    </section>
  );
}

export default SendUsMessage;
