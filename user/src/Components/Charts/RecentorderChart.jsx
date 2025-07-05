const RecentorderChart = ({ data }) => {
    if (!data || data.length === 0) {
      return <p style={{ color: "#fff" }}>No recent orders found.</p>;
    }
  
    return (
      <>
        <h3 style={{ marginBottom: "10px" }}>Recent Orders</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {data.map((order, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                flexDirection: "column",
                color: "#fff",
              }}
            >
              <div style={{ fontWeight: "bold", fontSize: "16px" }}>
                {order.products[0]?.product_name || "Unnamed Product"}
              </div>
              <div style={{ fontSize: "14px", marginTop: "4px" }}>
                Order Date: <em>{new Date(order.order_date).toLocaleDateString()}</em>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };
  
  export default RecentorderChart;
  