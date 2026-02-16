"use client";

import { useEffect, useState } from "react";
import {
  Clock,
  User,
  Wrench,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import { db } from "../../../lib/firebase";
import {
  collection,
  onSnapshot,
  query,
  where,
  Timestamp,
  updateDoc,
  doc,
  orderBy,
} from "firebase/firestore";

export default function ServiceSchedule() {
  const [appointments, setAppointments] = useState([]);

  const TOTAL_SLOTS = 8;

  useEffect(() => {
    // Start from beginning of today (safer than Timestamp.now())
    const today = new Date();
    today.setHours(0, 0, 0, 0);

  const q = query(
  collection(db, "service_bookings"),
  where("date", ">=", Timestamp.fromDate(today)),
  orderBy("date", "asc")
);




    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));

      setAppointments(data);
    });

    return () => unsubscribe();
  }, []);

  const bookedSlots = appointments.length;
  const availableSlots = TOTAL_SLOTS - bookedSlots;

  return (
    <div className="w-full p-6 bg-slate-50 space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">
        Service Schedule
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Appointments */}
        <div className="lg:col-span-2 space-y-4">

          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-slate-800">
              Upcoming Booked Services
            </h2>

            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
              {bookedSlots} Booked
            </span>
          </div>

          {appointments.length === 0 && (
            <div className="bg-white p-6 rounded-xl shadow text-slate-500">
              No upcoming bookings found.
            </div>
          )}

          {appointments.map((a) => (
            <AppointmentCard key={a.id} data={a} />
          ))}

        </div>

        {/* Slot Overview */}
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="font-semibold mb-4">
            Slot Overview
          </h3>

          <SummaryItem
            text="Available Slots"
            value={availableSlots}
            color="green"
          />

          <SummaryItem
            text="Booked Slots"
            value={bookedSlots}
            color="yellow"
          />
        </div>

      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function AppointmentCard({ data }) {

  const handleComplete = async () => {
    try {
      await updateDoc(
        doc(db, "service_bookings", data.id),
        { status: "completed" }
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const isCompleted = data.status === "completed";

  return (
    <div className="bg-white rounded-xl shadow p-5 flex justify-between items-center">

      <div className="flex gap-4">

        <div className="h-12 w-12 bg-yellow-400 rounded-xl flex items-center justify-center">
          <Clock />
        </div>

        <div>
          <h3 className="font-semibold text-lg">
            {data.time}
          </h3>

          <p className="text-slate-500 text-sm">
            {data.serviceType}
          </p>

          <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">

            <span className="flex items-center gap-1">
              <User size={14} />
              {data.userId}
            </span>

            <span className="flex items-center gap-1">
              <Wrench size={14} />
              {data.vehicleName || data.carId}
            </span>

          </div>
        </div>
      </div>

      {/* Status Button */}
      <button
        onClick={!isCompleted ? handleComplete : undefined}
        className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm text-white 
          ${isCompleted ? "bg-green-600 cursor-default" : "bg-red-600 hover:bg-red-700"}
        `}
      >
        <CheckCircle size={16} />
        {isCompleted ? "Completed" : "Mark Completed"}
      </button>

    </div>
  );
}


function SummaryItem({ text, value, color }) {
  const colors = {
    green: "bg-green-50 text-green-600",
    yellow: "bg-yellow-50 text-yellow-600",
  };

  return (
    <div
      className={`flex justify-between items-center p-3 rounded-lg mb-2 ${colors[color]}`}
    >
      <span className="flex items-center gap-2">
        <AlertCircle size={16} />
        {text}
      </span>

      <span className="font-bold">{value}</span>
    </div>
  );
}
