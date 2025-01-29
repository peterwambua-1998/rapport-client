import ErrorToast from "@/components/toasts/error";
import SuccessToast from "@/components/toasts/success";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { storeTestimonialRequest } from "@/services/api/api";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import { PulseLoader } from "react-spinners";
import validator from 'validator';

const RequestTestimonial = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        recipientName: "",
        email: "",
        description: "",
    })
    const handleModalClose = (open) => {
        if (!open) {
            // Reset form when closing modal
            setFormData({
                email: "",
                description: "",
            });
            setErrors({});
        }
        setIsOpen(open);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.recipientName) newErrors.description = "Field is required.";
        if (!formData.email || validator.isEmail(formData.email) == false) newErrors.email = "Enter a valid email address."
        if (!formData.description) newErrors.description = "Field is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        try {
            if (validateForm()) {
                setLoading(true);
                await storeTestimonialRequest(formData);
                setLoading(false);
                SuccessToast('Request has been sent.')
            }
        } catch (error) {
            console.log(error);
            ErrorToast('Error occurred, kindly refresh and retry');
        }
    }

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={handleModalClose}>
                <DialogTrigger asChild>
                    <Button
                        className="bg-transparent border-none hover:bg-transparent text-[#2b4033] hover:text-[#1e3728]"
                        size="sm"
                    >
                        <CirclePlus strokeWidth={2.5} className="w-4 h-4 sm:w-5 sm:h-5" /> Request new
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Video Testimonial Request</DialogTitle>
                        <DialogDescription>
                            Send Video Testimonial Request
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="recipientName">
                                Recipient Name
                            </Label>
                            <Input
                                id="recipientName"
                                placeHolder="Eg: John Doe"
                                onChange={(e) => handleInputChange('recipientName', e.target.value)}
                                defaultValue={""}
                                type="text"
                            />
                            {errors.recipientName && <p className="text-sm text-red-600">{errors.recipientName}</p>}
                        </div>

                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="email">
                                Email
                            </Label>
                            <Input
                                id="email"
                                placeHolder="Eg: johndoe@mail.com"
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                defaultValue={""}
                                type="email"
                            />
                            {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                        </div>

                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="description">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                placeHolder="Enter description"
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                defaultValue={""}
                            />
                            {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            disabled={loading}
                            onClick={handleSubmit}
                            className="w-full sm:w-auto bg-[#2b4033] hover:bg-[#1e3728] text-white"
                        >
                            {loading ? <PulseLoader size={8} color="#ffffff" /> : 'Save Request'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default RequestTestimonial;