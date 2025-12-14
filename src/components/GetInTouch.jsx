import { Call, Clock, DirectInbox, Location } from "iconsax-react";

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
export default GetInTouch;
