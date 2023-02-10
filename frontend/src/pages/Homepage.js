import React, { useEffect } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from '../components/Authentication/Login'
import Signup from '../components/Authentication/Signup'
import { useHistory } from 'react-router-dom'

function Homepage() {

  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) history.push("/profile");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  return (
    <div>
      <Tabs variant='soft-rounded' colorScheme='blue'>
        <TabList display="flex" justifyContent="center" >
          <Tab>Sign In</Tab>
          <Tab>Sign Up</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Login />
          </TabPanel>
          <TabPanel>
            <Signup />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}

export default Homepage