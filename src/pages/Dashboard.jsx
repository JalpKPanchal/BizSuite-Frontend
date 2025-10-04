import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  Users,
  ListTodo,
  FileText,
  Settings,
  LayoutDashboard,
} from "lucide-react";

const stats = [
  {
    title: "Total Leads",
    value: 328,
    change: "+12% from last month",
    positive: true,
  },
  {
    title: "Active Clients",
    value: 142,
    change: "+8% from last month",
    positive: true,
  },
  {
    title: "Open Tasks",
    value: 47,
    change: "-3% from last week",
    positive: false,
  },
  {
    title: "Conversion Rate",
    value: "24.5%",
    change: "+2.1% from last month",
    positive: true,
  },
];

const pieData = [
  { name: "New", value: 35, color: "#2563eb" },
  { name: "Contacted", value: 28, color: "#8b5cf6" },
  { name: "Negotiation", value: 22, color: "#22c55e" },
  { name: "Won", value: 10, color: "#facc15" },
  { name: "Lost", value: 5, color: "#ef4444" },
];

const barData = [
  { month: "Jan", leads: 45, clients: 10 },
  { month: "Feb", leads: 55, clients: 15 },
  { month: "Mar", leads: 50, clients: 18 },
  { month: "Apr", leads: 60, clients: 20 },
  { month: "May", leads: 52, clients: 19 },
  { month: "Jun", leads: 70, clients: 22 },
];

const lineData = [
  { month: "Jan", revenue: 14500 },
  { month: "Feb", revenue: 18000 },
  { month: "Mar", revenue: 17000 },
  { month: "Apr", revenue: 21000 },
  { month: "May", revenue: 20500 },
  { month: "Jun", revenue: 25000 },
];

const activities = [
  {
    user: "John Doe",
    action: "created a new lead",
    target: "Acme Corp",
    time: "2 hours ago",
    color: "bg-blue-500",
  },
  {
    user: "Jane Smith",
    action: "completed task",
    target: "Follow up with Tech Solutions",
    time: "3 hours ago",
    color: "bg-green-500",
  },
  {
    user: "Mike Johnson",
    action: "converted lead to client",
    target: "StartupXYZ",
    time: "5 hours ago",
    color: "bg-purple-500",
  },
  {
    user: "Sarah Williams",
    action: "added a note to",
    target: "Global Industries",
    time: "1 day ago",
    color: "bg-gray-500",
  },
  {
    user: "Tom Brown",
    action: "updated lead status",
    target: "Enterprise Co",
    time: "1 day ago",
    color: "bg-indigo-500",
  },
];

const Sidebar = ({ isOpen, toggleSidebar }) => (
  <motion.aside
    initial={{ x: -260 }}
    animate={{ x: isOpen || window.innerWidth >= 1024 ? 0 : -260 }}
    transition={{ type: "spring", stiffness: 120 }}
    className={`fixed lg:static top-0 left-0 h-full lg:h-auto w-64 bg-white border-r shadow-md z-50 p-6 flex flex-col justify-between`}
  >
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-purple-600">BizSuite</h2>
        <button
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          onClick={toggleSidebar}
        >
          <X size={22} />
        </button>
      </div>

      <nav className="space-y-3">
        {[
          { name: "Dashboard", icon: <LayoutDashboard size={18} /> },
          { name: "Clients", icon: <Users size={18} /> },
          { name: "Tasks", icon: <ListTodo size={18} /> },
          { name: "Notes", icon: <FileText size={18} /> },
          { name: "Settings", icon: <Settings size={18} /> },
        ].map((item, idx) => (
          <motion.button
            whileHover={{ scale: 1.05 }}
            key={idx}
            className="flex items-center gap-3 w-full px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium hover:bg-blue-100 transition-all"
          >
            {item.icon} {item.name}
          </motion.button>
        ))}
      </nav>
    </div>

    <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-100 transition">
      <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
        A
      </div>
      <div>
        <p className="font-medium text-gray-800">Admin User</p>
        <p className="text-xs text-gray-500">admin@bizsuite.com</p>
      </div>
    </div>
  </motion.aside>
);

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex min-h-screen w-full bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <div className="lg:block hidden">
        <Sidebar isOpen={true} toggleSidebar={toggleSidebar} />
      </div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={toggleSidebar}
          ></div>
        )}
      </div>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex flex-col overflow-y-auto lg:ml-64"
      >
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              onClick={toggleSidebar}
            >
              <Menu size={22} />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          </div>
          <p className="text-sm text-gray-500">
            Welcome back! Here's your business summary.
          </p>
        </header>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-xl shadow-md bg-white border border-gray-100 hover:shadow-lg transition"
              >
                <h3 className="text-gray-500 text-sm font-medium">
                  {stat.title}
                </h3>
                <p className="text-4xl font-bold mt-3 text-gray-900">
                  {stat.value}
                </p>
                <p
                  className={`text-sm ${
                    stat.positive ? "text-green-600" : "text-red-600"
                  } font-semibold`}
                >
                  {stat.change}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pie Chart */}
            <motion.div className="p-6 rounded-xl shadow-md bg-white border border-gray-100">
              <h3 className="font-semibold text-xl text-gray-800 mb-5">
                Lead Status Distribution
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Bar Chart */}
            <motion.div className="p-6 rounded-xl shadow-md bg-white border border-gray-100">
              <h3 className="font-semibold text-xl text-gray-800 mb-5">
                Monthly Leads vs Clients
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="leads" fill="#2563eb" />
                  <Bar dataKey="clients" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Line Chart */}
          <motion.div className="p-6 rounded-xl shadow-md bg-white border border-gray-100">
            <h3 className="font-semibold text-xl text-gray-800 mb-5">
              Revenue Growth Trend
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Activity Feed */}
          <motion.div className="p-6 rounded-xl shadow-md bg-white border border-gray-100">
            <h3 className="font-semibold text-xl text-gray-800 mb-5">
              Recent Activity
            </h3>
            <div className="space-y-5">
              {activities.map((activity, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${activity.color}`}
                  >
                    {activity.user
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-base text-gray-800">
                      <span className="font-semibold">{activity.user}</span>{" "}
                      {activity.action}{" "}
                      <span className="font-medium text-gray-600">
                        {activity.target}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
};

export default Dashboard;
