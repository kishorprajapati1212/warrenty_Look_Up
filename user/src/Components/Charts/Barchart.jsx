import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const Barchart = ({ data }) => {
    if (!data || data.length === 0) {
        return <p style={{ color: "#fff" }}>No product sales data available.</p>;
    }

    // Step 1: Build unified keys for all product names (top 3 per month)
    const allProductNames = Array.from(
        new Set(data.flatMap((month) => month.topProducts.map((p) => p.name)))
    );

    // Step 2: Transform into recharts format: { month: "YYYY-M", Product1: qty, ... }
    const formattedData = data.map((entry) => {
        const row = { month: entry.month };
        entry.topProducts.forEach((product) => {
            row[product.name] = product.quantity;
        });
        return row;
    });

    return (
        <>
            <h3 style={{ marginBottom: "10px" }}>Top 3 Products by Month</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={formattedData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "rgba(0, 0, 0, 0.8)",
                            border: "1px solid #444",
                            borderRadius: "8px",
                            color: "#fff",
                        }}
                        itemStyle={{ color: "#fff" }}
                        labelStyle={{ color: "#fff" }}
                    />

                    {/* <Legend /> */}
                    {allProductNames.map((name, index) => (
                        <Bar
                            key={name}
                            dataKey={name}
                            stackId="a"
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </>
    );
};

export default Barchart;
