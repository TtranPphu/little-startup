"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const recentClasses = [
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
];

export function RecentClasses() {
  return (
    <div className="space-y-4">
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
            {recentClasses.map((classItem) => (
              <TableRow key={classItem.id}>
                <TableCell className="font-medium">{classItem.name}</TableCell>
                <TableCell>{classItem.level}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {classItem.time}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {classItem.days}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {classItem.students}
                </TableCell>
                <TableCell>
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
