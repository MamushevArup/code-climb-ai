'use client'
import React, { useState, useEffect } from 'react';
import axiosInstance from '@/lib/utils/axiosInstanse';
import ProfileDetails from './ProfileDetails';
import LastInterview from './LastInterview';
import LanguageCount from './LanguageCount';
import AllSkills from './AllSkills';
import SavedMessagesModal from './SavedMessagesModal';
import AllInterviewsModal from './AllInterviewsModal';
import Link from 'next/link';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [direct, setDirect] = useState('');
  const [status, setStatus] = useState('');
  const [image, setImage] = useState('');
  const [all_tech, setAll_tech] = useState([]);
  const [last_tech, setLast_tech] = useState([]);
  const [count_lang, setCount_lang] = useState({});
  const [showSavedMessagesModal, setShowSavedMessagesModal] = useState(false);
  const [savedMessages, setSavedMessages] = useState([]);
  const [showAllInterviewsModal, setShowAllInterviewsModal] = useState(false);
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    getSkills();
  }, []);

  const getSkills = async () => {
    try {
      const req = await axiosInstance.get('http://localhost:8000/auth/getData');
      const userData = req.data.user;
      const count_lang = req.data.count_language;

      setName(userData.username);
      setDirect(userData.direct);
      setStatus(userData.status);
      setImage(userData.image_url);

      const allSkills = [...userData.all_technologies];
      const temp_tech = [];

      if (userData.selectedLanguage !== null) {
        temp_tech.push(userData.selectedLanguage);
      }
      if (userData.selectedFrameworks !== null) {
        for (let i = 0; i < userData.selectedFrameworks.length; i++) {
          temp_tech.push(userData.selectedFrameworks[i]);
        }
      }
      if (userData.selectedTechnologies !== null) {
        for (let i = 0; i < userData.selectedTechnologies.length; i++) {
          temp_tech.push(userData.selectedTechnologies[i]);
        }
      }

      const language_count = count_lang;

      // Remove duplicate skills using Set
      const languages = Array.from(new Set(allSkills));

      setAll_tech(languages);
      setLast_tech(temp_tech);
      setCount_lang(language_count);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchInterviews = async () => {
    try {
      const response = await axiosInstance.get('http://localhost:8000/auth/getInterview');
      setInterviews(response.data.all);
    } catch (error) {
      console.error('Error fetching interviews:', error);
    }
  };

  const handleShowSavedMessages = async () => {
    setShowSavedMessagesModal(true);
    const getSaved = await axiosInstance.get('http://localhost:8000/auth/getSaved');
    setSavedMessages(getSaved.data.saved_message);
  };

  const handleCloseSavedMessages = () => {
    setShowSavedMessagesModal(false);
  };

  const handleShowAllInterviews = () => {
    fetchInterviews();
    setShowAllInterviewsModal(true);
  };

  const handleCloseAllInterviews = () => {
    setShowAllInterviewsModal(false);
  };

  return (
          <div className="p-8 rounded-lg" style={{ width: '901px' }}>
      {/* Profile Details - Top Center - Light Purple Background */}
      <div className="p-4 rounded-lg flex justify-between mb-8 text-center shadow-md">
        <ProfileDetails name={name} direct={direct} status={status} image={image} />
        <div className="mt-4 space-y-4 grid">
          <button
            className="bg-black  text-white px-4 py-2 rounded"
            onClick={handleShowAllInterviews}
          >
            All Interviews
          </button>
          <button
            className="bg-white text-black px-4 py-2 rounded"
            onClick={handleShowSavedMessages}
          >
            Saved Messages
          </button>
        </div>
      </div>
  
      <div className="md:flex flex justify-end">
        {/* Left Side - Languages and Buttons - Light Blue Background */}
        <div className="md:w-1/2 p-4 rounded-lg shadow-md ">
          <LanguageCount count_lang={count_lang} />
        </div>
  
        {/* Right Side - Last Interview - Light Green Background */}
        <div className="p-4 rounded-lg shadow-md " style={{ width: '500px' }}>
          <LastInterview last_tech={last_tech} />
        </div>
      </div>
  
      {/* Skills - Light Green Background */}
      <div className="mt-4 p-4 rounded-lg shadow-md ">
        <AllSkills all_tech={all_tech} />
      </div>
  
      {/* SavedMessagesModal */}
      <SavedMessagesModal
        show={showSavedMessagesModal}
        handleClose={handleCloseSavedMessages}
        savedMessages={savedMessages}
      />
  
      {/* AllInterviewsModal */}
      <AllInterviewsModal
        show={showAllInterviewsModal}
        handleClose={handleCloseAllInterviews}
        allInterviews={interviews}
      />
    </div>
  );
};

export default ProfilePage;










