"use client";

import { useEffect, useState } from "react";

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

/* ================= PAGE ================= */

export default function VehiclesPage() {

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);


  /* ================= FETCH ML DATA ================= */

  useEffect(() => {

    fetch("http://localhost:8000/vehicle-health")
      .then((res) => res.json())
      .then((data) => {

        // Map backend → UI format
        const formatted = data.vehicles.map((v) => ({
          name: v.name,
          vin: v.vin,
          status: v.status,
          score: v.health,
          miles: v.mileage || "N/A",
          year: v.year,
          city: v.city,
          next: v.next_service,
        }));

        setVehicles(formatted);
        setLoading(false);

      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });

  }, []);


  /* ================= STATS ================= */

  const total = vehicles.length;

  const healthy = vehicles.filter(v => v.status === "Healthy").length;
  const warning = vehicles.filter(v => v.status === "Warning").length;
  const critical = vehicles.filter(v => v.status === "Critical").length;


  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading ML Predictions...
      </div>
    );
  }


  /* ================= UI ================= */

  return (
    <div className="w-full p-6 bg-slate-50 space-y-6">

      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Vehicle Monitoring
        </h1>

        <p className="text-slate-500 text-sm">
          AI-powered vehicle health tracking
        </p>
      </div>


      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <TopCard title="Total Vehicles" value={total} icon={<Car />} />
        <TopCard title="Healthy" value={healthy} icon={<CheckCircle />} />
        <TopCard title="Warning" value={warning} icon={<AlertTriangle />} />
        <TopCard title="Critical" value={critical} icon={<Activity />} />

      </div>


      {/* Search Bar */}
      <div className="bg-slate-800 rounded-xl p-4 flex gap-4 items-center">

        <div className="flex items-center gap-2 bg-slate-700 px-4 py-2 rounded-lg flex-1">

          <Search size={16} className="text-gray-400" />

          <input
            placeholder="Search by VIN, model, city..."
            className="bg-transparent text-white outline-none text-sm w-full"
          />

        </div>

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


/* ================= COMPONENTS ================= */

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


/* ================= VEHICLE CARD ================= */

function VehicleCard({ data }) {

  const statusColor = {
    Healthy: "text-green-400",
    Warning: "text-yellow-400",
    Critical: "text-red-400",
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

            <h3 className="font-semibold">
              {data.name}
            </h3>

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

        <Info icon={<Gauge size={14} />} text={`${data.miles}`} />
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
