"use client";

import { DemoProvider } from "@/lib/demo-state";

export function Providers({ children }: { children: React.ReactNode }) {
  return <DemoProvider>{children}</DemoProvider>;
}
