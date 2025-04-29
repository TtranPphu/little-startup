"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart, BookOpen, Calendar, FileText, Home, MessageSquare, Megaphone, FolderOpen, User } from "lucide-react"
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

export function Sidebar() {
  const pathname = usePathname()

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
    <SidebarComponent>
      <SidebarHeader className="flex h-14 items-center border-b px-4 md:hidden">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="text-xl text-primary">汉语学习</span>
          <span className="text-lg">Teacher Portal</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navigation.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.name}>
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </SidebarComponent>
  )
}
