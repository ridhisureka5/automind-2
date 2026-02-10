import {
  Shield,
  AlertTriangle,
  Zap,
  Eye,
  Lock,
} from "lucide-react";

export default function AgentGovernancePage() {
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

          <div className="flex items-end justify-between h-48 gap-3 mt-6">
            {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d,i)=>(
              <div key={i} className="flex flex-col items-center gap-2 w-full">
                <div
                  className="w-full bg-emerald-500 rounded-lg"
                  style={{ height: `${70 + i * 4}%` }}
                />
                <span className="text-xs text-slate-500">{d}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Radar Placeholder */}
        <div className="bg-white rounded-xl shadow p-6 flex items-center justify-center">
          <h3 className="text-slate-400 font-medium">
            Radar Chart Placeholder
          </h3>
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

      {/* Logs */}
      <div className="bg-white rounded-xl shadow p-6 space-y-4">

        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">
            Anomaly Detection Logs
          </h3>

          <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs">
            Live Feed
          </span>
        </div>

        <Log
          type="high"
          title="Unusual access pattern"
          agent="Alert Processor"
          time="14:32:05"
          ip="192.168.1.45"
        />

        <Log
          type="medium"
          title="Rate limit exceeded"
          agent="Data Aggregator"
          time="13:18:22"
          ip="192.168.1.89"
        />

        <Log
          type="medium"
          title="Failed authentication"
          agent="Diagnostic Assistant"
          time="12:45:11"
          ip="192.168.1.23"
        />

        <Log
          type="high"
          title="Suspicious query pattern"
          agent="Alert Processor"
          time="11:22:45"
          ip="192.168.1.45"
        />

        <Log
          type="low"
          title="Resource spike"
          agent="Predictive Engine"
          time="10:05:33"
          ip="192.168.1.12"
        />

      </div>

    </main>
  );
}

/* Components */

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
          <span className="h-2 w-2 rounded-full bg-green-500" />
          {status}
        </span>
      </td>

      <td className="flex gap-3 pt-3">
        <Eye size={18} />
        <Lock size={18} />
      </td>

    </tr>
  );
}

function Log({ type, title, agent, time, ip }) {
  const colors = {
    high: "bg-red-50 border-red-200 text-red-600",
    medium: "bg-yellow-50 border-yellow-200 text-yellow-600",
    low: "bg-green-50 border-green-200 text-green-600",
  };

  return (
    <div
      className={`border rounded-xl p-4 flex justify-between ${colors[type]}`}
    >

      <div>
        <p className="font-medium text-slate-900">
          {title}
        </p>

        <p className="text-xs text-slate-500">
          Agent: {agent} • {time} • IP: {ip}
        </p>
      </div>

      <span className="px-3 py-1 rounded-full text-xs capitalize bg-white">
        {type}
      </span>

    </div>
  );
}
