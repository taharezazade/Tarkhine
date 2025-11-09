function CopyRight() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-center text-center gap-1 sm:gap-2 py-4 px-3">
      <span className="text-[#ff7d5d] font-light">© {currentYear}</span>
      <span className="text-sm sm:text-base text-gray-300">
        All rights to this site are reserved for{" "}
        <span className="text-[#ff7d5d] font-semibold">Tarkhineh</span>.
      </span>
    </div>
  );
}

export default CopyRight;
