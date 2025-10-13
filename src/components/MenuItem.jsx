import React from "react";

const MenuItem = ({ item, addToCart }) => {
  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "10px",
      marginBottom: "10px",
      borderRadius: "10px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <span>{item.name} - Rp{item.price.toLocaleString()}</span>
      <button
        onClick={() => addToCart(item)}
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          padding: "5px 10px",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Tambah
      </button>
    </div>
  );
};

export default MenuItem;
