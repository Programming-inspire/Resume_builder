import { AlertCircle } from 'lucide-react';

interface LowScoreResultScreenProps {
  score: number;
  missingAreas: string[]; // ⬅️ NEW dynamic prop
  onUpdateResume: () => void;
  onGoBack: () => void;
}

export default function LowScoreResultScreen({
  score,
  missingAreas,
  onUpdateResume,
  onGoBack
}: LowScoreResultScreenProps) {

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 md:px-8 py-4">
        <div className="text-gray-800">Resume Analyzer</div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-6 md:px-8 py-8 md:py-12 overflow-y-auto">
        <div className="w-full max-w-4xl mx-auto space-y-6 md:space-y-8">
          
          {/* Score Display */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 md:p-8 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full bg-yellow-50 border-4 border-yellow-500 mb-4">
              <span className="text-yellow-600 text-2xl md:text-3xl">{score}%</span>
            </div>
            <h1 className="text-yellow-600 mb-2">Needs Improvement</h1>
            <p className="text-gray-600 px-4">
              Your resume could be better aligned with the job description.
            </p>
          </div>

          {/* Missing Areas */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 md:p-8">
            <h2 className="text-gray-800 mb-4 md:mb-6 text-center">Missing or Weak Areas</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {missingAreas.map((area, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg border border-yellow-200 bg-yellow-50"
                >
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{area}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Section */}
          <div className="text-center">
            <p className="text-gray-700 mb-4 px-4">
              Do you want me to further improve your resume based on this JD?
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                onClick={onUpdateResume}
                className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Yes, Update Resume
              </button>

              <button
                onClick={onGoBack}
                className="w-full sm:w-auto px-8 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                No, Go Back
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
