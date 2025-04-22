
import React, { createContext, useContext, useState, useEffect } from "react";
import { ChatMessage } from "@/types";
import { queryGemini } from "@/services/geminiApi";
import { v4 as uuidv4 } from "uuid";

interface ChatContextType {
  messages: ChatMessage[];
  isLoading: boolean;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Load saved messages from localStorage on initial render
  useEffect(() => {
    const savedMessages = localStorage.getItem("ayush_chat_messages");
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        setMessages(parsedMessages);
      } catch (error) {
        console.error("Error parsing saved chat messages:", error);
      }
    } else {
      // Add welcome message if no saved messages
      const welcomeMessage: ChatMessage = {
        id: uuidv4(),
        content: "Welcome to AYUSH Virtual Herbal Garden! How can I assist you with herbal medicine or gardening today?",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("ayush_chat_messages", JSON.stringify(messages));
    }
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: uuidv4(),
      content,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      // Get response from Gemini API
      const response = await queryGemini(content);

      // Add AI response
      const aiMessage: ChatMessage = {
        id: uuidv4(),
        content: response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("Error sending message to AI:", error);
      
      // Add error message
      const errorMessage: ChatMessage = {
        id: uuidv4(),
        content: "I apologize, but I encountered an error. Please try again later.",
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    const welcomeMessage: ChatMessage = {
      id: uuidv4(),
      content: "Welcome to AYUSH Virtual Herbal Garden! How can I assist you with herbal medicine or gardening today?",
      isUser: false,
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
    localStorage.removeItem("ayush_chat_messages");
  };

  return (
    <ChatContext.Provider value={{ messages, isLoading, sendMessage, clearMessages }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
