import CopyRight from "./components/CopyRight";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HomeAbout from "./components/HomeAbout";
import MenuResturant from "./components/MenuResturant";

function App() {
  return (
    <div className="p-5 mx-auto">
      <Header />
      <Hero />
      <MenuResturant />
      <HomeAbout />
      <Footer />
      <CopyRight />
    </div>
  );
}

export default App;
