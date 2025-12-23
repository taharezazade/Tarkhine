import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    toast.error("Page not found!", { position: "top-center" });
  }, []);

  return (
    <div className="flex flex-row items-center gap-10 justify-center text-white px-6">
      <Toaster />
      <img className="w-[35rem]" alt="Not found Page" src="/image/404.png" />
      <div className="flex flex-col gap-4">
        <h1 className="text-9xl font-black text-secondary mt-10">OOPS!</h1>
        <p className="text-white/60 text-2xl font-extralight">
          This page is like my social life – non-existent.
        </p>
        <Link to="/" className="btn btn-secondary rounded-2xl">
          Go To Home
        </Link>
      </div>
    </div>
  );
}
