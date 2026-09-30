"use client";

import { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("Not called yet");
  const [loading, setLoading] = useState(false);

  async function createIncident(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/incidents`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description}),
      }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage("Failed to create incident: " + data.detail);
      }

      setMessage(`Incident #${data.id} created successfully`);
      setTitle("");
      setDescription("");
    } catch (error) {
      setMessage("Error creating incident");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold mb-2">RepoMaxx</h1>

        <p className="text-gray-400 mb-8">
          Create a new software incident for investigation.
        </p>

        <form onSubmit={createIncident} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">
              Incident title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="API returning 500 errors"
              className="w-full rounded-lg bg-gray-800 border border-gray-700 px-4 py-3 outline-none focus:border-gray-500"
              required
              />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a detailed description of the incident..."
              className="w-full rounded-lg bg-gray-800 border border-gray-700 px-4 py-3 outline-none focus:border-gray-500"
              rows={4}
              required
            />
          </div>


          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Incident"}
          </button>
        </form>

        {message && (
          <p className="mt-5 text-sm text-gray-300">
            {message}
          </p>
        )}
      </div>
    </main>
  );
}