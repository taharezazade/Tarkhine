import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuArrowLeft, LuTrash2 } from "react-icons/lu";
import { useCart } from "../Context/CartContext";
import { Bag, Card, TickCircle, WalletCheck, Warning2 } from "iconsax-reactjs";
import { useOrders } from "../Context/OrderContext";
import DeliveryAddress from "../components/DeliveryAddress";
import toast, { Toaster } from "react-hot-toast";

export default function Checkout() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const [code, setCode] = useState("");
  const [status, setStatus] = useState(null);

  const notifyError = (msg) =>
    toast.error(msg, {
      position: "top-center",
      style: {
        borderRadius: "12px",
        padding: "16px",
        background: "#333",
        color: "#fff",
      },
    });

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!cartItems || cartItems.length === 0) {
      notifyError("Your cart is empty. Please add items before checkout.");
      return;
    }
    setIsPending(true);
    setCountdown(3);
  };

  useEffect(() => {
    if (!isPending) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);

          try {
            const pages = ["/success", "/error", "/404"];
            const randomPage = pages[Math.floor(Math.random() * pages.length)];

            let status = "pending";
            if (randomPage === "/success") status = "delivered";
            if (randomPage === "/error" || randomPage === "/404")
              status = "canceled";

            const order = {
              id: crypto.randomUUID(),
              items: cartItems,
              total: totalPrice,
              status,
              createdAt: new Date().toISOString(),
            };

            addOrder(order);

            if (randomPage === "/success") {
              clearCart();
            }

            navigate(randomPage);
          } catch {
            notifyError("Navigation failed. Please try again.");
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPending, cartItems, addOrder, clearCart, navigate, totalPrice]);

  const VALID_CODE = "OFF20";
  const handleCheck = (value) => {
    setCode(value);

    if (!value) {
      setStatus(null);
    } else if (value === VALID_CODE) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  };

  return (
    <div className="px-6 sm:px-10 py-6 text-white">
      <Toaster />
      <div className="flex flex-row">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-[#ff7d5d]">
          Check Out
        </h1>
        <ul className="steps pb-6">
          <li className="step step-secondary w-56">
            <span className="step-icon">
              <Bag size={20} variant="Bulk" />
            </span>{" "}
            Cart
          </li>
          <li className="step step-secondary w-56">
            <span className="step-icon">
              <WalletCheck size={20} variant="Bulk" />
            </span>{" "}
            Check Out
          </li>
          <li className="step">
            <span className="step-icon">
              <Card size={20} variant="Bulk" />
            </span>{" "}
            Payment
          </li>
        </ul>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-white/60 text-lg mb-4">Your cart is empty.</p>
          <Link to="/menu" className="btn btn-ghost">
            <LuArrowLeft className="mr-2" /> Back to Menu
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 bg-base-300 p-4 h-fit rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Your Items</h2>
            <div className="flex flex-col gap-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-base-200 p-3 rounded-lg shadow-md"
                >
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
                    onClick={() => {
                      try {
                        removeFromCart(item.id);
                        toast.success(`${item.name} removed from cart`, {
                          position: "top-center",
                          style: {
                            borderRadius: "12px",
                            padding: "16px",
                            background: "#333",
                            color: "#fff",
                          },
                        });
                      } catch {
                        notifyError("Failed to remove item from cart.");
                      }
                    }}
                    className="text-red-400 hover:text-red-500"
                  >
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

          <div className="lg:w-1/3 bg-base-300 p-4 rounded-xl shadow-lg h-fit">
            <h2 className="text-xl font-semibold mb-4">Your Details</h2>

            {isPending ? (
              <div className="text-center p-10">
                <p className="text-lg mb-2">
                  Processing your order... Redirecting in {countdown} second
                  {countdown > 1 ? "s" : ""}.
                </p>
                <div className="mx-auto w-12 h-12 border-4 border-t-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <form className="flex flex-col gap-4" onSubmit={handlePlaceOrder}>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="input input-bordered w-full bg-base-200"
                  required
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="input input-bordered w-full bg-base-200"
                  required
                />
                <DeliveryAddress />
                <fieldset className="fieldset">
                  <input
                    type="text"
                    className="input input-bordered w-full bg-base-200"
                    placeholder="Discount code"
                    value={code}
                    onChange={(e) => handleCheck(e.target.value)}
                  />

                  {status === "error" && (
                    <p className="label text-red-400 text-base font-light">
                      <Warning2 size={20} variant="Linear" className="inline" />
                      The discount code is invalid!
                    </p>
                  )}

                  {status === "success" && (
                    <p className="label text-green-500 text-base font-light">
                      <TickCircle size={20} variant="Bold" className="inline" />
                      Discount code applied successfully
                    </p>
                  )}
                </fieldset>
                <button className="btn btn-success w-full mt-2 text-black">
                  Place Order – ${totalPrice.toFixed(2)}
                </button>

                <Link
                  to="/menu"
                  className="btn btn-ghost w-full mt-2 text-white"
                >
                  <LuArrowLeft className="mr-2" /> Back to Menu
                </Link>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
