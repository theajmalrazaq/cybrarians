import { redirect } from "next/navigation";
import { requireAuth } from "@/app/lib/auth";
import DashboardNav from "../components/DashboardNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAuth();

  if (!session) {
    redirect("/x9z2k8w5q");
  }

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-7xl mx-auto">
        <DashboardNav session={session} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
