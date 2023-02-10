import { Box, Flex } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SearchBar from "../components/SearchBar";
import { ChatState } from "../context/ChatProvider";

const Chatpage = () => {
  
  const [fetchAgain, setFetchAgain] = useState(false);
  // const user = JSON.parse(localStorage.getItem("userInfo"));
  const location = useLocation();
  const user = location.state.currentUser;
  const { selectedChat, setSelectedChat, chats, setChats } = ChatState();

  return (
    
    <div style={{ width: "100%" }}>
      {user && <SearchBar />}
      <Flex>
        <Box
          display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
          // display="flex" 
          justifyContent="space-between"
          // width="30%" 
          width={{ base: selectedChat ? "none" : "100%", md: "30%" }} 
          height="89vh" 
          p="10px"
        >
          {user && <MyChats fetchAgain={fetchAgain} />}
        </Box>
        <Box 
        display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
        // display="flex" 
        justifyContent="space-between" 
        // width="80%"
        width={{ base: selectedChat ? "100%" : "none", md: "70%" }} 
        height="89vh" 
        p="10px">
          {user && (
            <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
        </Box>
      </Flex>
    </div>
  );
};

export default Chatpage;