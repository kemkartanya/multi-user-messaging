import React, { useEffect, useState } from "react";
import Chat from "../components/Chat";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const chats = [
  {
    name: "Naina",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta autem magnam animi repellat tenetur.",
    time: "11 days",
  },
  {
    name: "Naina",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta autem magnam animi repellat tenetur.",
    time: "11 days",
  },
  {
    name: "Naina",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta autem magnam animi repellat tenetur.",
    time: "11 days",
  },
  {
    name: "Naina",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta autem magnam animi repellat tenetur.",
    time: "11 days",
  },
  {
    name: "Naina",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta autem magnam animi repellat tenetur.",
    time: "11 days",
  },
  {
    name: "Naina",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta autem magnam animi repellat tenetur.",
    time: "11 days",
  },
  {
    name: "Naina",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta autem magnam animi repellat tenetur.",
    time: "11 days",
  },
  {
    name: "Naina",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta autem magnam animi repellat tenetur.",
    time: "11 days",
  },
  {
    name: "Naina",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta autem magnam animi repellat tenetur.",
    time: "11 days",
  },
];

const Inbox = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [loadingChat, setLoadingChat] = useState(false);

  const handleSearch = async () => {
    if (!search) {
      toast.error("Please Enter something in search");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.get(`/api/v1/users?search=${search}`);
      setSearchResult(data);
    } catch (error) {
      toast.error("Failed to Load the Search Results");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-1 flex justify-start border-t">
      <div className="w-1/3 text-left">
        <input
          type="text"
          placeholder="Search"
          className="border-2 border-gray-300 rounded-lg p-2 w-inherit m-3 w-80"
        />
        <Toaster />

        <div className="flex pb-2">
          <input
            type="text"
            placeholder="Search by name or email"
            className="mr-2 input input-bordered w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="btn btn-primary" onClick={handleSearch}>
            Go
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        ) : (
          searchResult?.map((user) => (
            // <UserListItem
            //   key={user._id}
            //   user={user}
            //   handleFunction={() => accessChat(user._id)}
            // />
            <div className="m-2">
              <div>{user?.username}</div>
            </div>
          ))
        )}
        {loadingChat && (
          <span className="loading loading-spinner loading-md"></span>
        )}

        <div className="flex gap-1 border-t p-2 border-b">
          <div className="btn btn-sm">All</div>
          <div className="btn btn-sm">Unread</div>
          <div className="btn btn-sm">Archived</div>
          <div className="btn btn-sm">Blocked</div>
        </div>
        <div className="overflow-y-auto h-[600px]">
          {chats.map((chat, index) => (
            <div
              key={index}
              className="flex justify-center items-start p-3 gap-3 border-b"
            >
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
              <div>
                <div className="text-gray-500">
                  <span className="font-bold text-black">{chat?.name}</span> ·{" "}
                  {chat?.time}
                </div>
                <div>
                  <span className="text-gray-500 mr-1">Parik:</span>
                  {chat?.message}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-2/3 border-l">
        <Chat />
      </div>
    </div>
  );
};

export default Inbox;
