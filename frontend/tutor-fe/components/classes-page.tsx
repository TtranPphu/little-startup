"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Plus, Search } from "lucide-react"

const classes = [
  {
    id: "1",
    name: "Beginner Mandarin",
    level: "Beginner",
    time: "9:00 AM - 10:30 AM",
    days: "Mon, Wed, Fri",
    students: 12,
    status: "Active",
  },
  {
    id: "2",
    name: "Intermediate Conversation",
    level: "Intermediate",
    time: "11:00 AM - 12:30 PM",
    days: "Tue, Thu",
    students: 8,
    status: "Active",
  },
  {
    id: "3",
    name: "Advanced Writing",
    level: "Advanced",
    time: "2:00 PM - 3:30 PM",
    days: "Mon, Wed",
    students: 6,
    status: "Active",
  },
  {
    id: "4",
    name: "Business Mandarin",
    level: "Intermediate",
    time: "4:00 PM - 5:30 PM",
    days: "Tue, Thu",
    students: 10,
    status: "Upcoming",
  },
  {
    id: "5",
    name: "HSK 4 Preparation",
    level: "Intermediate",
    time: "6:00 PM - 7:30 PM",
    days: "Mon, Wed, Fri",
    students: 15,
    status: "Completed",
  },
  {
    id: "6",
    name: "Chinese Culture & History",
    level: "All Levels",
    time: "10:00 AM - 11:30 AM",
    days: "Sat",
    students: 20,
    status: "Active",
  },
  {
    id: "7",
    name: "Pronunciation Workshop",
    level: "Beginner",
    time: "1:00 PM - 2:30 PM",
    days: "Fri",
    students: 8,
    status: "Upcoming",
  },
  {
    id: "8",
    name: "HSK 3 Preparation",
    level: "Beginner",
    time: "7:00 PM - 8:30 PM",
    days: "Tue, Thu",
    students: 12,
    status: "Completed",
  },
]

export function ClassesPage() {
  const [filter, setFilter] = useState({
    level: "all",
    status: "all",
  })
  const [searchQuery, setSearchQuery] = useState("")

  const filteredClasses = classes.filter((classItem) => {
    const levelMatch = filter.level === "all" || classItem.level === filter.level
    const statusMatch = filter.status === "all" || classItem.status === filter.status
    const searchMatch = searchQuery === "" || classItem.name.toLowerCase().includes(searchQuery.toLowerCase())
    return levelMatch && statusMatch && searchMatch
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">My Classes</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Class
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Class</DialogTitle>
              <DialogDescription>Fill in the details to create a new class.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Class Name</Label>
                <Input id="name" placeholder="Enter class name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="level">Level</Label>
                  <Select>
                    <SelectTrigger id="level">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="all">All Levels</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" placeholder="e.g. 9:00 AM - 10:30 AM" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="days">Days</Label>
                <Input id="days" placeholder="e.g. Mon, Wed, Fri" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Class</Button>
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
              placeholder="Search classes..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={filter.level} onValueChange={(value) => setFilter({ ...filter, level: value })}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filter.status} onValueChange={(value) => setFilter({ ...filter, status: value })}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Upcoming">Upcoming</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Class Name</TableHead>
              <TableHead>Level</TableHead>
              <TableHead className="hidden md:table-cell">Time</TableHead>
              <TableHead className="hidden md:table-cell">Days</TableHead>
              <TableHead className="hidden md:table-cell">Students</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClasses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No classes found.
                </TableCell>
              </TableRow>
            ) : (
              filteredClasses.map((classItem) => (
                <TableRow key={classItem.id}>
                  <TableCell className="font-medium">{classItem.name}</TableCell>
                  <TableCell>{classItem.level}</TableCell>
                  <TableCell className="hidden md:table-cell">{classItem.time}</TableCell>
                  <TableCell className="hidden md:table-cell">{classItem.days}</TableCell>
                  <TableCell className="hidden md:table-cell">{classItem.students}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Badge
                      variant={
                        classItem.status === "Active"
                          ? "default"
                          : classItem.status === "Upcoming"
                            ? "outline"
                            : "secondary"
                      }
                    >
                      {classItem.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
