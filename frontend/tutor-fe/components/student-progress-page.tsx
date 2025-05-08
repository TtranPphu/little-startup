"use client";

import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  LineChart,
  PieChart,
  Bar,
  Line,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Dummy data for student progress
const students = [
  {
    id: "1",
    name: "Zhang Wei",
    level: "Beginner",
    progress: 75,
    lastActivity: "Today, 10:30 AM",
    feedback: "Good progress on character writing",
    class: "Beginner Mandarin",
    avatar: "ZW",
    progressData: [
      { week: "Week 1", score: 65 },
      { week: "Week 2", score: 68 },
      { week: "Week 3", score: 72 },
      { week: "Week 4", score: 70 },
      { week: "Week 5", score: 75 },
      { week: "Week 6", score: 78 },
      { week: "Week 7", score: 75 },
      { week: "Week 8", score: 80 },
    ],
    submissionData: [
      { name: "On-time", value: 12, fill: "#4CAF50" },
      { name: "Late", value: 3, fill: "#FFC107" },
      { name: "Missing", value: 1, fill: "#F44336" },
    ],
    quizResults: [
      { name: "Quiz 1", score: 75 },
      { name: "Quiz 2", score: 80 },
      { name: "Quiz 3", score: 72 },
      { name: "Quiz 4", score: 85 },
      { name: "Quiz 5", score: 82 },
    ],
    attendanceData: [
      { day: "Mon", status: "Present" },
      { day: "Tue", status: "Present" },
      { day: "Wed", status: "Present" },
      { day: "Thu", status: "Absent" },
      { day: "Fri", status: "Present" },
    ],
    strengths: [
      "Character writing",
      "Vocabulary retention",
      "Listening comprehension",
    ],
    areasToImprove: ["Pronunciation", "Grammar usage", "Speaking fluency"],
  },
  {
    id: "2",
    name: "Li Mei",
    level: "Intermediate",
    progress: 60,
    lastActivity: "Yesterday",
    feedback: "Needs to work on pronunciation",
    class: "Intermediate Conversation",
    avatar: "LM",
    progressData: [
      { week: "Week 1", score: 55 },
      { week: "Week 2", score: 58 },
      { week: "Week 3", score: 62 },
      { week: "Week 4", score: 60 },
      { week: "Week 5", score: 65 },
      { week: "Week 6", score: 63 },
      { week: "Week 7", score: 60 },
      { week: "Week 8", score: 65 },
    ],
    submissionData: [
      { name: "On-time", value: 8, fill: "#4CAF50" },
      { name: "Late", value: 5, fill: "#FFC107" },
      { name: "Missing", value: 3, fill: "#F44336" },
    ],
    quizResults: [
      { name: "Quiz 1", score: 65 },
      { name: "Quiz 2", score: 70 },
      { name: "Quiz 3", score: 62 },
      { name: "Quiz 4", score: 68 },
      { name: "Quiz 5", score: 72 },
    ],
    attendanceData: [
      { day: "Mon", status: "Present" },
      { day: "Tue", status: "Late" },
      { day: "Wed", status: "Present" },
      { day: "Thu", status: "Present" },
      { day: "Fri", status: "Absent" },
    ],
    strengths: [
      "Reading comprehension",
      "Cultural knowledge",
      "Writing skills",
    ],
    areasToImprove: [
      "Pronunciation",
      "Speaking confidence",
      "Vocabulary expansion",
    ],
  },
  {
    id: "3",
    name: "Wang Chen",
    level: "Advanced",
    progress: 90,
    lastActivity: "Today, 9:15 AM",
    feedback: "Excellent writing skills",
    class: "Advanced Writing",
    avatar: "WC",
    progressData: [
      { week: "Week 1", score: 85 },
      { week: "Week 2", score: 88 },
      { week: "Week 3", score: 86 },
      { week: "Week 4", score: 90 },
      { week: "Week 5", score: 92 },
      { week: "Week 6", score: 88 },
      { week: "Week 7", score: 90 },
      { week: "Week 8", score: 94 },
    ],
    submissionData: [
      { name: "On-time", value: 15, fill: "#4CAF50" },
      { name: "Late", value: 1, fill: "#FFC107" },
      { name: "Missing", value: 0, fill: "#F44336" },
    ],
    quizResults: [
      { name: "Quiz 1", score: 92 },
      { name: "Quiz 2", score: 88 },
      { name: "Quiz 3", score: 90 },
      { name: "Quiz 4", score: 95 },
      { name: "Quiz 5", score: 93 },
    ],
    attendanceData: [
      { day: "Mon", status: "Present" },
      { day: "Tue", status: "Present" },
      { day: "Wed", status: "Present" },
      { day: "Thu", status: "Present" },
      { day: "Fri", status: "Present" },
    ],
    strengths: [
      "Essay writing",
      "Grammar mastery",
      "Vocabulary usage",
      "Critical thinking",
    ],
    areasToImprove: ["Formal writing style", "Academic citations"],
  },
  {
    id: "4",
    name: "Liu Yang",
    level: "Intermediate",
    progress: 45,
    lastActivity: "3 days ago",
    feedback: "Struggling with grammar",
    class: "HSK 4 Preparation",
    avatar: "LY",
    progressData: [
      { week: "Week 1", score: 50 },
      { week: "Week 2", score: 48 },
      { week: "Week 3", score: 45 },
      { week: "Week 4", score: 42 },
      { week: "Week 5", score: 46 },
      { week: "Week 6", score: 44 },
      { week: "Week 7", score: 45 },
      { week: "Week 8", score: 48 },
    ],
    submissionData: [
      { name: "On-time", value: 6, fill: "#4CAF50" },
      { name: "Late", value: 4, fill: "#FFC107" },
      { name: "Missing", value: 6, fill: "#F44336" },
    ],
    quizResults: [
      { name: "Quiz 1", score: 48 },
      { name: "Quiz 2", score: 52 },
      { name: "Quiz 3", score: 45 },
      { name: "Quiz 4", score: 50 },
      { name: "Quiz 5", score: 55 },
    ],
    attendanceData: [
      { day: "Mon", status: "Present" },
      { day: "Tue", status: "Absent" },
      { day: "Wed", status: "Present" },
      { day: "Thu", status: "Absent" },
      { day: "Fri", status: "Late" },
    ],
    strengths: ["Vocabulary memorization", "Reading basic texts"],
    areasToImprove: [
      "Grammar structures",
      "Consistent study habits",
      "Homework completion",
      "Test preparation",
    ],
  },
  {
    id: "5",
    name: "Sun Ling",
    level: "Beginner",
    progress: 80,
    lastActivity: "Today, 11:45 AM",
    feedback: "Great participation in class",
    class: "Beginner Mandarin",
    avatar: "SL",
    progressData: [
      { week: "Week 1", score: 70 },
      { week: "Week 2", score: 72 },
      { week: "Week 3", score: 75 },
      { week: "Week 4", score: 78 },
      { week: "Week 5", score: 76 },
      { week: "Week 6", score: 80 },
      { week: "Week 7", score: 82 },
      { week: "Week 8", score: 85 },
    ],
    submissionData: [
      { name: "On-time", value: 14, fill: "#4CAF50" },
      { name: "Late", value: 2, fill: "#FFC107" },
      { name: "Missing", value: 0, fill: "#F44336" },
    ],
    quizResults: [
      { name: "Quiz 1", score: 78 },
      { name: "Quiz 2", score: 82 },
      { name: "Quiz 3", score: 80 },
      { name: "Quiz 4", score: 85 },
      { name: "Quiz 5", score: 88 },
    ],
    attendanceData: [
      { day: "Mon", status: "Present" },
      { day: "Tue", status: "Present" },
      { day: "Wed", status: "Present" },
      { day: "Thu", status: "Present" },
      { day: "Fri", status: "Present" },
    ],
    strengths: [
      "Class participation",
      "Pronunciation",
      "Character writing",
      "Enthusiasm",
    ],
    areasToImprove: ["Grammar structures", "Vocabulary expansion"],
  },
  {
    id: "6",
    name: "Zhao Ming",
    level: "Intermediate",
    progress: 70,
    lastActivity: "Yesterday",
    feedback: "Improving in conversation skills",
    class: "Business Mandarin",
    avatar: "ZM",
    progressData: [
      { week: "Week 1", score: 65 },
      { week: "Week 2", score: 68 },
      { week: "Week 3", score: 70 },
      { week: "Week 4", score: 72 },
      { week: "Week 5", score: 68 },
      { week: "Week 6", score: 72 },
      { week: "Week 7", score: 75 },
      { week: "Week 8", score: 78 },
    ],
    submissionData: [
      { name: "On-time", value: 10, fill: "#4CAF50" },
      { name: "Late", value: 4, fill: "#FFC107" },
      { name: "Missing", value: 2, fill: "#F44336" },
    ],
    quizResults: [
      { name: "Quiz 1", score: 72 },
      { name: "Quiz 2", score: 75 },
      { name: "Quiz 3", score: 70 },
      { name: "Quiz 4", score: 78 },
      { name: "Quiz 5", score: 80 },
    ],
    attendanceData: [
      { day: "Mon", status: "Present" },
      { day: "Tue", status: "Present" },
      { day: "Wed", status: "Late" },
      { day: "Thu", status: "Present" },
      { day: "Fri", status: "Present" },
    ],
    strengths: [
      "Business vocabulary",
      "Formal communication",
      "Reading comprehension",
    ],
    areasToImprove: [
      "Speaking fluency",
      "Business writing",
      "Cultural business practices",
    ],
  },
  {
    id: "7",
    name: "Chen Jie",
    level: "Advanced",
    progress: 85,
    lastActivity: "Today, 8:30 AM",
    feedback: "Excellent comprehension skills",
    class: "Advanced Writing",
    avatar: "CJ",
    progressData: [
      { week: "Week 1", score: 80 },
      { week: "Week 2", score: 82 },
      { week: "Week 3", score: 85 },
      { week: "Week 4", score: 83 },
      { week: "Week 5", score: 86 },
      { week: "Week 6", score: 88 },
      { week: "Week 7", score: 85 },
      { week: "Week 8", score: 90 },
    ],
    submissionData: [
      { name: "On-time", value: 14, fill: "#4CAF50" },
      { name: "Late", value: 2, fill: "#FFC107" },
      { name: "Missing", value: 0, fill: "#F44336" },
    ],
    quizResults: [
      { name: "Quiz 1", score: 88 },
      { name: "Quiz 2", score: 85 },
      { name: "Quiz 3", score: 90 },
      { name: "Quiz 4", score: 92 },
      { name: "Quiz 5", score: 88 },
    ],
    attendanceData: [
      { day: "Mon", status: "Present" },
      { day: "Tue", status: "Present" },
      { day: "Wed", status: "Present" },
      { day: "Thu", status: "Late" },
      { day: "Fri", status: "Present" },
    ],
    strengths: [
      "Reading comprehension",
      "Essay structure",
      "Critical analysis",
      "Vocabulary usage",
    ],
    areasToImprove: ["Creative writing", "Stylistic variation"],
  },
  {
    id: "8",
    name: "Wu Fang",
    level: "Beginner",
    progress: 30,
    lastActivity: "4 days ago",
    feedback: "Needs more practice",
    class: "Beginner Mandarin",
    avatar: "WF",
    progressData: [
      { week: "Week 1", score: 35 },
      { week: "Week 2", score: 32 },
      { week: "Week 3", score: 30 },
      { week: "Week 4", score: 28 },
      { week: "Week 5", score: 32 },
      { week: "Week 6", score: 30 },
      { week: "Week 7", score: 32 },
      { week: "Week 8", score: 35 },
    ],
    submissionData: [
      { name: "On-time", value: 5, fill: "#4CAF50" },
      { name: "Late", value: 4, fill: "#FFC107" },
      { name: "Missing", value: 7, fill: "#F44336" },
    ],
    quizResults: [
      { name: "Quiz 1", score: 32 },
      { name: "Quiz 2", score: 35 },
      { name: "Quiz 3", score: 30 },
      { name: "Quiz 4", score: 38 },
      { name: "Quiz 5", score: 40 },
    ],
    attendanceData: [
      { day: "Mon", status: "Absent" },
      { day: "Tue", status: "Present" },
      { day: "Wed", status: "Absent" },
      { day: "Thu", status: "Present" },
      { day: "Fri", status: "Late" },
    ],
    strengths: ["Enthusiasm for learning", "Cultural interest"],
    areasToImprove: [
      "Regular attendance",
      "Homework completion",
      "Basic vocabulary",
      "Character writing",
      "Study habits",
    ],
  },
];

export function StudentProgressPage() {
  const [filter, setFilter] = useState({
    class: "all",
    level: "all",
    progress: "all",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  const filteredStudents = students.filter((student) => {
    const classMatch = filter.class === "all" || student.class === filter.class;
    const levelMatch = filter.level === "all" || student.level === filter.level;
    const progressMatch =
      filter.progress === "all" ||
      (filter.progress === "low" && student.progress < 50) ||
      (filter.progress === "medium" &&
        student.progress >= 50 &&
        student.progress < 80) ||
      (filter.progress === "high" && student.progress >= 80);
    const searchMatch =
      searchQuery === "" ||
      student.name.toLowerCase().includes(searchQuery.toLowerCase());
    return classMatch && levelMatch && progressMatch && searchMatch;
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Student Progress</h1>
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
          <Select
            value={filter.class}
            onValueChange={(value) => setFilter({ ...filter, class: value })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              <SelectItem value="Beginner Mandarin">
                Beginner Mandarin
              </SelectItem>
              <SelectItem value="Intermediate Conversation">
                Intermediate Conversation
              </SelectItem>
              <SelectItem value="Advanced Writing">Advanced Writing</SelectItem>
              <SelectItem value="Business Mandarin">
                Business Mandarin
              </SelectItem>
              <SelectItem value="HSK 4 Preparation">
                HSK 4 Preparation
              </SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={filter.level}
            onValueChange={(value) => setFilter({ ...filter, level: value })}
          >
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
          <Select
            value={filter.progress}
            onValueChange={(value) => setFilter({ ...filter, progress: value })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by progress" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Progress</SelectItem>
              <SelectItem value="low">Low (&lt;50%)</SelectItem>
              <SelectItem value="medium">Medium (50-80%)</SelectItem>
              <SelectItem value="high">High (&gt;80%)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead className="hidden md:table-cell">
                Last Activity
              </TableHead>
              <TableHead className="hidden md:table-cell">Feedback</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No students found.
                </TableCell>
              </TableRow>
            ) : (
              filteredStudents.map((student) => (
                <TableRow
                  key={student.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => {
                    setSelectedStudent(student);
                    setActiveTab("overview");
                  }}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={`/placeholder.svg?height=32&width=32`}
                          alt={student.name}
                        />
                        <AvatarFallback>{student.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{student.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>{student.level}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={student.progress}
                        className="h-2 w-[60px] md:w-[100px]"
                      />
                      <span className="text-xs">{student.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {student.lastActivity}
                  </TableCell>
                  <TableCell className="hidden md:table-cell max-w-[200px] truncate">
                    {student.feedback}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Student Detail Dialog */}
      <Dialog
        open={!!selectedStudent}
        onOpenChange={(open) => !open && setSelectedStudent(null)}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={`/placeholder.svg?height=40&width=40`}
                  alt={selectedStudent?.name}
                />
                <AvatarFallback>{selectedStudent?.avatar}</AvatarFallback>
              </Avatar>
              {selectedStudent?.name} - {selectedStudent?.class}
            </DialogTitle>
            <DialogDescription>
              {selectedStudent?.level} Level • Last Activity:{" "}
              {selectedStudent?.lastActivity}
            </DialogDescription>
          </DialogHeader>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Name:</span>
                        <span>{selectedStudent?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Class:</span>
                        <span>{selectedStudent?.class}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Level:</span>
                        <span>{selectedStudent?.level}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Overall Progress:</span>
                        <span>{selectedStudent?.progress}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Last Activity:</span>
                        <span>{selectedStudent?.lastActivity}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Current Feedback</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{selectedStudent?.feedback}</p>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-1">Strengths:</h4>
                        <ul className="list-disc pl-5">
                          {selectedStudent?.strengths.map((strength, index) => (
                            <li key={index}>{strength}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Areas to Improve:</h4>
                        <ul className="list-disc pl-5">
                          {selectedStudent?.areasToImprove.map(
                            (area, index) => (
                              <li key={index}>{area}</li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Progress Overview</CardTitle>
                    <CardDescription>
                      Weekly progress over the current term
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={selectedStudent?.progressData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="week" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="score"
                            stroke="#8884d8"
                            name="Weekly Score"
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Progress Tab */}
            <TabsContent value="progress" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Progress Over Time</CardTitle>
                  <CardDescription>
                    Weekly progress throughout the term
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={selectedStudent?.progressData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="score"
                          stroke="#8884d8"
                          name="Weekly Score"
                          activeDot={{ r: 8 }}
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Skill Breakdown</CardTitle>
                    <CardDescription>Performance by skill area</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span>Reading</span>
                          <span>
                            {Math.round(
                              selectedStudent?.progress *
                                (0.8 + Math.random() * 0.4)
                            )}
                            %
                          </span>
                        </div>
                        <Progress
                          value={
                            selectedStudent?.progress *
                            (0.8 + Math.random() * 0.4)
                          }
                          className="h-2"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span>Writing</span>
                          <span>
                            {Math.round(
                              selectedStudent?.progress *
                                (0.8 + Math.random() * 0.4)
                            )}
                            %
                          </span>
                        </div>
                        <Progress
                          value={
                            selectedStudent?.progress *
                            (0.8 + Math.random() * 0.4)
                          }
                          className="h-2"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span>Speaking</span>
                          <span>
                            {Math.round(
                              selectedStudent?.progress *
                                (0.8 + Math.random() * 0.4)
                            )}
                            %
                          </span>
                        </div>
                        <Progress
                          value={
                            selectedStudent?.progress *
                            (0.8 + Math.random() * 0.4)
                          }
                          className="h-2"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span>Listening</span>
                          <span>
                            {Math.round(
                              selectedStudent?.progress *
                                (0.8 + Math.random() * 0.4)
                            )}
                            %
                          </span>
                        </div>
                        <Progress
                          value={
                            selectedStudent?.progress *
                            (0.8 + Math.random() * 0.4)
                          }
                          className="h-2"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Progress Notes</CardTitle>
                    <CardDescription>
                      Teacher observations and recommendations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      defaultValue={selectedStudent?.feedback}
                      placeholder="Add progress notes for this student..."
                      rows={8}
                    />
                    <Button className="mt-4 w-full">Save Notes</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Assignments Tab */}
            <TabsContent value="assignments" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Assignment Submission Status</CardTitle>
                  <CardDescription>
                    On-time, late, and missing submissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={selectedStudent?.submissionData}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) =>
                              `${name}: ${(percent * 100).toFixed(0)}%`
                            }
                          >
                            {selectedStudent?.submissionData.map(
                              (entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              )
                            )}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">
                        Recent Assignments
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 rounded-md border">
                          <span>Character Writing Practice</span>
                          <Badge variant="default">On-time</Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded-md border">
                          <span>Vocabulary Exercise</span>
                          <Badge variant="outline">Late</Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded-md border">
                          <span>Grammar Worksheet</span>
                          <Badge variant="default">On-time</Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded-md border">
                          <span>Reading Comprehension</span>
                          <Badge variant="destructive">Missing</Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded-md border">
                          <span>Dialogue Practice</span>
                          <Badge variant="default">On-time</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Quizzes Tab */}
            <TabsContent value="quizzes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Quiz Results</CardTitle>
                  <CardDescription>
                    Performance on recent quizzes and tests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={selectedStudent?.quizResults}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="score" name="Score" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-6 space-y-4">
                    <h3 className="text-lg font-medium">Quiz Details</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Quiz</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Score</TableHead>
                          <TableHead>Class Average</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedStudent?.quizResults.map((quiz, index) => (
                          <TableRow key={index}>
                            <TableCell>{quiz.name}</TableCell>
                            <TableCell>{`May ${index + 5}, 2023`}</TableCell>
                            <TableCell>{quiz.score}%</TableCell>
                            <TableCell>
                              {Math.round(quiz.score * 0.9)}%
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Attendance Tab */}
            <TabsContent value="attendance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Record</CardTitle>
                  <CardDescription>Recent attendance history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-5 gap-2">
                      {selectedStudent?.attendanceData.map((day, index) => (
                        <div key={index} className="text-center">
                          <div className="font-medium">{day.day}</div>
                          <div
                            className={`mt-2 h-10 w-10 rounded-full flex items-center justify-center mx-auto
                              ${
                                day.status === "Present"
                                  ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                  : day.status === "Late"
                                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                                  : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                              }`}
                          >
                            {day.status === "Present"
                              ? "P"
                              : day.status === "Late"
                              ? "L"
                              : "A"}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-green-100 dark:bg-green-900"></div>
                        <span>
                          Present:{" "}
                          {
                            selectedStudent?.attendanceData.filter(
                              (d) => d.status === "Present"
                            ).length
                          }{" "}
                          days
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-yellow-100 dark:bg-yellow-900"></div>
                        <span>
                          Late:{" "}
                          {
                            selectedStudent?.attendanceData.filter(
                              (d) => d.status === "Late"
                            ).length
                          }{" "}
                          days
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-red-100 dark:bg-red-900"></div>
                        <span>
                          Absent:{" "}
                          {
                            selectedStudent?.attendanceData.filter(
                              (d) => d.status === "Absent"
                            ).length
                          }{" "}
                          days
                        </span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-2">
                        Attendance Notes
                      </h3>
                      <Textarea
                        placeholder="Add attendance notes for this student..."
                        rows={4}
                      />
                      <Button className="mt-4">Save Notes</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
