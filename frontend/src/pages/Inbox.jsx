import React from "react";
import SingleChat from "../components/SingleChat";
import MyChats from "../components/MyChats";
import { ChatState } from "../ChatProvider";

const Inbox = () => {
  const { selectedChat } = ChatState();

  return (
    <div className="pt-1 md:flex justify-start border-t">
      <div className="md:w-1/3 text-left">
        <MyChats />
      </div>
      <div className="md:w-2/3 border-l">
        {selectedChat ? <SingleChat /> : <div className="my-3">Select a chat</div>}
      </div>
    </div>
  );
};

export default Inbox;
