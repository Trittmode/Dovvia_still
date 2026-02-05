"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const getSessionId = (): string => {
  if (typeof window === "undefined") return "";

  let sessionId = sessionStorage.getItem("analytics_session_id");

  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    sessionStorage.setItem("analytics_session_id", sessionId);
  }

  return sessionId;
};

const trackPageView = async (pathname: string) => {
  try {
    const sessionId = getSessionId();

    const analyticsData = {
      pagePath: pathname,
      pageTitle: document.title,
      referrer: document.referrer,
      sessionId: sessionId,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    await fetch("/api/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(analyticsData),
    });
  } catch (error) {
    console.error("Failed to track page view:", error);
  }
};

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  return null;
}
