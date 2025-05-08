"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Plus, Search, FileText, Copy, Trash, CalendarIcon } from "lucide-react"
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
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const lessonPlans = [
  {
    id: "1",
    title: "Introduction to Basic Characters",
    class: "Beginner Mandarin",
    date: "2023-05-22",
    status: "Upcoming",
    template: false,
  },
  {
    id: "2",
    title: "Conversation Practice: Daily Routines",
    class: "Intermediate Conversation",
    date: "2023-05-23",
    status: "Upcoming",
    template: false,
  },
  {
    id: "3",
    title: "Advanced Writing Techniques",
    class: "Advanced Writing",
    date: "2023-05-24",
    status: "Draft",
    template: false,
  },
  {
    id: "4",
    title: "Business Vocabulary and Phrases",
    class: "Business Mandarin",
    date: "2023-05-25",
    status: "Draft",
    template: false,
  },
  {
    id: "5",
    title: "HSK 4 Exam Preparation",
    class: "HSK 4 Preparation",
    date: "2023-05-26",
    status: "Template",
    template: true,
  },
]

export function LessonPlansPage() {
  const [filter, setFilter] = useState({
    class: "all",
    status: "all",
    date: null,
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [date, setDate] = useState<Date | undefined>(new Date())

  const filteredLessonPlans = lessonPlans.filter((plan) => {
    const classMatch = filter.class === "all" || plan.class === filter.class
    const statusMatch = filter.status === "all" || plan.status === filter.status
    const dateMatch = !filter.date || plan.date === format(filter.date, "yyyy-MM-dd")
    const searchMatch = searchQuery === "" || plan.title.toLowerCase().includes(searchQuery.toLowerCase())
    return classMatch && statusMatch && dateMatch && searchMatch
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Lesson Plans</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Lesson Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Lesson Plan</DialogTitle>
              <DialogDescription>Create a new lesson plan or use a template.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Lesson Title</Label>
                <Input id="title" placeholder="Enter lesson title" />
              </div>
              <div className="grid grid-cols-2 gap-4">
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
                  <Label htmlFor="date">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal" id="date">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="objectives">Learning Objectives</Label>
                <Textarea id="objectives" placeholder="Enter learning objectives" rows={2} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="activities">Activities</Label>
                <Textarea id="activities" placeholder="Enter lesson activities" rows={4} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="materials">Materials Needed</Label>
                <Textarea id="materials" placeholder="Enter required materials" rows={2} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="assessment">Assessment</Label>
                <Textarea id="assessment" placeholder="Enter assessment methods" rows={2} />
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="save-template" className="flex-1">
                  Save as template for future use
                </Label>
                <input type="checkbox" id="save-template" className="h-4 w-4" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Lesson Plan</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <TabsList>
            <TabsTrigger value="all">All Plans</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 md:max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search lesson plans..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
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
          </div>
        </div>
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredLessonPlans.length === 0 ? (
              <div className="col-span-full flex h-24 items-center justify-center rounded-md border">
                <p className="text-muted-foreground">No lesson plans found.</p>
              </div>
            ) : (
              filteredLessonPlans.map((plan) => (
                <Card key={plan.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge
                        variant={
                          plan.status === "Upcoming" ? "default" : plan.status === "Draft" ? "outline" : "secondary"
                        }
                      >
                        {plan.status}
                      </Badge>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon">
                          <Copy className="h-4 w-4" />
                          <span className="sr-only">Duplicate</span>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{plan.title}</CardTitle>
                    <CardDescription>{plan.class}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <span>{plan.date}</span>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm" className="w-full">
                        <FileText className="mr-2 h-4 w-4" />
                        {plan.status === "Template" ? "Use Template" : "Edit Plan"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredLessonPlans
              .filter((plan) => plan.status === "Upcoming")
              .map((plan) => (
                <Card key={plan.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="default">{plan.status}</Badge>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon">
                          <Copy className="h-4 w-4" />
                          <span className="sr-only">Duplicate</span>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{plan.title}</CardTitle>
                    <CardDescription>{plan.class}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <span>{plan.date}</span>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm" className="w-full">
                        <FileText className="mr-2 h-4 w-4" />
                        Edit Plan
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="drafts" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredLessonPlans
              .filter((plan) => plan.status === "Draft")
              .map((plan) => (
                <Card key={plan.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{plan.status}</Badge>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon">
                          <Copy className="h-4 w-4" />
                          <span className="sr-only">Duplicate</span>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{plan.title}</CardTitle>
                    <CardDescription>{plan.class}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <span>{plan.date}</span>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm" className="w-full">
                        <FileText className="mr-2 h-4 w-4" />
                        Edit Draft
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredLessonPlans
              .filter((plan) => plan.status === "Template")
              .map((plan) => (
                <Card key={plan.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{plan.status}</Badge>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon">
                          <Copy className="h-4 w-4" />
                          <span className="sr-only">Duplicate</span>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{plan.title}</CardTitle>
                    <CardDescription>{plan.class}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm" className="w-full">
                        <FileText className="mr-2 h-4 w-4" />
                        Use Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
