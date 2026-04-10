import Layout from "../components/Layout";

export default function Invoice() {
  return (
    <Layout>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <p className="text-gray-400 text-sm">Invoice Details</p>
          <h1 className="text-2xl font-semibold">
            #INV-2023-001
          </h1>
          <p className="text-gray-400 text-sm">
            Tesla Model 3 • Performance Dual Motor
          </p>
        </div>

        <div className="text-right">
          <p className="text-gray-400 text-sm">Total Amount Due</p>
          <h2 className="text-3xl font-bold text-orange-500">
            $358.90
          </h2>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-2 gap-8">

        {/* LEFT: PAYMENT METHODS */}
        <div className="space-y-4">
          <h2 className="font-semibold mb-2">Payment Method</h2>

          <Method title="Credit / Debit Card" active />
          <Method title="UPI Payment" />
          <Method title="Net Banking" />
          <Method title="Digital Wallets" />
        </div>

        {/* RIGHT: CARD FORM */}
        <div className="bg-[#1e293b] p-6 rounded-xl border border-gray-700 shadow-xl">
          <h2 className="font-semibold mb-4">Card Details</h2>

          {/* NAME */}
          <input
            placeholder="Cardholder Name"
            className="w-full mb-4 p-3 bg-[#0f172a] rounded-lg border border-gray-600"
          />

          {/* CARD NUMBER */}
          <input
            placeholder="Card Number"
            className="w-full mb-4 p-3 bg-[#0f172a] rounded-lg border border-gray-600"
          />

          {/* ROW */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              placeholder="MM/YY"
              className="p-3 bg-[#0f172a] rounded-lg border border-gray-600"
            />
            <input
              placeholder="CVV"
              className="p-3 bg-[#0f172a] rounded-lg border border-gray-600"
            />
          </div>

          {/* CHECKBOX */}
          <label className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <input type="checkbox" />
            Save card for future payments
          </label>

          {/* PAY BUTTON */}
          <button className="w-full bg-orange-500 py-3 rounded-lg font-semibold hover:bg-orange-600">
            Pay $358.90
          </button>
        </div>

      </div>
    </Layout>
  );
}

/* METHOD COMPONENT */

function Method({ title, active }) {
  return (
    <div
      className={`p-4 rounded-xl border cursor-pointer transition ${
        active
          ? "border-orange-500 bg-[#1e293b]"
          : "border-gray-700 bg-[#0f172a] hover:bg-[#1e293b]"
      }`}
    >
      {title}
    </div>
  );
}