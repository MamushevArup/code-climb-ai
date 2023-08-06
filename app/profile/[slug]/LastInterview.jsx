import React, { useState } from 'react';

const LastInterview = ({ last_tech }) => {
  const [visibleSkills, setVisibleSkills] = useState(3);
  const showMoreSkills = () => setVisibleSkills(last_tech.length);

  const showLessSkills = () => setVisibleSkills(3);

  return (
      <div className="mt-4">
        <div className='flex justify-end'>
          <p className="text-xl font-semibold text-blue-950 mb-2">Last interview on</p>

        </div>
  
       <div className='flex flex-wrap flex-row-reverse'>
          {last_tech.slice(0, visibleSkills).map((skill, index) => (
            <div key={index} className="bg-blue-200 px-4 py-2 mr-2 mt-2 rounded-md text-blue-800 font-semibold">
              {skill}
            </div>
          ))}
        </div>
        {last_tech.length > 3 && (
          <div className="mt-4 flex justify-end">
            <div>
            {visibleSkills === 3 ? (
              <button
                className="text-blue-950 hover:text-white font-semibold"
                onClick={showMoreSkills}
              >
                Show More
              </button>
            ) : (
              <button
                className="text-blue-950 hover:text-white font-semibold"
                onClick={showLessSkills}
              >
                Show Less
              </button>
            )}
            </div>

          </div>
        )}
      </div>

  );
};

export default LastInterview;
