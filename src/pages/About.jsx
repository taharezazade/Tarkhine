import { useEffect } from "react";
import { ArrowRight2, Star1, Book, User, Cup } from "iconsax-react";
import { Toaster, toast } from "react-hot-toast";

// --- Data ---
const experienceImagesData = [
  { src: "/image/Experience-Hero.jpg", alt: "experience hero" },
  { src: "/image/interior-restaurant-high.jpg", alt: "interior restaurant" },
];

const experienceCardsData = [
  {
    count: "+16",
    text: "We are a bar brand building insightful strategy, creating unique designs and delivering delightful experiences.",
  },
  {
    count: "+16",
    text: "We are a bar brand building insightful strategy, creating unique designs and delivering delightful experiences.",
  },
];

const aboutRestaurantData = {
  image: "/image/interior-restaurant-high.jpg",
  heading: "ABOUT RESTAURANT",
  title: "Experience Original Food Taste of Lisboa.",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore incidunt ut labore et dolore magna aliqua minim veniam nostrum exercitation.",
  features: [
    {
      icon: <Cup variant="Bold" size={22} color="#ffba00" />,
      text: "Cozy Amenities and Bar",
    },
    {
      icon: <Book variant="Bold" size={22} color="#ffba00" />,
      text: "Aesty Culinary For Food Lovers",
    },
  ],
  founder: {
    img: "/image/chef-2.jpg",
    name: "Sokina Hasan",
    role: "Founder & CEO",
  },
};

const trendingFoodsData = [
  { img: "/image/food-1.jpg", text: "Never eat more than you can live." },
  { img: "/image/food-2.jpg", text: "Never eat more than you can live." },
  { img: "/image/food-3.jpg", text: "Never eat more than you can live." },
];

const chefsData = [
  { name: "Mark Hencery Tix", role: "Main Chef", img: "/image/chef-1.jpg" },
  { name: "Dylan Meringue", role: "Master Chef", img: "/image/chef-2.jpg" },
  { name: "Pelican Steve", role: "Executive Chef", img: "/image/chef-3.jpg" },
];

// --- Toast helpers ---
const notifySuccess = (msg) => toast.success(msg, { position: "top-center" });
const notifyError = (msg) => toast.error(msg, { position: "top-center" });

// --- Components ---
const HeaderAboute = () => (
  <section className="container mx-auto text-center py-8 px-4 sm:px-6 lg:px-0">
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary py-2">
      About Us
    </h1>
    <span className="text-neutral-400 font-light max-w-2xl block mx-auto mt-4 text-sm sm:text-base">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </span>
  </section>
);

const ExperienceImages = ({ data }) => (
  <section className="container mx-auto grid gap-6 py-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-0">
    {data.map((item, i) => (
      <img
        key={i}
        src={item.src}
        alt={item.alt}
        onError={() => notifyError(`Failed to load image: ${item.alt}`)}
        className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-2xl shadow-lg"
      />
    ))}
  </section>
);

const ExperienceCards = ({ data }) => (
  <section className="container mx-auto grid gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-0 mt-8">
    {data.map((item, i) => (
      <div key={i} className="p-4 sm:p-6 rounded-2xl shadow-lg bg-base-200">
        <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
          {item.count} <Star1 variant="Bold" size={24} color="#ffba00" />
        </h2>
        <p className="text-neutral-300 mt-2 text-sm sm:text-base">
          {item.text}
        </p>
      </div>
    ))}
  </section>
);

const AboutRestaurant = ({ data }) => {
  useEffect(() => {
    if (!data || !data.image) {
      notifyError("About restaurant data is missing!");
    } else {
      notifySuccess("About restaurant loaded successfully!");
    }
  }, [data]);

  if (!data) return null;

  return (
    <section className="container mx-auto grid gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-0 mt-16">
      <img
        src={data.image}
        alt="entry"
        className="w-full h-64 sm:h-80 md:h-[380px] object-cover rounded-2xl shadow-lg"
      />
      <div className="flex flex-col justify-center">
        <h3 className="text-secondary font-semibold text-sm sm:text-base">
          {data.heading}
        </h3>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug mt-2 sm:mt-3">
          {data.title}
        </h2>
        <p className="text-neutral-300 mt-2 sm:mt-4 text-sm sm:text-base">
          {data.description}
        </p>
      </div>
    </section>
  );
};

const TrendingFoods = ({ data }) => (
  <section className="container mx-auto px-4 sm:px-6 lg:px-0 mt-16 text-center">
    <h3 className="text-secondary font-semibold text-sm sm:text-base">
      OUR TRENDING
    </h3>
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2">
      Fresh & Better Foods For You
    </h2>
    <p className="text-neutral-300 max-w-2xl mx-auto mt-2 sm:mt-4 text-sm sm:text-base">
      There are many variations of Lorem Ipsum available but most don't look
      believable.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 sm:mt-10">
      {data.map((item, i) => (
        <div
          key={i}
          className="rounded-2xl overflow-hidden shadow-lg bg-base-200"
        >
          <img
            src={item.img}
            alt={item.text}
            className="w-full h-48 sm:h-56 md:h-60 object-cover"
            onError={() => notifyError(`Failed to load image: ${item.text}`)}
          />
          <p className="p-4 font-medium text-neutral-200 text-sm sm:text-base">
            {item.text}
          </p>
        </div>
      ))}
    </div>
  </section>
);

const ChefsSection = ({ data }) => (
  <section className="container mx-auto px-4 sm:px-6 lg:px-0 mt-16 mb-16 text-center">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
      Our Professional Chefs
    </h2>
    <p className="text-neutral-300 max-w-2xl mx-auto mt-2 sm:mt-4 text-sm sm:text-base">
      A professional networking platform for chefs to showcase their work.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 sm:mt-10">
      {data.map((chef, i) => (
        <div
          key={i}
          className="bg-base-200 rounded-2xl p-4 sm:p-6 shadow-lg flex flex-col items-center"
        >
          <img
            src={chef.img}
            alt={chef.name}
            className="w-full h-52 sm:h-60 md:h-64 object-cover rounded-xl"
            onError={() =>
              notifyError(`Failed to load chef image: ${chef.name}`)
            }
          />
          <h3 className="text-lg sm:text-xl font-semibold mt-2 sm:mt-4">
            {chef.role}
          </h3>
          <p className="text-neutral-400 text-sm mt-1">{chef.name}</p>
          <p className="text-neutral-400 text-xs sm:text-sm flex items-center justify-center gap-1 mt-1">
            <User size={16} variant="Bulk" color="#ff7d5d" /> 12 Years
            Experience
          </p>
        </div>
      ))}
    </div>
    <button className="mt-6 sm:mt-10 btn btn-warning text-black rounded-full flex items-center gap-2 mx-auto">
      View More <ArrowRight2 variant="Bold" size={20} />
    </button>
  </section>
);

// --- Main AboutUs Component ---
export default function AboutUs() {
  return (
    <div className="min-h-screen w-full text-white font-sans">
      <Toaster />
      <HeaderAboute />
      <ExperienceImages data={experienceImagesData} />
      <ExperienceCards data={experienceCardsData} />
      <AboutRestaurant data={aboutRestaurantData} />
      <TrendingFoods data={trendingFoodsData} />
      <ChefsSection data={chefsData} />
    </div>
  );
}
