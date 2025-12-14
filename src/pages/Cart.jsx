import { useCart } from "../Context/CartContext";
import { Link } from "react-router-dom";
import { LuTrash2 } from "react-icons/lu";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Cart() {
  const { cartItems, setCartItems } = useCart();

  const removeItem = (id) => {
    try {
      const removedItem = cartItems.find((item) => item.id === id);
      setCartItems(cartItems.filter((item) => item.id !== id));
      toast.success(`${removedItem.name} removed from cart.`);
    } catch {
      toast.error("Failed to remove item from cart.");
    }
  };

  const increaseQty = (id) => {
    try {
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } catch {
      toast.error("Failed to increase quantity.");
    }
  };

  const decreaseQty = (id) => {
    try {
      setCartItems(
        cartItems.map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } catch {
      toast.error("Failed to decrease quantity.");
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="px-4 sm:px-6 md:px-10 py-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-[#ff7d5d]">
          Your Cart is Empty
        </h1>
        <Link
          to="/menu"
          className="inline-block text-white bg-[#ff7d5d] px-6 py-2 rounded-lg font-medium hover:bg-[#ff5a3d] transition">
          Browse Menu
        </Link>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    );
  }

  return (
    <div className="px-1 sm:px-6 md:px-4 py-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-[#ff7d5d]">
        Your Cart
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 flex flex-col gap-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center sm:items-start bg-base-300 rounded-xl p-4 gap-4 shadow-md">
              <img
                src={item.image}
                alt={item.name}
                className="w-full sm:w-32 h-32 object-cover rounded-lg"
              />
              <div className="flex-1 flex flex-col gap-2 w-full">
                <h2 className="text-xl font-semibold text-[#ff7d5d]">
                  {item.name}
                </h2>
                <p className="text-white/70">{item.description}</p>
                <p className="font-semibold">Price: ${item.price.toFixed(2)}</p>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="px-3 py-1 rounded-lg bg-neutral-700 hover:bg-neutral-600 transition font-semibold">
                    -
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="px-3 py-1 rounded-lg bg-neutral-700 hover:bg-neutral-600 transition font-semibold">
                    +
                  </button>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-auto text-red-500 hover:text-red-400 transition">
                    <LuTrash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="md:col-span-4 flex flex-col gap-4 bg-base-300 p-6 rounded-xl shadow-md h-fit">
          <h2 className="text-xl font-semibold text-[#ff7d5d] mb-4">
            Order Summary
          </h2>
          <div className="flex justify-between font-medium">
            <span>Subtotal:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-medium text-white/70">
            <span>Items:</span>
            <span>{cartItems.length}</span>
          </div>

          <Link
            to="/checkout"
            className="mt-4 w-full text-center bg-[#ff7d5d] text-white py-2 rounded-lg font-semibold hover:bg-[#ff5a3d] transition">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
