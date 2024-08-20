import React, { useState, useEffect, useRef } from "react";
import { formatDistanceToNow } from "date-fns";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { ChatState } from "../ChatProvider";

const MyChats = () => {
  const wrapperRef = useRef(null);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { setSelectedChat, chats, setChats } = ChatState();
  const user = JSON.parse(localStorage.getItem("user"));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setSearchResult(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleSearchInput = async (e) => {
    const newSearchTerm = e.target.value;
    setSearch(newSearchTerm);
    handleSearch(newSearchTerm);
  };

  const handleSearch = async (searchTerm) => {
    // if (!searchTerm) {
    //   toast.error("Please Enter something in search");
    //   return;
    // }

    try {
      const { data } = await axios.get(
        `/api/v1/users/${user?.id}?search=${searchTerm}`
      );
      setSearchResult(data);
    } catch (error) {
      toast.error("Failed to Load the Search Results");
    }
  };

  const handleAccessChat = async (user2) => {
    try {
      const { data } = await axios.post(`api/v1/chats/${user?.id}`, {
        user2: user2,
      });

      setSelectedChat(data);
    } catch (error) {
      toast.error("Failed to Load the Chat");
    } finally {
      setSearch("");
      setSearchResult(null);
    }
  };

  useEffect(() => {
    const fetchChats = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`api/v1/chats/${user?.id}`);
        setChats(data);
      } catch (error) {
        toast.error("Failed to Load the Chats");
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  return (
    <div>
      <Toaster />
      <div className="relative" ref={wrapperRef}>
        <input
          type="text"
          placeholder="Search"
          className="border-2 border-gray-300 rounded-lg p-2 md:w-[430px] w-[360px] m-3"
          value={search}
          onChange={handleSearchInput}
        />
        {searchResult && searchResult.length > 0 && (
          <ul className="absolute z-10 w-[450px] mx-3 bg-white border border-gray-300 rounded-lg shadow-lg">
            {searchResult.map((user) => (
              <li
                key={user.id}
                className="p-2 hover:bg-gray-100"
                onClick={() => handleAccessChat(user.id)}
              >
                <div>{user.username}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex gap-1 border-t p-2 border-b">
        <div className="btn btn-sm">All</div>
        <div className="btn btn-sm">Unread</div>
        <div className="btn btn-sm">Archived</div>
        <div className="btn btn-sm">Blocked</div>
      </div>

      <div className="overflow-y-auto h-[600px]">
        {chats?.map((chat, index) => (
          <div
            key={index}
            className="flex justify-start items-start p-3 gap-3 border-b cursor-pointer"
            onClick={() => setSelectedChat(chat)}
          >
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <div>
              <div className="text-gray-500">
                <span className="font-bold text-black">
                  {chat?.otherUser?.username}
                </span>{" "}
                {chat?.latestMessage?.createdAt &&
                  "· " +
                    formatDistanceToNow(
                      new Date(chat?.latestMessage?.createdAt),
                      {
                        includeSeconds: true,
                      },
                      { addSuffix: true }
                    )}
              </div>
              {chat?.latestMessage && (
                <div>
                  <span className="text-gray-500 mr-1">
                    {chat?.latestMessage?.sender?.username}:
                  </span>
                  {chat?.latestMessage?.content}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyChats;
