import { Cake, Instagram, Send2, Whatsapp } from "iconsax-reactjs";
import { LuGlassWater, LuDessert } from "react-icons/lu";

function EasyAccess() {
  return (
    <div className="w-full items-start justify-center">
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
    <div className="w-full bg-red-500 items-start justify-center p-2">
      <nav className="font-medium text-lg gap-2 flex flex-col">
        <a className="items-start justify-sitems-start flex" href="#">
          <LuGlassWater size="28" color="#00bc7d" />
          Drinks
        </a>
        <a className="items-start justify-sitems-start flex" href="#">
          <LuDessert size="28" color="#00bc7d" />
          Desert
        </a>
        <a className="" href="#"></a>
        <a className="" href="#"></a>
      </nav>
    </div>
  );
}

function SubmitComment() {
  return <div className="hidden md:inline-flex">SubmitComment</div>;
}

function Footer() {
  return (
    <div className="bg-[url(/image/Footer.png)] p-4 rounded-2xl gap-4 flex flex-col bg-black bg-blend-luminosity my-4 h-fit bg-center bg-cover">
      <EasyAccess />
      <MenuFooter />
      <SubmitComment />
    </div>
  );
}

export default Footer;
