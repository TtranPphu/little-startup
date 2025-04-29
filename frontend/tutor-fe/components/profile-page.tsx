"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export function ProfilePage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Profile & Settings</h1>
        <Button>Save Changes</Button>
      </div>
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your profile information and public details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col gap-6 md:flex-row">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Teacher" />
                    <AvatarFallback className="text-4xl">LW</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" defaultValue="Li" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" defaultValue="Wei" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue="liwei@mandarinlearning.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue="+1 (555) 123-4567" />
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    rows={4}
                    defaultValue="Experienced Mandarin teacher with over 10 years of teaching experience. Specialized in teaching Chinese as a second language with a focus on conversation and practical applications."
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="qualifications">Qualifications</Label>
                  <Textarea
                    id="qualifications"
                    rows={4}
                    defaultValue="- Master's in Teaching Chinese as a Foreign Language, Beijing Normal University
- HSK Examiner Certification
- International Chinese Language Teaching Certificate"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account settings and password.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
                <Button>Change Password</Button>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <div className="font-medium">Two-factor authentication</div>
                    <div className="text-sm text-muted-foreground">Add an extra layer of security to your account</div>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Manage your language and notification preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Language</h3>
                <div className="grid gap-2">
                  <Label htmlFor="language">Interface Language</Label>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="cursor-pointer bg-primary text-primary-foreground">
                      English
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer">
                      中文
                    </Badge>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-notifications" className="flex-1">
                      Email Notifications
                    </Label>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="assignment-notifications" className="flex-1">
                      Assignment Submissions
                    </Label>
                    <Switch id="assignment-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="message-notifications" className="flex-1">
                      New Messages
                    </Label>
                    <Switch id="message-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="reminder-notifications" className="flex-1">
                      Class Reminders
                    </Label>
                    <Switch id="reminder-notifications" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Teaching Schedule</CardTitle>
              <CardDescription>View and manage your teaching schedule and availability.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Availability Calendar</h3>
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="rounded-md border">
                    <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Current Schedule</h4>
                      <div className="rounded-md border p-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <div className="font-medium">Monday</div>
                            <div>9:00 AM - 3:30 PM</div>
                          </div>
                          <div className="flex justify-between">
                            <div className="font-medium">Tuesday</div>
                            <div>11:00 AM - 5:30 PM</div>
                          </div>
                          <div className="flex justify-between">
                            <div className="font-medium">Wednesday</div>
                            <div>9:00 AM - 3:30 PM</div>
                          </div>
                          <div className="flex justify-between">
                            <div className="font-medium">Thursday</div>
                            <div>11:00 AM - 5:30 PM</div>
                          </div>
                          <div className="flex justify-between">
                            <div className="font-medium">Friday</div>
                            <div>9:00 AM - 3:30 PM</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Request Time Off</h4>
                      <div className="grid gap-2">
                        <Label htmlFor="time-off-start">Start Date</Label>
                        <Input id="time-off-start" type="date" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="time-off-end">End Date</Label>
                        <Input id="time-off-end" type="date" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="time-off-reason">Reason</Label>
                        <Textarea id="time-off-reason" rows={3} placeholder="Reason for time off" />
                      </div>
                      <Button>Submit Request</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
