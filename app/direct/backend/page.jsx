'use client'
import React, { useEffect, useState } from 'react';
import axiosInstance from '@/lib/utils/axiosInstanse';
import Link from 'next/link';

const BackendPage = () => {
  const [grade, setGrade] = useState(''); // ex junior
  const direct = "backend"; // backend
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState(''); // ex java
  const [selectedFrameworks, setSelectedFrameworks] = useState([]); // ex [spring]
  const [selectedTechnologies, setSelectedTechnologies] = useState([]); // [docker, mongo, redis]
  const [res, setRes] = useState([])
  

  useEffect(() => {
    // Get the URL search params
    const params = new URLSearchParams(window.location.search);
    // Extract the 'grade' parameter value
    const gradeValue = params.get('grade');
    // Set the grade state with the extracted value
    const decodedGrade = decodeURIComponent(gradeValue);

    setGrade(decodedGrade);
  }, []);

  const handleLanguageClick = (language) => {
    setSelectedFrameworks([]);
    // Check if the clicked language is already selected, and if so, clear the selection
    setSelectedLanguage((prevLanguage) => (prevLanguage === language ? '' : language));
  };

  const handleFrameworkClick = (framework) => {
    setSelectedFrameworks((prevFrameworks) => {
      if (prevFrameworks.includes(framework)) {
        return prevFrameworks.filter((item) => item !== framework);
      } else {
        return [...prevFrameworks, framework];
      }
    });
  };

  const handleTechnologyClick = (technology) => {
    setSelectedTechnologies((prevTechnologies) => {
      if (prevTechnologies.includes(technology)) {
        return prevTechnologies.filter((item) => item !== technology);
      } else {
        return [...prevTechnologies, technology];
      }
    });
  };
  const isSelectionMade = selectedLanguage || selectedFrameworks.length > 0 || selectedTechnologies.length > 0;

  const submitButtonDisabled = !isSelectionMade;

  // Function to handle form submission
  const handleSubmit = async () => {
    setLoading(true);
    setError(false);
    setSuccess(false);
    const dataToSend = {
      grade: grade,
      direct: direct,
      selectedLanguage: selectedLanguage,
      selectedFrameworks: selectedFrameworks,
      selectedTechnologies: selectedTechnologies,
    };

    // Make an Axios POST request using your axiosInstance
    await axiosInstance
      .patch('http://localhost:8000/auth/chooseLang', dataToSend)
      .then((response) => {
        // Handle the successful response
        console.log('Data sent successfully:', response.data);
      })
      .catch((error) => {
        // Handle the error
        setLoading(false);
        console.error('Error sending data:', error);
      });
    const create_question = await axiosInstance
    .get("http://localhost:8000/auth/api/chat");
    console.log(create_question.data);
    if (create_question.data !== null){
      setSuccess(true)
      setLoading(false)
      setRes(create_question.data)
    }
    window.location.href = "/openAi"
  };

  const languagesWithFrameworks = [
    {
      language: 'JavaScript',
      frameworks: ['Express.js', 'Node.js', 'Meteor.js', 'React.js', 'Angular', 'Vue'],
    },
    {
      language: 'Python',
      frameworks: ['Django', 'Flask', 'FastAPI'],
    },
    {
      language: 'Java',
      frameworks: ['Spring Boot', 'Play Framework'],
    },
    {
      language: 'Ruby',
      frameworks: ['Ruby on Rails', 'Sinatra'],
    },
    {
      language: 'Go',
      frameworks: ['Gin', 'Echo', 'Fiber'],
    },
    {
      language: 'C#',
      frameworks: ['ASP.NET Core', 'Entity Framework Core'],
    },
    {
      language: 'PHP',
      frameworks: ['Laravel', 'Symfony'],
    },
  ];

  const technologies = [
    'PostgreSQL',
    'MongoDB',
    'Nginx',
    'Apache',
    'Docker',
    'Git',
    'Redis',
    'WebSocket',
    'Kubernetes',
    'AWS',
    'Testing',
    'MySql',
    'HTTP',
    'TCP/IP',
    'Security',
    'Bash',
    'RabbitMQ',
    'Kafka',
    // ... Add more general technologies as needed
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-5xl font-bold text-blue-950 mb-6">Choose a Programming Language</h2>
      <div className="flex space-x-4">
        {languagesWithFrameworks.map((item) => (
          <button
            key={item.language}
            onClick={() => handleLanguageClick(item.language)}
            className={`tech-btn ${
              selectedLanguage === item.language ? 'bg-gradient-to-tl from-blue-700 via-purple-400 to-indigo-500' : 'text-blue-800 bg-blue-200 font-semibold  border-blue-500'
            } px-6 py-3 rounded-full font-semibold hover:opacity-75`}
          >
            {item.language}
          </button>
        ))}
      </div>
      {selectedLanguage && (
        <div className="mt-8">
          <h2 className="text-5xl text-blue-950 font-bold mb-6">Choose Frameworks</h2>
          <div className="flex flex-wrap space-x-4">
            {languagesWithFrameworks.find((item) => item.language === selectedLanguage).frameworks.map((framework) => (
              <button
                key={framework}
                onClick={() => handleFrameworkClick(framework)}
                className={`tech-btn ${
                  selectedFrameworks.includes(framework) ? 'bg-gradient-to-tl from-blue-700 via-purple-400 to-indigo-500' : 'text-blue-800 bg-blue-200 font-semibold  border-blue-500'
                } px-6 py-3 rounded-full font-semibold hover:opacity-75`}
              >
                {framework}
              </button>
            ))}
          </div>
        </div>
      )}
  <div className="mt-16 flex flex-col items-center justify-center w-1/2">
   
      <h2 className="text-5xl font-bold text-blue-950 mb-6">Technologies</h2>
      <div className="flex flex-wrap m-4 ">
        {technologies.map((technology) => (
          <div className='p-2'>
              <button
              key={technology}
              onClick={() => handleTechnologyClick(technology)}
              className={`tech-btn ${
                selectedTechnologies.includes(technology) ? 'bg-gradient-to-tl from-blue-700 via-purple-400 to-indigo-500' : 'text-blue-800 bg-blue-200 font-semibold  border-blue-500'
              } px-6 py-3 rounded-full font-semibold hover:opacity-75`}
            >
              {technology}
            </button>
          </div>
 
        ))}
    </div>
  </div>
      <button
        onClick={handleSubmit}
        disabled={submitButtonDisabled || loading}
        className={`mt-8 px-6 py-3 rounded-full font-semibold ${
          submitButtonDisabled || loading
            ? 'bg-white text-black cursor-not-allowed'
            : 'bg-black text-white hover:opacity-75'
        }`}
      >
        {loading ? (
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6"></div>
        ) : (
          'Submit'
        )}
      </button>
    </div>
  );
  
};

export default BackendPage;