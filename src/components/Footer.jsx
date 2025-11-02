import { Instagram, Send2, Whatsapp } from "iconsax-reactjs";
import { LuGlassWater, LuDessert, LuPizza, LuSalad } from "react-icons/lu";
import { useState } from "react";

const MenuFooterIconData = [
  {
    icon: <LuGlassWater size="28" color="#00bc7d" />,
    label: "Drinks",
    Route: "/Drinks",
  },
  {
    icon: <LuDessert size="28" color="#00bc7d" />,
    label: "Desert",
    Route: "/Desert",
  },
  {
    icon: <LuSalad size="28" color="#00bc7d" />,
    label: "Appetizer",
    Route: "/Appetizer",
  },
  {
    icon: <LuPizza size="28" color="#00bc7d" />,
    label: "Main course",
    Route: "/Main-course",
  },
];

function EasyAccess() {
  return (
    <div className="w-full items-start md:w-fit justify-center">
      <h3 className="font-bold pb-2 text-xl text-emerald-500">Easy Access</h3>
      <nav className="flex flex-col gap-0.5 text-white/70">
        <a href="#">Your questions</a>
        <a href="#">Tarkhineh Rules</a>
        <a href="#">Privacy</a>
      </nav>
      <div className="mt-1.5 gap-1 flex flex-row items-start justify-start">
        <Instagram />
        <Send2 />
        <Whatsapp />
      </div>
    </div>
  );
}

function MenuFooter() {
  return (
    <div className="w-full items-start md:w-fit justify-center">
      <h3 className="font-bold pb-2 text-xl text-emerald-500">Menu</h3>
      <nav className="font-medium text-lg gap-2 flex flex-col">
        {MenuFooterIconData.map((item) => (
          <a
            key={item.label}
            className="items-start justify-sitems-start flex gap-1"
            href={item.Route}>
            {item.icon}
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
}

function FormComments() {
  const [comment, setComment] = useState("");
  const maxWords = 200;

  const handleInput = (e) => {
    let words = e.target.value
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0);
    if (words.length > maxWords) {
      words = words.slice(0, maxWords);
      e.target.value = words.join(" ");
    }
    setComment(e.target.value);
  };

  const wordCount = comment
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;

  return (
    <form className="flex flex-row gap-2">
      <div className="flex min-w-56 lg:min-w-72 gap-2 flex-col">
        <label className="floating-label">
          <span>First Name</span>
          <input
            type="text"
            placeholder="First Name"
            className="input input-md rounded-lg focus:outline-0 focus:border-2 focus:border-emerald-500 duration-150 transition-all"
          />
        </label>
        <label className="floating-label">
          <span>Last Name</span>
          <input
            type="text"
            placeholder="Last Name"
            className="input input-md rounded-lg focus:outline-0 focus:border-2 focus:border-emerald-500 duration-150 transition-all"
          />
        </label>
        <label className="floating-label">
          <span>Your Email</span>
          <input
            type="email"
            placeholder="mail@site.com"
            className="input input-md rounded-lg focus:outline-0 focus:border-2 focus:border-emerald-500 duration-150 transition-all"
          />
        </label>
      </div>

      <div className="flex flex-col justify-between min-w-56 lg:min-w-72 h-full items-start gap-2">
        <div className="w-full">
          <textarea
            value={comment}
            onInput={handleInput}
            className="textarea h-20 focus:outline-0 focus:border-2 focus:border-emerald-500 duration-150 transition-all resize-none rounded-lg w-full"
            placeholder="Your Comments"></textarea>
          <p className="text-xs text-gray-500 mt-1 text-right">
            {wordCount} / {maxWords} words
          </p>
        </div>
        <button className="btn-secondary btn btn-sm p-3 text-white rounded-lg">
          Submit
        </button>
      </div>
    </form>
  );
}

function SubmitComment() {
  return (
    <div className="hidden md:inline-flex md:w-fit flex-col px-2 text-start">
      <p className="font-bold text-2xl py-2">Submit Comment to Tarkhineh</p>
      <FormComments />
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-[url(/image/Footer.png)] md:p-6 md:justify-between md:flex-row p-4 rounded-2xl gap-4 flex flex-col bg-black bg-blend-luminosity my-4 h-fit bg-center bg-cover">
      <EasyAccess />
      <MenuFooter />
      <SubmitComment />
    </div>
  );
}

export default Footer;
