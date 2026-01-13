"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { CommunityMember } from "@/app/types";

interface CommunityManagerProps {
  initialMembers: CommunityMember[];
}

export default function CommunityManager({
  initialMembers,
}: CommunityManagerProps) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<CommunityMember | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Use initialMembers directly to ensure updates on refresh
  const members = initialMembers;

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roleInCommunity, setRoleInCommunity] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [joinedDate, setJoinedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [isActive, setIsActive] = useState(true);

  const resetForm = () => {
    setName("");
    setEmail("");
    setRoleInCommunity("");
    setBio("");
    setProfilePicture("");
    setLinkedinUrl("");
    setGithubUrl("");
    setWebsiteUrl("");
    setJoinedDate(new Date().toISOString().split("T")[0]);
    setIsActive(true);
    setEditingMember(null);
    setShowForm(false);
    setError("");
    setSuccess("");
  };

  const handleEdit = (member: CommunityMember) => {
    setEditingMember(member);
    setName(member.name);
    setEmail(member.email);
    setRoleInCommunity(member.role_in_community || "");
    setBio(member.bio || "");
    setProfilePicture(member.profile_picture || "");
    setLinkedinUrl(member.linkedin_url || "");
    setGithubUrl(member.github_url || "");
    setWebsiteUrl(member.website_url || "");
    setJoinedDate(member.joined_date || new Date().toISOString().split("T")[0]);
    setIsActive(member.is_active);
    setShowForm(true);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const memberData = {
        name,
        email,
        roleInCommunity,
        bio,
        profilePicture,
        linkedinUrl,
        githubUrl,
        websiteUrl,
        joinedDate,
        isActive,
      };

      const endpoint = editingMember
        ? `/x9z2k8w5q/api/community/${editingMember.id}`
        : "/x9z2k8w5q/api/community";

      const method = editingMember ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(memberData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to save community member");
        setLoading(false);
        return;
      }

      setSuccess(
        editingMember
          ? "Community member updated successfully!"
          : "Community member added successfully!",
      );

      // Refresh immediately
      router.refresh();

      // Reset form after brief delay
      setTimeout(() => {
        resetForm();
      }, 1500);
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  const handleDelete = async (memberId: number) => {
    if (
      !confirm(
        "Are you sure you want to delete this community member? This action cannot be undone.",
      )
    ) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/x9z2k8w5q/api/community/${memberId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to delete community member");
        setLoading(false);
        return;
      }

      setSuccess("Community member deleted successfully!");

      // Refresh immediately
      router.refresh();

      setTimeout(() => {
        setSuccess("");
        setLoading(false);
      }, 1500);
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
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

      {/* Add/Edit Form */}
      {showForm ? (
        <div className="bg-background border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">
              {editingMember ? "Edit Community Member" : "Add Community Member"}
            </h2>
            <button
              onClick={resetForm}
              className="text-muted hover:text-foreground"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  placeholder="Full name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="roleInCommunity"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Role in Community
              </label>
              <input
                id="roleInCommunity"
                type="text"
                value={roleInCommunity}
                onChange={(e) => setRoleInCommunity(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="e.g., President, Member, Vice President"
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
                rows={3}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="Brief bio about the member..."
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
                placeholder="https://example.com/photo.jpg"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="linkedinUrl"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  LinkedIn URL
                </label>
                <input
                  id="linkedinUrl"
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>

              <div>
                <label
                  htmlFor="githubUrl"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  GitHub URL
                </label>
                <input
                  id="githubUrl"
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://github.com/..."
                />
              </div>

              <div>
                <label
                  htmlFor="websiteUrl"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Website URL
                </label>
                <input
                  id="websiteUrl"
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="joinedDate"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Joined Date
                </label>
                <input
                  id="joinedDate"
                  type="date"
                  value={joinedDate}
                  onChange={(e) => setJoinedDate(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="isActive"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Status
                </label>
                <div className="flex items-center h-10">
                  <input
                    id="isActive"
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-2 focus:ring-primary"
                  />
                  <label
                    htmlFor="isActive"
                    className="ml-2 text-sm text-foreground"
                  >
                    Active Member
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-border rounded-lg hover:bg-surface transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Saving..."
                  : editingMember
                    ? "Update Member"
                    : "Add Member"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="w-full py-3 border-2 border-dashed border-border rounded-lg text-primary hover:bg-surface transition-colors font-medium"
        >
          + Add Community Member
        </button>
      )}

      {/* Members List */}
      <div className="space-y-4">
        {members.length === 0 ? (
          <div className="bg-background border border-border rounded-lg p-8 text-center">
            <p className="text-muted">No community members found.</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 text-primary hover:text-primary-dark font-medium"
            >
              Add your first member
            </button>
          </div>
        ) : (
          members.map((member) => (
            <div
              key={member.id}
              className="bg-background border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                {/* Profile Picture */}
                {member.profile_picture ? (
                  <img
                    src={member.profile_picture}
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-700 font-semibold text-xl">
                      {member.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}

                {/* Member Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {member.name}
                      </h3>
                      {member.role_in_community && (
                        <p className="text-sm text-primary font-medium">
                          {member.role_in_community}
                        </p>
                      )}
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        member.is_active
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {member.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <p className="text-sm text-muted mb-3">{member.email}</p>

                  {member.bio && (
                    <p className="text-sm text-foreground mb-3">{member.bio}</p>
                  )}

                  {/* Social Links */}
                  {(member.linkedin_url ||
                    member.github_url ||
                    member.website_url) && (
                    <div className="flex gap-3 mb-3">
                      {member.linkedin_url && (
                        <a
                          href={member.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          LinkedIn
                        </a>
                      )}
                      {member.github_url && (
                        <a
                          href={member.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          GitHub
                        </a>
                      )}
                      {member.website_url && (
                        <a
                          href={member.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          Website
                        </a>
                      )}
                    </div>
                  )}

                  {/* Metadata */}
                  <div className="flex items-center justify-between text-xs text-muted">
                    <span>
                      Joined:{" "}
                      {member.joined_date
                        ? new Date(member.joined_date).toLocaleDateString()
                        : "N/A"}
                    </span>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(member)}
                        disabled={loading}
                        className="text-primary hover:text-primary-dark font-medium disabled:opacity-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(member.id)}
                        disabled={loading}
                        className="text-red-600 hover:text-red-800 font-medium disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
