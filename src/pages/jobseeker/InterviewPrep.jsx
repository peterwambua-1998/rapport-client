import { Button } from "@/components/ui/button";
import { getQuestions, getResults } from "@/services/api/api";
import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaHourglassEnd,
  FaInfoCircle,
  FaSyncAlt,
  FaUserCheck,
  FaVideo,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import VideoInterview from "./Questions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check, Award } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const InterviewPrep = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [qtnChosen, setQtnChosen] = useState([]);
  const [step, setStep] = useState("selection");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState([]);

  const toggleQuestion = (question) => {
    if (qtnChosen.includes(question)) {
      // If the question is already selected, uncheck it
      setQtnChosen((prev) => prev.filter((q) => q !== question));
    } else {
      // If the question is not selected, add it to the list (only if less than 6 are selected)
      if (qtnChosen.length < 6) {
        setQtnChosen((prev) => [...prev, question]);
      }
    }
  };

  const generateQuestions = async () => {
    try {
      setLoading(true);
      const res = await getQuestions();
      const questionSets = res.data.questions;
      setQuestions(questionSets);
      setIsSelected(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const startInterview = () => {
    if (qtnChosen.length === 6) {
      setQtnChosen(qtnChosen);
      setStep("recording");
    }
  };

  const endProcess = () => {
    setQuestions([]);
    setQtnChosen([]);
    setStep("completed");
    setIsOpen(true);
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await getResults();
        setResults(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchResults();
  }, [])

  if (step === "recording") {
    return <VideoInterview chosenQuestions={qtnChosen} endProcess={endProcess} />;
  }

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="max-w-6xl col-span-1 md:col-span-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#2b4033] mb-4 sm:mb-6 md:mb-8">
            Interview Preparation Guide
          </h1>

          {/* Video Interview Tips Section */}
          <div className="bg-[#c3dac4] rounded-lg p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 md:mb-8 border border-slate-300">
            <h2 className="text-xl sm:text-2xl md:text-3xl text-[#34495e] mb-3 sm:mb-4">
              <FaVideo className="mr-2 inline" />
              Video Interview Tips
            </h2>
            <ul className="space-y-2 sm:space-y-3">
              {interviewTips.map((tip, index) => (
                <li key={index} className="flex items-center text-gray-700 text-sm sm:text-base md:text-lg">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Interview Requirements Section */}
          <div className="bg-[#c3dac4] rounded-lg p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 md:mb-8 border border-slate-300">
            <h2 className="text-xl sm:text-2xl md:text-3xl text-[#34495e] mb-3 sm:mb-4">
              <FaInfoCircle className="mr-2 inline" />
              Interview Requirements
            </h2>
            <ul className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
              <li className="text-gray-700 text-sm sm:text-base md:text-lg">
                <FaClock className="text-[#3498db] mr-2 inline" />
                Each answer should be 1-2 minutes long
              </li>
              <li className="text-gray-700 text-sm sm:text-base md:text-lg">
                <FaHourglassEnd className="inline text-[#3498db] mr-2" />
                Total interview time should not exceed 7 minutes
              </li>
              <li className="text-red-600 text-sm sm:text-base md:text-lg">
                <FaExclamationTriangle className="mr-2 inline" />
                You must select and save a set of questions before proceeding
              </li>
              <li className="text-gray-700 text-sm sm:text-base md:text-lg">
                <FaUserCheck className="inline text-[#3498db] mr-2" />
                Questions are tailored to your profile information
              </li>
            </ul>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                variant="destructive"
                onClick={() => navigate(-1)}
                className="w-full sm:w-auto text-sm sm:text-base md:text-lg"
              >
                <FaArrowLeft className="mr-2 inline" />
                Not Ready
              </Button>
              <Button
                disabled={loading}
                onClick={generateQuestions}
                className="bg-[#546154] hover:bg-[#475447] w-full sm:w-auto text-sm sm:text-base md:text-lg"
              >
                {loading ? (
                  <PulseLoader size={8} color="#ffffff" />
                ) : (
                  <span>
                    <FaSyncAlt className="mr-2 inline" />
                    Generate Interview Questions
                  </span>
                )}
              </Button>
            </div>
          </div>

          {questions.length > 0 && (
            <div className="bg-[#edeeed] rounded-lg p-4 sm:p-6 md:p-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl text-[#34495e] font-semibold mb-3 sm:mb-4">
                Your Profile-Matched Questions
              </h2>
              <p className="mb-3 sm:mb-4 text-sm sm:text-base md:text-lg">Select six questions to proceed</p>
              <ul className="space-y-2 sm:space-y-3">
                {questions.map((question, index) => (
                  <li key={index} className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base md:text-lg">
                    <input
                      type="checkbox"
                      checked={qtnChosen.includes(question)}
                      onChange={() => toggleQuestion(question)}
                      disabled={qtnChosen.length === 6 && !qtnChosen.includes(question)} // Disable if 6 are selected and this question is not selected
                    />
                    <span className="text-gray-700">{question}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Button
            onClick={startInterview}
            disabled={qtnChosen.length !== 6}
            type="button"
            className="bg-[#2b4033] hover:bg-[#1e3728] text-white w-full mt-4 text-sm sm:text-base md:text-lg"
          >
            <FaVideo className="mr-2 inline" /> Proceed
          </Button>
        </div>
        <div className="col-span-1">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#2b4033] mb-4 sm:mb-6">
            Past Interviews
          </h2>
          <ScrollArea className="h-[calc(100vh-100px)] rounded-lg border p-4">
            {results.length > 0 ? (
              results.map((result) => (
                <div>
                  <div
                    key={result.id}
                    className="bg-[#f5f5f5] rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-lg font-semibold text-[#34495e]">
                      {new Date(result.createdAt).toLocaleDateString()}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      <span className="font-medium">Grade:</span> {result.grade}/100
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      <span className="font-medium">Feedback:</span> {result.feedback}
                    </p>
                    <Dialog>
                      <DialogTrigger>
                        <Button size="sm" className="mt-4 bg-[#2b4033] hover:bg-[#1e3728] text-white">Show Questions</Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-[90vw] overflow-auto max-h-[90vh] md:max-w-[700px] lg:max-w-[800px] xl:max-w-[900px]">
                        <DialogHeader>
                          <DialogTitle>Interview Questions</DialogTitle>
                            <div className="p-2 ">
                              <ul className="text-sm marker:text-[#546154] list-decimal space-y-4">
                                {result.questions.split('?,').map((qtn, i) => (
                                  <li key={i}>{qtn}</li>
                                ))}
                              </ul>
                              <Separator className="my-4" />
                              <div>
                                <p className="text-sm text-gray-600 mt-2">
                                  <span className="font-medium">Grade:</span> {result.grade}/100
                                </p>
                              </div>
                            </div>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-600">No past interviews found.</p>
            )}
          </ScrollArea>
        </div>
      </div>


      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md p-4 sm:p-6 md:p-8">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center text-lg sm:text-xl md:text-2xl">
              <Award className="mr-2 text-green-600" size={24} />
              Interview Completed
            </DialogTitle>
            <DialogDescription className="text-center text-sm sm:text-base md:text-lg">
              Congratulations! You've successfully answered all selected interview questions.
              Your recorded videos are ready for submission.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center">
            <Button onClick={() => {
              setIsOpen(false)
              setStep('selection')
            }} className="text-sm sm:text-base md:text-lg">
              Submit Interview
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InterviewPrep;

const interviewTips = [
  "Find a quiet, well-lit room",
  "Position yourself against a clean background",
  "Dress professionally from head to toe",
  "Test your camera and microphone beforehand",
  "Look directly into the camera when speaking",
  "Keep good posture throughout the interview",
];