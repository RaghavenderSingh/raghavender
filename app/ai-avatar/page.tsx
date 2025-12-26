'use client';

import HeyGenAvatar from '@/components/HeyGenAvatar';
import { useState, useRef, useEffect } from 'react';


interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIAvatarPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm an AI avatar representing [YOUR NAME]. Feel free to ask me anything about their background, skills, projects, or experience!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [streamUrl, setStreamUrl] = useState<string>('');
  const [sessionId, setSessionId] = useState<string>('');
  const [selectedAvatar, setSelectedAvatar] = useState('Angela-inblackskirt-20220820');
  const [selectedVoice, setSelectedVoice] = useState('en-US-JennyNeural');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Step 1: Get AI response from Gemini
      const geminiResponse = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          history: messages.slice(1),
        }),
      });

      const geminiData = await geminiResponse.json();

      if (geminiData.success) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: geminiData.response,
        };
        setMessages((prev) => [...prev, assistantMessage]);
        
        // Step 2: Generate HeyGen avatar video
        setIsSpeaking(true);
        const heygenResponse = await fetch('/api/heygen', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: geminiData.response,
            avatarId: selectedAvatar,
            voiceId: selectedVoice,
          }),
        });

        const heygenData = await heygenResponse.json();

        if (heygenData.success) {
          setStreamUrl(heygenData.streamUrl);
          setSessionId(heygenData.sessionId);
          
          // Auto-stop speaking after estimated duration
          const estimatedDuration = geminiData.response.length * 100; // rough estimate
          setTimeout(() => {
            setIsSpeaking(false);
          }, estimatedDuration);
        } else {
          console.error('HeyGen Error:', heygenData.error);
          setIsSpeaking(false);
        }
      } else {
        throw new Error(geminiData.error);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
      setIsSpeaking(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Popular HeyGen avatars
  const avatarOptions = [
    { id: 'Angela-inblackskirt-20220820', name: 'Angela (Professional)' },
    { id: 'josh_lite3_20230714', name: 'Josh (Casual)' },
    { id: 'Anna_public_3_20240108', name: 'Anna (Business)' },
    { id: 'Susan_public_2_20240328', name: 'Susan (Friendly)' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl h-[90vh] bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden flex">
        
        {/* Avatar Section */}
        <div className="w-2/5 bg-gradient-to-b from-purple-500/20 to-blue-500/20 flex flex-col border-r border-white/10">
          
          {/* Avatar Display */}
          <div className="flex-1">
            <HeyGenAvatar
              sessionId={sessionId}
              streamUrl={streamUrl}
              isSpeaking={isSpeaking}
            />
          </div>

          {/* Avatar Controls */}
          <div className="p-6 space-y-4 bg-gradient-to-t from-black/20 to-transparent">
            <div className="text-center">
              <h2 className="text-xl font-bold text-white mb-1">HeyGen AI Avatar</h2>
              <p className="text-purple-200 text-xs">Photorealistic talking avatar</p>
            </div>

            {/* Status */}
            <div className="flex justify-center gap-2 items-center">
              <div className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
              <span className="text-xs text-white/70">
                {isLoading ? 'Generating...' : isSpeaking ? 'Speaking...' : 'Ready'}
              </span>
            </div>

            {/* Avatar Selection */}
            <div className="space-y-2">
              <label className="text-xs text-white/70 font-medium">Select Avatar:</label>
              <select
                value={selectedAvatar}
                onChange={(e) => setSelectedAvatar(e.target.value)}
                disabled={isLoading || isSpeaking}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
              >
                {avatarOptions.map((avatar) => (
                  <option key={avatar.id} value={avatar.id} className="bg-slate-900">
                    {avatar.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Info Link */}
            <a
              href="https://www.heygen.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center px-3 py-2 rounded-lg text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/50 hover:bg-blue-500/30 transition-all"
            >
              🎬 Learn More About HeyGen
            </a>
          </div>
        </div>

        {/* Chat Section */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-white/5 backdrop-blur-sm px-6 py-4 border-b border-white/10">
            <h1 className="text-2xl font-bold text-white">Chat with My AI Avatar</h1>
            <p className="text-purple-200 text-sm mt-1">Ask me anything - I'll respond with voice and video!</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                      : 'bg-white/10 text-white border border-white/20'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/10 rounded-2xl px-5 py-3 border border-white/20">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="bg-white/5 backdrop-blur-sm px-6 py-4 border-t border-white/10">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading || isSpeaking}
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim() || isSpeaking}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/50"
              >
                {isLoading ? 'Sending...' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
