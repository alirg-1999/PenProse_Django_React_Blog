import React, { useState, useEffect } from "react";
import {
  Box,
  HStack,
  Image,
  Text,
  IconButton,
  VStack,
  Spinner,
  Avatar,
} from "@chakra-ui/react";
import { Link as LinkDom } from "react-router-dom";
import { MdDelete, MdEditNote } from "react-icons/md";
import { DeletePost } from "../api";
import { UserDataApi } from "../api";

export const PostProfileCart = ({ post, userToken }) => {
  const [isLoad, setIsLoad] = useState(false);
  const deletePostHandler = () => {
    setIsLoad(true);
    DeletePost(post.slug, userToken).then(() => {
      setIsLoad(false);
      window.location.reload();
    });
  };

  return (
    <HStack
      w="full"
      mx="auto"
      px="2"
      transition="all .3s"
      justifyContent="space-between"
      bg="rgba(0,0,0,0.4)"
      py="2"
      borderRadius="lg"
      h="100px"
      shadow="md"
      _hover={{ bg: "rgba(0,0,0,.8)", shadow: "xl" }}
    >
      <HStack as={LinkDom} w="full" to={`/postdetail/${post.slug}`} h="full">
        <Image src={post.postimg} w="24" h="20" borderRadius="lg" />
        <VStack
          py="1"
          alignItems="start"
          h="full"
          justifyContent="space-between"
        >
          <Text fontWeight="bold">{post.title}</Text>
          <Text fontSize="sm" color="gray.500">
            {post.create_at.slice(0, 10)}
          </Text>
        </VStack>
      </HStack>

      <VStack justifyContent="center" h="full">
        <IconButton
          as={LinkDom}
          to={`/post-edit/${post.slug}`}
          size="sm"
          icon={<MdEditNote />}
          fontSize="xl"
          bg="info"
          color="#fff"
        />
        <IconButton
          size="sm"
          icon={isLoad ? <Spinner /> : <MdDelete />}
          fontSize="xl"
          bg="red.500"
          color="#fff"
          onClick={deletePostHandler}
        />
      </VStack>
    </HStack>
  );
};

export const CartPost = ({ data }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    UserDataApi(data.author_username).then((res) => {
      setUserData(res.data);
    });
  }, []);
  return (
    <Box
      w={{ base: "300px", md: "450px" }}
      borderRadius="md"
      overflow="hidden"
      transition=".3s"
      h={{ base: "180px", md: "250px" }}
      bg="black"
      objectFit="cover"
      pos="relative"
      boxShadow="md"
      _hover={{ boxShadow: "xl" }}
    >
      <Image src={data.postimg} alt={data.title} w="full" h="full" />
      <VStack
        alignItems="start"
        justifyContent="space-between"
        zIndex="5"
        pos="absolute"
        top="0"
        h="full"
        w="full"
        transition=".3s"
        bg="rgba(0, 0, 0, .7)"
        _hover={{ bg: "rgba(0, 0, 0, .2)" }}
        as={LinkDom}
        to={`/postdetail/${data.slug}`}
        p="2"
      >
        {userData ? (
          <HStack>
            <Avatar src={userData.userimage} size="sm" />
            <Text fontSize="sm">{userData.username}</Text>
          </HStack>
        ) : (
          ""
        )}
        <VStack alignItems="start" gap="2">
          <Text fontWeight="bold">
            {data.title.slice(0, 80)} {data.title.length > 80 ? "..." : ""}
          </Text>
          <Text fontWeight="thin" fontSize="12px">
            create at: {data.create_at.slice(0, 10)}
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
};
