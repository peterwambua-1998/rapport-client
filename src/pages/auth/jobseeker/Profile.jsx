import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCircle, Briefcase, Target, BookOpen, Pickaxe, CircleAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FadeLoader } from "react-spinners";
import { getSeekerProfile } from '@/services/api/api';
import PersonalInfo from './components/personalInfo';
import ProfessionalInfo from './components/professionalInfo';
import SkillsTab from './components/skillsTab';
import EducationInfo from './components/educationInfo';
import WorkExperienceInfo from './components/workExperienceInfo';
import CertificationsTab from './components/certificaionsInfo';
import { PiCertificateBold } from "react-icons/pi";
import DataSource from './components/dataSource';
import ErrorToast from '@/components/toasts/error';
import { Button } from '@/components/ui/button';
import { validateIntro } from '@/services/helpers/helpers';
import { Alert, AlertDescription } from '@/components/ui/alert';

const IntroductionProfile = () => {
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [dataSource, setDataSource] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("personal");
    const [dataSourceResult, setDataSourceResult] = useState([]);
    const [completeProfile, setCompleteProfile] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const requiredFields = [
                    'AboutMe', 'ProfessionalTitle', 'Location', 'Industry',
                    'YearsofExperience', 'CurrentRole', 'Company', 'Skills', 'videoUrl', 'CurrentRole',
                    'Company', 'Education', 'WorkExperience',
                ];
                const res = await getSeekerProfile();
                let finished = await validateIntro(res.data.profileInfo);
                let info = res.data.profileInfo;
                let checkForValue = false;
                requiredFields.forEach(value => {
                    if (info[value].length > 0) {
                        checkForValue = true;
                    }
                })
                if (checkForValue) {
                    setDataSource('resume')
                }
                setDataSourceResult(res.data.profileInfo)
                setLoadingProfile(false);
                setCompleteProfile(finished.isValid)
            } catch (error) {
                console.log(error)
                ErrorToast('Error occurred, kindly refresh and try again!');
            }
        };

        fetchProfile();
    }, []);


    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    if (loadingProfile) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
                <FadeLoader loading={loading} size={15} color="#2b4033" />
                <p className="text-sm mt-4">Checking if we have any of your information...</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
                <FadeLoader loading={loading} size={15} color="#2b4033" />
                <p className="text-sm mt-4">Extracting information, please be patient</p>
            </div>
        );
    }

    if (dataSource == null) {
        return (
            <DataSource
                setDataSource={setDataSource}
                setLoading={setLoading}
                setDataSourceResult={setDataSourceResult}
            />
        );
    }

    return (
        <div className="min-h-screen bg-white py-6 sm:py-8">
            <div className="container mx-auto max-w-7xl px-4">
                {/* Header Section */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="text-center mb-6 sm:mb-8 px-2"
                >
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#2b4033] mb-2">
                        Complete Your Professional Profile
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                        Let's make your profile stand out to employers
                    </p>

                    <Alert className="max-w-full sm:w-[80%] lg:w-[50%] mx-auto mb-4 text-sm sm:text-base">
                        <CircleAlert className="h-6 w-6 text-[#2b4033]" />
                        <AlertDescription className="ml-2">
                            After filling information in each tab, save the data to avoid redoing all over again!
                        </AlertDescription>
                    </Alert>

                    {completeProfile && (
                        <div className="mt-4">
                            <Button
                                onClick={() => navigate('/jobseeker/dashboard')}
                                className="bg-[#2b4033] hover:bg-[#1e3728] text-white text-sm sm:text-base"
                            >
                                Proceed To Dashboard
                            </Button>
                        </div>
                    )}
                </motion.div>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <Card className="shadow-none bg-[#c3dac4]">
                        <CardContent className="p-4 sm:p-6">
                            {/* Tabs */}
                            <Tabs defaultValue="personal" className="space-y-6">
                                <TabsList className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 bg-gray-100 p-2 rounded-md border-none">
                                    <TabsTrigger
                                        value="personal"
                                        onClick={() => setActiveTab("personal")}
                                        className={`text-xs sm:text-sm ${activeTab === "personal" ? "data-[state=active]:bg-white font-bold" : ""}`}
                                    >
                                        <UserCircle className="mr-2 h-5 w-5 text-[#abd2ab] hidden md:block lg:block" />
                                        Personal
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="professional"
                                        onClick={() => setActiveTab("professional")}
                                        className={`text-xs sm:text-sm ${activeTab === "professional" ? "data-[state=active]:bg-white font-bold" : ""}`}
                                    >
                                        <Briefcase className="mr-2 h-5 w-5 text-[#abd2ab] hidden md:block lg:block" />
                                        Professional
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="education"
                                        onClick={() => setActiveTab("education")}
                                        className={`text-xs sm:text-sm ${activeTab === "education" ? "data-[state=active]:bg-white font-bold" : ""}`}
                                    >
                                        <BookOpen className="mr-2 h-5 w-5 text-[#abd2ab] hidden md:block lg:block" />
                                        Education
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="experience"
                                        onClick={() => setActiveTab("experience")}
                                        className={`text-xs sm:text-sm ${activeTab === "experience" ? "data-[state=active]:bg-white font-bold" : ""}`}
                                    >
                                        <Pickaxe className="mr-2 h-5 w-5 text-[#abd2ab] hidden md:block lg:block" />
                                        Work Experience
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="certifications"
                                        onClick={() => setActiveTab("certifications")}
                                        className={`text-xs sm:text-sm ${activeTab === "certifications" ? "data-[state=active]:bg-white font-bold" : ""}`}
                                    >
                                        <PiCertificateBold className="mr-2 h-5 w-5 text-[#abd2ab] hidden md:block lg:block" />
                                        Certifications
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="skills"
                                        onClick={() => setActiveTab("skills")}
                                        className={`text-xs sm:text-sm ${activeTab === "skills" ? "data-[state=active]:bg-white font-bold" : ""}`}
                                    >
                                        <Target className="mr-2 h-5 w-5 text-[#abd2ab] hidden md:block lg:block" />
                                        Skills
                                    </TabsTrigger>
                                </TabsList>

                                {/* Tabs Content */}
                                <PersonalInfo dataSourceResult={dataSourceResult} setActiveTab={setActiveTab} />
                                <ProfessionalInfo dataSourceResult={dataSourceResult} setActiveTab={setActiveTab} />
                                <EducationInfo dataSourceResult={dataSourceResult} setActiveTab={setActiveTab} />
                                <WorkExperienceInfo dataSourceResult={dataSourceResult} setActiveTab={setActiveTab} />
                                <CertificationsTab dataSourceResult={dataSourceResult} setActiveTab={setActiveTab} />
                                <SkillsTab
                                    dataSourceResult={dataSourceResult}
                                    setCompleteProfile={setCompleteProfile}
                                    completeProfile={completeProfile}
                                />
                            </Tabs>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};

export default IntroductionProfile;