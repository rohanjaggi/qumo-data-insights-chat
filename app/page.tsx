"use client";

import { useChat } from "ai/react";
import { useState, useEffect, useRef } from "react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    streamProtocol: "text",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showIntro, setShowIntro] = useState(false);
  const [pinnedMessages, setPinnedMessages] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      handleSubmit(e);
    } finally {
      setTimeout(() => setIsLoading(false), 1000); 
    }
    scrollToBottom();
  };
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!isLoading) {
      scrollToBottom();
    }
  }, [messages]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleQuickAction = (action: string) => {
    handleInputChange({ target: { value: action } });
    setTimeout(() => {
      const event = new Event('submit', { bubbles: true, cancelable: true });
      const form = document.querySelector('form');
      if (form) form.dispatchEvent(event);
    }, 0);
  };

  const pinMessage = (content: string) => {
    if (!pinnedMessages.includes(content)) {
      setPinnedMessages((prev) => [...prev, content]);
    }
  };

  const unpinMessage = (content: string) => {
    setPinnedMessages((prev) => prev.filter((message) => message !== content));
  };

  return (
    <div
      className={`flex flex-col h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Popup Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 max-w-lg w-full">
            <h2 className="text-lg font-bold mb-4 text-gray-700 dark:text-gray-300">
              Welcome to Chat with Jacky!
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Jacky is an AI assistant that can help you explore datasets related to university
              students' academic stress and mental health. Ask questions like:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
              <li>Give me a summary of the dataset.</li>
              <li>How many students rated their mental health below 5?</li>
              <li>What are the most common sources of stress?</li>
              <li>What strategies are frequently used to manage stress?</li>
              <li>How many responses are there in total?</li>
            </ul>
            <button
              onClick={() => {
                setIsModalOpen(false);
                setShowIntro(true);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-3xl shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      {/* Theme Toggle and Intro Button */}
      <header className="bg-gray-800 text-white py-4 px-6 shadow-md relative">
        <div className="max-w-[800px] mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold">
            Chat with Jacky - Your Helpful AI Assistant
          </h1>
          <div className="flex items-center gap-4">
            {showIntro && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-3xl shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Hello!
              </button>
            )}
            <button
              onClick={toggleTheme}
              className="px-4 py-2 rounded-3xl shadow-md bg-gray-300 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isDarkMode ? "Light" : "Dark"}
            </button>
          </div>
        </div>
      </header>

      {/* Pinned Messages Section */}
      {pinnedMessages.length > 0 && (
        <div className="bg-blue-100 dark:bg-gray-800 p-4 shadow-md">
          <div className="max-w-[800px] mx-auto">
            <h2 className="text-md font-semibold mb-2">Pinned Messages</h2>
            <ul className="space-y-2">
              {pinnedMessages.map((message, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-white dark:bg-gray-700 p-3 rounded-lg shadow"
                >
                  <span className="text-sm">{message}</span>
                  <button
                    onClick={() => unpinMessage(message)}
                    className="text-red-500 text-sm font-bold hover:underline"
                  >
                    Unpin
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}


      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col gap-5 max-w-[800px] mx-auto">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${
                m.role === "user" ? "justify-end" : "justify-start"
              } transition-transform transform-gpu duration-300 ease-in-out`}
            >
              <div
                className={`${
                  m.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                } px-4 py-2 rounded-3xl shadow-md max-w-[85%] sm:max-w-[70%] lg:max-w-[60%] animate-fade-in relative hover:shadow-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300`}
              >
                <p className="text-sm">{m.content}</p>
                <button
                  onClick={() => pinMessage(m.content)}
                  className="absolute bottom right-1 bg-gray-300 dark:bg-gray-600 text-blue-600 dark:text-blue-400 px-2 py-1 text-xs rounded-full shadow hover:bg-gray-400 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Pin
                </button>
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-300 text-gray-800 px-4 py-2 rounded-3xl shadow-md max-w-[85%] animate-pulse">
                <p className="text-sm">Jacky is typing...</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 p-2">
        <div className="max-w-[800px] mx-auto flex gap-2">
          <button
            onClick={() => handleQuickAction("Give me a summary of the dataset.")}
            className="px-3 py-2 bg-blue-500 text-white rounded-3xl shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Summary
          </button>
          <button
            onClick={() => handleQuickAction("How many responses are there?")}
            className="px-3 py-2 bg-blue-500 text-white rounded-3xl shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Responses Number
          </button>
        </div>
      </div>

      {/* Input Section */}
      <form
        onSubmit={handleChatSubmit}
        className="bg-white dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 p-4"
      >
        <div className="max-w-[800px] mx-auto flex items-center gap-2">
          <input
            className="flex-1 p-3 border rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 text-gray-900"
            value={input}
            placeholder="Type your message..."
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-3xl shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}