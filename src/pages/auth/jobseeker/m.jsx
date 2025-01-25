import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight, UserCircle, MapPin, Briefcase, Target, CheckCircle2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const IntroductionProfile = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [progress, setProgress] = useState(20);
  const [data, setData] = useState({
    aboutMe: "",
    location: "",
    education: "",
    currentRole: "",
    company: "",
    linkedin: "",
    portfolio: "",
    careerGoals: "",
    skills: [],
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const validateFields = () => {
    const newErrors = {};
    if (!data.location) newErrors.location = "Location is required.";
    if (!data.currentRole) newErrors.currentRole = "Current role is required.";
    if (!data.linkedin) newErrors.linkedin = "LinkedIn profile URL is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateFields()) {
      console.log("Form data saved:", data);
      alert("Profile saved successfully!");
      setProgress(100); // Simulate profile completion progress.
    } else {
      alert("Please fill all required fields.");
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(to bottom, #c3dac4, #ffffff)",
        padding: "2rem 0",
      }}
    >
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
          }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold" style={{ color: "#2b4033" }}>
            Complete Your Professional Profile
          </h1>
          <p className="mb-6" style={{ color: "#949894" }}>
            Let's make your profile stand out to employers
          </p>

          <div className="w-full max-w-md mx-auto">
            <Progress value={progress} className="h-2" style={{ backgroundColor: "#22c55e" }} />
            <p className="text-sm" style={{ color: "#949894", marginTop: "0.5rem" }}>
              {progress}% Complete
            </p>
          </div>
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
          }}
        >
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <Tabs defaultValue="personal" className="space-y-6">
                <TabsList
                  className="grid grid-cols-3 gap-4 p-1"
                  style={{ backgroundColor: "#c3dac4" }}
                >
                  <TabsTrigger
                    value="personal"
                    onClick={() => setActiveTab("personal")}
                    className={activeTab === "personal" ? "data-[state=active]:bg-white" : ""}
                  >
                    <UserCircle className="mr-2 h-4 w-4" />
                    Personal
                  </TabsTrigger>
                  <TabsTrigger
                    value="professional"
                    onClick={() => setActiveTab("professional")}
                    className={activeTab === "professional" ? "data-[state=active]:bg-white" : ""}
                  >
                    <Briefcase className="mr-2 h-4 w-4" />
                    Professional
                  </TabsTrigger>
                  <TabsTrigger
                    value="skills"
                    onClick={() => setActiveTab("skills")}
                    className={activeTab === "skills" ? "data-[state=active]:bg-white" : ""}
                  >
                    <Target className="mr-2 h-4 w-4" />
                    Skills
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-6">
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">About Me</Label>
                    <Textarea
                      placeholder="Share your professional journey..."
                      value={data.aboutMe}
                      onChange={(e) => handleInputChange("aboutMe", e.target.value)}
                      className="min-h-[100px] resize-none"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label>Location</Label>
                    <Input
                      placeholder="City, Country"
                      value={data.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      className="bg-white"
                    />
                    {errors.location && (
                      <p className="text-sm text-red-600">{errors.location}</p>
                    )}
                  </div>

                  <div>
                    <Label>Education Level</Label>
                    <Select
                      onValueChange={(value) => handleInputChange("education", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select education level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                        <SelectItem value="masters">Master's Degree</SelectItem>
                        <SelectItem value="phd">Ph.D.</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                <TabsContent value="professional" className="space-y-6">
                  <div className="space-y-4">
                    <Label>Current Role</Label>
                    <Input
                      placeholder="e.g. Senior Developer"
                      value={data.currentRole}
                      onChange={(e) => handleInputChange("currentRole", e.target.value)}
                    />
                    {errors.currentRole && (
                      <p className="text-sm text-red-600">{errors.currentRole}</p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <Label>LinkedIn Profile</Label>
                    <Input
                      placeholder="LinkedIn URL"
                      value={data.linkedin}
                      onChange={(e) => handleInputChange("linkedin", e.target.value)}
                    />
                    {errors.linkedin && (
                      <p className="text-sm text-red-600">{errors.linkedin}</p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
              <div className="flex justify-between mt-8 pt-4 border-t">
                <Button variant="outline">Save Draft</Button>
                <Button
                  className="text-white"
                  style={{ backgroundColor: "#22c55e" }}
                  onClick={() => handleSubmit()}
                >
                  Continue
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <motion.div
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Alert>
              <CheckCircle2 className="h-4 w-4" style={{ color: "#22c55e" }} />
              <AlertDescription className="ml-2">
                Pro tip: Profiles with completed skills are 40% more likely to be noticed!
              </AlertDescription>
            </Alert>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default IntroductionProfile;