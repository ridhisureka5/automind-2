"use client";

import {
  Car,
  Wrench,
  Activity,
  AlertTriangle,
  Users,
  Zap,
} from "lucide-react";

import Charts from "./components/Charts";

export default function Home() {
  return (
    // ❌ Removed min-h-screen & extra container
    <div className="w-full">

      {/* Main Content Only */}
      <main className="p-6 space-y-6">

        {/* Page Header */}
        <div className="flex justify-between items-center">

          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Dashboard Overview
            </h1>

            <p className="text-slate-500 text-sm">
              Real-time predictive maintenance insights
            </p>
          </div>

          <div className="bg-white border rounded-lg px-4 py-2 text-sm flex items-center gap-2">

            <span className="h-2 w-2 bg-green-500 rounded-full" />

            Last updated: 3:08:55 PM

          </div>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          <StatCard
            title="Total Vehicles"
            value="8"
            change="+12"
            icon={<Car />}
          />

          <StatCard
            title="Active Alerts"
            value="4"
            change="-8%"
            icon={<AlertTriangle />}
          />

          <StatCard
            title="Upcoming Services"
            value="4"
            change="+5"
            icon={<Wrench />}
          />

          <StatCard
            title="Fleet Health"
            value="82%"
            change="+2.3%"
            icon={<Activity />}
          />

        </div>

        {/* Charts */}
        <Charts />

        {/* Alerts + Services */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <Card title="Active Alerts" badge="4 Active">

            <AlertItem
              title="Transmission Fluid"
              desc="Transmission fluid level low."
              level="medium"
              color="yellow"
            />

            <AlertItem
              title="Air Filter"
              desc="Replacement due."
              level="low"
              color="blue"
            />

            <AlertItem
              title="Brake Pads"
              desc="Replacement recommended."
              level="high"
              color="orange"
            />

            <AlertItem
              title="Engine Cooling"
              desc="Overheating detected."
              level="critical"
              color="red"
            />

          </Card>

          <Card title="Upcoming Services" badge="4 Scheduled">

            <ServiceItem
              vin="1HGBH41JXMN109186"
              city="Rajouri"
              tag="routine"
            />

            <ServiceItem
              vin="2FMDK3GCXABA12345"
              city="Shalimar Bagh"
              tag="routine"
            />

            <ServiceItem
              vin="3GKALMEV5AL123456"
              city="New Delhi"
              tag="repair"
            />

            <ServiceItem
              vin="1C4RJFBG0LC123456"
              city="Tilak Nagar"
              tag="recall"
            />

          </Card>

        </div>

        {/* Footer Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <MiniStat
            title="Healthy Vehicles"
            value="4"
            icon={<Activity />}
          />

          <MiniStat
            title="Critical Status"
            value="1"
            icon={<AlertTriangle />}
          />

          <MiniStat
            title="Active Customers"
            value="1,247"
            icon={<Users />}
          />

          <MiniStat
            title="System Uptime"
            value="99.2%"
            icon={<Zap />}
          />

        </div>

      </main>
    </div>
  );
}

/* ---------------- Components ---------------- */

function Card({ title, badge, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">

      <div className="flex justify-between items-center mb-4">

        <h3 className="font-semibold text-slate-800">
          {title}
        </h3>

        {badge && (
          <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
            {badge}
          </span>
        )}

      </div>

      {children}

    </div>
  );
}

function StatCard({ title, value, change, icon }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 flex justify-between">

      <div>

        <p className="text-slate-500 text-sm">{title}</p>

        <h3 className="text-2xl font-bold mt-1 text-slate-800">
          {value}
        </h3>

        <p className="text-emerald-500 text-xs mt-1">
          ↗ {change}
        </p>

      </div>

      <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
        {icon}
      </div>

    </div>
  );
}

function AlertItem({ title, desc, level, color }) {
  const colors = {
    yellow: "bg-yellow-50 border-yellow-200",
    blue: "bg-blue-50 border-blue-200",
    orange: "bg-orange-50 border-orange-200",
    red: "bg-red-50 border-red-200",
  };

  return (
    <div className={`border rounded-xl p-3 mb-3 ${colors[color]}`}>
      <div className="flex justify-between">

        <p className="font-medium text-slate-800">
          {title}
        </p>

        <span className="text-xs capitalize text-slate-600">
          {level}
        </span>

      </div>

      <p className="text-xs text-slate-500 mt-1">
        {desc}
      </p>
    </div>
  );
}

function ServiceItem({ vin, city, tag }) {
  return (
    <div className="border rounded-xl p-3 mb-3">

      <div className="flex justify-between">

        <p className="font-medium text-sm text-slate-800">
          VIN: {vin}
        </p>

        <span className="text-xs bg-blue-100 text-blue-600 px-2 rounded">
          {tag}
        </span>

      </div>

      <p className="text-xs text-slate-500 mt-1">
        {city}
      </p>
    </div>
  );
}

function MiniStat({ title, value, icon }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-3">

      <div className="h-10 w-10 bg-slate-100 rounded-lg flex items-center justify-center text-blue-600">
        {icon}
      </div>

      <div>

        <p className="text-xs text-slate-500">{title}</p>

        <h3 className="font-bold text-slate-800">
          {value}
        </h3>

      </div>

    </div>
  );
}
