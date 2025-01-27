import ErrorToast from "@/components/toasts/error";
import SuccessToast from "@/components/toasts/success";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";
import { processDataSourceFile } from "@/services/api/api";
import { FileText } from "lucide-react";
import { useState } from "react";

const DataSource = ({ setDataSource, setLoading, setDataSourceResult }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState('');
    const { user } = useAuth()

    const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    const handleFileUpload = async (e) => {
        try {
            const cv = e.target.files[0];
            setError('');
            if (allowedTypes.includes(cv.type)) {
                setSelectedFile(cv);
            } else {

                setError('Please upload only PDF or Word document!');
                e.target.value = '';
            }
        } catch (error) {
            console.log(error);
            ErrorToast('Error occurred refresh page and try again!')
        }
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError('');
            const data = new FormData();
            data.append('cv', selectedFile);
            const res = await processDataSourceFile(data)
            setDataSourceResult(res.data.result);
            setDataSource('cv')
            setLoading(false);
            SuccessToast('Hurray, your information was extracted successfully!');
        } catch (error) {
            console.log(error);
            ErrorToast('Error occurred refresh page and try again!')
        }
    }

    const handleLinkedIn = () => {
        const state = '1231-313';
        const scopes = [
            "profile", "email", "openid"
        ].join(' ');

        const authUrl = `https://www.linkedin.com/oauth/v2/authorization?` +
            `response_type=code&` +
            `client_id=77csg0j2kdv2n5&` +
            `redirect_uri=${encodeURIComponent('http://localhost:3000/auth/data-source/linkedin')}&` +
            `state=${state}&` +
            `scope=${encodeURIComponent(scopes)}`;

        window.location.href = authUrl
    }

    return (
        <div className="bg-white space-y-6 mt-6">
            <div className="text-center">
                <h4 className="font-bold text-xl">Data source</h4>
                <p className="text-gray-600">Kindly click on one of the data sources</p>
            </div>

            <div className="container mx-auto max-w-3xl px-4">
                <div className={`grid ${(user.linkedIn == false && user.linkedIn == true)  ? 'grid-cols-3' : 'grid-cols-2'}  gap-4`}>
                    {(user.linkedIn == false && user.linkedIn == true)  &&
                        <Card className="bg-[#c3dac4]">
                            <CardHeader>
                                <CardTitle className="text-xl">LinkedIn</CardTitle>
                                <CardDescription>Your profile data will be extracted from LinkedIn.</CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <Button onClick={handleLinkedIn} className="bg-[#2b4033] hover:bg-[#1e3728] text-white">Authorize</Button>
                            </CardFooter>
                        </Card>
                    }

                    <Card className="bg-[#c3dac4]">
                        <CardHeader>
                            <CardTitle className="text-xl">Upload CV</CardTitle>
                            <CardDescription>Your profile data will be extracted from your CV.</CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Dialog>
                                <DialogTrigger className="bg-[#2b4033] hover:bg-[#1e3728] text-white h-10 px-2 py-1 md:px-4 md:py-2 rounded-md font-medium">
                                    Upload CV
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Attach CV</DialogTitle>
                                    </DialogHeader>
                                    <div className="flex items-center justify-center w-full">
                                        <label
                                            onClick={() => document.getElementById('document-upload').click()}
                                            htmlFor="cv-upload"
                                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                                        >
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <FileText className="h-10 w-10 text-gray-400 mb-3" />
                                                <p className="mb-2 text-sm text-gray-500">
                                                    {selectedFile ? selectedFile.name : 'Click to upload CV'}
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    PDF, DOC, or DOCX
                                                </p>
                                            </div>
                                            <input
                                                type="file"
                                                id="document-upload"
                                                accept=".pdf,.doc,.docx"
                                                onChange={handleFileUpload}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                    {/* <div className="prose">
                                        <label htmlFor="document-upload" className="text-sm font-medium">
                                            Upload Document
                                        </label>
                                        <input
                                            type="file"
                                            id="document-upload"
                                            accept=".pdf,.doc,.docx"
                                            onChange={handleFileUpload}
                                            className="mt-2 border rounded-md border-slate-400 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-green-700 hover:file:bg-green-100"
                                        />
                                        <p className="text-xs text-gray-500">
                                            Accepted formats: PDF, DOC, DOCX
                                        </p>
                                    </div> */}
                                    <DialogFooter>
                                        <Button type="button" onClick={handleSubmit} className="bg-[#2b4033] hover:bg-[#1e3728]">Save changes</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </CardFooter>
                    </Card>

                    <Card className="bg-[#c3dac4]">
                        <CardHeader>
                            <CardTitle className="text-xl">Create New Profile</CardTitle>
                            <CardDescription>You will have to fill profile data.</CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Button className="bg-[#2b4033] hover:bg-[#1e3728] text-white" onClick={() => setDataSource('new')}>New Profile</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default DataSource;