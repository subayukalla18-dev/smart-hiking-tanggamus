"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { api } from "../services/api";

import {
  Mountain,
  Mail,
  Lock,
} from "lucide-react";

export default function Home() {

  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async () => {

    try {

      setLoading(true);

      const res = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      // DEBUG RESPONSE
      console.log(
        "LOGIN RESPONSE =",
        res.data
      );

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        res.data.data.access_token
      );

      // CHECK TOKEN
      console.log(
        "TOKEN SAVED =",
        localStorage.getItem("token")
      );

      // REDIRECT
      router.push("/dashboard");

    } catch (error) {

      console.log(
        "LOGIN ERROR =",
        error
      );

      alert("Login gagal!");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black flex">

      {/* GLOW */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-500/20 blur-[120px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full" />

      {/* LEFT SIDE */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative z-10 p-20">

        <div className="max-w-2xl">

          <div className="flex items-center gap-5 mb-10">

            <div className="bg-green-500 p-5 rounded-[30px] shadow-2xl shadow-green-500/30">

              <Mountain
                size={55}
                className="text-white"
              />

            </div>

            <div>

              <h1 className="text-7xl font-black text-white tracking-tight">
                Smart Hiking
              </h1>

              <p className="text-green-400 text-xl mt-2">
                Tanggamus Management System
              </p>

            </div>

          </div>

          <p className="text-gray-300 text-2xl leading-relaxed">

            Platform digital untuk monitoring
            pendakian, tracking pendaki,
            booking online, dan manajemen
            hiking Gunung Tanggamus.

          </p>

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex items-center justify-center relative z-10 p-8">

        {/* LOGIN CARD */}
        <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 shadow-2xl">

          {/* MOBILE LOGO */}
          <div className="lg:hidden flex justify-center mb-8">

            <div className="bg-green-500 p-5 rounded-3xl">

              <Mountain
                size={40}
                className="text-white"
              />

            </div>

          </div>

          {/* TITLE */}
          <div className="text-center mb-10">

            <h1 className="text-5xl font-black text-white">
              Welcome Back Admin
            </h1>

          </div>

          {/* EMAIL */}
          <div className="mb-5">

            <label className="text-gray-300 text-sm block mb-3">
              Email Address
            </label>

            <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl px-5 focus-within:border-green-500 transition">

              <Mail
                size={20}
                className="text-gray-400"
              />

              <input
                type="email"
                placeholder="Masukkan email"
                className="w-full bg-transparent outline-none px-4 py-5 text-white placeholder:text-gray-500"
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

            </div>

          </div>

          {/* PASSWORD */}
          <div className="mb-8">

            <label className="text-gray-300 text-sm block mb-3">
              Password
            </label>

            <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl px-5 focus-within:border-green-500 transition">

              <Lock
                size={20}
                className="text-gray-400"
              />

              <input
                type="password"
                placeholder="Masukkan password"
                className="w-full bg-transparent outline-none px-4 py-5 text-white placeholder:text-gray-500"
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

            </div>

          </div>

          {/* BUTTON */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 transition-all duration-300 text-white font-bold py-5 rounded-2xl shadow-2xl shadow-green-500/20 hover:scale-[1.02]"
          >

            {loading
              ? "Loading..."
              : "Login"}

          </button>

          {/* FOOTER */}
          <p className="text-center text-gray-500 text-sm mt-8">

            Smart Hiking Tanggamus © 2026

          </p>

        </div>

      </div>

    </div>
  );
}
