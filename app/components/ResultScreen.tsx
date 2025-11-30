import { CheckCircle2, CheckCircle } from 'lucide-react';

interface ResultScreenProps {
  score: number;
  onUpdateResume: () => void;
  onGoBack: () => void;
}

export default function ResultScreen({ score, onUpdateResume, onGoBack }: ResultScreenProps) {
  const strongAreas = [
    'Technical Skills',
    'Work Experience',
    'Educational Background',
    'Project Portfolio'
  ];

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
            <div className="inline-flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full bg-green-50 border-4 border-green-500 mb-4">
              <span className="text-green-600 text-2xl md:text-3xl">{score}%</span>
            </div>
            <h1 className="text-green-600 mb-2">Great Match!</h1>
            <p className="text-gray-600">Your resume aligns well with the job description.</p>
          </div>

          {/* Strong Areas */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 md:p-8">
            <h2 className="text-gray-800 mb-4 md:mb-6 text-center">Strong Areas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {strongAreas.map((area, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg border border-green-200 bg-green-50"
                >
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{area}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Section */}
          <div className="text-center">
            <p className="text-gray-700 mb-4 px-4">
              Everything looks great! Your resume is well-aligned with this job description.
            </p>
            <div className="flex justify-center">
              <button
                onClick={onGoBack}
                className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}