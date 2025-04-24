"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Search, Download, CalendarIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

const attendanceRecords = [
  {
    id: "1",
    date: "2023-05-20",
    class: "Beginner Mandarin",
    student: "Zhang Wei",
    status: "Present",
    avatar: "ZW",
  },
  {
    id: "2",
    date: "2023-05-20",
    class: "Beginner Mandarin",
    student: "Sun Ling",
    status: "Present",
    avatar: "SL",
  },
  {
    id: "3",
    date: "2023-05-20",
    class: "Beginner Mandarin",
    student: "Wu Fang",
    status: "Absent",
    avatar: "WF",
  },
  {
    id: "4",
    date: "2023-05-19",
    class: "Intermediate Conversation",
    student: "Li Mei",
    status: "Present",
    avatar: "LM",
  },
  {
    id: "5",
    date: "2023-05-19",
    class: "Intermediate Conversation",
    student: "Zhao Ming",
    status: "Late",
    avatar: "ZM",
  },
  {
    id: "6",
    date: "2023-05-18",
    class: "Advanced Writing",
    student: "Wang Chen",
    status: "Present",
    avatar: "WC",
  },
  {
    id: "7",
    date: "2023-05-18",
    class: "Advanced Writing",
    student: "Chen Jie",
    status: "Present",
    avatar: "CJ",
  },
  {
    id: "8",
    date: "2023-05-17",
    class: "HSK 4 Preparation",
    student: "Liu Yang",
    status: "Absent",
    avatar: "LY",
  },
  {
    id: "9",
    date: "2023-05-17",
    class: "Beginner Mandarin",
    student: "Zhang Wei",
    status: "Present",
    avatar: "ZW",
  },
  {
    id: "10",
    date: "2023-05-16",
    class: "Intermediate Conversation",
    student: "Li Mei",
    status: "Late",
    avatar: "LM",
  },
]

export function AttendancePage() {
  const [filter, setFilter] = useState({
    class: "all",
    status: "all",
    date: null,
  })
  const [searchQuery, setSearchQuery] = useState("")

  const filteredAttendance = attendanceRecords.filter((record) => {
    const classMatch = filter.class === "all" || record.class === filter.class
    const statusMatch = filter.status === "all" || record.status === filter.status
    const dateMatch = !filter.date || record.date === format(filter.date, "yyyy-MM-dd")
    const searchMatch = searchQuery === "" || record.student.toLowerCase().includes(searchQuery.toLowerCase())
    return classMatch && statusMatch && dateMatch && searchMatch
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Attendance Tracker</h1>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search students..."
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
              <SelectItem value="HSK 4 Preparation">HSK 4 Preparation</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filter.status} onValueChange={(value) => setFilter({ ...filter, status: value })}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Present">Present</SelectItem>
              <SelectItem value="Absent">Absent</SelectItem>
              <SelectItem value="Late">Late</SelectItem>
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[180px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filter.date ? format(filter.date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={filter.date}
                onSelect={(date) => setFilter({ ...filter, date })}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAttendance.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No attendance records found.
                </TableCell>
              </TableRow>
            ) : (
              filteredAttendance.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.class}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={record.student} />
                        <AvatarFallback>{record.avatar}</AvatarFallback>
                      </Avatar>
                      <div>{record.student}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        record.status === "Present" ? "default" : record.status === "Late" ? "outline" : "destructive"
                      }
                    >
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Select defaultValue={record.status.toLowerCase()}>
                      <SelectTrigger className="w-[110px]">
                        <SelectValue placeholder="Change status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="present">Present</SelectItem>
                        <SelectItem value="absent">Absent</SelectItem>
                        <SelectItem value="late">Late</SelectItem>
                      </SelectContent>
                    </Select>
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
