import React, { useEffect, useState } from "react";
import {
  Stack,
  Box,
  Text,
  HStack,
  Avatar,
  VStack,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { ProfileHeader } from "./Header";
import { UserDataApi, UserPostProfile } from "../api";
import Cookies from "js-cookie";
import { PostProfileCart } from "./Cart";
import { Link as LinkDom } from "react-router-dom";

const Posts = () => {
  const [post, setPost] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const username = Cookies.get("user");
    const token = Cookies.get("token");
    setToken(token);
    UserDataApi(username).then((res) => {
      setUser(res.data);
      UserPostProfile(res.data.id).then((res) => setPost(res.data));
    });
  }, []);
  return (
    <Box>
      <ProfileHeader />
      {user ? (
        <HStack
          px="5"
          maxW="1200px"
          mx="auto"
          mb="9"
          h="20"
          bg="rgba(0,0,0,.7)"
          borderRadius="lg"
          justifyContent="space-between"
        >
          <HStack>
            <Avatar src={user.userimage} />
            <Text fontWeight="bold">{user.username}</Text>
          </HStack>
          <Text fontWeight="bold">Post : {post ? post.length : ""}</Text>
        </HStack>
      ) : (
        ""
      )}
      {/*post List*/}
      <VStack maxW="1100px" px="3" mx="auto">
        {/*post Cart*/}
        {post.length !== 0 ? (
          post.map((item) => (
            <PostProfileCart key={item.id} post={item} userToken={token} />
          ))
        ) : (
          <VStack w="full" fontWeight="bold">
            <Stack
              direction={{ base: "column", md: "row" }}
              justifyContent="center"
              alignItems="center"
            >
              <Text fontSize="xl" textAlign="center">
                If you have post please wait.
              </Text>
              <Spinner />
            </Stack>
            <Text>OR </Text>
            <Text fontSize="lg">Create post in PenProse</Text>
            <Button as={LinkDom} to="/post">
              Create Post
            </Button>
          </VStack>
        )}
      </VStack>
    </Box>
  );
};

export default Posts;
