import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ErrorToast from "@/components/toasts/error";
import SuccessToast from "@/components/toasts/success";
import { PulseLoader } from "react-spinners";


const ScheduleDialogue = ({ ShortlistedCandidates, projectId, fetchData }) => {
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [interviewDate, setInterviewDate] = useState(new Date());
    const [note, setNote] = useState(null);
    const API_BASE_URL = import.meta.env.VITE_APP_SERVER_URL;
    const [open, setOpen] = useState(false)
    const [saving, setSaving] = useState(false)

    const save = async () => {
        try {
            setSaving(true);
            if (selectedCandidate == null) {
                ErrorToast('Kindly select candidate')
                setSaving(false);
                return;
            }
            const schedule = await fetch(`${API_BASE_URL}/api/schedule/create`, {
                method: 'POST',
                credentials: 'include',
                headers: { accept: 'application/json', 'content-type': 'application/json' },
                body: JSON.stringify({
                    ProjectId: projectId,
                    JobSeekerId: selectedCandidate,
                    InterviewDate: interviewDate,
                    Note: note
                }),
            })

            if (!schedule.ok) {
                ErrorToast('Error occurred, refresh and try again...')
            }

            SuccessToast('Schedule saved successfully.')
            setOpen(false);
            fetchData();
            setSaving(false);
        } catch (error) {
            ErrorToast('Error occurred, refresh and try again...')
            setSaving(false);
        }
    }

    if (ShortlistedCandidates.length == 0) {
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Schedule Interview</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Schedule Interview</DialogTitle>
                    <DialogDescription>d</DialogDescription>
                </DialogHeader>
                <div>
                    <p>No candidates have been shortlisted</p>
                </div>
                <DialogFooter className="sm:justify-start flex gap-2">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Schedule Interview</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Schedule Interview</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <div>
                    <div className="mb-4">
                        <DatePicker
                            selected={interviewDate}
                            onChange={(date) => setInterviewDate(date)}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            // showTimeSelect
                            className="border rounded-lg px-4 py-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="candidate">
                            Candidate
                        </Label>
                        <Select onValueChange={(value) => {
                            setSelectedCandidate(value)
                        }}>
                            <SelectTrigger className="border rounded-lg px-4 py-2" id="candidate">
                                <SelectValue placeholder="Select a user" />
                            </SelectTrigger>
                            <SelectContent>
                                {ShortlistedCandidates.map((user) => (
                                    <SelectItem key={user.id} value={user.id}>
                                        {user.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="Note">
                            Note
                        </Label>
                        <Textarea onChange={(e) => setNote(e.target.value)} />
                    </div>
                </div>
                <DialogFooter className="sm:justify-start flex gap-2">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                    {
                        saving ? 
                        <Button>
                            <PulseLoader size={8} color="#ffffff" />
                        </Button>
                        :
                        <Button type="button" onClick={save}>
                            Save
                        </Button>
                    }
                    
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default ScheduleDialogue;