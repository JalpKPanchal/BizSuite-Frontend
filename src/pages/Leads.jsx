import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlus,
  FaTimes,
  FaEye,
  FaEnvelope,
  FaTrash,
  FaFilter,
  FaBuilding,
  FaDollarSign,
  FaUser,
  FaGripVertical,
  FaListUl,
  FaTh,
  FaChevronDown,
} from "react-icons/fa";

const Leads = () => {
  const [leads, setLeads] = useState([
    {
      id: 1,
      name: "James Wilson",
      email: "jwilson@startup.io",
      company: "Startup Hub",
      value: 15000,
      stage: "New",
      source: "Website",
      assignedTo: "John Doe",
      createdAt: "10/4/2025, 1:30:00 PM",
    },
    {
      id: 2,
      name: "Anna Martinez",
      email: "anna@digitalagency.com",
      company: "Digital Agency Co",
      value: 25000,
      stage: "Contacted",
      source: "Referral",
      assignedTo: "Jane Smith",
      createdAt: "10/3/2025, 2:15:00 PM",
    },
    {
      id: 3,
      name: "Robert Taylor",
      email: "rtaylor@consulting.com",
      company: "Taylor Consulting",
      value: 45000,
      stage: "Negotiation",
      source: "Cold Call",
      assignedTo: "John Doe",
      createdAt: "10/2/2025, 10:00:00 AM",
    },
    {
      id: 4,
      name: "Sophie Kim",
      email: "skim@ecommerce.com",
      company: "E-Commerce Plus",
      value: 35000,
      stage: "Won",
      source: "Social Media",
      assignedTo: "Jane Smith",
      createdAt: "10/1/2025, 9:30:00 AM",
    },
    {
      id: 5,
      name: "Maria Garcia",
      email: "mgarcia@healthcare.com",
      company: "Healthcare Plus",
      value: 30000,
      stage: "Lost",
      source: "Website",
      assignedTo: "Jane Smith",
      createdAt: "9/30/2025, 3:45:00 PM",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [viewMode, setViewMode] = useState("kanban");

  const [filters, setFilters] = useState({
    stage: "All Stages",
    source: "All Sources",
    staff: "All Staff",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    value: 0,
    stage: "New",
    source: "Website",
    assignedTo: "John Doe",
  });

  const stages = [
    "All Stages",
    "New",
    "Contacted",
    "Negotiation",
    "Won",
    "Lost",
  ];
  const sources = [
    "All Sources",
    "Website",
    "Referral",
    "Social Media",
    "Cold Call",
    "Other",
  ];
  const staffMembers = ["All Staff", "John Doe", "Jane Smith"];

  const getLeadsByStage = (stage) => {
    return filteredLeads.filter((lead) => lead.stage === stage);
  };

  const filteredLeads = leads.filter((lead) => {
    const stageMatch =
      filters.stage === "All Stages" || lead.stage === filters.stage;
    const sourceMatch =
      filters.source === "All Sources" || lead.source === filters.source;
    const staffMatch =
      filters.staff === "All Staff" || lead.assignedTo === filters.staff;
    return stageMatch && sourceMatch && staffMatch;
  });

  const handleAddLead = () => {
    if (!formData.name || !formData.email) {
      alert("Please fill in required fields");
      return;
    }

    const newLead = {
      id: leads.length + 1,
      ...formData,
      createdAt: new Date().toLocaleString(),
    };

    setLeads([...leads, newLead]);
    setShowAddModal(false);
    resetForm();
  };

  const handleEditLead = () => {
    if (!formData.name || !formData.email) {
      alert("Please fill in required fields");
      return;
    }

    setLeads(
      leads.map((lead) =>
        lead.id === selectedLead.id ? { ...lead, ...formData } : lead
      )
    );
    setShowEditModal(false);
    resetForm();
  };

  const handleDeleteLead = (id) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      setLeads(leads.filter((lead) => lead.id !== id));
    }
  };

  const openEditModal = (lead) => {
    setSelectedLead(lead);
    setFormData({
      name: lead.name,
      email: lead.email,
      company: lead.company,
      value: lead.value,
      stage: lead.stage,
      source: lead.source,
      assignedTo: lead.assignedTo,
    });
    setShowEditModal(true);
  };

  const openDetailsModal = (lead) => {
    setSelectedLead(lead);
    setShowDetailsModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      company: "",
      value: 0,
      stage: "New",
      source: "Website",
      assignedTo: "John Doe",
    });
    setSelectedLead(null);
  };

  const handleDragStart = (e, lead) => {
    e.dataTransfer.setData("leadId", lead.id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, newStage) => {
    e.preventDefault();
    const leadId = parseInt(e.dataTransfer.getData("leadId"));

    setLeads(
      leads.map((lead) =>
        lead.id === leadId ? { ...lead, stage: newStage } : lead
      )
    );
  };

  const getStageCount = (stage) => {
    return getLeadsByStage(stage).length;
  };

  const getStageBorderColor = (stage) => {
    const colors = {
      New: "border-orange-400",
      Contacted: "border-pink-400",
      Negotiation: "border-pink-500",
      Won: "border-purple-500",
      Lost: "border-gray-400",
    };
    return colors[stage] || "border-gray-400";
  };

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
              <h1 className="text-3xl font-bold text-gray-800">Leads</h1>
              <p className="text-gray-500 text-sm mt-1">
                Track and manage your sales pipeline
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  className={`p-2 rounded-md transition-all ${
                    viewMode === "kanban"
                      ? "bg-white text-rose-400 shadow-sm"
                      : "text-gray-500"
                  }`}
                  onClick={() => setViewMode("kanban")}
                >
                  <FaTh className="w-5 h-5" />
                </button>
                <button
                  className={`p-2 rounded-md transition-all ${
                    viewMode === "list"
                      ? "bg-white text-rose-400 shadow-sm"
                      : "text-gray-500"
                  }`}
                  onClick={() => setViewMode("list")}
                >
                  <FaListUl className="w-5 h-5" />
                </button>
              </div>
              <button
                className="flex items-center gap-2 bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                onClick={() => setShowAddModal(true)}
              >
                <FaPlus className="w-4 h-4" />
                Add Lead
              </button>
            </div>
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
              <span className="font-semibold text-gray-700">Filters</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <select
                  className="w-full appearance-none bg-white border-2 border-gray-200 rounded-xl px-4 py-3 pr-10 text-gray-700 font-medium focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100 transition-all cursor-pointer"
                  value={filters.stage}
                  onChange={(e) =>
                    setFilters({ ...filters, stage: e.target.value })
                  }
                >
                  {stages.map((stage) => (
                    <option key={stage} value={stage}>
                      {stage}
                    </option>
                  ))}
                </select>
                <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  className="w-full appearance-none bg-white border-2 border-gray-200 rounded-xl px-4 py-3 pr-10 text-gray-700 font-medium focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100 transition-all cursor-pointer"
                  value={filters.source}
                  onChange={(e) =>
                    setFilters({ ...filters, source: e.target.value })
                  }
                >
                  {sources.map((source) => (
                    <option key={source} value={source}>
                      {source}
                    </option>
                  ))}
                </select>
                <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  className="w-full appearance-none bg-white border-2 border-gray-200 rounded-xl px-4 py-3 pr-10 text-gray-700 font-medium focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100 transition-all cursor-pointer"
                  value={filters.staff}
                  onChange={(e) =>
                    setFilters({ ...filters, staff: e.target.value })
                  }
                >
                  {staffMembers.map((staff) => (
                    <option key={staff} value={staff}>
                      {staff}
                    </option>
                  ))}
                </select>
                <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </motion.div>

          {/* Kanban Board - Grid Wrapping (NO HORIZONTAL SCROLL) */}
          {viewMode === "kanban" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {["New", "Contacted", "Negotiation", "Won", "Lost"].map(
                (stage, index) => (
                  <motion.div
                    key={stage}
                    className="bg-white rounded-xl p-4 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-gray-800 text-base">
                        {stage}
                      </h3>
                      <span className="bg-rose-400 text-white text-xs font-bold px-2.5 py-1 rounded-full min-w-[28px] text-center">
                        {getStageCount(stage)}
                      </span>
                    </div>

                    <div
                      className="space-y-3"
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, stage)}
                    >
                      <AnimatePresence>
                        {getLeadsByStage(stage).map((lead) => (
                          <motion.div
                            key={lead.id}
                            className={`bg-white rounded-xl p-4 border-l-4 ${getStageBorderColor(
                              stage
                            )} cursor-move shadow-sm hover:shadow-md transition-all duration-200`}
                            draggable
                            onDragStart={(e) => handleDragStart(e, lead)}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="flex justify-between items-start mb-3">
                              <h4 className="font-bold text-gray-800 text-sm leading-tight">
                                {lead.name}
                              </h4>
                              <FaGripVertical className="text-gray-300 cursor-grab active:cursor-grabbing flex-shrink-0 ml-2 text-sm" />
                            </div>

                            <div className="space-y-2 mb-3">
                              <div className="flex items-center gap-2 text-gray-600 text-xs">
                                <FaBuilding className="text-rose-400 w-3 h-3 flex-shrink-0" />
                                <span className="truncate">{lead.company}</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-600 text-xs">
                                <FaEnvelope className="text-rose-400 w-3 h-3 flex-shrink-0" />
                                <span className="truncate">{lead.email}</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-600 text-xs">
                                <FaDollarSign className="text-rose-400 w-3 h-3 flex-shrink-0" />
                                <span>${lead.value.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-600 text-xs">
                                <FaUser className="text-rose-400 w-3 h-3 flex-shrink-0" />
                                <span className="truncate">
                                  {lead.assignedTo}
                                </span>
                              </div>
                            </div>

                            <div className="flex gap-2 pt-3 border-t border-gray-100">
                              <button
                                className="flex-1 flex items-center justify-center bg-sky-50 hover:bg-sky-100 text-sky-600 py-2 rounded-lg transition-all"
                                onClick={() => openDetailsModal(lead)}
                              >
                                <FaEye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                className="flex-1 flex items-center justify-center bg-amber-50 hover:bg-amber-100 text-amber-600 py-2 rounded-lg transition-all"
                                onClick={() => openEditModal(lead)}
                              >
                                <FaEnvelope className="w-3.5 h-3.5" />
                              </button>
                              <button
                                className="flex-1 flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded-lg transition-all"
                                onClick={() => handleDeleteLead(lead.id)}
                              >
                                <FaTrash className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )
              )}
            </div>
          )}

          {/* Modals remain the same... */}
          <AnimatePresence>
            {showAddModal && (
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowAddModal(false)}
              >
                <motion.div
                  className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800">
                      Add New Lead
                    </h2>
                    <button
                      className="w-10 h-10 flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-500 rounded-full transition-all hover:rotate-90"
                      onClick={() => setShowAddModal(false)}
                    >
                      <FaTimes />
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                          <FaUser className="text-rose-400" />
                          Lead Name
                        </label>
                        <input
                          type="text"
                          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100 transition-all"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="Enter lead name"
                        />
                      </div>

                      <div>
                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                          <FaEnvelope className="text-rose-400" />
                          Email
                        </label>
                        <input
                          type="email"
                          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100 transition-all"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="Enter email"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                          <FaBuilding className="text-rose-400" />
                          Company
                        </label>
                        <input
                          type="text"
                          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100 transition-all"
                          value={formData.company}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              company: e.target.value,
                            })
                          }
                          placeholder="Enter company"
                        />
                      </div>

                      <div>
                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                          <FaDollarSign className="text-rose-400" />
                          Value
                        </label>
                        <input
                          type="number"
                          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100 transition-all"
                          value={formData.value}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              value: parseInt(e.target.value) || 0,
                            })
                          }
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="text-gray-700 font-semibold mb-2 block">
                          Stage
                        </label>
                        <div className="relative">
                          <select
                            className="w-full appearance-none border-2 border-gray-200 rounded-xl px-4 py-3 pr-10 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100 transition-all cursor-pointer"
                            value={formData.stage}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                stage: e.target.value,
                              })
                            }
                          >
                            {stages
                              .filter((s) => s !== "All Stages")
                              .map((stage) => (
                                <option key={stage} value={stage}>
                                  {stage}
                                </option>
                              ))}
                          </select>
                          <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="text-gray-700 font-semibold mb-2 block">
                          Source
                        </label>
                        <div className="relative">
                          <select
                            className="w-full appearance-none border-2 border-gray-200 rounded-xl px-4 py-3 pr-10 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100 transition-all cursor-pointer"
                            value={formData.source}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                source: e.target.value,
                              })
                            }
                          >
                            {sources
                              .filter((s) => s !== "All Sources")
                              .map((source) => (
                                <option key={source} value={source}>
                                  {source}
                                </option>
                              ))}
                          </select>
                          <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="text-gray-700 font-semibold mb-2 block">
                        Assigned To
                      </label>
                      <div className="relative">
                        <select
                          className="w-full appearance-none border-2 border-gray-200 rounded-xl px-4 py-3 pr-10 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100 transition-all cursor-pointer"
                          value={formData.assignedTo}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              assignedTo: e.target.value,
                            })
                          }
                        >
                          {staffMembers
                            .filter((s) => s !== "All Staff")
                            .map((staff) => (
                              <option key={staff} value={staff}>
                                {staff}
                              </option>
                            ))}
                        </select>
                        <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 p-6 border-t border-gray-100">
                    <button
                      className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all"
                      onClick={() => setShowAddModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-8 py-3 bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                      onClick={handleAddLead}
                    >
                      Add Lead
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Edit & Details Modals - same as before */}
        </div>
      </div>
    </div>
  );
};

export default Leads;
