import React from "react";

function Cart({ cart, total, sendOrder }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Keranjang:</h3>
      {cart.length === 0 ? (
        <p>Belum ada item di keranjang</p>
      ) : (
        <>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - Rp{item.price.toLocaleString()}
              </li>
            ))}
          </ul>
          <p>
            <strong>Total: Rp{total.toLocaleString()}</strong>
          </p>
          <button
            onClick={sendOrder}
            style={{
              background: "orange",
              color: "black",
              padding: "8px 12px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Kirim Pesanan
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
