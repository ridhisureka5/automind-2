"use client";

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  XCircle,
  CheckCircle,
  Clock,
} from "lucide-react";

/* ---------------- DATA ---------------- */

const stats = [
  { title: "Total Defects", value: 4, change: "-15%", color: "orange" },
  { title: "Critical Issues", value: 1, change: "-2", color: "red" },
  { title: "Resolved", value: 1, change: "+23%", color: "green" },
  { title: "Avg Resolution", value: "4.2d", change: "-1.5d", color: "blue" },
];

const defects = [
  { name: "Engine", minor: 12, moderate: 8, major: 4, critical: 1 },
  { name: "Transmission", minor: 8, moderate: 5, major: 2, critical: 0 },
  { name: "Brakes", minor: 15, moderate: 10, major: 6, critical: 2 },
  { name: "Suspension", minor: 6, moderate: 3, major: 1, critical: 0 },
  { name: "Electrical", minor: 20, moderate: 12, major: 5, critical: 1 },
  { name: "HVAC", minor: 10, moderate: 4, major: 2, critical: 0 },
];

/* ---------------- PAGE ---------------- */

export default function Manufacturing() {

  const [forecast,setForecast]=useState([]);
  const [rca,setRca]=useState([]);
  const [suppliers,setSuppliers]=useState([]);
  const [factoryAlert,setFactoryAlert]=useState(null);
  const API = process.env.NEXT_PUBLIC_API;


useEffect(()=>{

  fetch(`${API}/manufacturing/defect-forecast`)
    .then(r=>r.json()).then(d=>setForecast(d.forecast || []));

  fetch(`${API}/manufacturing/rca-analysis`)
    .then(r=>r.json()).then(d=>setRca(d.rca || []));

  fetch(`${API}/manufacturing/supplier-risk`)
    .then(r=>r.json()).then(d=>setSuppliers(d.suppliers || []));

  fetch(`${API}/manufacturing/live-anomaly`)
    .then(r=>r.json()).then(d=>setFactoryAlert(d));

},[]);


  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Manufacturing Insights</h1>
        <p className="text-gray-500 text-sm">
          Defect analysis, RCA/CAPA trends, and supplier performance
        </p>
      </div>

      {/* Factory Alert */}
      {factoryAlert && (
        <div className={`p-3 rounded-xl text-white font-medium ${
          factoryAlert.severity==="HIGH"?"bg-red-500":"bg-green-500"
        }`}>
          Factory Status: {factoryAlert.factory_alert}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (<StatCard key={i} data={s} />))}
      </div>

      {/* Heatmap */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="font-semibold mb-4">Defect Distribution by Component</h3>

        <div className="space-y-4">
          {defects.map((d, i) => (
            <HeatRow key={i} data={d} forecast={forecast}/>
          ))}
        </div>

        <div className="flex gap-6 mt-6 text-sm text-gray-500">
          <Legend color="blue" text="Minor" />
          <Legend color="yellow" text="Moderate" />
          <Legend color="orange" text="Major" />
          <Legend color="red" text="Critical" />
        </div>
      </div>

      {/* RCA */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="font-semibold mb-4">AI Root Cause Analysis</h3>
        {rca.map((r,i)=>(
          <div key={i} className="flex justify-between border-b py-2 text-sm">
            <span>{r.issue}</span>
            <span className="font-medium text-indigo-600">{r.root_cause}</span>
          </div>
        ))}
      </div>

      {/* Supplier Risk */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="font-semibold mb-4">Supplier AI Risk Score</h3>
        {suppliers.map((s,i)=>(
          <div key={i} className="flex justify-between border-b py-2 text-sm">
            <span>{s.supplier}</span>
            <span className={`font-semibold ${
              s.risk_level==="HIGH"?"text-red-600":
              s.risk_level==="MEDIUM"?"text-orange-500":"text-green-600"
            }`}>
              {s.risk_level} ({s.risk_score})
            </span>
          </div>
        ))}
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
        <p className="text-gray-500 text-sm">{data.title}</p>
        <h3 className="text-2xl font-bold">{data.value}</h3>
        <p className="text-green-500 text-xs">{data.change}</p>
      </div>
      <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${colors[data.color]}`}>
        {icons[data.color]}
      </div>
    </div>
  );
}

function HeatRow({ data, forecast }) {
  const total = data.minor + data.moderate + data.major + data.critical || 1;
  const prediction = forecast.find(f=>f.component===data.name)?.failure_probability;

  return (
    <div className="flex items-center gap-4">
      <div className="w-36 text-sm font-medium text-gray-600">{data.name}</div>

      <div className="flex-1 flex h-6 rounded-full overflow-hidden bg-slate-200">
        <Bar color="blue" value={data.minor} total={total}/>
        <Bar color="yellow" value={data.moderate} total={total}/>
        <Bar color="orange" value={data.major} total={total}/>
        <Bar color="red" value={data.critical} total={total}/>
      </div>

      <div className="w-20 text-xs text-gray-500 text-right">
        {total}
        <div className="text-[10px] text-red-500">
          {prediction!==undefined ? `${prediction*100}% risk` : "-"}
        </div>
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

  const width = Math.max((value / total) * 100, 2);

  return <div className={`${colors[color]} h-full`} style={{ width: `${width}%` }}/>;
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
      <span className={`h-3 w-3 rounded-full ${colors[color]}`}/>
      {text}
    </div>
  );
}
