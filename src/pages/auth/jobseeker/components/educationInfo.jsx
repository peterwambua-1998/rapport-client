import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogHeader,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog";
import { BookOpen, Download, Pencil, X } from "lucide-react";
import { format } from "date-fns";
import { storeEducationInfo } from "@/services/api/api";
import ErrorToast from "@/components/toasts/error";
import { PulseLoader } from "react-spinners";
import SuccessToast from "@/components/toasts/success";
import { Card } from "@/components/ui/card";

const EducationInfo = ({ dataSourceResult, setActiveTab }) => {
    const [educationList, setEducationList] = useState(dataSourceResult.Education.length > 0 ? dataSourceResult.Education : []);
    const [loading, setLoading] = useState(false);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [educationData, setEducationData] = useState({
        school: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (field, value) => {
        setEducationData((prev) => ({ ...prev, [field]: value }));
    };

    // Validate modal form fields
    const validateEducationForm = () => {
        const newErrors = {};
        if (!educationData.school) newErrors.school = "Field is required.";
        if (!educationData.degree) newErrors.degree = "Field is required.";
        if (!educationData.major) newErrors.major = "Field is required.";
        if (!educationData.startDate) newErrors.startDate = "Field is required.";
        if (!educationData.endDate) newErrors.endDate = "Field is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleEditEducation = (index) => {
        const education = educationList[index];
        setEducationData({
            school: education.school,
            degree: education.degree,
            major: education.major,
            startDate: education.startDate,
            endDate: education.endDate,
        });
        setEditIndex(index);
        setIsModalOpen(true);
    };

    const handleSaveEducation = () => {
        if (validateEducationForm()) {
            if (editIndex !== null) {
                // Update existing education
                const updatedList = [...educationList];
                updatedList[editIndex] = { ...educationData };
                setEducationList(updatedList);
            } else {
                // Add new education
                setEducationList([...educationList, { ...educationData }]);
            }

            // Reset form
            setEducationData({
                school: "",
                degree: "",
                major: "",
                startDate: "",
                endDate: "",
            });
            setEditIndex(null);
            setErrors({});
            setIsModalOpen(false);
        }
    };

    const handleDeleteEducation = (index) => {
        const updatedList = educationList.filter((_, i) => i !== index);
        setEducationList(updatedList);
    };

    const handleModalOpen = (open) => {
        if (!open) {
            // Reset form when closing modal
            setEducationData({
                school: "",
                degree: "",
                major: "",
                startDate: "",
                endDate: "",
            });
            setEditIndex(null);
            setErrors({});
        }
        setIsModalOpen(open);
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const store = await storeEducationInfo({ educationData: educationList });
            setLoading(false);
            SuccessToast("Your data has been stored. You can continue with other tabs.");
            setActiveTab("experience");
        } catch (error) {
            console.log(error);
            setLoading(false);
            ErrorToast("Error occurred, kindly refresh and retry");
        }
    };

    return (
        <TabsContent value="education" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className="text-lg sm:text-xl font-semibold">Education</h3>
                <Dialog open={isModalOpen} onOpenChange={handleModalOpen}>
                    <DialogTrigger asChild>
                        <Button className="w-full sm:w-auto bg-[#94a48c] hover:bg-[#7e8b77] text-black/70">
                            Add Education
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] w-[95%] max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle className="text-[#2b4033]">
                                {editIndex !== null ? "Edit Education" : "Add Education"}
                            </DialogTitle>
                            <DialogDescription>
                                {editIndex !== null
                                    ? "Edit your education details below"
                                    : "Add your education details below"}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4">
                            <div>
                                <Label>School</Label>
                                <Input
                                    className="w-full"
                                    placeholder="Enter name of the school"
                                    value={educationData.school}
                                    onChange={(e) => handleInputChange("school", e.target.value)}
                                />
                                {errors.school && <p className="text-sm text-red-600">{errors.school}</p>}
                            </div>

                            <div>
                                <Label>Degree</Label>
                                <Input
                                    className="w-full"
                                    placeholder="Enter degree"
                                    value={educationData.degree}
                                    onChange={(e) => handleInputChange("degree", e.target.value)}
                                />
                                {errors.degree && <p className="text-sm text-red-600">{errors.degree}</p>}
                            </div>

                            <div>
                                <Label>Major</Label>
                                <Input
                                    className="w-full"
                                    placeholder="Enter Major"
                                    value={educationData.major}
                                    onChange={(e) => handleInputChange("major", e.target.value)}
                                />
                                {errors.major && <p className="text-sm text-red-600">{errors.major}</p>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <Label>Start Date</Label>
                                    <Input
                                        type="date"
                                        value={educationData.startDate}
                                        onChange={(e) => handleInputChange("startDate", e.target.value)}
                                    />
                                    {errors.startDate && <p className="text-sm text-red-600">{errors.startDate}</p>}
                                </div>
                                <div>
                                    <Label>Graduation Date</Label>
                                    <Input
                                        type="date"
                                        value={educationData.endDate}
                                        onChange={(e) => handleInputChange("endDate", e.target.value)}
                                    />
                                    {errors.endDate && <p className="text-sm text-red-600">{errors.endDate}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                            <Button type="button" onClick={() => handleModalOpen(false)} variant="outline">
                                Cancel
                            </Button>
                            <Button
                                type="button"
                                className="bg-[#2b4033] hover:bg-[#1e3728] text-white"
                                onClick={handleSaveEducation}
                            >
                                {editIndex !== null ? "Update" : "Save Draft"}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Display the education list */}
            {educationList.length > 0 ? (
                <div className="space-y-4">
                    {educationList.map((education, index) => (
                        // <div
                        //     key={index}
                        //     className="p-4 border rounded shadow-sm bg-white border-[#c3dac4]"
                        // >
                        //     <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4">
                        //         <div className="space-y-2">
                        //             <h4 className="font-semibold text-sm sm:text-base">{education.school}</h4>
                        //             <p className="text-xs sm:text-sm text-gray-500">
                        //                 {education.degree} in {education.major}
                        //             </p>
                        //             <p className="text-xs sm:text-sm text-gray-500">
                        //                 {format(new Date(education.startDate), "MMM yyyy")} -{" "}
                        //                 {format(new Date(education.endDate), "MMM yyyy")}
                        //             </p>
                        //         </div>
                        //         <div className="flex space-x-2">
                        //             <Button
                        //                 variant="ghost"
                        //                 size="sm"
                        //                 onClick={() => handleEditEducation(index)}
                        //             >
                        //                 <Pencil className="h-4 w-4 text-gray-500" />
                        //             </Button>
                        //             <Button
                        //                 variant="ghost"
                        //                 size="sm"
                        //                 onClick={() => handleDeleteEducation(index)}
                        //                 className="text-red-500 hover:text-red-700"
                        //             >
                        //                 ×
                        //             </Button>
                        //         </div>
                        //     </div>
                        // </div>
                        <Card key={index} className="p-4">
                            <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                                <div className="space-y-1 flex-1">
                                    <h4 className="font-semibold">{education.school}</h4>
                                    <p className="text-sm text-gray-500">{education.degree} in {education.major}</p>
                                    <p className="text-xs sm:text-sm text-gray-500">
                                        {education.startDate} -{" "}
                                        {education.endDate}
                                     </p>
                                    
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleEditEducation(index)}
                                    >
                                        <Pencil className="h-4 w-4 text-gray-500" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleDeleteEducation(index)}
                                    >
                                        <X className="h-4 w-4 text-gray-500" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-800 py-8 bg-[#6a7a704b] mt-6 rounded">
                    <BookOpen className="h-12 w-12 mx-auto mb-3 text-gray-800" />
                    <p>No education details added yet.</p>
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end mt-8 pt-4 border-t border-gray-400">
                <Button
                    disabled={loading}
                    type="button"
                    onClick={handleSubmit}
                    className="bg-[#2b4033] hover:bg-[#1e3728] text-white"
                >
                    {loading ? (
                        <PulseLoader size={8} color="#ffffff" />
                    ) : (
                        <span>
                            Save <Download className="ml-2 h-4 w-4 inline" />
                        </span>
                    )}
                </Button>
            </div>
        </TabsContent>
    );
};

export default EducationInfo;