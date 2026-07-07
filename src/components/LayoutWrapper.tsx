"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import React from "react";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideLayout = pathname === "/login";

  return (
    <>
      {!hideLayout && <Navbar />}
      <main className="flex-grow max-w-full mx-auto w-full px-6 py-10">
        {children}
      </main>
      {!hideLayout && <Footer />}
    </>
  );
}