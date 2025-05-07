"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Plus, Clock, Calendar, FileText, MessageSquare, Megaphone, BookMarked, Star } from "lucide-react"

type TodoItem = {
  id: string
  text: string
  completed: boolean
  date: string
}

type NoteItem = {
  id: string
  title: string
  content: string
  date: string
  starred: boolean
}

export function ProductivityToolsPage() {
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: "1", text: "Prepare materials for tomorrow's class", completed: false, date: "2023-05-21" },
    { id: "2", text: "Grade student essays", completed: false, date: "2023-05-21" },
    { id: "3", text: "Schedule parent meetings", completed: true, date: "2023-05-20" },
    { id: "4", text: "Update syllabus for next semester", completed: false, date: "2023-05-22" },
  ])
  const [notes, setNotes] = useState<NoteItem[]>([
    {
      id: "1",
      title: "Teaching Ideas",
      content: "Use more interactive activities for beginner classes. Consider incorporating more cultural elements.",
      date: "2023-05-20",
      starred: true,
    },
    {
      id: "2",
      title: "Student Feedback",
      content: "Students requested more speaking practice in intermediate class. Consider adding more pair work.",
      date: "2023-05-19",
      starred: false,
    },
    {
      id: "3",
      title: "Curriculum Changes",
      content: "Need to update the advanced writing curriculum to include more business writing examples.",
      date: "2023-05-18",
      starred: true,
    },
  ])
  const [newTodo, setNewTodo] = useState("")
  const [newNoteTitle, setNewNoteTitle] = useState("")
  const [newNoteContent, setNewNoteContent] = useState("")

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now().toString(),
          text: newTodo,
          completed: false,
          date: new Date().toISOString().split("T")[0],
        },
      ])
      setNewTodo("")
    }
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const addNote = () => {
    if (newNoteTitle.trim() && newNoteContent.trim()) {
      setNotes([
        ...notes,
        {
          id: Date.now().toString(),
          title: newNoteTitle,
          content: newNoteContent,
          date: new Date().toISOString().split("T")[0],
          starred: false,
        },
      ])
      setNewNoteTitle("")
      setNewNoteContent("")
    }
  }

  const toggleStarNote = (id: string) => {
    setNotes(notes.map((note) => (note.id === id ? { ...note, starred: !note.starred } : note)))
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Productivity Tools</h1>
      </div>
      <Tabs defaultValue="todo" className="space-y-4">
        <TabsList>
          <TabsTrigger value="todo">To-Do List</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>
        <TabsContent value="todo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My To-Do List</CardTitle>
              <CardDescription>Manage your personal tasks and reminders</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a new task..."
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTodo()}
                />
                <Button onClick={addTodo}>
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Add Task</span>
                </Button>
              </div>
              <div className="space-y-2">
                {todos.map((todo) => (
                  <div key={todo.id} className="flex items-center gap-2 rounded-md border p-3 hover:bg-muted/50">
                    <Checkbox
                      id={`todo-${todo.id}`}
                      checked={todo.completed}
                      onCheckedChange={() => toggleTodo(todo.id)}
                    />
                    <Label
                      htmlFor={`todo-${todo.id}`}
                      className={`flex-1 ${todo.completed ? "line-through text-muted-foreground" : ""}`}
                    >
                      {todo.text}
                    </Label>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{todo.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <div className="text-sm text-muted-foreground">
                {todos.filter((todo) => todo.completed).length} of {todos.length} tasks completed
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="notes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Notes</CardTitle>
              <CardDescription>Keep track of important information and ideas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input
                  placeholder="Note title..."
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                />
                <Textarea
                  placeholder="Note content..."
                  rows={4}
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                />
                <Button onClick={addNote} className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Note
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {notes.map((note) => (
                  <Card key={note.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{note.title}</CardTitle>
                        <Button variant="ghost" size="icon" onClick={() => toggleStarNote(note.id)}>
                          <Star className={`h-4 w-4 ${note.starred ? "fill-yellow-400 text-yellow-400" : ""}`} />
                          <span className="sr-only">{note.starred ? "Unstar" : "Star"} note</span>
                        </Button>
                      </div>
                      <CardDescription className="text-xs">{note.date}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{note.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Template Library</CardTitle>
              <CardDescription>Reusable templates for common tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Lesson Plan Template</CardTitle>
                    <CardDescription>Standard lesson plan format</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm">
                      <BookMarked className="h-4 w-4 text-muted-foreground" />
                      <span>Lesson Planning</span>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm" className="w-full">
                        <FileText className="mr-2 h-4 w-4" />
                        Use Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Assignment Feedback</CardTitle>
                    <CardDescription>Structured feedback format</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>Assignments</span>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm" className="w-full">
                        <FileText className="mr-2 h-4 w-4" />
                        Use Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Parent Communication</CardTitle>
                    <CardDescription>Email template for parents</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <span>Communication</span>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm" className="w-full">
                        <FileText className="mr-2 h-4 w-4" />
                        Use Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Class Announcement</CardTitle>
                    <CardDescription>Standard announcement format</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm">
                      <Megaphone className="h-4 w-4 text-muted-foreground" />
                      <span>Announcements</span>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm" className="w-full">
                        <FileText className="mr-2 h-4 w-4" />
                        Use Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Weekly Schedule</CardTitle>
                    <CardDescription>Weekly planning template</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Planning</span>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm" className="w-full">
                        <FileText className="mr-2 h-4 w-4" />
                        Use Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
