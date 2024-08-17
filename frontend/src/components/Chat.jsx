import React from "react";
import { GrAttachment } from "react-icons/gr";
import { VscSend } from "react-icons/vsc";
import { formatAMPM } from "../utils/helper.js";

const messages = [
  { content: "Hello", sender: "client", updatedAt: "2021-09-01T12:00:00" },
  { content: "Hi", sender: "server", updatedAt: "2021-09-01T12:01:00" },
  {
    content: "How are you?",
    sender: "client",
    updatedAt: "2021-09-01T12:02:00",
  },
  {
    content: "I'm good, thank you",
    sender: "server",
    updatedAt: "2021-09-01T12:03:00",
  },
  {
    content: "How can I help you?",
    sender: "server",
    updatedAt: "2021-09-01T12:04:00",
  },
  {
    content: "I need help with my order",
    sender: "client",
    updatedAt: "2021-09-01T12:05:00",
  },
  {
    content: "Sure, I can help you with that",
    sender: "server",
    updatedAt: "2021-09-01T12:06:00",
  },
  { content: "Thank you", sender: "client", updatedAt: "2021-09-01T12:07:00" },
  {
    content: "You're welcome",
    sender: "server",
    updatedAt: "2021-09-01T12:08:00",
  },
];

const Chat = () => {
  return (
    <div className="flex justify-between flex-col">
      <div className="flex justify-start items-start p-3 gap-3 border-b">
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div>
          <div className="font-bold">Kristian</div>
          <div className="text-gray-400">Typing...</div>
        </div>
      </div>

      <div className="border-t overflow-y-auto h-[600px] p-1">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`m-2 ${
              message.sender === "client" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block px-3 py-2 rounded-lg ${
                message.sender === "client"
                  ? "bg-[#9296DB] text-white"
                  : "bg-gray-200 text-[#9296DB]"
              }`}
            >
              <div className="text-base">{message.content}</div>
              {/* <div className="italic text-xs text-black">
                {formatAMPM(new Date(message.updatedAt))}
              </div> */}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center p-3">
        <input
          type="text"
          placeholder="Type your message here"
          className="w-full p-3 rounded-xl"
        />
        <div className="flex justify-between items-center p-3 text-xl gap-3">
          <GrAttachment />
          <VscSend />
        </div>
      </div>
    </div>
  );
};

export default Chat;
