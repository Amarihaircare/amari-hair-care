"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Send, Paperclip, Smile, MoreHorizontal, Activity, ShoppingBag, CreditCard, Headphones, ChevronRight } from "lucide-react";

declare global {
  interface Window {
    $zoho?: any;
  }
}

export default function ChatWidget() {
  const [inputValue, setInputValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleOpenChat = () => {
     if (window.$zoho?.salesiq?.floatwindow?.visible) {
         window.$zoho.salesiq.floatwindow.visible("show");
     }
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    
    if (!inputValue.trim()) return;

    if (window.$zoho?.salesiq) {
      if (window.$zoho.salesiq.visitor?.question) {
        window.$zoho.salesiq.visitor.question(inputValue);
      }
      window.$zoho.salesiq.floatwindow.visible("show");
      setInputValue("");
    }
  };

  const handleOptionClick = (e: React.MouseEvent, message: string) => {
    e.preventDefault();
    e.stopPropagation();
    setInputValue(message);

    if (window.$zoho?.salesiq) {
      if (window.$zoho.salesiq.visitor?.question) {
        window.$zoho.salesiq.visitor.question(message);
      }
      if (window.$zoho.salesiq.floatwindow?.visible) {
        window.$zoho.salesiq.floatwindow.visible("show");
      }
    }
  };

  return (
    <div className="w-full max-w-[720px] rounded-xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden border border-gray-100 font-sans cursor-pointer hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)] transition-shadow duration-300" onClick={handleOpenChat}>
       {/* Header */}
       <div className="bg-[#fdfdfd] p-5 flex items-center justify-between border-b border-gray-100">
          <Image src="/logo.png" width={80} height={30} alt="Amari" className="object-contain" />
          <span className="text-[10px] font-bold text-green-800 bg-green-100 px-3 py-1 rounded-full">We&apos;re online</span>
       </div>

       {/* Body */}
       <div className="p-6 bg-[#f8f9fa]">
          <h3 className="text-xl font-bold text-gray-900 mb-1">Hi 👋 I&apos;m Amari.</h3>
          <p className="text-gray-600 mb-6 text-sm">What can I help you with today?</p>

          <div className="flex flex-col gap-3">
             <ChatOption 
                icon={<Activity size={18} />} 
                text="Scalp diagnosis" 
                onClick={(e) => handleOptionClick(e, "Hello Amari, I need  help with")}
             />
             <ChatOption 
                icon={<ShoppingBag size={18} />} 
                text="Product recommendations" 
                onClick={(e) => handleOptionClick(e, "Hello Amari, I need  help with")}
             />
             <ChatOption 
                icon={<CreditCard size={18} />} 
                text="Order support" 
                onClick={(e) => handleOptionClick(e, "Hello Amari, I need  help with")}
             />
             <ChatOption 
                icon={<Headphones size={18} />} 
                text="Talk to a specialist" 
                onClick={(e) => handleOptionClick(e, "Hello Amari, I need  help with")}
             />
          </div>
       </div>

       {/* Footer */}
       <div className="p-4 bg-white border-t border-gray-100" onClick={(e) => e.stopPropagation()}>
          <form className="relative" onSubmit={handleSendMessage}>
             <input
               ref={inputRef}
               type="text"
               value={inputValue}
               onChange={(e) => setInputValue(e.target.value)}
               placeholder="Type a message..."
               className="w-full pl-4 pr-12 py-3 bg-gray-50 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-green-600 cursor-text"
             />
             <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#284721] p-2 rounded-full text-white">
                <Send size={14} />
             </button>
          </form>
          <div className="flex justify-between items-center mt-3 px-2">
             <p className="text-[10px] text-gray-400">Via Zoho SalesIQ</p>
             <div className="flex gap-3 text-gray-400">
                <Paperclip size={16} />
                <Smile size={16} />
                <MoreHorizontal size={16} />
             </div>
          </div>
       </div>
    </div>
  );
}

function ChatOption({ icon, text, onClick }: { icon: React.ReactNode; text: string; onClick?: (e: React.MouseEvent) => void }) {
  return (
    <button 
        onClick={onClick}
        className="flex items-center gap-3 w-full p-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 text-left group"
    >
       <span className="text-green-700 bg-green-50 p-2 rounded-full group-hover:bg-green-100 transition-colors">
          {icon}
       </span>
       <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{text}</span>
       <span className="ml-auto text-gray-400 group-hover:text-gray-600">
          <ChevronRight size={16} />
       </span>
    </button>
  );
}
