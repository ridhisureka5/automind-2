"use client";

import {
  Filter,
  Brain,
  Clock,
  User,
  Wrench,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

/* ---------------- DATA ---------------- */

const dates = [
  { day: "Sun", date: 1 },
  { day: "Mon", date: 2 },
  { day: "Tue", date: 3, active: true },
  { day: "Wed", date: 4 },
  { day: "Thu", date: 5 },
  { day: "Fri", date: 6 },
  { day: "Sat", date: 7 },
];

const appointments = [
  {
    time: "9:00 AM",
    car: "Toyota Camry 2022",
    user: "Shyam",
    service: "Brake Pad Replacement",
    priority: "high",
  },
  {
    time: "10:30 AM",
    car: "Honda Civic 2021",
    user: "Anita",
    service: "Oil Change",
    priority: "low",
    highlight: true,
  },
  {
    time: "1:00 PM",
    car: "Ford F-150 2023",
    user: "Ravi",
    service: "Transmission Service",
    priority: "critical",
  },
];

/* ---------------- PAGE ---------------- */

export default function ServiceSchedule() {
  return (
    <div className="w-full p-6 bg-slate-50 space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Service Schedule
          </h1>

          <p className="text-slate-500">
            AI-optimized appointment scheduling
          </p>
        </div>

        <div className="flex gap-3">

          <button className="flex items-center gap-2 border bg-white px-4 py-2 rounded-lg text-sm">
            <Filter size={16} />
            Filter
          </button>

          <button className="flex items-center gap-2 bg-yellow-400 px-4 py-2 rounded-lg text-sm font-medium">
            <Brain size={16} />
            AI Optimize
          </button>

        </div>

      </div>

      {/* Calendar */}
      <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">

        <button className="text-xl">‹</button>

        <div className="flex gap-8">

          {dates.map((d, i) => (
            <div
              key={i}
              className={`text-center cursor-pointer ${
                d.active
                  ? "bg-yellow-400 text-black px-4 py-2 rounded-xl"
                  : "text-slate-600"
              }`}
            >
              <p className="text-sm">{d.day}</p>
              <p className="font-bold">{d.date}</p>
            </div>
          ))}

        </div>

        <button className="text-xl">›</button>

      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Appointments */}
        <div className="lg:col-span-2 space-y-4">

          {/* Date */}
          <div className="flex justify-between items-center">

            <h2 className="text-lg font-semibold text-slate-800">
              Tuesday, February 3, 2026
            </h2>

            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
              4 Appointments
            </span>

          </div>

          {/* Cards */}
          {appointments.map((a, i) => (
            <AppointmentCard key={i} data={a} />
          ))}

        </div>

        {/* Right Panel */}
        <div className="space-y-6">

          {/* Summary */}
          <div className="bg-white rounded-xl shadow p-5">

            <h3 className="font-semibold mb-4">
              Today's Summary
            </h3>

            <SummaryItem
              text="Confirmed"
              value="3"
              color="green"
            />

            <SummaryItem
              text="Pending"
              value="1"
              color="yellow"
            />

            <SummaryItem
              text="Critical"
              value="1"
              color="red"
            />

          </div>

          {/* AI Box */}
          <div className="bg-yellow-50 rounded-xl p-5 border border-yellow-200">

            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Brain size={18} />
              AI Recommendations
            </h3>

            <ul className="text-sm space-y-2 text-slate-700 list-disc pl-4">

              <li>
                Reschedule 3:30 PM slot for buffer
              </li>

              <li>
                High demand predicted Thursday
              </li>

              <li>
                Order brake pads early
              </li>

            </ul>

          </div>

        </div>

      </div>

    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function AppointmentCard({ data }) {
  const colors = {
    high: "bg-orange-100 text-orange-600",
    low: "bg-emerald-100 text-emerald-600",
    critical: "bg-red-100 text-red-600",
  };

  return (
    <div
      className={`bg-white rounded-xl shadow p-5 flex justify-between items-center ${
        data.highlight ? "border-2 border-yellow-400" : ""
      }`}
    >

      <div className="flex gap-4">

        {/* Icon */}
        <div className="h-12 w-12 bg-yellow-400 rounded-xl flex items-center justify-center">
          <Clock />
        </div>

        {/* Info */}
        <div>

          <h3 className="font-semibold text-lg">
            {data.time}
          </h3>

          <p className="text-slate-500 text-sm">
            {data.car}
          </p>

          <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">

            <span className="flex items-center gap-1">
              <User size={14} />
              {data.user}
            </span>

            <span className="flex items-center gap-1">
              <Wrench size={14} />
              {data.service}
            </span>

          </div>

        </div>

      </div>

      {/* Right */}
      <div className="flex items-center gap-3">

        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${colors[data.priority]}`}
        >
          {data.priority}
        </span>

        {data.priority === "critical" && (
          <button className="bg-green-600 text-white px-3 py-1 rounded-lg flex items-center gap-1 text-sm">
            <CheckCircle size={14} />
            Confirm
          </button>
        )}

        <button className="border px-3 py-1 rounded-lg text-sm">
          View Details
        </button>

      </div>

    </div>
  );
}

function SummaryItem({ text, value, color }) {
  const colors = {
    green: "bg-green-50 text-green-600",
    yellow: "bg-yellow-50 text-yellow-600",
    red: "bg-red-50 text-red-600",
  };

  return (
    <div
      className={`flex justify-between items-center p-3 rounded-lg mb-2 ${colors[color]}`}
    >
      <span className="flex items-center gap-2">
        <AlertCircle size={16} />
        {text}
      </span>

      <span className="font-bold">{value}</span>
    </div>
  );
}
