"use client";

import { useEffect, useState } from "react";

import Sidebar from "../../../components/Sidebar";

import { api } from "../../../services/api";

import {
  ClipboardList,
  Search,
  CheckCircle,
  XCircle,
} from "lucide-react";

type Booking = {
  id: number;
  nik: string;
  phone: string;
  status: string;
  hikingDate: string;
  totalPerson: number;
  address: string;
};

// FORMAT TANGGAL INDONESIA
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export default function BookingPage() {

  // STATE
  const [bookings, setBookings] =
    useState<Booking[]>([]);

  const [loading, setLoading] =
    useState(true);

  // FETCH BOOKINGS
  useEffect(() => {

    const fetchBookings = async () => {

      try {

        // GET TOKEN
        const token =
          localStorage.getItem("token");

        // CHECK TOKEN
        if (!token) {

          console.log(
            "TOKEN TIDAK ADA"
          );

          setLoading(false);

          return;
        }

        // REQUEST API
        const response = await api.get(
          "/booking?limit=10&page=1",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        console.log(
          "BOOKINGS RESPONSE =",
          response.data
        );

        // SET BOOKINGS
        setBookings(
          response.data.data || []
        );

      } catch (error: unknown) {

        console.log(
          "ERROR BOOKINGS =",
          (error as {
            response?: {
              data?: unknown;
            };
          })?.response?.data || error
        );

      } finally {

        setLoading(false);

      }
    };

    fetchBookings();

  }, []);

  // LOADING
  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">

        <div className="text-2xl font-bold animate-pulse">
          Loading Bookings...
        </div>

      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <main className="flex-1 p-8">

        {/* HEADER */}
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-lg p-8 mb-8 border border-white/20">

          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-4xl font-bold text-black">
                Booking Pendakian
              </h1>

              <p className="text-gray-500 mt-2">
                Kelola seluruh booking pendakian Gunung Tanggamus
              </p>

            </div>

            <div className="bg-black text-white px-5 py-3 rounded-2xl flex items-center gap-2">

              <ClipboardList size={20} />

              Booking System

            </div>

          </div>

        </div>

        {/* TABLE */}
        <div className="bg-white rounded-3xl shadow-lg p-8">

          {/* TOP TABLE */}
          <div className="flex items-center justify-between mb-8">

            <div>

              <h2 className="text-3xl font-bold text-black">
                List Booking
              </h2>

              <p className="text-gray-500 mt-1">
                Monitoring booking pendakian realtime
              </p>

            </div>

            {/* SEARCH */}
            <div className="flex items-center bg-gray-100 px-4 py-3 rounded-2xl w-[300px]">

              <Search
                size={20}
                className="text-gray-500"
              />

              <input
                type="text"
                placeholder="Cari booking..."
                className="bg-transparent outline-none ml-3 w-full"
              />

            </div>

          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b border-gray-200 text-left">

                  <th className="pb-5 text-gray-500">
                    Tanggal Pendakian
                  </th>
                   
                  <th className="pb-5 text-gray-500">
                    NIK
                  </th>

                  <th className="pb-5 text-gray-500">
                    Phone
                  </th>

                  <th className="pb-5 text-gray-500">
                    Total Person
                  </th>

                  <th className="pb-5 text-gray-500">
                    Address
                  </th>

                  <th className="pb-5 text-gray-500">
                    Status
                  </th>

                  <th className="pb-5 text-gray-500">
                    Action
                  </th>

                </tr>

              </thead>
<tbody>
  {bookings.length > 0 ? (
    bookings.map((booking) => (
      <tr
        key={booking.id}
        className="border-b border-gray-100 hover:bg-gray-50 transition"
      >
        {/* HIKING DATE */}
        <td className="text-gray-600">
          {formatDate(booking.hikingDate)}
        </td>

        {/* NIK */}
        <td className="py-6 font-semibold text-black">
          {booking.nik}
        </td>

        {/* PHONE */}
        <td className="text-gray-600">
          {booking.phone}
        </td>

        {/* TOTAL PERSON */}
        <td className="text-gray-600">
          {booking.totalPerson}
        </td>

        {/* ADDRESS */}
        <td className="text-gray-600">
          {booking.address}
        </td>

        {/* STATUS */}
        <td>
          <span
            className={`
              px-4 py-2 rounded-full text-sm font-medium
              ${
                booking.status === "FINISHED"
                  ? "bg-green-100 text-green-700"
                  : booking.status === "PENDING"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }
            `}
          >
            {booking.status}
          </span>
        </td>

        {/* ACTION */}
        <td className="space-x-2">
          <button className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition inline-flex items-center gap-2">
            <CheckCircle size={18} />
            Approve
          </button>

          <button className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition inline-flex items-center gap-2">
            <XCircle size={18} />
            Reject
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td
        colSpan={7}
        className="text-center py-10 text-gray-500"
      >
        Data booking tidak ditemukan
      </td>
    </tr>
  )}
</tbody>

            </table>

          </div>

        </div>

      </main>

    </div>
  );
}