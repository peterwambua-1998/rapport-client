import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogTitle, DialogOverlay, DialogContent, DialogHeader, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, SchoolIcon, GraduationCap, ChevronRight, Pickaxe, BookOpen, Download } from "lucide-react";
import { format, parseISO } from 'date-fns';
import { storeEducationInfo } from "@/services/api/api";
import ErrorToast from "@/components/toasts/error";
import { PulseLoader } from "react-spinners";
import SuccessToast from "@/components/toasts/success";

const EducationInfo = ({ dataSourceResult, setActiveTab }) => {
    const [educationList, setEducationList] = useState(dataSourceResult.Education.length > 0 ? dataSourceResult.Education : []);
    const [loading, setLoading] = useState(false);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
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
        if (!educationData.endDate)
            newErrors.endDate = "Field is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddEducation = () => {
        if (validateEducationForm()) {
            setEducationList([...educationList, { ...educationData }]);

            setEducationData({
                school: "",
                degree: "",
                major: "",
                startDate: "",
                endDate: "",
            });
            setErrors({});
            setIsModalOpen(false);
        }
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const store = await storeEducationInfo({ educationData: educationList });
            setLoading(false);
            SuccessToast('Your data has been stored. You can continue with other tabs.')
            setActiveTab('experience')
        } catch (error) {
            console.log(error);
            setLoading(false);
            ErrorToast('Error occurred, kindly refresh and retry');
        }
    }

    return (
        <TabsContent value="education" className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Education</h3>
                {/* Modal for Adding Education */}
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                        <Button className="w-full sm:w-auto bg-[#94a48c] hover:bg-[#7e8b77] text-black/70">
                            Add Education
                        </Button>
                    </DialogTrigger>
                    <DialogContent
                        className="sm:max-w-[600px] w-[95%] max-h-[90vh] overflow-y-auto"
                    >
                        <DialogHeader>
                            <DialogTitle className="text-[#2b4033]">Add Education</DialogTitle>
                            <DialogDescription>
                                Add your education details below
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4">
                            <div>
                                <Label>School</Label>
                                <Input
                                    placeholder="Enter name of the school"
                                    value={educationData.school}
                                    onChange={(e) => handleInputChange("school", e.target.value)}
                                />
                                {errors.school && <p className="text-sm text-red-600">{errors.school}</p>}
                            </div>

                            <div>
                                <Label>Degree</Label>
                                <Input
                                    placeholder="Enter degree"
                                    value={educationData.degree}
                                    onChange={(e) => handleInputChange("degree", e.target.value)}
                                />
                                {errors.degree && <p className="text-sm text-red-600">{errors.degree}</p>}
                            </div>

                            <div>
                                <Label>Major</Label>
                                <Input
                                    placeholder="Enter Major"
                                    value={educationData.major}
                                    onChange={(e) => handleInputChange("major", e.target.value)}
                                />
                                {errors.major && <p className="text-sm text-red-600">{errors.major}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
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
                                    {errors.endDate && (
                                        <p className="text-sm text-red-600">{errors.endDate}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end space-x-4">
                            <Button type="button" onClick={() => setIsModalOpen(false)} variant="outline">
                                Cancel
                            </Button>
                            <Button type="button" className="bg-[#2b4033] hover:bg-[#1e3728] text-white" onClick={handleAddEducation}>
                                Save Draft
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>

            </div>

            {/* Display the education list */}
            {educationList.length > 0 ? (
                <div className="space-y-4">
                    {educationList.map((education, index) => (
                        <div
                            key={index}
                            className="p-4 border rounded shadow-sm flex justify-between items-center"
                            style={{
                                backgroundColor: "#ffffff",
                                borderColor: "#c3dac4",
                            }}
                        >
                            <div>
                                <h4 className="font-semibold">{education.school}</h4>
                                <p className="text-sm text-gray-500">
                                    {education.degree} in {education.major}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {format(education.startDate, "MMM yyyy")} -{" "}
                                    {format(education.endDate, "MMM yyyy")}
                                </p>
                            </div>
                        </div>
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
                {/* <Button variant="outline">Save Draft</Button> */}
                <Button disabled={loading} type="button" onClick={handleSubmit} className="bg-[#2b4033] hover:bg-[#1e3728] text-white">
                    {loading ? <PulseLoader size={8} color="#ffffff" /> : <span>
                        Save <Download className="ml-2 h-4 w-4 inline" />
                    </span>}
                </Button>
            </div>
        </TabsContent>
    );
}

export default EducationInfo;