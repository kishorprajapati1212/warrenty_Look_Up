import React, { useEffect, useState } from "react";

const warrantyTypes = [
  "manufacturer",
  "repairing",
  "extended",
  "on-site",
  "none"
];

const durationUnits = ["months", "years"];

const WarrantyForm = ({ data, onDataChange }) => {

  const [products, setProducts] = useState(
    data.products.map((product) => ({
      ...product,
      warranties: [
        {
          type: product.warranty_type || "manufacturer",
          duration: {
            value: product.warranty_duration?.value || 12,
            unit: product.warranty_duration?.unit || "months"
          }
        }
      ]
    }))
  );

  useEffect(() => {
    onDataChange({
      ...data,
      products
    });
  }, []); // empty dependency = runs once on mount

  const handleWarrantyChange = (pIndex, wIndex, field, value) => {
    const updated = [...products];
    if (field === "type") {
      updated[pIndex].warranties[wIndex].type = value;
    } else if (field === "duration_value") {
      updated[pIndex].warranties[wIndex].duration.value = Number(value);
    } else if (field === "duration_unit") {
      updated[pIndex].warranties[wIndex].duration.unit = value;
    }
    
    setProducts(updated);
    onDataChange({
      ...data,  // or localData
      products: updated
    });
  };

  const handleAddWarranty = (index) => {
    const updated = [...products];
    updated[index].warranties.push({
      type: "manufacturer",
      duration: { value: 12, unit: "months" }
    });
    setProducts(updated);
  };

  const handleRemoveWarranty = (pIndex, wIndex) => {
    const updated = [...products];
    updated[pIndex].warranties.splice(wIndex, 1);
    setProducts(updated);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Warranty Editor</h2>
      {products.map((product, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            padding: "16px",
            borderRadius: "8px",
            marginBottom: "20px"
          }}
        >
          <h3>{product.product_name}</h3>
          <p>Quantity: {product.quantity}</p>

          {product.warranties.map((warranty, wIndex) => (
            <div
              key={wIndex}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "10px"
              }}
            >
              <select
                value={warranty.type}
                onChange={(e) =>
                  handleWarrantyChange(index, wIndex, "type", e.target.value)
                }
                style={{ padding: "8px", flex: "1" }}
              >
                {warrantyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>

              <input
                type="number"
                min="1"
                value={warranty.duration.value}
                onChange={(e) =>
                  handleWarrantyChange(index, wIndex, "duration_value", e.target.value)
                }
                style={{ padding: "8px", width: "80px" }}
              />

              <select
                value={warranty.duration.unit}
                onChange={(e) =>
                  handleWarrantyChange(index, wIndex, "duration_unit", e.target.value)
                }
                style={{ padding: "8px", flex: "1" }}
              >
                {durationUnits.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit.charAt(0).toUpperCase() + unit.slice(1)}
                  </option>
                ))}
              </select>

              <button
                onClick={() => handleRemoveWarranty(index, wIndex)}
                disabled={product.warranties.length === 1}
                style={{
                  padding: "8px 12px",
                  backgroundColor: "#e74c3c",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: product.warranties.length === 1 ? "not-allowed" : "pointer"
                }}
              >
                Delete
              </button>
            </div>
          ))}

          <button
            onClick={() => handleAddWarranty(index)}
            style={{
              padding: "8px 12px",
              backgroundColor: "#3498db",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Add Warranty
          </button>
        </div>
      ))}
    </div>
  );
};

export default WarrantyForm;
