"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import type { SessionPayload } from "@/app/lib/auth";

interface DashboardNavProps {
  session: SessionPayload;
}

export default function DashboardNav({ session }: DashboardNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/x9z2k8w5q/api/logout", {
        method: "POST",
      });
      router.push("/x9z2k8w5q");
    } catch (error) {
      console.error("Logout failed:", error);
      setLoggingOut(false);
    }
  };

  const isSupervisor = session.role === "supervisor";
  const isRA = session.role === "research_assistant";
  const isFYP = session.role === "fyp_student";

  const navItems = [
    {
      href: "/x9z2k8w5q/dashboard",
      label: "Dashboard",
      show: true,
    },
    {
      href: "/x9z2k8w5q/dashboard/profile",
      label: "My Profile",
      show: isRA || isFYP,
    },
    {
      href: "/x9z2k8w5q/dashboard/papers",
      label: "My Papers",
      show: isRA,
    },
    {
      href: "/x9z2k8w5q/dashboard/users",
      label: "Manage Users",
      show: isSupervisor,
    },
    {
      href: "/x9z2k8w5q/dashboard/fyp-students",
      label: "FYP Students",
      show: isSupervisor,
    },
    {
      href: "/x9z2k8w5q/dashboard/research-assistants",
      label: "Research Assistants",
      show: isSupervisor,
    },
    {
      href: "/x9z2k8w5q/dashboard/community",
      label: "Community",
      show: isSupervisor,
    },
  ].filter((item) => item.show);

  const getRoleBadge = () => {
    const roleLabels = {
      supervisor: "Supervisor",
      research_assistant: "Research Assistant",
      fyp_student: "FYP Student",
    };

    const colors = {
      supervisor: "bg-purple-100 text-purple-800",
      research_assistant: "bg-blue-100 text-blue-800",
      fyp_student: "bg-green-100 text-green-800",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${colors[session.role]}`}
      >
        {roleLabels[session.role]}
      </span>
    );
  };

  return (
    <nav className="bg-background border-b border-border">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <Link
              href="/x9z2k8w5q/dashboard"
              className="text-2xl font-bold text-primary"
            >
              Admin Panel
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium text-foreground">
                {session.email}
              </span>
              <div className="mt-1">{getRoleBadge()}</div>
            </div>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-foreground hover:bg-surface"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
