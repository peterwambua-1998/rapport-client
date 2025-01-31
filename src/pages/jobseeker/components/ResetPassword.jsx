import { PasswordStrength } from "@/components/common/auth/PasswordStrength";
import ErrorToast from "@/components/toasts/error";
import SuccessToast from "@/components/toasts/success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { TabsContent } from "@/components/ui/tabs";
import { changePassword, getPreferences, storePreferences } from "@/services/api/api";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { PulseLoader } from "react-spinners";

const ResetPassword = () => {
    const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [cPasswordVisible, setCPasswordVisible] = useState(false);
    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false);
    const [isValid, setIsValid] = useState(false);

    const handleChange = (field, value) => {
        console.log(field, value);
        
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const validateForm = () => {
        console.log(formData);
        
        const newErrors = {};


        if (!formData.newPassword.trim()) {
            newErrors.newPassword = 'Field is required';
        }

        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = 'Field is required';
        } else if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords does not match new password';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async () => {
        try {
            if (validateForm()) {
                setLoading(true);
                const response = await changePassword(formData);
                console.log(response)
                if (response.data.success) {
                    SuccessToast("Password changed successfully!")
                    setFormData({
                        newPassword: "",
                        confirmPassword: "",
                    });
                }
            }
        } catch (error) {
            console.log(error);
            
            ErrorToast("An error occurred while changing the password.")
        } finally {
            setLoading(false);
        }
    }

    return (
        <TabsContent value="password" className="mt-0 lg:mt-0">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl md:text-2xl">Password Reset</CardTitle>
                    <CardDescription className="hidden sm:block">
                        Change your password here. After saving, you'll be logged out.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <div className="relative">
                            <Input
                                type={passwordVisible ? "text" : "password"}
                                id="new-password"
                                name="retypeNewPassword"
                                defaultValue={formData.newPassword}
                                onChange={(e) => handleChange('newPassword', e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    setPasswordVisible(!passwordVisible);
                                }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {passwordVisible ? (
                                    <FaEyeSlash size={18} />
                                ) : (
                                    <FaEye size={18} />
                                )}
                            </button>
                        </div>
                        {errors.newPassword && <p className="text-red-500 text-xs md:text-sm">{errors.newPassword}</p>}

                    </div>
                    <PasswordStrength password={formData.newPassword} setIsValid={setIsValid} />
                    <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <div className="relative">
                            <Input
                                type={cPasswordVisible ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                                defaultValue={formData.confirmPassword}
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    setCPasswordVisible(!cPasswordVisible);
                                }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {cPasswordVisible ? (
                                    <FaEyeSlash size={18} />
                                ) : (
                                    <FaEye size={18} />
                                )}
                            </button>
                        </div>
                        {errors.confirmPassword && <p className="text-red-500 text-xs md:text-sm">{errors.confirmPassword}</p>}
                    </div>
                    <Button disabled={loading} type="button" className="w-full sm:w-auto bg-[#2b4033] hover:bg-[#1e3728] text-white" onClick={handleSubmit}>
                        {loading ? <PulseLoader size={8} color="#ffffff" /> : "Update Password"}
                    </Button>
                </CardContent>
            </Card>
        </TabsContent>
    );
}

export default ResetPassword;