import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ClientNavbar from "../components/ClientNavbar";
import { motion, AnimatePresence } from "framer-motion";
import { Visibility, Edit, Delete } from "@mui/icons-material"; // ✅ Proper icons from MUI

const theme = {
  light: "#FFCDB2",
  coral: "#FFB4A2",
  pink: "#E5989B",
  mauve: "#B5828C",
};

const Clients = () => {
  const [clients, setClients] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarahj@techcorp.com",
      phone: "+1 (555) 123-4567",
      company: "TechCorp Solutions",
      tags: ["Enterprise", "High Priority"],
      assignedTo: "John Doe",
      createdAt: "9/15/2025, 3:30:00 PM",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "mchen@innovate.io",
      phone: "+1 (555) 234-5678",
      company: "Innovate Labs",
      tags: ["Startup", "Tech"],
      assignedTo: "Jane Smith",
      createdAt: "9/15/2025, 3:31:00 PM",
    },
  ]);

  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!selectedClient.name.trim()) return "Name is required";
    if (!selectedClient.email.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(selectedClient.email))
      return "Enter a valid email";
    if (!selectedClient.phone.trim()) return "Phone number is required";
    if (!/^[0-9+\-()\s]+$/.test(selectedClient.phone))
      return "Enter a valid phone number";
    if (!selectedClient.company.trim()) return "Company is required";
    return "";
  };

  const handleAddClient = () => {
    setIsAddFormOpen(true);
    setSelectedClient({
      name: "",
      email: "",
      phone: "",
      company: "",
      assignedTo: "John Doe",
      tags: [],
    });
  };

  const handleSaveClient = (e) => {
    e.preventDefault();
    const validation = validateForm();
    if (validation) {
      setError(validation);
      return;
    }

    if (selectedClient.id) {
      setClients(
        clients.map((c) => (c.id === selectedClient.id ? selectedClient : c))
      );
      setIsEditFormOpen(false);
    } else {
      setClients([
        ...clients,
        {
          ...selectedClient,
          id: Date.now(),
          createdAt: new Date().toLocaleString("en-US", {
            dateStyle: "short",
            timeStyle: "short",
          }),
        },
      ]);
      setIsAddFormOpen(false);
    }
    setError("");
    setSelectedClient(null);
  };

  const handleEditClient = (client) => {
    setSelectedClient(client);
    setIsEditFormOpen(true);
  };

  const handleViewDetails = (client) => {
    setSelectedClient(client);
    setIsDetailsOpen(true);
  };

  const handleDeleteConfirm = (client) => {
    setDeleteConfirm(client);
  };

  const handleDelete = () => {
    setClients(clients.filter((c) => c.id !== deleteConfirm.id));
    setDeleteConfirm(null);
    alert(`${deleteConfirm.name} was successfully deleted`);
  };

  const closeModal = () => {
    setIsAddFormOpen(false);
    setIsEditFormOpen(false);
    setIsDetailsOpen(false);
    setSelectedClient(null);
    setError("");
  };

  return (
    <div className="flex h-screen bg-[#FFF8F6] overflow-hidden">
      <Sidebar />
      {/* ✅ Adjusted layout for full width beside sidebar */}
      <div className="flex-1 p-6 overflow-auto" style={{ marginLeft: "250px" }}>
        <ClientNavbar />

        {/* MAIN CARD */}
        <div
          className="bg-white rounded-xl shadow-lg p-6 mt-6"
          style={{ borderTop: `6px solid ${theme.pink}` }}
        >
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold" style={{ color: theme.mauve }}>
              Clients
            </h2>
            <button
              onClick={handleAddClient}
              className="px-4 py-2 rounded-lg font-semibold shadow transition hover:opacity-90"
              style={{
                backgroundColor: theme.coral,
                color: "#fff",
              }}
            >
              + Add Client
            </button>
          </div>

          {/* SEARCH + FILTER */}
          <div className="flex flex-col sm:flex-row gap-2 mb-6">
            <input
              type="text"
              placeholder="Search by name, email, or company..."
              className="flex-1 p-2 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E5989B]"
            />
            <select className="p-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#E5989B]">
              <option>All Tags</option>
              <option>Enterprise</option>
              <option>High Priority</option>
              <option>Startup</option>
              <option>Tech</option>
            </select>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead style={{ backgroundColor: theme.light }}>
                <tr>
                  <th className="p-3 text-gray-700 font-semibold">CLIENT</th>
                  <th className="p-3 text-gray-700 font-semibold">CONTACT</th>
                  <th className="p-3 text-gray-700 font-semibold">COMPANY</th>
                  <th className="p-3 text-gray-700 font-semibold">TAGS</th>
                  <th className="p-3 text-gray-700 font-semibold">ASSIGNED TO</th>
                  <th className="p-3 text-gray-700 font-semibold">CREATED AT</th>
                  <th className="p-3 text-gray-700 font-semibold">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b hover:bg-[#FFF1EE] transition"
                  >
                    <td className="p-3 flex items-center">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: theme.mauve }}
                      >
                        {c.name.charAt(0)}
                      </div>
                      <span className="ml-3 text-gray-800">{c.name}</span>
                    </td>
                    <td className="p-3 text-gray-700">
                      <a
                        href={`mailto:${c.email}`}
                        className="hover:text-[#E5989B]"
                      >
                        {c.email}
                      </a>
                      <div>{c.phone}</div>
                    </td>
                    <td className="p-3 text-gray-800">{c.company}</td>
                    <td className="p-3">
                      {c.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-block px-2 py-1 rounded-full text-sm mr-2"
                          style={{
                            backgroundColor: theme.light,
                            color: theme.mauve,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </td>
                    <td className="p-3 text-gray-800">{c.assignedTo}</td>
                    <td className="p-3 text-gray-600">{c.createdAt}</td>
                    <td className="p-3 flex items-center gap-2">
                      <Visibility
                        onClick={() => handleViewDetails(c)}
                        className="cursor-pointer text-gray-600 hover:text-[#E5989B]"
                      />
                      <Edit
                        onClick={() => handleEditClient(c)}
                        className="cursor-pointer text-gray-600 hover:text-[#E5989B]"
                      />
                      <Delete
                        onClick={() => handleDeleteConfirm(c)}
                        className="cursor-pointer text-red-500 hover:text-red-600"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODALS */}
        <AnimatePresence>
          {(isAddFormOpen || isEditFormOpen || isDetailsOpen) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                className="bg-white p-6 rounded-xl shadow-lg w-96"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2
                    className="text-lg font-semibold"
                    style={{ color: theme.mauve }}
                  >
                    {isAddFormOpen
                      ? "Add Client"
                      : isEditFormOpen
                      ? "Edit Client"
                      : "Client Details"}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✖
                  </button>
                </div>
                <form onSubmit={handleSaveClient}>
                  {["name", "email", "phone", "company"].map((field) => (
                    <div className="mb-4" key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                        {field}
                      </label>
                      <input
                        type={field === "email" ? "email" : "text"}
                        value={selectedClient?.[field] || ""}
                        onChange={(e) =>
                          setSelectedClient({
                            ...selectedClient,
                            [field]: e.target.value,
                          })
                        }
                        disabled={isDetailsOpen}
                        className={`w-full p-2 border rounded-lg text-gray-800 ${
                          isDetailsOpen
                            ? "bg-gray-100 cursor-not-allowed"
                            : "bg-white focus:outline-none focus:ring-2 focus:ring-[#E5989B]"
                        }`}
                      />
                    </div>
                  ))}
                  {error && (
                    <p className="text-red-500 text-sm mb-3">{error}</p>
                  )}

                  {!isDetailsOpen && (
                    <div className="flex justify-end gap-3">
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-lg text-white"
                        style={{ backgroundColor: theme.pink }}
                      >
                        {isAddFormOpen ? "Add Client" : "Save Changes"}
                      </button>
                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                  {isDetailsOpen && (
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                      >
                        Close
                      </button>
                    </div>
                  )}
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* DELETE CONFIRM */}
        <AnimatePresence>
          {deleteConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-white p-6 rounded-xl shadow-lg w-96"
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Confirm Delete
                </h2>
                <p className="text-gray-600">
                  Are you sure you want to delete{" "}
                  <strong>{deleteConfirm.name}</strong>?
                </p>
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 rounded-lg text-white"
                    style={{ backgroundColor: "#E74C3C" }}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                  >
                    No
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Clients;
