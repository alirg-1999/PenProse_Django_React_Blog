import React, { useEffect, useState } from "react";
import {
  Stack,
  Box,
  HStack,
  Text,
  Image,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  VStack,
  Link,
  Icon,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";
import Logo from "../assets/logo.svg";
import { Link as LinkDom } from "react-router-dom";
import Cookies from "js-cookie";
import { AiOutlineGithub, AiFillHome } from "react-icons/ai";
import { UserDataApi } from "../api";
import { useLocation } from "react-router-dom";

export const MainHeader = () => {
  const [isLogin, setIsLogin] = useState(null);

  const LogoutHandler = () => {
    Cookies.remove("user");
    Cookies.remove("token");

    window.location.reload();
  };

  useEffect(() => {
    const username = Cookies.get("user");
    setIsLogin(username);
    if (username) {
      UserDataApi(username).then((res) => setIsLogin(res.data));
    }
  }, []);

  return (
    <HStack
      h="80px"
      justifyContent="space-between"
      maxW="1440px"
      mx="auto"
      w="full"
      px="4"
    >
      <Image
        src={Logo}
        alt="logo"
        w={{ base: "110px", md: "150px" }}
        objectFit="contain"
      />
      {isLogin ? (
        <HStack>
          <Button
            size="sm"
            fontSize="12px"
            color="white"
            shadow="xl"
            as={LinkDom}
            to={"/post"}
            bg="rgba(230,230,230,.1)"
            _hover={{ bg: "rgba(230,230,230,.3)", boxShadow: "none" }}
          >
            Create Post
          </Button>
          {/*menu show user */}
          <Menu>
            <MenuButton
              bg="transparent"
              transition="all 0.2s"
              border="none"
              borderWidth="1px"
            >
              <Avatar src={isLogin.userimage} size="md" shadow="xl" />
            </MenuButton>
            <MenuList border="none" dropShadow="xl" p="2" bg="info">
              <VStack w="full" gap="2">
                <Box borderBottom="1px" pb="1" w="full" textAlign="center">
                  <Text fontWeight="bold">{isLogin.username}</Text>
                  <Text fontSize="11px">{isLogin.email}</Text>
                </Box>
                {/*button for menu*/}
                <Box w="full">
                  <Button
                    w="full"
                    bg="rgba(0,0,0,.3)"
                    transition="all 0.2s"
                    _hover={{ bg: "rgba(0,0,0,.7)" }}
                    border="none"
                    color="#fff"
                    borderWidth="1px"
                    as={LinkDom}
                    to="/profile"
                  >
                    Profile
                  </Button>
                  <Button
                    w="full"
                    mt="1"
                    bg="red.900"
                    transition="all 0.2s"
                    _hover={{ bg: "red.600" }}
                    border="none"
                    color="#fff"
                    borderWidth="1px"
                    onClick={LogoutHandler}
                  >
                    Logout
                  </Button>
                </Box>
              </VStack>
            </MenuList>
          </Menu>
        </HStack>
      ) : (
        <HStack>
          <Button
            bg="rgba(230,230,230,.1)"
            _hover={{ bg: "rgba(230,230,230,.3)", boxShadow: "none" }}
            px="10"
            fontSize="sm"
            h="35px"
            as={LinkDom}
            to="/signin"
            color="#fff"
          >
            Sign in
          </Button>

          <Link
            fontSize="3xl"
            href="https://github.com/alirg-1999"
            target="_blank"
            mb="-4px"
          >
            <Icon as={AiOutlineGithub} />
          </Link>
        </HStack>
      )}
    </HStack>
  );
};

export const ProfileHeader = () => {
  const router = useLocation();
  return (
    <Stack
      my="5"
      px="16"
      direction={{ base: "column", md: "row" }}
      justifyContent="space-between"
      alignItems="center"
    >
      <Image
        src={Logo}
        alt="logo"
        w={{ base: "110px", md: "150px" }}
        objectFit="contain"
      />
      <HStack>
        <ButtonGroup isAttached size="sm">
          <Button
            as={LinkDom}
            to="/profile"
            _hover={{ color: "#000" }}
            bg={router.pathname !== "/posts" ? "gray.800" : "gray.500"}
            w="22"
            color="#fff"
            shadow="xl"
          >
            Profile
          </Button>
          <Button
            as={LinkDom}
            shadow="xl"
            _hover={{ color: "#000" }}
            to="/posts"
            bg={router.pathname === "/posts" ? "gray.800" : "gray.500"}
            w="22"
            color="#fff"
          >
            Posts
          </Button>
        </ButtonGroup>
        <IconButton
          as={LinkDom}
          to="/"
          icon={<AiFillHome />}
          bg="transparent"
          fontSize="2xl"
          color="white"
          _hover={{ color: "gray.400" }}
        />
      </HStack>
    </Stack>
  );
};
