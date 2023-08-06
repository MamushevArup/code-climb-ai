'use client'

import { throttle } from '@/lib/throttle'
import { useState, useRef, useEffect, useCallback } from 'react'
import { ChatLine, LoadingChatLine } from './chat-line'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import cx from 'classnames'
import toast, { Toaster } from 'react-hot-toast'
import Cookies from 'js-cookie'
import Link from 'next/link'

let id = 0
// default first message to display in UI (not necessary to define the prompt)
export const initialMessages = [
  {
    role : 'assistant',
    content: 'Are you ready to start the interview?',
  },
]

const InputMessage = ({ input, setInput, sendMessage, loading }) => {
  const [isGeneratingQuestion, setIsGeneratingQuestion] = useState(false)
  const [question, setQuestion] = useState(null)
  const [questionError, setQuestionError] = useState(null)
  const inputRef = useRef(null)

  const shouldShowLoadingIcon = loading || isGeneratingQuestion
  const inputActive = input !== '' && !shouldShowLoadingIcon


  useEffect(() => {
    const input = inputRef?.current
    if (question && input) {
      input.focus()
      input.setSelectionRange(input.value.length, input.value.length)
    }
  }, [question, inputRef])

  useEffect(() => {
    if (questionError) {
      toast.error(questionError)
    }
  }, [questionError])

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-b from-transparent via-white to-white flex flex-col items-center clear-both">

      <div className="mx-2 my-4 flex-1 w-full md:mx-4 md:mb-[52px] lg:max-w-2xl xl:max-w-3xl">
        <div className="relative mx-2 flex-1 flex-col rounded-md border-black/10 bg-white shadow-[0_0_10px_rgba(0,0,0,0.10)] sm:mx-4">
        <input
          ref={inputRef}
          aria-label="chat input"
          required
          className="m-0 w-full border-0 bg-transparent p-0 py-3 pl-4 pr-12 text-black"
          placeholder="Type a message..."
          value={input}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (input.trim() !== '') {
                sendMessage(input);
                setInput('');
              } else {
                e.preventDefault(); // Prevent form submission on Enter key when input is empty
              }
            }
          }}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          disabled={isGeneratingQuestion}
        />
        <button
          className={cx(
            shouldShowLoadingIcon && "hover:bg-inherit hover:text-inhert",
            inputActive && "bg-black hover:bg-neutral-800 hover:text-neutral-100",
            "absolute right-2 top-2 rounded-sm p-1 text-neutral-800 opacity-60 hover:bg-neutral-200 hover:text-neutral-900 transition-colors"
          )}
          type="submit"
          onClick={() => {
            if (input.trim() !== '') {
              sendMessage(input);
              setInput('');
            }
          }}
          disabled={shouldShowLoadingIcon}
        >
          {shouldShowLoadingIcon ? (
            <div className="h-6 w-6 animate-spin rounded-full border-t-2 border-neutral-800 opacity-60 dark:border-neutral-100"></div>
          ) : (
            <div className={cx(inputActive && "text-white", "w-6 h-6")}>
              <PaperAirplaneIcon />
            </div>
          )}
        </button>


        </div>
      </div>
    </div>
  ) 
}

const useMessages = () => {
  const [messages, setMessages] = useState(initialMessages)
  const [isMessageStreaming, setIsMessageStreaming] = useState(false);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(200)
  // send message to API /api/chat endpoint
  const sendMessage = async (newMessage) => {
    setLoading(true)
    setError(null)


    const newMessages = [
      ...messages,
      {content: newMessage },
    ]
    setMessages(newMessages)
    const last10messages = newMessages.slice(-2)
    const token = Cookies.get('jwt')
    const response = await fetch(`http://localhost:8000/auth/get/question/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      body : JSON.stringify({
        question : last10messages[0]["content"],
        answer : last10messages[1]["content"],
      })
    })
    id++

    console.log('Edge function returned.')
    if (!response.ok) {
      console.log(response)
      setError(response.statusText)
      setLoading(false)
      setStatus(400)
      return
    }
    setStatus(response.status)
    // This data is a ReadableStream
    const temp = await response.json();
    let data = temp.message;
    if (!data) {
      return
    }

    data = data.replaceAll(`"`, "")
    data = data.substring(1)
    // This data is a ReadableStream


    setIsMessageStreaming(true)

      setMessages([
        ...newMessages,
        { role:'assistant', content: data, question : temp.question },
      ])

      setLoading(false)

    setIsMessageStreaming(false)
  }

  return {
    messages,
    isMessageStreaming,
    loading,
    error,
    sendMessage,
    status,
  }
}

export default function Chat() {
  const [input, setInput] = useState('')
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const { messages, isMessageStreaming, loading, error, sendMessage, status, question } = useMessages()
  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        chatContainerRef.current;
      const bottomTolerance = 30;

      if (scrollTop + clientHeight < scrollHeight - bottomTolerance) {
        setAutoScrollEnabled(false);
      } else {
        setAutoScrollEnabled(true);
      }
    }
  };

  const scrollDown = useCallback(() => {
    if (autoScrollEnabled) {
      messagesEndRef.current?.scrollIntoView(true)
    }
  }, [autoScrollEnabled])
  const throttledScrollDown = throttle(scrollDown, 250);

  useEffect(() => {
    throttledScrollDown()
  }, [messages, throttledScrollDown]);

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  return (
    
    <div className="flex-1 w-full border-zinc-100 bg-white overflow-hidden">
      <div
        ref={chatContainerRef}
        className="flex-1 w-full relative max-h-[calc(100vh-4rem)] overflow-x-hidden"
        onScroll={handleScroll}
      >
        {messages.map(({ content, role, question }, index) => (
          <ChatLine key={index} role={role} content={content} isStreaming={index === messages.length - 1 && isMessageStreaming}   question={question} />
        ))}

        {loading && <LoadingChatLine />}

        <div
          className="h-[152px] bg-white"
          ref={messagesEndRef}
        />
        {status === 206 
        ?  
        <>                    
          <Tryagain />
        </>       
        
        : <InputMessage
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
        isLoading={loading || isMessageStreaming}
      />
        }
      </div>
      <Toaster />
    </div>
  )
}

const Tryagain = () => {
  return (
    <Link href="/direct">
       <div className="fixed bottom-20 left-0 right-0 flex justify-center">
    <button
      className="mx-auto flex w-fit items-center gap-3 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-black hover:text-white text-sm hover:opacity-50 disabled:opacity-25"
      
    >
      Try again
    </button>
  </div>
    </Link>
  )
}