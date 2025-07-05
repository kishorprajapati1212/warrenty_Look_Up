import { useEffect, useState } from "react";
import Barchart from "../Components/Charts/Barchart";
import Piechart from "../Components/Charts/Piechart";
import RecentorderChart from "../Components/Charts/RecentorderChart";
import axios from "axios";
import d from "./d"

const DashboardHome = () => {
  const Backend_url = import.meta.env.VITE_BACKEND_URL;

  const [monthlyTopProducts, setMonthlyTopProducts] = useState([]);
  const [yearlyTopProducts, setYearlyTopProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const email = localStorage.getItem("email");
      const res = await axios.get(`${Backend_url}/alldata?email=${email}`);
      const raw = res.data;
      // const raw = d;

      const productSalesByMonth = {};
      const productSalesThisYear = {};
      const orders = [];

      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth(); // January = 0

      raw.forEach(entry => {
        const order = entry.arrayofwarranty;

        if (!order || !order.order_date || !Array.isArray(order.products)) return;

        const orderDate = new Date(order.order_date);
        if (isNaN(orderDate)) return;

        const orderYear = orderDate.getFullYear();
        const orderMonth = orderDate.getMonth(); // 0-based (Jan = 0)

        // ✅ Skip orders not from this year or from a future month
        if (orderYear !== currentYear || orderMonth > currentMonth) return;

        const monthKey = `${orderYear}-${String(orderMonth + 1).padStart(2, "0")}`;

        orders.push({
          order_date: order.order_date,
          products: order.products
        });

        order.products.forEach(product => {
          const name = product.product_name;
          const qty = product.quantity;

          // Monthly aggregation for bar chart
          if (!productSalesByMonth[monthKey]) productSalesByMonth[monthKey] = {};
          productSalesByMonth[monthKey][name] = (productSalesByMonth[monthKey][name] || 0) + qty;

          // This year aggregation for pie chart
          if (orderDate.getFullYear() === currentYear) {
            productSalesThisYear[name] = (productSalesThisYear[name] || 0) + qty;
          }
        });
      });

      // Process Monthly Top 3 Products (Bar Chart)
      const monthlyTop = Object.entries(productSalesByMonth).map(([month, products]) => {
        const sorted = Object.entries(products)
          .sort((a, b) => b[1] - a[1]) // sort by quantity
          .slice(0, 3) // top 3
          .map(([name, quantity]) => ({ name, quantity }));
        return { month, topProducts: sorted };
      });

      console.log(productSalesThisYear)
      // Process Yearly Top 5 Products (Pie Chart)
      const yearlyTop = Object.entries(productSalesThisYear)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, value]) => ({ name, value }));

      // Process Recent 5 Orders
      const sortedOrders = orders
        .sort((a, b) => new Date(b.order_date) - new Date(a.order_date))
        .slice(0, 5);

      setMonthlyTopProducts(monthlyTop);
      setYearlyTopProducts(yearlyTop);
      setRecentOrders(sortedOrders);
    };

    fetchData();
  }, []);
  //   console.log("1")
  //   console.log(monthlyTopProducts)
  //   console.log("2")

  //   console.log( yearlyTopProducts)
  //   console.log("3")
  //   console.log( recentOrders)
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "auto 1fr",
        gap: "20px",
        padding: "20px",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      {/* Full-width Bar Chart */}
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: "12px",
          padding: "20px",
          color: "#fff",
        }}
      >
        <Barchart data={monthlyTopProducts} />
      </div>

      {/* Two-column section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
      >
        {/* Pie Chart */}
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            borderRadius: "12px",
            padding: "20px",
            color: "#fff",
            minHeight: "300px",
          }}
        >
          <Piechart data={yearlyTopProducts} />
        </div>

        {/* Recent Orders */}
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            borderRadius: "12px",
            padding: "20px",
            color: "#fff",
            minHeight: "300px",
          }}
        >
          <RecentorderChart data={recentOrders} />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
