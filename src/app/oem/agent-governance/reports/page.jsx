"use client";

import React from "react";
import {
  FileText,
  Download,
  Calendar,
  Clock,
  Filter,
  FileSpreadsheet,
  File,
} from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="p-6 bg-slate-50 min-h-screen">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-800">
          Reports & Export
        </h1>
        <p className="text-slate-500 text-sm">
          Generate and download comprehensive reports
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

        <StatCard
          title="Reports Generated"
          value="1,247"
          sub="+85 this month"
          icon={<FileText size={22} />}
          color="bg-blue-500"
        />

        <StatCard
          title="Downloads"
          value="3,456"
          sub="+12% total"
          icon={<Download size={22} />}
          color="bg-indigo-500"
        />

        <StatCard
          title="Scheduled Reports"
          value="24"
          sub="active"
          icon={<Calendar size={22} />}
          color="bg-emerald-500"
        />

        <StatCard
          title="Avg Generation Time"
          value="12s"
          sub="-3s improved"
          icon={<Clock size={22} />}
          color="bg-orange-500"
        />

      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">

        <div>
          <p className="text-sm text-slate-600 mb-1">From</p>
          <input
            type="date"
            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <p className="text-sm text-slate-600 mb-1">To</p>
          <input
            type="date"
            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <p className="text-sm text-slate-600 mb-1">Report Type</p>

          <select className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
            <option>All Types</option>
            <option>Fleet</option>
            <option>Alerts</option>
            <option>Manufacturing</option>
            <option>Service</option>
          </select>
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition">
          <Filter size={18} />
          Apply Filters
        </button>

      </div>

      {/* Available Reports */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">

        <h2 className="text-lg font-semibold text-slate-800 mb-5">
          Available Reports
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <ReportCard
            title="Fleet Health Summary"
            desc="Comprehensive overview of all vehicle health metrics"
            time="2024-01-15 09:30"
          />

          <ReportCard
            title="Alert Analysis Report"
            desc="Detailed breakdown of alerts and resolution time"
            time="2024-01-15 08:15"
          />

          <ReportCard
            title="Service Center Performance"
            desc="Capacity utilization and efficiency analysis"
            time="2024-01-14 17:45"
          />

          <ReportCard
            title="Manufacturing Quality Report"
            desc="Defect trends and supplier performance"
            time="2024-01-14 14:20"
          />

        </div>

      </div>

      {/* Historical Reports */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">

        <div className="flex justify-between items-center mb-4">

          <h2 className="text-lg font-semibold text-slate-800">
            Historical Reports
          </h2>

          <span className="bg-slate-200 px-3 py-1 rounded-full text-xs text-slate-600">
            5 files
          </span>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead>
              <tr className="border-b text-slate-500 text-left">
                <th className="py-3">Report Name</th>
                <th>Date</th>
                <th>Size</th>
                <th>Type</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              <HistoryRow
                name="Monthly Fleet Report - December 2023"
                date="2024-01-01"
                size="2.4 MB"
                type="PDF"
              />

              <HistoryRow
                name="Q4 2023 Performance Summary"
                date="2023-12-31"
                size="5.8 MB"
                type="EXCEL"
              />

              <HistoryRow
                name="Annual Maintenance Analysis 2023"
                date="2023-12-28"
                size="12.3 MB"
                type="PDF"
              />

              <HistoryRow
                name="November Service Center Report"
                date="2023-12-01"
                size="1.8 MB"
                type="PDF"
              />

              <HistoryRow
                name="Q3 2023 Alert Trends"
                date="2023-10-01"
                size="3.2 MB"
                type="EXCEL"
              />

            </tbody>

          </table>

        </div>
      </div>

      {/* Quick Export */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">

        <div className="flex items-center gap-3">

          <div className="bg-blue-100 p-3 rounded-lg">
            <Download className="text-blue-600" />
          </div>

          <div>
            <h3 className="font-semibold text-slate-800">
              Quick Export
            </h3>
            <p className="text-sm text-slate-500">
              Generate report with current data
            </p>
          </div>

        </div>

        <div className="flex gap-3">

          <button className="border px-4 py-2 rounded-lg text-blue-600 hover:bg-blue-50 transition">
            Export PDF
          </button>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Export Excel
          </button>

        </div>

      </div>

    </div>
  );
}

/* ---------------- Components ---------------- */

function StatCard({ title, value, sub, icon, color }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 flex justify-between items-center">

      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <h3 className="text-2xl font-semibold text-slate-800 mt-1">
          {value}
        </h3>
        <p className="text-xs text-emerald-600 mt-1">{sub}</p>
      </div>

      <div className={`${color} p-3 rounded-lg text-white`}>
        {icon}
      </div>

    </div>
  );
}

function ReportCard({ title, desc, time }) {
  return (
    <div className="bg-slate-100 rounded-xl p-5">

      <div className="flex gap-3 items-start mb-3">

        <div className="bg-blue-100 p-2 rounded-lg">
          <FileText className="text-blue-600" size={20} />
        </div>

        <div>
          <h3 className="font-semibold text-slate-800">
            {title}
          </h3>

          <p className="text-sm text-slate-600">
            {desc}
          </p>

          <p className="text-xs text-slate-400 mt-1">
            Last: {time}
          </p>
        </div>

      </div>

      <div className="flex gap-3 mt-4">

        <button className="flex-1 border rounded-lg py-2 text-sm text-red-500 hover:bg-red-50 transition">
          <File size={16} className="inline mr-1" />
          PDF
        </button>

        <button className="flex-1 border rounded-lg py-2 text-sm text-emerald-600 hover:bg-emerald-50 transition">
          <FileSpreadsheet size={16} className="inline mr-1" />
          Excel
        </button>

      </div>

    </div>
  );
}

function HistoryRow({ name, date, size, type }) {
  return (
    <tr className="border-b hover:bg-slate-50 transition">

      <td className="py-3 font-medium text-slate-700">
        {name}
      </td>

      <td className="text-slate-500">{date}</td>

      <td className="text-slate-500">{size}</td>

      <td>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium
          ${
            type === "PDF"
              ? "bg-red-100 text-red-600"
              : "bg-emerald-100 text-emerald-600"
          }`}
        >
          {type}
        </span>
      </td>

      <td>
        <button className="text-blue-600 hover:underline flex items-center gap-1">
          <Download size={14} />
          Download
        </button>
      </td>

    </tr>
  );
}
