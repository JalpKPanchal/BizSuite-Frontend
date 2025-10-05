import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Sector,
  Cell,
  Tooltip as ReTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import { FaUsers, FaTasks, FaChartLine } from "react-icons/fa";

const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;

  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 12) * cos;
  const sy = cy + (outerRadius + 12) * sin;
  const mx = cx + (outerRadius + 28) * cos;
  const my = cy + (outerRadius + 28) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 20;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={3} fill={fill} />
      <text
        x={ex + (cos >= 0 ? 8 : -8)}
        y={ey - 4}
        textAnchor={textAnchor}
        fill="#2b1b1a"
        fontWeight={700}
      >
        {payload.name}
      </text>
      <text
        x={ex + (cos >= 0 ? 8 : -8)}
        y={ey + 14}
        textAnchor={textAnchor}
        fill="#7a5653"
        fontSize={13}
      >
        {value} ({Math.round(percent * 100)}%)
      </text>
    </g>
  );
};

const Dashboard = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const cards = [
    {
      title: "Total Leads",
      value: 234,
      icon: <FaUsers />,
      change: "+12.5%",
      changeColor: "text-green-600",
      sub: "from last month",
    },
    {
      title: "Active Clients",
      value: 89,
      icon: <FaUsers />,
      change: "+8.2%",
      changeColor: "text-green-600",
      sub: "from last month",
    },
    {
      title: "Pending Tasks",
      value: 42,
      icon: <FaTasks />,
      change: "-5.4%",
      changeColor: "text-red-600",
      sub: "from last month",
    },
    {
      title: "Conversion Rate",
      value: "24.8%",
      icon: <FaChartLine />,
      change: "+3.1%",
      changeColor: "text-green-600",
      sub: "from last month",
    },
  ];

  const pieData = [
    { name: "Contacted", value: 33 },
    { name: "Negotiation", value: 24 },
    { name: "Won", value: 15 },
    { name: "New", value: 19 },
    { name: "Lost", value: 9 },
  ];
  const pieColors = ["#fcb6a0", "#e99685", "#b27874", "#f3b3a1", "#d8b9b4"];

  const barData = [
    { name: "Website", value: 65 },
    { name: "Social Media", value: 45 },
    { name: "Email", value: 55 },
    { name: "Direct", value: 35 },
  ];

  const lineData = [
    { name: "Jan", value: 45 },
    { name: "Feb", value: 52 },
    { name: "Mar", value: 48 },
    { name: "Apr", value: 62 },
    { name: "May", value: 55 },
    { name: "Jun", value: 68 },
  ];

  const recentActivity = [
    {
      name: "John Smith",
      action: "contacted lead",
      target: "ABC Corp",
      time: "5 minutes ago",
    },
    {
      name: "Sarah Johnson",
      action: "completed task",
      target: "Client Onboarding",
      time: "15 minutes ago",
    },
    {
      name: "Mike Davis",
      action: "added note to",
      target: "XYZ Industries",
      time: "1 hour ago",
    },
    {
      name: "Emily Brown",
      action: "moved lead to Won",
      target: "Tech Solutions Ltd",
      time: "2 hours ago",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#fffaf7] text-[#4a2d2a]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <DashboardNavbar />

        <div className="p-6 space-y-8">
          <h2 className="text-lg font-medium">
            Welcome back! Here's your business overview.
          </h2>

          {/* Top Stat Cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {cards.map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 280 }}
                className="bg-white p-5 rounded-2xl shadow-sm border border-[#f1e4e1]"
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className="bg-[#f8dcd3] text-[#b44d3b] text-3xl p-3 rounded-xl">
                    {card.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{card.title}</p>
                    <h2 className="text-2xl font-bold">{card.value}</h2>
                  </div>
                </div>
                <p className={`text-sm ${card.changeColor}`}>
                  {card.change}{" "}
                  <span className="text-gray-500">{card.sub}</span>
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* PIE CHART */}
            <motion.div
              className="bg-white rounded-2xl shadow-sm border border-[#f1e4e1] p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
            >
              <h3 className="font-semibold text-lg">Leads by Stage</h3>
              <p className="text-gray-500 text-sm mb-3">
                Distribution across pipeline stages
              </p>

              <div className="flex justify-center">
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100} // slightly larger for better cookie look
                      paddingAngle={4}
                      activeIndex={activeIndex}
                      activeShape={renderActiveShape}
                      onMouseEnter={(_, index) => setActiveIndex(index)}
                      onMouseLeave={() => setActiveIndex(null)}
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={pieColors[index % pieColors.length]}
                        />
                      ))}
                    </Pie>

                    <ReTooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        borderRadius: 10,
                        border: "none",
                        boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                      }}
                      formatter={(value, name) => [`${value}`, name]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* BAR CHART */}
            <motion.div
              className="bg-white rounded-2xl shadow-sm border border-[#f1e4e1] p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
            >
              <h3 className="font-semibold text-lg">Leads by Source</h3>
              <p className="text-gray-500 text-sm mb-3">
                Where your leads are coming from
              </p>

              <div style={{ width: "100%", height: 220 }}>
                <ResponsiveContainer>
                  <BarChart data={barData}>
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#f3e9e7"
                    />
                    <ReTooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        borderRadius: 8,
                        border: "none",
                      }}
                    />
                    <Bar dataKey="value" fill="#e5907f" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* LINE CHART */}
            <motion.div
              className="bg-white rounded-2xl shadow-sm border border-[#f1e4e1] p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24 }}
            >
              <h3 className="font-semibold text-lg">Sales Trends</h3>
              <p className="text-gray-500 text-sm mb-3">
                Monthly sales performance
              </p>

              <div style={{ width: "100%", height: 220 }}>
                <ResponsiveContainer>
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3e9e7" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <ReTooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        borderRadius: 8,
                        border: "none",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#d36f5e"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* RECENT ACTIVITY */}
          <motion.div
            className="bg-white rounded-2xl shadow-sm border border-[#f1e4e1] p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32 }}
          >
            <h3 className="font-semibold text-lg mb-3">Recent Activity</h3>
            <p className="text-gray-500 text-sm mb-4">
              Latest updates from your team
            </p>

            <div className="space-y-3">
              {recentActivity.map((item, i) => {
                const initials = item.name
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase();

                return (
                  <div
                    key={i}
                    className="flex items-center gap-4 bg-[#fef8f7] hover:bg-[#fceeea] transition rounded-xl p-3"
                  >
                    <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold bg-gradient-to-tr from-[#ffd8cf] to-[#f6b8ac] text-[#7a3a33]">
                      {initials}
                    </div>

                    <div className="flex-1">
                      <p className="font-semibold text-sm">
                        {item.name}{" "}
                        <span className="font-normal text-gray-700">
                          {item.action}
                        </span>{" "}
                        <span className="font-semibold">{item.target}</span>
                      </p>
                      <p className="text-xs text-gray-500">{item.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
