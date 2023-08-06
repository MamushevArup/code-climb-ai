'use client'
import React, { useState, useEffect } from 'react'
import { CommandLineIcon, UserIcon, StarIcon} from '@heroicons/react/24/outline'
import axiosInstance from '@/lib/utils/axiosInstanse'
// loading placeholder animation for the chat line
export const LoadingChatLine = () => (
  <div
    className="border-b border-black/10 bg-gray-50 text-gray-800"
  >
    <div
      className="relative m-auto flex p-4 text-base md:max-w-2xl gap-2 md:gap-6 md:py-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl"
    >
      <div className="min-w-[30px]">
        <CommandLineIcon />
      </div>
      <span className="animate-pulse cursor-default mt-1">▍</span>
    </div>
  </div >
)

// util helper to convert new lines to <br /> tags
const convertNewLines = (text) =>
  text.split('\n').map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ))

export function ChatLine({ role, content, isStreaming, question}) {

  const contentWithCursor = `${content}${isStreaming ? '▍' : ''}`
  const formatteMessage = convertNewLines(contentWithCursor)

  const [saved, setSaved] = useState(false);
  const [showSaveMessage, setShowSaveMessage] = useState(false);
  const [savedMessage, setSavedMessage] = useState(true)

  if (!content) {
    return null
  }
  
  let timeoutId = null

  const handleMouseEnter = () => {
    timeoutId = setTimeout(() => {
      setShowSaveMessage(true);
    }, 500);// Delay of 0.5 seconds (500 milliseconds)
  };

  const handleMouseLeave = () => {

      if (saved) {
        setSavedMessage(false);
      }
    clearTimeout(timeoutId)
    setShowSaveMessage(false)
  }

  const handleButtonClick = async () => {
  
    setSaved((prevState) => !prevState);
    setShowSaveMessage(false);
    if (question === undefined) {
      return 
    }
    setTimeout(() => {
      setSavedMessage(false);
    }, 1000);
    setSavedMessage(true)

    if (!saved) {
      const sendData = {
        question : question,
      }
      console.log(sendData);
      const saveQuestion = await axiosInstance.post("http://localhost:8000/auth/saveMessage", sendData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
    }
  };
  return (
    <div
      className={
        role === 'assistant'
          ? "border-b border-black/10 bg-gray-50 text-gray-800"
          : "border-b border-black/10 bg-white text-gray-800"
      }
    >
      <div
        className="relative m-auto flex p-4 text-base md:max-w-2xl gap-2 md:gap-6 md:py-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl"
      >
        <div className="min-w-[30px]">
          {role === 'assistant'
            ? (
              <CommandLineIcon />
            )
            : (
              <UserIcon />
            )
          }
        </div>

        <div className="prose whitespace-pre-wrap flex-1">
          {formatteMessage}
        </div>
        <div>
          {role === 'assistant' && (
          
          <button className="min-w-[25px]"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleButtonClick}
          >
            <StarIcon style={{ fill: saved ? 'yellow' : 'white' }}/>
          </button>
        )}
        {showSaveMessage && !saved && role === 'assistant' && (
          <span className="absolute top-0 right-8 bg-gray-200 p-1 rounded-md text-xs">
            Click to Save
          </span>
        )}
        {saved && savedMessage && (
          <span className="absolute top-0 right-8 bg-gray-200 p-1 rounded-md text-xs">
          Saved</span>
        )}
        </div>

      </div>
    </div>
  )
}
