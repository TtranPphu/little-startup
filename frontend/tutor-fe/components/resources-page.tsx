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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FileText,
  Film,
  ImageIcon,
  Music,
  Plus,
  Search,
  Share2,
  Download,
  Trash,
} from "lucide-react";

const resources = [
  {
    id: "1",
    name: "Basic Characters Worksheet",
    type: "PDF",
    class: "Beginner Mandarin",
    date: "May 15, 2023",
    size: "2.4 MB",
    icon: FileText,
  },
  {
    id: "2",
    name: "Conversation Practice Audio",
    type: "Audio",
    class: "Intermediate Conversation",
    date: "May 12, 2023",
    size: "15.8 MB",
    icon: Music,
  },
  {
    id: "3",
    name: "Writing Techniques Presentation",
    type: "Slide",
    class: "Advanced Writing",
    date: "May 10, 2023",
    size: "8.2 MB",
    icon: ImageIcon,
  },
  {
    id: "4",
    name: "Business Vocabulary List",
    type: "PDF",
    class: "Business Mandarin",
    date: "May 8, 2023",
    size: "1.5 MB",
    icon: FileText,
  },
  {
    id: "5",
    name: "HSK 4 Practice Test",
    type: "PDF",
    class: "HSK 4 Preparation",
    date: "May 5, 2023",
    size: "3.7 MB",
    icon: FileText,
  },
  {
    id: "6",
    name: "Chinese Culture Video",
    type: "Video",
    class: "All Classes",
    date: "May 3, 2023",
    size: "45.2 MB",
    icon: Film,
  },
  {
    id: "7",
    name: "Pronunciation Guide",
    type: "PDF",
    class: "Beginner Mandarin",
    date: "April 28, 2023",
    size: "4.1 MB",
    icon: FileText,
  },
  {
    id: "8",
    name: "Grammar Exercises",
    type: "PDF",
    class: "Intermediate Conversation",
    date: "April 25, 2023",
    size: "2.9 MB",
    icon: FileText,
  },
];

export function ResourcesPage() {
  const [filter, setFilter] = useState({
    type: "all",
    class: "all",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = resources.filter((resource) => {
    const typeMatch = filter.type === "all" || resource.type === filter.type;
    const classMatch =
      filter.class === "all" || resource.class === filter.class;
    const searchMatch =
      searchQuery === "" ||
      resource.name.toLowerCase().includes(searchQuery.toLowerCase());
    return typeMatch && classMatch && searchMatch;
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Resources & Materials
        </h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Upload Material
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload New Material</DialogTitle>
              <DialogDescription>
                Upload a new resource for your students.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="file">File</Label>
                <Input id="file" type="file" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter resource name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Type</Label>
                <Select>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="slide">Slide</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="class">Associated Class</Label>
                <Select>
                  <SelectTrigger id="class">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    <SelectItem value="beginner">Beginner Mandarin</SelectItem>
                    <SelectItem value="intermediate">
                      Intermediate Conversation
                    </SelectItem>
                    <SelectItem value="advanced">Advanced Writing</SelectItem>
                    <SelectItem value="business">Business Mandarin</SelectItem>
                    <SelectItem value="hsk4">HSK 4 Preparation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  placeholder="Grammar, Vocabulary, Culture, etc."
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Upload</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search resources..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select
            value={filter.type}
            onValueChange={(value) => setFilter({ ...filter, type: value })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="PDF">PDF</SelectItem>
              <SelectItem value="Audio">Audio</SelectItem>
              <SelectItem value="Video">Video</SelectItem>
              <SelectItem value="Slide">Slide</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={filter.class}
            onValueChange={(value) => setFilter({ ...filter, class: value })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              <SelectItem value="All Classes">All Classes</SelectItem>
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
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="hidden md:table-cell">Class</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="hidden md:table-cell">Size</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredResources.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No resources found.
                </TableCell>
              </TableRow>
            ) : (
              filteredResources.map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <resource.icon className="h-5 w-5 text-muted-foreground" />
                      <div className="font-medium">{resource.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        resource.type === "PDF"
                          ? "border-red-200 bg-red-50 text-red-600 dark:border-red-800 dark:bg-red-950 dark:text-red-400"
                          : resource.type === "Audio"
                          ? "border-blue-200 bg-blue-50 text-blue-600 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-400"
                          : resource.type === "Video"
                          ? "border-purple-200 bg-purple-50 text-purple-600 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-400"
                          : "border-green-200 bg-green-50 text-green-600 dark:border-green-800 dark:bg-green-950 dark:text-green-400"
                      }
                    >
                      {resource.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {resource.class}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {resource.date}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {resource.size}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Share2 className="h-4 w-4" />
                        <span className="sr-only">Share</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
