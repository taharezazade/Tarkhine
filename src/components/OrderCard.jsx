function OrderCard({ order }) {
  const statusStyle = {
    pending: "text-warning",
    delivered: "text-success",
    canceled: "text-error",
  };

  return (
    <div className="card bg-base-300 p-3 rounded-xl">
      <p className="text-xs text-white/40 mb-1">
        Order ID: <span className="text-white">&nbsp;{order.id}</span>
      </p>

      <p className="text-lg font-semibold">Total: ${order.total.toFixed(2)}</p>

      <p className={`font-medium ${statusStyle[order.status]}`}>
        Status: <span className="capitalize">{order.status}</span>
      </p>

      <p className="text-xs text-white/40 mt-2">
        {new Date(order.createdAt).toLocaleString()}
      </p>
    </div>
  );
}
export default OrderCard;
