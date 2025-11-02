import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CopyRight from "./components/CopyRight";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HomeAbout from "./components/HomeAbout";
import MenuResturant from "./components/MenuResturant";

// Pages
import Menu from "./pages/Menu";
import Representation from "./pages/Representation";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Search from "./pages/Search";

function App() {
  return (
    <Router>
      <div className="p-5 mx-auto">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <MenuResturant />
                <HomeAbout />
              </>
            }
          />
          <Route path="/menu" element={<Menu />} />
          <Route path="/representation" element={<Representation />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<Search />} />
        </Routes>
        <Footer />
        <CopyRight />
      </div>
    </Router>
  );
}

export default App;
