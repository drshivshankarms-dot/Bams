import React, { useState, useRef, useEffect } from 'react';
import { generateAyurvedaResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import { MessageCircle, X, Send, Leaf, Sparkles } from 'lucide-react';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'init', role: 'model', text: 'Namaste! I am your Ayurveez Assistant. Ask me anything about BAMS subjects, Samhitas, or clinical queries.' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    const responseText = await generateAyurvedaResponse(inputValue);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${
          isOpen ? 'bg-red-800 rotate-90' : 'bg-ayur-secondary hover:bg-emerald-800 hover:scale-110'
        } text-white border-2 border-yellow-500`}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>

      {/* Chat Interface */}
      <div 
        className={`fixed bottom-24 right-6 w-96 max-w-[90vw] bg-white rounded-2xl shadow-2xl border-2 border-ayur-secondary z-40 transition-all duration-300 origin-bottom-right flex flex-col overflow-hidden ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        }`}
        style={{ height: '500px' }}
      >
        {/* Header */}
        <div className="bg-ayur-secondary p-4 flex items-center gap-3 text-white">
          <div className="bg-white/20 p-2 rounded-full">
            <Leaf size={20} className="text-yellow-400" />
          </div>
          <div>
            <h3 className="font-serif font-bold">Ayurveez Assistant</h3>
            <p className="text-xs text-emerald-200">AI Powered Clinical Guide</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-ayur-light/50 scrollbar-hide">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-ayur-primary text-white rounded-br-none' 
                    : 'bg-white border border-stone-200 text-ayur-text rounded-bl-none'
                }`}
              >
                {msg.text.split('\n').map((line, i) => (
                  <p key={i} className="mb-1">{line}</p>
                ))}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-stone-200 p-3 rounded-2xl rounded-bl-none flex items-center gap-2">
                <Sparkles size={16} className="text-yellow-600 animate-spin" />
                <span className="text-xs text-gray-500">Consulting the Samhitas...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-gray-100">
          <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-full border border-gray-300 focus-within:border-ayur-secondary focus-within:ring-1 focus-within:ring-ayur-secondary/20 transition-all">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about treatments, herbs..."
              className="flex-1 bg-transparent border-none outline-none text-sm px-2"
            />
            <button 
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="p-2 bg-ayur-primary text-white rounded-full hover:bg-ayur-accent disabled:opacity-50 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;