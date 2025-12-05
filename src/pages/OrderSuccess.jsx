import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
// import { downloadInvoicePDF } from "../components/InvoicePDF";

function OrderSuccess() {
  const location = useLocation();
  const invoiceId = new URLSearchParams(location.search).get("invoice");

  const [order, setOrder] = useState(null);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("orders_v1")) || [];
    const found = orders.find((o) => o.invoiceId === invoiceId);
    setOrder(found);
  }, []);

  if (!order) return <div className="text-center pt-28">Loading...</div>;

  return (
    <div className="pt-28 max-w-2xl mx-auto text-center dark:text-gray-100">

      <h1 className="text-4xl font-bold text-green-600">🎉 Order Successful</h1>
      <p className="mt-3 text-lg">Thank you for your purchase!</p>

      {/* DOWNLOAD PDF BUTTON */}
      <button
        onClick={() => downloadInvoicePDF(order)}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
      >
        📄 Download Invoice (PDF)
      </button>

      <Link
        to="/orders"
        className="mt-4 block underline text-blue-400 text-lg"
      >
        View Orders
      </Link>


      {/* INVOICE BOX (hidden but used for PDF) */}
      <div
        id="invoice-box"
        className="bg-white dark:bg-gray-800 p-6 mt-10 rounded shadow text-left"
      >
        <h2 className="text-2xl font-bold">Invoice #{order.invoiceId}</h2>
        <p className="mt-2">Date: {order.date}</p>

        <h3 className="text-xl font-semibold mt-4">Customer:</h3>
        <p>{order.user.name}</p>
        <p>{order.user.phone}</p>
        <p>{order.user.address}</p>

        <h3 className="text-xl font-semibold mt-4">Items:</h3>
        <ul className="mt-2">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between border-b py-2">
              <span>{item.title} × {item.qty}</span>
              <span>₹{(item.price * item.qty).toFixed(2)}</span>
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-bold mt-4">
          Total: ₹{order.total.toFixed(2)}
        </h2>
      </div>

    </div>
  );
}

export default OrderSuccess;
