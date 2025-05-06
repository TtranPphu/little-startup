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
import { Search, Plus, Edit, Trash, Calendar } from "lucide-react"
import { Switch } from "@/components/ui/switch"

const announcements = [
  {
    id: "1",
    title: "End of Term Celebration",
    target: "All Classes",
    date: "May 20, 2023",
    status: "Published",
    content:
      "Join us for an end of term celebration on June 15th at 6:00 PM. There will be food, performances, and certificate presentations.",
  },
  {
    id: "2",
    title: "HSK Exam Registration Deadline",
    target: "HSK 4 Preparation",
    date: "May 18, 2023",
    status: "Published",
    content:
      "The registration deadline for the next HSK exam is May 30th. Please register online through the official HSK website.",
  },
  {
    id: "3",
    title: "Summer Intensive Course",
    target: "All Classes",
    date: "May 15, 2023",
    status: "Published",
    content:
      "Registration is now open for our summer intensive Mandarin course. The course will run from July 1st to August 15th.",
  },
  {
    id: "4",
    title: "New Learning Resources",
    target: "Intermediate Conversation",
    date: "May 10, 2023",
    status: "Draft",
    content:
      "We have added new conversation practice materials to the resource library. These include audio files and transcripts for self-study.",
  },
  {
    id: "5",
    title: "Parent-Teacher Conference",
    target: "Beginner Mandarin",
    date: "May 5, 2023",
    status: "Published",
    content:
      "We will be holding parent-teacher conferences on May 25th and 26th. Please sign up for a time slot using the online scheduling tool.",
  },
]

export function AnnouncementsPage() {
  const [filter, setFilter] = useState({
    target: "all",
    status: "all",
  })
  const [searchQuery, setSearchQuery] = useState("")

  const filteredAnnouncements = announcements.filter((announcement) => {
    const targetMatch = filter.target === "all" || announcement.target === filter.target
    const statusMatch = filter.status === "all" || announcement.status === filter.status
    const searchMatch = searchQuery === "" || announcement.title.toLowerCase().includes(searchQuery.toLowerCase())
    return targetMatch && statusMatch && searchMatch
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Announcements</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Announcement
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Create New Announcement</DialogTitle>
              <DialogDescription>Create an announcement for your students.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter announcement title" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="target">Target Audience</Label>
                <Select>
                  <SelectTrigger id="target">
                    <SelectValue placeholder="Select target audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    <SelectItem value="beginner">Beginner Mandarin</SelectItem>
                    <SelectItem value="intermediate">Intermediate Conversation</SelectItem>
                    <SelectItem value="advanced">Advanced Writing</SelectItem>
                    <SelectItem value="business">Business Mandarin</SelectItem>
                    <SelectItem value="hsk4">HSK 4 Preparation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Content</Label>
                <Textarea id="content" placeholder="Enter announcement content" rows={6} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="schedule">Schedule Post</Label>
                <div className="flex items-center gap-4">
                  <Switch id="schedule" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="schedule-date">Date</Label>
                    <div className="flex items-center gap-2">
                      <Input id="schedule-date" type="date" className="w-[180px]" disabled />
                      <Input id="schedule-time" type="time" className="w-[120px]" disabled />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue="draft">
                  <SelectTrigger id="status" className="w-[180px]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Announcement</Button>
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
              placeholder="Search announcements..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={filter.target} onValueChange={(value) => setFilter({ ...filter, target: value })}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by target" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Targets</SelectItem>
              <SelectItem value="All Classes">All Classes</SelectItem>
              <SelectItem value="Beginner Mandarin">Beginner Mandarin</SelectItem>
              <SelectItem value="Intermediate Conversation">Intermediate Conversation</SelectItem>
              <SelectItem value="Advanced Writing">Advanced Writing</SelectItem>
              <SelectItem value="HSK 4 Preparation">HSK 4 Preparation</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filter.status} onValueChange={(value) => setFilter({ ...filter, status: value })}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Published">Published</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-4">
        {filteredAnnouncements.length === 0 ? (
          <div className="flex h-24 items-center justify-center rounded-md border">
            <p className="text-muted-foreground">No announcements found.</p>
          </div>
        ) : (
          filteredAnnouncements.map((announcement) => (
            <div key={announcement.id} className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="flex flex-col space-y-1.5 p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold leading-none tracking-tight">{announcement.title}</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant={announcement.status === "Published" ? "default" : "outline"}>
                      {announcement.status}
                    </Badge>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{announcement.date}</span>
                  <span>•</span>
                  <span>{announcement.target}</span>
                </div>
              </div>
              <div className="p-6 pt-0">{announcement.content}</div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
