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
import SkillsTab from './components/SkillsTab';
import EducationInfo from './components/educationInfo';
import WorkExperienceInfo from './components/workExperienceInfo';
import CertificationsTab from './components/certificaionsInfo';
import { PiCertificateBold } from "react-icons/pi";
import DataSource from './components/DataSource';
import ErrorToast from '@/components/toasts/error';
import { Button } from '@/components/ui/button';
import { validateIntro, validateProfileInfo } from '@/services/helpers/helpers';
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
        }

        fetchProfile();
    }, [])

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
            <div className="flex items-center justify-center min-h-screen">
                <FadeLoader loading={loading} size={15} color='#abd2ab' />
                <p>Checking if we have any of your information....</p>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <FadeLoader loading={loading} size={15} color='#abd2ab' />
                <p className='text-sm'>Loading data, please be patient.</p>
            </div>
        )
    }

    if (dataSource == null) {
        return <DataSource setDataSource={setDataSource} setLoading={setLoading} setDataSourceResult={setDataSourceResult} />
    }

    return (
        <div className="min-h-screen bg-white py-8">
            <div className="container mx-auto max-w-6xl px-4">
                {/* Header Section */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="text-center mb-8"
                >
                    <h1 className="text-3xl font-bold text-[#2b4033] mb-2">Complete Your Professional Profile</h1>
                    <p className="text-gray-600 mb-4">Let's make your profile stand out to employers</p>

                    
                    <Alert className="w-[50vw] mx-auto mb-4">
                        <CircleAlert className="h-4 w-4 text-[#2b4033]" />
                        <AlertDescription className="ml-2">
                            After filling information in each tab, save the data to avoid redoing all over again!
                        </AlertDescription>
                    </Alert>

                    {completeProfile &&
                        <div>
                            <Button onClick={() => navigate('/jobseeker/dashboard')} className="bg-[#2b4033] hover:bg-[#1e3728] text-white">Proceed To Dashboard</Button>
                        </div>
                    }


                </motion.div>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <Card className="shadow-none bg-[#c3dac4]">
                        <CardContent className="p-6">
                            {/* tabs */}
                            <Tabs defaultValue="personal" className="space-y-6">
                                <TabsList className="grid grid-cols-2 md:grid-cols-6 gap-4 bg-gray-100 p-2 rounded-sm border-none">
                                    <TabsTrigger
                                        value="personal"
                                        onClick={() => setActiveTab("personal")}
                                        className={activeTab === "personal" ? "data-[state=active]:bg-white" : ""}
                                    >
                                        <UserCircle className="mr-2 h-4 w-4 text-[#abd2ab] " />
                                        Personal
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="professional"
                                        onClick={() => setActiveTab("professional")}
                                        className={activeTab === "professional" ? "data-[state=active]:bg-white" : ""}
                                    >
                                        <Briefcase className="mr-2 h-4 w-4 text-[#abd2ab]" />
                                        Professional
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="education"
                                        onClick={() => setActiveTab("education")}
                                        className={activeTab === "education" ? "data-[state=active]:bg-white" : ""}
                                    >
                                        <BookOpen className="mr-2 h-4 w-4 text-[#abd2ab]" />
                                        Education
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="experience"
                                        onClick={() => setActiveTab("experience")}
                                        className={activeTab === "experience" ? "data-[state=active]:bg-white" : ""}
                                    >
                                        <Pickaxe className="mr-2 h-4 w-4 text-[#abd2ab]" />
                                        Work experience
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="certifications"
                                        onClick={() => setActiveTab("certifications")}
                                        className={activeTab === "experience" ? "data-[state=active]:bg-white" : ""}
                                    >
                                        <PiCertificateBold className="mr-2 h-5 w-5 text-[#abd2ab]" />
                                        Certifications
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="skills"
                                        onClick={() => setActiveTab("skills")}
                                        className={activeTab === "skills" ? "data-[state=active]:bg-white" : ""}
                                    >
                                        <Target className="mr-2 h-4 w-4 text-[#abd2ab]" />
                                        Skills
                                    </TabsTrigger>

                                </TabsList>

                                {/* personal info */}
                                <PersonalInfo dataSourceResult={dataSourceResult} setActiveTab={setActiveTab} />

                                {/* professional info */}
                                <ProfessionalInfo dataSourceResult={dataSourceResult} setActiveTab={setActiveTab} />

                                {/* education */}
                                <EducationInfo dataSourceResult={dataSourceResult} setActiveTab={setActiveTab} />

                                {/* work exp */}
                                <WorkExperienceInfo dataSourceResult={dataSourceResult} setActiveTab={setActiveTab} />

                                {/* certifications */}
                                <CertificationsTab dataSourceResult={dataSourceResult} setActiveTab={setActiveTab} />

                                {/* skills info */}
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