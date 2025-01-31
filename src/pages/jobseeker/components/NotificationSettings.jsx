import ErrorToast from "@/components/toasts/error";
import SuccessToast from "@/components/toasts/success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { TabsContent } from "@/components/ui/tabs";
import { getPreferences, storePreferences } from "@/services/api/api";
import { useEffect, useState } from "react";


const NotificationSettings = () => {
    const [formData, setFormData] = useState({
        source: 'notification',
        recruiterViewsProfile: false,
        releases: false,
        promotions: false,
    });

    const handleSwitchChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const res = await storePreferences(formData);
            SuccessToast('Notification settings saved successfully!');
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
                    source: 'notification',
                    recruiterViewsProfile: data?.recruiterViewsProfile ?? false,
                    releases: data?.releases ?? false,
                    promotions: data?.promotions ?? false,
                })
            } catch (error) {
                console.log(error)
            }
        }

        fetchPref();
    }, [])

    return (
        <TabsContent value="notifications" className="mt-0 lg:mt-0">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl md:text-2xl">Notifications</CardTitle>
                    <CardDescription className="hidden sm:block">
                        Manage your notification preferences.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <Label>When a recruiter views your profile</Label>
                        <Switch
                            checked={formData.recruiterViewsProfile}
                            onCheckedChange={(checked) => handleSwitchChange('recruiterViewsProfile', checked)}
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <Label>Releases</Label>
                        <Switch
                            checked={formData.releases}
                            onCheckedChange={(checked) => handleSwitchChange('releases', checked)}
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <Label>Promotions</Label>
                        <Switch
                            checked={formData.promotions}
                            onCheckedChange={(checked) => handleSwitchChange('promotions', checked)}
                        />
                    </div>
                    <Button
                        type="button"
                        className="bg-[#2b4033] hover:bg-[#1e3728] text-white"
                        onClick={handleSubmit}
                    >
                        Save Preferences
                    </Button>
                </CardContent>

            </Card>
        </TabsContent>
    );
}

export default NotificationSettings;