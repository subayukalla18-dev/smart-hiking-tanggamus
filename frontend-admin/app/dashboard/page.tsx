"use client";

import Sidebar from "../../components/Sidebar";
import CountUp from "react-countup";
import {
  Users,
  ClipboardList,
  Mountain,
  ArrowUpRight,
} from "lucide-react";

export default function DashboardPage() {

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <main className="flex-1 p-8">

        {/* TOPBAR */}
        <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-3xl px-8 py-7 mb-8">

          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-5xl font-bold text-gray-900">
                Dashboard Admin
              </h1>

              <p className="text-gray-500 mt-3 text-lg">
                Smart Hiking Tanggamus Management System 🚀
              </p>

            </div>

            <div className="bg-black text-white px-5 py-3 rounded-2xl shadow-lg flex items-center gap-2">

              Admin Panel

              <ArrowUpRight size={20} />

            </div>

          </div>

        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          {/* CARD 1 */}
          <div className="bg-white rounded-3xl p-7 shadow-xl hover:scale-105 transition duration-300 border border-gray-100">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500 text-sm">
                  Total Pendaki
                </p>

                <h2 className="text-6xl font-bold text-black mt-4">

                  <CountUp
                    end={120}
                    duration={2}
                  />

                </h2>

              </div>

              <div className="bg-blue-100 p-4 rounded-2xl">

                <Users
                  size={35}
                  className="text-blue-600"
                />

              </div>

            </div>

          </div>

          {/* CARD 2 */}
          <div className="bg-white rounded-3xl p-7 shadow-xl hover:scale-105 transition duration-300 border border-gray-100">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500 text-sm">
                  Booking Pending
                </p>

                <h2 className="text-6xl font-bold text-yellow-500 mt-4">

                  <CountUp
                    end={15}
                    duration={2}
                  />

                </h2>

              </div>

              <div className="bg-yellow-100 p-4 rounded-2xl">

                <ClipboardList
                  size={35}
                  className="text-yellow-600"
                />

              </div>

            </div>

          </div>

          {/* CARD 3 */}
          <div className="bg-white rounded-3xl p-7 shadow-xl hover:scale-105 transition duration-300 border border-gray-100">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500 text-sm">
                  Pendaki Aktif
                </p>

                <h2 className="text-6xl font-bold text-green-600 mt-4">

                  <CountUp
                    end={32}
                    duration={2}
                  />

                </h2>

              </div>

              <div className="bg-green-100 p-4 rounded-2xl">

                <Mountain
                  size={35}
                  className="text-green-600"
                />

              </div>

            </div>

          </div>

        </div>

        {/* TABLE */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-8">

            <div>

              <h2 className="text-3xl font-bold text-black">
                Pendaki Terbaru
              </h2>

              <p className="text-gray-500 text-sm mt-2">
                Monitoring data pendaki terbaru Gunung Tanggamus
              </p>

            </div>

            <button className="bg-black text-white px-5 py-3 rounded-2xl hover:bg-gray-800 transition shadow-lg">

              Lihat Semua

            </button>

          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b border-gray-200 text-left">

                  <th className="pb-5 text-gray-500 font-medium">
                    Nama Pendaki
                  </th>

                  <th className="pb-5 text-gray-500 font-medium">
                    Tanggal
                  </th>

                  <th className="pb-5 text-gray-500 font-medium">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                <tr className="border-b border-gray-100 hover:bg-gray-50 transition">

                  <td className="py-6">

                    <div>

                      <h3 className="font-semibold text-black">
                        Budi Santoso
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        Pendaki Gunung Tanggamus
                      </p>

                    </div>

                  </td>

                  <td className="text-gray-600">
                    05 Mei 2026
                  </td>

                  <td>

                    <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold">

                      Pending

                    </span>

                  </td>

                </tr>

                <tr className="border-b border-gray-100 hover:bg-gray-50 transition">

                  <td className="py-6">

                    <div>

                      <h3 className="font-semibold text-black">
                        Andi Saputra
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        Pendaki Gunung Tanggamus
                      </p>

                    </div>

                  </td>

                  <td className="text-gray-600">
                    05 Mei 2026
                  </td>

                  <td>

                    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">

                      Approved

                    </span>

                  </td>

                </tr>

                <tr className="hover:bg-gray-50 transition">

                  <td className="py-6">

                    <div>

                      <h3 className="font-semibold text-black">
                        Reza Firmansyah
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        Pendaki Gunung Tanggamus
                      </p>

                    </div>

                  </td>

                  <td className="text-gray-600">
                    06 Mei 2026
                  </td>

                  <td>

                    <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold">

                      Rejected

                    </span>

                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </main>

    </div>
  );
}