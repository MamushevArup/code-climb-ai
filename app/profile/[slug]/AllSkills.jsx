import React, { useState } from 'react';
import { TagIcon } from '@heroicons/react/24/solid';

const AllSkills = ({ all_tech }) => {
  const [showAllSkills, setShowAllSkills] = useState(false);
  const visibleSkills = showAllSkills ? all_tech : all_tech.slice(0, 8);

  return (
    <>
    <div className="flex items-center mb-4">
    <TagIcon className="w-6 h-6 mr-2 text-blue-200" />
    <h2 className="text-lg font-semibold text-blue-950">Skills</h2>
  </div>
  <div className="flex flex-col items-center">
    <div className="flex flex-wrap">
        {visibleSkills.map((skill, index) => (
          <div key={index} className="text-blue-800 bg-blue-200 font-semibold px-4 py-2 rounded-md  mr-2 mt-2 text-center">
            <span className="capitalize">{skill}</span>
          </div>
        ))}
      </div>
      {all_tech.length > 8 && (
        <div
          className={` px-4 rounded-md text-blue-950 font-semibold cursor-pointer ${
            showAllSkills ? 'text-blue-950 hover:text-white' : 'text-blue-950 hover:text-white'
          } transition-colors duration-200`}
          onClick={() => setShowAllSkills((prev) => !prev)}
        >
          {showAllSkills ? 'Show Less' : 'Show More'}
        </div>
      )}
    </div>
    </>

  );
};

export default AllSkills;
