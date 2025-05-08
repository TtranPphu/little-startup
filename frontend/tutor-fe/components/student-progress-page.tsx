"use client";

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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
                  onClick={() => setSelectedStudent(student)}
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
      <Dialog
        open={!!selectedStudent}
        onOpenChange={(open) => !open && setSelectedStudent(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Feedback</DialogTitle>
            <DialogDescription>
              Add feedback for {selectedStudent?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="feedback">Feedback</Label>
              <Textarea
                id="feedback"
                placeholder="Enter your feedback"
                rows={4}
                defaultValue={selectedStudent?.feedback}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Feedback</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
