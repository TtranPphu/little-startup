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
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search, Eye, Edit, Trash } from "lucide-react"

const assignments = [
  {
    id: "1",
    title: "Character Writing Practice",
    class: "Beginner Mandarin",
    deadline: "May 22, 11:59 PM",
    submissions: "8/12",
    status: "Open",
  },
  {
    id: "2",
    title: "Dialogue Recording",
    class: "Intermediate Conversation",
    deadline: "May 25, 11:59 PM",
    submissions: "3/8",
    status: "Open",
  },
  {
    id: "3",
    title: "Essay on Chinese Culture",
    class: "Advanced Writing",
    deadline: "May 23, 11:59 PM",
    submissions: "1/6",
    status: "Due Soon",
  },
  {
    id: "4",
    title: "Vocabulary Quiz",
    class: "HSK 4 Preparation",
    deadline: "May 20, 11:59 PM",
    submissions: "0/15",
    status: "Past Due",
  },
  {
    id: "5",
    title: "Reading Comprehension",
    class: "Intermediate Conversation",
    deadline: "May 18, 11:59 PM",
    submissions: "8/8",
    status: "Completed",
  },
  {
    id: "6",
    title: "Business Email Writing",
    class: "Business Mandarin",
    deadline: "May 27, 11:59 PM",
    submissions: "0/10",
    status: "Open",
  },
  {
    id: "7",
    title: "Pronunciation Recording",
    class: "Beginner Mandarin",
    deadline: "May 24, 11:59 PM",
    submissions: "5/12",
    status: "Open",
  },
  {
    id: "8",
    title: "Grammar Exercise",
    class: "HSK 3 Preparation",
    deadline: "May 19, 11:59 PM",
    submissions: "10/12",
    status: "Completed",
  },
]

export function AssignmentsPage() {
  const [filter, setFilter] = useState({
    class: "all",
    status: "all",
  })
  const [searchQuery, setSearchQuery] = useState("")

  const filteredAssignments = assignments.filter((assignment) => {
    const classMatch = filter.class === "all" || assignment.class === filter.class
    const statusMatch = filter.status === "all" || assignment.status === filter.status
    const searchMatch = searchQuery === "" || assignment.title.toLowerCase().includes(searchQuery.toLowerCase())
    return classMatch && statusMatch && searchMatch
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Assignment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Create New Assignment</DialogTitle>
              <DialogDescription>Fill in the details to create a new assignment.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Assignment Title</Label>
                <Input id="title" placeholder="Enter assignment title" />
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
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter assignment description" rows={4} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input id="deadline" type="datetime-local" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="points">Points</Label>
                  <Input id="points" type="number" placeholder="100" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Assignment</Button>
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
              placeholder="Search assignments..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
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
          <Select value={filter.status} onValueChange={(value) => setFilter({ ...filter, status: value })}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Open">Open</SelectItem>
              <SelectItem value="Due Soon">Due Soon</SelectItem>
              <SelectItem value="Past Due">Past Due</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Assignment Title</TableHead>
              <TableHead className="hidden md:table-cell">Class</TableHead>
              <TableHead className="hidden md:table-cell">Deadline</TableHead>
              <TableHead className="hidden md:table-cell">Submissions</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAssignments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No assignments found.
                </TableCell>
              </TableRow>
            ) : (
              filteredAssignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell className="font-medium">{assignment.title}</TableCell>
                  <TableCell className="hidden md:table-cell">{assignment.class}</TableCell>
                  <TableCell className="hidden md:table-cell">{assignment.deadline}</TableCell>
                  <TableCell className="hidden md:table-cell">{assignment.submissions}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        assignment.status === "Open"
                          ? "default"
                          : assignment.status === "Due Soon"
                            ? "outline"
                            : assignment.status === "Past Due"
                              ? "destructive"
                              : "secondary"
                      }
                    >
                      {assignment.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
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
