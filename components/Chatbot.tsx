import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { ChatTrie } from '../utils/dsa';
import { GoogleGenAI } from "@google/genai";
import { STUDENTS, COMPANIES } from '../data/mockData';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{sender: 'bot'|'user', text: string}[]>([
    { sender: 'bot', text: 'Hi! Ask me about placements or students.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // DSA: Trie for instant command matching
  const trie = useRef(new ChatTrie());

  useEffect(() => {
    // Initialize Trie with known facts
    const maxPackage = Math.max(...STUDENTS.map(s => s.package || 0));
    trie.current.insert('highest package', `The highest package is ₹${maxPackage} LPA.`);
    trie.current.insert('top recruiter', `Top recruiter is TechNova with 12 hires.`);
    trie.current.insert('cse students', `There are ${STUDENTS.filter(s => s.branch === 'CSE').length} CSE students.`);
    trie.current.insert('hello', 'Hello! How can I help you with placement data?');
    
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    // 1. Try DSA Trie Match
    const trieResponse = trie.current.search(userMsg.trim());

    if (trieResponse) {
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'bot', text: trieResponse }]);
        setIsTyping(false);
      }, 500); // Simulate network delay
    } else {
      // 2. Fallback to Gemini AI
      if (process.env.API_KEY) {
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            // Provide context to the model
            const context = `
            Context: You are a Placement Bot for a college.
            Data: 
            - Students: ${JSON.stringify(STUDENTS.map(s => ({name: s.name, branch: s.branch, placed: s.placed})))}
            - Companies: ${JSON.stringify(COMPANIES.map(c => c.name))}
            User Question: ${userMsg}
            Keep answer short.
            `;
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: context
            });
            
            setMessages(prev => [...prev, { sender: 'bot', text: response.text || "I couldn't process that." }]);
        } catch (error) {
            setMessages(prev => [...prev, { sender: 'bot', text: "I'm having trouble connecting to AI. Try 'highest package' or 'cse students'." }]);
        }
      } else {
        setMessages(prev => [...prev, { sender: 'bot', text: "I don't know that yet. Try asking 'highest package' or 'top recruiter'." }]);
      }
      setIsTyping(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 bg-indigo-600 text-white rounded-full shadow-xl hover:bg-indigo-700 transition ${isOpen ? 'hidden' : 'block'}`}
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden">
          <div className="bg-indigo-600 p-4 flex justify-between items-center text-white">
            <h3 className="font-bold flex items-center"><Bot className="w-5 h-5 mr-2"/> PlacementBot</h3>
            <button onClick={() => setIsOpen(false)}><X className="w-5 h-5" /></button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-2 rounded-lg text-sm ${m.sender === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && <div className="text-xs text-gray-400 ml-2">Bot is typing...</div>}
            <div ref={chatEndRef} />
          </div>

          <div className="p-3 border-t bg-white flex items-center">
            <input 
              className="flex-1 p-2 border border-gray-600 bg-slate-800 text-white rounded-md text-sm outline-none focus:border-indigo-500 placeholder-gray-400"
              placeholder="Ask query..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend} className="ml-2 p-2 text-indigo-600 hover:bg-indigo-50 rounded-full">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;