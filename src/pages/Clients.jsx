import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlus,
  FaTimes,
  FaEye,
  FaEdit,
  FaTrash,
  FaFilter,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaChevronDown,
} from "react-icons/fa";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTag, setFilterTag] = useState("All Tags");

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
    setError("");
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
    setError("");
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
  };

  const closeModal = () => {
    setIsAddFormOpen(false);
    setIsEditFormOpen(false);
    setIsDetailsOpen(false);
    setSelectedClient(null);
    setError("");
  };

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTag =
      filterTag === "All Tags" || client.tags.includes(filterTag);

    return matchesSearch && matchesTag;
  });

  const allTags = [
    "All Tags",
    "Enterprise",
    "High Priority",
    "Startup",
    "Tech",
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1">
        <DashboardNavbar />

        <div className="p-6">
          {/* Header Section */}
          <motion.div
            className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 bg-white rounded-2xl p-6 shadow-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-gray-800">Clients</h1>
              <p className="text-gray-500 text-sm mt-1">
                Manage and track your client relationships
              </p>
            </div>
            <button
              className="flex items-center gap-2 bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              onClick={handleAddClient}
            >
              <FaPlus className="w-4 h-4" />
              Add Client
            </button>
          </motion.div>

          {/* Filters Section */}
          <motion.div
            className="bg-white rounded-2xl p-6 shadow-sm mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <FaFilter className="text-rose-400" />
              <span className="font-semibold text-gray-700">
                Search & Filters
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Search by name, email, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full appearance-none bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-700 font-medium focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100 transition-all"
              />

              <div className="relative">
                <select
                  className="w-full appearance-none bg-white border-2 border-gray-200 rounded-xl px-4 py-3 pr-10 text-gray-700 font-medium focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100 transition-all cursor-pointer"
                  value={filterTag}
                  onChange={(e) => setFilterTag(e.target.value)}
                >
                  {allTags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
                <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </motion.div>

          {/* Clients Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <AnimatePresence>
              {filteredClients.map((client, index) => (
                <motion.div
                  key={client.id}
                  className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 border-l-4 border-rose-400"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: 0.05 * index }}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Client Avatar & Name */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-rose-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                      {client.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-base truncate">
                        {client.name}
                      </h3>
                      <p className="text-xs text-gray-500">{client.company}</p>
                    </div>
                  </div>

                  {/* Client Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600 text-xs">
                      <FaEnvelope className="text-rose-400 w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{client.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-xs">
                      <FaPhone className="text-rose-400 w-3 h-3 flex-shrink-0" />
                      <span>{client.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-xs">
                      <FaUser className="text-rose-400 w-3 h-3 flex-shrink-0" />
                      <span>{client.assignedTo}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {client.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-3 border-t border-gray-100">
                    <button
                      className="flex-1 flex items-center justify-center bg-sky-50 hover:bg-sky-100 text-sky-600 py-2 rounded-lg transition-all"
                      onClick={() => handleViewDetails(client)}
                    >
                      <FaEye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      className="flex-1 flex items-center justify-center bg-amber-50 hover:bg-amber-100 text-amber-600 py-2 rounded-lg transition-all"
                      onClick={() => handleEditClient(client)}
                    >
                      <FaEdit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      className="flex-1 flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded-lg transition-all"
                      onClick={() => handleDeleteConfirm(client)}
                    >
                      <FaTrash className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {filteredClients.length === 0 && (
            <motion.div
              className="bg-white rounded-2xl p-12 text-center shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-gray-400 mb-4">
                <FaUser className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No clients found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filters
              </p>
            </motion.div>
          )}

          {/* Add/Edit Modal */}
          <AnimatePresence>
            {(isAddFormOpen || isEditFormOpen) && (
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeModal}
              >
                <motion.div
                  className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {isAddFormOpen ? "Add New Client" : "Edit Client"}
                    </h2>
                    <button
                      className="w-10 h-10 flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-500 rounded-full transition-all hover:rotate-90"
                      onClick={closeModal}
                    >
                      <FaTimes />
                    </button>
                  </div>

                  <form onSubmit={handleSaveClient} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                          <FaUser className="text-rose-400" />
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100 transition-all"
                          value={selectedClient?.name || ""}
                          onChange={(e) =>
                            setSelectedClient({
                              ...selectedClient,
                              name: e.target.value,
                            })
                          }
                          placeholder="Enter full name"
                        />
                      </div>

                      <div>
                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                          <FaEnvelope className="text-rose-400" />
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100 transition-all"
                          value={selectedClient?.email || ""}
                          onChange={(e) =>
                            setSelectedClient({
                              ...selectedClient,
                              email: e.target.value,
                            })
                          }
                          placeholder="email@example.com"
                        />
                      </div>

                      <div>
                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                          <FaPhone className="text-rose-400" />
                          Phone Number
                        </label>
                        <input
                          type="text"
                          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100 transition-all"
                          value={selectedClient?.phone || ""}
                          onChange={(e) =>
                            setSelectedClient({
                              ...selectedClient,
                              phone: e.target.value,
                            })
                          }
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>

                      <div>
                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                          <FaBuilding className="text-rose-400" />
                          Company
                        </label>
                        <input
                          type="text"
                          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100 transition-all"
                          value={selectedClient?.company || ""}
                          onChange={(e) =>
                            setSelectedClient({
                              ...selectedClient,
                              company: e.target.value,
                            })
                          }
                          placeholder="Company name"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="text-gray-700 font-semibold mb-2 block">
                        Assigned To
                      </label>
                      <div className="relative">
                        <select
                          className="w-full appearance-none border-2 border-gray-200 rounded-xl px-4 py-3 pr-10 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100 transition-all cursor-pointer"
                          value={selectedClient?.assignedTo || "John Doe"}
                          onChange={(e) =>
                            setSelectedClient({
                              ...selectedClient,
                              assignedTo: e.target.value,
                            })
                          }
                        >
                          <option>John Doe</option>
                          <option>Jane Smith</option>
                        </select>
                        <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    {error && (
                      <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                        {error}
                      </div>
                    )}

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                      <button
                        type="button"
                        className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-8 py-3 bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                      >
                        {isAddFormOpen ? "Add Client" : "Save Changes"}
                      </button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Details Modal */}
          <AnimatePresence>
            {isDetailsOpen && selectedClient && (
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeModal}
              >
                <motion.div
                  className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800">
                      Client Details
                    </h2>
                    <button
                      className="w-10 h-10 flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-500 rounded-full transition-all hover:rotate-90"
                      onClick={closeModal}
                    >
                      <FaTimes />
                    </button>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-600 mb-1 block">
                        Full Name
                      </label>
                      <p className="text-base text-gray-800 bg-gray-50 px-4 py-3 rounded-xl">
                        {selectedClient.name}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-600 mb-1 block">
                        Email Address
                      </label>
                      <p className="text-base text-gray-800 bg-gray-50 px-4 py-3 rounded-xl">
                        {selectedClient.email}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-600 mb-1 block">
                        Phone Number
                      </label>
                      <p className="text-base text-gray-800 bg-gray-50 px-4 py-3 rounded-xl">
                        {selectedClient.phone}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-600 mb-1 block">
                        Company
                      </label>
                      <p className="text-base text-gray-800 bg-gray-50 px-4 py-3 rounded-xl">
                        {selectedClient.company}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-600 mb-1 block">
                        Tags
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {selectedClient.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-rose-50 text-rose-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-600 mb-1 block">
                        Assigned To
                      </label>
                      <p className="text-base text-gray-800 bg-gray-50 px-4 py-3 rounded-xl">
                        {selectedClient.assignedTo}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-600 mb-1 block">
                        Created At
                      </label>
                      <p className="text-base text-gray-800 bg-gray-50 px-4 py-3 rounded-xl">
                        {selectedClient.createdAt}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 p-6 border-t border-gray-100">
                    <button
                      className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Delete Confirmation Modal */}
          <AnimatePresence>
            {deleteConfirm && (
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-white rounded-3xl w-full max-w-md shadow-2xl"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                >
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                      Confirm Delete
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Are you sure you want to delete{" "}
                      <strong>{deleteConfirm.name}</strong>? This action cannot
                      be undone.
                    </p>
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleDelete}
                        className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Clients;
