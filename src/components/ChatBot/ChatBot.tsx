'use client';

import type React from 'react';

import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquare, Paperclip, Send, Smile, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type ChatBotProps = {
  onClose: () => void;
};

type Message = {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  attachment?: {
    name: string;
    type: string;
    url: string;
  };
};

export function ChatBot({ onClose }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hello! I\'m your travel assistant. How can I help you plan your next adventure?',
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current;
      // Use setTimeout to ensure the scroll happens after the DOM has been updated
      setTimeout(() => {
        scrollArea.scrollTop = scrollArea.scrollHeight;
      }, 0);
    }
  }, [messages, isTyping]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    // Create a URL for the file
    const fileUrl = URL.createObjectURL(file);

    // Add message with attachment
    const newId = messages.length + 1;
    setMessages([
      ...messages,
      {
        id: newId,
        text: `Attached file: ${file.name}`,
        isBot: false,
        timestamp: new Date(),
        attachment: {
          name: file.name,
          type: file.type,
          url: fileUrl,
        },
      },
    ]);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    // Trigger bot response
    simulateBotResponse('Thanks for sharing the file. How can I help you with this?');
  };

  const handleEmojiSelect = (emoji: string) => {
    setInput(prev => prev + emoji);
  };

  const simulateBotResponse = (response: string) => {
    // Show typing indicator
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          text: response,
          isBot: true,
          timestamp: new Date(),
        },
      ]);
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!input.trim()) {
      return;
    }

    // Add user message
    const newId = messages.length + 1;
    setMessages([
      ...messages,
      {
        id: newId,
        text: input,
        isBot: false,
        timestamp: new Date(),
      },
    ]);
    setInput('');

    // Determine bot response based on user input
    let botResponse = '';
    const userInput = input.toLowerCase();

    if (userInput.includes('hello') || userInput.includes('hi')) {
      botResponse = 'Hi there! How can I help with your travel plans today?';
    } else if (userInput.includes('hotel') || userInput.includes('accommodation')) {
      botResponse
        = 'I can help you find the perfect hotel! What\'s your destination and when are you planning to travel?';
    } else if (userInput.includes('flight') || userInput.includes('fly')) {
      botResponse
        = 'Looking for flights? I can assist with that. Please let me know your departure city, destination, and travel dates.';
    } else if (userInput.includes('budget') || userInput.includes('cost')) {
      botResponse
        = 'I understand budget is important! Could you tell me your destination and I can provide some cost-effective options?';
    } else if (userInput.includes('pakistan') || userInput.includes('tour')) {
      botResponse
        = 'Pakistan has many beautiful places to visit! Some popular destinations include Lahore, Islamabad, Hunza Valley, and Swat Valley. Would you like recommendations for any specific region?';
    } else {
      botResponse
        = 'Thanks for your message! I\'d be happy to help with your travel plans. Could you provide more details about what you\'re looking for?';
    }

    simulateBotResponse(botResponse);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="absolute bottom-20 right-0 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 border border-emerald-100"
    >
      <div className="travel-gradient text-black p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <div className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            <span className="font-medium">Travel Assistant</span>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-black hover:bg-white/20 rounded-full">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="h-80 p-3" ref={scrollAreaRef}>
        <div className="flex flex-col gap-3">
          <AnimatePresence initial={false}>
            {messages.map(message => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`flex gap-2 max-w-[80%] ${message.isBot ? 'flex-row' : 'flex-row-reverse'}`}>
                  {message.isBot && (
                    <Avatar className="h-8 w-8 bg-emerald-100 border-2 border-emerald-200">
                      <span className="text-xs">🤖</span>
                    </Avatar>
                  )}
                  <div>
                    <div
                      className={`p-3 rounded-2xl ${
                        message.isBot
                          ? 'bg-white border border-gray-200 shadow-sm rounded-tl-none'
                          : 'travel-gradient text-gray-600 rounded-tr-none'
                      }`}
                    >
                      {message.text}
                      {message.attachment && (
                        <div className="mt-2 p-2 bg-white rounded-lg border border-gray-200">
                          <div className="flex items-center gap-2">
                            <div className="bg-blue-100 p-1 rounded-full">
                              <Paperclip className="h-3 w-3 text-blue-600" />
                            </div>
                            <a
                              href={message.attachment.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline truncate max-w-[150px]"
                            >
                              {message.attachment.name}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className={`text-xs text-gray-500 mt-1 ${message.isBot ? 'text-left' : 'text-right'}`}>
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                  {!message.isBot && (
                    <Avatar className="h-8 w-8 travel-gradient text-white border-2 border-emerald-200">
                      <span className="text-xs">U</span>
                    </Avatar>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
              <div className="flex gap-2 max-w-[80%]">
                <Avatar className="h-8 w-8 bg-emerald-100 border-2 border-emerald-200">
                  <span className="text-xs">🤖</span>
                </Avatar>
                <div className="p-3 bg-white border border-gray-200 shadow-sm rounded-2xl rounded-tl-none">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    >
                    </div>
                    <div
                      className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0.4s' }}
                    >
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </ScrollArea>

      <div className="p-3 border-t border-gray-100">
        <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="text-emerald-600 border-emerald-200 hover:bg-emerald-50 rounded-full"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 rounded-full border-gray-200 focus-visible:ring-emerald-500"
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="text-emerald-600 border-emerald-200 hover:bg-emerald-50 rounded-full"
              >
                <Smile className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-2" align="end">
              <div className="grid grid-cols-8 gap-1">
                {[
                  '😊',
                  '😂',
                  '👍',
                  '❤️',
                  '🎉',
                  '✨',
                  '🌟',
                  '👋',
                  '🙏',
                  '🤔',
                  '😎',
                  '🔥',
                  '⭐',
                  '🌈',
                  '🚀',
                  '🏝️',
                  '🏖️',
                  '🏔️',
                  '🗺️',
                  '✈️',
                  '🧳',
                  '🏨',
                  '🌄',
                  '🌅',
                ].map(emoji => (
                  <button
                    key={emoji}
                    onClick={() => handleEmojiSelect(emoji)}
                    className="text-xl p-1 hover:bg-emerald-50 rounded"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <Button onClick={handleSendMessage} size="icon" className="travel-gradient hover:opacity-90 rounded-full">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
