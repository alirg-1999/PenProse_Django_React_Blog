import React, { useEffect, useState } from "react";
import { Box, Icon, Button, Link, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link as LinkDom } from "react-router-dom";
import { BsChevronDoubleDown } from "react-icons/bs";
import { MainHeader } from "../components/Header";
import Explore from "./Explore";

const Home = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <Box>
      <VStack
        transition=".5s"
        h="95vh"
        justifyContent="space-between"
        opacity={scrollPosition > 400 ? "0" : "1"}
        mb="36"
      >
        <MainHeader />
        <VStack>
          <Text
            textAlign="center"
            fontSize={{ base: "4xl", md: "7xl" }}
            fontWeight="bold"
            textShadow="xl"
          >
            Welcome to PenProse
          </Text>
          <Text
            textAlign="center"
            w={{ base: "90%", md: "70%" }}
            fontSize={{ base: "sm", md: "xl" }}
            my={{ base: 3, md: 8 }}
          >
            In this blog, you can share your daily experiences or your knowledge
            in the fields of programming, cooking, or many other things with us.
            We will be happy if you teach us.
          </Text>
          <Link
            as={LinkDom}
            to="/post"
            bg="light_transparent"
            fontFamily="lato"
            mt="4"
            py="2"
            px="4"
            color="info"
            boxShadow="lg"
            fontWeight="bold"
            fontSize="sm"
            borderRadius="md"
            _hover={{ boxShadow: "sm" }}
          >
            Create Post
          </Link>
        </VStack>
        <Button
          as={Link}
          fontFamily="lato"
          href="#post_explorer"
          color="#fff"
          bg="transparent"
          display="flex"
          flexDirection="column"
          _hover={{ bg: "transparent", textDecoration: "none" }}
          gap="2"
        >
          <Text fontSize="sm">show more post</Text>
          <Icon
            transition="all .8s"
            _hover={{ transform: "translateY(20px)" }}
            as={BsChevronDoubleDown}
            fontSize="4xl"
          />
        </Button>
      </VStack>
      <Explore />
    </Box>
  );
};

export default Home;
