"use client"

import { Progress } from "@/components/ui/progress"

const attendanceData = [
  { day: "Monday", present: 90 },
  { day: "Tuesday", present: 85 },
  { day: "Wednesday", present: 95 },
  { day: "Thursday", present: 80 },
  { day: "Friday", present: 88 },
]

export function StudentAttendance() {
  return (
    <div className="space-y-4">
      {attendanceData.map((item) => (
        <div key={item.day} className="flex items-center justify-between">
          <div className="w-28">{item.day}</div>
          <div className="flex-1 px-2">
            <Progress value={item.present} className="h-2" />
          </div>
          <div className="w-10 text-right text-sm">{item.present}%</div>
        </div>
      ))}
    </div>
  )
}
