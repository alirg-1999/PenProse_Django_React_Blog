import React, { useState, useEffect } from "react";
import { Box, Text, VStack, Image, Button } from "@chakra-ui/react";
import { MainHeader } from "../components/Header";
import { Link as LinkDom } from "react-router-dom";
import Cookies from "js-cookie";
import { UserDataApi } from "../api";
import FormCreatePost from "../components/FormCreatePost";

const CreatePost = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const username = Cookies.get("user");
    if (username) {
      UserDataApi(username).then((res) => setUser(res.data));
    }
  }, []);
  return (
    <Box>
      <MainHeader />
      {user ? (
        <FormCreatePost />
      ) : (
        <Box
          textAlign="center"
          maxW="1400px"
          mx="auto"
          w="full"
          fontWeight="bold"
        >
          <Text fontSize="xl" mt="16" px="3">
            Sorry, but you have not logged in yet to continue in this first
            part, you must be a member of the PenProse.
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
      )}
    </Box>
  );
};

export default CreatePost;
