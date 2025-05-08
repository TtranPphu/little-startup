"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const recentMessages = [
  {
    id: "1",
    sender: "Zhang Wei",
    subject: "Question about homework",
    class: "Beginner Mandarin",
    time: "10:30 AM",
    status: "Unread",
    avatar: "ZW",
  },
  {
    id: "2",
    sender: "Li Mei",
    subject: "Absence notification",
    class: "Intermediate Conversation",
    time: "Yesterday",
    status: "Read",
    avatar: "LM",
  },
  {
    id: "3",
    sender: "Wang Chen",
    subject: "Extra practice materials",
    class: "Advanced Writing",
    time: "Yesterday",
    status: "Unread",
    avatar: "WC",
  },
  {
    id: "4",
    sender: "Liu Yang",
    subject: "Assignment extension request",
    class: "HSK 4 Preparation",
    time: "May 19",
    status: "Read",
    avatar: "LY",
  },
];

export function RecentMessages() {
  return (
    <div className="space-y-4">
      {recentMessages.map((message) => (
        <div
          key={message.id}
          className="flex items-start gap-4 rounded-lg border p-3 hover:bg-muted/50"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={`/placeholder.svg?height=40&width=40`}
              alt={message.sender}
            />
            <AvatarFallback>{message.avatar}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <div className="font-medium">{message.sender}</div>
              <div className="text-xs text-muted-foreground">
                {message.time}
              </div>
            </div>
            <div className="text-sm">{message.subject}</div>
            <div className="flex items-center gap-2">
              <div className="text-xs text-muted-foreground">
                {message.class}
              </div>
              {message.status === "Unread" && (
                <Badge variant="secondary" className="text-xs">
                  New
                </Badge>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
