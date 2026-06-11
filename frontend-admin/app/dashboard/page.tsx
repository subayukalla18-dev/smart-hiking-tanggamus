"use client";

import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";

import CountUp from "react-countup";

import Link from "next/link";

import {
  Users,
  ClipboardList,
  Mountain,
  ArrowUpRight,
  RefreshCw,
} from "lucide-react";

import { api } from "../../services/api";

interface Booking {
  id: number;
  hikingDate: string;
  status: string;
  createdAt?: string;
  user?: {
    name: string;
  };
}

export default function DashboardPage() {

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [totalUsers, setTotalUsers] = useState(0);

  const [pendingBookings, setPendingBookings] = useState(0);

  const [activeHikers, setActiveHikers] = useState(0);

  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);

  useEffect(() => {

    fetchDashboard();

    // AUTO REFRESH
    const interval =
      setInterval(() => {
        fetchDashboard(true);
      }, 5000);

    return () =>
      clearInterval(interval);

  }, []);

  const fetchDashboard = async (
    isRefresh = false
  ) => {

    try {

      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      // USERS
const usersRes =
  await api.get("/users");

console.log(
  "USERS DASHBOARD =",
  usersRes.data
);

const users =
  usersRes.data?.data?.data || [];

setTotalUsers(
  usersRes.data?.data?.total || 0
);

      // BOOKINGS
      const bookingsRes =
        await api.get("/booking");

      const bookings =
        bookingsRes.data?.data || [];

      // SORT TERBARU
      const sortedBookings =
        [...bookings].sort(
          (a: Booking, b: Booking) =>
            new Date(
              b.createdAt || b.hikingDate
            ).getTime() -
            new Date(
              a.createdAt || a.hikingDate
            ).getTime()
        );

      // PENDING
      const pending =
        bookings.filter(
          (item: Booking) =>
            item.status === "PENDING"
        );

      setPendingBookings(
        pending.length
      );

      // ACTIVE
      const approved =
        bookings.filter(
          (item: Booking) =>
            item.status === "APPROVED"
        );

      setActiveHikers(
        approved.length
      );

      // RECENT
      setRecentBookings(
        sortedBookings.slice(0, 5)
      );

    } catch (error) {

      console.log(
        "DASHBOARD ERROR =",
        error
      );

    } finally {

      setLoading(false);

      setRefreshing(false);

    }
  };

  const getStatusStyle = (
    status: string
  ) => {

    switch (status) {

      case "APPROVED":
        return "bg-green-100 text-green-700";

      case "REJECTED":
        return "bg-red-100 text-red-700";

      case "FINISHED":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

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
                Smart Hiking Tanggamus Management System 
              </p>

            </div>

            <div className="flex items-center gap-4">

              {/* REFRESH STATUS */}
              <div className="flex items-center gap-2 text-sm text-gray-500">

                <RefreshCw
                  size={16}
                  className={
                    refreshing
                      ? "animate-spin"
                      : ""
                  }
                />

                {
                  refreshing
                    ? "Refreshing..."
                    : "Realtime Active"
                }

              </div>

              <div className="bg-black text-white px-5 py-3 rounded-2xl shadow-lg flex items-center gap-2">

                Admin Panel

                <ArrowUpRight size={20} />

              </div>

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

                  {
                    loading
                      ? "..."
                      : (
                        <CountUp
                          end={totalUsers}
                          duration={2}
                        />
                      )
                  }

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

                  {
                    loading
                      ? "..."
                      : (
                        <CountUp
                          end={pendingBookings}
                          duration={2}
                        />
                      )
                  }

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

                  {
                    loading
                      ? "..."
                      : (
                        <CountUp
                          end={activeHikers}
                          duration={2}
                        />
                      )
                  }

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

            <Link href="/dashboard/bookings">

              <button className="bg-black text-white px-5 py-3 rounded-2xl hover:bg-gray-800 transition shadow-lg">

                Lihat Semua

              </button>

            </Link>

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

                {
                  loading ? (

                    [...Array(5)].map((_, index) => (

                      <tr
                        key={index}
                        className="border-b border-gray-100"
                      >

                        <td className="py-6">

                          <div className="animate-pulse">

                            <div className="h-5 w-40 bg-gray-200 rounded mb-2"></div>

                            <div className="h-4 w-28 bg-gray-100 rounded"></div>

                          </div>

                        </td>

                        <td>

                          <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>

                        </td>

                        <td>

                          <div className="h-8 w-24 bg-gray-200 rounded-full animate-pulse"></div>

                        </td>

                      </tr>

                    ))

                  ) : recentBookings.length > 0 ? (

                    recentBookings.map((item) => (

                      <tr
                        key={item.id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition"
                      >

                        <td className="py-6">

                          <div>

                            <h3 className="font-semibold text-black">

                              {
                                item.user?.name ||
                                "Pendaki"
                              }

                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                              Pendaki Gunung Tanggamus
                            </p>

                          </div>

                        </td>

                        <td className="text-gray-600">

                          {
                            new Date(
                              item.hikingDate
                            ).toLocaleDateString(
                              "id-ID"
                            )
                          }

                        </td>

                        <td>

                          <span
                            className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusStyle(item.status)}`}
                          >

                            {item.status}

                          </span>

                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td 
                        colSpan={3}
                        className="py-16 text-center"
                      >

                        <div className="flex flex-col items-center justify-center">

                          <ClipboardList
                            size={50}
                            className="text-gray-300 mb-4"
                          />

                          <h3 className="text-lg font-semibold text-gray-500">
                            Belum ada booking
                          </h3>

                          <p className="text-sm text-gray-400 mt-1">
                            Data booking akan muncul disini
                          </p>

                        </div>

                      </td>

                    </tr>

                  )
                }

              </tbody>

            </table>

          </div>

        </div>

      </main>

    </div>
  );
}