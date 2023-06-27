import React, { useEffect, useState } from "react";
import { Flex, Box, Text, Button, HStack } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { UserDataApi } from "../api";
import { Link as LinkDom } from "react-router-dom";
import { ProfileHeader } from "../components/Header";
import ProfileForm from "../components/ProfileForm";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const username = Cookies.get("user");
    if (username) {
      UserDataApi(username).then((res) => setUser(res.data));
    }
  }, []);

  if (user) {
    return (
      <Box maxW="1200px" w="full" mx="auto" px="3">
        <ProfileHeader />
        <ProfileForm user={user} />
      </Box>
    );
  } else {
    return (
      <Box
        textAlign="center"
        maxW="1400px"
        mx="auto"
        w="full"
        fontWeight="bold"
      >
        <ProfileHeader />
        <Text fontSize="xl" mt="16" px="3">
          Sorry, but you have not logged in yet to continue in this first part,
          you must be a member of the PenProse.
        </Text>
        <Button
          as={LinkDom}
          to="/signin"
          bg="rgba(0,0,0,.4)"
          mt="4"
          px="10"
          _hover={{ bg: "gray.400" }}
          color="gray.200"
        >
          Sign in
        </Button>
      </Box>
    );
  }
};

export default Profile;
