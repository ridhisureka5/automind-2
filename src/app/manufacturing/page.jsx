"use client";

import {
  AlertTriangle,
  XCircle,
  CheckCircle,
  Clock,
} from "lucide-react";

/* ---------------- DATA ---------------- */

const stats = [
  {
    title: "Total Defects",
    value: 4,
    change: "-15%",
    color: "orange",
  },
  {
    title: "Critical Issues",
    value: 1,
    change: "-2",
    color: "red",
  },
  {
    title: "Resolved",
    value: 1,
    change: "+23%",
    color: "green",
  },
  {
    title: "Avg Resolution",
    value: "4.2d",
    change: "-1.5d",
    color: "blue",
  },
];

const defects = [
  {
    name: "Engine",
    minor: 12,
    moderate: 8,
    major: 4,
    critical: 1,
  },
  {
    name: "Transmission",
    minor: 8,
    moderate: 5,
    major: 2,
    critical: 0,
  },
  {
    name: "Brakes",
    minor: 15,
    moderate: 10,
    major: 6,
    critical: 2,
  },
  {
    name: "Suspension",
    minor: 6,
    moderate: 3,
    major: 1,
    critical: 0,
  },
  {
    name: "Electrical",
    minor: 20,
    moderate: 12,
    major: 5,
    critical: 1,
  },
  {
    name: "HVAC",
    minor: 10,
    moderate: 4,
    major: 2,
    critical: 0,
  },
];

const reports = [
  {
    id: "DEF-001",
    title: "Brake System",
    supplier: "AutoParts Global",
    affected: 23,
    severity: "critical",
    status: "investigating",
  },
  {
    id: "DEF-002",
    title: "Engine Control Module",
    supplier: "SupplierTech Inc",
    affected: 45,
    severity: "major",
    status: "open",
  },
  {
    id: "DEF-003",
    title: "HVAC Unit",
    supplier: "Elite Manufacturing",
    affected: 12,
    severity: "moderate",
    status: "resolved",
  },
  {
    id: "DEF-004",
    title: "Transmission Sensor",
    supplier: "Precision Components",
    affected: 8,
    severity: "minor",
    status: "open",
  },
];

/* ---------------- PAGE ---------------- */

export default function Manufacturing() {
  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">

      {/* Header */}
      <div>

        <h1 className="text-2xl font-bold">
          Manufacturing Insights
        </h1>

        <p className="text-gray-500 text-sm">
          Defect analysis, RCA/CAPA trends, and supplier performance
        </p>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {stats.map((s, i) => (
          <StatCard key={i} data={s} />
        ))}

      </div>

      {/* Tabs */}
      <div className="bg-indigo-900/90 rounded-xl flex text-sm overflow-hidden w-fit">

        <Tab active>Defect Heatmap</Tab>
        <Tab>RCA/CAPA Trends</Tab>
        <Tab>Supplier Performance</Tab>

      </div>

      {/* Heatmap */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h3 className="font-semibold mb-4">
          Defect Distribution by Component
        </h3>

        <div className="space-y-4">

          {defects.map((d, i) => (
            <HeatRow key={i} data={d} />
          ))}

        </div>

        {/* Legend */}
        <div className="flex gap-6 mt-6 text-sm text-gray-500">

          <Legend color="blue" text="Minor" />
          <Legend color="yellow" text="Moderate" />
          <Legend color="orange" text="Major" />
          <Legend color="red" text="Critical" />

        </div>

      </div>

      {/* Reports */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex justify-between mb-4">

          <h3 className="font-semibold">
            Recent Defect Reports
          </h3>

          <span className="bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-full">
            2 Open
          </span>

        </div>

        <div className="space-y-4">

          {reports.map((r, i) => (
            <ReportCard key={i} data={r} />
          ))}

        </div>

      </div>

    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function StatCard({ data }) {
  const colors = {
    orange: "bg-orange-100 text-orange-600",
    red: "bg-red-100 text-red-600",
    green: "bg-green-100 text-green-600",
    blue: "bg-indigo-100 text-indigo-600",
  };

  const icons = {
    orange: <AlertTriangle />,
    red: <XCircle />,
    green: <CheckCircle />,
    blue: <Clock />,
  };

  return (
    <div className="bg-white rounded-xl shadow p-5 flex justify-between items-center">

      <div>

        <p className="text-gray-500 text-sm">
          {data.title}
        </p>

        <h3 className="text-2xl font-bold">
          {data.value}
        </h3>

        <p className="text-green-500 text-xs">
          {data.change}
        </p>

      </div>

      <div
        className={`h-10 w-10 rounded-lg flex items-center justify-center ${colors[data.color]}`}
      >
        {icons[data.color]}
      </div>

    </div>
  );
}

function Tab({ children, active }) {
  return (
    <button
      className={`px-5 py-2 transition ${
        active
          ? "bg-indigo-700 text-white"
          : "text-indigo-200 hover:bg-indigo-800"
      }`}
    >
      {children}
    </button>
  );
}

function HeatRow({ data }) {
  const total =
    data.minor +
    data.moderate +
    data.major +
    data.critical || 1; // prevent divide by 0

  return (
    <div className="flex items-center gap-4">

      {/* Label */}
      <div className="w-36 text-sm font-medium text-gray-600">
        {data.name}
      </div>

      {/* Bar Container */}
      <div className="flex-1 flex h-6 rounded-full overflow-hidden bg-slate-200">

        <Bar color="blue" value={data.minor} total={total} />
        <Bar color="yellow" value={data.moderate} total={total} />
        <Bar color="orange" value={data.major} total={total} />
        <Bar color="red" value={data.critical} total={total} />

      </div>

      {/* Total */}
      <div className="w-12 text-xs text-gray-500 text-right">
        {total}
      </div>

    </div>
  );
}


function Bar({ color, value, total }) {
  const colors = {
    blue: "bg-blue-500",
    yellow: "bg-yellow-400",
    orange: "bg-orange-500",
    red: "bg-red-500",
  };

  const width = Math.max((value / total) * 100, 2); // min visible width

  return (
    <div
      className={`${colors[color]} h-full transition-all`}
      style={{ width: `${width}%` }}
    />
  );
}


function Legend({ color, text }) {
  const colors = {
    blue: "bg-blue-500",
    yellow: "bg-yellow-400",
    orange: "bg-orange-500",
    red: "bg-red-500",
  };

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">

      <span
        className={`h-3 w-3 rounded-full ${colors[color]}`}
      />

      {text}

    </div>
  );
}


function ReportCard({ data }) {
  const severityColors = {
    critical: "bg-red-100 text-red-600",
    major: "bg-orange-100 text-orange-600",
    moderate: "bg-yellow-100 text-yellow-600",
    minor: "bg-blue-100 text-blue-600",
  };

  const statusColors = {
    investigating: "bg-yellow-100 text-yellow-600",
    open: "bg-gray-100 text-gray-600",
    resolved: "bg-green-100 text-green-600",
  };

  return (
    <div className="border rounded-xl p-4 flex justify-between items-center hover:shadow transition">

      <div>

        <div className="flex gap-3 items-center">

          <h4 className="font-medium">
            {data.title}
          </h4>

          <span className="text-xs bg-slate-100 px-2 rounded">
            {data.id}
          </span>

        </div>

        <p className="text-xs text-gray-500 mt-1">
          Supplier: {data.supplier}
        </p>

        <p className="text-xs text-gray-400">
          {data.affected} vehicles affected
        </p>

      </div>

      <div className="flex flex-col gap-2 items-end">

        <span
          className={`text-xs px-3 py-1 rounded-full ${severityColors[data.severity]}`}
        >
          {data.severity}
        </span>

        <span
          className={`text-xs px-3 py-1 rounded-full ${statusColors[data.status]}`}
        >
          {data.status}
        </span>

      </div>

    </div>
  );
}
