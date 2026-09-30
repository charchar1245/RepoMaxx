"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("Not called yet");
  const [loading, setLoading] = useState(false);

  async function callBackend() {
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hello`);
      const data = await response.json();

      setMessage(data.message);
    } catch (error) {
      setMessage("Error contacting backend");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: "2rem" }}>
      <button onClick={callBackend} disabled={loading}>
        {loading ? "Calling..." : "Call backend"}
      </button>

      <p style={{ marginTop: "1rem" }}>{message}</p>
    </main>
  );
}