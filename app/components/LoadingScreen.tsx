export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 md:px-8 py-4">
        <div className="text-gray-800">Resume Analyzer</div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8">
        <div className="text-center">
          {/* Loading Spinner */}
          <div className="mb-6 md:mb-8">
            <div className="w-16 h-16 md:w-20 md:h-20 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          </div>
          
          {/* Loading Text */}
          <p className="text-gray-600 text-lg md:text-xl">Analyzing your resume...</p>
          <p className="text-gray-400 text-sm mt-2 px-4">This may take a few moments</p>
        </div>
      </main>
    </div>
  );
}
