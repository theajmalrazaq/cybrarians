"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { PaperWithAuthor } from "@/app/types";

interface PapersManagerProps {
  userId: number;
  initialPapers: PaperWithAuthor[];
}

export default function PapersManager({
  userId,
  initialPapers,
}: PapersManagerProps) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [editingPaper, setEditingPaper] = useState<PaperWithAuthor | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Use initialPapers directly to ensure updates on refresh
  const papers = initialPapers || [];
  const [success, setSuccess] = useState("");

  // Form fields
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [publishedDate, setPublishedDate] = useState("");

  const resetForm = () => {
    setTitle("");
    setUrl("");
    setDescription("");
    setPublishedDate("");
    setEditingPaper(null);
    setShowForm(false);
    setError("");
    setSuccess("");
  };

  const handleEdit = (paper: PaperWithAuthor) => {
    setEditingPaper(paper);
    setTitle(paper.title);
    setUrl(paper.url);
    setDescription(paper.description || "");
    setPublishedDate(paper.published_date || "");
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
      const paperData = {
        title,
        url,
        description,
        publishedDate,
        userId,
      };

      const endpoint = editingPaper
        ? `/x9z2k8w5q/api/papers/${editingPaper.id}`
        : "/x9z2k8w5q/api/papers";

      const method = editingPaper ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paperData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to save paper");
        setLoading(false);
        return;
      }

      setSuccess(
        editingPaper
          ? "Paper updated successfully!"
          : "Paper added successfully!",
      );

      // Refresh immediately
      router.refresh();

      // Reset form after brief delay
      setTimeout(() => {
        resetForm();
      }, 1500);
      }, 1000);
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  const handleDelete = async (paperId: number) => {
    if (!confirm("Are you sure you want to delete this paper?")) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/x9z2k8w5q/api/papers/${paperId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to delete paper");
        setLoading(false);
        return;
      }

      setSuccess("Paper deleted successfully!");

      // Refresh immediately
      router.refresh();

      setTimeout(() => {
        setSuccess("");
        setLoading(false);
      }, 1500);
      }, 1000);
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
              {editingPaper ? "Edit Paper" : "Add New Paper"}
            </h2>
            <button
              onClick={resetForm}
              className="text-muted hover:text-foreground"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Paper title"
              />
            </div>

            <div>
              <label
                htmlFor="url"
                className="block text-sm font-medium text-foreground mb-2"
              >
                URL <span className="text-red-500">*</span>
              </label>
              <input
                id="url"
                type="url"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="https://example.com/paper.pdf"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="Brief description of the paper..."
              />
            </div>

            <div>
              <label
                htmlFor="publishedDate"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Published Date
              </label>
              <input
                id="publishedDate"
                type="date"
                value={publishedDate}
                onChange={(e) => setPublishedDate(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div className="flex justify-end gap-3">
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
                {loading ? "Saving..." : editingPaper ? "Update" : "Add Paper"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="w-full py-3 border-2 border-dashed border-border rounded-lg text-primary hover:bg-surface transition-colors font-medium"
        >
          + Add New Paper
        </button>
      )}

      {/* Papers List */}
      <div className="space-y-4">
        {papers.length === 0 ? (
          <div className="bg-background border border-border rounded-lg p-8 text-center">
            <p className="text-muted">No papers added yet.</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 text-primary hover:text-primary-dark font-medium"
            >
              Add your first paper
            </button>
          </div>
        ) : (
          papers.map((paper) => (
            <div
              key={paper.id}
              className="bg-background border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {paper.title}
                  </h3>
                  {paper.description && (
                    <p className="text-muted text-sm mb-3">
                      {paper.description}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-sm">
                    <a
                      href={paper.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-medium"
                    >
                      View Paper →
                    </a>
                    {paper.published_date && (
                      <span className="text-muted">
                        Published:{" "}
                        {new Date(paper.published_date).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(paper)}
                    disabled={loading}
                    className="px-3 py-1 text-sm text-primary hover:bg-blue-50 rounded transition-colors disabled:opacity-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(paper.id)}
                    disabled={loading}
                    className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
