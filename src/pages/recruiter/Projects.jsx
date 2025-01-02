import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FaFolderOpen } from 'react-icons/fa6';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { FadeLoader, PulseLoader } from 'react-spinners';
import { addCandidateNote, createProject, getProjects, projectNote, updateCandidateStatus } from '@/services/api/api';
import ErrorToast from '@/components/toasts/error';
import EndProject from './project-components/EndProject';

const RecruitmentProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [fetchingProjects, setFetchingProjects] = useState(true);
  const [candidates, setCandidates] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const fetchProjects = async () => {
    try {
      const response = await getProjects();
      const candidatesMap = [];
      response.data.forEach((project) => {
        project.MatchedCandidates.forEach(candidate => {
          const skills = candidate.User.JobseekerSkills.map(skill => skill.Skill.name);
          candidatesMap.push({
            ...candidates,
            projectId: project.id,
            id: candidate.UserId,
            name: candidate.User.name,
            skills: skills,
            status: candidate.Status,
            notes: candidate.MatchedCandidateNotes
          })
        })
      })
      setProjects(response.data);
      setCandidates(candidatesMap)
      setFetchingProjects(false);
    } catch (error) {
      console.error("Error fetching team data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (fetchingProjects) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <FadeLoader />
        <p>Setting up work area...</p>
      </div>
    )
  }

  const statusOptions = ['Screening', 'Interview', 'Shortlisted', 'Rejected'];

  const calendar = Array.from({ length: 35 }, (_, i) => {
    const date = new Date(2024, 11, 30);
    date.setDate(date.getDate() + i);
    return date;
  });

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const handleStatusChange = async (candidateId, newStatus, projectId) => {
    try {
      // setLoading(true);
      const firstLetter = newStatus.charAt(0)

      const firstLetterCap = firstLetter.toUpperCase()

      const remainingLetters = newStatus.slice(1)

      const capitalizedWord = firstLetterCap + remainingLetters
      await updateCandidateStatus(candidateId, capitalizedWord, projectId);
      setCandidates(candidates.map(candidate =>
        candidate.id === candidateId ? { ...candidate, status: capitalizedWord } : candidate
      ));
    } catch (err) {
      ErrorToast(err?.message || "Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  const handleNoteChange = async (candidateId, note, projectId) => {
    try {
      // setLoading(true);
      const response = await addCandidateNote(candidateId, note, projectId);
      setCandidates(candidates.map(candidate =>
        candidate.id === candidateId && candidate.projectId === projectId
          ? {
            ...candidate,
            notes: [response.data, ...candidate.notes]
          }
          : candidate
      ));
    } catch (err) {
      ErrorToast(err?.message || "Failed to save note");
    } finally {
      setLoading(false);
    }
  };

  const handleProjectNote = async (projectId, note) => {
    try {
      const storePrjNote = await projectNote({ projectId, note })
      setProjects(prev => prev.map(project =>
        project.id === projectId ? { ...project, Notes: [storePrjNote.data.note, ...project.Notes] } : project
      ));

      setSelectedProject({ ...selectedProject, Notes: [storePrjNote.data.note, ...selectedProject.Notes] })
    } catch (error) {
      ErrorToast(err?.message || "Failed to save note");
    }
  }

  const filteredCandidates = candidates.filter(candidate =>
    (statusFilter === "all" || candidate.status.toLowerCase() === statusFilter.toLowerCase()) &&
    (searchQuery === "" ||
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.skills.some(skill =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      )) && (selectedProject === null || candidate.projectId === selectedProject.id)
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitProject(formData);
  };

  const handleSubmitProject = async (formData) => {
    try {
      setLoading(true)
      await createProject(formData);
      await fetchProjects();
      setOpen(false)
      setLoading(false)
      setFormData({ name: "", description: "" })
    } catch (err) {
      setLoading(false)
      ErrorToast(err?.message || "Error occurred please refresh and try again.")
    }
  };


  return (
    <div className="p-6">
      <div className='flex justify-between items-center'>
        <h1 className="text-2xl font-bold mb-6">Recruitment Projects</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add Project</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit} className="mt-2">
              <DialogHeader>
                <DialogTitle>Project details</DialogTitle>
                <DialogDescription>
                </DialogDescription>
              </DialogHeader>
              <div className="">
                <div className="">
                  <Label htmlFor="name" className="">
                    Name
                  </Label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Project name"
                    className="mt-2 p-2 w-full border rounded mb-4"
                    required
                  />
                </div>
                <div className="">
                  <Label htmlFor="username" className="">
                    Details
                  </Label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Details"
                    className="mt-2 p-2 w-full border rounded mb-4"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">{loading ? <PulseLoader size={8} color="#ffffff" /> : "Save"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {projects.map(project => (
                <div
                  key={project.id}
                  className={`p-3 rounded cursor-pointer hover:bg-gray-100 ${selectedProject?.id === project.id ? 'bg-blue-50' : ''
                    }`}
                  onClick={() => setSelectedProject(project)}
                >
                  {project.name}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {selectedProject ? (
          <Card className="col-span-4">
            <CardHeader className="flex flex-row gap-2 items-center justify-between">
              <div>
                <CardTitle>{selectedProject.name}</CardTitle>
                <CardDescription>{selectedProject.status ? <p className='text-red-500'>Ended</p> : <p className='text-green-500'>Active</p>}</CardDescription>
              </div>

              <div className="flex items-center gap-4">
                <EndProject
                  projectId={selectedProject.id}
                  projectName={selectedProject.name}
                  projectStatus={selectedProject.status}
                  setSelectedProject={setSelectedProject}
                  setProjects={setProjects}
                  projectFeedback={selectedProject.feedback}
                  projectRating={selectedProject.rating}
                  projectSearchDuration={selectedProject.projectSearchDuration}
                  projectCandidateFound={selectedProject.foundCandidate}
                />
                <Input
                  placeholder="Search candidates..."
                  className="max-w-[200px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    {statusOptions.map(status => (
                      <SelectItem key={status.toLowerCase()} value={status.toLowerCase()}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {filteredCandidates.map(candidate => (
                  <div key={candidate.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{candidate.name}</h3>
                      <Select
                        value={candidate.status.toLowerCase()}
                        onValueChange={(value) => handleStatusChange(candidate.id, value, selectedProject.id)}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map(status => (
                            <SelectItem key={status.toLowerCase()} value={status.toLowerCase()}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {candidate.skills.map(skill => (
                        <Badge key={skill} className="rounded-sm bg-gray-300 text-black/50">{skill}</Badge>
                      ))}
                    </div>
                    <Textarea
                      onBlur={(e) => {
                        if (e.target.value.trim()) {
                          handleNoteChange(candidate.id, e.target.value, selectedProject.id);
                          e.target.value = '';
                        }
                      }}
                      className="text-gray-600 mb-4" placeholder="Note">

                    </Textarea>
                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-2">Previous Notes:</h4>
                      {

                        candidate.notes.map(note => (
                          <p key={note.id} className="text-gray-600">{note.Note}</p>
                        ))
                        // show notes in reverse order
                      }
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="flex col-span-4 flex-col items-center justify-center min-h-[200px] text-gray-500">
            <FaFolderOpen className='text-3xl' />
            <div>Select a project to view candidates</div>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1">
              {daysOfWeek.map(day => (
                <div key={day} className="text-center font-medium p-2">{day}</div>
              ))}
              {calendar.map((date, i) => (
                // <div
                //   key={i}
                //   className={`text-center p-2 hover:bg-gray-100 cursor-pointer rounded ${date.getDate() === 30 ? 'bg-blue-500 text-white' : ''
                //     }`}
                // >
                //   {date.getDate()}
                // </div>
                <div
                  key={i}
                  className={`text-center p-2 hover:bg-gray-100 cursor-pointer rounded text-black
                    `}
                >
                  {date.getDate()}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        {
          selectedProject ? (
            <Card>
              <CardHeader>
                <CardTitle>Project Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  onBlur={(e) => {
                    if (e.target.value.trim()) {
                      handleProjectNote(selectedProject.id, e.target.value);
                      e.target.value = '';
                    }
                  }}
                  className="w-full h-32 p-2 border rounded-lg resize-none"
                  placeholder="Add general project notes here..."
                />
                {
                  selectedProject.Notes.map(note => (
                    <p>{note.noteContent}</p>
                  ))
                }
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Project Notes</CardTitle>
                <CardDescription>Select project to add notes</CardDescription>
              </CardHeader>
            </Card>
          )
        }

      </div>
    </div>
  );
};

export default RecruitmentProjects;