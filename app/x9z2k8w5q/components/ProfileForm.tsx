"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type {
  ProfileWithUser,
  FYPStudentWithProfile,
  FYPStatus,
} from "@/app/types";

interface ProfileFormProps {
  userId: number;
  role: "research_assistant" | "fyp_student";
  initialProfile: ProfileWithUser | null;
  initialFypData: FYPStudentWithProfile | null;
}

export default function ProfileForm({
  userId,
  role,
  initialProfile,
  initialFypData,
}: ProfileFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Profile fields
  const [name, setName] = useState(initialProfile?.name || "");
  const [bio, setBio] = useState(initialProfile?.bio || "");
  const [profilePicture, setProfilePicture] = useState(
    initialProfile?.profile_picture || "",
  );

  // FYP-specific fields
  const [projectTitle, setProjectTitle] = useState(
    initialFypData?.project_title || "",
  );
  const [ideaDescription, setIdeaDescription] = useState(
    initialFypData?.idea_description || "",
  );
  const [year, setYear] = useState(initialFypData?.year || "");
  const [status, setStatus] = useState<FYPStatus>(
    initialFypData?.status || "ongoing",
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const profileData = {
        name,
        bio,
        profilePicture,
      };

      const fypData =
        role === "fyp_student"
          ? {
              projectTitle,
              ideaDescription,
              year,
              status,
            }
          : undefined;

      const res = await fetch("/x9z2k8w5q/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          profile: profileData,
          fypData,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to update profile");
        setLoading(false);
        return;
      }

      setSuccess("Profile updated successfully!");
      setLoading(false);

      // Refresh the page to show updated data
      setTimeout(() => {
        router.refresh();
      }, 1000);
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-background border border-border rounded-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            {success}
          </div>
        )}

        {/* Profile Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">
            Profile Information
          </h2>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Bio
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              placeholder="Tell us about yourself..."
            />
          </div>

          <div>
            <label
              htmlFor="profilePicture"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Profile Picture URL
            </label>
            <input
              id="profilePicture"
              type="url"
              value={profilePicture}
              onChange={(e) => setProfilePicture(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="https://example.com/profile.jpg"
            />
          </div>
        </div>

        {/* FYP Student Section */}
        {role === "fyp_student" && (
          <div className="space-y-4 border-t border-border pt-6">
            <h2 className="text-xl font-bold text-foreground">
              FYP Project Details
            </h2>

            <div>
              <label
                htmlFor="projectTitle"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Project Title
              </label>
              <input
                id="projectTitle"
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Your FYP project title"
              />
            </div>

            <div>
              <label
                htmlFor="ideaDescription"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Idea Description
              </label>
              <textarea
                id="ideaDescription"
                value={ideaDescription}
                onChange={(e) => setIdeaDescription(e.target.value)}
                rows={5}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="Describe your FYP idea and objectives..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Year
                </label>
                <input
                  id="year"
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., 2024-2025"
                />
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Status
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as FYPStatus)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="on_hold">On Hold</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
