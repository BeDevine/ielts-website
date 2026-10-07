"use client";

import { useEffect } from "react";

// Counts each real browser once per day. Runs only after the page loads in a
// browser, so most scrapers (which never run page scripts) aren't counted.
export default function VisitCounter() {
  useEffect(() => {
    try {
      if (navigator.webdriver) return; // automated browser
      const today = new Date().toISOString().slice(0, 10);
      if (localStorage.getItem("visit_counted") === today) return;
      localStorage.setItem("visit_counted", today);
      fetch("/api/visit", { method: "POST", keepalive: true }).catch(() => {});
    } catch {
      // storage unavailable - skip quietly
    }
  }, []);

  return null;
}
