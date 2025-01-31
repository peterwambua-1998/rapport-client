import ErrorToast from "@/components/toasts/error";
import SuccessToast from "@/components/toasts/success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { TabsContent } from "@/components/ui/tabs";
import { getPreferences, storeFeedback, storePreferences } from "@/services/api/api";
import { useEffect, useState } from "react";


const FeedBack = () => {
    const [formData, setFormData] = useState({
        message: "",
    });
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false);

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const validateForm = () => {
        const newErrors = {
            message: formData.message === "",
        };
        setErrors(newErrors);
        return !Object.values(newErrors).includes(true);
    };

    const submitData = async () => {
        try {
            if (validateForm()) {
                setLoading(true);
                await storeFeedback(formData);
                SuccessToast('Thanks you for your feedback.')
            }
        } catch (error) {
            ErrorToast("Error occurred refresh and try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <TabsContent value="contact" className="mt-0 lg:mt-0">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl md:text-2xl">Contact Us</CardTitle>
                    <CardDescription className="hidden sm:block">
                        Send us a message and we'll get back to you as soon as possible.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <textarea
                            id="message"
                            className="w-full min-h-[150px] rounded-md border border-[#dce2d4] p-2"
                            onChange={(e) => handleInputChange('message', e.target.value)}
                        />
                        {errors.message && (
                            <p className="mt-1 text-red-500 text-sm">Field is required.</p>
                        )}
                    </div>
                    <Button type="button" className="w-full sm:w-auto bg-[#2b4033] hover:bg-[#1e3728] text-white" onClick={submitData}>
                        Send Message
                    </Button>
                </CardContent>
            </Card>
        </TabsContent>
    );
}

export default FeedBack;