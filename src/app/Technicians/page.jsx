"use client";
import { useState } from "react";
import {
  Plus,
  Phone,
  Mail,
  Star,
  Wrench,
  Clock,
  CheckCircle,
  Users,
  Award,
} from "lucide-react";

export default function Technicians() {
  /* ---------------- STATE ---------------- */

  const [technicians, setTechnicians] = useState([
    {
      id: 1,
      name: "Robert Chen",
      role: "Senior Technician",
      specialty: "Engine & Transmission",
      experience: 12,
      rating: 4.9,
      jobs: 847,
      status: "working",
      phone: "9876543210",
      email: "robert@service.com",
      job: "Engine Repair - Toyota Camry",
      progress: 75,
    },
    {
      id: 2,
      name: "Maria Garcia",
      role: "Technician",
      specialty: "Electrical Systems",
      experience: 8,
      rating: 4.8,
      jobs: 523,
      status: "available",
      phone: "9876543211",
      email: "maria@service.com",
    },
    {
      id: 3,
      name: "James Wilson",
      role: "Technician",
      specialty: "Brakes & Suspension",
      experience: 9,
      rating: 4.7,
      jobs: 612,
      status: "working",
      phone: "9876543212",
      email: "james@service.com",
      job: "Brake Service - Honda Accord",
      progress: 45,
    },
    {
      id: 4,
      name: "Lisa Taylor",
      role: "Junior Technician",
      specialty: "General Maintenance",
      experience: 3,
      rating: 4.6,
      jobs: 234,
      status: "break",
      phone: "9876543213",
      email: "lisa@service.com",
    },
    {
      id: 5,
      name: "Michael Brown",
      role: "Senior Technician",
      specialty: "Diagnostics",
      experience: 15,
      rating: 4.9,
      jobs: 956,
      status: "working",
      phone: "9876543214",
      email: "michael@service.com",
      job: "Full Diagnostics - BMW X5",
      progress: 90,
    },
  ]);

  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    role: "",
    specialty: "",
    phone: "",
    email: "",
  });

  /* ---------------- ADD TECH ---------------- */

  const handleAdd = () => {
    if (!form.name || !form.role) return;

    const newTech = {
      id: Date.now(),
      ...form,
      experience: 1,
      rating: 4.5,
      jobs: 0,
      status: "available",
    };

    setTechnicians([...technicians, newTech]);
    setShowModal(false);

    setForm({
      name: "",
      role: "",
      specialty: "",
      phone: "",
      email: "",
    });
  };

  /* ---------------- STATS ---------------- */

  const total = technicians.length;

  const available = technicians.filter(
    (t) => t.status === "available"
  ).length;

  const working = technicians.filter(
    (t) => t.status === "working"
  ).length;

  const avgRating = (
    technicians.reduce((a, b) => a + b.rating, 0) /
    technicians.length
  ).toFixed(1);

  /* ---------------- UI ---------------- */

  return (
    <div className="p-6 bg-slate-50 min-h-screen">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-3xl font-bold">
            Technician Management
          </h1>

          <p className="text-gray-500">
            Track and manage your service team
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="btn-primary"
        >
          <Plus size={18} /> Add Technician
        </button>

      </div>

      {/* STATS */}

      <div className="grid md:grid-cols-4 gap-5 mb-8">

        <StatCard
          icon={<Users />}
          title="Total Technicians"
          value={total}
          color="blue"
        />

        <StatCard
          icon={<CheckCircle />}
          title="Available"
          value={available}
          color="green"
        />

        <StatCard
          icon={<Wrench />}
          title="Working"
          value={working}
          color="yellow"
        />

        <StatCard
          icon={<Award />}
          title="Team Rating"
          value={avgRating}
          color="purple"
        />

      </div>

      {/* TECH GRID */}

      <div className="grid md:grid-cols-3 gap-6">

        {technicians.map((tech) => (
          <TechCard key={tech.id} tech={tech} />
        ))}

      </div>

      {/* ADD MODAL */}

      {showModal && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-xl w-[400px]">

            <h2 className="text-xl font-bold mb-4">
              Add Technician
            </h2>

            <div className="space-y-3">

              <input
                placeholder="Full Name"
                className="input w-full"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <input
                placeholder="Role"
                className="input w-full"
                value={form.role}
                onChange={(e) =>
                  setForm({ ...form, role: e.target.value })
                }
              />

              <input
                placeholder="Specialty"
                className="input w-full"
                value={form.specialty}
                onChange={(e) =>
                  setForm({
                    ...form,
                    specialty: e.target.value,
                  })
                }
              />

              <input
                placeholder="Phone"
                className="input w-full"
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
              />

              <input
                placeholder="Email"
                className="input w-full"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

            </div>

            <div className="flex justify-end gap-3 mt-5">

              <button
                onClick={() => setShowModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>

              <button
                onClick={handleAdd}
                className="btn-primary"
              >
                Add
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function TechCard({ tech }) {
  const initials = tech.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const statusStyle = {
    working: "bg-yellow-100 text-yellow-700",
    available: "bg-green-100 text-green-700",
    break: "bg-gray-200 text-gray-700",
  };

  const statusText = {
    working: "Working",
    available: "Available",
    break: "On Break",
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-4">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center font-bold">
            {initials}
          </div>

          <div>
            <h3 className="font-semibold">
              {tech.name}
            </h3>

            <p className="text-sm text-gray-500">
              {tech.role}
            </p>
          </div>

        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs ${statusStyle[tech.status]}`}
        >
          {statusText[tech.status]}
        </span>

      </div>

      {/* INFO */}

      <div className="space-y-2 text-sm text-gray-600">

        <p>🔧 {tech.specialty}</p>

        <p>⏱ {tech.experience} years experience</p>

        <p className="flex items-center gap-2">
          <Star size={14} className="text-yellow-400" />
          {tech.rating} · {tech.jobs} jobs
        </p>

      </div>

      {/* JOB */}

      {tech.status === "working" && (

        <div className="bg-yellow-50 p-3 rounded-lg mt-4">

          <p className="text-sm font-medium">
            Current Job
          </p>

          <p className="text-sm mb-2">
            {tech.job}
          </p>

          <div className="h-2 bg-gray-200 rounded">

            <div
              className="h-full bg-black rounded"
              style={{
                width: `${tech.progress}%`,
              }}
            ></div>

          </div>

          <p className="text-right text-xs mt-1">
            {tech.progress}%
          </p>

        </div>
      )}

      {/* ACTIONS */}

      <div className="flex gap-3 mt-4">

        <a
          href={`tel:${tech.phone}`}
          className="btn-secondary flex-1"
        >
          <Phone size={16} /> Call
        </a>

        <a
          href={`mailto:${tech.email}`}
          className="btn-secondary flex-1"
        >
          <Mail size={16} /> Email Email
        </a>

        {tech.status === "available" && (
          <button className="btn-primary flex-1">
            Assign
          </button>
        )}

      </div>
    </div>
  );
}

function StatCard({ icon, title, value, color }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow flex justify-between items-center">

      <div>
        <p className="text-gray-500 text-sm">
          {title}
        </p>

        <h2 className="text-2xl font-bold">
          {value}
        </h2>
      </div>

      <div
        className={`p-3 rounded-lg bg-${color}-100 text-${color}-600`}
      >
        {icon}
      </div>
    </div>
  );
}
