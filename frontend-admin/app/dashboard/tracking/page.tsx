import Sidebar from "../../../components/Sidebar";

import {
  MapPinned,
  Search,
  Clock3,
} from "lucide-react";

export default function TrackingPage() {

  const tracking = [
    {
      id: 1,
      nama: "Budi Santoso",
      status: "PENDING",
      checkIn: "-",
      updatedAt: "07:00 WIB",
    },
    {
      id: 2,
      nama: "Andi Saputra",
      status: "CHECK_IN",
      checkIn: "07:30 WIB",
      updatedAt: "07:35 WIB",
    },
    {
      id: 3,
      nama: "Reza Firmansyah",
      status: "ON_HIKE",
      checkIn: "06:45 WIB",
      updatedAt: "09:15 WIB",
    },
    {
      id: 4,
      nama: "Doni Pratama",
      status: "FINISHED",
      checkIn: "05:30 WIB",
      updatedAt: "14:10 WIB",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">

      <Sidebar />

      <main className="flex-1 p-8">

        {/* TOPBAR */}
        <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-3xl px-8 py-7 mb-8">

          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-4xl font-bold text-gray-900">
                Tracking Pendaki
              </h1>

              <p className="text-gray-500 mt-2">
                Monitoring status perjalanan pendaki Gunung Tanggamus
              </p>

            </div>

            <div className="bg-black text-white px-5 py-3 rounded-2xl flex items-center gap-2 shadow-lg">

              <MapPinned size={20} />

              Live Tracking

            </div>

          </div>

        </div>

        {/* STATUS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

          {/* PENDING */}
          <div className="bg-white rounded-3xl shadow-lg p-6 hover:scale-105 transition duration-300">

            <p className="text-gray-500">
              Pending
            </p>

            <h2 className="text-5xl font-bold mt-4 text-yellow-500">
              4
            </h2>

          </div>

          {/* CHECK IN */}
          <div className="bg-white rounded-3xl shadow-lg p-6 hover:scale-105 transition duration-300">

            <p className="text-gray-500">
              Check In
            </p>

            <h2 className="text-5xl font-bold mt-4 text-purple-500">
              8
            </h2>

          </div>

          {/* ON HIKE */}
          <div className="bg-white rounded-3xl shadow-lg p-6 hover:scale-105 transition duration-300">

            <p className="text-gray-500">
              On Hike
            </p>

            <h2 className="text-5xl font-bold mt-4 text-orange-500">
              12
            </h2>

          </div>

          {/* FINISHED */}
          <div className="bg-white rounded-3xl shadow-lg p-6 hover:scale-105 transition duration-300">

            <p className="text-gray-500">
              Finished
            </p>

            <h2 className="text-5xl font-bold mt-4 text-green-600">
              20
            </h2>

          </div>

        </div>

        {/* TABLE SECTION */}
        <div className="bg-white rounded-3xl shadow-xl p-8">

          {/* HEADER TABLE */}
          <div className="flex items-center justify-between mb-8">

            <div>

              <h2 className="text-3xl font-bold text-black">
                Status Pendaki
              </h2>

              <p className="text-gray-500 mt-2">
                Monitoring realtime seluruh pendaki
              </p>

            </div>

            {/* SEARCH */}
            <div className="flex items-center bg-gray-100 px-4 py-3 rounded-2xl w-[320px]">

              <Search
                size={20}
                className="text-gray-500"
              />

              <input
                type="text"
                placeholder="Cari pendaki..."
                className="bg-transparent outline-none ml-3 w-full"
              />

            </div>

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
                    Status
                  </th>

                  <th className="pb-5 text-gray-500 font-medium">
                    Check In
                  </th>

                  <th className="pb-5 text-gray-500 font-medium">
                    Last Update
                  </th>

                  <th className="pb-5 text-gray-500 font-medium">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {tracking.map((item) => (

                  <tr
                    key={item.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >

                    {/* NAMA */}
                    <td className="py-6">

                      <div>

                        <h3 className="font-semibold text-black">
                          {item.nama}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          Pendaki Gunung Tanggamus
                        </p>

                      </div>

                    </td>

                    {/* STATUS */}
                    <td>

                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold
                          ${
                            item.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-700"
                              : item.status === "CHECK_IN"
                              ? "bg-purple-100 text-purple-700"
                              : item.status === "ON_HIKE"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-green-100 text-green-700"
                          }
                        `}
                      >
                        {item.status}
                      </span>

                    </td>

                    {/* CHECK IN */}
                    <td className="text-gray-600">
                      {item.checkIn}
                    </td>

                    {/* UPDATE */}
                    <td>

                      <div className="flex items-center gap-2 text-gray-500">

                        <Clock3 size={16} />

                        {item.updatedAt}

                      </div>

                    </td>

                    {/* ACTION */}
                    <td>

                      <button className="bg-black text-white px-5 py-2 rounded-2xl hover:bg-gray-800 transition shadow-md">

                        Update Status

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