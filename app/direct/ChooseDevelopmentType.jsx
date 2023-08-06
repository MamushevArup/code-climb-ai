import React from 'react';

const ChooseDevelopmentType = ({ onDirectionClick }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-6xl text-blue-950 font-bold mb-8">Choose Your Development Path</h2>
      <div className='flex justify-center'>
        <p className="text-lg w-4/5 leading-8 text-blue-950 text-center mb-6">
          Are you interested in frontend or backend development? Click the respective button to explore your path.
        </p>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={() => onDirectionClick('frontend')}
          className={`btn ${
            onDirectionClick === 'frontend' ? 'bg-white text-black' : 'bg-white text-black'
          } px-6 py-3 rounded-full font-semibold hover:opacity-75`}
        >
          Frontend
        </button>
        <button
          onClick={() => onDirectionClick('backend')}
          className={`btn ${
            onDirectionClick === 'backend' ? 'bg-black text-white' : 'bg-black text-white'
          } px-6 py-3 rounded-full font-semibold hover:opacity-75`}
        >
          Backend 
        </button>
      </div>
    </div>
  );
};

export default ChooseDevelopmentType;
