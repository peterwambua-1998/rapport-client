import { Button } from "@/components/ui/button";
import { getQuestions } from "@/services/api/api";
import { useState } from "react";
import { FaArrowLeft, FaCheckCircle, FaClock, FaExclamationTriangle, FaHourglassEnd, FaInfoCircle, FaSyncAlt, FaUserCheck, FaVideo } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import VideoInterview from "./Questions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Check, Award } from 'lucide-react';

const InterviewPrep = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [qtnChosen, setQtnChosen] = useState([]);
  const [step, setStep] = useState('selection');
  const [isOpen, setIsOpen] = useState(false);

  const toggleQuestion = (question) => {
    setQtnChosen(prev =>
      prev.includes(question)
        ? prev.filter(q => q !== question)
        : [...prev, question]
    );
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
      console.log(error)
    }
  };


  const startInterview = () => {
    if (qtnChosen.length === 6) {
      setQtnChosen(qtnChosen);
      setStep('recording');

    }
  };

  const endProcess = () => {
    setQuestions([])
    setQtnChosen([])
    setStep('completed')
    setIsOpen(true);
  }

  if (step === 'recording') {
    return <VideoInterview chosenQuestions={qtnChosen} endProcess={endProcess} />
  }

  return (
    <div className="min-h-screen bg-[#edeeed] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-[#2b4033] mb-8 text-center">
          Interview Preparation Guide
        </h1>
        <div className="bg-[#c3dac4] rounded-lg p-6 mb-8 border border-slate-300">
          <h2 className="text-2xl  text-[#34495e] mb-4">
            <FaVideo className="mr-2 inline" />
            Video Interview Tips
          </h2>
          <ul className="space-y-3">
            {interviewTips.map((tip, index) => (
              <li key={index} className="flex items-center text-gray-700">
                <FaCheckCircle className="text-green-500 mr-2" />
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#c3dac4] rounded-lg p-6 mb-8 border border-slate-300">
          <h2 className="text-2xl  text-[#34495e] mb-4">
            <FaInfoCircle className="mr-2 inline" />
            Interview Requirements
          </h2>
          <ul className="space-y-3 mb-6">
            <li className="text-gray-700">
              <FaClock className="text-[#3498db] mr-2 inline" />
              Each answer should be 1-2 minutes long
            </li>
            <li className="text-gray-700">
              <FaHourglassEnd className="inline text-[#3498db] mr-2" />
              Total interview time should not exceed 7 minutes
            </li>
            <li className="text-red-600">
              <FaExclamationTriangle className="mr-2 inline" />
              You must select and save a set of questions before proceeding
            </li>
            <li className="text-gray-700">
              <FaUserCheck className="inline text-[#3498db] mr-2" />
              Questions are tailored to your profile information
            </li>
          </ul>


          <div className="flex gap-4">
            <Button variant="destructive" onClick={() => navigate(-1)} className="w-full">
              <FaArrowLeft className="mr-2 inline" />
              Not Ready
            </Button>


            <Button disabled={loading} onClick={generateQuestions} className="bg-[#949894] hover:bg-[#858885] w-full">
              {loading ? <PulseLoader size={8} color="#ffffff" /> : <span>
                <FaSyncAlt className="mr-2 inline" />
                Generate Interview Questions
              </span>}
            </Button>

          </div>
        </div>

        {questions.length > 0 && (
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-2xl text-[#34495e] font-semibold">
              Your Profile-Matched Questions
            </h2>
            <p className="mb-4">Select six questions to proceed</p>
            <ul className="space-y-4">
              {questions.map((question, index) => (
                <li key={index} className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    id="profileVisible"
                    name="profileVisible"
                    checked={qtnChosen.includes(question)}
                    onChange={() => toggleQuestion(question)}
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
          type="button" className="bg-[#2b4033] hover:bg-[#1e3728] text-white w-full mt-4">

          <FaVideo className="mr-2 inline" /> Proceed
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center">
              <Award className="mr-2 text-green-600" size={24} />
              Interview Completed
            </DialogTitle>
            <DialogDescription className="text-center">
              Congratulations! You've successfully answered all selected interview questions.
              Your recorded videos are ready for submission.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center">
            <Button
              onClick={() => setIsOpen(false)}
            >
              Submit Interview
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default InterviewPrep;


const interviewTips = [
  "Find a quiet, well-lit room",
  "Position yourself against a clean background",
  "Dress professionally from head to toe",
  "Test your camera and microphone beforehand",
  "Look directly into the camera when speaking",
  "Keep good posture throughout the interview",
];