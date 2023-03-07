import { Avatar, FormControl, Grid, GridItem, Input, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { ChatState } from '../context/ChatProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage } from '@fortawesome/free-solid-svg-icons'

function SearchBar() {
    // const { user } = ChatState();
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const [search, setSearch] = useState("");
    const history = useHistory();
    const searchHandler = (event) => {
        if (event.key === "Enter" && search) {
            history.push({
                pathname: "/products",
                state: { search: search },
            });
        }
    }
    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        history.push("/");
        // window.location.reload();
        window.location.href = "/";
    }

    return (
        <div>
            <Grid
                p="2"
                gap={2}
                templateColumns='repeat(12, 1fr)'
                textAlign="center"
                alignItems="center"
            >
                <GridItem
                    colSpan={{ base: 12, md: 3 }}
                >
                    <Text textAlign="center" color="#008ECC" fontSize="30px" >
                        <b> <Link to="/profile" >BounSe</Link> </b>
                    </Text>
                </GridItem>

                <GridItem colSpan={{ base: 8, md: 7 }} >
                    <FormControl>
                        <Input backgroundColor="#F3F9FB" width="80%" onKeyDown={searchHandler} placeholder='Search...' type="text" onChange={(e) => { setSearch(e.target.value) }} />
                    </FormControl>
                </GridItem>

                <GridItem colSpan={{ base: 2, md: 1 }} >
                    <Link
                        to={{
                            pathname: "/chats",
                            state: {  // location state
                                currentUser: localStorage.getItem("userInfo"),
                            },
                        }}
                    >
                        <FontAwesomeIcon color="#008ECC" fontSize="24px" icon={faMessage} />
                    </Link>
                </GridItem>

                <GridItem colSpan={{ base: 2, md: 1 }} >
                    <Menu>
                        <MenuButton>
                            <Avatar size="sm" cursor="pointer" name={user.name} src={user.pic} />
                        </MenuButton>
                        <MenuList>
                            <Link to="/profile" >
                                <MenuItem>
                                    My Profie
                                </MenuItem>
                            </Link>
                            <MenuItem onClick={logoutHandler} >LogOut</MenuItem>
                        </MenuList>
                    </Menu>
                </GridItem>
            </Grid>
        </div>
    )
}

export default SearchBar