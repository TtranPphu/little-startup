"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart,
  BookOpen,
  Calendar,
  FileText,
  Home,
  MessageSquare,
  Megaphone,
  FolderOpen,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"

export function Sidebar() {
  const pathname = usePathname()
  const [expanded, setExpanded] = useState(false)
  const [pinned, setPinned] = useState(false)

  const navigation = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "My Classes", href: "/classes", icon: BookOpen },
    { name: "Assignments", href: "/assignments", icon: FileText },
    { name: "Student Progress", href: "/student-progress", icon: BarChart },
    { name: "Attendance", href: "/attendance", icon: Calendar },
    { name: "Messages", href: "/messages", icon: MessageSquare },
    { name: "Announcements", href: "/announcements", icon: Megaphone },
    { name: "Resources", href: "/resources", icon: FolderOpen },
    { name: "Profile & Settings", href: "/profile", icon: User },
  ]

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out",
        expanded || pinned ? "w-64" : "w-16",
        "bg-sidebar text-sidebar-foreground",
      )}
      onMouseEnter={() => !pinned && setExpanded(true)}
      onMouseLeave={() => !pinned && setExpanded(false)}
    >
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        <div className={cn("flex items-center gap-2", !expanded && !pinned && "hidden")}>
          <span className="text-xl text-primary">汉语学习</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className={cn("ml-auto", !expanded && !pinned && "hidden")}
          onClick={() => {
            setPinned(!pinned)
          }}
        >
          {pinned ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          <span className="sr-only">{pinned ? "Unpin Sidebar" : "Pin Sidebar"}</span>
        </Button>
      </div>
      <nav className="flex flex-col gap-1 p-2">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex h-10 items-center gap-3 rounded-md px-3 transition-colors",
              pathname === item.href
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
              !expanded && !pinned && "justify-center",
            )}
          >
            <item.icon className="h-5 w-5 shrink-0" />
            <span className={cn("truncate", !expanded && !pinned && "hidden")}>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}
