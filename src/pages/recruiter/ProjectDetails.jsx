import React, { useRef, useEffect, useState } from "react";
import {
    DndContext, closestCenter, DragOverlay, useDroppable,
    useSensor,
    useSensors,
    TouchSensor,
    PointerSensor
} from "@dnd-kit/core";
import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { getImageUrl } from "@/services/helpers/helpers";
import { FaUserLarge } from "react-icons/fa6";
import { FaShareAlt } from "react-icons/fa";
import { HiDocument } from "react-icons/hi2";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    getJobseekers,
    fetchSkills,
    fetchEducationLevels,
    fetchSkillLevels,
    fetchYearsOfExperiences,
    fetchIndustrys,
    getCountries,
    getProjectById,
} from "../../services/api/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import ListingSheet from "./sheet/Listing";
import ScheduleDialogue from "./sheet/shedule";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import ErrorToast from "@/components/toasts/error";
import SuccessToast from "@/components/toasts/success";
import { FadeLoader } from "react-spinners";
import { PulseLoader } from "react-spinners";


// Sortable Item Component
const SortableItem = ({ id, children }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        touchAction: 'none',
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="p-2 touch-none"
        >
            {children}
        </div>
    );
};

// Droppable Container Component
const DroppableContainer = ({ id, children }) => {
    const { setNodeRef, isOver } = useDroppable({
        id,
    });


    const containerStyle = isOver
        ? "p-4 bg-blue-100 rounded shadow-md border border-blue-500" // Highlight when item is over
        : `p-4 ${id == 'interviewCandidates' ? 'bg-white p-4 shadow-md rounded-md' : ''}`;

    return (
        <div ref={setNodeRef} className={containerStyle}>
            {children}
        </div>
    );
};

const ProjectDetails = () => {
    let { id } = useParams();
    const swiperRef = useRef(null);
    const swiperRefTwo = useRef(null);
    const [candidates, setCandidates] = useState([]);
    const [interviewCandidates, setInterviewCandidates] = useState([]);
    const [activeCandidate, setActiveCandidate] = useState(null);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedAssistUsers, setSelectedAssistUsers] = useState([]);
    const [note, setNote] = useState(null)
    const navigate = useNavigate();
    const API_BASE_URL = import.meta.env.VITE_APP_SERVER_URL;
    const [sheetCandidates, setSheetCandidates] = useState([]);
    const [scheduledCandidates, setScheduledCandiates] = useState([])
    const [sheetCollabs, setSheetCollabs] = useState([]);
    const [listings, setListings] = useState([]);
    const [projectR, setProject] = useState(null);
    const [savingSelection, setSavingSelection] = useState(false);

    const filterCandidates = (jobseekersData) => {
        return jobseekersData.filter(
            (candidate) =>
                candidate?.JobSeeker?.profileVisible
        );
    };

    const sensors = useSensors(
        useSensor(PointerSensor, {
            // Require the pointer to move by 8px before activating
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(TouchSensor, {
            // Customize touch sensor behavior
            activationConstraint: {
                delay: 250, // Add a delay before drag starts
                tolerance: 5, // Allow small movements before activating
            },
        })
    );



    const fetchData = async () => {
        try {
            const project = await getProjectById(id);
            setProject(project.data)
            const jobseekersData = await getJobseekers()
            const collabs = await fetch(`${API_BASE_URL}/api/listing/collaborators`, {
                method: 'GET',
                credentials: 'include'
            })

            const shortListed = await fetch(`${API_BASE_URL}/api/listing/job-seekers`, {
                method: 'POST',
                credentials: 'include',
                headers: { accept: 'application/json', 'content-type': 'application/json' },
                body: JSON.stringify({
                    id: id,
                }),
            })


            if (!collabs.ok || !shortListed) {
                ErrorToast('error occurred try again')
            }
            const collabsData = await collabs.json();
            const shortListedData = await shortListed.json();
            setCandidates(jobseekersData.data)
            shortListedData.forEach(element => {
                element.ShortlistedCollaborators.forEach(collab => {
                    let collaborator = collabsData.find((data) => data.user_id == collab.UserId)
                    setSheetCollabs((prev) => {
                        const isDuplicate = prev.some((c) => c.id === collaborator.id);
                        if (!isDuplicate) {
                            return [...prev, collaborator]
                        }
                        return prev
                    });
                })
                element.ShortlistedCandidates.forEach(cand => {
                    let candidate = jobseekersData.data.find((data) => data.id == cand.UserId)
                    setScheduledCandiates((prev) => {
                        const isDuplicate = prev.some((c) => c.id === candidate.id);
                        const isScheduled = project.data.Schedules.some(c => c.JobSeekerId == candidate.id)
                        if (!isDuplicate && !isScheduled) {
                            return [...prev, candidate];
                        }
                        return prev;
                    })
                    setSheetCandidates((prev) => {
                        const isDuplicate = prev.some((c) => c.id === candidate.id);
                        if (!isDuplicate) {
                            return [...prev, candidate];
                        }
                        return prev;
                    });

                    if (candidate) {
                        setCandidates(prev => prev.filter(c => c.id !== candidate.id))
                    }

                })
            });
            setUsers(collabsData)
            setListings(shortListedData)
            setLoading(false)
        } catch (error) {
            setError(true)
            ErrorToast('Error occurred please try again')
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleDragStart = (event) => {
        setActiveCandidate(event.active.id);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        console.log(over.id)
        setActiveCandidate(null);

        if (!over || active.id === over.id) return;

        if (over.id == 'candidates' || over.id == 'interviewCandidates') {
            const activeId = active.id;
            const sourceContainer = candidates.find((c) => c.id === activeId)
                ? "candidates"
                : "interviewCandidates";
            const targetContainer = over.id;

            if (sourceContainer === targetContainer) return;

            let draggedItem;

            // Move item between containers
            if (sourceContainer === "candidates") {
                draggedItem = candidates.find((c) => c.id === activeId);
                setCandidates((prev) => prev.filter((c) => c.id !== activeId));
                setInterviewCandidates((prev) => [...prev, draggedItem]);
            } else {
                draggedItem = interviewCandidates.find((c) => c.id === activeId);
                setInterviewCandidates((prev) => prev.filter((c) => c.id !== activeId));
                setCandidates((prev) => [...prev, draggedItem]);
            }
        } else {
            return
        }
    };

    const handleSubmit = async () => {
        try {
            if (interviewCandidates.length == 0) {
                ErrorToast('No candidates selected')
                return;
            }
            setSavingSelection(true);
            const data = await fetch(`${API_BASE_URL}/api/listing/create`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({ note, projectId: id, collaborators: selectedAssistUsers, candidates: interviewCandidates })
            });

            if (!data.ok) {
                ErrorToast("Error occurred please try again...")
            }

            SuccessToast('Record stored successfully')
            setInterviewCandidates([])
            fetchData();
            setSavingSelection(false);
            return;
        } catch (error) {
            console.log(error);
            setSavingSelection(false);
            ErrorToast("Error occurred please try again...")

        }
    }

    const handleDragCancel = () => {
        setActiveCandidate(null);
    };

    const removeUser = (userId) => {
        setSelectedAssistUsers((users) => users.filter((user) => user.user_id !== userId));
    };

    const handleuserClick = (candidate) => {
        return navigate(`/recruiter/jobseeker/${candidate.id}`);
    };

    const handleDelete = async (id, UserId) => {
        try {
            console.log(id, UserId)
            const shortListed = await fetch(`${API_BASE_URL}/api/listing/delete`, {
                method: 'POST',
                credentials: 'include',
                headers: { accept: 'application/json', 'content-type': 'application/json' },
                body: JSON.stringify({
                    listingId: id,
                    UserId: UserId
                }),
            })
            setInterviewCandidates([])
            fetchData();
        } catch (error) {
            console.log(error);
            ErrorToast("Error occurred please try again...")
        }
    }


    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <FadeLoader />
                <p>Setting up work area...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <FadeLoader />
                <p>error occurred...</p>
            </div>
        )
    }

    return (
        <div className="p-4">
            <Card>
                <CardHeader className="flex flex-row justify-between items-center">
                    <CardTitle className="text-lg font-bold">{projectR.name}</CardTitle>
                    {/* <CardDescription></CardDescription> */}
                    <div>
                        <Dialog>
                            <DialogTrigger className="bg-blue-500 px-2 rounded sm py-2 text-white">Project Details</DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Project Details</DialogTitle>
                                    <DialogDescription>
                                        {projectR.description}
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>


                </CardHeader>
            </Card>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragCancel={handleDragCancel}
            >
                <div className="relative">
                    <Button
                        onClick={() => swiperRef.current?.slidePrev()}
                        variant="outline"
                        className="swiper-button-prev absolute top-1/2 left-0 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </Button>
                    <DroppableContainer id="candidates">
                        <h2 className="font-semibold mb-2">Available Candidates</h2>
                        <SortableContext items={candidates} strategy={verticalListSortingStrategy}>

                            <Swiper
                                spaceBetween={50}
                                breakpoints={{
                                    // when window width is >= 640px
                                    640: {
                                        slidesPerView: 1,
                                    },
                                    // when window width is >= 768px
                                    768: {
                                        slidesPerView: 2,
                                    },
                                    1024: {
                                        slidesPerView: 3,
                                    },
                                }}
                                className="mb-8"
                                onSwiper={(swiper) => {
                                    swiperRef.current = swiper

                                    swiper.on('touchStart', () => {
                                        if (activeCandidate) {
                                            swiper.allowTouchMove = false;
                                        }
                                    });
                                }}
                                allowTouchMove={!activeCandidate}
                                touchStartPreventDefault={false} // Important for touch devices
                                preventInteractionOnTransition={true}
                                touchReleaseOnEdges={true}
                            >
                                {candidates.map((candidate, index) => (
                                    <SwiperSlide key={index} style={{ pointerEvents: "auto" }}>
                                        <SortableItem id={candidate.id}>
                                            <Card className="shadow">
                                                <CardHeader>
                                                    <div className="relative">
                                                        <video className="w-full rounded-t-lg" controls>
                                                            <source
                                                                src={
                                                                    candidate?.JobSeeker?.videoUrl
                                                                        ? getImageUrl(candidate?.JobSeeker.videoUrl)
                                                                        : "placeholder-video.mp4"
                                                                }
                                                                type="video/mp4"
                                                            />
                                                        </video>
                                                    </div>
                                                </CardHeader>
                                                <div className="p-4">
                                                    <CardTitle className="flex justify-between items-center">
                                                        {candidate.name}
                                                        <div className="flex items-center text-yellow-500">
                                                            <Star className="w-4 h-4" />
                                                            <span className="ml-1">{candidate.rating}</span>
                                                        </div>
                                                    </CardTitle>
                                                    <CardDescription className="mb-2">
                                                        {candidate?.JobSeeker?.professionalTitle}
                                                    </CardDescription>
                                                    <p className="text-gray-500 text-base">
                                                        {candidate?.JobSeeker?.state} -
                                                        {candidate?.JobSeeker?.Industry?.name}
                                                    </p>
                                                    <p className="text-gray-500 text-sm">
                                                        {candidate.location}
                                                    </p>

                                                    <div className="flex flex-wrap gap-2 mt-2">
                                                        {candidate?.JobseekerSkills.map((skill, i) => (
                                                            <span
                                                                key={i}
                                                                className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded"
                                                            >
                                                                {skill?.Skill?.name}
                                                            </span>
                                                        ))}
                                                    </div>

                                                    <p className="mt-4 text-sm text-gray-600 italic truncate">
                                                        "{candidate?.JobSeeker?.about}"
                                                    </p>
                                                </div>
                                                <CardFooter>
                                                    <div className="flex space-x-2">
                                                        <Button
                                                            onClick={() => {
                                                                handleuserClick(candidate);
                                                            }}
                                                            onPointerDown={(e) => e.stopPropagation()}
                                                            size="sm"
                                                            className="rounded-full h-8 w-8 bg-purple-500"
                                                        >
                                                            <FaUserLarge className="w-12 h-12 text-white" />
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            className="rounded-full h-8 w-8 bg-gray-500"
                                                        >
                                                            <FaShareAlt className="w-12 h-12 text-white" />
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            className="rounded-full h-8 w-8 bg-green-500"
                                                        >
                                                            <HiDocument className=" text-white" />
                                                        </Button>
                                                    </div>
                                                </CardFooter>
                                            </Card>
                                        </SortableItem>
                                    </SwiperSlide>
                                ))}
                            </Swiper>


                        </SortableContext>


                    </DroppableContainer>

                    <Button
                        onClick={() => swiperRef.current?.slideNext()}
                        variant="outline"
                        className="swiper-button-next absolute top-1/2 right-0 transform -translate-y-1/6 bg-white shadow-md rounded-full p-2 z-10"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </Button>
                </div>
                {/* Available Candidates */}


                {/* Interview Candidates */}
                <div className="relative mt-4 p-4">
                    <div>
                        {
                            interviewCandidates.length > 0 ?
                                <Button
                                    onClick={() => swiperRefTwo.current?.slidePrev()}
                                    variant="outline"
                                    className="swiper-button-prev absolute top-1/2 left-0 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </Button>
                                : <></>
                        }

                        <DroppableContainer id="interviewCandidates" >
                            <h2 className="font-semibold mb-2">Interview Candidates</h2>
                            {
                                interviewCandidates.length > 0 ?
                                    <SortableContext items={interviewCandidates} strategy={verticalListSortingStrategy}>
                                        <Swiper
                                            spaceBetween={50}
                                            breakpoints={{
                                                // when window width is >= 640px
                                                640: {
                                                    slidesPerView: 1,
                                                },
                                                // when window width is >= 768px
                                                768: {
                                                    slidesPerView: 2,
                                                },
                                                1024: {
                                                    slidesPerView: 3,
                                                },
                                            }}
                                            className="mb-8"

                                            onSwiper={(swiper) => {
                                                swiperRefTwo.current = swiper
                                                swiper.on('touchStart', () => {
                                                    if (activeCandidate) {
                                                        swiper.allowTouchMove = false;
                                                    }
                                                });

                                            }}
                                            allowTouchMove={!activeCandidate}
                                            touchStartPreventDefault={false} // Important for touch devices
                                            preventInteractionOnTransition={true}
                                            touchReleaseOnEdges={true}
                                        >
                                            {interviewCandidates.map((candidate) => (
                                                <SwiperSlide key={candidate.id} style={{ pointerEvents: "auto" }}>
                                                    <SortableItem key={candidate.id} id={candidate.id}>
                                                        <Card className="shadow-lg">
                                                            <CardHeader>
                                                                <div className="relative">
                                                                    <video className="w-full rounded-t-lg" controls>
                                                                        <source
                                                                            src={
                                                                                candidate?.JobSeeker?.videoUrl
                                                                                    ? getImageUrl(candidate?.JobSeeker.videoUrl)
                                                                                    : "placeholder-video.mp4"
                                                                            }
                                                                            type="video/mp4"
                                                                        />
                                                                    </video>
                                                                </div>
                                                            </CardHeader>
                                                            <div className="p-4">
                                                                <CardTitle className="flex justify-between items-center">
                                                                    {candidate.name}
                                                                    <div className="flex items-center text-yellow-500">
                                                                        <Star className="w-4 h-4" />
                                                                        <span className="ml-1">{candidate.rating}</span>
                                                                    </div>
                                                                </CardTitle>
                                                                <CardDescription className="mb-2">
                                                                    {candidate?.JobSeeker?.professionalTitle}
                                                                </CardDescription>
                                                                <p className="text-gray-500 text-base">
                                                                    {candidate?.JobSeeker?.state} -
                                                                    {candidate?.JobSeeker?.Industry?.name}
                                                                </p>
                                                                <p className="text-gray-500 text-sm">
                                                                    {candidate.location}
                                                                </p>

                                                                <div className="flex flex-wrap gap-2 mt-2">
                                                                    {candidate?.JobseekerSkills.map((skill, i) => (
                                                                        <span
                                                                            key={i}
                                                                            className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded"
                                                                        >
                                                                            {skill?.Skill?.name}
                                                                        </span>
                                                                    ))}
                                                                </div>

                                                                <p className="mt-4 text-sm text-gray-600 italic truncate">
                                                                    "{candidate?.JobSeeker?.about}"
                                                                </p>
                                                            </div>
                                                            <CardFooter>
                                                                <div className="flex space-x-2">
                                                                    <Button
                                                                        onClick={() => {
                                                                            handleuserClick(candidate);
                                                                        }}
                                                                        size="sm"
                                                                        className="rounded-full h-8 w-8 bg-purple-500"
                                                                        onPointerDown={(e) => e.stopPropagation()}
                                                                    >
                                                                        <FaUserLarge className="w-12 h-12 text-white" />
                                                                    </Button>
                                                                    <Button
                                                                        size="sm"
                                                                        className="rounded-full h-8 w-8 bg-gray-500"
                                                                    >
                                                                        <FaShareAlt className="w-12 h-12 text-white" />
                                                                    </Button>
                                                                    <Button
                                                                        size="sm"
                                                                        className="rounded-full h-8 w-8 bg-green-500"
                                                                    >
                                                                        <HiDocument className=" text-white" />
                                                                    </Button>
                                                                </div>
                                                            </CardFooter>
                                                        </Card>
                                                    </SortableItem>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </SortableContext> :
                                    <div className="p-8 flex justify-center items-center border-dashed border-2">
                                        Drag candidates here to create your shortlist
                                    </div>
                            }

                        </DroppableContainer>
                        {/* Right Button */}
                        {
                            interviewCandidates.length > 0 ?
                                <Button
                                    onClick={() => swiperRefTwo.current?.slideNext()}
                                    variant="outline"
                                    className="swiper-button-next absolute top-1/2 right-0 transform -translate-y-1/6 bg-white shadow-md rounded-full p-2 z-10"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </Button>
                                : <></>
                        }

                    </div>

                </div>

                {/* Drag Overlay */}
                <DragOverlay>
                    {activeCandidate ? (
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardHeader>
                                    <div className="relative h-32 bg-black w-full">
                                        {/* <video className="w-full rounded-t-lg" controls>
                                            <source
                                                src=""
                                                type="video/mp4"
                                            />
                                        </video> */}
                                    </div>
                                </CardHeader>

                            </CardHeader>
                            <div className="p-4">
                                <CardTitle>
                                    {candidates.find((c) => c.id === activeCandidate)?.name ||
                                        interviewCandidates.find((c) => c.id === activeCandidate)?.name}
                                </CardTitle>
                                <CardDescription className="mb-2">
                                    {candidates.find((c) => c.id === activeCandidate)?.JobSeeker?.professionalTitle ||
                                        interviewCandidates.find((c) => c.id === activeCandidate)?.JobSeeker?.professionalTitle}
                                </CardDescription>
                                <p className="text-gray-500 text-base">
                                    {candidates.find((c) => c.id === activeCandidate)?.JobSeeker?.state ||
                                        interviewCandidates.find((c) => c.id === activeCandidate)?.JobSeeker?.state}
                                    -
                                    {candidates.find((c) => c.id === activeCandidate)?.JobSeeker?.Industry.name ||
                                        interviewCandidates.find((c) => c.id === activeCandidate)?.JobSeeker?.Industry.name}
                                </p>
                                <p className="text-gray-500 text-sm">
                                    {candidates.find((c) => c.id === activeCandidate)?.location ||
                                        interviewCandidates.find((c) => c.id === activeCandidate)?.location}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-2">
                                    {
                                        candidates.find((c) => c.id === activeCandidate)?.JobseekerSkills.map((skill, i) => (
                                            <span
                                                key={i}
                                                className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded"
                                            >
                                                {skill?.Skill?.name}
                                            </span>
                                        )) ||
                                        interviewCandidates.find((c) => c.id === activeCandidate)?.JobseekerSkills.map((skill, i) => (
                                            <span
                                                key={i}
                                                className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded"
                                            >
                                                {skill?.Skill?.name}
                                            </span>
                                        ))}
                                    <p className="mt-4 text-sm text-gray-600 italic truncate">
                                        " {candidates.find((c) => c.id === activeCandidate)?.JobSeeker?.about ||
                                            interviewCandidates.find((c) => c.id === activeCandidate)?.JobSeeker?.Industry?.about}"
                                    </p>
                                </div>
                            </div>
                            <CardFooter>
                                <div className="flex space-x-2">
                                    <Button
                                        size="sm"
                                        className="rounded-full h-8 w-8 bg-purple-500"
                                    >
                                        <FaUserLarge className="w-12 h-12 text-white" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        className="rounded-full h-8 w-8 bg-gray-500"
                                    >
                                        <FaShareAlt className="w-12 h-12 text-white" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        className="rounded-full h-8 w-8 bg-green-500"
                                    >
                                        <HiDocument className=" text-white" />
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    ) : null}
                </DragOverlay>
            </DndContext >

            {/* Select Interview Date */}
            < div className="p-4" >
                <div className="bg-white shadow-lg rounded-lg p-4 mb-8 grid grid-cols-1 gap-4">
                    <div className="w-full">
                        <label className="block font-semibold mb-2">Select Users to Assist:</label>
                        <Select onValueChange={(value) => {
                            const selectedUser = users.find((user) => user.user_id === value);
                            if (selectedUser && !selectedAssistUsers.some((user) => user.user_id === value)) {
                                setSelectedAssistUsers([...selectedAssistUsers, selectedUser]);
                            }
                        }}>
                            <SelectTrigger className="border rounded-lg px-4 py-2">
                                <SelectValue placeholder="Select a user" />
                            </SelectTrigger>
                            <SelectContent>
                                {users.map((user) => (
                                    <SelectItem key={user.user_id} value={user.user_id}>
                                        {user.first_name} {user.last_name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <div className="mt-4 flex gap-4 flex-wrap">
                            {selectedAssistUsers.map((user) => (
                                <div
                                    key={user.user_id}
                                    className="flex items-center gap-2 bg-blue-200 text-blue-800 px-2 py-1 rounded"
                                >
                                    <span>
                                        {user.first_name} {user.last_name}
                                    </span>
                                    <button
                                        onClick={() => removeUser(user.user_id)}
                                        className="text-red-500 font-bold cursor-pointer"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-span-2">
                        <label className="block font-semibold mb-2">Note:</label>
                        <Textarea onChange={(e) => setNote(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {
                            savingSelection ?
                                <Button>
                                    <PulseLoader size={8} color="#ffffff" />
                                </Button>

                                :
                                <Button onClick={handleSubmit}>Save Selection</Button>
                        }

                        {
                            listings.length > 0 ?
                                <ScheduleDialogue ShortlistedCandidates={scheduledCandidates} projectId={id} fetchData={fetchData} />
                                : <></>
                        }
                        {
                            listings.length > 0 ?
                                <ListingSheet listings={listings} team={sheetCollabs} jobSeekers={sheetCandidates} handleDelete={handleDelete} />
                                : <></>
                        }
                    </div>
                </div>
            </div >

        </div >
    );
};

export default ProjectDetails;
