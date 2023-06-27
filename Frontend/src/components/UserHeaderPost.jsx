import React, { useEffect, useState } from "react";
import {
  Stack,
  Avatar,
  HStack,
  VStack,
  Text,
  Box,
  Link,
  Icon,
} from "@chakra-ui/react";
import { UserDataApi } from "../api";
//icons
import {
  AiOutlineTwitter,
  AiFillYoutube,
  AiFillLinkedin,
  AiFillGithub,
} from "react-icons/ai";
import { FaTelegramPlane, FaInstagram } from "react-icons/fa";

const MediaLInkBtn = ({ icons, href }) => {
  return (
    <Link href={href} bg="none" _hover={{ bg: "none" }}>
      <Icon as={icons} fontSize="xl" />
    </Link>
  );
};

const UserHeaderPost = ({ post, user }) => {
  return (
    <Box
      userSelect="none"
      py="2"
      px="3"
      bg="#220921"
      w="full"
      borderRadius="md"
    >
      <Stack
        justifyContent={{ base: "center", sm: "space-between" }}
        direction={{ base: "column", sm: "row" }}
        alignItems={{ base: "center" }}
        maxW="1200px"
        h="max-content"
        mx="auto"
      >
        <HStack borderBottom={{ base: "1px", sm: "0" }} pb="2">
          <Avatar src={user ? user.userimage : ""} size="md" />
          <VStack alignItems="start">
            <Text fontWeight="bold">{user ? user.username : ""}</Text>
            <Text fontSize="10px">{user ? user.email : ""}</Text>
          </VStack>
        </HStack>
        <VStack gap="0" justifyContent="center">
          {user ? (
            <HStack>
              {user.twitter ? (
                <MediaLInkBtn href={user.twitter} icons={AiOutlineTwitter} />
              ) : null}

              {user.telegram ? (
                <MediaLInkBtn href={user.telegram} icons={FaTelegramPlane} />
              ) : null}

              {user.youtube ? (
                <MediaLInkBtn href={user.youtube} icons={AiFillYoutube} />
              ) : null}

              {user.instagram ? (
                <MediaLInkBtn href={user.instagram} icons={FaInstagram} />
              ) : null}

              {user.github ? (
                <MediaLInkBtn href={user.github} icons={AiFillGithub} />
              ) : null}

              {user.linkedin ? (
                <MediaLInkBtn href={user.linkedin} icons={AiFillLinkedin} />
              ) : null}
            </HStack>
          ) : null}
          <Text color="gray.300" fontSize="12px">
            Create At: {post.create_at.slice(0, 10)}
          </Text>
        </VStack>
      </Stack>
    </Box>
  );
};

export default UserHeaderPost;
