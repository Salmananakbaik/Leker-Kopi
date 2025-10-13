import React, { useEffect, useState } from "react";
import { ref, onValue, update } from "firebase/database";
import { db } from "../firebase";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);

  const [selectedOrder, setSelectedOrder] = useState(null);

const handleSelesai = (order) => {
  setSelectedOrder(order);
};

const handleCloseModal = () => {
  setSelectedOrder(null);
};

const handlePrint = () => {
  window.print();
};


  useEffect(() => {
    const ordersRef = ref(db, "orders");
    const totalRef = ref(db, "summary/totalPendapatan");

    onValue(ordersRef, (snap) => {
      const data = snap.val();
      if (!data) return setOrders([]);
      const arr = Object.entries(data).map(([id, v]) => ({ id, ...v }));
      arr.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));
      setOrders(arr);
    });

    onValue(totalRef, (snap) => {
      setTotal(Number(snap.val() || 0));
    });
  }, []);

  const markDone = async (orderId) => {
    try {
      await update(ref(db, `orders/${orderId}`), { status: "Selesai" });
    } catch (err) {
      console.error("Gagal update status:", err);
      alert("Gagal update status: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f7f3] py-12 px-6 md:px-16 font-poppins text-[#3a2e2e]">
      <div className="max-w-6xl mx-auto bg-[#fff8f0] rounded-2xl p-8 shadow-md">
        {/* Header */}
        <h1 className="text-2xl font-bold text-[#5c4033] mb-3">
          📊 Dashboard Kasir
        </h1>
        <h2 className="inline-block bg-white text-[#8b5e3b] px-6 py-3 rounded-xl shadow-sm font-semibold">
          Total Pendapatan: Rp{total.toLocaleString()}
        </h2>

        {/* Tabel Pesanan */}
        <div className="mt-8 overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden bg-white">
            <thead>
              <tr className="bg-[#e6d7c3] text-[#3a2e2e]">
                <th className="px-4 py-3 text-left font-semibold">Meja</th>
                <th className="px-4 py-3 text-left font-semibold">Pelanggan</th>
                <th className="px-4 py-3 text-left font-semibold">Pesanan</th>
                <th className="px-4 py-3 text-left font-semibold">Pembayaran</th>
                <th className="px-4 py-3 text-left font-semibold">Total</th>
                <th className="px-4 py-3 text-left font-semibold">Waktu</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-left font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((o) => (
                  <tr
                    key={o.id}
                    className={`border-b last:border-none transition-colors ${
                      o.status === "Selesai"
                        ? "bg-[#f0ede8]/70"
                        : "bg-white hover:bg-[#fdf7f2]"
                    }`}
                  >
                    <td className="px-4 py-3 text-center">
  <span
    className="inline-block bg-amber-700 text-white font-semibold rounded-full w-10 h-10 flex items-center justify-center shadow-md"
  >
    {o.table.replace(/meja\s*/i, "")}
  </span>
</td>

                    <td className="px-4 py-3">{o.customer}</td>
                    <td className="px-4 py-3">{(o.items || []).join(", ")}</td>
                    <td className="px-4 py-3">{o.payment}</td>
                    <td className="px-4 py-3 font-medium">
                      Rp{(o.total || 0).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm">{o.timestamp}</td>
                    <td
                      className={`px-4 py-3 font-semibold ${
                        o.status === "Selesai"
                          ? "text-green-600"
                          : "text-[#d17b0f]"
                      }`}
                    >
                      {o.status}
                    </td>
                    <td className="px-4 py-3">
                      {o.status !== "Selesai" && (
                        <button
  onClick={() => {
    markDone(o.id);
    handleSelesai(o);
  }}
  style={{
    padding: "6px 12px",
    borderRadius: 8,
    background: "#5c4033",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    transition: "0.3s",
  }}
>
  Tandai Selesai
</button>

                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-6 text-[#6b5241] italic"
                  >
                    Belum ada pesanan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {selectedOrder && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    }}
  >
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        padding: "24px",
        width: "350px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      }}
    >
      <h3 style={{ textAlign: "center", color: "#5c4033", marginBottom: "12px" }}>
        ☕ Struk Pesanan
      </h3>
      <p><strong>Atas Nama:</strong> {selectedOrder.customer}</p>
      <p><strong>Meja:</strong> {selectedOrder.table.replace(/meja\s*/i, "")}</p>
      <p><strong>Pesanan:</strong></p>
      <ul style={{ marginLeft: "20px" }}>
        {(selectedOrder.items || []).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <p style={{ marginTop: "8px", fontWeight: "600" }}>
        Total: Rp{selectedOrder.total.toLocaleString("id-ID")}
      </p>

      <div style={{ marginTop: "16px", display: "flex", justifyContent: "space-between" }}>
        <button
          onClick={handlePrint}
          style={{
            background: "#5c4033",
            color: "#fff",
            padding: "8px 16px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Cetak
        </button>
        <button
          onClick={handleCloseModal}
          style={{
            background: "#ccc",
            color: "#333",
            padding: "8px 16px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Tutup
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
