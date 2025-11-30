"use client";

import React, { useState } from "react";
import { Upload } from "lucide-react";
import LoadingScreen from "./components/LoadingScreen";
import ResultScreen from "./components/ResultScreen";
import LowScoreResultScreen from "./components/LowScoreResultScreen";
import UpdatedResumeScreen from "./components/UpdatedResumeScreen";

export default function App() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");

  const [errorResume, setErrorResume] = useState("");
  const [errorJD, setErrorJD] = useState("");

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [matchScore, setMatchScore] = useState(0);
  const [showHighScore, setShowHighScore] = useState(true);

  const [isUpdating, setIsUpdating] = useState(false);
  const [showUpdatedResume, setShowUpdatedResume] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
      setErrorResume("");
    }
  };

  const handleAnalyze = () => {
    let hasError = false;

    if (!resumeFile) {
      setErrorResume("Resume file is required.");
      hasError = true;
    }

    if (!jobDescription.trim()) {
      setErrorJD("Job Description is required.");
      hasError = true;
    }

    if (hasError) return;

    setErrorResume("");
    setErrorJD("");

    setIsAnalyzing(true);

    setTimeout(() => {
      setIsAnalyzing(false);

      if (showHighScore) {
        setMatchScore(92);
      } else {
        setMatchScore(68);
      }

      setShowHighScore(!showHighScore);
      setShowResult(true);
    }, 2000);
  };

  const handleUpdateResume = () => {
    setShowResult(false);
    setIsUpdating(true);

    setTimeout(() => {
      setIsUpdating(false);
      setMatchScore(94);
      setShowUpdatedResume(true);
    }, 2000);
  };

  const handleGoBack = () => {
    setShowResult(false);
    setResumeFile(null);
    setJobDescription("");
  };

  const handleDone = () => {
    setShowUpdatedResume(false);
    setResumeFile(null);
    setJobDescription("");
  };

  if (isAnalyzing || isUpdating) {
    return <LoadingScreen />;
  }

  if (showUpdatedResume) {
    return <UpdatedResumeScreen score={matchScore} onDone={handleDone} />;
  }

  if (showResult) {
    if (matchScore >= 90) {
      return (
        <ResultScreen
          score={matchScore}
          onUpdateResume={handleUpdateResume}
          onGoBack={handleGoBack}
        />
      );
    } else {
      return (
        <LowScoreResultScreen
          score={matchScore}
          onUpdateResume={handleUpdateResume}
          onGoBack={handleGoBack}
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 md:px-8 py-4">
        <div className="text-gray-800">Resume Analyzer</div>
      </nav>

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8 py-8 md:py-12">
        <div className="w-full max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
            {/* Resume Upload */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 sm:p-6">
              <h2 className="text-gray-800 mb-4 md:mb-6">Upload Resume</h2>

              <label className="block">
                <input
                  type="file"
                  accept=".doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 md:p-8 flex flex-col items-center justify-center cursor-pointer hover:border-gray-300 transition-colors bg-gray-50">
                  <Upload className="w-8 h-8 md:w-10 md:h-10 text-gray-400 mb-3" />
                  <span className="text-gray-600 text-sm text-center px-2">
                    {resumeFile ? resumeFile.name : "Click to upload or drag and drop"}
                  </span>
                  <span className="text-gray-400 text-xs mt-1">DOC or DOCX</span>
                </div>
              </label>

              {errorResume && (
                <p className="text-red-500 text-xs mt-2">{errorResume}</p>
              )}
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 sm:p-6">
              <h2 className="text-gray-800 mb-4 md:mb-6">Job Description</h2>

              <textarea
                value={jobDescription}
                onChange={(e) => {
                  setJobDescription(e.target.value);
                  setErrorJD("");
                }}
                className="w-full h-48 md:h-64 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Paste JD here…"
              />

              {errorJD && <p className="text-red-500 text-xs mt-2">{errorJD}</p>}
            </div>
          </div>

          {/* Analyze Button - ALWAYS ENABLED */}
          <div className="flex justify-center">
            <button
              onClick={handleAnalyze}
              className="w-full sm:w-auto px-8 md:px-10 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Analyze Match
            </button>
          </div>
        </div>
      </main>

      <footer className="py-4 md:py-6 text-center">
        <p className="text-gray-400 text-xs">We don&apos;t store your data.</p>
      </footer>
    </div>
  );
}
