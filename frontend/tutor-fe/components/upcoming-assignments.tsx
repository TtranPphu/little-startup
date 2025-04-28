"use client"

import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const upcomingAssignments = [
  {
    id: "1",
    title: "Character Writing Practice",
    class: "Beginner Mandarin",
    deadline: "Tomorrow, 11:59 PM",
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
]

export function UpcomingAssignments() {
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Assignment</TableHead>
              <TableHead className="hidden md:table-cell">Class</TableHead>
              <TableHead className="hidden md:table-cell">Deadline</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {upcomingAssignments.map((assignment) => (
              <TableRow key={assignment.id}>
                <TableCell className="font-medium">{assignment.title}</TableCell>
                <TableCell className="hidden md:table-cell">{assignment.class}</TableCell>
                <TableCell className="hidden md:table-cell">{assignment.deadline}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      assignment.status === "Open"
                        ? "default"
                        : assignment.status === "Due Soon"
                          ? "outline"
                          : "destructive"
                    }
                  >
                    {assignment.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
