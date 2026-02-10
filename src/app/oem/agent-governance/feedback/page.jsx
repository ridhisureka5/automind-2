"use client";

import React from "react";
import {
  MessageSquare,
  Star,
  ThumbsUp,
  Send,
  ThumbsDown,
  Search,
} from "lucide-react";

export default function FeedbackPage() {
  return (
    <div className="p-6 bg-slate-50 min-h-screen">

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-800">
          Customer Feedback
        </h1>
        <p className="text-slate-500 text-sm">
          Customer satisfaction and sentiment analysis
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

        <StatCard
          title="Total Feedback"
          value="567"
          sub="+24 this week"
          color="bg-blue-500"
          icon={<MessageSquare size={22} />}
        />

        <StatCard
          title="Avg Rating"
          value="4.2"
          sub="+0.3 out of 5"
          color="bg-orange-500"
          icon={<Star size={22} />}
        />

        <StatCard
          title="Positive Sentiment"
          value="73%"
          sub="+5% improvement"
          color="bg-emerald-500"
          icon={<ThumbsUp size={22} />}
        />

        <StatCard
          title="Response Rate"
          value="94%"
          sub="+2% within 24h"
          color="bg-violet-500"
          icon={<Send size={22} />}
        />

      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

        {/* Rating Distribution */}
        <Card title="Rating Distribution">

          <RatingRow star={5} value={245} percent={85} color="bg-emerald-500" />
          <RatingRow star={4} value={189} percent={65} color="bg-blue-500" />
          <RatingRow star={3} value={87} percent={35} color="bg-yellow-400" />
          <RatingRow star={2} value={34} percent={18} color="bg-orange-400" />
          <RatingRow star={1} value={12} percent={8} color="bg-red-500" />

        </Card>

        {/* Sentiment */}
        <Card title="Sentiment Distribution">

          <div className="flex flex-col items-center justify-center h-full">

            <div className="w-44 h-44 rounded-full border-[14px] border-emerald-500 relative mb-4">

              <div className="absolute top-0 right-0 w-1/3 h-full border-r-[14px] border-red-500 rounded-r-full" />

              <div className="absolute bottom-0 left-0 w-full h-1/3 border-b-[14px] border-slate-400 rounded-b-full" />

            </div>

            <div className="flex gap-4 text-sm text-slate-600">

              <span className="flex items-center gap-1">
                <span className="w-3 h-3 bg-emerald-500 rounded-full" />
                Positive
              </span>

              <span className="flex items-center gap-1">
                <span className="w-3 h-3 bg-slate-400 rounded-full" />
                Neutral
              </span>

              <span className="flex items-center gap-1">
                <span className="w-3 h-3 bg-red-500 rounded-full" />
                Negative
              </span>

            </div>
          </div>

        </Card>

        {/* Category */}
        <Card title="By Category">

          <CategoryRow name="Service" value={180} />
          <CategoryRow name="Vehicle Quality" value={140} />
          <CategoryRow name="Support" value={95} />
          <CategoryRow name="App Experience" value={70} />
          <CategoryRow name="Other" value={55} />

        </Card>

      </div>

      {/* Complaints Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

          <h2 className="text-lg font-semibold text-slate-800">
            Customer Complaints
          </h2>

          <div className="flex items-center gap-3">

            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                placeholder="Search feedback..."
                className="pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <FilterBtn text="All" active />
            <FilterBtn text="Pending" />
            <FilterBtn text="Resolved" />

          </div>
        </div>

        {/* Complaints List */}
        <div className="space-y-4">

          <Complaint
            name="John Smith"
            rating={2}
            tag="Service"
            text="Long wait times at the service center. Took over 4 hours for a simple oil change."
            date="2024-01-15"
            status="Pending"
          />

          <Complaint
            name="Sarah Johnson"
            rating={1}
            tag="Vehicle Quality"
            text="Transmission issues started within first month of ownership. Very disappointed."
            date="2024-01-14"
            status="Resolved"
          />

          <Complaint
            name="Michael Brown"
            rating={2}
            tag="Support"
            text="Customer support was unhelpful and kept transferring my call."
            date="2024-01-13"
            status="Pending"
          />

          <Complaint
            name="Emily Davis"
            rating={3}
            tag="App Experience"
            text="App crashes frequently when trying to schedule appointments."
            date="2024-01-12"
            status="Resolved"
          />

        </div>

      </div>
    </div>
  );
}

/* ---------------- Components ---------------- */

function StatCard({ title, value, sub, icon, color }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 flex items-center justify-between">

      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <h3 className="text-2xl font-semibold text-slate-800 mt-1">
          {value}
        </h3>
        <p className="text-xs text-emerald-600 mt-1">{sub}</p>
      </div>

      <div
        className={`${color} text-white p-3 rounded-lg`}
      >
        {icon}
      </div>

    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 h-full">

      <h3 className="font-semibold text-slate-700 mb-4">
        {title}
      </h3>

      {children}
    </div>
  );
}

function RatingRow({ star, value, percent, color }) {
  return (
    <div className="mb-4">

      <div className="flex justify-between text-sm mb-1 text-slate-600">
        <span>{star} Stars</span>
        <span>{value}</span>
      </div>

      <div className="h-2 bg-slate-200 rounded-full">
        <div
          className={`h-2 ${color} rounded-full`}
          style={{ width: `${percent}%` }}
        />
      </div>

    </div>
  );
}

function CategoryRow({ name, value }) {
  return (
    <div className="mb-4">

      <div className="flex justify-between text-sm mb-1 text-slate-600">
        <span>{name}</span>
        <span>{value}</span>
      </div>

      <div className="h-2 bg-slate-200 rounded-full">
        <div
          className="h-2 bg-blue-500 rounded-full"
          style={{ width: `${value / 2}%` }}
        />
      </div>

    </div>
  );
}

function FilterBtn({ text, active }) {
  return (
    <button
      className={`px-3 py-1.5 text-sm rounded-lg border transition
        ${
          active
            ? "bg-blue-500 text-white border-blue-500"
            : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100"
        }`}
    >
      {text}
    </button>
  );
}

function Complaint({
  name,
  rating,
  tag,
  text,
  date,
  status,
}) {
  return (
    <div className="bg-slate-100 rounded-lg p-4">

      <div className="flex justify-between items-start">

        <div>
          <div className="flex items-center gap-2 mb-1">

            <ThumbsDown
              size={18}
              className="text-red-500"
            />

            <span className="font-medium text-slate-800">
              {name}
            </span>

            <Stars count={rating} />

            <span className="text-xs bg-slate-300 px-2 py-0.5 rounded">
              {tag}
            </span>

          </div>

          <p className="text-sm text-slate-600 mb-1">
            {text}
          </p>

          <p className="text-xs text-slate-400">
            {date}
          </p>
        </div>

        <span
          className={`text-xs px-3 py-1 rounded-full font-medium
            ${
              status === "Pending"
                ? "bg-orange-100 text-orange-600"
                : "bg-emerald-100 text-emerald-600"
            }`}
        >
          {status}
        </span>

      </div>
    </div>
  );
}

function Stars({ count }) {
  return (
    <div className="flex text-yellow-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          fill={i < count ? "currentColor" : "none"}
          stroke="currentColor"
        />
      ))}
    </div>
  );
}
