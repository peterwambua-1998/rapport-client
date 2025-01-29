import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase, ChevronRight, Download, Globe, GraduationCap, LinkedinIcon, MapPin, Target } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { storeProfessionalInfo } from "@/services/api/api";
import SuccessToast from "@/components/toasts/success";
import { useState } from "react";
import { PulseLoader } from "react-spinners";

const ProfessionalInfo = ({ dataSourceResult, setActiveTab }) => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({
        professionalTitle: dataSourceResult.ProfessionalTitle ? dataSourceResult.ProfessionalTitle : "",
        yearsOfExperience: dataSourceResult.YearsofExperience ? dataSourceResult.YearsofExperience : "",
        currentRole: dataSourceResult.CurrentRole ? dataSourceResult.CurrentRole : "",
        company: dataSourceResult.Company ? dataSourceResult.Company : "",
        linkedIn: dataSourceResult.LinkedInProfileUrl ? dataSourceResult.LinkedInProfileUrl : "",
        portfolio: dataSourceResult.PortfolioUrl ? dataSourceResult.PortfolioUrl : "",
        github: dataSourceResult.GithubUrl ? dataSourceResult.GithubUrl : "",
    });

    const handleInputChange = (field, value) => {
        setData((prev) => ({ ...prev, [field]: value }));
    };

    const validateForm = () => {
        const newErrors = {
            professionalTitle: data.professionalTitle === "",
            yearsOfExperience: data.yearsOfExperience === "",
            currentRole: data.currentRole === "",
            company: data.company === "",
        };
        setErrors(newErrors);
        return !Object.values(newErrors).includes(true);
    };

    const submitData = async (e) => {
        e.preventDefault();
        try {
            if (validateForm()) {
                setLoading(true);
                const res = await storeProfessionalInfo(data);
                console.log(res);
                setLoading(false);
                SuccessToast("Your data has been stored. You can continue with other tabs.");
                setActiveTab('education')
            }
        } catch (error) {
            console.log(error);
            ErrorToast("Error occurred refresh and try again.");
        }
    };

    return (
        <TabsContent value="professional" className="space-y-6 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                <div className="space-y-2">
                    <Label>Professional Title</Label>
                    <Input
                        value={data.professionalTitle}
                        onChange={(e) => handleInputChange("professionalTitle", e.target.value)}
                        placeholder="Eg: Dr"
                        className="bg-white border-slate-400"
                    />
                    {errors.professionalTitle && (
                        <p className="mt-1 text-red-500 text-sm">Field is required.</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label>Years of Experience</Label>
                    <Input
                        defaultValue={data.yearsOfExperience}
                        onChange={(e) => handleInputChange("yearsOfExperience", e.target.value)}
                        className="bg-white border-slate-400"
                        placeholder="Eg: 5"
                    />
                    {errors.yearsOfExperience && (
                        <p className="mt-1 text-red-500 text-sm">Field is required.</p>
                    )}
                </div>
            </div>

            {/* Professional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label>Current Role</Label>
                    <Input
                        className="border-slate-400"
                        placeholder="Eg: Senior Developer"
                        value={data.currentRole}
                        onChange={(e) => handleInputChange("currentRole", e.target.value)}
                    />
                    {errors.currentRole && (
                        <p className="mt-1 text-red-500 text-sm">Field is required.</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label>Company</Label>
                    <Input
                        className="border-slate-400"
                        placeholder="Current company"
                        value={data.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                    />
                    {errors.company && (
                        <p className="mt-1 text-red-500 text-sm">Field is required.</p>
                    )}
                </div>
            </div>



            {/* Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label>LinkedIn Profile</Label>
                    <Input
                        className="border-slate-400"
                        placeholder="LinkedIn URL"
                        value={data.linkedIn}
                        onChange={(e) => handleInputChange("linkedIn", e.target.value)}
                    />
                    
                </div>
                <div className="space-y-2">
                    <Label>Portfolio</Label>
                    <Input
                        className="border-slate-400"
                        placeholder="Eg: https://yourwebsite.com"
                        value={data.portfolio}
                        onChange={(e) => handleInputChange("portfolio", e.target.value)}
                    />
                    
                </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label>Github</Label>
                    <Input
                        className="border-slate-400"
                        placeholder="LinkedIn URL"
                        value={data.github}
                        onChange={(e) => handleInputChange("github", e.target.value)}
                    />
                    
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end mt-8 pt-4 border-t border-gray-400">
                {/* <Button variant="outline">Save Draft</Button> */}
                <Button disabled={loading} type="button" onClick={submitData} className="bg-[#2b4033] hover:bg-[#1e3728] text-white">
                    {loading ? <PulseLoader size={8} color="#ffffff" /> : <span>
                        Save <Download className="ml-2 h-4 w-4 inline" />
                    </span>}

                </Button>
            </div>
        </TabsContent>
    );
}

export default ProfessionalInfo;