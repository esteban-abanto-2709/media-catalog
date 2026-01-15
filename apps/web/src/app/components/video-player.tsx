"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Pencil, Check, X, Plus, Loader2 } from "lucide-react";
import { formatSize, formatDate } from "@/lib/utils/formatters";
import type { VideoFile, Tag, Producer, Actor } from "../video/[id]/page";

type VideoPlayerProps = {
  video: VideoFile;
};

export default function VideoPlayer({ video: initialVideo }: VideoPlayerProps) {
  // Aseguramos que los arrays existan
  const normalizedVideo = {
    ...initialVideo,
    tags: initialVideo.tags || [],
    producers: initialVideo.producers || [],
    actors: initialVideo.actors || [],
  };
  
  const [video, setVideo] = useState(normalizedVideo);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState("");
  const [saving, setSaving] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [newProducer, setNewProducer] = useState("");
  const [newActor, setNewActor] = useState("");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const videoUrl = `${apiUrl}/videos/${encodeURIComponent(video.id)}/stream`;

  // Normalizar video con arrays por defecto
  const normalizeVideo = (vid: any) => ({
    ...vid,
    tags: vid.tags || [],
    producers: vid.producers || [],
    actors: vid.actors || [],
  });

  // Actualizar campo básico del video
  const updateField = async (field: string, value: string) => {
    setSaving(true);
    try {
      const response = await fetch(`${apiUrl}/videos/${video.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });
      if (response.ok) {
        const updated = await response.json();
        setVideo(normalizeVideo(updated));
      }
    } catch (error) {
      console.error("Error updating video:", error);
    } finally {
      setSaving(false);
      setEditingField(null);
    }
  };

  // Agregar tag
  const addTag = async () => {
    if (!newTag.trim()) return;
    setSaving(true);
    try {
      const response = await fetch(`${apiUrl}/videos/${video.id}/tags`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newTag.trim() }),
      });
      if (response.ok) {
        const updated = await response.json();
        setVideo(normalizeVideo(updated));
        setNewTag("");
      }
    } catch (error) {
      console.error("Error adding tag:", error);
    } finally {
      setSaving(false);
    }
  };

  // Remover tag
  const removeTag = async (tagId: string) => {
    setSaving(true);
    try {
      const response = await fetch(
        `${apiUrl}/videos/${video.id}/tags/${tagId}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        const updated = await response.json();
        setVideo(normalizeVideo(updated));
      }
    } catch (error) {
      console.error("Error removing tag:", error);
    } finally {
      setSaving(false);
    }
  };

  // Agregar producer
  const addProducer = async () => {
    if (!newProducer.trim()) return;
    setSaving(true);
    try {
      const response = await fetch(`${apiUrl}/videos/${video.id}/producers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newProducer.trim() }),
      });
      if (response.ok) {
        const updated = await response.json();
        setVideo(normalizeVideo(updated));
        setNewProducer("");
      }
    } catch (error) {
      console.error("Error adding producer:", error);
    } finally {
      setSaving(false);
    }
  };

  // Remover producer
  const removeProducer = async (producerId: string) => {
    setSaving(true);
    try {
      const response = await fetch(
        `${apiUrl}/videos/${video.id}/producers/${producerId}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        const updated = await response.json();
        setVideo(normalizeVideo(updated));
      }
    } catch (error) {
      console.error("Error removing producer:", error);
    } finally {
      setSaving(false);
    }
  };

  // Agregar actor
  const addActor = async () => {
    if (!newActor.trim()) return;
    setSaving(true);
    try {
      const response = await fetch(`${apiUrl}/videos/${video.id}/actors`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newActor.trim() }),
      });
      if (response.ok) {
        const updated = await response.json();
        setVideo(normalizeVideo(updated));
        setNewActor("");
      }
    } catch (error) {
      console.error("Error adding actor:", error);
    } finally {
      setSaving(false);
    }
  };

  // Remover actor
  const removeActor = async (actorId: string) => {
    setSaving(true);
    try {
      const response = await fetch(
        `${apiUrl}/videos/${video.id}/actors/${actorId}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        const updated = await response.json();
        setVideo(normalizeVideo(updated));
      }
    } catch (error) {
      console.error("Error removing actor:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Library
          </Link>
          {saving && (
            <div className="flex items-center gap-2 text-blue-400 text-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </div>
          )}
        </div>
      </header>

      {/* Player */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-6">
        <div className="w-full max-w-6xl space-y-6">
          {/* Video player */}
          <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
            <video
              src={videoUrl}
              controls
              className="w-full h-full"
              controlsList="nodownload"
            >
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Info del video */}
          <div className="bg-gray-900 rounded-lg p-6 space-y-6">
            {/* Title (editable) */}
            <div className="group">
              {editingField === "title" ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") updateField("title", tempValue);
                      if (e.key === "Escape") setEditingField(null);
                    }}
                    className="flex-1 bg-gray-800 text-white px-3 py-2 rounded text-2xl font-bold outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                  <button
                    onClick={() => updateField("title", tempValue)}
                    className="p-2 bg-blue-600 hover:bg-blue-700 rounded"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setEditingField(null)}
                    className="p-2 bg-gray-700 hover:bg-gray-600 rounded"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold flex-1">{video.title}</h1>
                  <button
                    onClick={() => {
                      setTempValue(video.title);
                      setEditingField("title");
                    }}
                    className="p-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 hover:bg-gray-700 rounded"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Description (editable) */}
            <div className="group">
              <p className="text-sm text-gray-400 mb-2">Description</p>
              {editingField === "description" ? (
                <div className="flex flex-col gap-2">
                  <textarea
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") setEditingField(null);
                    }}
                    className="bg-gray-800 text-white px-3 py-2 rounded outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateField("description", tempValue)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingField(null)}
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3">
                  <p className="flex-1 text-gray-300">
                    {video.description || "No description"}
                  </p>
                  <button
                    onClick={() => {
                      setTempValue(video.description || "");
                      setEditingField("description");
                    }}
                    className="p-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 hover:bg-gray-700 rounded"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Provider URL (editable) */}
            <div className="group">
              <p className="text-sm text-gray-400 mb-2">Provider URL</p>
              {editingField === "providerUrl" ? (
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter")
                        updateField("providerUrl", tempValue);
                      if (e.key === "Escape") setEditingField(null);
                    }}
                    className="flex-1 bg-gray-800 text-white px-3 py-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                  <button
                    onClick={() => updateField("providerUrl", tempValue)}
                    className="p-2 bg-blue-600 hover:bg-blue-700 rounded"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setEditingField(null)}
                    className="p-2 bg-gray-700 hover:bg-gray-600 rounded"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <p className="flex-1 text-gray-300">
                    {video.providerUrl || "No provider URL"}
                  </p>
                  <button
                    onClick={() => {
                      setTempValue(video.providerUrl || "");
                      setEditingField("providerUrl");
                    }}
                    className="p-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 hover:bg-gray-700 rounded"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Created Date (editable) */}
            <div className="group">
              <p className="text-sm text-gray-400 mb-2">Created Date</p>
              {editingField === "createdAt" ? (
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter")
                        updateField("createdAt", tempValue);
                      if (e.key === "Escape") setEditingField(null);
                    }}
                    className="flex-1 bg-gray-800 text-white px-3 py-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                  <button
                    onClick={() => updateField("createdAt", tempValue)}
                    className="p-2 bg-blue-600 hover:bg-blue-700 rounded"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setEditingField(null)}
                    className="p-2 bg-gray-700 hover:bg-gray-600 rounded"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <p className="flex-1 text-gray-300">
                    {video.createdAt
                      ? formatDate(video.createdAt)
                      : "No date set"}
                  </p>
                  <button
                    onClick={() => {
                      const date = video.createdAt
                        ? new Date(video.createdAt).toISOString().split("T")[0]
                        : "";
                      setTempValue(date);
                      setEditingField("createdAt");
                    }}
                    className="p-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 hover:bg-gray-700 rounded"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Tags */}
            <div>
              <p className="text-sm text-gray-400 mb-3">Tags</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {video.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
                  >
                    {tag.name}
                    <button
                      onClick={() => removeTag(tag.id)}
                      disabled={saving}
                      className="hover:bg-blue-700 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") addTag();
                  }}
                  placeholder="Add tag..."
                  className="flex-1 bg-gray-800 text-white px-3 py-2 rounded outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button
                  onClick={addTag}
                  disabled={saving || !newTag.trim()}
                  className="p-2 bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Producers */}
            <div>
              <p className="text-sm text-gray-400 mb-3">Producers</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {video.producers.map((producer) => (
                  <span
                    key={producer.id}
                    className="inline-flex items-center gap-2 bg-purple-600 text-white px-3 py-1 rounded-full text-sm"
                  >
                    {producer.name}
                    <button
                      onClick={() => removeProducer(producer.id)}
                      disabled={saving}
                      className="hover:bg-purple-700 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newProducer}
                  onChange={(e) => setNewProducer(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") addProducer();
                  }}
                  placeholder="Add producer..."
                  className="flex-1 bg-gray-800 text-white px-3 py-2 rounded outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                />
                <button
                  onClick={addProducer}
                  disabled={saving || !newProducer.trim()}
                  className="p-2 bg-purple-600 hover:bg-purple-700 rounded disabled:opacity-50"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Actors */}
            <div>
              <p className="text-sm text-gray-400 mb-3">Actors</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {video.actors.map((actor) => (
                  <span
                    key={actor.id}
                    className="inline-flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-full text-sm"
                  >
                    {actor.name}
                    <button
                      onClick={() => removeActor(actor.id)}
                      disabled={saving}
                      className="hover:bg-green-700 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newActor}
                  onChange={(e) => setNewActor(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") addActor();
                  }}
                  placeholder="Add actor..."
                  className="flex-1 bg-gray-800 text-white px-3 py-2 rounded outline-none focus:ring-2 focus:ring-green-500 text-sm"
                />
                <button
                  onClick={addActor}
                  disabled={saving || !newActor.trim()}
                  className="p-2 bg-green-600 hover:bg-green-700 rounded disabled:opacity-50"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Metadata (no editable) */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm pt-4 border-t border-gray-800">
              <div>
                <p className="text-gray-400">Size</p>
                <p className="font-semibold">{formatSize(video.size)}</p>
              </div>
              <div>
                <p className="text-gray-400">Duration</p>
                <p className="font-semibold">
                  {video.duration ? `${video.duration}s` : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-400">Resolution</p>
                <p className="font-semibold">
                  {video.width && video.height
                    ? `${video.width}x${video.height}`
                    : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-400">Uploaded</p>
                <p className="font-semibold">
                  {formatDate(video.uploadedAt)}
                </p>
              </div>
              <div>
                <p className="text-gray-400">Updated</p>
                <p className="font-semibold">
                  {formatDate(video.updatedAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}