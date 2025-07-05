import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";
  
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA00FF"];
  
  const Piechart = ({ data }) => {
    if (!data || data.length === 0) {
      return <p style={{ color: "#fff" }}>No product sales data available this year.</p>;
    }
  
    return (
      <>
        <h3 style={{ marginBottom: "10px" }}>Top Products This Year</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </>
    );
  };
  
  export default Piechart;
  