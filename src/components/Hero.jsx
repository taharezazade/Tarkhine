import { ArrowCircleRight2 } from "iconsax-reactjs";

function Hero() {
  return (
    <section className="relative w-full mt-5">
      <div className="bg-[url('/image/Slider.png')] bg-black p-5 bg-blend-luminosity bg-cover bg-center rounded-2xl flex items-center h-fit md:h-96 lg:h-[30rem]">
        {/* container برای محدود کردن عرض */}
        <div className="container mx-auto md:w-full sm:px-6 md:px-10">
          <div className="w-full text-start">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Welcome to <span className="text-emerald-500">Tarkhineh</span>{" "}
              Restaurant.
            </h2>

            <p className="text-neutral-300 mt-3 sm:mt-4 md:text-lg lg:text-xl w-full md:w-[90%] lg:w-[80%] mx-auto md:mx-0 text-start">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>

            <button
              className="mt-5 inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 
                         bg-emerald-600 hover:bg-emerald-700 text-white font-semibold 
                         rounded-xl text-sm sm:text-base transition-all">
              Go to More{" "}
              <ArrowCircleRight2 variant="Linear" color="#fff" size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
