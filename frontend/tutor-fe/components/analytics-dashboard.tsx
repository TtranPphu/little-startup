"use client";

import { useState } from "react";
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
import { GripVertical, Maximize2, Minimize2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Dummy data for charts
const gradeDistributionData = [
  { name: "A", count: 18, fill: "#4CAF50" },
  { name: "B", count: 24, fill: "#8BC34A" },
  { name: "C", count: 15, fill: "#FFC107" },
  { name: "D", count: 8, fill: "#FF9800" },
  { name: "F", count: 5, fill: "#F44336" },
];

const progressData = [
  { week: "Week 1", average: 72, topStudent: 92 },
  { week: "Week 2", average: 75, topStudent: 94 },
  { week: "Week 3", average: 78, topStudent: 95 },
  { week: "Week 4", average: 74, topStudent: 93 },
  { week: "Week 5", average: 80, topStudent: 96 },
  { week: "Week 6", average: 83, topStudent: 98 },
  { week: "Week 7", average: 85, topStudent: 99 },
  { week: "Week 8", average: 88, topStudent: 100 },
];

const submissionData = [
  { name: "On-time", value: 68, fill: "#4CAF50" },
  { name: "Late", value: 23, fill: "#FFC107" },
  { name: "Missing", value: 9, fill: "#F44336" },
];

const quizResultsData = [
  { name: "Quiz 1", classA: 78, classB: 82, classC: 75 },
  { name: "Quiz 2", classA: 82, classB: 85, classC: 79 },
  { name: "Quiz 3", classA: 75, classB: 78, classC: 72 },
  { name: "Quiz 4", classA: 85, classB: 88, classC: 80 },
  { name: "Quiz 5", classA: 88, classB: 90, classC: 84 },
];

const attendanceData = [
  { day: "Mon", present: 25, excused: 3, unexcused: 2 },
  { day: "Tue", present: 27, excused: 2, unexcused: 1 },
  { day: "Wed", present: 24, excused: 4, unexcused: 2 },
  { day: "Thu", present: 26, excused: 2, unexcused: 2 },
  { day: "Fri", present: 23, excused: 5, unexcused: 2 },
];

// Sortable Chart Card Component
function SortableChartCard({
  chart,
  toggleExpand,
  renderFilterControls,
  renderChartContent,
  getChartTitle,
  getChartDescription,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: chart.id.toString(),
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`shadow-md ${chart.expanded ? "col-span-full" : ""}`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{getChartTitle(chart.type)}</CardTitle>
            <CardDescription>{getChartDescription(chart.type)}</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleExpand(chart.id)}
            >
              <span className="sr-only">
                {chart.expanded ? "Minimize" : "Maximize"}
              </span>
              {chart.expanded ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
            <div
              className="cursor-grab active:cursor-grabbing"
              {...attributes}
              {...listeners}
            >
              <GripVertical className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {renderFilterControls(chart.type)}
        {renderChartContent(chart.type, chart.expanded)}
      </CardContent>
    </Card>
  );
}

export function AnalyticsDashboard() {
  const [activeView, setActiveView] = useState("overview");
  const [charts, setCharts] = useState([
    { id: 1, type: "gradeDistribution", expanded: false },
    { id: 2, type: "progressOverTime", expanded: false },
    { id: 3, type: "submissionStatus", expanded: false },
    { id: 4, type: "quizResults", expanded: false },
    { id: 5, type: "attendanceTracking", expanded: false },
  ]);

  // Set up sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setCharts((items) => {
        const oldIndex = items.findIndex(
          (item) => item.id.toString() === active.id
        );
        const newIndex = items.findIndex(
          (item) => item.id.toString() === over.id
        );

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const toggleExpand = (id: number) => {
    setCharts((prevCharts) =>
      prevCharts.map((chart) =>
        chart.id === id ? { ...chart, expanded: !chart.expanded } : chart
      )
    );
  };

  const renderChartContent = (chartType: string, expanded: boolean) => {
    switch (chartType) {
      case "gradeDistribution":
        return (
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={gradeDistributionData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" name="Number of Students">
                  {gradeDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      case "progressOverTime":
        return (
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={progressData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="average"
                  stroke="#8884d8"
                  name="Class Average"
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="topStudent"
                  stroke="#82ca9d"
                  name="Top Student"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      case "submissionStatus":
        return (
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={submissionData}
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
                  {submissionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );
      case "quizResults":
        return (
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={quizResultsData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="classA" name="Class A" fill="#8884d8" />
                <Bar dataKey="classB" name="Class B" fill="#82ca9d" />
                <Bar dataKey="classC" name="Class C" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      case "attendanceTracking":
        return (
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={attendanceData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="present"
                  stackId="a"
                  name="Present"
                  fill="#4CAF50"
                />
                <Bar
                  dataKey="excused"
                  stackId="a"
                  name="Excused Absence"
                  fill="#FFC107"
                />
                <Bar
                  dataKey="unexcused"
                  stackId="a"
                  name="Unexcused Absence"
                  fill="#F44336"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      default:
        return null;
    }
  };

  const getChartTitle = (chartType: string) => {
    switch (chartType) {
      case "gradeDistribution":
        return "Grade Distribution";
      case "progressOverTime":
        return "Student Progress Over Time";
      case "submissionStatus":
        return "Assignment Submission Status";
      case "quizResults":
        return "Quiz/Test Results Comparison";
      case "attendanceTracking":
        return "Attendance Tracking";
      default:
        return "";
    }
  };

  const getChartDescription = (chartType: string) => {
    switch (chartType) {
      case "gradeDistribution":
        return "Student grades by category";
      case "progressOverTime":
        return "Performance trends across weeks/months";
      case "submissionStatus":
        return "On-time, late, and missing submissions";
      case "quizResults":
        return "Performance across classes and topics";
      case "attendanceTracking":
        return "Daily/weekly attendance and absence reasons";
      default:
        return "";
    }
  };

  const renderFilterControls = (chartType: string) => {
    switch (chartType) {
      case "gradeDistribution":
        return (
          <div className="flex gap-2 mt-2">
            <Select defaultValue="all-classes">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Classes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-classes">All Classes</SelectItem>
                <SelectItem value="chinese-101">Chinese 101</SelectItem>
                <SelectItem value="chinese-201">Chinese 201</SelectItem>
                <SelectItem value="chinese-301">Chinese 301</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="current-term">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Current Term" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current-term">Current Term</SelectItem>
                <SelectItem value="fall-2023">Fall 2023</SelectItem>
                <SelectItem value="spring-2024">Spring 2024</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      case "progressOverTime":
        return (
          <div className="flex gap-2 mt-2">
            <Select defaultValue="class-average">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Class Average" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="class-average">Class Average</SelectItem>
                <SelectItem value="individual">Individual Students</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="grades">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Grades" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grades">Grades</SelectItem>
                <SelectItem value="quiz-scores">Quiz Scores</SelectItem>
                <SelectItem value="module-completion">
                  Module Completion
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      case "submissionStatus":
        return (
          <div className="flex gap-2 mt-2">
            <Select defaultValue="all-classes">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Classes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-classes">All Classes</SelectItem>
                <SelectItem value="chinese-101">Chinese 101</SelectItem>
                <SelectItem value="chinese-201">Chinese 201</SelectItem>
                <SelectItem value="chinese-301">Chinese 301</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-assignments">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Assignments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-assignments">All Assignments</SelectItem>
                <SelectItem value="homework">Homework</SelectItem>
                <SelectItem value="projects">Projects</SelectItem>
                <SelectItem value="quizzes">Quizzes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      case "quizResults":
        return (
          <div className="flex gap-2 mt-2">
            <Select defaultValue="between-classes">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Between Classes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="between-classes">Between Classes</SelectItem>
                <SelectItem value="between-topics">Between Topics</SelectItem>
                <SelectItem value="over-time">Over Time</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="current-term">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Current Term" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current-term">Current Term</SelectItem>
                <SelectItem value="fall-2023">Fall 2023</SelectItem>
                <SelectItem value="spring-2024">Spring 2024</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      case "attendanceTracking":
        return (
          <div className="flex gap-2 mt-2">
            <Select defaultValue="all-classes">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Classes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-classes">All Classes</SelectItem>
                <SelectItem value="chinese-101">Chinese 101</SelectItem>
                <SelectItem value="chinese-201">Chinese 201</SelectItem>
                <SelectItem value="chinese-301">Chinese 301</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="current-week">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Current Week" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current-week">Current Week</SelectItem>
                <SelectItem value="last-week">Last Week</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="current-term">Current Term</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      default:
        return null;
    }
  };

  const renderAnalyticsView = () => {
    switch (activeView) {
      case "overview":
        return (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SortableContext
                items={charts.map((chart) => chart.id.toString())}
                strategy={verticalListSortingStrategy}
              >
                {charts.map((chart) => (
                  <SortableChartCard
                    key={chart.id}
                    chart={chart}
                    toggleExpand={toggleExpand}
                    renderFilterControls={renderFilterControls}
                    renderChartContent={renderChartContent}
                    getChartTitle={getChartTitle}
                    getChartDescription={getChartDescription}
                  />
                ))}
              </SortableContext>
            </div>
          </DndContext>
        );
      case "grades":
        return (
          <div className="grid grid-cols-1 gap-4">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>Student grades by category</CardDescription>
              </CardHeader>
              <CardContent>
                {renderFilterControls("gradeDistribution")}
                {renderChartContent("gradeDistribution", true)}
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Student Progress Over Time</CardTitle>
                <CardDescription>
                  Performance trends across weeks/months
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderFilterControls("progressOverTime")}
                {renderChartContent("progressOverTime", true)}
              </CardContent>
            </Card>
          </div>
        );
      case "attendance":
        return (
          <div className="grid grid-cols-1 gap-4">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Attendance Tracking</CardTitle>
                <CardDescription>
                  Daily/weekly attendance and absence reasons
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderFilterControls("attendanceTracking")}
                {renderChartContent("attendanceTracking", true)}
              </CardContent>
            </Card>
          </div>
        );
      case "assignments":
        return (
          <div className="grid grid-cols-1 gap-4">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Assignment Submission Status</CardTitle>
                <CardDescription>
                  On-time, late, and missing submissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderFilterControls("submissionStatus")}
                {renderChartContent("submissionStatus", true)}
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Quiz/Test Results Comparison</CardTitle>
                <CardDescription>
                  Performance across classes and topics
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderFilterControls("quizResults")}
                {renderChartContent("quizResults", true)}
              </CardContent>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-[200px] justify-between">
              {activeView === "overview"
                ? "Overview"
                : activeView === "grades"
                ? "Grades"
                : activeView === "attendance"
                ? "Attendance"
                : "Assignments"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 ml-2"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => setActiveView("overview")}>
              Overview
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setActiveView("grades")}>
              Grades
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setActiveView("attendance")}>
              Attendance
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setActiveView("assignments")}>
              Assignments
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {renderAnalyticsView()}
    </div>
  );
}
