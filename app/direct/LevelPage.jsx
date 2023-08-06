'use client'
import React, { useState } from 'react';
import Link from 'next/link';

const LevelPage = ({ direction }) => {
  const [chosenLevel, setChosenLevel] = useState('');
  const [activeButton, setActiveButton] = useState('');

  const handleLevelClick = (level) => {
    setChosenLevel(level);
    setActiveButton(level);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-5xl text-blue-950 font-bold mb-6">Choose the grade you want to be interviewed</h2>
      <p className="text-lg mb-4 text-blue-950 text-center">
        Select the level that best describes your experience and expertise in {direction} development.
      </p>
      <div className="flex space-x-4">
        <button
          onClick={() => handleLevelClick('Intern')}
          className={`level-btn ${
            activeButton === 'Intern' ? 'bg-white text-black' : 'bg-black text-white border'
          } px-6 py-3 rounded-full font-semibold hover:opacity-75`}
        >
          Intern
        </button>
        <button
          onClick={() => handleLevelClick('Junior')}
          className={`level-btn ${
            activeButton === 'Junior' ? 'bg-white text-black' : 'bg-black text-white border '
          } px-6 py-3 rounded-full font-semibold hover:opacity-75`}
        >
          Junior
        </button>
        <button
          onClick={() => handleLevelClick('Middle')}
          className={`level-btn ${
            activeButton === 'Middle' ? 'bg-white text-black' : 'bg-black text-white border'
          } px-6 py-3 rounded-full font-semibold hover:opacity-75`}
        >
          Middle
        </button>
        <button
          onClick={() => handleLevelClick('Senior')}
          className={`level-btn ${
            activeButton === 'Senior' ? 'bg-white text-black' : 'bg-black text-white border '
          } px-6 py-3 rounded-full font-semibold hover:opacity-75`}
        >
          Senior
        </button>
      </div>

      <Link href={`/direct/${direction}?grade=${chosenLevel}`} >
        <button
          className={`submit-btn bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-black hover:text-white mt-4 ${
            chosenLevel === '' ? 'cursor-not-allowed' : ''
          }`}
          disabled={chosenLevel === ''}
        >Next
        </button>
      </Link>
    </div>
  );
};

export default LevelPage;