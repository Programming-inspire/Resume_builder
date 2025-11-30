import { CheckCircle2, Check } from 'lucide-react';

interface UpdatedResumeScreenProps {
  score: number;
  onDone: () => void;
}

export default function UpdatedResumeScreen({ score, onDone }: UpdatedResumeScreenProps) {
  const updatedPoints = [
    'Added missing keywords',
    'Strengthened role responsibilities',
    'Added relevant project highlights',
    'Improved skill alignment'
  ];

  const originalResume = `John Doe
Senior Software Developer

Experience:
• Worked on web applications
• Built features using JavaScript
• Collaborated with team members

Skills:
JavaScript, HTML, CSS, React

Education:
Bachelor's in Computer Science`;

  const updatedResume = `John Doe
Senior Software Developer

Experience:
• Developed scalable web applications using modern frameworks
• Built responsive features using JavaScript, React, and TypeScript
• Collaborated with cross-functional teams in Agile environment
• Led code reviews and mentored junior developers

Skills:
JavaScript, TypeScript, HTML, CSS, React, Node.js, REST APIs, Git, Agile

Education:
Bachelor's in Computer Science`;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 md:px-8 py-4">
        <div className="text-gray-800">Resume Analyzer</div>
      </nav>

      {/* Main Result Section */}
      <main className="flex-1 px-4 sm:px-6 md:px-8 py-8 md:py-12 overflow-y-auto">
        <div className="w-full max-w-6xl mx-auto">
          {/* Updated Score Display */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 md:p-8 mb-6 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full bg-green-50 border-4 border-green-500 mb-4">
              <span className="text-green-600 text-2xl md:text-3xl">{score}%</span>
            </div>
            <h1 className="text-green-600 mb-2">Updated Match Score: {score}%</h1>
          </div>

          {/* Update Summary Message */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 md:mb-8">
            <div className="flex items-start gap-3 mb-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-green-800">
                Your resume has been updated based on the job description.
              </p>
            </div>
            <p className="text-green-700 text-sm ml-8">
              Below is a comparison of your old and new resume content.
            </p>
          </div>

          {/* Side-by-Side Comparison Section */}
          <div className="mb-6 md:mb-8">
            <h2 className="text-gray-800 text-center mb-4 md:mb-6">Before vs After</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {/* Left Panel - Original Resume */}
              <div className="bg-gray-100 rounded-lg border border-gray-200 shadow-sm p-4 md:p-6">
                <h3 className="text-gray-800 mb-4">Original Resume</h3>
                <div className="bg-white rounded-lg p-3 md:p-4 h-64 md:h-80 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-gray-700 text-xs md:text-sm leading-relaxed">
                    {originalResume.split('\n').map((line, index) => {
                      // Highlight removed or changed content in red
                      const isChanged = line.includes('Worked on web') || 
                                       line.includes('Built features using JavaScript') ||
                                       line.includes('JavaScript, HTML, CSS, React');
                      return (
                        <div key={index} className={isChanged ? 'bg-red-50 border-l-2 border-red-400 pl-2 -ml-2' : ''}>
                          {line}
                        </div>
                      );
                    })}
                  </pre>
                </div>
              </div>

              {/* Right Panel - Updated Resume */}
              <div className="bg-green-50 rounded-lg border border-green-200 shadow-sm p-4 md:p-6">
                <h3 className="text-gray-800 mb-4">Updated Resume</h3>
                <div className="bg-white rounded-lg p-3 md:p-4 h-64 md:h-80 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-gray-700 text-xs md:text-sm leading-relaxed">
                    {updatedResume.split('\n').map((line, index) => {
                      // Highlight new or improved content in green
                      const isNew = line.includes('scalable web applications') || 
                                   line.includes('TypeScript') ||
                                   line.includes('cross-functional') ||
                                   line.includes('Led code reviews') ||
                                   line.includes('Node.js') ||
                                   line.includes('REST APIs') ||
                                   line.includes('Agile');
                      return (
                        <div key={index} className={isNew ? 'bg-green-50 border-l-2 border-green-400 pl-2 -ml-2' : ''}>
                          {line}
                        </div>
                      );
                    })}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Updated Points List */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 md:p-6 mb-6 md:mb-8">
            <h2 className="text-gray-800 mb-4 text-center">What We Updated</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
              {updatedPoints.map((point, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 bg-gray-50"
                >
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm md:text-base">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Final Action Area */}
          <div className="flex justify-center">
            <button
              onClick={onDone}
              className="w-full sm:w-auto px-8 md:px-10 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Done — Back to Home
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}