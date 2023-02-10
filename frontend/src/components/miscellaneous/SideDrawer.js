import React, { useState } from 'react'
import { Box, Menu, MenuButton, ToolTip, useQuery, Text, MenuList, MenuItem, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, Button, DrawerBody, Input, useToast, Spinner} from "@chakra-ui/react"
import { Avatar } from "@chakra-ui/avatar"
import { ChatState } from '../../context/ChatProvider';
import ProfileModal from './ProfileModal';
import { useHistory } from 'react-router-dom'
import { useDisclosure } from '@chakra-ui/hooks';
import axios from 'axios';
import ChatLoading from '../ChatLoading';
import UserListItem from '../UserAvatar/UserListItem';


const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setsearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const { user, setSelectedChat, chats, setChats } = ChatState();
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  }

  const toast = useToast();

  const handleSearch = async () => {
    if(!search){
      toast({
        title: "Please enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    try {
      setLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const {data} = await axios.get(`/api/product?search=${search}`, config);
      setLoading(false);
      setsearchResult(data);

    } catch (error) {
      toast({
        title: "Error Ocured",
        description: "Failed to load search results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
  }

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <div>
      <Box>
        <Button variant="ghost" onClick={onOpen} >
          <Text d={{ base: "none", md: "flex" }} px="4" >
            Search Product
          </Text>
        </Button>

        <Menu>
          <MenuButton>
            <Avatar size="sm" cursor="pointer" name={user.name} src={user.pic} />
          </MenuButton>
          <MenuList>
            <ProfileModal user={user}>
              <MenuItem>My Profie</MenuItem>
            </ProfileModal>
            <MenuItem onClick={logoutHandler} >LogOut</MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Drawer placement='left' onClose={onClose} isOpen={isOpen} >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search products</DrawerHeader>
          <DrawerBody>
            <Box d="flex" pb={2} >
              <Input
                placeholder='Search by name or description'
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
              onClick={handleSearch}
              >
                Go
              </Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((product) => (
                <UserListItem
                  key={product._id}
                  user={product}
                  handleFunction={() => accessChat(product.owner)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" /> }
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default SideDrawer