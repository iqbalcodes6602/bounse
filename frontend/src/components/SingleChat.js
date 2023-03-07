import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import ProfileModal from './miscellaneous/ProfileModal';
import { getSender, getSenderFull } from '../config/ChatLogics';
import { ChatState } from '../context/ChatProvider'
import "./style.css"
import axios from 'axios';
import ScrollableChat from './ScrollableChat';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SingleChat({ fetchAgain, setFetchAgain }) {

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const toast = useToast();

  const user = JSON.parse(localStorage.getItem("userInfo"));

  const { selectedChat, setSelectedChat } = ChatState();

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);

    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };



  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  }

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              bg="#f3f9fb"
              d={{ base: "flex", md: "none" }}
              icon={ <FontAwesomeIcon color="#008ECC" icon={faArrowLeft} /> }
              onClick={() => setSelectedChat("")}
            />
            {
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal
                  user={getSenderFull(user, selectedChat.users)}
                />
              </>
            }
          </Text>
          <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#f6f6f6"
            width="100%"
            heigh="100%"
            border="1px solid #f5f5f5"
            // overflowY="hidden"
            overflowY="scroll"
          >
            {loading ? (
              <Spinner
                size="xl"
                alignSelf="center"
                marginLeft="50%"
              />
            ) : (
              <div
                className='messages' >
                <ScrollableChat messages={messages} />
              </div>
            )}
          </Box>
          <FormControl onKeyDown={sendMessage} isRequired mt={3} >
            <Input
              _focus={{ backgroundColor: "#f3f9fb" }}
              _hover={{ backgroundColor: "#f3f9fb" }}
              backgroundColor="#f3f9fb"
              border="1px solid #464655"
              boxShadow="inset 0px 4px 4px rgba(0, 0, 0, 0.1)"
              borderRadius="3px"
              variant="filled"
              bg="e0e0e0"
              placeholder='Enter a message'
              onChange={typingHandler}
              value={newMessage}
            />
          </FormControl>
        </>
      ) :
        (
          <Box display="flex" color="#c0c0c0" alignItems="center" justifyContent="center" h="100%">
            Click on a user to start chatting
          </Box>
        )
      }
    </>
  )
}

export default SingleChat