"use client"

import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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
]

export function RecentClasses() {
  const router = useRouter()

  const handleClassClick = (classId: string) => {
    router.push(`/classes?id=${classId}`)
  }

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Class Name</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Days</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentClasses.map((classItem) => (
              <TableRow
                key={classItem.id}
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleClassClick(classItem.id)}
              >
                <TableCell className="font-medium">{classItem.name}</TableCell>
                <TableCell>{classItem.level}</TableCell>
                <TableCell>{classItem.time}</TableCell>
                <TableCell>{classItem.days}</TableCell>
                <TableCell>{classItem.students}</TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
