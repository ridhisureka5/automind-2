import "../../globals.css";

import {
  Activity,
  Factory,
  MessageSquare,
  FileText,
  Bell,
  Search,
  Shield,
} from "lucide-react";

import Link from "next/link";

export const metadata = {
  title: "AutoMind | OEM Dashboard",
  description: "OEM Administration Panel",
};

export default function OEMLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50">

        <div className="min-h-screen flex">

          {/* ================= SIDEBAR ================= */}
          <aside className="w-64 bg-white border-r px-4 py-6 flex flex-col">

            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">

              <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <Shield size={20} />
              </div>

              <div>
                <h2 className="font-bold">AutoMind</h2>
                <p className="text-xs text-gray-500">OEM Admin</p>
              </div>

            </div>

            {/* ============== MENU ============== */}
            <nav className="space-y-2 flex-1">

              {/* Dashboard */}
              <MenuItem
                href="/oem/agent-governance"
                icon={<Activity size={18} />}
                text="Dashboard"
              />

              {/* Manufacturing */}
              <MenuItem 
                href="/oem/agent-governance/manufacturing"
                icon={<Factory size={18} />}
                text="Manufacturing"
              />

              {/* Feedback */}
              <MenuItem
                href="/oem/agent-governance/feedback"
                icon={<MessageSquare size={18} />}
                text="Feedback"
              />

              {/* Reports */}
              <MenuItem
                href="/oem/agent-governance/reports"
                icon={<FileText size={18} />}
                text="Reports"
              />
              <MenuItem
                href="/oem/agent-governance/registerations"
                icon={<FileText size={18} />}
                text="Registrations"
              />

            </nav>

            {/* ============== STATUS ============== */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm">

              <p className="font-medium">OEM System</p>

              <p className="text-green-600 mt-1">
                ● Connected to Fleet Network
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
                  placeholder="Search analytics, reports..."
                  className="bg-transparent outline-none text-sm w-full"
                />

              </div>

              <div className="flex items-center gap-4">

                <Bell size={20} />

                <div className="h-8 w-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">
                  OA
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
                 text-gray-600 hover:bg-slate-100 hover:text-blue-600 transition"
    >
      {icon}
      {text}
    </Link>
  );
}
