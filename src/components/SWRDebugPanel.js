// components/SWRDebugPanel.jsx
"use client";

import { Braces } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSWRConfig } from "swr";

function SafeJSON({ value }) {
  try {
    return (
      <pre className="whitespace-pre-wrap break-words text-gray-200">
        {JSON.stringify(value, null, 2)}
      </pre>
    );
  } catch {
    return <pre className="text-gray-200">{String(value)}</pre>;
  }
}

export default function SWRDebugPanel() {
  const { cache } = useSWRConfig(); // SWR exposes a map-like cache [web:69]
  const [open, setOpen] = useState(true); // overlay visible by default [web:90]
  const [expanded, setExpanded] = useState({}); // key -> boolean for accordion [web:75]
  const [filter, setFilter] = useState(""); // search across keys/values [web:69]
  const [height, setHeight] = useState(0); // JS-controlled height; 0 means unset until mount [web:95]

  // Compute initial height and clamp helpers [web:95]
  useEffect(() => {
    const initial = Math.round(window.innerHeight * 0.6);
    setHeight(initial);
  }, []);

  const minH = 200; // px [web:95]
  const maxH =
    typeof window !== "undefined" ? Math.round(window.innerHeight * 0.9) : 900; // px [web:95]

  const startDrag = (e) => {
    e.preventDefault();
    const startY = e.clientY;
    const startH = height || Math.round(window.innerHeight * 0.6);
    const onMove = (ev) => {
      const delta = startY - ev.clientY; // up increases height [web:95]
      const next = Math.min(maxH, Math.max(minH, startH + delta)); // clamp [web:95]
      setHeight(next);
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  // Build stable, sorted entries from cache [web:69]
  const entries = useMemo(() => {
    const list = [];
    for (const key of cache.keys()) list.push([key, cache.get(key)]);
    list.sort((a, b) => String(a[0]).localeCompare(String(b[0])));
    return list;
  }, [cache]);

  // Filter by key or serialized value [web:69]
  const filtered = useMemo(() => {
    if (!filter) return entries;
    const q = filter.toLowerCase();
    return entries.filter(([k, v]) => {
      if (String(k).toLowerCase().includes(q)) return true;
      try {
        return JSON.stringify(v).toLowerCase().includes(q);
      } catch {
        return false;
      }
    });
  }, [entries, filter]);

  // Accordion toggle per key with ARIA [web:75][web:76]
  const toggle = (key) =>
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  // Escape closes overlay for accessibility [web:90]
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!open) {
    return (
      <button
        aria-label="Open SWR Debug Panel"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-50 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white p-3 shadow border border-white"
      >
        <Braces className="w-4 h-4" />
      </button>
    ); // full-width toggle entry point [web:90]
  }

  return (
    <div
      role="dialog"
      aria-label="SWR Cache Debug Panel"
      className="fixed inset-x-0 bottom-0 w-full bg-gray-900 text-white z-50 shadow-2xl border-t border-gray-800"
      style={{ height: height || "60vh" }}
    >
      {/* Drag handle (height resizer) */}
      <div
        onMouseDown={startDrag}
        className="h-3 cursor-row-resize bg-gray-800 hover:bg-gray-700 flex items-center justify-center select-none"
        title="Drag to resize height"
        aria-label="Resize panel height"
      >
        <div className="h-1 w-16 rounded bg-gray-600" />
      </div>

      {/* Header */}
      <div className="flex items-center gap-2 p-3">
        <h3 className="font-semibold text-cyan-400">SWR Cache Debug</h3>
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter by key or value…"
          className="ml-auto w-full max-w-md rounded bg-gray-800 border border-gray-700 px-2 py-1 text-white placeholder-gray-400"
          aria-label="Filter cache"
        />
        <button
          onClick={() => setOpen(false)}
          className="ml-2 rounded bg-gray-800 hover:bg-gray-700 px-3 py-1"
          title="Close"
        >
          ✕
        </button>
      </div>

      {/* Body: vertically scrollable content area */}
      <div className="h-[calc(100%-3rem-0.75rem)] overflow-y-auto border-t border-gray-800">
        <div className="divide-y divide-gray-800">
          {filtered.length === 0 ? (
            <div className="p-4 text-gray-400">No cache entries.</div>
          ) : (
            filtered.map(([key, value]) => {
              const k = String(key);
              const panelId = `panel-${btoa(k).replace(/=+/g, "")}`;
              const isOpen = !!expanded[k];

              return (
                <section key={k}>
                  <h4 className="bg-gray-950">
                    <button
                      type="button"
                      className="w-full text-left px-4 py-3 hover:bg-gray-800 focus:outline-none focus-visible:ring focus-visible:ring-cyan-500 flex items-center justify-between gap-3"
                      aria-expanded={isOpen} // state for accordion header [web:76]
                      aria-controls={panelId} // associated region id [web:76]
                      onClick={() => toggle(k)}
                      title={isOpen ? "Collapse" : "Expand"}
                    >
                      <span className="truncate text-cyan-300">{k}</span>
                      <span className="shrink-0 text-gray-400">
                        {isOpen ? "▾" : "▸"}
                      </span>
                    </button>
                  </h4>

                  {/* Content renders only when expanded; inner area scrolls vertically */}
                  <div
                    id={panelId}
                    role="region"
                    hidden={!isOpen}
                    className="px-4 pb-4"
                  >
                    <div className="max-h-[40vh] overflow-y-auto rounded border border-gray-800 bg-gray-950 p-3">
                      <SafeJSON value={value} />
                    </div>
                  </div>
                </section>
              );
            })
          )}
        </div>
      </div>
    </div>
  ); // fixed full-width bottom panel with adjustable height [web:90][web:95]
}
