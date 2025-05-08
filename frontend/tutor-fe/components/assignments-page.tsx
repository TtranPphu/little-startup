"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Calendar, FileText, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const assignments = [
  {
    id: "1",
    title: "Character Writing Practice",
    class: "Beginner Mandarin",
    deadline: "May 22, 11:59 PM",
    submissions: "8/12",
    status: "Open",
    description:
      "Practice writing the 20 new characters introduced in this week's lesson. Submit clear images of your handwritten characters.",
    instructions:
      "1. Write each character 5 times\n2. Label each character with pinyin\n3. Use proper stroke order\n4. Submit as a single PDF document",
  },
  {
    id: "2",
    title: "Dialogue Recording",
    class: "Intermediate Conversation",
    deadline: "May 25, 11:59 PM",
    submissions: "3/8",
    status: "Open",
    description:
      "Record yourself speaking the dialogue from Lesson 7. Focus on proper pronunciation and natural intonation.",
    instructions:
      "1. Record the complete dialogue with a partner if possible\n2. Each person should play both roles if recording alone\n3. Submit as an MP3 file\n4. Recording should be 2-3 minutes in length",
  },
  {
    id: "3",
    title: "Essay on Chinese Culture",
    class: "Advanced Writing",
    deadline: "May 23, 11:59 PM",
    submissions: "1/6",
    status: "Due Soon",
    description:
      "Write a 500-word essay on an aspect of Chinese culture that interests you. Use the vocabulary and grammar structures from Units 5-7.",
    instructions:
      "1. Choose one cultural topic (festivals, food, art, etc.)\n2. Write 500 words minimum in Chinese\n3. Include at least 10 vocabulary words from recent lessons\n4. Submit as a Word document or PDF",
  },
  {
    id: "4",
    title: "Vocabulary Quiz",
    class: "HSK 4 Preparation",
    deadline: "May 20, 11:59 PM",
    submissions: "0/15",
    status: "Past Due",
    description: "Complete the online vocabulary quiz covering the words from Chapters 8-10 in the HSK 4 textbook.",
    instructions:
      "1. Log in to the online learning platform\n2. You will have 30 minutes to complete the quiz\n3. The quiz includes matching, multiple choice, and fill-in-the-blank questions\n4. You may take the quiz only once",
  },
  {
    id: "5",
    title: "Reading Comprehension",
    class: "Intermediate Conversation",
    deadline: "May 18, 11:59 PM",
    submissions: "8/8",
    status: "Completed",
    description: "Read the short story provided in class and answer the comprehension questions that follow.",
    instructions:
      "1. Read the story at least twice\n2. Answer all 10 questions in complete sentences\n3. Use evidence from the text to support your answers\n4. Submit as a Word document or PDF",
  },
  {
    id: "6",
    title: "Business Email Writing",
    class: "Business Mandarin",
    deadline: "May 27, 11:59 PM",
    submissions: "0/10",
    status: "Open",
    description: "Write three professional emails in Chinese based on the business scenarios provided in class.",
    instructions:
      "1. Follow the formal email structure discussed in class\n2. Use appropriate business vocabulary and formal language\n3. Each email should be 150-200 words\n4. Submit all three emails in a single document",
  },
  {
    id: "7",
    title: "Pronunciation Recording",
    class: "Beginner Mandarin",
    deadline: "May 24, 11:59 PM",
    submissions: "5/12",
    status: "Open",
    description: "Record yourself pronouncing the difficult sound pairs we practiced in class.",
    instructions:
      "1. Record each pair of sounds 3 times\n2. Include the example words for each sound\n3. Submit as an MP3 file\n4. Recording should be 1-2 minutes in length",
  },
  {
    id: "8",
    title: "Grammar Exercise",
    class: "HSK 3 Preparation",
    deadline: "May 19, 11:59 PM",
    submissions: "10/12",
    status: "Completed",
    description: "Complete the grammar exercises in the workbook pages 45-48.",
    instructions:
      "1. Complete all exercises on the assigned pages\n2. Write full sentences for each answer\n3. Check your work for accuracy\n4. Submit photos or scans of your completed work",
  },
]

const studentSubmissions = [
  {
    id: "1",
    student: "Zhang Wei",
    status: "Submitted",
    date: "May 19, 10:23 AM",
    grade: "Not graded",
    avatar: "ZW",
  },
  {
    id: "2",
    student: "Li Mei",
    status: "Submitted",
    date: "May 20, 9:45 AM",
    grade: "85%",
    avatar: "LM",
  },
  {
    id: "3",
    student: "Wang Chen",
    status: "Late",
    date: "May 21, 2:30 PM",
    grade: "Not graded",
    avatar: "WC",
  },
]

export function AssignmentsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [filter, setFilter] = useState({
    class: "all",
    status: "all",
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("details")

  // Check if there's an assignment ID in the URL params
  useEffect(() => {
    const assignmentId = searchParams.get("id")
    if (assignmentId) {
      setSelectedAssignment(assignmentId)
    }
  }, [searchParams])

  const filteredAssignments = assignments.filter((assignment) => {
    const classMatch = filter.class === "all" || assignment.class === filter.class
    const statusMatch = filter.status === "all" || assignment.status === filter.status
    const searchMatch = searchQuery === "" || assignment.title.toLowerCase().includes(searchQuery.toLowerCase())
    return classMatch && statusMatch && searchMatch
  })

  const selectedAssignmentData = assignments.find((a) => a.id === selectedAssignment)

  const handleAssignmentClick = (assignmentId: string) => {
    setSelectedAssignment(assignmentId)
    // Update URL without full navigation
    router.push(`/assignments?id=${assignmentId}`, { scroll: false })
  }

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

      {selectedAssignment ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedAssignment(null)
                  router.push("/assignments", { scroll: false })
                }}
              >
                Back to All Assignments
              </Button>
              <h2 className="text-2xl font-bold">{selectedAssignmentData?.title}</h2>
              <Badge
                variant={
                  selectedAssignmentData?.status === "Open"
                    ? "default"
                    : selectedAssignmentData?.status === "Due Soon"
                      ? "outline"
                      : selectedAssignmentData?.status === "Past Due"
                        ? "destructive"
                        : "secondary"
                }
              >
                {selectedAssignmentData?.status}
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Edit Assignment</Button>
              <Button variant="destructive">Delete Assignment</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Assignment Details</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="font-medium">Class:</dt>
                    <dd>{selectedAssignmentData?.class}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Deadline:</dt>
                    <dd>{selectedAssignmentData?.deadline}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Submissions:</dt>
                    <dd>{selectedAssignmentData?.submissions}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Status:</dt>
                    <dd>{selectedAssignmentData?.status}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Assignment Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="w-full">
                    <TabsTrigger value="details" className="flex-1">
                      <FileText className="mr-2 h-4 w-4" />
                      Details
                    </TabsTrigger>
                    <TabsTrigger value="submissions" className="flex-1">
                      <Users className="mr-2 h-4 w-4" />
                      Submissions
                    </TabsTrigger>
                    <TabsTrigger value="schedule" className="flex-1">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="mt-4">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Description</h3>
                        <p className="text-sm text-muted-foreground">{selectedAssignmentData?.description}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-2">Instructions</h3>
                        <div className="text-sm text-muted-foreground whitespace-pre-line">
                          {selectedAssignmentData?.instructions}
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline">Download Materials</Button>
                        <Button>Edit Details</Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="submissions" className="mt-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">Student Submissions</h3>
                      <Button size="sm">Download All</Button>
                    </div>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Student</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Submission Date</TableHead>
                            <TableHead>Grade</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {studentSubmissions.map((submission) => (
                            <TableRow key={submission.id}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={submission.student} />
                                    <AvatarFallback>{submission.avatar}</AvatarFallback>
                                  </Avatar>
                                  <div className="font-medium">{submission.student}</div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    submission.status === "Submitted"
                                      ? "default"
                                      : submission.status === "Late"
                                        ? "outline"
                                        : "destructive"
                                  }
                                >
                                  {submission.status}
                                </Badge>
                              </TableCell>
                              <TableCell>{submission.date}</TableCell>
                              <TableCell>{submission.grade}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="ghost" size="sm">
                                    View
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    Grade
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>

                  <TabsContent value="schedule" className="mt-4">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Assignment Schedule</h3>
                        <div className="rounded-md border p-4">
                          <div className="space-y-4">
                            <div className="flex justify-between">
                              <div className="font-medium">Assigned Date:</div>
                              <div>May 15, 2023</div>
                            </div>
                            <div className="flex justify-between">
                              <div className="font-medium">Due Date:</div>
                              <div>{selectedAssignmentData?.deadline}</div>
                            </div>
                            <div className="flex justify-between">
                              <div className="font-medium">Late Submission Deadline:</div>
                              <div>May 25, 2023 (with penalty)</div>
                            </div>
                            <div className="flex justify-between">
                              <div className="font-medium">Grading Due:</div>
                              <div>May 29, 2023</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button>Modify Schedule</Button>
                      </div>
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssignments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No assignments found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAssignments.map((assignment) => (
                    <TableRow
                      key={assignment.id}
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => handleAssignmentClick(assignment.id)}
                    >
                      <TableCell className="font-medium">{assignment.title}</TableCell>
                      <TableCell className="hidden md:table-cell">{assignment.class}</TableCell>
                      <TableCell className="hidden md:table-cell">{assignment.deadline}</TableCell>
                      <TableCell className="hidden md:table-cell">{assignment.submissions}</TableCell>
                      <TableCell className="whitespace-nowrap">
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
