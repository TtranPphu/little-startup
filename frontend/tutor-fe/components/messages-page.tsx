"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Star, StarOff } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const messages = [
  {
    id: "1",
    sender: "Zhang Wei",
    subject: "Question about homework",
    class: "Beginner Mandarin",
    time: "10:30 AM",
    status: "Unread",
    starred: false,
    avatar: "ZW",
    preview: "Hello Teacher, I have a question about the character writing homework...",
  },
  {
    id: "2",
    sender: "Li Mei",
    subject: "Absence notification",
    class: "Intermediate Conversation",
    time: "Yesterday",
    status: "Read",
    starred: true,
    avatar: "LM",
    preview: "Dear Teacher, I will not be able to attend class tomorrow due to a doctor's appointment...",
  },
  {
    id: "3",
    sender: "Wang Chen",
    subject: "Extra practice materials",
    class: "Advanced Writing",
    time: "Yesterday",
    status: "Unread",
    starred: false,
    avatar: "WC",
    preview: "Could you please provide some additional practice materials for the upcoming exam?",
  },
  {
    id: "4",
    sender: "Liu Yang",
    subject: "Assignment extension request",
    class: "HSK 4 Preparation",
    time: "May 19",
    status: "Read",
    starred: false,
    avatar: "LY",
    preview: "I'm writing to request an extension for the essay assignment due this Friday...",
  },
  {
    id: "5",
    sender: "Sun Ling",
    subject: "Thank you",
    class: "Beginner Mandarin",
    time: "May 18",
    status: "Read",
    starred: true,
    avatar: "SL",
    preview: "Thank you for the additional help during office hours yesterday. It was very helpful!",
  },
  {
    id: "6",
    sender: "Zhao Ming",
    subject: "Business vocabulary list",
    class: "Business Mandarin",
    time: "May 17",
    status: "Read",
    starred: false,
    avatar: "ZM",
    preview: "Could you share the business vocabulary list that you mentioned in class?",
  },
  {
    id: "7",
    sender: "Chen Jie",
    subject: "Writing feedback",
    class: "Advanced Writing",
    time: "May 16",
    status: "Read",
    starred: false,
    avatar: "CJ",
    preview: "I received your feedback on my essay. Thank you for the detailed comments.",
  },
]

export function MessagesPage() {
  const [filter, setFilter] = useState({
    status: "all",
    class: "all",
    starred: "all",
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [activeMessages, setActiveMessages] = useState(messages)

  const filteredMessages = activeMessages.filter((message) => {
    const statusMatch =
      filter.status === "all" ||
      (filter.status === "unread" && message.status === "Unread") ||
      (filter.status === "read" && message.status === "Read")
    const classMatch = filter.class === "all" || message.class === filter.class
    const starredMatch =
      filter.starred === "all" ||
      (filter.starred === "starred" && message.starred) ||
      (filter.starred === "unstarred" && !message.starred)
    const searchMatch =
      searchQuery === "" ||
      message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchQuery.toLowerCase())
    return statusMatch && classMatch && starredMatch && searchMatch
  })

  const toggleStar = (id) => {
    setActiveMessages(
      activeMessages.map((message) => (message.id === id ? { ...message, starred: !message.starred } : message)),
    )
  }

  const markAsRead = (id) => {
    setActiveMessages(activeMessages.map((message) => (message.id === id ? { ...message, status: "Read" } : message)))
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Message
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Compose New Message</DialogTitle>
              <DialogDescription>Send a message to a student or class.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="recipient">Recipient</Label>
                <Select>
                  <SelectTrigger id="recipient">
                    <SelectValue placeholder="Select recipient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zhang">Zhang Wei</SelectItem>
                    <SelectItem value="li">Li Mei</SelectItem>
                    <SelectItem value="wang">Wang Chen</SelectItem>
                    <SelectItem value="liu">Liu Yang</SelectItem>
                    <SelectItem value="sun">Sun Ling</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="class">Class</Label>
                <Select>
                  <SelectTrigger id="class">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner Mandarin</SelectItem>
                    <SelectItem value="intermediate">Intermediate Conversation</SelectItem>
                    <SelectItem value="advanced">Advanced Writing</SelectItem>
                    <SelectItem value="business">Business Mandarin</SelectItem>
                    <SelectItem value="hsk4">HSK 4 Preparation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Enter message subject" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Enter your message" rows={6} />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Send Message</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search messages..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={filter.status} onValueChange={(value) => setFilter({ ...filter, status: value })}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Messages</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
              <SelectItem value="read">Read</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filter.class} onValueChange={(value) => setFilter({ ...filter, class: value })}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              <SelectItem value="Beginner Mandarin">Beginner Mandarin</SelectItem>
              <SelectItem value="Intermediate Conversation">Intermediate Conversation</SelectItem>
              <SelectItem value="Advanced Writing">Advanced Writing</SelectItem>
              <SelectItem value="Business Mandarin">Business Mandarin</SelectItem>
              <SelectItem value="HSK 4 Preparation">HSK 4 Preparation</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filter.starred} onValueChange={(value) => setFilter({ ...filter, starred: value })}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by starred" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Messages</SelectItem>
              <SelectItem value="starred">Starred</SelectItem>
              <SelectItem value="unstarred">Unstarred</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="rounded-md border">
        {filteredMessages.length === 0 ? (
          <div className="flex h-24 items-center justify-center">
            <p className="text-muted-foreground">No messages found.</p>
          </div>
        ) : (
          <div className="divide-y">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`flex cursor-pointer items-start gap-4 p-4 hover:bg-muted/50 ${
                  message.status === "Unread" ? "bg-muted/20" : ""
                }`}
                onClick={() => markAsRead(message.id)}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={message.sender} />
                  <AvatarFallback>{message.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{message.sender}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{message.time}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleStar(message.id)
                        }}
                      >
                        {message.starred ? (
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ) : (
                          <StarOff className="h-4 w-4" />
                        )}
                        <span className="sr-only">{message.starred ? "Unstar" : "Star"}</span>
                      </Button>
                    </div>
                  </div>
                  <div className="font-medium">{message.subject}</div>
                  <div className="text-sm text-muted-foreground line-clamp-1">{message.preview}</div>
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-muted-foreground">{message.class}</div>
                    {message.status === "Unread" && (
                      <Badge variant="secondary" className="text-xs">
                        New
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
