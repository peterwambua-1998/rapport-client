import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { PulseLoader } from "react-spinners";
import { endProject } from "@/services/api/api";
import ErrorToast from "@/components/toasts/error";
import SuccessToast from "@/components/toasts/success";
import { Button } from "@/components/ui/button";
const EndProject = ({ projectName, projectStatus, projectId, setSelectedProject, setProjects, projectFeedback, projectRating, projectSearchDuration, projectCandidateFound }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        projectId,
        candidateFound: false,
        rating: "",
        searchDuration: "",
        feedback: ""
    })

    const [errors, setErrors] = useState({
        searchDuration: false,
        rating: false,
        feedback: false,
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name !== "") {
            setFormData((prevState) => {
                return {
                    ...prevState,
                    [name]: type === "checkbox" ? checked : value,
                };
            });
        }
    };

    const validateForm = () => {
        const newErrors = {
            searchDuration: formData.searchDuration === "",
            rating: formData.rating === "",
            feedback: formData.feedback === "",
        };
        setErrors(newErrors);
        return !Object.values(newErrors).includes(true);
    };


    const endProjectFunc = async (e) => {
        try {
            console.log("Form submitted", formData);
            e.preventDefault()
            if (validateForm()) {
                setLoading(true)
                const endProjectRes = await endProject(formData)
                console.log(endProjectRes.data)
                SuccessToast("Project ended.")
                setSelectedProject(prev => ({ ...prev, status: true }))
                setProjects(prev => prev.map(project =>
                    project.id === projectId ? { ...project, status: true } : project
                ));
                setLoading(false)
                setOpen(false)
            }
        } catch (error) {
            console.log(error)
            ErrorToast(error?.message || "Error occurred please try again.");
            setLoading(false)
        }
    }
    const closeDialog = () => {
        setOpen(false)
        setFormData({
            candidateFound: false,
            searchDuration: "",
            rating: "",
            additionalFeedback: "",
        })
    }
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {
                        projectStatus ? 
                        <Button type="button"  size="sm" >Feedback</Button>
                        :
                        <Button type="button" variant="destructive" size="sm" >End</Button>
                    }
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Project Feedback</DialogTitle>
                    </DialogHeader>
                    {
                        projectStatus ? 
                            <div>
                                <p className="mb-4">Candidate found through platform: {projectCandidateFound ? 'Yes': 'No'}</p>
                                <p className="mb-4">Search duration: {projectSearchDuration}</p>
                                <p className="mb-4">Rating: {projectRating}</p>
                                <p className="mb-2">Feedback:</p>
                                <p>{projectFeedback}</p>
                            </div>
                            :
                            <form onSubmit={endProjectFunc}>
                                <div className="mb-4">
                                    <input
                                        type="checkbox"
                                        name="candidateFound"
                                        checked={formData.candidateFound}
                                        onChange={handleInputChange}
                                    />
                                    <label className="ml-2">Candidate found through platform</label>
                                </div>

                                <div className="mb-4">
                                    <input
                                        type="text"
                                        name="searchDuration"
                                        placeholder="Search duration (e.g., 2 weeks)"
                                        value={formData.searchDuration}
                                        onChange={handleInputChange}
                                        className={`w-full rounded p-2 border ${errors.searchDuration ? "border-red-500" : "border-gray-300"}`}
                                    />
                                    {errors.searchDuration && (
                                        <p className="text-red-500 text-sm">Search duration is required.</p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <select
                                        name="rating"
                                        value={formData.rating}
                                        onChange={handleInputChange}
                                        className={`w-full rounded p-2 border ${errors.rating ? "border-red-500" : "border-gray-300"}`}
                                    >
                                        <option value="" disabled>Select Rating</option>
                                        <option value="Excellent">Excellent</option>
                                        <option value="Good">Good</option>
                                        <option value="Fair">Fair</option>
                                        <option value="Poor">Poor</option>
                                    </select>
                                    {errors.rating && (
                                        <p className="text-red-500 text-sm">Rating is required.</p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <textarea
                                        name="feedback"
                                        placeholder="Additional feedback..."
                                        value={formData.feedback}
                                        onChange={handleInputChange}
                                        className={`w-full rounded p-2 border ${errors.feedback ? "border-red-500" : "border-gray-300"}`}
                                    />
                                    {errors.feedback && (
                                        <p className="text-red-500 text-sm">Additional feedback is required.</p>
                                    )}
                                </div>

                                <div className="flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-gray-300 rounded-md"
                                        onClick={() => closeDialog()}
                                    >
                                        Close
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                    >
                                        {loading ? <PulseLoader size={8} color="#ffffff" /> : "Save Feedback"}
                                    </button>
                                </div>
                            </form>
                    }

                </DialogContent>
            </Dialog>
        </div>
    );
}

export default EndProject;