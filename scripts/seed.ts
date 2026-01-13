import { createUser, createProfile } from "../app/lib/db/service";

async function seed() {
  console.log("🌱 Seeding database...\n");

  try {
    // Create default supervisor account
    const supervisorEmail = "admin@cybrarians.com";
    const supervisorPassword = "admin123";

    console.log("Creating default supervisor account...");

    await createUser({
      email: supervisorEmail,
      password: supervisorPassword,
      role: "supervisor",
    });

    console.log("✅ Default supervisor created successfully!\n");
    console.log("═══════════════════════════════════════════");
    console.log("  Admin Panel Access Details");
    console.log("═══════════════════════════════════════════");
    console.log(`  Email:    ${supervisorEmail}`);
    console.log(`  Password: ${supervisorPassword}`);
    console.log("═══════════════════════════════════════════");
    console.log(`  URL: http://localhost:3000/x9z2k8w5q`);
    console.log("═══════════════════════════════════════════\n");
    console.log("⚠️  IMPORTANT: Change the password after first login!\n");

    // Optionally create sample research assistant
    console.log("Creating sample research assistant...");
    const raResult = await createUser({
      email: "ra@cybrarians.com",
      password: "ra123",
      role: "research_assistant",
    });

    createProfile({
      userId: raResult.id,
      name: "John Doe",
      bio: "Research Assistant specializing in Cybersecurity",
    });

    console.log("✅ Sample research assistant created");
    console.log("   Email: ra@cybrarians.com | Password: ra123\n");

    // Optionally create sample FYP student
    console.log("Creating sample FYP student...");
    const fypResult = await createUser({
      email: "student@cybrarians.com",
      password: "student123",
      role: "fyp_student",
    });

    createProfile({
      userId: fypResult.id,
      name: "Jane Smith",
      bio: "FYP Student working on AI Security",
    });

    console.log("✅ Sample FYP student created");
    console.log("   Email: student@cybrarians.com | Password: student123\n");

    console.log("🎉 Database seeding completed successfully!");
  } catch (error: unknown) {
    const sqliteError = error as { code?: string };
    if (sqliteError?.code === "SQLITE_CONSTRAINT_UNIQUE") {
      console.log("ℹ️  Database already seeded. Users already exist.\n");
      console.log("═══════════════════════════════════════════");
      console.log("  Admin Panel Access Details");
      console.log("═══════════════════════════════════════════");
      console.log("  Email:    admin@cybrarians.com");
      console.log("  Password: admin123");
      console.log("═══════════════════════════════════════════");
      console.log("  URL: http://localhost:3000/x9z2k8w5q");
      console.log("═══════════════════════════════════════════");
    } else {
      console.error("❌ Error seeding database:", error);
      process.exit(1);
    }
  }
}

seed();
