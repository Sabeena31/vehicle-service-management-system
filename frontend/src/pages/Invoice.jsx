import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Invoice() {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  // 🔥 FEEDBACK STATE
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  // ================= FETCH =================
  const fetchInvoice = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/service/invoice/${id}`
      );

      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchInvoice();
  }, [id]);

  // ================= PAYMENT =================
  const handlePayment = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/service/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          invoice_id: data.id,
          payment_method: "UPI",
        }),
      });

      const result = await res.json();
      alert(result.message);

      fetchInvoice();
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  // ================= FEEDBACK =================
  const submitFeedback = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/service/feedback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user.id,
            request_id: data.id,
            rating,
            comments: comment,
          }),
        }
      );

      const result = await res.json();
      alert(result.message);

      setComment("");
    } catch (err) {
      console.error(err);
    }
  };

  // ================= LOADING =================
  if (!data) {
    return <Layout>Loading...</Layout>;
  }

  // 🔥 SAFE VALUES
  const amount = Number(data.total_amount) || 0;
  const tax = Number(data.tax) || Math.round(amount * 0.1);
  const discount = Number(data.discount) || 0;

  const total = amount + tax;
  const final = total - discount;

  return (
    <Layout>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Invoice Details</h1>
          <p className="text-gray-400 text-sm">Invoice #{data.id}</p>
        </div>

        <button
          onClick={() => setShowPayment(true)}
          disabled={data.payment_status === "paid"}
          className={`px-4 py-2 rounded-lg ${
            data.payment_status === "paid"
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          }`}
        >
          {data.payment_status === "paid" ? "Paid" : "Pay Now"}
        </button>
      </div>

      {/* INVOICE CARD */}
      <div className="bg-[#0f172a] text-white rounded-2xl p-8 border border-gray-700 shadow-xl mb-8">

        <h2 className="text-center text-xl font-bold mb-6">
          TAX INVOICE
        </h2>

        {/* STATUS */}
        <div className="flex justify-between mb-6">
          <p className="text-sm">
            Payment Status: {data.payment_status}
          </p>

          <p className="text-sm">
            {new Date(data.booking_date).toLocaleDateString()}
          </p>
        </div>

        {/* COMPANY */}
        <div className="flex justify-between mb-8">
          <div>
            <h2 className="font-bold text-lg">AUTOFIX PRO</h2>
            <p className="text-sm text-gray-400">
              123 Service Lane, Tech City
            </p>
          </div>

          <div className="text-right">
            <h2 className="text-xl font-semibold">INVOICE</h2>
            <p className="text-sm text-gray-400">#INV-{data.id}</p>
          </div>
        </div>

        {/* CUSTOMER */}
        <div className="grid grid-cols-2 gap-6 mb-8 text-sm">
          <div>
            <p className="text-gray-400 mb-1">Customer</p>
            <p>{user?.name || "User"}</p>
          </div>

          <div>
            <p className="text-gray-400 mb-1">Vehicle</p>
            <p>{data.vehicle_name || "N/A"}</p>
            <p className="text-gray-400">{data.vehicle_number}</p>
          </div>
        </div>

        {/* SERVICE TABLE */}
        <table className="w-full text-sm mb-8">
          <thead className="border-b border-gray-700">
            <tr>
              <th className="pb-3 text-left">Service</th>
              <th>Qty</th>
              <th>Price</th>
              <th className="text-right">Amount</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b border-gray-700">
              <td className="py-3">{data.service_name}</td>
              <td>1</td>
              <td>₹{amount}</td>
              <td className="text-right">₹{amount}</td>
            </tr>
          </tbody>
        </table>

        {/* BILL SUMMARY */}
        <div className="flex justify-end">
          <div className="w-64 space-y-2 text-sm">

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{amount}</span>
            </div>

            <div className="flex justify-between">
              <span>Tax</span>
              <span>₹{tax}</span>
            </div>

            <div className="flex justify-between text-green-400">
              <span>Discount</span>
              <span>- ₹{discount}</span>
            </div>

            <div className="flex justify-between font-bold text-orange-400 text-lg">
              <span>Final Amount</span>
              <span>₹{final}</span>
            </div>

          </div>
        </div>

        <p className="text-center text-xs mt-6 text-gray-400">
          This is a computer-generated invoice.
        </p>
      </div>

      {/* 🔥 FEEDBACK */}
      {data.payment_status === "paid" && (
        <div className="bg-[#1e293b] p-6 rounded-xl border border-gray-700">
          <h3 className="mb-3 font-semibold">Give Feedback</h3>

          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="mb-3 p-2 bg-[#0f172a] border rounded"
          >
            <option value="5">⭐ 5</option>
            <option value="4">⭐ 4</option>
            <option value="3">⭐ 3</option>
            <option value="2">⭐ 2</option>
            <option value="1">⭐ 1</option>
          </select>

          <textarea
            placeholder="Write your feedback..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 bg-[#0f172a] border rounded mb-3"
          />

          <button
            onClick={submitFeedback}
            className="bg-orange-500 px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      )}

      {/* PAYMENT MODAL */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-[#0f172a] p-6 rounded-2xl w-96 border border-gray-700">

            <h2 className="text-xl text-white text-center mb-4">
              UPI Payment
            </h2>

            {success ? (
              <div className="text-center text-white">
                <h2 className="text-green-400 text-xl mb-4">
                  Payment Successful ✔
                </h2>

                <button
                  onClick={() => {
                    setShowPayment(false);
                    setSuccess(false);
                  }}
                  className="w-full bg-green-500 py-2 rounded-lg"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-center mb-4">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=autofix@upi&am=${final}`}
                    alt="QR"
                  />
                </div>

                <p className="text-center text-white mb-4">₹{final}</p>

                <button
                  onClick={async () => {
                    setProcessing(true);

                    setTimeout(async () => {
                      await handlePayment();
                      setProcessing(false);
                      setSuccess(true);
                    }, 2000);
                  }}
                  className="w-full bg-orange-500 py-2 rounded-lg"
                >
                  {processing ? "Processing..." : "Pay Now"}
                </button>

                <button
                  onClick={() => setShowPayment(false)}
                  className="w-full mt-2 border py-2 rounded-lg text-white"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}

    </Layout>
  );
}