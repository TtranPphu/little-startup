"use client"

import type React from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 relative">
        <Sidebar />
        <div className="w-full pl-16 bg-background">
          <main className="max-w-7xl mx-auto px-4 py-6 md:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  )
}
