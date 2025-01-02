import React, { useState, useEffect } from "react";
import axios from "axios";
import { getQuestions } from "@/services/api/api";

const TestPage = () => {
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [isTestOver, setIsTestOver] = useState(false);
  const [results, setResults] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleTestEnd();
    }
  }, [timeLeft]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const qs = await getQuestions(); 
        const data = JSON.parse(qs.data);
        
        console.log(data.questions);
        setQuestions(data.questions);
        setLoading(false);
      } catch (err) {
        // setError("Error fetching recruiter profile.");
        setError(err);
      } finally {
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleTestEnd = async () => {
    setIsTestOver(true);
    await calculateResults();
  };

  const handleSubmit = () => {
    handleTestEnd();
  };

  const calculateResults = async () => {
    try {
      const response = await axios.post("/api/validate-answers", {
        questions: questions.map((q) => ({ id: q.id, question: q.question })),
        answers,
      });

      setResults(response.data.results);
    } catch (error) {
      console.error("Error validating answers with AI:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p>loading questions...</p>
      </div>
    );
  }

  if (error != null) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p>error...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-4">Job Seeker Test</h1>
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-600">
            Time Remaining: {Math.floor(timeLeft / 60)}:
            {timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
          </p>
          {isTestOver && (
            <p className="text-red-600 font-semibold">Time's up!</p>
          )}
        </div>

        {!isTestOver ? (
          <>
            {questions.map((q, index) => (
              <div key={index} className="mb-4">
                <p className="font-semibold mb-2">{q.question}</p>
                <textarea
                  className="w-full p-2 border rounded"
                  placeholder="Your answer..."
                  rows="3"
                  value={answers[q.id] || ""}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                  disabled={isTestOver}
                />
              </div>
            ))}

            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </>
        ) : (
          <div>
            <h2 className="text-xl font-bold text-center mb-4">Results</h2>
            {results &&
              results.map((result, index) => (
                <div key={index} className="mb-4">
                  <p className="font-semibold">Question: {result.question}</p>
                  <p
                    className={`text-gray-700 ${
                      result.isCorrect ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    Your Answer: {result.answer}
                  </p>
                  {!result.isCorrect && (
                    <p className="text-gray-700">
                      Correct Answer: {result.correctAnswer}
                    </p>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestPage;
