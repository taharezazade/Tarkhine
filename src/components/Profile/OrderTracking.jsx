import { useState, useEffect } from "react";
import { Bag, ArrowRight3 } from "iconsax-reactjs";
import { useOrders } from "../../Context/OrderContext";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function OrderTracking() {
  const { orders } = useOrders();
  const [filter, setFilter] = useState("all");
  const [filteredOrders, setFilteredOrders] = useState(orders);

  const notify = (msg) =>
    toast(msg, {
      position: "top-center",
      style: {
        borderRadius: "12px",
        padding: "16px",
        background: "#333",
        color: "#fff",
      },
    });

  useEffect(() => {
    const filtered =
      filter === "all"
        ? orders
        : orders.filter((order) => order.status === filter);

    setFilteredOrders(filtered);

    if (filtered.length === 0) {
      notify(`No orders in "${filter}" category.`);
    }
  }, [filter, orders]);

  return (
    <div className="px-2 sm:px-3 md:px-5 py-4">
      <Toaster />
      <h2 className="text-4xl sm:text-5xl font-bold text-secondary mb-6">
        Orders
      </h2>
      <div className="divider divider-neutral"></div>

      {/* Badges */}
      <div className="flex gap-3 flex-wrap mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`cursor-pointer badge badge-secondary ${
            filter === "all" ? "badge-lg" : ""
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`cursor-pointer badge badge-primary badge-soft ${
            filter === "pending" ? "badge-lg" : ""
          }`}
        >
          Current <ArrowRight3 size={18} />
        </button>
        <button
          onClick={() => setFilter("delivered")}
          className={`cursor-pointer badge badge-success badge-soft ${
            filter === "delivered" ? "badge-lg" : ""
          }`}
        >
          Delivered <ArrowRight3 size={18} />
        </button>
        <button
          onClick={() => setFilter("canceled")}
          className={`cursor-pointer badge badge-error badge-soft ${
            filter === "canceled" ? "badge-lg" : ""
          }`}
        >
          Canceled <ArrowRight3 size={18} />
        </button>
      </div>

      {/* Orders */}
      <div className="mt-8">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center">
            <p className="text-white/50 text-lg sm:text-xl">
              No orders in this category.
            </p>
            <Link
              to="/menu"
              className="btn btn-secondary btn-soft mt-4 flex items-center gap-2"
            >
              <Bag size={22} /> Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-gradient-to-r from-[#ff7d5d]/30 to-[#ff7d5d]/10 p-4 rounded-2xl shadow-md flex flex-col justify-between"
              >
                {/* Order Header */}
                <div className="flex gap-2 flex-col-reverse justify-between items-start mb-3">
                  <p className="text-xs sm:text-sm text-white/50 font-mono break-all">
                    Order ID: {order.id}
                  </p>
                  <span
                    className={`badge badge-md inline text-xs sm:text-sm font-semibold capitalize ${
                      order.status === "delivered"
                        ? "badge-success"
                        : order.status === "pending"
                        ? "badge-warning"
                        : "badge-error"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Order Total */}
                <p className="text-lg sm:text-xl font-bold text-white mb-2">
                  Total:{" "}
                  <span className="text-secondary">
                    ${order.total.toFixed(2)}
                  </span>
                </p>

                {/* Order Date */}
                <p className="text-sm sm:text-base text-white/50 ">
                  Placed on: {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
