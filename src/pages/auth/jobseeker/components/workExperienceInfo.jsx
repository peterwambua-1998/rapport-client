import React, { useState } from 'react';
import { format } from "date-fns";
import { Calendar as CalendarIcon, Plus, Briefcase, ChevronRight, Pickaxe, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TabsContent } from '@/components/ui/tabs';
import { storeExperienceInfo } from '@/services/api/api';
import { PulseLoader } from 'react-spinners';
import ErrorToast from '@/components/toasts/error';
import SuccessToast from '@/components/toasts/success';

const WorkExperienceInfo = ({ dataSourceResult, setActiveTab }) => {
    const [loading, setLoading] = useState(false);
    const [experiences, setExperiences] = useState(dataSourceResult.WorkExperience.length > 0 ? dataSourceResult.WorkExperience : []);
    const [isOpen, setIsOpen] = useState(false);
    const [currentlyWorking, setCurrentlyWorking] = useState(false);
    const [formData, setFormData] = useState({
        position: "",
        employer: "",
        description: "",
        startDate: "",
        endDate: null,
        currentlyWorking: false,
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    // Validate modal form fields
    const validateExperienceForm = () => {
        const newErrors = {};
        if (!formData.position) newErrors.position = "Field is required.";
        if (!formData.employer) newErrors.employer = "Field is required.";
        if (!formData.description) newErrors.description = "Field is required.";
        if (!formData.startDate) newErrors.startDate = "Field is required.";
        if (!currentlyWorking) {
            if (!formData.endDate) newErrors.endDate = "Field is required.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddExperience = () => {
        if (validateExperienceForm()) {
            setExperiences([...experiences, { ...formData }]);
            setFormData({
                position: "",
                employer: "",
                description: "",
                startDate: "",
                endDate: null,
                currentlyWorking: false
            });
            setCurrentlyWorking(false);
            setIsOpen(false);
        }
    };

    const removeExp = (index) => {
        setExperiences(prev => {
            return prev.filter((_, i) => i != index);
        })
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);
            await storeExperienceInfo({ experienceData: experiences });
            setLoading(false);
            SuccessToast('Your data has been stored. You can continue with other tabs.')
            setActiveTab('certifications')
        } catch (error) {
            console.log(error);
            ErrorToast('Error occurred, kindly refresh and retry');
        }
    }

    return (
        <TabsContent value="experience" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className="text-lg font-semibold">Work Experience</h3>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button className="w-full sm:w-auto bg-[#94a48c] hover:bg-[#7e8b77] text-black/70">
                            Add Experience
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] w-[95%] max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle className="text-[#2b4033]">Add Work Experience</DialogTitle>
                            <DialogDescription>
                                Add your work experience details below
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="position">Position</Label>
                                    <Input
                                        id="position"
                                        value={formData.position}
                                        onChange={(e) => handleInputChange('position', e.target.value)}
                                        placeholder="Enter position"
                                    />
                                    {errors.position && <p className="text-sm text-red-600">{errors.position}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="employer">Employer</Label>
                                    <Input
                                        id="employer"
                                        value={formData.employer}
                                        onChange={(e) => handleInputChange('employer', e.target.value)}
                                        placeholder="Enter employer"
                                    />
                                    {errors.employer && <p className="text-sm text-red-600">{errors.employer}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                        placeholder="Enter description"
                                        className="min-h-[100px]"
                                    />
                                    {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Start Date</Label>
                                        <input
                                            type="date"
                                            onChange={(e) => handleInputChange('startDate', e.target.value)}
                                            className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background'
                                        />
                                        {errors.startDate && <p className="text-sm text-red-600">{errors.startDate}</p>}
                                    </div>

                                    {!currentlyWorking && (
                                        <div className="space-y-2">
                                            <Label>End Date</Label>
                                            <input type="date" onChange={(e) => handleInputChange('endDate', e.target.value)} className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background' />
                                            {errors.endDate && <p className="text-sm text-red-600">{errors.endDate}</p>}
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="currentlyWorking"
                                        checked={currentlyWorking}

                                        onCheckedChange={(checked) => {
                                            setCurrentlyWorking(checked);
                                            handleInputChange('currentlyWorking', checked);
                                        }}
                                    />
                                    <Label htmlFor="currentlyWorking">I currently work here</Label>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-end gap-2">
                                <Button
                                    variant="outline"
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full sm:w-auto"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="button"
                                    onClick={handleAddExperience}
                                    className="w-full sm:w-auto bg-[#2b4033] hover:bg-[#1e3728] text-white"
                                >
                                    Save Draft
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="space-y-4">
                {experiences.map((exp, index) => (
                    <Card key={index} className="p-4">
                        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                            <div className="space-y-1 flex-1">
                                <h4 className="font-semibold">{exp.position}</h4>
                                <p className="text-sm text-gray-500">{exp.employer}</p>
                                <p className="text-sm text-gray-500">
                                    {format(exp.startDate, "MMM yyyy")} - {" "}
                                    {exp.currentlyWorking ? "Present" : format(exp.endDate, "MMM yyyy")}
                                </p>
                                <p className="text-sm mt-2">{exp.description}</p>
                            </div>
                            <X className="h-5 w-5 text-gray-400 hidden sm:block hover:cursor-pointer" onClick={() => removeExp(index)} />
                        </div>
                    </Card>
                ))}
            </div>

            {experiences.length === 0 && (
                <div className="text-center text-gray-800 py-8 bg-[#6a7a704b] mt-6 rounded">
                    <Pickaxe className="h-12 w-12 mx-auto mb-3 text-gray-800" />
                    <p>No work experience added yet</p>
                </div>
            )}

            <div className="flex justify-end mt-8 pt-4 border-t border-gray-400">
                <Button disabled={loading} onClick={handleSubmit} className="w-full sm:w-auto bg-[#2b4033] hover:bg-[#1e3728] text-white">
                    {loading ? <PulseLoader size={8} color="#ffffff" /> : <span>
                        Save <Download className="ml-2 h-4 w-4 inline" />
                    </span>}
                </Button>
            </div>
        </TabsContent>
    );
};

export default WorkExperienceInfo;