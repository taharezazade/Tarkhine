import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CopyRight from "./components/CopyRight";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HomeAbout from "./components/HomeAbout";
import MenuResturant from "./components/MenuResturant";
import SignInForm from "./components/SignInForm";
import LoginForm from "./components/LoginForm";
import Menu from "./pages/Menu";
import Profile from "./pages/Profile";
import Representation from "./pages/Representation";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignInOrLogin from "./pages/SignInOrLogin";
import Cart from "./pages/Cart";
import Search from "./pages/Search";
import { Helmet } from "react-helmet";
import useCurrentPath from "./Hooks/useCurrentPath";
import FoodDetail from "./pages/FoodDetail";
import CheckOut from "./pages/CheckOut";

import { CartProvider } from "./Context/CartContext";
import { UserProvider, useUser } from "./Context/UserContext";

import Success from "./pages/Success";
import ErrorPage from "./pages/Error";
import Pending from "./pages/Pending";
import NotFound from "./pages/NotFound";

import ToastProvider from "./Utils/ToastProvider";

function AppContent() {
  const { title } = useCurrentPath();

  return (
    <UserProvider>
      <Helmet>
        <title>{title}</title>
      </Helmet>
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
          <Route path="/menu/:foodName" element={<FoodDetail />} />
          <Route path="/representation" element={<Representation />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<SignInOrLogin />} />
          <Route path="/SignInForm" element={<SignInForm />} />
          <Route path="/LoginForm" element={<LoginForm />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profilePage" element={<Profile />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/success" element={<Success />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/pending" element={<Pending />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="/search" element={<Search />} />
        </Routes>
        <Footer />
        <CopyRight />
      </div>
    </UserProvider>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}

export default App;
