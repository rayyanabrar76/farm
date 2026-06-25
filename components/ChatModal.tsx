"use client";
import { useState, useRef, useEffect } from "react";
import { X, Send, Phone, Video, MoreHorizontal, CheckCheck } from "lucide-react";

interface Message {
  id: number;
  from: "farmer" | "buyer";
  text: string;
  time: string;
  read: boolean;
}

interface Props {
  open: boolean;
  onClose: () => void;
  farmerName: string;
  farmerInitial: string;
  produceName: string;
}

const INITIAL_MESSAGES: Message[] = [
  { id: 1, from: "farmer", text: "Hello! Thanks for your interest in my produce. How can I help you?", time: "10:32 AM", read: true },
  { id: 2, from: "buyer",  text: "Hi, I'm interested in ordering 200kg of your tomatoes. Are they available this week?", time: "10:33 AM", read: true },
  { id: 3, from: "farmer", text: "Yes, absolutely! I have over 1,200kg ready for dispatch. We can arrange delivery within 48 hours of your order.", time: "10:35 AM", read: true },
  { id: 4, from: "buyer",  text: "Great! What's the minimum order, and do you offer a discount for bulk orders above 500kg?", time: "10:36 AM", read: true },
  { id: 5, from: "farmer", text: "Minimum is 50kg. For orders above 500kg, I can offer ₦360/kg instead of ₦380/kg. Payment is secured through the platform.", time: "10:38 AM", read: true },
];

let msgCounter = 100;

export default function ChatModal({ open, onClose, farmerName, farmerInitial, produceName }: Props) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [open, messages]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMsg: Message = { id: ++msgCounter, from: "buyer", text, time: now, read: false };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    // Simulated farmer reply
    setTimeout(() => {
      const replies = [
        "Thank you for your message! I'll get back to you shortly.",
        "Sure, let me check availability and confirm.",
        "Good question! Let me provide more details.",
        "I can arrange that. Shall we proceed with the order?",
        "Yes, the produce is fresh and ready. Quality guaranteed.",
      ];
      const reply: Message = {
        id: ++msgCounter,
        from: "farmer",
        text: replies[Math.floor(Math.random() * replies.length)],
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        read: false,
      };
      setMessages((prev) => [...prev, reply]);
    }, 1200);
  };

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div onClick={onClose} className="fixed inset-0 bg-black/50 z-200" />

      {/* Panel */}
      <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 w-full sm:w-95 bg-white z-201 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-slide-up" style={{ height: "min(600px, 90dvh)" }}>
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-100" style={{ background: "linear-gradient(135deg, #2D7A3A, #3DAF50)" }}>
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm shrink-0">
            {farmerInitial}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-sm truncate">{farmerName}</p>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-300" />
              <p className="text-white/70 text-xs">Online · Re: {produceName}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <Phone size={14} className="text-white" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <Video size={14} className="text-white" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <MoreHorizontal size={14} className="text-white" />
            </button>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors ml-1">
              <X size={14} className="text-white" />
            </button>
          </div>
        </div>

        {/* Notice */}
        <div className="bg-primary-50 px-4 py-2 text-center">
          <p className="text-[11px] text-primary-600 font-medium">All transactions are protected by escrow. Never share personal bank details.</p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.from === "buyer" ? "justify-end" : "justify-start"}`}>
              {msg.from === "farmer" && (
                <div className="w-7 h-7 rounded-full bg-primary-500 flex items-center justify-center text-white text-[10px] font-bold mr-2 shrink-0 self-end mb-1">
                  {farmerInitial}
                </div>
              )}
              <div className={`max-w-[85%] sm:max-w-[75%] ${msg.from === "buyer" ? "items-end" : "items-start"} flex flex-col`}>
                <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.from === "buyer"
                    ? "bg-primary-500 text-white rounded-br-sm"
                    : "bg-gray-100 text-gray-800 rounded-bl-sm"
                }`}>
                  {msg.text}
                </div>
                <div className="flex items-center gap-1 mt-1 px-1">
                  <span className="text-[10px] text-gray-400">{msg.time}</span>
                  {msg.from === "buyer" && (
                    <CheckCheck size={12} className={msg.read ? "text-primary-400" : "text-gray-300"} />
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-100 bg-white">
          <div className="flex items-center gap-2 bg-gray-50 border-2 border-gray-200 focus-within:border-primary-400 rounded-2xl px-4 py-2.5 transition-colors">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 bg-transparent text-sm outline-none text-gray-800 placeholder-gray-400"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className="w-10 h-10 rounded-xl bg-primary-500 hover:bg-primary-600 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors shrink-0"
            >
              <Send size={13} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
