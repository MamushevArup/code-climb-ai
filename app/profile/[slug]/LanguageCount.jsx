import React, { useState } from 'react';

const LanguageCount = ({ count_lang }) => {
  const [visibleLanguages, setVisibleLanguages] = useState(4);

  const showMoreLanguages = () => {
    setVisibleLanguages(Object.keys(count_lang).length);
  };

  const showLessLanguages = () => {
    setVisibleLanguages(4);
  };

  return (
    <div className="mt-4">
      <div className="grid">
        <p className="text-xl font-semibold text-blue-950 mb-2">Languages</p>
        {Object.entries(count_lang)
          .slice(0, visibleLanguages)
          .map(([key, value]) => (
            <div key={key} className="inline-flex items-center mr-8 mb-2">
              <span className="capitalize bg-blue-200 px-4 py-2 rounded-full font-semibold text-blue-800 mr-6 shadow-md">
                {key}
              </span>
              <span className="text-gray-700 font-semibold">{value} times interviewed</span>
            </div>
          ))}
        {Object.keys(count_lang).length > 4 && (
          <div className="mt-4">
            {visibleLanguages === 4 ? (
              <button
                className="text-blue-600 hover:text-blue-800 font-semibold"
                onClick={showMoreLanguages}
              >
                Show More
              </button>
            ) : (
              <button
                className="text-blue-600 hover:text-blue-800 font-semibold"
                onClick={showLessLanguages}
              >
                Show Less
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageCount;
