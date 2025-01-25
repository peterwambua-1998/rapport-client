import React, { useState } from 'react';
import { Award, ChevronRight, Download, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import { TabsContent } from '@/components/ui/tabs';
import { PiCertificateBold } from 'react-icons/pi';
import SuccessToast from '@/components/toasts/success';
import ErrorToast from '@/components/toasts/error';
import { storeCertInfo } from '@/services/api/api';
import { PulseLoader } from 'react-spinners';

const CertificationsTab = ({ dataSourceResult, setActiveTab }) => {
    const [certifications, setCertifications] = useState(dataSourceResult.Certifications.length > 0 ? dataSourceResult.Certifications : []);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        organization: '',
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Field is required';
        } else if (formData.name.length < 3) {
            newErrors.name = 'Certification name must be at least 3 characters';
        }

        if (!formData.organization.trim()) {
            newErrors.organization = 'Field is required';
        } else if (formData.organization.length < 2) {
            newErrors.organization = 'Organization name must be at least 2 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleAddCert = () => {
        if (validateForm()) {
            setCertifications([...certifications, { ...formData }]);
            setFormData({
                name: '',
                organization: ''
            });
            setErrors({});
            setIsOpen(false);
        }
    };


    const removeCertification = (index) => {
        setCertifications(prev => {
            return prev.filter((cert, i) => i != index);
        })
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);
            await storeCertInfo({ certsData: certifications });
            setLoading(false);
            SuccessToast('Your data has been stored. You can continue with other tabs.')
            setActiveTab('skills')
        } catch (error) {
            console.log(error);
            setLoading(false);
            ErrorToast('Error occurred, kindly refresh and retry');
        }
    }


    return (
        <TabsContent value="certifications">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Certifications</h3>
                <Dialog
                    open={isOpen}
                    onOpenChange={(open) => {
                        setIsOpen(open);
                        if (!open) resetForm();
                    }}
                >
                    <DialogTrigger asChild>
                        <Button className="bg-[#94a48c] hover:bg-[#7e8b77] text-black/70">
                            Add Certification
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle className="text-[#2b4033]">Add Certification</DialogTitle>
                            <DialogDescription>
                                Add your professional certification or course completion
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="certificationName">Certification Name</Label>
                                <Input
                                    id="certificationName"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    placeholder="Enter certification name"

                                />
                                {errors.name && (
                                    <p className='text-red-500 text-sm'>{errors.name}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="issuingOrg">Issuing Organization</Label>
                                <Input
                                    id="issuingOrg"
                                    name="issuingOrg"
                                    value={formData.organization}
                                    onChange={(e) => handleInputChange('organization', e.target.value)}
                                    placeholder="Enter issuing organization"
                                />
                                {errors.organization && (
                                    <p className='text-red-500 text-sm'>{errors.organization}</p>
                                )}
                            </div>

                            <div className="flex justify-end space-x-2">
                                <Button
                                    variant="outline"
                                    type="button"
                                    onClick={() => {
                                        setIsOpen(false);
                                        resetForm();
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button type="button" className="bg-[#2b4033] hover:bg-[#1e3728] text-white" onClick={handleAddCert}>Save Draft</Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Certifications List */}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                {certifications.map((cert, index) => (
                    <Card key={index} className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div>
                                    <div className="font-medium">{cert.name}</div>
                                    <div className="text-sm text-gray-500">{cert.organization}</div>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeCertification(index)}
                                className="h-8 w-8"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>

            {certifications.length === 0 && (
                <div className="text-center text-gray-800 py-8 bg-[#6a7a704b] mt-6 rounded">
                    <PiCertificateBold className="h-12 w-12 mx-auto mb-3 text-gray-800" />
                    <p>No certifications added yet</p>
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end mt-8 pt-4 border-t border-gray-400">
                <Button disabled={loading} type="button" onClick={handleSubmit} className="bg-[#2b4033] hover:bg-[#1e3728] text-white">
                    {loading ? <PulseLoader size={8} color="#ffffff" /> : <span>
                        Save <Download className="ml-2 h-4 w-4 inline" />
                    </span>}
                </Button>
            </div>
        </TabsContent>

    );
};

export default CertificationsTab;