import { Button, Grid, GridItem, SimpleGrid, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import SellProductForm from '../components/SellProductForm';
import { ChatState } from '../context/ChatProvider';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


function ProfilePage() {
    const history = useHistory()
    // const { user } = ChatState();
    const user = JSON.parse(localStorage.getItem("userInfo"));

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [ads, setAds] = useState();
    var finalArray = new Array();

    // useEffect(() => {
    //     fetch("http://localhost:5000/api/product/fetchAll")
    //         .then((response) => response.json())
    //         .then((data) => setAds(data))
    // }, [])

    useEffect(() => {
        fetchAllProducts();
    }, [])
    const fetchAllProducts = async () => {
        const { data } = await axios.get("/api/product/fetchAll");
        setAds(data);
    }

    const filterArray = (ads) => {
        const newArray = ads.filter(function (ad) {
            return ad.owner._id == user._id;
        })
        finalArray = newArray;
    }

    const seeAllHandler = () => {
        history.push({
            pathname: "/products",
            state: { search: "" },
        })
    }

    return (
        <div>
            {ads && filterArray(ads)}
            {user && (
                <div>
                    <SearchBar />
                    <div style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        // width: "400px"
                        margin: "20px",
                        gap: "5px"
                    }} >
                        <Text
                            fontSize="24px"
                            color="#666666"
                            fontWeight="500"
                            textAlign="center"
                        >
                            All ads you posted
                        </Text>
                        <Button
                            color="#666666"
                            onClick={seeAllHandler}
                        >
                            See All Products
                        </Button>
                        <Button color="#666666" onClick={onOpen}><FontAwesomeIcon icon={faPlus} />&nbsp;Create a new AD</Button>
                    </div>
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }} >
                        <SimpleGrid
                            p="2"
                            gap={10}
                            display="flex"
                            flexWrap="wrap"
                            justifyContent="center"
                            textAlign="center"
                            alignItems="center"
                        >
                            {finalArray?.map((product) => (
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
                                                <div>
                                                    {/* <span style={{ cursor: "pointer", color: "#008ECC", textDecoration: "underline" }} onClick={onOpen}>Login</span> to view */}
                                                </div>
                                            }
                                        </div>
                                    </article>
                                </section>
                            ))
                            }

                            <Modal isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader textAlign="center" fontSize="24px" >Post a new AD</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <SellProductForm />
                                    </ModalBody>
                                </ModalContent>
                            </Modal>

                        </SimpleGrid>
                        {/* <Link
                        to={{
                            pathname: "/chats",
                            state: {  // location state
                                currentUser: localStorage.getItem("userInfo"),
                            },
                        }}
                        >
                        Chats
                    </Link> */}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfilePage