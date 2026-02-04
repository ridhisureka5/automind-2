"use client";

import {
  Car,
  Activity,
  AlertTriangle,
  CheckCircle,
  MapPin,
  Calendar,
  Gauge,
  Search,
} from "lucide-react";

/* ---------------- DATA ---------------- */

const vehicles = [
  {
    name: "Jeep Grand Cherokee",
    vin: "1C4RJFBG0LC123456",
    status: "Warning",
    score: 68,
    miles: "78,900",
    year: 2021,
    city: "San Antonio",
    next: "Jan 15, 2024",
  },
  {
    name: "Mercedes-Benz E-Class",
    vin: "JN1TBNT30Z0000001",
    status: "Healthy",
    score: 94,
    miles: "34,567",
    year: 2022,
    city: "Philadelphia",
    next: "Mar 28, 2024",
  },
  {
    name: "Honda Accord",
    vin: "WBA5B1C55ED123456",
    status: "Healthy",
    score: 99,
    miles: "5,670",
    year: 2023,
    city: "San Diego",
    next: "Apr 08, 2024",
  },
  {
    name: "BMW X5",
    vin: "3GKALMEV5AL123456",
    status: "Critical",
    score: 45,
    miles: "8,920",
    year: 2023,
    city: "Chicago",
    next: "Jan 20, 2024",
  },
  {
    name: "Audi A6",
    vin: "WVWZZZ3CZWE123456",
    status: "Service",
    score: 78,
    miles: "23,456",
    year: 2023,
    city: "Phoenix",
    next: "Jan 25, 2024",
  },
  {
    name: "Tesla Model S",
    vin: "1HGBH41JXMN109186",
    status: "Healthy",
    score: 96,
    miles: "12,450",
    year: 2023,
    city: "New York",
    next: "Apr 05, 2024",
  },
  {
    name: "Ford F-150",
    vin: "2FMDK3GCXABA12345",
    status: "Warning",
    score: 82,
    miles: "45,230",
    year: 2022,
    city: "Los Angeles",
    next: "Mar 15, 2024",
  },
  {
    name: "Toyota Camry",
    vin: "5YFBURHE1JP789012",
    status: "Healthy",
    score: 91,
    miles: "67,890",
    year: 2021,
    city: "Houston",
    next: "Feb 20, 2024",
  },
];

/* ---------------- PAGE ---------------- */

export default function VehiclesPage() {
  return (
    <div className="w-full p-6 bg-slate-50 space-y-6">

      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Vehicle Monitoring
        </h1>

        <p className="text-slate-500 text-sm">
          Real-time vehicle health tracking and diagnostics
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <TopCard title="Total Vehicles" value="8" icon={<Car />} />
        <TopCard title="Healthy" value="4" icon={<CheckCircle />} />
        <TopCard title="Warning" value="2" icon={<AlertTriangle />} />
        <TopCard title="Critical" value="1" icon={<Activity />} />

      </div>

      {/* Filters */}
      <div className="bg-slate-800 rounded-xl p-4 flex flex-wrap gap-4 items-center">

        <div className="flex items-center gap-2 bg-slate-700 px-4 py-2 rounded-lg flex-1">
          <Search size={16} className="text-gray-400" />
          <input
            placeholder="Search by VIN, model, owner..."
            className="bg-transparent text-white outline-none text-sm w-full"
          />
        </div>

        <select className="bg-slate-700 text-white px-3 py-2 rounded-lg text-sm">
          <option>All Status</option>
          <option>Healthy</option>
          <option>Warning</option>
          <option>Critical</option>
        </select>

        <select className="bg-slate-700 text-white px-3 py-2 rounded-lg text-sm">
          <option>All Scores</option>
          <option>80+</option>
          <option>60+</option>
        </select>

        <button className="bg-white text-slate-800 px-4 py-2 rounded-lg text-sm">
          Clear
        </button>

      </div>

      {/* Info */}
      <p className="text-sm text-slate-500">
        Showing {vehicles.length} vehicles
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {vehicles.map((v, i) => (
          <VehicleCard key={i} data={v} />
        ))}

      </div>

    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function TopCard({ title, value, icon }) {
  return (
    <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-xl p-4 flex justify-between items-center shadow">

      <div>
        <p className="text-sm opacity-80">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>

      {icon}

    </div>
  );
}

function VehicleCard({ data }) {
  const statusColor = {
    Healthy: "text-green-400",
    Warning: "text-yellow-400",
    Critical: "text-red-400",
    Service: "text-purple-400",
  };

  return (
    <div className="bg-slate-700 text-white rounded-2xl p-4 shadow-lg">

      {/* Header */}
      <div className="flex justify-between items-start">

        <div className="flex gap-3 items-center">

          <div className="h-10 w-10 bg-slate-900 rounded-lg flex items-center justify-center">
            <Car size={18} className="text-indigo-400" />
          </div>

          <div>
            <h3 className="font-semibold">{data.name}</h3>

            <p className="text-xs text-gray-400">
              {data.vin}
            </p>
          </div>

        </div>

        <span
          className={`text-xs font-medium ${statusColor[data.status]}`}
        >
          {data.status}
        </span>

      </div>

      {/* Score */}
      <div className="mt-4">

        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-400">Health Score</span>
          <span>{data.score}%</span>
        </div>

        <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500"
            style={{ width: `${data.score}%` }}
          />
        </div>

      </div>

      {/* Info */}
      <div className="mt-4 space-y-2 text-xs text-gray-300">

        <Info icon={<Gauge size={14} />} text={`${data.miles} mi`} />
        <Info icon={<Calendar size={14} />} text={data.year} />
        <Info icon={<MapPin size={14} />} text={data.city} />

      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-slate-600 flex justify-between text-xs">

        <span className="text-gray-400">Next Service</span>
        <span>{data.next}</span>

      </div>
    </div>
  );
}

function Info({ icon, text }) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      {text}
    </div>
  );
}
