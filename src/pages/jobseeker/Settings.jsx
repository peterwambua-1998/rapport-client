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
import PreferencesSettings from './components/PreferencesSettings';
import ResetPassword from './components/ResetPassword';
import NotificationSettings from './components/NotificationSettings';
import FeedBack from './components/Feedback';

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
                <ResetPassword />

                <PreferencesSettings />

                <NotificationSettings />

                <FeedBack />
              </div>
            </div>
          </Tabs>
        </div>
      </div >
    </div >
  );
};

export default ProjectSettings;