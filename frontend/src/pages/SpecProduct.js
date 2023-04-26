import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { ChatState } from "../context/ChatProvider";
import SearchBar from '../components/SearchBar';
import axios from 'axios';
import { Avatar, Button, Grid, GridItem, Spinner, Text } from '@chakra-ui/react';
import Carousel from 'react-elastic-carousel';


function SpecProduct() {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const { selectedChat, setSelectedChat, chats, setChats } = ChatState();
    const history = useHistory();

    const location = useLocation();
    const productId = location.state?.proId;

    const [productDetails, setProductDetails] = useState([]);

    // useEffect(() => {
    //     fetch(`http://localhost:5000/api/product/singleproduct/${productId}`)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setProductDetails(data)
    //             console.log(data)
    //         })
    // }, [])


    useEffect(() => {
        fetchAllSpecProduct();

    }, [])
    const fetchAllSpecProduct = async () => {
        const { data } = await axios.get(`/api/product/singleproduct/${productId}`);
        setProductDetails(data);
        console.log(data);
    }

    return (
        <>
            <SearchBar />
            {user ?
                null
                :
                history.push("/login")
            }
            {productDetails.owner ?
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "89vh",
                }} >
                    <Grid
                        p="2"
                        gap={2}
                        templateColumns='repeat(2, 1fr)'
                        textAlign="center"
                        alignItems="center"
                        border="1px solid #e5e5e5"
                        width="800px"
                    >
                        <GridItem display="flex" alignItems="center" p={5} height="100%" width="100%" backgroundColor="#f8f8f8" colSpan={{ base: 2, sm: 1, md: 1, lg: 1, xl: 1 }} >
                            <Carousel>
                                {productDetails.images?.map((image) => (
                                    <img style={{
                                        marginLeft: "auto", marginRight: "auto",
                                    }} width="200px" key={image} src={image} alt="img" />
                                ))
                                }
                            </Carousel>
                        </GridItem>

                        <GridItem color="#666666" textAlign="left" height="100%" width="100%" colSpan={{ base: 2, sm: 1, md: 1, lg: 1, xl: 1 }} >
                            <div style={{
                                backgroundColor: "#F3F9FB",
                                display: "flex",
                                padding: "10px",
                                alignItems: "center",
                                fontSize: "24px",
                            }} >
                                <Avatar size="sm" cursor="pointer" name={productDetails.owner.name} src={productDetails.owner.pic} />&nbsp;
                                {productDetails.owner.name}
                            </div>
                            <div style={{
                                padding: "10px",
                            }} >
                                <Text fontSize="48px" fontWeight="500" color="#008ECC" >
                                    Rs. {productDetails.price}<br />
                                </Text>
                                <Text fontSize="24px" >
                                    <Text fontSize="15px">Product Name:</Text>
                                    {productDetails.name}<br />
                                </Text>
                                <hr style={{
                                    margin: "10px 0px 10px 0px",
                                    border: "1px solid #e5e5e5",
                                    borderRadius: "5px",
                                }} />
                                <Text fontSize="24px">
                                    <Text fontSize="15px">Description:</Text>
                                    {productDetails.description}<br />
                                </Text>
                            </div>

                            <center style={{ padding: "0px 0px 10px 0px" }} >
                                {(user._id === productDetails.owner._id)
                                    ?
                                    <Button width="100%" _hover={{ cursor: "default" }} >This is one of your products</Button>
                                    :
                                    <Button
                                        width="100%"
                                        _hover={{
                                            transition: "all ease 0.3s",
                                            backgroundColor: "#0084BD"
                                        }}
                                        backgroundColor="#008ECC"
                                        color="white"
                                        onClick={async () => {
                                            console.log(productDetails.owner)
                                            const userId = productDetails.owner;
                                            try {
                                                const config = {
                                                    headers: {
                                                        "Content-type": "application/json",
                                                        Authorization: `Bearer ${user.token}`,
                                                    },
                                                };
                                                const { data } = await axios.post(`/api/chat`, { userId }, config);
                                                console.log(data);

                                                if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
                                                setSelectedChat(data);
                                                console.log(selectedChat._id);

                                                history.push({
                                                    pathname: '/chats',
                                                    state: {  // location state
                                                        currentUser: localStorage.getItem("userInfo"),
                                                    },
                                                });
                                                console.log("created")
                                            } catch (error) {
                                                console.log(error.message)
                                            }
                                        }
                                        } >
                                        Double click to Message Seller
                                    </Button>
                                }
                            </center>
                        </GridItem>
                    </Grid>
                </div>
                :
                <Spinner
                    size="xl"
                    alignSelf="center"
                    marginLeft="50%"
                    color='#c5c5c5'
                />
            }
        </>
    )
}

export default SpecProduct