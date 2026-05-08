"use client";

import Link from "next/link";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import {
  LayoutDashboard,
  Users,
  ClipboardList,
  MapPinned,
  LogOut,
  Mountain,
} from "lucide-react";

export default function Sidebar() {

  const pathname = usePathname();

  const router = useRouter();

  const menus = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Pendaki",
      href: "/dashboard/users",
      icon: Users,
    },
    {
      name: "Booking",
      href: "/dashboard/bookings",
      icon: ClipboardList,
    },
    {
      name: "Tracking",
      href: "/dashboard/tracking",
      icon: MapPinned,
    },
  ];

  // LOGOUT FUNCTION
  const handleLogout = () => {

    const confirmLogout = confirm(
      "Yakin ingin logout?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem("token");

    router.push("/");

  };

  return (
    <aside className="
      relative
      w-72
      min-h-screen
      bg-gradient-to-b
      from-black
      via-gray-950
      to-black
      text-white
      p-6
      border-r
      border-white/10
      overflow-hidden
    ">

      {/* GLOW */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-500/10 blur-[120px] rounded-full" />

      {/* CONTENT */}
      <div className="relative z-10">

        {/* LOGO */}
        <div className="flex items-center gap-4 mb-14">

          <div className="
            bg-green-500
            p-3
            rounded-2xl
            shadow-lg
            shadow-green-500/20
          ">

            <Mountain
              size={30}
              className="text-white"
            />

          </div>

          <div>

            <h1 className="text-2xl font-black tracking-tight">
              Smart Hiking
            </h1>

            <p className="text-gray-400 text-sm mt-1">
              Admin Dashboard
            </p>

          </div>

        </div>

        {/* MENU */}
        <nav className="space-y-3">

          {menus.map((menu) => {

            const Icon = menu.icon;

            const isActive =
              pathname === menu.href;

            return (
              <Link
                key={menu.name}
                href={menu.href}
                className={`
                  group
                  flex
                  items-center
                  gap-4
                  px-5
                  py-4
                  rounded-2xl
                  transition-all
                  duration-300
                  ${
                    isActive
                      ? `
                        bg-white
                        text-black
                        shadow-xl
                        scale-[1.02]
                      `
                      : `
                        text-gray-300
                        hover:bg-white/10
                        hover:text-white
                        hover:translate-x-1
                      `
                  }
                `}
              >

                <Icon
                  size={22}
                  className="
                    transition
                    group-hover:scale-110
                  "
                />

                <span className="font-medium">
                  {menu.name}
                </span>

              </Link>
            );
          })}

        </nav>

        {/* DIVIDER */}
        <div className="border-t border-white/10 my-10" />

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="
            w-full
            flex
            items-center
            gap-4
            px-5
            py-4
            rounded-2xl
            bg-red-500/10
            text-red-400
            hover:bg-red-500
            hover:text-white
            transition-all
            duration-300
            hover:scale-[1.02]
          "
        >

          <LogOut size={22} />

          <span className="font-medium">
            Logout
          </span>

        </button>

      </div>

    </aside>
  );
}