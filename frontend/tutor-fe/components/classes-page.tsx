"use client"

import { Textarea } from "@/components/ui/textarea"

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Search, Users, BookOpen, Calendar, FileText } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const classes = [
  {
    id: "1",
    name: "Beginner Mandarin",
    level: "Beginner",
    time: "9:00 AM - 10:30 AM",
    days: "Mon, Wed, Fri",
    students: 12,
    status: "Active",
    nextLesson: "May 22, 2023",
  },
  {
    id: "2",
    name: "Intermediate Conversation",
    level: "Intermediate",
    time: "11:00 AM - 12:30 PM",
    days: "Tue, Thu",
    students: 8,
    status: "Active",
    nextLesson: "May 23, 2023",
  },
  {
    id: "3",
    name: "Advanced Writing",
    level: "Advanced",
    time: "2:00 PM - 3:30 PM",
    days: "Mon, Wed",
    students: 6,
    status: "Active",
    nextLesson: "May 22, 2023",
  },
  {
    id: "4",
    name: "Business Mandarin",
    level: "Intermediate",
    time: "4:00 PM - 5:30 PM",
    days: "Tue, Thu",
    students: 10,
    status: "Upcoming",
    nextLesson: "May 23, 2023",
  },
  {
    id: "5",
    name: "HSK 4 Preparation",
    level: "Intermediate",
    time: "6:00 PM - 7:30 PM",
    days: "Mon, Wed, Fri",
    students: 15,
    status: "Completed",
    nextLesson: "N/A",
  },
  {
    id: "6",
    name: "Chinese Culture & History",
    level: "All Levels",
    time: "10:00 AM - 11:30 AM",
    days: "Sat",
    students: 20,
    status: "Active",
    nextLesson: "May 27, 2023",
  },
  {
    id: "7",
    name: "Pronunciation Workshop",
    level: "Beginner",
    time: "1:00 PM - 2:30 PM",
    days: "Fri",
    students: 8,
    status: "Upcoming",
    nextLesson: "May 26, 2023",
  },
  {
    id: "8",
    name: "HSK 3 Preparation",
    level: "Beginner",
    time: "7:00 PM - 8:30 PM",
    days: "Tue, Thu",
    students: 12,
    status: "Completed",
    nextLesson: "N/A",
  },
]

const students = [
  {
    id: "1",
    name: "Zhang Wei",
    level: "Beginner",
    email: "zhangwei@example.com",
    attendance: "90%",
    avatar: "ZW",
  },
  {
    id: "2",
    name: "Li Mei",
    level: "Intermediate",
    email: "limei@example.com",
    attendance: "85%",
    avatar: "LM",
  },
  {
    id: "3",
    name: "Wang Chen",
    level: "Advanced",
    email: "wangchen@example.com",
    attendance: "95%",
    avatar: "WC",
  },
]

const syllabusItems = [
  {
    id: "1",
    title: "Course Syllabus",
    type: "PDF",
    date: "May 1, 2023",
    size: "1.2 MB",
  },
  {
    id: "2",
    title: "Weekly Schedule",
    type: "PDF",
    date: "May 1, 2023",
    size: "0.8 MB",
  },
  {
    id: "3",
    title: "Grading Rubric",
    type: "PDF",
    date: "May 1, 2023",
    size: "0.5 MB",
  },
]

const calendarEvents = [
  {
    id: "1",
    title: "Lesson: Basic Greetings",
    date: "May 22, 2023",
    time: "9:00 AM - 10:30 AM",
    type: "Lesson",
  },
  {
    id: "2",
    title: "Vocabulary Quiz",
    date: "May 24, 2023",
    time: "9:00 AM - 10:30 AM",
    type: "Quiz",
  },
  {
    id: "3",
    title: "Dragon Boat Festival (Holiday)",
    date: "June 22, 2023",
    time: "All Day",
    type: "Holiday",
  },
  {
    id: "4",
    title: "Midterm Exam",
    date: "July 15, 2023",
    time: "9:00 AM - 11:00 AM",
    type: "Exam",
  },
]

export function ClassesPage() {
  const [filter, setFilter] = useState({
    level: "all",
    status: "all",
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClass, setSelectedClass] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("overview")

  const filteredClasses = classes.filter((classItem) => {
    const levelMatch = filter.level === "all" || classItem.level === filter.level
    const statusMatch = filter.status === "all" || classItem.status === filter.status
    const searchMatch = searchQuery === "" || classItem.name.toLowerCase().includes(searchQuery.toLowerCase())
    return levelMatch && statusMatch && searchMatch
  })

  const selectedClassData = classes.find((c) => c.id === selectedClass)

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
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter class description" rows={3} />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Class</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {selectedClass ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => setSelectedClass(null)}>
                Back to All Classes
              </Button>
              <h2 className="text-2xl font-bold">{selectedClassData?.name}</h2>
              <Badge
                variant={
                  selectedClassData?.status === "Active"
                    ? "default"
                    : selectedClassData?.status === "Upcoming"
                      ? "outline"
                      : "secondary"
                }
              >
                {selectedClassData?.status}
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Edit Class</Button>
              <Button variant="destructive">Delete Class</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Class Details</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="font-medium">Level:</dt>
                    <dd>{selectedClassData?.level}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Time:</dt>
                    <dd>{selectedClassData?.time}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Days:</dt>
                    <dd>{selectedClassData?.days}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Students:</dt>
                    <dd>{selectedClassData?.students}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Next Lesson:</dt>
                    <dd>{selectedClassData?.nextLesson}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Class Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="w-full">
                    <TabsTrigger value="students" className="flex-1">
                      <Users className="mr-2 h-4 w-4" />
                      Students
                    </TabsTrigger>
                    <TabsTrigger value="syllabus" className="flex-1">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Syllabus
                    </TabsTrigger>
                    <TabsTrigger value="calendar" className="flex-1">
                      <Calendar className="mr-2 h-4 w-4" />
                      Calendar
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="students" className="mt-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">Student List</h3>
                      <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Student
                      </Button>
                    </div>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Level</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Attendance</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {students.map((student) => (
                            <TableRow key={student.id}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={student.name} />
                                    <AvatarFallback>{student.avatar}</AvatarFallback>
                                  </Avatar>
                                  <div className="font-medium">{student.name}</div>
                                </div>
                              </TableCell>
                              <TableCell>{student.level}</TableCell>
                              <TableCell>{student.email}</TableCell>
                              <TableCell>{student.attendance}</TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm">
                                  View
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>

                  <TabsContent value="syllabus" className="mt-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">Syllabus Materials</h3>
                      <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Upload
                      </Button>
                    </div>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Size</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {syllabusItems.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <FileText className="h-4 w-4 text-muted-foreground" />
                                  <div className="font-medium">{item.title}</div>
                                </div>
                              </TableCell>
                              <TableCell>{item.type}</TableCell>
                              <TableCell>{item.date}</TableCell>
                              <TableCell>{item.size}</TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm">
                                  Download
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>

                  <TabsContent value="calendar" className="mt-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">Class Calendar</h3>
                      <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Event
                      </Button>
                    </div>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Event</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {calendarEvents.map((event) => (
                            <TableRow key={event.id}>
                              <TableCell>
                                <div className="font-medium">{event.title}</div>
                              </TableCell>
                              <TableCell>{event.date}</TableCell>
                              <TableCell>{event.time}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    event.type === "Lesson"
                                      ? "default"
                                      : event.type === "Quiz"
                                        ? "outline"
                                        : event.type === "Exam"
                                          ? "destructive"
                                          : "secondary"
                                  }
                                >
                                  {event.type}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm">
                                  Edit
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <>
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
                  <TableHead className="hidden md:table-cell">Next Lesson</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClasses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
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
                      <TableCell className="hidden md:table-cell">{classItem.nextLesson}</TableCell>
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
                        <Button variant="ghost" size="sm" onClick={() => setSelectedClass(classItem.id)}>
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  )
}
