import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Youtube, Lock, Shield, Upload, CheckCircle } from "lucide-react";
import { authYouTube, getYouTube } from "@/services/api/api";
import { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";
import { FaYoutube } from "react-icons/fa";


const YouTubeAuthorization = () => {
    const [account, setAccount] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleAuth = () => {
        authYouTube();
    }

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const res = await getYouTube();
                setAccount(true);
            } catch (error) {
                setAccount(false);
                console.log(error)
            } finally {
                setLoading(false);
            }
        }

        fetchAccount()
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <FadeLoader loading={loading} size={15} />
            </div>
        )
    }

    return (
        <div className=" min-h-fit bg-white flex items-center justify-center p-4">
            <Card className="w-full max-w-lg">
                {account ?
                    <>
                        <CardHeader className="text-center">
                            <div className="flex justify-center mb-6">
                                <div className="relative">
                                    <div className="bg-green-100 p-4 rounded-full">
                                        <FaYoutube className="w-12 h-12 text-green-600" />
                                    </div>
                                    <CheckCircle className="w-6 h-6 text-green-600 absolute -bottom-2 -right-2" />
                                </div>
                            </div>
                            <CardTitle className="text-2xl font-bold text-gray-800">
                                Connected to YouTube
                            </CardTitle>
                            <CardDescription className="text-gray-600">
                                Videos will be uploaded to YouTube
                            </CardDescription>
                        </CardHeader>
                        
                    </>
                    :
                    <>
                        <CardHeader className="text-center space-y-2">
                            <div className="flex justify-center mb-6">
                                <div className="bg-red-100 p-4 rounded-full">
                                    <FaYoutube className="w-12 h-12 text-red-600" />
                                </div>
                            </div>
                            <CardTitle className="text-2xl font-bold text-gray-800">
                                Connect Your YouTube Account
                            </CardTitle>
                            <CardDescription className="text-gray-600">
                                Allow our app to securely upload videos to your YouTube channel
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex flex-col items-center p-4 space-y-2">
                                    <div className="bg-blue-100 p-3 rounded-full">
                                        <Lock className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <p className="text-sm font-medium text-gray-700 text-center">Secure OAuth2 Authorization</p>
                                </div>

                                <div className="flex flex-col items-center p-4 space-y-2">
                                    <div className="bg-green-100 p-3 rounded-full">
                                        <Shield className="w-6 h-6 text-green-600" />
                                    </div>
                                    <p className="text-sm font-medium text-gray-700 text-center">Privacy Protected</p>
                                </div>

                                <div className="flex flex-col items-center p-4 space-y-2">
                                    <div className="bg-purple-100 p-3 rounded-full">
                                        <Upload className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <p className="text-sm font-medium text-gray-700 text-center">Upload Videos Easily</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Button
                                    className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg font-semibold"
                                    onClick={handleAuth}
                                >
                                    Authorize YouTube
                                </Button>
                                <p className="text-xs text-center text-gray-500">
                                    By connecting your account, you agree to our Terms of Service and Privacy Policy
                                </p>
                            </div>
                        </CardContent>
                    </>
                }
            </Card>
        </div>
    );
}

export default YouTubeAuthorization;