import { redirect } from "next/navigation";
import { requireRole } from "@/app/lib/auth";
import UsersManager from "../../components/UsersManager";
import { getAllUsers } from "@/app/lib/db/service";

export default async function UsersPage() {
  const session = await requireRole(["supervisor"]);

  if (!session) {
    redirect("/x9z2k8w5q");
  }

  const users = getAllUsers();

  return (
    <div className="max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Manage Users</h1>
        <p className="text-muted mt-2">Add, edit, and manage user accounts</p>
      </div>

      <UsersManager initialUsers={users} />
    </div>
  );
}
