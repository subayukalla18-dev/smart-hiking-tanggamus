import Sidebar from "../../../components/Sidebar";

import {
  ClipboardList,
  Search,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function BookingPage() {

  const bookings = [
    {
      id: 1,
      nama: "Budi Santoso",
      tanggal: "05 Mei 2026",
      status: "Pending",
    },
    {
      id: 2,
      nama: "Andi Saputra",
      tanggal: "06 Mei 2026",
      status: "Approved",
    },
    {
      id: 3,
      nama: "Reza Firmansyah",
      tanggal: "07 Mei 2026",
      status: "Rejected",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">

      <Sidebar />

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
                    Nama
                  </th>

                  <th className="pb-5 text-gray-500">
                    Tanggal
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

                {bookings.map((booking) => (

                  <tr
                    key={booking.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >

                    <td className="py-6 font-semibold text-black">
                      {booking.nama}
                    </td>

                    <td className="text-gray-600">
                      {booking.tanggal}
                    </td>

                    <td>

                      <span
                        className={`px-4 py-2 rounded-full text-sm font-medium
                          ${
                            booking.status === "Approved"
                              ? "bg-green-100 text-green-700"
                              : booking.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }
                        `}
                      >
                        {booking.status}
                      </span>

                    </td>

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

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </main>

    </div>
  );
}