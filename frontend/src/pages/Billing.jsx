import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Billing() {
  const [data, setData] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  // ================= FETCH =================
  const fetchInvoices = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    try {
      const res = await fetch(
        `http://localhost:5000/api/service/invoices/${user.id}`
      );

      const result = await res.json();

      if (Array.isArray(result)) {
        setData(result);
      } else {
        console.error("API ERROR:", result);
        setData([]);
      }

    } catch (err) {
      console.error(err);
      setData([]);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  // ================= PAYMENT =================
  const handlePayment = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/service/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          invoice_id: selectedInvoice.id,
          payment_method: "UPI",
        }),
      });

      const result = await res.json();
      alert(result.message);

      setSuccess(true);
      fetchInvoices();

    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-6">
        Billing & Payments
      </h1>

      <div className="bg-[#0f172a] rounded-2xl border border-gray-700 overflow-hidden">
        <table className="w-full text-sm">

          <thead className="bg-[#1e293b] text-gray-400">
            <tr>
              <th className="text-left px-4 py-3">Vehicle</th>
              <th>Service</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th className="text-right px-4">Action</th>
            </tr>
          </thead>

          <tbody className="text-gray-300">
            {Array.isArray(data) && data.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-700 hover:bg-[#1e293b]"
              >

                <td className="px-4 py-4 font-medium">
                  {item.vehicle_name}
                  <p className="text-xs text-gray-500">
                    {item.vehicle_number}
                  </p>
                </td>

                <td>{item.service_name}</td>

                    <td className="font-semibold text-orange-400">
                    ₹{Number(item.final_amount).toFixed(2)}
                    </td>
                <td>
                  {new Date(item.booking_date).toLocaleDateString()}
                </td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      item.payment_status === "paid"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {item.payment_status === "paid"
                      ? "Paid"
                      : "Pending"}
                  </span>
                </td>

                <td className="text-right px-4">
                  {item.payment_status === "paid" ? (
                    <button
                      onClick={() => navigate(`/invoice/${item.id}`)}
                      className="px-3 py-1 border border-green-500 text-green-400 rounded hover:bg-green-500/10"
                    >
                      View
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedInvoice(item);
                        setShowPayment(true);
                      }}
                      className="px-3 py-1 border border-orange-500 text-orange-400 rounded hover:bg-orange-500/10"
                    >
                      Pay Now
                    </button>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>

        {data.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            No invoices found
          </div>
        )}
      </div>

      {/* ================= PAYMENT MODAL ================= */}
      {showPayment && selectedInvoice && (
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
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=autofix@upi&am=${selectedInvoice.total_amount}`}
                    alt="QR"
                  />
                </div>

                <p className="text-center text-white mb-4">
                  ₹{selectedInvoice.total_amount}
                </p>

                <button
                  onClick={handlePayment}
                  className="w-full bg-orange-500 py-2 rounded-lg"
                >
                  Confirm Payment
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