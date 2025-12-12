"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

let registered = false;

// Register plugins only on the client to avoid SSR crashes
if (typeof window !== "undefined" && typeof document !== "undefined") {
  try {
    if (!registered) {
      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, MotionPathPlugin);
      registered = true;
      console.log("[gsap] plugins registered on client");
    }
  } catch (error) {
    console.error("[gsap] plugin registration failed", error);
  }
}

export const refreshScrollTrigger = () => {
  if (typeof window === "undefined") return;
  try {
    ScrollTrigger.refresh();
  } catch (error) {
    console.error("[gsap] refresh error", error);
  }
};

export const killAllScrollTriggers = () => {
  if (typeof window === "undefined") return;
  try {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  } catch (error) {
    console.error("[gsap] kill all error", error);
  }
};

export { gsap, ScrollTrigger, ScrollToPlugin, MotionPathPlugin };

