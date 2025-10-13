import React, { useState } from "react";
import { ref, push, runTransaction } from "firebase/database";
import { db } from "../firebase";

const Menu = () => {
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState("");
  const [table, setTable] = useState("");
  const [payment, setPayment] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [loading, setLoading] = useState(false);

  const menuItems = [
    { name: "Leker Coklat", price: 8000, img: "/src/assets/lekercoklat.jpeg" },
    { name: "Leker Keju", price: 9000, img: "/src/assets/lekerkeju.jpeg" },
    { name: "Kopi Susu", price: 10000, img: "/src/assets/kopisusu.jpeg" },
    { name: "Es Coklat", price: 12000, img: "/src/assets/escoklat.jpeg" },
  ];

  const mejaList = Array.from({ length: 20 }, (_, i) => `Meja ${i + 1}`);
  const addToCart = (item) => setCart((prev) => [...prev, item]);
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    if (!customer || !payment || cart.length === 0) {
      alert("Lengkapi: nama pelanggan, metode pembayaran, dan item di keranjang!");
      return;
    }
    if (payment !== "Cash") {
      setShowQR(true);
      return;
    }
    sendToFirebase();
  };

  const sendToFirebase = async () => {
    setLoading(true);
    const orderData = {
      table: table || "Tanpa Meja",
      customer: customer || "Anonim",
      payment,
      items: cart.map((i) => i.name),
      total,
      status: "Menunggu",
      timestamp: new Date().toLocaleString("id-ID"),
    };

    try {
      await push(ref(db, "orders"), orderData);
      const totalRef = ref(db, "summary/totalPendapatan");
      await runTransaction(totalRef, (current) => (current || 0) + total);
      alert("✅ Pesanan berhasil dikirim ke Dashboard!");
      setCart([]);
      setCustomer("");
      setTable("");
      setPayment("");
      setShowQR(false);
    } catch (err) {
      console.error("Gagal kirim pesanan:", err);
      alert("❌ Gagal mengirim pesanan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f2ec] to-[#ede5d7] text-[#3a2e2a] font-poppins px-6 py-10">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-[#5c4033] drop-shadow-sm">
          ☕ Leker Coffee
        </h1>
        <p className="text-[#6e5847] mt-2 text-sm sm:text-base">
          Nikmati rasa kopi & leker terbaik di kota
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Menu List */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-[#4b3832]">{item.name}</h3>
                <p className="text-sm text-[#7b6d61] mb-3">
                  Rp{item.price.toLocaleString()}
                </p>
                <button
                  onClick={() => addToCart(item)}
                  className="bg-[#5c4033] text-white px-4 py-2 rounded-lg hover:bg-[#4b332a] transition duration-300"
                >
                  Tambah
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Panel */}
        <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">🛒 Keranjang</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">Belum ada pesanan</p>
          ) : (
            <ul className="space-y-1 mb-3 text-sm">
              {cart.map((item, idx) => (
                <li key={idx}>
                  {item.name} - Rp{item.price.toLocaleString()}
                </li>
              ))}
            </ul>
          )}
          <h3 className="font-semibold text-lg border-t pt-3 mt-2">
            Total: Rp{total.toLocaleString()}
          </h3>

          {/* Input */}
          <div className="mt-4 space-y-3">
            <select
              value={table}
              onChange={(e) => setTable(e.target.value)}
              className="w-full border rounded-lg p-2 text-sm"
            >
              <option value="">Pilih Nomor Meja</option>
              {mejaList.map((m, idx) => (
                <option key={idx} value={m}>
                  {m}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Nama Pelanggan"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              className="w-full border rounded-lg p-2 text-sm"
            />

            <select
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              className="w-full border rounded-lg p-2 text-sm"
            >
              <option value="">Pilih Pembayaran</option>
              <option value="Cash">Cash</option>
              <option value="QRIS">QRIS</option>
              <option value="BCA">Transfer BCA</option>
              <option value="E-Wallet">E-Wallet</option>
            </select>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="mt-6 w-full bg-[#5c4033] text-white py-3 rounded-xl hover:bg-[#4b332a] transition-colors duration-300"
          >
            {loading ? "Processing..." : "Checkout"}
          </button>
        </div>
      </div>

      {/* QR Modal */}
      {showQR && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-96 text-center animate-fadeIn">
            <h2 className="text-xl font-bold mb-4 text-[#4b3832]">
              💳 Pembayaran {payment}
            </h2>

            {payment === "QRIS" ? (
              <img
                src="/src/assets/qris.png"
                alt="QR Pembayaran"
                className="mx-auto w-56 mb-4 rounded-lg"
              />
            ) : payment === "BCA" ? (
              <p className="mb-4">
                <b>Transfer ke BCA a/n Leker Coffee</b>
                <br />
                No. Rek: 1234567890
              </p>
            ) : payment === "E-Wallet" ? (
              <p className="mb-4">
                <b>Transfer ke DANA/OVO/Gopay a/n Leker Coffee</b>
                <br />
                No. 0812-3456-7890
              </p>
            ) : (
              <p className="mb-4">
                <b>Pembayaran dilakukan secara tunai (Cash).</b>
              </p>
            )}

            <p className="font-semibold mb-6">
              Total: Rp{total.toLocaleString()}
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={sendToFirebase}
                className="bg-[#5c4033] text-white px-4 py-2 rounded-lg hover:bg-[#4b332a] transition duration-300"
              >
                {loading ? "Mengirim..." : "Konfirmasi"}
              </button>
              <button
                onClick={() => setShowQR(false)}
                className="border border-[#5c4033] text-[#5c4033] px-4 py-2 rounded-lg hover:bg-[#f8f3ef] transition duration-300"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
