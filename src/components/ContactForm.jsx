import { Send2 } from "iconsax-react";
import { useState } from "react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [focused, setFocused] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="relative">
      {/* Background Glow */}
      <span className="text-secondary py-4 text-start font-black text-2xl sm:text-3xl lg:text-4xl">
        Send us a Message
        <p className="text-base text-white/60 font-light pb-2">
          Fill out the form below and we'll get back to you as soon as possible.
        </p>
      </span>
      <div className="absolute inset-0" />

      <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused(null)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-transparent focus:outline-none focus:border-orange-500/50 transition-all"
                placeholder="Your Name"
              />
              <label
                className={`absolute left-6 transition-all pointer-events-none ${
                  formData.name || focused === "name"
                    ? "-top-2.5 text-xs bg-[#1a1e24] px-2 text-orange-500"
                    : "top-4 text-gray-400"
                }`}>
                Your Name
              </label>
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-transparent focus:outline-none focus:border-orange-500/50 transition-all"
                placeholder="Email Address"
              />
              <label
                className={`absolute left-6 transition-all pointer-events-none ${
                  formData.email || focused === "email"
                    ? "-top-2.5 text-xs bg-[#1a1e24] px-2 text-orange-500"
                    : "top-4 text-gray-400"
                }`}>
                Email Address
              </label>
            </div>
          </div>

          {/* Phone & Subject */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phone */}
            <div className="relative">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onFocus={() => setFocused("phone")}
                onBlur={() => setFocused(null)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-transparent focus:outline-none focus:border-orange-500/50 transition-all"
                placeholder="Phone Number"
              />
              <label
                className={`absolute left-6 transition-all pointer-events-none ${
                  formData.phone || focused === "phone"
                    ? "-top-2.5 text-xs bg-[#1a1e24] px-2 text-orange-500"
                    : "top-4 text-gray-400"
                }`}>
                Phone Number
              </label>
            </div>

            {/* Subject */}
            <div className="relative">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                onFocus={() => setFocused("subject")}
                onBlur={() => setFocused(null)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-transparent focus:outline-none focus:border-orange-500/50 transition-all"
                placeholder="Subject"
              />
              <label
                className={`absolute left-6 transition-all pointer-events-none ${
                  formData.subject || focused === "subject"
                    ? "-top-2.5 text-xs bg-[#1a1e24] px-2 text-orange-500"
                    : "top-4 text-gray-400"
                }`}>
                Subject
              </label>
            </div>
          </div>

          {/* Message */}
          <div className="relative">
            <textarea
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              onFocus={() => setFocused("message")}
              onBlur={() => setFocused(null)}
              required
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-transparent focus:outline-none focus:border-orange-500/50 transition-all resize-none"
              placeholder="Your Message"
            />
            <label
              className={`absolute left-6 transition-all pointer-events-none ${
                formData.message || focused === "message"
                  ? "-top-2.5 text-xs bg-[#1a1e24] px-2 text-orange-500"
                  : "top-4 text-gray-400"
              }`}>
              Your Message
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-5 rounded-2xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all flex items-center justify-center gap-3 group">
            <span>Send Message</span>
            <Send2 className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
}
