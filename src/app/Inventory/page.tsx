"use client";
import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  ArrowUpDown,
  Plus,
  Truck,
  Brain,
  Package,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

export default function Inventory() {
  /* ---------------- DATA ---------------- */

  const [items, setItems] = useState([
    {
      id: 1,
      name: "Brake Pads (Premium)",
      sku: "BP-001",
      category: "Brakes",
      stock: 24,
      max: 50,
      demand: 12,
      price: 89.99,
    },
    {
      id: 2,
      name: "Oil Filters (Standard)",
      sku: "OF-001",
      category: "Filters",
      stock: 45,
      max: 100,
      demand: 18,
      price: 12.99,
    },
    {
      id: 3,
      name: "12V Car Battery",
      sku: "BAT-001",
      category: "Electrical",
      stock: 8,
      max: 30,
      demand: 10,
      price: 149.99,
    },
    {
      id: 4,
      name: "Transmission Fluid (ATF)",
      sku: "TF-001",
      category: "Fluids",
      stock: 12,
      max: 40,
      demand: 6,
      price: 34.99,
    },
    {
      id: 5,
      name: "Spark Plugs (Iridium)",
      sku: "SP-001",
      category: "Engine",
      stock: 5,
      max: 60,
      demand: 15,
      price: 18.99,
    },
    {
      id: 6,
      name: "Air Filters",
      sku: "AF-001",
      category: "Filters",
      stock: 32,
      max: 75,
      demand: 8,
      price: 24.99,
    },
    {
      id: 7,
      name: "Wiper Blades (Pair)",
      sku: "WB-001",
      category: "Accessories",
      stock: 18,
      max: 50,
      demand: 7,
      price: 29.99,
    },
    {
      id: 8,
      name: "Coolant (1 Gallon)",
      sku: "CL-001",
      category: "Fluids",
      stock: 25,
      max: 40,
      demand: 5,
      price: 19.99,
    },
  ]);

  /* ---------------- STATES ---------------- */

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("none");

  /* ---------------- HELPERS ---------------- */

  const getStatus = (item) => {
    const percent = (item.stock / item.max) * 100;

    if (percent <= 15) return "critical";
    if (percent <= 40) return "low";
    return "in";
  };

  const handleReorder = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, stock: item.stock + Math.floor(item.max / 2) }
          : item
      )
    );
  };

  /* ---------------- FILTER + SORT ---------------- */

  const filteredItems = useMemo(() => {
    let data = [...items];

    /* Search */
    if (search) {
      data = data.filter(
        (i) =>
          i.name.toLowerCase().includes(search.toLowerCase()) ||
          i.sku.toLowerCase().includes(search.toLowerCase())
      );
    }

    /* Filter */
    if (filter !== "all") {
      data = data.filter((i) => getStatus(i) === filter);
    }

    /* Sort */
    if (sort === "name") {
      data.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sort === "stock") {
      data.sort((a, b) => b.stock - a.stock);
    }

    if (sort === "price") {
      data.sort((a, b) => b.price - a.price);
    }

    return data;
  }, [items, search, filter, sort]);

  /* ---------------- STATS ---------------- */

  const totalValue = items.reduce(
    (sum, i) => sum + i.stock * i.price,
    0
  );

  const lowStockCount = items.filter(
    (i) => getStatus(i) !== "in"
  ).length;

  const efficiency = Math.round(
    (items.filter((i) => getStatus(i) === "in").length /
      items.length) *
      100
  );

  /* ---------------- UI ---------------- */

  return (
    <div className="p-6 bg-slate-50 min-h-screen">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Parts Inventory</h1>
          <p className="text-gray-500">
            AI-powered inventory management
          </p>
        </div>

        <div className="flex gap-3">
          <button className="btn-secondary">
            <Truck size={18} /> Order Parts
          </button>

          <button className="btn-primary">
            <Plus size={18} /> Add Item
          </button>
        </div>
      </div>

      {/* DASHBOARD CARDS */}

      <div className="grid md:grid-cols-4 gap-5 mb-8">

        <StatCard
          icon={<Package />}
          title="Product Types"
          value={items.length}
          color="blue"
        />

        <StatCard
          icon={<AlertCircle />}
          title="Low Stock"
          value={lowStockCount}
          color="red"
        />

        <StatCard
          icon={<CheckCircle />}
          title="Total Value"
          value={`$${totalValue.toFixed(0)}`}
          color="green"
        />

        <StatCard
          icon={<Brain />}
          title="Efficiency"
          value={`${efficiency}%`}
          color="purple"
        />
      </div>

      {/* CONTROLS */}

      <div className="flex flex-wrap gap-4 mb-5">

        <div className="relative flex-1 min-w-[250px]">
          <Search className="absolute left-3 top-3 text-gray-400" />

          <input
            type="text"
            placeholder="Search by name or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 input"
          />
        </div>

        <select
          onChange={(e) => setFilter(e.target.value)}
          className="input"
        >
          <option value="all">All</option>
          <option value="in">In Stock</option>
          <option value="low">Low Stock</option>
          <option value="critical">Critical</option>
        </select>

        <select
          onChange={(e) => setSort(e.target.value)}
          className="input"
        >
          <option value="none">Sort</option>
          <option value="name">Name</option>
          <option value="stock">Stock</option>
          <option value="price">Price</option>
        </select>
      </div>

      {/* TABLE */}

      <div className="bg-white rounded-xl shadow">

        <table className="w-full text-sm">

          <thead className="bg-slate-100 text-gray-600">
            <tr>
              {[
                "Product",
                "SKU",
                "Category",
                "Stock",
                "AI Demand",
                "Price",
                "Status",
                "Action",
              ].map((h) => (
                <th
                  key={h}
                  className="text-left px-4 py-3"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>

            {filteredItems.map((item) => {
              const status = getStatus(item);
              const percent =
                (item.stock / item.max) * 100;

              return (
                <tr
                  key={item.id}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="px-4 py-3 font-medium">
                    {item.name}
                  </td>

                  <td className="px-4 py-3">
                    {item.sku}
                  </td>

                  <td className="px-4 py-3">
                    <span className="badge">
                      {item.category}
                    </span>
                  </td>

                  <td className="px-4 py-3">

                    <p className="mb-1 text-xs">
                      {item.stock}/{item.max}
                    </p>

                    <div className="h-2 bg-gray-200 rounded">

                      <div
                        className={`h-full rounded ${
                          percent > 40
                            ? "bg-green-500"
                            : percent > 15
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{
                          width: `${percent}%`,
                        }}
                      ></div>

                    </div>
                  </td>

                  <td className="px-4 py-3 flex gap-1 items-center text-purple-600">
                    <Brain size={14} />
                    {item.demand}/week
                  </td>

                  <td className="px-4 py-3 font-semibold">
                    ${item.price}
                  </td>

                  <td className="px-4 py-3">
                    <StatusBadge status={status} />
                  </td>

                  <td className="px-4 py-3">

                    {status !== "in" && (
                      <button
                        onClick={() =>
                          handleReorder(item.id)
                        }
                        className="btn-primary-sm"
                      >
                        Reorder
                      </button>
                    )}

                  </td>
                </tr>
              );
            })}

          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

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

function StatusBadge({ status }) {
  const styles = {
    in: "bg-green-100 text-green-700",
    low: "bg-yellow-100 text-yellow-700",
    critical: "bg-red-100 text-red-700",
  };

  const labels = {
    in: "In Stock",
    low: "Low Stock",
    critical: "Critical",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
