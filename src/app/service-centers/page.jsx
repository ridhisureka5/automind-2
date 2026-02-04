"use client";

import {
  Calendar,
  Clock,
  TrendingUp,
  MapPin,
} from "lucide-react";

/* ---------------- DATA ---------------- */

const weeklyLoad = [
  { day: "Mon", value: 24 },
  { day: "Tue", value: 31 },
  { day: "Wed", value: 28 },
  { day: "Thu", value: 35 },
  { day: "Fri", value: 42 },
  { day: "Sat", value: 18 },
  { day: "Sun", value: 8 },
];

const utilization = [
  { month: "Jan", value: 72 },
  { month: "Feb", value: 78 },
  { month: "Mar", value: 85 },
  { month: "Apr", value: 82 },
  { month: "May", value: 88 },
  { month: "Jun", value: 91 },
];

const centers = [
  {
    name: "AutoCare Central",
    city: "New Delhi",
    capacity: 92,
    appt: 45,
    status: "busy",
  },
  {
    name: "Premium Service Hub",
    city: "Sonipat",
    capacity: 78,
    appt: 32,
    status: "normal",
  },
  {
    name: "Express Maintenance",
    city: "Gurgaon",
    capacity: 85,
    appt: 28,
    status: "normal",
  },
  {
    name: "TechServe Plus",
    city: "Noida",
    capacity: 65,
    appt: 21,
    status: "available",
  },
  {
    name: "Quick Fix Center",
    city: "Faridabad",
    capacity: 58,
    appt: 18,
    status: "available",
  },
];

/* ---------------- PAGE ---------------- */

export default function ServiceCenters() {
  return (
    <div className="w-full p-6 bg-slate-50 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Service Center Analytics
        </h1>

        <p className="text-slate-500 text-sm">
          Appointment scheduling and capacity insights
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <StatCard
          title="Total Appointments"
          value="5"
          change="+18%"
          icon={<Calendar />}
        />

        <StatCard
          title="Avg Duration"
          value="2.4h"
          change="-12%"
          icon={<Clock />}
        />

        <StatCard
          title="Capacity Used"
          value="87%"
          change="+5%"
          icon={<TrendingUp />}
        />

        <StatCard
          title="Service Centers"
          value="12"
          change="+2"
          icon={<MapPin />}
        />

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Weekly */}
        <ChartCard title="Weekly Appointment Load">

          <div className="flex items-end gap-4 h-56">

            {weeklyLoad.map((d, i) => (

              <div key={i} className="flex flex-col items-center flex-1">

                <div
                  className="w-full bg-indigo-500 rounded-t-lg"
                  style={{ height: `${d.value * 3}px` }}
                />

                <span className="text-xs mt-2 text-slate-500">
                  {d.day}
                </span>

              </div>

            ))}

          </div>

        </ChartCard>

        {/* Trend */}
        <ChartCard title="Capacity Utilization Trend">

          <svg className="w-full h-56">

            {utilization.map((p, i) => {

              if (i === 0) return null;

              const x1 = (i - 1) * 100 + 30;
              const y1 = 200 - utilization[i - 1].value;

              const x2 = i * 100 + 30;
              const y2 = 200 - p.value;

              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#4f46e5"
                  strokeWidth="4"
                />
              );
            })}

          </svg>

        </ChartCard>

      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-lg p-8">

        <h3 className="font-bold text-xl mb-6 text-slate-800">
          Service Center Performance
        </h3>

        <table className="w-full text-base">

          <thead className="text-slate-600 border-b-2">

            <tr>

              <th className="py-4 text-left">Center</th>
              <th className="py-4 text-center">City</th>
              <th className="py-4 text-left">Capacity</th>
              <th className="py-4 text-center">Appointments</th>
              <th className="py-4 text-center">Status</th>

            </tr>

          </thead>

          <tbody>

            {centers.map((c, i) => (
              <BigRow key={i} data={c} />
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function StatCard({ title, value, change, icon }) {
  const positive = change.startsWith("+");

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex justify-between items-center">

      <div>

        <p className="text-slate-500 text-sm">{title}</p>

        <h3 className="text-2xl font-bold text-slate-800">
          {value}
        </h3>

        <p
          className={`text-xs ${
            positive ? "text-emerald-600" : "text-red-500"
          }`}
        >
          {change}
        </p>

      </div>

      <div className="h-10 w-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center">
        {icon}
      </div>

    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h3 className="font-semibold mb-4 text-slate-800">
        {title}
      </h3>

      {children}

    </div>
  );
}

function BigRow({ data }) {

  const statusColors = {
    busy: "bg-red-100 text-red-600",
    normal: "bg-yellow-100 text-yellow-600",
    available: "bg-emerald-100 text-emerald-600",
  };

  return (
    <tr className="border-b last:border-none hover:bg-slate-50 transition">

      <td className="py-5 font-semibold text-slate-800">
        {data.name}
      </td>

      <td className="py-5 text-center text-slate-600">
        {data.city}
      </td>

      <td className="py-5">

        <div className="flex items-center gap-4">

          <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">

            <div
              className="h-full bg-indigo-600 rounded-full"
              style={{ width: `${data.capacity}%` }}
            />

          </div>

          <span className="font-medium text-slate-600">
            {data.capacity}%
          </span>

        </div>

      </td>

      <td className="py-5 text-center font-medium text-slate-700">
        {data.appt}
      </td>

      <td className="py-5 text-center">

        <span
          className={`px-4 py-1 rounded-full text-sm font-medium ${statusColors[data.status]}`}
        >
          {data.status}
        </span>

      </td>

    </tr>
  );
}
