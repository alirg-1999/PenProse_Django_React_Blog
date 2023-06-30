import React from "react";
import { Box, HStack, Button, IconButton, Text, Icon } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";

const LikeSection = ({ token, likeEvent, totalLike }) => {
  return (
    <HStack
      py="4"
      px="5"
      bg="rgba(0,0,0,.3)"
      w="full"
      maxW="900px"
      borderRadius="lg"
      shadow="xl"
      my="10"
      justifyContent="space-between"
    >
      <HStack>
        <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>
          If it was useful for you, be sure to like it :
        </Text>
        {token ? (
          <Box>
            <IconButton
              icon={<AiFillHeart />}
              bg="transparent"
              color="#fff"
              fontSize="2xl"
              _hover={{ bg: "info" }}
              onClick={likeEvent}
            />
          </Box>
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
      <HStack>
        <Icon
          as={AiFillHeart}
          color="red.300"
          fontSize="2xl"
          _hover={{ bg: "info" }}
        />
        <Text fontSize="lg" fontWeight="bold">
          {totalLike.length}
        </Text>
      </HStack>
    </HStack>
  );
};

export default LikeSection;
