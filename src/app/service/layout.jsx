import "../globals.css";

import {
  Activity,
  Car,
  Wrench,
  MessageSquare,
  FileText,
  Bell,
  Search,
  Users,
  Package,
} from "lucide-react";

import Link from "next/link";

export const metadata = {
  title: "AutoMind | Service Center",
  description: "Service Center Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50">

        <div className="min-h-screen flex">

          {/* ================= SIDEBAR ================= */}
          <aside className="w-64 bg-white border-r px-4 py-6 flex flex-col">

            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">

              <div className="h-10 w-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                <Car size={20} />
              </div>

              <div>
                <h2 className="font-bold">AutoMind</h2>
                <p className="text-xs text-gray-500">Service Center</p>
              </div>

            </div>

            {/* ============== MENU ============== */}
            <nav className="space-y-2 flex-1">

              <MenuItem href="/service" icon={<Activity size={18} />} text="Dashboard" />

              <MenuItem href="/service/vehicles" icon={<Car size={18} />} text="Vehicles" />

              <MenuItem
                href="service-centers"
                icon={<Wrench size={18} />}
                text="Service Centers"
              />

              <MenuItem
                href="/service/feedback"
                icon={<MessageSquare size={18} />}
                text="Feedback"
              />

              <MenuItem
                href="/service/reports"
                icon={<FileText size={18} />}
                text="Reports"
              />

              <MenuItem
                href="/service/service-schedule"
                icon={<FileText size={18} />}
                text="Schedules"
              />

              <MenuItem
                href="/service/technicians"
                icon={<Users size={18} />}
                text="Technicians"
              />

              <MenuItem
                href="/service/inventory"
                icon={<Package size={18} />}
                text="Inventory"
              />

              <MenuItem
                href="/service/rcacapa"
                icon={<FileText size={18} />}
                text="RCA / CAPA"
              />

            </nav>

            {/* ============== STATUS ============== */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-sm">

              <p className="font-medium">System Status</p>

              <p className="text-green-600 mt-1">
                ● All systems operational
              </p>

            </div>

          </aside>

          {/* ================= MAIN ================= */}
          <div className="flex-1 flex flex-col">

            {/* TOP BAR */}
            <header className="bg-white border-b px-6 py-4 flex justify-between">

              <div className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-lg w-96">

                <Search size={18} className="text-gray-400" />

                <input
                  placeholder="Search vehicles, alerts, reports..."
                  className="bg-transparent outline-none text-sm w-full"
                />

              </div>

              <div className="flex items-center gap-4">

                <Bell size={20} />

                <div className="h-8 w-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm">
                  JD
                </div>

              </div>

            </header>

            {/* CONTENT */}
            <main className="flex-1 overflow-auto p-6">
              {children}
            </main>

          </div>

        </div>

      </body>
    </html>
  );
}

/* ================= MENU ITEM ================= */

function MenuItem({ href, icon, text }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm
                 text-gray-600 hover:bg-slate-100 hover:text-indigo-600 transition"
    >
      {icon}
      {text}
    </Link>
  );
}
