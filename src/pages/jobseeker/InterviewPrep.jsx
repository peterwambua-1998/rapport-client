import { useState } from "react";
import { FaArrowLeft, FaCheckCircle, FaClock, FaExclamationTriangle, FaHourglassEnd, FaInfoCircle, FaSyncAlt, FaUserCheck, FaVideo } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const InterviewPrep = () => {
  const [questions, setQuestions] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const navigate = useNavigate();
  const interviewTips = [
    "Find a quiet, well-lit room",
    "Position yourself against a clean background",
    "Dress professionally from head to toe",
    "Test your camera and microphone beforehand",
    "Look directly into the camera when speaking",
    "Keep good posture throughout the interview",
  ];

  const generateQuestions = () => {
    const questionSets = [
      [
        "Based on your industry experience, tell me about your most relevant background",
        "Given your role in previous companies, what are your greatest achievements?",
        "Considering your management style, how do you handle challenging situations?",
        "With your skill set, where do you see yourself in five years?",
        "Looking at your background, what makes you unique?",
        "Based on your qualifications, why should we choose you for this position?",
      ],
      [
        "Given your technical expertise, describe a project you're most proud of",
        "Based on your past roles, how do you stay organized and manage deadlines?",
        "Considering your work history, what's your approach to working in teams?",
        "Looking at your career path, what motivates you professionally?",
        "Given your experience level, how do you handle constructive criticism?",
        "Based on your market value, what are your salary expectations?",
      ],
      [
        "Considering your background, what interests you about this role?",
        "Given your work environment preferences, how do you deal with pressure?",
        "Based on your past companies, describe your ideal work environment",
        "Looking at your team experience, what's your leadership style?",
        "Given your professional journey, how do you continue learning and growing?",
        "Considering your career goals, what questions do you have for us?",
      ],
    ];

    const randomSet =
      questionSets[Math.floor(Math.random() * questionSets.length)];
    setQuestions(randomSet);
    setIsSelected(true);
  };

  return (
    <div className="min-h-screen bg-[#edeeed] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-[#2b4033] mb-8 text-center">
          Interview Preparation Guide
        </h1>
        <div className="bg-[#c3dac4] rounded-lg p-6 mb-8 border border-slate-300">
          <h2 className="text-2xl font-crimson-text text-[#34495e] mb-4">
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
          <h2 className="text-2xl font-crimson-text text-[#34495e] mb-4">
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

          <div className="text-center space-y-4">
            <button
              onClick={generateQuestions}
              className="bg-[#3498db] text-white px-8 py-3 rounded-lg hover:bg-[#2980b9] transition-colors font-crimson-text"
            >
              <FaSyncAlt className="mr-2 inline" />
              Generate Interview Questions
            </button>

            <div className="flex gap-4">
              <button onClick={() =>  navigate(-1)} className="w-1/2 px-8 py-3 rounded-lg bg-[#e74c3c] hover:bg-[#c0392b] text-white transition-colors font-crimson-text">
              <FaArrowLeft  className="mr-2 inline" />
                Not Ready
              </button>

              <button
                disabled={!isSelected}
                className={`w-1/2 px-8 py-3 rounded-lg transition-colors font-crimson-text ${isSelected
                  ? "bg-green-500 hover:bg-green-600 text-white cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                <FaVideo className="mr-2 inline" />
                Proceed
              </button>
            </div>
          </div>
        </div>

        {questions.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-crimson-text text-[#34495e] mb-4">
              <i className="fas fa-question-circle mr-2"></i>
              Your Profile-Matched Questions
              {isSelected && (
                <span className="text-sm text-green-500 ml-2">
                  <i className="fas fa-check-circle mr-1"></i>
                  Questions Selected
                </span>
              )}
            </h2>
            <ul className="space-y-4">
              {questions.map((question, index) => (
                <li key={index} className="flex items-start">
                  <span className="font-bold mr-2 text-[#3498db]">
                    {index + 1}.
                  </span>
                  <span className="text-gray-700">{question}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default InterviewPrep;