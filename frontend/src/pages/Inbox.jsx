import React, { useState } from "react";
import Chat from "../components/Chat";
import Chats from "../components/Chats";

const Inbox = () => {
  const [chat, setChat] = useState(null);

  return (
    <div className="pt-1 md:flex justify-start border-t">
      <div className="md:w-1/3 text-left">
        <Chats setChat={setChat} />
      </div>
      <div className="md:w-2/3 border-l">
        <Chat chat={chat} />
      </div>
    </div>
  );
};

export default Inbox;
