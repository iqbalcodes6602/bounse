import React, { useState } from 'react'
import { Box, VStack } from "@chakra-ui/layout";
import { ChatState } from "../context/ChatProvider";
import axios from "axios";
import { Button, useToast } from '@chakra-ui/react'
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

function SellProductForm() {
    // const { user } = ChatState();
    const user = JSON.parse(localStorage.getItem("userInfo"));


    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const [kind, setKind] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image1, setImage1] = useState("");
    const [image2, setImage2] = useState("");
    const [image3, setImage3] = useState("");
    const [images, setImages] = useState([]);

    const owner = user;
    const forSale = "true";

    const submitADHandler = async () => {

        // if (!kind || !name || !price || !description || !image1 || !image2 || !image3) {
        //     toast({
        //         title: "Please Fill all the Feilds",
        //         status: "warning",
        //         duration: 5000,
        //         isClosable: true,
        //         position: "bottom",
        //     });
        //     return;
        // }
        // console.log(
        //     name,
        // );

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.post(
                // "/api/product",
                `${process.env.REACT_APP_API_URL}/api/product`,
                {
                    kind,
                    owner,
                    name,
                    price,
                    description,
                    images,
                    forSale,
                },
                config,
            );
            console.log(data);
            toast({
                title: "AD Posted Successful. Wait untill it gets reviewed",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            window.location.reload();
        }
        catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    };

    const postDetails1 = (pics) => {
        setLoading(true);
        if (pics === undefined) {
            toast({
                title: "Please Select an image",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("upload_preset", `${process.env.REACT_APP_API_CLOUDINARY_UPLOAD_PRESET}`);
            data.append("file", pics);
            data.append("cloud_name", `${process.env.REACT_APP_API_CLOUDINARY_UPLOAD_CLOUD}`);
            fetch(`${process.env.REACT_APP_API_CLOUDINARY}`, {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then(data => {
                    setImage1(data.url.toString());
                    setImages(images => [...images, data.url.toString()]);
                    console.log(data.url.toString());
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        } else {
            toast({
                title: "Please Select an image",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }
    };
    const postDetails2 = (pics) => {
        setLoading(true);
        if (pics === undefined) {
            toast({
                title: "Please Select an image",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("upload_preset", `${process.env.REACT_APP_API_CLOUDINARY_UPLOAD_PRESET}`);
            data.append("file", pics);
            data.append("cloud_name", `${process.env.REACT_APP_API_CLOUDINARY_UPLOAD_CLOUD}`);
            fetch(`${process.env.REACT_APP_API_CLOUDINARY}`, {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then(data => {
                    setImage2(data.url.toString());
                    setImages(images => [...images, data.url.toString()]);
                    console.log(data.url.toString());
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        } else {
            toast({
                title: "Please Select an image",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }
    };
    const postDetails3 = (pics) => {
        setLoading(true);
        if (pics === undefined) {
            toast({
                title: "Please Select an image",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("upload_preset", `${process.env.REACT_APP_API_CLOUDINARY_UPLOAD_PRESET}`);
            data.append("file", pics);
            data.append("cloud_name", `${process.env.REACT_APP_API_CLOUDINARY_UPLOAD_CLOUD}`);
            fetch(`${process.env.REACT_APP_API_CLOUDINARY}`, {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then(data => {
                    setImage3(data.url.toString());
                    setImages(images => [...images, data.url.toString()]);
                    console.log(data.url.toString());
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        } else {
            toast({
                title: "Please Select an image",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }
    };


    return (
        <div>
            <VStack>
                <FormControl>
                    <FormLabel textAlign="left">Type of your Product</FormLabel>
                    <Input
                        backgroundColor="#F4F4F9"
                        boxShadow="inset 0px 1px 1px rgba(0, 0, 0, 0.05)"
                        placeholder='Kind of Product'
                        onChange={(e) => { setKind(e.target.value) }}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel textAlign="left">Product Name</FormLabel>
                    <Input
                        backgroundColor="#F4F4F9"
                        boxShadow="inset 0px 1px 1px rgba(0, 0, 0, 0.05)"
                        placeholder='Name of Product'
                        onChange={(e) => { setName(e.target.value) }}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel textAlign="left">Price</FormLabel>
                    <Input
                        backgroundColor="#F4F4F9"
                        boxShadow="inset 0px 1px 1px rgba(0, 0, 0, 0.05)"
                        placeholder='Price of Product'
                        onChange={(e) => { setPrice(e.target.value) }}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel textAlign="left">Describe your Product</FormLabel>
                    <Input
                        backgroundColor="#F4F4F9"
                        boxShadow="inset 0px 1px 1px rgba(0, 0, 0, 0.05)"
                        placeholder='Description/Features'
                        onChange={(e) => { setDescription(e.target.value) }}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel textAlign="left">Upload Photos </FormLabel>
                    <Input
                        marginBottom="10px"
                        backgroundColor="#F4F4F9"
                        boxShadow="inset 0px 1px 1px rgba(0, 0, 0, 0.05)"
                        placeholder='Links of photo 1'
                        // onChange={(e) => { setImage1(e.target.value) }}
                        type="file"
                        accept="image/"
                        onChange={(e) => { postDetails1(e.target.files[0]) }}
                    />
                    <Input
                        marginBottom="10px"
                        backgroundColor="#F4F4F9"
                        boxShadow="inset 0px 1px 1px rgba(0, 0, 0, 0.05)"
                        placeholder='Links of photo 2'
                        // onChange={(e) => { setImage1(e.target.value) }}
                        type="file"
                        accept="image/"
                        onChange={(e) => { postDetails2(e.target.files[0]) }}
                    />
                    <Input
                        backgroundColor="#F4F4F9"
                        boxShadow="inset 0px 1px 1px rgba(0, 0, 0, 0.05)"
                        placeholder='Links of photo 3'
                        // onChange={(e) => { setImage1(e.target.value) }}
                        type="file"
                        accept="image/"
                        onChange={(e) => { postDetails3(e.target.files[0]) }}
                    />
                </FormControl>
                <FormControl textAlign="center" padding="10px" >
                    <Button _hover={{ transition: "all ease 0.3s", backgroundColor: "#0084BD" }} backgroundColor="#008ECC" color="white" onClick={submitADHandler} isLoading={loading}>
                        Submit AD
                    </Button>
                </FormControl>
            </VStack>
        </div>
    )
}

export default SellProductForm