"use client";

import { useEffect, useState } from "react";

import Sidebar from "../../../components/Sidebar";

import { api } from "../../../services/api";

import {
  Search,
  Plus,
} from "lucide-react";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export default function UsersPage() {

  // STATE
  const [users, setUsers] =
    useState<User[]>([]);

  const [loading, setLoading] =
    useState(true);

  // FETCH USERS
  useEffect(() => {

    const fetchUsers = async () => {

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
          "/users?limit=10&page=1",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        console.log(
          "USERS RESPONSE =",
          response.data
        );

        // SET USERS
        setUsers(
          response.data.data || []
        );

      } catch (error: any) {

        console.log(
          "ERROR USERS =",
          error?.response?.data || error
        );

      } finally {

        setLoading(false);

      }
    };

    fetchUsers();

  }, []);

  // LOADING
  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">

        <div className="text-2xl font-bold animate-pulse">
          Loading Users...
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
                Data Pendaki
              </h1>

              <p className="text-gray-500 mt-2">
                Kelola seluruh data pendaki Gunung Tanggamus
              </p>

            </div>

            <button className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-2xl hover:bg-gray-800 transition">

              <Plus size={20} />

              Tambah Pendaki

            </button>

          </div>

        </div>

        {/* TABLE */}
        <div className="bg-white rounded-3xl shadow-lg p-8">

          {/* TOP */}
          <div className="flex items-center justify-between mb-8">

            <div>

              <h2 className="text-3xl font-bold text-black">
                List Pendaki
              </h2>

              <p className="text-gray-500 mt-1">
                Monitoring data pendaki realtime
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

                  <th className="pb-5 text-gray-500">
                    Nama
                  </th>

                  <th className="pb-5 text-gray-500">
                    Email
                  </th>

                  <th className="pb-5 text-gray-500">
                    Role
                  </th>

                  <th className="pb-5 text-gray-500">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {users.length > 0 ? (

                  users.map((user) => (

                    <tr
                      key={user.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >

                      {/* NAME */}
                      <td className="py-6 font-semibold text-black">
                        {user.name}
                      </td>

                      {/* EMAIL */}
                      <td className="text-gray-600">
                        {user.email}
                      </td>

                      {/* ROLE */}
                      <td>

                        <span
                          className={`
                            px-4 py-2 rounded-full text-sm font-medium
                            ${
                              user.role === "ADMIN"
                                ? "bg-green-100 text-green-700"
                                : "bg-blue-100 text-blue-700"
                            }
                          `}
                        >

                          {user.role}

                        </span>

                      </td>

                      {/* ACTION */}
                      <td className="space-x-2">

                        <button className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition">
                          Detail
                        </button>

                        <button className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition">
                          Hapus
                        </button>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan={4}
                      className="text-center py-10 text-gray-500"
                    >
                      Data users tidak ditemukan
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