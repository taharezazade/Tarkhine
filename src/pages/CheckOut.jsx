import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { LuArrowLeft, LuTrash2 } from "react-icons/lu";

export default function Checkout() {
  const { cartItems, removeFromCart } = useCart();

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="px-6 sm:px-10 py-6 text-white">
      <h1 className="text-3xl font-bold text-[#ff7d5d] mb-6">Checkout</h1>

      {/* CART EMPTY */}
      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-white/60 text-lg mb-4">Your cart is empty.</p>
          <Link to="/menu" className="btn btn-ghost">
            <LuArrowLeft className="mr-2" /> Back to Menu
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT SIDE – ITEMS */}
          <div className="flex-1 bg-base-300 p-4 h-fit rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Your Items</h2>

            <div className="flex flex-col gap-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-base-200 p-3 rounded-lg shadow-md">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-secondary">
                        {item.name}
                      </h3>
                      <p className="text-white/60">${item.price.toFixed(2)}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-500">
                    <LuTrash2 size={22} />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 mt-4 pt-4 flex justify-between text-lg">
              <span>Total:</span>
              <span className="text-[#ff7d5d] font-bold">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>

          {/* RIGHT SIDE – FORM */}
          <div className="lg:w-1/3 bg-base-300 p-4 rounded-xl shadow-lg h-fit">
            <h2 className="text-xl font-semibold mb-4">Your Details</h2>

            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="input input-bordered w-full bg-base-200"
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="input input-bordered w-full bg-base-200"
              />
              <textarea
                placeholder="Delivery Address"
                className="textarea textarea-bordered w-full bg-base-200"
                rows={4}></textarea>

              <button className="btn btn-success w-full mt-2 text-black">
                Place Order – ${totalPrice.toFixed(2)}
              </button>

              <Link to="/menu" className="btn btn-ghost w-full mt-2 text-white">
                <LuArrowLeft className="mr-2" /> Back to Menu
              </Link>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
