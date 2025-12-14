export default function Pending() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-white px-6">
      <h1 className="text-4xl font-bold text-blue-400 mb-4">Processing...</h1>
      <p className="text-white/70 text-lg">Your order is being processed.</p>
    </div>
  );
}
