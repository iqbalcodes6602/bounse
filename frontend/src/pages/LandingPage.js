import { Box, Button, FormControl, Grid, GridItem, Input, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Homepage from './Homepage'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import sideImg from '../assets/landing_side_img.png'
import { faSearch, faShoppingBag, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function LandingPage() {

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) history.push("/profile");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();
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


  const seeAllHandler = () => {
    history.push({
      pathname: "/products",
      state: { search: search },
    })
  }

  // return (
  //   <div>
  //     {/* <Input placeholder='what are u looking for...' type="text" onChange={(e)=>{setSearch(e.target.value)}}/>
  //     <Link
  //       to={{
  //         pathname: "/products",
  //         state: { search: search },
  //       }}
  //     >
  //       Search
  //     </Link> */}
  //     <Grid
  //       margin="5vh 50px 0px 50px"
  //       height="90vh"
  //       p="2"
  //       gap={5}
  //       templateColumns='repeat(2, 1fr)'
  //       templateRows='repeat(12, 1fr)'
  //       textAlign="center"
  //       alignItems="center"
  //     >
  //       {/* top bar */}
  //       <GridItem display="flex" alignItems="center" height="100%" colSpan={2} rowSpan={2} >
  //         <Grid
  //           width="100%"
  //           templateColumns='repeat(12, 1fr)'
  //         >
  //           <GridItem display="flex" alignItems="center" textAlign="left" colSpan={8} >
  //             <Text color="#008ECC" fontSize="48px" >
  //               <b> BounSe </b>
  //             </Text>
  //           </GridItem>
  //           <GridItem display="flex" alignItems="center" colSpan={2} >
  //             <Button
  //               // to={{
  //               //   pathname: "/products",
  //               //   state: { search: search },
  //               // }}
  //               onClick={seeAllHandler}
  //             >
  //               See All Products
  //             </Button>
  //           </GridItem>
  //           <GridItem display="flex" alignItems="center" colSpan={2} >
  //             <>
  //               <Button _hover={{ transition: "all ease 0.3s", backgroundColor: "#0084BD" }} backgroundColor="#008ECC" color="white" onClick={onOpen}>Sign Up Now</Button>
  //               <Modal isOpen={isOpen} onClose={onClose}>
  //                 <ModalOverlay />
  //                 <ModalContent>
  //                   <ModalHeader textAlign="center" fontSize="24px" fontWeight="700" >Welcome to BounSe</ModalHeader>
  //                   <ModalCloseButton />
  //                   <ModalBody>
  //                     <Homepage />
  //                   </ModalBody>
  //                 </ModalContent>
  //               </Modal>
  //             </>
  //           </GridItem>
  //         </Grid>
  //       </GridItem>

  //       {/* side text content */}
  //       <GridItem textAlign="left" height="100%" rowSpan={10} >
  //         <Text textAlign="left" fontWeight="700" fontSize="64px" >
  //           Let's go outside and sell <Text display="inline" color="#008ECC">products!</Text>
  //         </Text>
  //         <Text textAlign="left" fontSize="24px" >
  //           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  //         </Text>
  //         <br />
  //         <FormControl display="flex" alignItems="center" >
  //           <FontAwesomeIcon color="#008ECC" fontSize="30px" icon={faSearch} />
  //           <Input
  //             color="#008ECC"
  //             onKeyDown={searchHandler}
  //             placeholder='What are you looking for ?'
  //             type="text"
  //             backgroundColor="#F3F9FB"
  //             width="400px"
  //             onChange={(e) => { setSearch(e.target.value) }}
  //             marginLeft="10px"
  //           />
  //         </FormControl>
  //       </GridItem>

  //       {/* right image */}
  //       <GridItem height="100%" rowSpan={10} >
  //         <img
  //           src={sideImg}
  //           width="400px"
  //           style={{ marginLeft: "auto", marginRight: "auto", }}
  //           alt="sideImg" />
  //       </GridItem>
  //     </Grid>
  //   </div>
  // )
  return (
    <Box
      margin={{ base: "0px 10px", md: "0px 50px" }}
    >
      {/* Top bar */}
      <Grid
        templateColumns="repeat(12, 1fr)"
        alignItems="center"
        p="2"
      >
        <GridItem
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          colSpan="6"
        >
          <Text color="#008ECC" fontSize={{ base: "36px", md: "48px" }}>
            <b> BounSe </b>
          </Text>
        </GridItem>
        <GridItem colSpan="3" style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button display={{ base: "none", md: "block" }} fontSize={{ base: "12px", lg: "16px" }} onClick={seeAllHandler}>See All Products</Button>
          <Button display={{ base: "block", md: "none" }} onClick={seeAllHandler}>
            <FontAwesomeIcon icon={faShoppingBag} />
          </Button>
        </GridItem>
        <GridItem colSpan="3" style={{ display: "flex", justifyContent: "flex-end" }}>
          <>
            <Button
              _hover={{ transition: "all ease 0.3s", backgroundColor: "#0084BD" }}
              backgroundColor="#008ECC"
              color="white"
              onClick={onOpen}
              display={{ base: "none", md: "block" }}
              fontSize={{ base: "12px", lg: "16px" }}
            >
              Sign Up Now
            </Button>
            <Button
              _hover={{ transition: "all ease 0.3s", backgroundColor: "#0084BD" }}
              backgroundColor="#008ECC"
              color="white"
              onClick={onOpen}
              display={{ base: "block", md: "none" }}
            >
              <FontAwesomeIcon icon={faUser} />
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader textAlign="center" fontSize="24px" fontWeight="700">
                  Welcome to BounSe
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Homepage />
                </ModalBody>
              </ModalContent>
            </Modal>
          </>
        </GridItem>
      </Grid>

      {/* Side text content and search bar */}
      <Grid
        style={{ alignItems: "flex-start" }}
        templateRows={{ base: "repeat(4, 1fr)", md: "repeat(10, 1fr)" }}
        templateColumns="repeat(12, 1fr)"
        p="2"
      >
        <GridItem
          height="100%"
          display="flex"
          justifyContent={{ base: "flex-end", md: "flex-start" }}
          flexDirection={{ base: "column-reverse", lg: "column" }}
          rowSpan={{ base: 2, md: 10 }}
          colSpan={{ base: 12, md: 6 }}>
          <div>
            <Text
              fontWeight="700"
              fontSize={{ base: "40px", lg: "64px" }}
              lineHeight={{ base: "45px", mlg: "76.8px" }}
            >
              Let's go outside and sell{" "}
              <Text display="inline" color="#008ECC">
                products!
              </Text>
            </Text>
            <Text
              fontSize={{ base: "20px", md: "24px" }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </div>
          <FormControl display="flex" alignItems="center" marginTop={{ base: "2", lg: "6" }}>
            <FontAwesomeIcon color="#008ECC" fontSize="30px" icon={faSearch} />
            <Input
              color="#008ECC"
              onKeyDown={searchHandler}
              placeholder="What are you looking for?"
              type="text"
              backgroundColor="#F3F9FB"
              width={{ base: "full", md: "400px" }}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              marginLeft={{ base: "0", md: "10px" }}
              mt={{ base: "2", md: "0" }}
            />
          </FormControl>
        </GridItem>

        {/* Right image */}
        <GridItem
          colStart={{ base: 1, md: 8 }}
          rowSpan={{ base: 2, md: 10 }}
          colSpan={{ base: 12, md: 6 }}
        // style={{ display: "flex", alignItems: "center" }}
        >
          <img
            src={sideImg}
            // width={{
            //   base: "full",
            //   md: "400px",
            //   lg: "500px",
            //   xl: "600px",
            // }}
            width="100%"
            style={{ marginLeft: "auto", marginRight: "auto" }}
            alt="sideImg"
          />
        </GridItem>
      </Grid>
    </Box >
  )
}

export default LandingPage