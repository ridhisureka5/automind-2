"use client";

import {
  Shield,
  AlertTriangle,
  Zap,
  Eye,
  Lock,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

export default function AgentGovernancePage() {

  // Fleet Trust Trend Data
  const trustTrend = [
    { day: "Mon", score: 82 },
    { day: "Tue", score: 85 },
    { day: "Wed", score: 88 },
    { day: "Thu", score: 90 },
    { day: "Fri", score: 92 },
    { day: "Sat", score: 91 },
    { day: "Sun", score: 94 },
  ];

  // Radar Governance Data
  const radarData = [
    { metric: "Auth Integrity", value: 92 },
    { metric: "Access Control", value: 88 },
    { metric: "Anomaly Detection", value: 84 },
    { metric: "Policy Compliance", value: 90 },
    { metric: "Data Security", value: 95 },
  ];

  return (
    <main className="p-6 space-y-6 bg-slate-50 min-h-screen">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Agent Governance (UEBA)
        </h1>
        <p className="text-slate-500 text-sm">
          User and Entity Behavior Analytics for AI agents
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
          title="Active Agents"
          value="5"
          subtitle="monitoring 24/7"
          icon={<Shield />}
          color="blue"
        />

        <StatCard
          title="Avg Trust Score"
          value="88%"
          subtitle="+3% this week"
          icon={<Shield />}
          color="green"
        />

        <StatCard
          title="Anomalies Detected"
          value="28"
          subtitle="-8 vs yesterday"
          icon={<AlertTriangle />}
          color="orange"
        />

        <StatCard
          title="Actions Today"
          value="8.5K"
          subtitle="+12%"
          icon={<Zap />}
          color="purple"
        />

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Bar Chart */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold mb-4">
            Fleet Trust Score Trend
          </h3>

          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <BarChart data={trustTrend}>
                <XAxis dataKey="day" />
                <YAxis domain={[70, 100]} />
                <Tooltip />
                <Bar
                  dataKey="score"
                  fill="#10b981"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold mb-4">
            Governance Risk Profile
          </h3>

          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis domain={[0, 100]} />
                <Radar
                  dataKey="value"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.6}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Agent Table */}
      <div className="bg-white rounded-xl shadow p-6">

        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">
            Agent Trust Scores
          </h3>

          <input
            placeholder="Search agents..."
            className="border rounded-lg px-3 py-1.5 text-sm"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            <thead>
              <tr className="border-b text-left text-slate-500">
                <th className="pb-2">Agent</th>
                <th>Trust</th>
                <th>Actions</th>
                <th>Anomalies</th>
                <th>Risk</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">

              <AgentRow
                name="Predictive Engine"
                id="AGT-001"
                trust="94%"
                actions="1247"
                anomalies="2"
                risk="low"
                status="active"
              />

              <AgentRow
                name="Diagnostic Assistant"
                id="AGT-002"
                trust="88%"
                actions="856"
                anomalies="5"
                risk="medium"
                status="active"
              />

              <AgentRow
                name="Service Scheduler"
                id="AGT-003"
                trust="96%"
                actions="423"
                anomalies="0"
                risk="low"
                status="active"
              />

              <AgentRow
                name="Alert Processor"
                id="AGT-004"
                trust="72%"
                actions="2341"
                anomalies="12"
                risk="high"
                status="monitoring"
              />

              <AgentRow
                name="Report Generator"
                id="AGT-005"
                trust="91%"
                actions="156"
                anomalies="1"
                risk="low"
                status="active"
              />

            </tbody>
          </table>
        </div>
      </div>

    </main>
  );
}

/* ------------------ Components ------------------ */

function StatCard({ title, value, subtitle, icon, color }) {

  const colors = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    orange: "bg-orange-100 text-orange-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <div className="bg-white rounded-xl shadow p-5 flex justify-between">

      <div>
        <p className="text-slate-500 text-sm">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-xs text-slate-400">{subtitle}</p>
      </div>

      <div
        className={`h-10 w-10 rounded-lg flex items-center justify-center ${colors[color]}`}
      >
        {icon}
      </div>

    </div>
  );
}

function AgentRow({
  name,
  id,
  trust,
  actions,
  anomalies,
  risk,
  status,
}) {

  const riskColor = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  };

  const statusColor =
    status === "active"
      ? "bg-green-500"
      : "bg-yellow-500";

  return (
    <tr className="h-14">

      <td>
        <p className="font-medium">{name}</p>
        <p className="text-xs text-slate-400">{id}</p>
      </td>

      <td>{trust}</td>
      <td>{actions}</td>
      <td>{anomalies}</td>

      <td>
        <span
          className={`px-2 py-1 rounded text-xs ${riskColor[risk]}`}
        >
          {risk}
        </span>
      </td>

      <td>
        <span className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${statusColor}`} />
          {status}
        </span>
      </td>

      <td className="flex gap-3 pt-3">
        <Eye size={18} className="cursor-pointer" />
        <Lock size={18} className="cursor-pointer" />
      </td>

    </tr>
  );
}
