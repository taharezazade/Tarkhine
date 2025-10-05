import {
  ArrowCircleRight2,
  Diagram,
  HomeWifi,
  MenuBoard,
  User,
} from "iconsax-reactjs";

function Information() {
  return (
    <div className="flex flex-col items-start gap-2 md:w-1/2">
      <h1 className="text-emerald-500 text-3xl font-black">
        Tarkhineh Restaurant Chain
      </h1>
      <p className="w-11/12 pb-1 text-lg text-justify">
        Hospitality is one of the most important characteristics of Iranians and
        we are proud to have been serving the noble people of Iran for more than
        20 years. At Tarkhineh Restaurant Chain, we have always tried to provide
        healthy and dignified food to our dear ones in an authentic environment
        based on modern architecture and design, alongside a pleasant nature.
      </p>
      <button className="btn btn-primary rounded-2xl">
        More information <ArrowCircleRight2 color="#00bc7d" />
      </button>
    </div>
  );
}

function CategoryIconInformation() {
  return (
    <div className=" w-full h-40 md:w-1/2 gap-2 grid-cols-2 grid">
      <div className="w-full h-20 md:w-56 md:mx-auto flex items-center justify-center rounded-xl flex-col bg-black/40 backdrop-blur-md">
        <Diagram size="28" color="#00bc7d" variant="Bulk" />
        <p className="">High quality food</p>
      </div>
      <div className="w-full h-20 md:w-56 md:mx-auto flex items-center justify-center rounded-xl flex-col bg-black/40 backdrop-blur-md">
        <User size="28" color="#00bc7d" variant="Bulk" />
        <p className="">Professional staff</p>
      </div>
      <div className="w-full h-20 md:w-56 md:mx-auto flex items-center justify-center rounded-xl flex-col bg-black/40 backdrop-blur-md">
        <MenuBoard size="28" color="#00bc7d" variant="Bulk" />
        <p className="">Varied menu</p>
      </div>
      <div className="w-full h-20 md:w-56 md:mx-auto flex items-center justify-center rounded-xl flex-col bg-black/40 backdrop-blur-md">
        <HomeWifi size="28" color="#00bc7d" variant="Bulk" />
        <p className="">Calm and pleasant</p>
      </div>
    </div>
  );
}

function HomeAbout() {
  return (
    <div className="bg-[url(/image/Restaurant.jpg)] gap-4 bg-black bg-blend-luminosity justify-between w-full h-fit bg-cover bg-center rounded-2xl mt-5 p-5 flex flex-col md:flex-row items-center">
      <Information />
      <CategoryIconInformation />
    </div>
  );
}

export default HomeAbout;
