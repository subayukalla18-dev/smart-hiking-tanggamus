"use client";

import { useEffect, useState } from "react";

import Sidebar from "../../../components/Sidebar";

import { api } from "../../../services/api";

import {
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Users,
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

  const [refreshing, setRefreshing] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [limit] =
    useState(10);

  const [totalPages, setTotalPages] =
    useState(1);

  const [totalUsers, setTotalUsers] =
    useState(0);

  const [selectedUser, setSelectedUser] =
  useState<any>(null);

  const [showDetail, setShowDetail] =
  useState(false);

  // FETCH USERS
  useEffect(() => {

    fetchUsers();

  }, [page, search]);

  // AUTO REFRESH
  useEffect(() => {

    const interval =
      setInterval(() => {
        fetchUsers(true);
      }, 5000);

    return () =>
      clearInterval(interval);

  }, [page,search]);

  const fetchUsers = async (
    isRefresh = false
  ) => {

    try {

      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

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
        `/users?page=${page}&limit=${limit}&search=${search}`,
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

      // GET USERS DATA
const usersData =
  response.data?.data?.data || [];

// SET USERS
setUsers(usersData);

// TOTAL
const total =
  response.data?.data?.total ||
  usersData.length;

      setTotalUsers(total);

      setTotalPages(
        Math.ceil(total / limit)
      );

    } catch (error: any) {

      console.log(
        "ERROR USERS =",
        error?.response?.data || error
      );

    } finally {

      setLoading(false);

      setRefreshing(false);

    }
  };
         const handleDetail = async (
  id: number
) => {

  try {

    const token =
      localStorage.getItem("token");

    const response =
      await api.get(
        `/users/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    setSelectedUser(
      response.data.data
    );

    setShowDetail(true);

  } catch (error: any) {

    console.log(
      "DETAIL ERROR =",
      error?.response?.data || error
    );

  }

};
  // DELETE USER
  const handleDelete = async (
    id: number
  ) => {

    const confirmDelete =
      confirm(
        "Yakin ingin menghapus user ini?"
      );

    if (!confirmDelete) return;

    try {

      const token =
        localStorage.getItem("token");

      await api.delete(
        `/users/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      // REFRESH
      fetchUsers();

    } catch (error: any) {

      console.log(
        "DELETE ERROR =",
        error?.response?.data || error
      );

    }
  };

  // LOADING
  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">

        <div className="flex items-center gap-3 text-2xl font-bold animate-pulse">

          <RefreshCw
            size={28}
            className="animate-spin"
          />

          Loading Users...

        </div>

      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">

      {/* SIDEBAR */}
      <Sidebar />
        {showDetail && selectedUser && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-3xl w-[500px] shadow-2xl">

      <h2 className="text-2xl font-bold text-black mb-6">
        Detail Pendaki
      </h2>

      <div className="space-y-4">

        <div>
          <p className="text-sm text-gray-500">
            Nama
          </p>
          <p className="text-lg font-semibold text-black">
            {selectedUser.name}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Email
          </p>
          <p className="text-lg font-semibold text-black">
            {selectedUser.email}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Role
          </p>

          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              selectedUser.role === "ADMIN"
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {selectedUser.role}
          </span>
        </div>

      </div>

      <button
        onClick={() => setShowDetail(false)}
        className="mt-8 w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
      >
        Tutup
      </button>

    </div>
  </div>
)}
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

            <div className="flex items-center gap-4">

              {/* REFRESH */}
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

              <button className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-2xl hover:bg-gray-800 transition">

                <Plus size={20} />

                Tambah Pendaki

              </button>

            </div>

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
                Total {totalUsers} pendaki ditemukan
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
                value={search}
                onChange={(e) => {
                  setSearch(
                    e.target.value
                  );

                  setPage(1);
                }}
                className="bg-transparent outline-none ml-3 w-full"
              />

            </div>

          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b border-gray-200 text-left">

                  <th className="pb-5 text-center text-gray-500">
                    Nama
                  </th>

                  <th className="pb-5 text-center text-gray-500">
                    Email
                  </th>

                  <th className="pb-5 text-center text-gray-500">
                    Role
                  </th>

                  <th className="pb-5 text-center text-gray-500">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {users.length > 0 ? (

                  users.map((user) => (

                    <tr
                      key={user.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition text-center"
                    >

                      {/* NAME */}
                      <td className="py-6 font-semibold text-black text-center">
                        {user.name}
                      </td>

                      {/* EMAIL */}
                      <td className="text-gray-600 text-center">
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

                        <button
                      onClick={() =>
                      handleDetail(user.id)
                    }
                     className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
                  >
                    Detail
                    </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              user.id
                            )
                          }
                          className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
                        >
                          Hapus
                        </button>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan={4}
                      className="text-center py-16"
                    >

                      <div className="flex flex-col items-center justify-center">

                        <Users
                          size={50}
                          className="text-gray-300 mb-4"
                        />

                        <h3 className="text-lg font-semibold text-gray-500">
                          Data users tidak ditemukan
                        </h3>

                        <p className="text-sm text-gray-400 mt-1">
                          Coba gunakan keyword lain
                        </p>

                      </div>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

          {/* PAGINATION */}
          <div className="flex items-center justify-between mt-8">

            <p className="text-gray-500 text-sm">

              Page {page} of {totalPages}

            </p>

            <div className="flex items-center gap-3">

              {/* PREV */}
              <button
                onClick={() =>
                  setPage((prev) =>
                    Math.max(prev - 1, 1)
                  )
                }
                disabled={page === 1}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition disabled:opacity-50"
              >

                <ChevronLeft size={18} />

                Prev

              </button>

              {/* NEXT */}
              <button
                onClick={() =>
                  setPage((prev) =>
                    Math.min(
                      prev + 1,
                      totalPages
                    )
                  )
                }
                disabled={
                  page === totalPages
                }
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-800 transition disabled:opacity-50"
              >

                Next

                <ChevronRight size={18} />

              </button>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}