const AllInterviewsModal = ({ show, handleClose, allInterviews }) => {
    if (!show) {
      return null;
    }
  
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        {/* Background Overlay with Shadow */}
        <div className="fixed inset-0 bg-black bg-opacity-50"></div>
  
        {/* Modal Content */}
        <div className="bg-gradient-to-b from-purple-300 to-purple-500 bg-opacity-75 p-8 rounded-lg shadow-lg relative max-w-xl w-full">
  
          <div className="overflow-y-auto max-h-96">
            {allInterviews.map((interview, groupIndex) => (
              <div key={groupIndex} className="mb-6">
                <h2 className="text-xl font-bold mb-3 text-blue-900">Interview {groupIndex + 1}</h2>
                {interview.questions.map((question, questionIndex) => (
                  <div key={questionIndex} className="mb-4">
                    <h3 className="font-medium mb-2 text-gray-800">Question {questionIndex + 1}</h3>
                    <p className="mb-1 text-gray-800"> {/* Updated text color */}
                      <span className="font-semibold">Question:</span> {question.question}
                    </p>
                    <p className="mb-1 text-green-800"> {/* Updated text color */}
                      <span className="font-semibold">User Answer:</span> {question.user_answer}
                    </p>
                    <p className="text-purple-500"> {/* Updated text color */}
                      <span className="font-semibold">Right Answer:</span> {question.right_answer}
                    </p>
                    <hr className="my-3" />
                  </div>
                ))}
              </div>
            ))}
          </div>
          <button
            className="bg-red-600 text-white p-1 px-3 rounded-full absolute bottom-3 right-0 mt-2 mr-8"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  export default AllInterviewsModal;