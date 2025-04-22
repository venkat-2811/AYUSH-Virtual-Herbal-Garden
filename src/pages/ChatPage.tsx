
import React, { useState, useRef, useEffect } from "react";
import { useChat } from "@/contexts/ChatContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Leaf, Send, Loader2, Trash2 } from "lucide-react";

const ChatPage = () => {
  const { messages, isLoading, sendMessage, clearMessages } = useChat();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput("");
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md border border-herb-100 overflow-hidden">
          {/* Header */}
          <div className="border-b border-herb-100 px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Avatar className="bg-herb-100">
                <AvatarFallback className="text-herb-500">
                  <Leaf className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-herb-700">AYUSH Herb Expert</h3>
                <p className="text-xs text-herb-500">Powered by Gemini AI</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-herb-500 hover:text-herb-700"
              onClick={clearMessages}
            >
              <Trash2 className="h-4 w-4 mr-1" /> Clear Chat
            </Button>
          </div>
          
          {/* Messages */}
          <div className="h-[60vh] overflow-y-auto p-6 bg-herb-50/50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${message.isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-3/4 rounded-lg px-4 py-2 ${
                    message.isUser
                      ? "bg-herb-500 text-white"
                      : "bg-white border border-herb-100 text-herb-700 shadow-sm"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <p className={`text-xs mt-1 ${message.isUser ? "text-herb-50" : "text-herb-400"}`}>
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-white border border-herb-100 rounded-lg px-4 py-3 shadow-sm">
                  <div className="flex items-center">
                    <Loader2 className="h-4 w-4 animate-spin text-herb-500 mr-2" />
                    <p className="text-herb-500">Thinking...</p>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input */}
          <form onSubmit={handleSendMessage} className="border-t border-herb-100 p-4">
            <div className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about herbs, gardening tips, or medicinal uses..."
                className="flex-1 border-herb-200"
                disabled={isLoading}
              />
              <Button 
                type="submit"
                className="bg-herb-500 hover:bg-herb-600"
                disabled={!input.trim() || isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-1" /> Send
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
        
        <div className="mt-6 text-center text-sm text-herb-500">
          <p>
            Ask questions about medicinal herbs, their properties, gardening tips, traditional uses,
            and more!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
