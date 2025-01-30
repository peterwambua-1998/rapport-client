import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BellRing, LockKeyhole, MessageSquareText, UserPen } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ProjectSettings = () => {
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [cPasswordVisible, setCPasswordVisible] = useState(false);

  return (
    <div className="min-h-screen bg-[#edeeed] p-2 sm:p-4 md:p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl border">
        <div className="p-2 sm:p-4 md:p-6">
          <h2 className='mb-4 text-xl md:text-2xl font-semibold leading-none tracking-tight' >Settings</h2>
          <Tabs defaultValue="password" className="flex-1" orientation="vertical">
            <div className="flex flex-col lg:flex-row gap-4">
              <TabsList className="border-b-0 flex lg:flex-col h-auto lg:h-[70vh] w-full lg:w-64 lg:gap-4 lg:items-start lg:justify-start space-y-0 lg:space-y-1 space-x-2 lg:space-x-0 bg-[#c3dac4] p-2 lg:pt-4 rounded-lg overflow-x-auto lg:overflow-x-visible">
                <TabsTrigger
                  value="password"
                  className="flex-shrink-0 justify-start px-4 py-2 text-left data-[state=active]:text-[#2b4033] lg:data-[state=active]:border-b-0 whitespace-nowrap"
                >
                  <LockKeyhole size={16} className='mr-1 data-[state=active]:text-[#2b4033]' />
                  Password Reset
                </TabsTrigger>
                <TabsTrigger
                  value="preferences"
                  className="flex-shrink-0 justify-start px-4 py-2 text-left data-[state=active]:text-[#2b4033] lg:data-[state=active]:border-b-0 whitespace-nowrap"
                >
                  <UserPen size={16} className='mr-1 data-[state=active]:text-[#2b4033]' />
                  Profile Preferences
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="flex-shrink-0 justify-start px-4 py-2 text-left data-[state=active]:text-[#2b4033] lg:data-[state=active]:border-b-0 whitespace-nowrap"
                >
                  <BellRing size={16} className='mr-1 data-[state=active]:text-[#2b4033]' />
                  Notifications
                </TabsTrigger>
                <TabsTrigger
                  value="contact"
                  className="flex-shrink-0 justify-start px-4 py-2 text-left data-[state=active]:text-[#2b4033] lg:data-[state=active]:border-b-0 whitespace-nowrap"
                >
                  <MessageSquareText size={16} className='mr-1 data-[state=active]:text-[#2b4033]' />
                  Contact Us
                </TabsTrigger>
              </TabsList>

              <div className="flex-1 lg:pl-6">
                <TabsContent value="password" className="mt-0 lg:mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl md:text-2xl">Password Reset</CardTitle>
                      <CardDescription className="hidden sm:block">
                        Change your password here. After saving, you'll be logged out.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <div className="relative">
                          <Input type={currentPasswordVisible ? "text" : "password"} id="current-password" />
                          <button
                            type="button"
                            onClick={() => {
                              setCurrentPasswordVisible(!currentPasswordVisible);
                            }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          >
                            {currentPasswordVisible ? (
                              <FaEyeSlash size={18} />
                            ) : (
                              <FaEye size={18} />
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <div className="relative">
                          <Input type={passwordVisible ? "text" : "password"} id="new-password" />
                          <button
                            type="button"
                            onClick={() => {
                              setPasswordVisible(!passwordVisible);
                            }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          >
                            {passwordVisible ? (
                              <FaEyeSlash size={18} />
                            ) : (
                              <FaEye size={18} />
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <div className="relative">
                          <Input type={cPasswordVisible ? "text" : "password"} id="confirm-password" />
                          <button
                            type="button"
                            onClick={() => {
                              setCPasswordVisible(!cPasswordVisible);
                            }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          >
                            {cPasswordVisible ? (
                              <FaEyeSlash size={18} />
                            ) : (
                              <FaEye size={18} />
                            )}
                          </button>
                        </div>
                      </div>
                      <Button className="w-full sm:w-auto bg-[#2b4033] hover:bg-[#acc8ac]">
                        Update Password
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="preferences" className="mt-0 lg:mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl md:text-2xl">Profile Preferences</CardTitle>
                      <CardDescription className="hidden sm:block">
                        Manage your profile visibility and display settings.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <Label>Profile Visible</Label>
                        <Switch />
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <Label>Profile Active Status</Label>
                        <Switch />
                      </div>
                      <div className="space-y-2">
                        <Label>Profile Page Background Color</Label>
                        <Input type="color" value="#47664d" />
                      </div>
                      <Separator className="my-4" />
                      <div className="space-y-4">
                        <h2 className='mb-4 text-xl md:text-2xl font-semibold leading-none tracking-tight' >Profile Sections Visibility</h2>

                        {['Skills', 'Education', 'Experience', 'Professional Information', 'Career Goals'].map((section) => (
                          <div key={section} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <Label>{section} Visible</Label>
                            <Switch />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notifications" className="mt-0 lg:mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl md:text-2xl">Notifications</CardTitle>
                      <CardDescription className="hidden sm:block">
                        Manage your notification preferences.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <Label>When a recruiter views your profile</Label>
                        <Switch />
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <Label>Releases</Label>
                        <Switch />
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <Label>Promotions</Label>
                        <Switch />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="contact" className="mt-0 lg:mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl md:text-2xl">Contact Us</CardTitle>
                      <CardDescription className="hidden sm:block">
                        Send us a message and we'll get back to you as soon as possible.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <textarea
                          id="message"
                          className="w-full min-h-[150px] rounded-md border border-[#dce2d4] p-2"
                        />
                      </div>
                      <Button className="w-full sm:w-auto bg-[#2b4033] hover:bg-[#acc8ac]">
                        Send Message
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </div >
    </div >
  );
};

export default ProjectSettings;