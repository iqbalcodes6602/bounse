import { Box, Button, Grid, GridItem, Input, SimpleGrid, Spinner, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { ChatState } from '../context/ChatProvider';
import { Avatar, FormControl, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage } from '@fortawesome/free-solid-svg-icons'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react";
import Homepage from './Homepage';
import "./cardsStyle.css"

function ProductsPage() {
    // const { user } = ChatState();
    const user = JSON.parse(localStorage.getItem("userInfo"));

    const history = useHistory();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     setSearchProducts(search);
    //     fetch("http://localhost:5000/api/product/fetchAll")
    //         .then((response) => response.json())
    //         .then((data) => setProducts(data))
    // .then(handleSearch());
    // }, [])

    useEffect(() => {
        setSearchProducts(search);
        fetchAllProducts();

    }, [])
    const fetchAllProducts = async () => {
        setLoading(true);
        const { data } = await axios.get("/api/product/fetchAll");
        setProducts(data);
        handleSearch();
    }


    const location = useLocation();
    const [search, setSearch] = useState(location.state?.search);
    const toast = useToast();

    const [products, setProducts] = useState([]);
    const [searchProducts, setSearchProducts] = useState(search);
    const [searchResult, setsearchResult] = useState([]);

    const handleSearch = async () => {
        if (!searchProducts) {
            // toast({
            //     title: "Please enter something in search",
            //     status: "warning",
            //     duration: 5000,
            //     isClosable: true,
            //     position: "top-left",
            // });
            return;
        }
        try {
            const { data } = await axios.get(`/api/product?search=${searchProducts}`);
            setsearchResult(data);
            setLoading(false);
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

    const handleSearch2 = async (event) => {
        if (event.key === "Enter" && searchProducts) {
            try {
                const { data } = await axios.get(`/api/product?search=${searchProducts}`);
                setsearchResult(data);
                setSearch(searchProducts);
                setLoading(false);
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
    }
    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        history.push("/");
        window.location.href = "/";
        console.log(user)
    }

    return (
        <div>
            <div>
                <Grid
                    p="2"
                    gap={2}
                    templateColumns='repeat(12, 1fr)'
                    textAlign="center"
                    alignItems="center"
                >
                    <GridItem
                        colSpan={{ base: 12, sm: 12, md: 3, lg: 3, xl: 3 }}
                    >
                        <Text textAlign="center" color="#008ECC" fontSize="30px" >
                            <b> <Link to={user ? "profile" : "/"} >BounSe</Link> </b>
                        </Text>
                    </GridItem>

                    <GridItem colSpan={7} >
                        <FormControl>
                            <Input
                                backgroundColor="#F3F9FB" width="80%"
                                placeholder='Search by name or description'
                                mr={2}
                                onKeyDown={handleSearch2}
                                value={searchProducts}
                                onChange={(e) => { setSearchProducts(e.target.value) }}
                            />
                        </FormControl>
                    </GridItem>

                    {user && (<>
                        <GridItem colSpan={1} >
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

                        <GridItem colSpan={1} >
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
                    </>
                    )}
                    {!user &&
                        <GridItem colSpan={{ base: 3, sm: 3, md: 1, lg: 1, xl: 1 }} >
                            <>
                                <Button _hover={{ transition: "all ease 0.3s", backgroundColor: "#0084BD" }} backgroundColor="#008ECC" color="white" onClick={onOpen}>Sign Up Now</Button>
                                <Modal isOpen={isOpen} onClose={onClose}>
                                    <ModalOverlay />
                                    <ModalContent>
                                        <ModalHeader>Welcome to BounSe</ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody>
                                            <Homepage />
                                        </ModalBody>
                                    </ModalContent>
                                </Modal>
                            </>
                        </GridItem>
                    }
                </Grid>
                {/* <Input
                    width="100px"
                    placeholder='Search by name or description'
                    mr={2}
                    onKeyDown={handleSearch2}
                    value={searchProducts}
                    onChange={(e) => { setSearchProducts(e.target.value) }}
                /> */}
                {/* <Button
                    onClick={handleSearch}
                >
                    Go
                </Button> */}

                {search === "" ? "" :
                    <>
                        <br />
                        <Text
                            fontSize="24px"
                            color="#666666"
                            fontWeight="500"
                            textAlign="center"
                        >
                            Search Results
                        </Text>
                        <br />
                        <SimpleGrid
                            // p="2"
                            // gap={2}
                            // templateColumns='repeat(4, 1fr)'
                            // textAlign="center"
                            // alignItems="center"
                            p="2"
                            gap={10}
                            display="flex"
                            flexWrap="wrap"
                            justifyContent="center"
                            textAlign="center"
                            alignItems="center"
                        >
                            {
                                searchResult?.map((product) => (
                                    // <Box key={product._id} >
                                    //     <div>
                                    //         <h2>{product.kind}</h2>
                                    //         <h2>{product.owner.name}</h2>
                                    //         <h2>{product.price}</h2>
                                    //         <h2><img width="100px" alt="proImg" src={product.images[0]} /></h2>
                                    //         <Link
                                    //             to={{
                                    //                 pathname: "/specproduct",
                                    //                 state: { proId: product._id },
                                    //             }}
                                    //         >
                                    //             View
                                    //         </Link>
                                    //     </div>
                                    // </Box>
                                    <section className="cards" key={product._id}>
                                        <article className="card card--1">
                                            <div className="card__img"></div>
                                            <span className="card_link">
                                                <div className="card__img--hover"
                                                    style={{
                                                        backgroundImage: 'url(' + product.images[0] + ')'
                                                    }}>
                                                </div>
                                            </span>
                                            <div className="card__info">
                                                <span className="card__by">Seller: <a href="#" className="card__author" title="author">{product.owner.name}</a></span><br />
                                                <span className="card__category">{product.name}</span>
                                                <h2 className="card__title">Rs. {product.price}</h2>

                                                {
                                                    user && <Link
                                                        to={{
                                                            pathname: "/specproduct",
                                                            state: { proId: product._id },
                                                        }}
                                                    >
                                                        <div className="card__view"> <button className="View">View Product</button></div>
                                                    </Link>
                                                }
                                                {!user &&
                                                    <div className="card__view"> <button onClick={onOpen} className="View">Login for Details</button></div>
                                                }
                                            </div>
                                        </article>
                                    </section>
                                ))
                            }
                        </SimpleGrid>
                        {(loading && search !== "") ? <>
                            <Spinner
                                size="xl"
                                alignSelf="center"
                                marginLeft="50%"
                                color='#c5c5c5'
                            />
                        </> : null}
                        {(searchResult.length === 0 && search !== "" && !loading) ? <><br />
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                backgroundColor: "#ffb2b2",
                                margin: "0px 40px 0px 40px",
                                padding: "10px 20px 10px 20px",
                                color: "red",
                                borderRadius: "5px",
                                border: "1px solid #ff6161"
                            }} >
                                looks like the product u were searching for was not found looks other products
                            </div></> : null}
                        <hr />
                    </>
                }
                <br />

                <Text
                    fontSize="24px"
                    color="#666666"
                    fontWeight="500"
                    textAlign="center"
                >
                    {search === "" ? "All" : "Other"} Products
                </Text>
                <br />
                <SimpleGrid
                    p="2"
                    gap={10}
                    display="flex"
                    flexWrap="wrap"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                >
                    {
                        products.map((product) => {
                            // return (
                            //     <Box key={product._id} >
                            //         <div style={{
                            //             border: "1px solid #008ECC",
                            //             width: '200px',
                            //             borderRadius: "10px",
                            //             padding: "20px",
                            //         }} >
                            //             <h2>
                            //                 <img
                            //                     style={{
                            //                         marginLeft: "auto", marginRight: "auto",
                            //                     }}
                            //                     width="100px" alt="proImg" src={product.images[0]}
                            //                 />
                            //             </h2>
                            //             <br />
                            //             <div style={{
                            //                 display: "flex",
                            //                 width: "100%",
                            //                 justifyContent: "space-between",
                            //             }} >
                            //                 <div style={{ display: "inline" }} >
                            //                     {product.name}
                            //                 </div>
                            //                 <div style={{ display: "inline" }} >
                            //                     {product.price}
                            //                 </div>
                            //             </div>
                            //             <h2>{product.owner.name}</h2>
                            //             {user && <Link
                            //                 to={{
                            //                     pathname: "/specproduct",
                            //                     state: { proId: product._id },
                            //                 }}
                            //             >
                            //                 View
                            //             </Link>}
                            //             {!user &&
                            //                 <div>
                            //                     <span style={{ cursor: "pointer", color: "#008ECC", textDecoration: "underline" }} onClick={onOpen}>Login</span> to view
                            //                 </div>
                            //             }
                            //         </div>
                            //     </Box>
                            // )
                            return (
                                <section className="cards" key={product._id}>
                                    <article className="card card--1">
                                        <div className="card__img"></div>
                                        <span className="card_link">
                                            <div className="card__img--hover"
                                                style={{
                                                    backgroundImage: 'url(' + product.images[0] + ')'
                                                }}>
                                            </div>
                                        </span>
                                        <div className="card__info">
                                            <span className="card__by">Seller: <a href="#" className="card__author" title="author">{product.owner.name}</a></span><br />
                                            <span className="card__category">{product.name}</span>
                                            <h2 className="card__title">Rs. {product.price}</h2>

                                            {
                                                user && <Link
                                                    to={{
                                                        pathname: "/specproduct",
                                                        state: { proId: product._id },
                                                    }}
                                                >
                                                    <div className="card__view"> <button className="View">View Product</button></div>
                                                </Link>
                                            }
                                            {!user &&
                                                <div className="card__view"> <button onClick={onOpen} className="View">Login for Details</button></div>
                                            }
                                        </div>
                                    </article>
                                </section>
                            )
                        })
                    }
                </SimpleGrid>
            </div>
        </div>
    )
}

export default ProductsPage