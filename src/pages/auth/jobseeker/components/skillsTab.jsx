import React, { useState } from 'react';
import { Blocks, ChevronRight, ClipboardPenLine, Download, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { TabsContent } from '@/components/ui/tabs';
import SuccessToast from '@/components/toasts/success';
import ErrorToast from '@/components/toasts/error';
import { PulseLoader } from 'react-spinners';
import { getSeekerProfile, storeSkillInfo } from '@/services/api/api';
import { validateProfileInfo } from '@/services/helpers/helpers';
import { useNavigate } from 'react-router-dom';

const SkillsTab = ({ dataSourceResult, setCompleteProfile, completeProfile }) => {
    const navigate = useNavigate();
    const [skills, setSkills] = useState(dataSourceResult.Skills.length > 0 ? dataSourceResult.Skills : []);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        proficiency: ''
    });
    const [errors, setErrors] = useState({});
    const [skillIndex, setSkillIndex] = useState(null)

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Field is required';
        } else if (formData.name.length < 2) {
            newErrors.name = 'Skill name must be at least 2 characters';
        }

        if (!formData.proficiency || formData.proficiency == null) {
            newErrors.proficiency = 'Field is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleAddSkill = () => {
        if (validateForm()) {
            const newSkill = {
                name: formData.name,
                proficiency: formData.proficiency
            };

            if (skillIndex !== null) {
                // Edit existing skill
                const updatedSkills = [...skills];
                updatedSkills[skillIndex] = newSkill;
                setSkills(updatedSkills);
            } else {
                // Add new skill
                setSkills(prev => ([...prev, newSkill]));
            }

            setFormData({
                name: '',
                proficiency: ''
            });
            setSkillIndex(null);
            setErrors({});
            setIsOpen(false);
        }
    };

    // ... rest of the existing methods remain the same
    const removeSkill = (index) => {
        setSkills(prev => {
            return prev.filter((_, i) => i !== index)
        });
    };

    const getProficiencyColor = (proficiency) => {
        const colors = {
            beginner: "bg-yellow-100 text-yellow-800",
            intermediate: "bg-blue-100 text-blue-800",
            advanced: "bg-green-100 text-green-800",
            expert: "bg-purple-100 text-purple-800",
            error: 'bg-red-100 text-red-800'
        };
        if (!proficiency) {
            return colors.error
        }
        return colors[proficiency] || colors.intermediate;
    };

    const handleSubmit = async () => {
        try {
            // check if all skills have name and proficiency
            let hasAllFields = true;
            skills.forEach(skill => {
                if (!skill.proficiency || skill.proficiency == null || skill.proficiency == "" || skill.proficiency == "null") {
                    hasAllFields = false;
                }
            })

            if (!hasAllFields) {
                ErrorToast('Ensure all skills have a name and proficiency level');
                return;
            }

            setLoading(true);
            await storeSkillInfo({ skillData: skills });
            setLoading(false);
            SuccessToast('Your data has been stored. You can continue with other tabs.')

            let res = await getSeekerProfile();
            let finished = await validateProfileInfo(res.data.profileInfo);
            setCompleteProfile(finished.isValid)
            
        } catch (error) {
            console.log(error);
            setLoading(false);
            ErrorToast('Error occurred, kindly refresh and retry');
        }
    }

    return (
        <TabsContent value="skills" className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold"> Skills</h3>
                <Dialog
                    open={isOpen}
                    onOpenChange={(open) => {
                        setIsOpen(open);
                        if (!open) {
                            setSkillIndex(null);
                        }
                    }}
                >
                    <DialogTrigger asChild >
                        <Button className="bg-[#94a48c] hover:bg-[#7e8b77] text-black/70" >
                            {skillIndex != null ? "Edit Skill" : "Add Skill"}
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]" >
                        <DialogHeader>
                            <DialogTitle className="text-[#2b4033]" >
                                {skillIndex != null ? "Edit Skill" : "Add Skill"}
                            </DialogTitle>
                            <DialogDescription>
                                {
                                    skillIndex != null
                                        ? "Edit the details of your existing skill"
                                        : "Add a new technical skill to your profile"
                                }
                            </DialogDescription>
                        </DialogHeader>
                        <div  className="space-y-4" >
                            <div className="space-y-2" >
                                <Label htmlFor="skillName" > Skill Name </Label>
                                <Input
                                    id="skillName"
                                    name="skillName"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    placeholder="Enter skill name"

                                />
                                {errors.name && <p className='text-sm text-red-500'>{errors.name}</p>}
                            </div>

                            <div className="space-y-2" >
                                <Label htmlFor="proficiency"> Proficiency Level </Label>
                                <Select
                                    value={formData.proficiency}
                                    onValueChange={(value) => handleInputChange('proficiency', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select proficiency" />
                                    </SelectTrigger>
                                    < SelectContent>
                                        <SelectItem value="beginner">Beginner</SelectItem>
                                        <SelectItem value="intermediate">Intermediate</SelectItem>
                                        <SelectItem value="advanced">Advanced</SelectItem>
                                        <SelectItem value="expert">Expert</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.proficiency && <p className='text-sm text-red-500'>{errors.proficiency}</p>}
                            </div>

                            <div className="flex justify-end space-x-2" >
                                <Button
                                    variant="outline"
                                    type="button"
                                    onClick={() => {
                                        setIsOpen(false);
                                        setSkillIndex(null);
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="button"
                                    onClick={handleAddSkill}
                                    className="bg-[#2b4033] hover:bg-[#1e3728] text-white"
                                >
                                    {skillIndex != null ? "Update Draft" : "Save Draft"}
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Technical Skills Section */}
            <div className="space-y-4" >
                <h4 className="font-medium">Technical Skills</h4>
                {
                    skills.length != 0 &&
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
                        {skills.map((skill, index) => (
                            <Card key={index} className="" >
                                <CardHeader className="p-4" >
                                    <CardTitle className="text-lg" > {skill.name} </CardTitle>
                                    < CardDescription >
                                        <Badge variant="secondary" className={`${getProficiencyColor(skill.proficiency)}`} >
                                            {(!skill.proficiency || skill.proficiency == "null") ? 'Add proficiency' : skill.proficiency}
                                        </Badge>
                                    </CardDescription>
                                </CardHeader>
                                < CardFooter className="pl-4 pb-2 flex gap-4 justify-end" >
                                    <Button
                                        size="icon"
                                        onClick={() => {
                                            setSkillIndex(index)
                                            setFormData({ name: skill.name, proficiency: skill.proficiency })
                                            setIsOpen(true);
                                        }}
                                        className="h-8 w-8 bg-[#2b4033] hover:bg-[#1e3728]"
                                    >
                                        <ClipboardPenLine className="h-4 w-4 text-white" />
                                    </Button>
                                    < Button
                                        size="icon"
                                        onClick={() => removeSkill(index)}
                                        className="h-8 w-8 bg-red-800 hover:bg-red-900"
                                    >
                                        <X className="h-4 w-4 " />
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                }

                {
                    skills.length === 0 && (
                        <div className="text-center text-gray-800 py-8 bg-[#6a7a704b] rounded" >
                            <p>No technical skills added yet </p>
                        </div>
                    )
                }
            </div>



            {/* Action Buttons */}
            <div className="flex justify-between mt-8 pt-4 border-t border-gray-400" >
                <Button variant="outline" onClick={() => navigate('/jobseeker/dashboard')} disabled={completeProfile == true ? false : true}>Proceed To Dashboard</Button>
                <Button disabled={loading} type="button" onClick={handleSubmit} className="bg-[#2b4033] hover:bg-[#1e3728] text-white">
                    {loading ? <PulseLoader size={8} color="#ffffff" /> : <span>
                        Save  <Download className="ml-2 h-4 w-4 inline" />
                    </span>}
                </Button>
            </div>
        </TabsContent>
    );
};

export default SkillsTab;