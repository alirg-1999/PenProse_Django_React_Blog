import React from "react";
import {
  Box,
  HStack,
  Button,
  IconButton,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";

const LikeSection = ({ userId, token, likeEvent }) => {
  return (
    <HStack
      py="4"
      px="2"
      bg="rgba(0,0,0,.3)"
      w="full"
      maxW="900px"
      borderRadius="lg"
      shadow="xl"
      my="10"
      justifyContent="center"
    >
      <Text fontWeight="bold" fontSize={{ base: "sm", md: "lg" }}>
        If it was useful for you, be sure to like it :
      </Text>
      {token ? (
        <IconButton
          icon={<AiFillHeart />}
          bg="transparent"
          color="red.300"
          fontSize="2xl"
          _hover={{ bg: "info" }}
          onClick={likeEvent}
        />
      ) : (
        <Button
          fontSize="sm"
          bg="rgba(0,0,0,.3)"
          color="#fff"
          as={Link}
          to="/signin"
          _hover={{ bg: "rgba(0,0,0,.8)" }}
        >
          First SignIn
        </Button>
      )}
    </HStack>
  );
};

export default LikeSection;
