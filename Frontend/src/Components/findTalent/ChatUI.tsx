import React, { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

interface ChatRoom {
  roomId: string;
  user1Id: string;
  user2Id: string;
}

interface Message {
  content: string;
  sender: string;
  roomId: string;
  timeStamp: string;
}

const chatUI:React.FC=() => {
  const currUser=useSelector((state:any)=>state.user);
  const { name } = useParams<{ name: string }>(); 
  const [roomChecked, setRoomChecked] = useState(false);
  const [user, setUser] = useState<string>(currUser.name);
  const [otherUser, setOtherUser] = useState<string>(name ?? '');
  const [currentRoom, setCurrentRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const stompClient = useRef<any>(null);
  const isSubscribed = useRef(false);
  const bottomRef = useRef<HTMLDivElement>(null);

 

useEffect(() => {
  if (user && otherUser && !roomChecked) {  // Ensures function runs only once
    setRoomChecked(true); // Set flag to prevent multiple calls
    checkOrCreateRoom();
    const socket = new SockJS("http://localhost:8080/ws");
    stompClient.current = over(socket);
    stompClient.current.connect({}, onConnected, onError);
    
  }
  fetchUserChatRooms();
}, [user, otherUser]); 

useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);


  const fetchUserChatRooms = async () => {
    try {
      const response = await axios.get<ChatRoom[]>(
        `http://localhost:8080/api/chat/chats/${user}`
      );
      setChatRooms(response.data);
    } catch (error) {
      console.error("Error fetching chat rooms:", error);
    }
  };

  const checkOrCreateRoom = async () => {
    const roomId1 = `${user.replace(/\s+/g, "_").toLowerCase()}_${otherUser.replace(/\s+/g, "_").toLowerCase()}`;
    const roomId2 = `${otherUser.replace(/\s+/g, "_").toLowerCase()}_${user.replace(/\s+/g, "_").toLowerCase()}`;
  
    try {
      const [response1, response2] = await Promise.all([
        axios.get<Message[]>(`http://localhost:8080/api/chat/messages/${roomId1}`).catch(() => null),
        axios.get<Message[]>(`http://localhost:8080/api/chat/messages/${roomId2}`).catch(() => null),
      ]);
  
      if (response1&&response1?.data?.length > 0) {
        setCurrentRoom({ roomId: roomId1, user1Id: user, user2Id: otherUser });
        setMessages(response1.data);
        return;
      }
  
      if (response2&&response2 ?.data?.length > 0) {
        setCurrentRoom({ roomId: roomId2, user1Id: user, user2Id: otherUser });
        setMessages(response2.data);
        return;
      }
  
      const chatRoomsResponse = await axios.get<ChatRoom[]>(`http://localhost:8080/api/chat/chats/${user}`);
      const existingRoom = chatRoomsResponse.data.find(
        (room) => room.roomId === roomId1 || room.roomId === roomId2
      );
  
      if (!existingRoom) {
        console.log("Creating Room:", { roomId: roomId1, user1Id: user, user2Id: otherUser });
  
        await axios.post("http://localhost:8080/room/createRoom", {
          roomId: roomId1,
          user1Id: user,
          user2Id: otherUser,
        });
  
        setCurrentRoom({ roomId: roomId1, user1Id: user, user2Id: otherUser });
      }
    } catch (error) {
      console.error("Error fetching/creating room:", error);
    }
  };
  
  
  
  const onConnected = () => {
    if (currentRoom && stompClient.current && !isSubscribed.current) {
      const topic = `/topic/chat/${currentRoom.roomId}`;
      stompClient.current.subscribe(topic, onMessageReceived);
      isSubscribed.current = true;
    }
  };
  
  

  const onError = (err: any) => {
    console.error("WebSocket Error:", err);
  };

  const onMessageReceived = (message: any) => {
    const receivedMessage: Message = JSON.parse(message.body);
    if (currentRoom ) {
      setMessages((prev) => [...prev, receivedMessage]);
    }
  };

  const sendMessage = async () => {
    if (stompClient.current && currentRoom && newMessage.trim() !== "") {
      const messageObj: Message = {
        content: newMessage,
        sender: user,
        roomId: currentRoom.roomId,
        timeStamp: new Date().toISOString(),
      };

      stompClient.current.send(
        `/app/chat/${currentRoom.roomId}`,
        {},
        JSON.stringify(messageObj)
      );
      await axios.post(
        `http://localhost:8080/api/chat/send/${currentRoom.roomId}`,
        {
          senderId: user,
          receiverId: otherUser,
          content: newMessage,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setNewMessage("");
    }
  };

  const loadChatRoom = async (selectedRoom: ChatRoom) => {
    setCurrentRoom(selectedRoom);
    setOtherUser(
      selectedRoom.user1Id === user ? selectedRoom.user2Id : selectedRoom.user1Id
    );
    try {
      const response = await axios.get<Message[]>(
        `http://localhost:8080/api/chat/messages/${selectedRoom.roomId}`
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Error loading chat messages:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
     
      <div className="w-80 bg-gradient-to-b from-indigo-600 to-indigo-700 text-white p-4 flex flex-col">
        <div className="flex items-center mb-8">
          <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <h2 className="text-xl font-bold">Messages</h2>
        </div>
        
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search chats..."
            className="w-full bg-indigo-500/30 text-white placeholder-indigo-200 rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <svg className="w-5 h-5 absolute left-3 top-2.5 text-indigo-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-indigo-700">
          {chatRooms.length > 0 ? (
            chatRooms.map((room, index) => (
              <div
                key={index}
                className={`flex items-center p-3 rounded-lg mb-2 cursor-pointer transition-all ${
                  currentRoom?.roomId === room.roomId 
                    ? "bg-white/20 backdrop-blur-sm" 
                    : "hover:bg-white/10"
                }`}
                onClick={() => loadChatRoom(room)}
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-indigo-300 flex items-center justify-center text-indigo-700 font-semibold">
                    {(room.user1Id === user ? room.user2Id : room.user1Id).charAt(0).toUpperCase()}
                  </div>
                  {index < 2 && ( // Example online indicator for first 2 chats
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-indigo-700"></div>
                  )}
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="font-medium truncate">{room.user1Id === user ? room.user2Id : room.user1Id}</h3>
                  <p className="text-xs text-indigo-200 truncate">
                    { "Start a new conversation"}
                  </p>
                </div>
                
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <svg className="w-12 h-12 mx-auto text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p className="mt-2 text-indigo-200">No conversations yet</p>
              <button className="mt-4 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                Start New Chat
              </button>
            </div>
          )}
        </div>
        
        <div className="mt-auto pt-4 border-t border-indigo-500/30">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-indigo-300 flex items-center justify-center text-indigo-700 font-semibold">
              {user.charAt(0).toUpperCase()}
            </div>
            <div className="ml-3">
              <p className="font-medium">{user}</p>
              <p className="text-xs text-indigo-200">Online</p>
            </div>
          </div>
        </div>
      </div>
  
      {/* Main Chat Area - Clean and spacious */}
      {currentRoom ? (
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          <div className="bg-white border-b p-4 flex items-center">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
                {otherUser.charAt(0).toUpperCase()}
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div className="ml-3">
              <h2 className="font-bold text-gray-800">{otherUser}</h2>
              <p className="text-xs text-gray-500">Active now</p>
            </div>
            <div className="ml-auto flex space-x-2">
              <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Messages area */}
          <div className="flex-1 p-4 overflow-y-auto bg-mine-shaft-800">
            <div className="max-w-3xl mx-auto space-y-4">
              {messages.length > 0 ? (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.sender === user ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        msg.sender === user
                          ? "bg-indigo-600 text-white rounded-tr-none"
                          : "bg-white text-gray-800 rounded-tl-none shadow-sm"
                      }`}
                    >
                      <p>{msg.content}</p>
                      <div className={`text-xs mt-1 flex justify-end ${
                        msg.sender === user ? "text-indigo-200" : "text-gray-500"
                      }`}>
                        {new Date(msg.timeStamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        {msg.sender === user && (
                          <svg className="w-3 h-3 ml-1 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                   
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-500">No messages yet</h3>
                  <p className="mt-1 text-sm text-gray-400">Send your first message to start the conversation</p>
                </div>
              )}
            </div>
            
          </div>
          
          {/* Message input */}
          <div className="bg-white border-t p-4">
            <div className="max-w-3xl mx-auto flex items-center">
              <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 mr-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 border rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Type your message..."
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className="ml-2 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 disabled:bg-indigo-300 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
         
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
          <div className="text-center max-w-md p-6">
            <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-500">No chat selected</h3>
            <p className="mt-1 text-sm text-gray-400">Choose a conversation from the sidebar or start a new one</p>
            <button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
              New Message
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default chatUI;


