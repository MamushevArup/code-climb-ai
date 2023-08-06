'use client'
import React, { useState } from 'react';
import ChooseDevelopmentType from './ChooseDevelopmentType';
import LevelPage from './LevelPage';

const Page = () => {
  const [selectedDirection, setSelectedDirection] = useState('');

  const handleDirectionClick = (direction) => {
    setSelectedDirection(direction);
  };

  return (
    <>
      {selectedDirection === '' ? (
        <ChooseDevelopmentType onDirectionClick={handleDirectionClick} />
      ) : (
        <LevelPage direction={selectedDirection} />
      )}
    </>
  );
};

export default Page;


// const ButtonArrayExample = () => {
//   const [frontendButtons, setFrontendButtons] = useState([]);
//   const [backendButtons, setBackendButtons] = useState([]);

//   const frontendTechnologies = [
//     'React',
//     'Angular',
//     'Vue.js',
//     'HTML',
//     'CSS',
//     'JavaScript',
//   ];

//   const backendTechnologies = [
//     'Node.js',
//     'Express.js',
//     'Django',
//     'Flask',
//     'Ruby on Rails',
//     'Spring Boot',
//   ];

//   const handleFrontendButtonClick = (technology) => {
//     if (!backendButtons.length) {
//       setFrontendButtons(
//         frontendButtons.includes(technology)
//           ? frontendButtons.filter((btn) => btn !== technology)
//           : [...frontendButtons, technology]
//       );
//     }
//   };

//   const handleBackendButtonClick = (technology) => {
//     if (!frontendButtons.length) {
//       setBackendButtons(
//         backendButtons.includes(technology)
//           ? backendButtons.filter((btn) => btn !== technology)
//           : [...backendButtons, technology]
//       );
//     }
//   };

//   const isFrontendButtonSelected = (technology) => frontendButtons.includes(technology);

//   const isBackendButtonSelected = (technology) => backendButtons.includes(technology);

//   const handleSubmit = () => {
//     const selectedTechnologies = [...frontendButtons, ...backendButtons];
//     console.log('Selected Technologies:', selectedTechnologies);
//   };

//   return (
//     <div className="p-4">
//       <div className="flex justify-between">
//         <div className="w-1/2">
//           <h2 className="text-2xl mb-4">Frontend Technologies</h2>
//           {frontendTechnologies.map((technology) => (
//             <button
//               key={technology}
//               onClick={() => handleFrontendButtonClick(technology)}
//               className={`bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 m-2 rounded ${
//                 isFrontendButtonSelected(technology) ? 'opacity-75' : ''
//               }`}
//               disabled={backendButtons.length > 0}
//             >
//               {technology}
//             </button>
//           ))}
//         </div>
//         <div className="w-1/2">
//           <h2 className="text-2xl mb-4">Backend Technologies</h2>
//           {backendTechnologies.map((technology) => (
//             <button
//               key={technology}
//               onClick={() => handleBackendButtonClick(technology)}
//               className={`bg-gradient-to-r from-red-500 to-purple-500 text-white px-4 py-2 m-2 rounded ${
//                 isBackendButtonSelected(technology) ? 'opacity-75' : ''
//               }`}
//               disabled={frontendButtons.length > 0}
//             >
//               {technology}
//             </button>
//           ))}
//         </div>
//       </div>

//       <button
//         onClick={handleSubmit}
//         className={`text-white px-4 py-2 m-2 rounded ${
//           frontendButtons.length > 0 && backendButtons.length > 0
//             ? 'bg-gradient-to-r from-green-500 to-blue-500'
//             : 'bg-gray-500'
//         }`}
//         disabled={frontendButtons.length === 0 && backendButtons.length === 0}
//       >
//         Submit
//       </button>
//     </div>
//   );
// };
// export default Page
