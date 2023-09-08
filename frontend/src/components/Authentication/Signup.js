import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Show, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import axios from "axios";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';


function Signup() {
    const [show, setShow] = useState(false);
    const history = useHistory();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [password, setPassword] = useState("");
    const [pic, setPic] = useState("");
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const [picLoading, setPicLoading] = useState(false);

    const handleClick = () => { setShow(!show); }

    const submitHandler = async () => {
        setPicLoading(true);
        if (!name || !email || !password || !confirmpassword) {
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setPicLoading(false);
            return;
        }
        if (password !== confirmpassword) {
            toast({
                title: "Passwords Do Not Match",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        console.log(name, email, password, pic);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post(
                "/api/user",
                {
                    name,
                    email,
                    password,
                    pic,
                },
                config
            );
            console.log(data);
            toast({
                title: "Registration Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            setPicLoading(false);
            history.push("/profile");
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setPicLoading(false);
        }
    };


    const postDetails = (pics) => {
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
                    setPic(data.url.toString());
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
        <>
            <VStack>
                <FormControl id='first-name' >
                    <FormLabel>Name</FormLabel>
                    <Input
                        backgroundColor="#F4F4F9"
                        boxShadow="inset 0px 1px 1px rgba(0, 0, 0, 0.05)"
                        placeholder='Enter your name'
                        onChange={(e) => { setName(e.target.value) }}
                    />
                </FormControl>

                <FormControl id='email2' >
                    <FormLabel>Email</FormLabel>
                    <Input
                        backgroundColor="#F4F4F9"
                        boxShadow="inset 0px 1px 1px rgba(0, 0, 0, 0.05)"
                        placeholder='Enter your Email'
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                </FormControl>

                <FormControl id='password2' >
                    <FormLabel>Passord</FormLabel>
                    <InputGroup>
                        <Input
                            backgroundColor="#F4F4F9"
                            boxShadow="inset 0px 1px 1px rgba(0, 0, 0, 0.05)"
                            type={show ? "text" : "password"}
                            placeholder='Enter your password'
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                        <InputRightElement>
                            <Button backgroundColor="transparent"
                                onClick={handleClick}>
                                {show ? <FontAwesomeIcon icon={faLockOpen} /> : <FontAwesomeIcon icon={faLock} />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>

                <FormControl id='cpassword2' >
                    <FormLabel>Confirm Passord</FormLabel>
                    <InputGroup>
                        <Input
                            backgroundColor="#F4F4F9"
                            boxShadow="inset 0px 1px 1px rgba(0, 0, 0, 0.05)"
                            type={show ? "text" : "password"}
                            placeholder='Confirm password'
                            onChange={(e) => { setConfirmpassword(e.target.value) }}
                        />
                        <InputRightElement>
                            <Button backgroundColor="transparent"
                                onClick={handleClick}>
                                {show ? <FontAwesomeIcon icon={faLockOpen} /> : <FontAwesomeIcon icon={faLock} />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>

                <FormControl id='pic'>
                    <FormLabel>Upload your Picture <Text display="inline" fontWeight="300" >(optional)</Text> </FormLabel>
                    <Input
                        backgroundColor="#F4F4F9"
                        boxShadow="inset 0px 1px 1px rgba(0, 0, 0, 0.05)"
                        type="file"
                        accept="image/"
                        onChange={(e) => { postDetails(e.target.files[0]) }}
                    />
                </FormControl>

                <Button _hover={{ transition: "all ease 0.3s", backgroundColor: "#0084BD" }} backgroundColor="#008ECC" color="white" onClick={submitHandler} isLoading={loading}>
                    Sign Up
                </Button>
            </VStack>
        </>
    )
}

export default Signup