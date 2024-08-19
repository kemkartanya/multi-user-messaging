import React, { useEffect, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { VscSend } from "react-icons/vsc";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Chat = ({ chat }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const sendMessage = async () => {
    try {
      const { data } = await axios.post("api/v1/messages", {
        senderId: user?.id,
        content: message,
        chatId: chat.id,
      });

      setMessage("");
      getChatMessages();
    } catch (error) {
      toast.error("failed to send message");
    }
  };

  const getChatMessages = async () => {
    try {
      if (!chat) return;
      const { data } = await axios.get(`/api/v1/messages/${chat?.id}`);
      setMessages(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getChatMessages();
  }, [chat]);

  return (
    <div className="flex justify-between flex-col">
      <Toaster />
      <div className="flex justify-start items-start p-3 gap-3 border-b">
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div>
          <div className="font-bold">
            {chat?.otherUser ? chat?.otherUser?.username : "Kristian"}
          </div>
          <div className="text-gray-400">Typing...</div>
        </div>
      </div>

      <div className="border-t overflow-y-auto h-[600px] p-1">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`m-2 ${
              message.senderId === user?.id ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block px-3 py-2 rounded-lg ${
                message.senderId === user?.id
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
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex justify-between items-center p-3 text-xl gap-3">
          <GrAttachment />
          <VscSend onClick={sendMessage} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
