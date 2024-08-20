import React, { useEffect, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { VscSend } from "react-icons/vsc";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { ChatState } from "../ChatProvider";

import io from "socket.io-client";
const ENDPOINT = import.meta.env.VITE_TEMPLATE_BACKEND_URL;
var socket, selectedChatCompare;

const SingleChat = () => {
  const { selectedChat, setSelectedChat, user, notification, setNotification } =
    ChatState();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);

  const sendMessage = async (e) => {
    if (newMessage) {
      socket.emit("stop typing", selectedChat.id);
      try {
        const { data } = await axios.post("api/v1/messages", {
          senderId: user?.id,
          content: newMessage,
          chatId: selectedChat.id,
        });

        setNewMessage("");

        socket.emit("new message", data);

        fetchMessages();
      } catch (error) {
        toast.error("failed to send message");
      }
    }
  };

  const fetchMessages = async () => {
    try {
      if (!selectedChat) return;
      const { data } = await axios.get(`/api/v1/messages/${selectedChat?.id}`);
      setMessages(data);

      socket.emit("join chat", selectedChat.id);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare.id !== newMessageRecieved.chatId
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat.id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat.id);
        setTyping(false);
      }
    }, timerLength);
  };

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
            {selectedChat?.otherUser
              ? selectedChat?.otherUser?.username
              : "Kristian"}
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
          value={newMessage}
          onChange={typingHandler}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <div className="flex justify-between items-center p-3 text-xl gap-3">
          <GrAttachment />
          <VscSend onClick={sendMessage} />
        </div>
      </div>
    </div>
  );
};

export default SingleChat;
