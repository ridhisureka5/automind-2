"use client";
import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  AlertTriangle,
  Clock,
  CheckCircle,
  Factory,
  Brain,
  Send,
  X,
} from "lucide-react";

export default function RcaCapa() {
  /* ---------------- DATA ---------------- */

  const [cases, setCases] = useState([
    {
      id: 1,
      component: "12V Lead-Acid Battery",
      vehicles: 1890,
      failures: 2340,
      status: "investigating",
      root: "Supplier quality variance in lead plate composition causing premature degradation under high-temperature conditions",
      corrective:
        "Switch to alternative supplier with better QC; implement incoming inspection protocol",
      preventive:
        "Add thermal management system; update BMS software for better charge cycling",
      models: ["Model A 2022", "Model B 2023", "Model C 2022"],
      years: "2022-2023",
    },
    {
      id: 2,
      component: "Transmission Control Module",
      vehicles: 756,
      failures: 890,
      status: "identified",
      root: "Software bug causing erratic shifting patterns; TCM firmware v2.3.1 affected",
      corrective:
        "Release firmware update 2.4.0; initiate recall for affected vehicles",
      preventive:
        "Enhance pre-release testing; implement OTA monitoring",
      models: ["Model D 2023"],
      years: "2023",
    },
    {
      id: 3,
      component: "Front Brake Pads",
      vehicles: 1234,
      failures: 1560,
      status: "sent",
      root: "Friction compound showing higher than expected wear in urban conditions",
      corrective:
        "Reformulate compound with enhanced heat resistance; update wear sensors",
      preventive:
        "Improve driver coaching; optimize regenerative braking",
      models: ["Model A 2021", "Model A 2022"],
      years: "2021-2022",
    },
  ]);

  /* ---------------- STATE ---------------- */

  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");
  const [selected, setSelected] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  /* ---------------- FILTER ---------------- */

  const filtered = useMemo(() => {
    let data = [...cases];

    if (search) {
      data = data.filter(
        (c) =>
          c.component
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          c.root.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (tab !== "all") {
      data = data.filter((c) => c.status === tab);
    }

    return data;
  }, [cases, search, tab]);

  /* ---------------- ACTIONS ---------------- */

  const sendToMfg = (id) => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: "sent" }
          : c
      )
    );
  };

  const generateAI = () => {
    setAiLoading(true);

    setTimeout(() => {
      alert("AI Analysis Generated Successfully!");
      setAiLoading(false);
    }, 2000);
  };

  /* ---------------- STATS ---------------- */

  const count = (s) =>
    cases.filter((c) => c.status === s).length;

  /* ---------------- UI ---------------- */

  return (
    <div className="p-6 bg-slate-50 min-h-screen">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-3xl font-bold">
            RCA/CAPA Insights
          </h1>

          <p className="text-gray-500">
            Root Cause Analysis & Corrective/Preventive Actions
          </p>
        </div>

        <button
          onClick={generateAI}
          disabled={aiLoading}
          className="btn-primary"
        >
          <Brain size={18} />
          {aiLoading ? "Analyzing..." : "Generate AI Analysis"}
        </button>

      </div>

      {/* STATS */}

      <div className="grid md:grid-cols-4 gap-5 mb-7">

        <StatCard
          icon={<AlertTriangle />}
          title="Identified"
          value={count("identified")}
          color="red"
        />

        <StatCard
          icon={<Clock />}
          title="Investigating"
          value={count("investigating")}
          color="yellow"
        />

        <StatCard
          icon={<CheckCircle />}
          title="Resolved"
          value={count("resolved")}
          color="green"
        />

        <StatCard
          icon={<Factory />}
          title="Sent to MFG"
          value={count("sent")}
          color="purple"
        />

      </div>

      {/* SEARCH + FILTER */}

      <div className="flex gap-4 mb-5">

        <div className="relative flex-1">

          <Search className="absolute left-3 top-3 text-gray-400" />

          <input
            className="input w-full pl-10"
            placeholder="Search by component or root cause..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button className="btn-secondary">
          <Filter size={18} /> Filters
        </button>

      </div>

      {/* TABS */}

      <div className="flex gap-2 mb-6">

        {[
          ["all", "All"],
          ["identified", "Identified"],
          ["investigating", "Investigating"],
          ["resolved", "Resolved"],
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              tab === key
                ? "bg-yellow-400"
                : "bg-white border"
            }`}
          >
            {label}
          </button>
        ))}

      </div>

      {/* CASES */}

      <div className="space-y-6">

        {filtered.map((item) => (
          <CaseCard
            key={item.id}
            item={item}
            onView={() => setSelected(item)}
            onSend={() => sendToMfg(item.id)}
          />
        ))}

      </div>

      {/* DETAILS MODAL */}

      {selected && (
        <DetailsModal
          item={selected}
          onClose={() => setSelected(null)}
        />
      )}

    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function CaseCard({ item, onView, onSend }) {
  const statusStyle = {
    identified: "bg-red-100 text-red-700",
    investigating: "bg-yellow-100 text-yellow-700",
    resolved: "bg-green-100 text-green-700",
    sent: "bg-purple-100 text-purple-700",
  };

  const strip = {
    identified: "bg-red-500",
    investigating: "bg-yellow-500",
    resolved: "bg-green-500",
    sent: "bg-purple-500",
  };

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <div className="flex">

        <div className={`w-2 ${strip[item.status]}`} />

        <div className="p-5 flex-1">

          {/* HEADER */}

          <div className="flex justify-between mb-3">

            <div>
              <h3 className="text-lg font-semibold">
                {item.component}
              </h3>

              <p className="text-sm text-gray-500">
                {item.vehicles} vehicles affected •{" "}
                {item.failures} failures
              </p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs ${statusStyle[item.status]}`}
            >
              {item.status}
            </span>

          </div>

          {/* CONTENT */}

          <div className="grid md:grid-cols-3 gap-4 text-sm mb-4">

            <InfoBlock
              title="Root Cause"
              text={item.root}
            />

            <InfoBlock
              title="Corrective Action"
              text={item.corrective}
            />

            <InfoBlock
              title="Preventive Action"
              text={item.preventive}
            />

          </div>

          {/* MODELS */}

          <div className="flex flex-wrap gap-2 mb-4">

            {item.models.map((m) => (
              <span
                key={m}
                className="badge"
              >
                {m}
              </span>
            ))}

          </div>

          {/* FOOTER */}

          <div className="flex justify-between items-center text-sm">

            <p className="text-gray-500">
              Year Range: {item.years}
            </p>

            <div className="flex gap-3">

              <button
                onClick={onView}
                className="btn-secondary"
              >
                View Details
              </button>

              {item.status !== "sent" && (
                <button
                  onClick={onSend}
                  className="bg-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-600"
                >
                  <Send size={16} />
                  Send to MFG
                </button>
              )}

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

function InfoBlock({ title, text }) {
  return (
    <div>
      <p className="font-medium mb-1">
        {title}
      </p>

      <p className="text-gray-600">
        {text}
      </p>
    </div>
  );
}

function DetailsModal({ item, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl p-6 w-[600px] max-h-[90vh] overflow-y-auto">

        <div className="flex justify-between mb-4">

          <h2 className="text-xl font-bold">
            {item.component}
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <Section title="Root Cause">
          {item.root}
        </Section>

        <Section title="Corrective Action">
          {item.corrective}
        </Section>

        <Section title="Preventive Action">
          {item.preventive}
        </Section>

        <Section title="Affected Models">
          {item.models.join(", ")}
        </Section>

        <Section title="Year Range">
          {item.years}
        </Section>

      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-4">

      <p className="font-medium mb-1">
        {title}
      </p>

      <p className="text-gray-600">
        {children}
      </p>

    </div>
  );
}

function StatCard({ icon, title, value, color }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow flex justify-between items-center">

      <div>
        <p className="text-gray-500 text-sm">
          {title}
        </p>

        <h2 className="text-2xl font-bold">
          {value}
        </h2>
      </div>

      <div
        className={`p-3 rounded-lg bg-${color}-100 text-${color}-600`}
      >
        {icon}
      </div>
    </div>
  );
}
