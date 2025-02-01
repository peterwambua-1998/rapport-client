import ErrorToast from "@/components/toasts/error";
import SuccessToast from "@/components/toasts/success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { TabsContent } from "@/components/ui/tabs";
import { getPreferences, storePreferences } from "@/services/api/api";
import { useEffect, useState } from "react";

const PreferencesSettings = () => {
    const [formData, setFormData] = useState({
        source: 'profile',
        profileVisible: false,
        profileActiveStatus: false,
        profilePageBackgroundColor: '#47664d',
        sectionsVisibility: {
            Skills: false,
            Education: false,
            Experience: false,
            'Professional Information': false,
            'Career Goals': false,
        },
    });

    const handleSwitchChange = (field) => (value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSectionVisibilityChange = (section) => (value) => {
        setFormData((prev) => ({
            ...prev,
            sectionsVisibility: {
                ...prev.sectionsVisibility,
                [section]: value,
            },
        }));
    };

    const handleColorChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            profilePageBackgroundColor: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await storePreferences(formData);
            SuccessToast('Profile preferences saved successfully!');
        } catch (error) {
            console.error('Error saving profile preferences:', error);
            ErrorToast('Failed to save profile preferences.');
        }
    };

    useEffect(() => {
        const fetchPref = async () => {
            try {
                const res = await getPreferences();
                const data = res.data.preferences;
                setFormData({
                    source: 'profile',
                    profileVisible: data?.profileVisible ?? false,
                    profileActiveStatus: data?.activeStatus ?? false,
                    profilePageBackgroundColor: data?.bgColor ?? '#47664d',
                    sectionsVisibility: {
                        Skills: data?.skills ?? false,
                        Education: data?.education ?? false,
                        Experience: data?.experience ?? false,
                        'Professional Information': data?.profInfo ?? false,
                        'Career Goals': data?.careerGoals ?? false,
                    },
                })
            } catch (error) {
                console.log(error)
            }
        }

        fetchPref();
    }, [])

    return (
        <TabsContent value="preferences" className="mt-0 lg:mt-0">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl md:text-2xl text-[#2b4033]">Profile Preferences</CardTitle>
                    <CardDescription className="hidden sm:block">
                        Manage your profile visibility and display settings.
                    </CardDescription>
                </CardHeader>
                <CardContent >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <Label>Profile Public (Public profile will be viewed by recruiters)</Label>
                            <Switch
                                checked={formData.profileActiveStatus}
                                onCheckedChange={handleSwitchChange('profileActiveStatus')}
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <Label>Profile Active (Active profile signifies your open for projects/jobs)</Label>
                            <Switch
                                checked={formData.profileVisible}
                                onCheckedChange={handleSwitchChange('profileVisible')}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Profile Page Background Color</Label>
                            <Input
                                type="color"
                                value={formData.profilePageBackgroundColor}
                                onChange={handleColorChange}
                            />
                        </div>
                        <Separator className="my-4" />
                        <div className="space-y-4">
                            <h2 className="text-[#2b4033] mb-4 text-xl md:text-2xl font-semibold leading-none tracking-tight">
                                Profile Sections Visibility
                            </h2>
                            {['Skills', 'Education', 'Experience', 'Professional Information', 'Career Goals'].map((section) => (
                                <div key={section} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <Label>{section} Visible</Label>
                                    <Switch
                                        checked={formData.sectionsVisibility[section]}
                                        onCheckedChange={handleSectionVisibilityChange(section)}
                                    />
                                </div>
                            ))}
                        </div>
                        <Button
                            type="submit"
                            className="bg-[#2b4033] hover:bg-[#1e3728] text-white"
                        >
                            Save Preferences
                        </Button>
                    </form>
                </CardContent>
            </Card>

        </TabsContent>
    );
}

export default PreferencesSettings;