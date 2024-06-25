"use client"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { SettingsIcon } from "lucide-react"
import { useState } from "react"

export default function AccountSettings() {
  const [selectedOption, setSelectedOption] = useState("profile")
  return (
    <>
      <Dialog>
      <DialogTrigger asChild className="w-full gap-2">
        <Button variant="outline"><SettingsIcon className="h-5 w-5" />Settings</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-w-[22rem] ">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="sm:grid sm:grid-cols-[200px_1fr] sm:gap-6 sm:p-6 ">
          <div className="space-y-2 border-r pr-6 ">
            <Button
              variant={selectedOption === "profile" ? "secondary" : "ghost"}
              onClick={() => setSelectedOption("profile")}
              className="w-full justify-start"
            >
              Profile
            </Button>
            <Button
              variant={selectedOption === "password" ? "secondary" : "ghost"}
              onClick={() => setSelectedOption("password")}
              className="w-full justify-start"
            >
              Password
            </Button>
            <Button
              variant={selectedOption === "photo" ? "secondary" : "ghost"}
              onClick={() => setSelectedOption("photo")}
              className="w-full justify-start"
            >
              Photo
            </Button>
            <Button
              variant={selectedOption === "delete" ? "secondary" : "ghost"}
              onClick={() => setSelectedOption("delete")}
              className="w-full justify-start"
            >
              Delete
            </Button>
          </div>
          <div className="space-y-4 mt-4">
            {selectedOption === "profile" && (
                  <div id="profile" className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Profile</h3>
                    <p className="text-muted-foreground">Update your name and other profile information.</p>
                  </div>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" defaultValue="John Doe" />
                    </div>
                    <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" defaultValue="johndoe" />
                    </div>
                    <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        defaultValue="I'm a software engineer and I love to code!"
                        className="min-h-[100px]"
                      />
                    </div>
                    <Button className="w-full">Save</Button>
                    </div>
                  </div>
                )}
                {selectedOption === "password" && (
                  <div id="password" className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">Password</h3>
                      <p className="text-muted-foreground">Change your account password.</p>
                    </div>
                    <div className="grid gap-4">
                      <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" placeholder="Enter your current password" />
                      </div>
                      <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" placeholder="Enter your new password" />
                      </div>
                      <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input id="confirm-password" type="password" placeholder="Confirm your new password" />
                      </div>
                    </div>
                  </div>
                )}
                {selectedOption === "photo" && (
                  <div id="photo" className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">Profile Photo</h3>
                      <p className="text-muted-foreground">Update your profile photo.</p>
                    </div>
                    <div className="flex gap-4">
                      <div className=" flex items-center gap-2">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src="/placeholder-user.jpg" />
                            <AvatarFallback>JP</AvatarFallback>
                          </Avatar>
                          <Input type="file" className="w-full" accept="image/*"/>
                      </div>
                    </div>
                  </div>
                )}
                {selectedOption === "delete" && (
                  <div id="delete" className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-red-500">Delete Account</h3>
                      <p className="text-muted-foreground">Permanently delete your account and all your data.</p>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="delete-confirmation">Type "delete" to confirm</Label>
                        <Input id="delete-confirmation" placeholder="Type 'delete' to confirm" />
                      </div>
                      <Button variant="destructive" className="w-full">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
        </div>
      </DialogContent>
      </Dialog>
    </>
  )
}
