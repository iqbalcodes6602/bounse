import React, { useState } from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Show, useToast, VStack } from '@chakra-ui/react'
import axios from "axios";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';

function Login() {

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const history = useHistory();
  const handleClick = () => { setShow(!show); }

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    // console.log(email, password);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      // console.log(JSON.stringify(data));
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
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
      setLoading(false);
    }
  };

  return (

    <>
      <VStack>

        <FormControl id='email1' >
          <FormLabel>Email</FormLabel>
          <Input
            backgroundColor="#F4F4F9"
            boxShadow="inset 0px 1px 1px rgba(0, 0, 0, 0.05)"
            value={email}
            placeholder='Enter your Email'
            onChange={(e) => { setEmail(e.target.value) }}
          />
        </FormControl>

        <FormControl id='password1' >
          <FormLabel>Passord</FormLabel>
          <InputGroup>
            <Input
              backgroundColor="#F4F4F9"
              boxShadow="inset 0px 1px 1px rgba(0, 0, 0, 0.05)"
              type={show ? "text" : "password"}
              value={password}
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

        <Button _hover={{ transition: "all ease 0.3s", backgroundColor: "#0084BD" }} backgroundColor="#008ECC" color="white" onClick={submitHandler} isLoading={loading} >
          Login
        </Button>
        {/* <Button
          variant="solid"
          onClick={() => {
            setEmail("guest@example.com");;
            setPassword("12345");
          }}
        >
          Get Guest User Credentials
        </Button> */}
      </VStack>
    </>
  )
}

export default Login