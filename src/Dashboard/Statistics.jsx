import { useQuery } from "@tanstack/react-query";
import PageTitle from "../Helmet/PageTitle";
import useAxiosSecure from "../hook/useAxiosSecure";
import { Cell, Legend, Pie, PieChart } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const Statistics = () => {
  const axiosSecure = useAxiosSecure();
  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  const data = [
    { name: "Users", value: stats.users },
    { name: "Products", value: stats.products },
    { name: "Reviews", value: stats.reviews },
  ];

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${value}`}
      </text>
    );
  };

  return (
    <div>
      <PageTitle title="Stats | IgnitionPulse" />
      <div className="stats stats-vertical lg:stats-horizontal shadow">
        <div className="stat">
          <div className="stat-title">Products</div>
          <div className="stat-value">{stats.products}</div>
        </div>

        <div className="stat">
          <div className="stat-title"> Users</div>
          <div className="stat-value">{stats.users}</div>
        </div>

        <div className="stat">
          <div className="stat-title">Reviews</div>
          <div className="stat-value">{stats.reviews}</div>
        </div>
      </div>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </div>
  );
};

export default Statistics;
