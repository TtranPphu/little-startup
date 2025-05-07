"use client"

import { useState } from "react"
import { Check, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const notifications = [
  {
    id: "1",
    title: "New assignment submission",
    summary: "Zhang Wei submitted Character Writing Practice",
    timestamp: "10 minutes ago",
    read: false,
    category: "assignment",
  },
  {
    id: "2",
    title: "Class schedule change",
    summary: "Intermediate Conversation moved to Room 302",
    timestamp: "1 hour ago",
    read: false,
    category: "schedule",
  },
  {
    id: "3",
    title: "New message",
    summary: "Li Mei sent you a message about their absence",
    timestamp: "3 hours ago",
    read: false,
    category: "message",
  },
  {
    id: "4",
    title: "Assignment due soon",
    summary: "Essay on Chinese Culture due in 2 days",
    timestamp: "Yesterday",
    read: true,
    category: "assignment",
  },
  {
    id: "5",
    title: "System update",
    summary: "New features added to the grading system",
    timestamp: "2 days ago",
    read: true,
    category: "system",
  },
]

export function NotificationsPanel() {
  const [activeNotifications, setActiveNotifications] = useState(notifications)

  const markAsRead = (id: string) => {
    setActiveNotifications(
      activeNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    )
  }

  const markAllAsRead = () => {
    setActiveNotifications(activeNotifications.map((notification) => ({ ...notification, read: true })))
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b px-4 py-2">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>All notifications</DropdownMenuItem>
              <DropdownMenuItem>Assignments</DropdownMenuItem>
              <DropdownMenuItem>Messages</DropdownMenuItem>
              <DropdownMenuItem>Schedule changes</DropdownMenuItem>
              <DropdownMenuItem>System updates</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="sm" onClick={markAllAsRead}>
            <Check className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
        </div>
      </div>
      <Tabs defaultValue="all" className="flex-1">
        <div className="border-b px-4">
          <TabsList className="w-full justify-start rounded-none border-b-0 p-0">
            <TabsTrigger
              value="all"
              className="relative rounded-none border-b-2 border-b-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="unread"
              className="relative rounded-none border-b-2 border-b-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground"
            >
              Unread
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="all" className="flex-1 p-0">
          <div className="flex flex-col divide-y">
            {activeNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex cursor-pointer flex-col gap-1 p-4 hover:bg-muted/50 ${
                  notification.read ? "" : "bg-muted/20"
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{notification.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                    {!notification.read && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{notification.summary}</p>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="unread" className="flex-1 p-0">
          <div className="flex flex-col divide-y">
            {activeNotifications
              .filter((notification) => !notification.read)
              .map((notification) => (
                <div
                  key={notification.id}
                  className="flex cursor-pointer flex-col gap-1 bg-muted/20 p-4 hover:bg-muted/50"
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{notification.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.summary}</p>
                </div>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
