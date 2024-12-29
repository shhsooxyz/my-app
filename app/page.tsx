/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";

export default function Page() {
  const [response, setResponse] = useState<string | null>(null);
  const [dbVersion, setDbVersion] = useState<string | null>(null);

  const [isClient, setIsClient] = useState(false); // For ensuring client-side rendering

  // Initialize state and run only on the client-side
  useEffect(() => {
    setIsClient(true); // Set the flag after client-side mount
  }, []);

  const testConnection = async () => {
    try {
      const res = await fetch("/api/testdb");
      const data = await res.json();
      setResponse(
        data.success
          ? `Connection successful! Timestamp: ${data.timestamp}`
          : `Connection failed: ${data.message}`
      );
    } catch (error: any) {
      setResponse(`Error: ${error.message}`);
    }
  };

  const fetchDbVersion = async () => {
    try {
      const res = await fetch("/api/dbversion");
      const data = await res.json();
      setDbVersion(data.version);
    } catch (error: any) {
      setDbVersion(`Error: ${error.message}`);
    }
  };

  // Ensure that the component only renders on the client
  if (!isClient) {
    return null;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Test PostgreSQL Connection</h1>
      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={testConnection}
      >
        Test Connection
      </button>
      {response && <p>{response}</p>}
      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={fetchDbVersion}
      >
        Fetch PostgreSQL Version
      </button>
      {dbVersion && <p>PostgreSQL Version: {dbVersion}</p>}
    </div>
  );
}
