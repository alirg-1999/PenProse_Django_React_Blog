import React, { useState } from "react";
import {
  Stack,
  Box,
  Text,
  FormControl,
  Button,
  Input,
  VStack,
  Avatar,
  FormLabel,
  Spinner,
  useToast,
} from "@chakra-ui/react";
//icons
import {
  AiOutlineTwitter,
  AiFillYoutube,
  AiFillLinkedin,
  AiFillGithub,
} from "react-icons/ai";
import { FaTelegramPlane, FaInstagram } from "react-icons/fa";
import FormInput from "./FormInput";
import { ChangeUserDataApi } from "../api";
import Cookies from "js-cookie";

const ProfileForm = ({ user }) => {
  const toast = useToast();
  const [isLoding, setIsLogin] = useState(false);
  const [userData, setUserData] = useState({
    username: user.username,
    userimage: null,
    email: user.email,
    password: user.password,
    github: user.github,
    instagram: user.instagram,
    linkedin: user.linkedin,
    youtube: user.youtube,
    telegram: user.telegram,
    twitter: user.twitter,
    create_at: user.create_at,
  });
  const [userImg, setUserImg] = useState(user.userimage);

  //user image
  const userImageHandler = (img) => {
    const file = img.target.files[0];
    setUserImg(URL.createObjectURL(file));
    setUserData({ ...userData, userimage: file });
  };

  const inputChangeHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const changeDataHandler = (e) => {
    setIsLogin(true);
    e.preventDefault();
    ChangeUserDataApi(user.username, userData)
      .then(() => {
        toast({
          title: `Change data success`,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        Cookies.set("user", userData.username);
        window.location.reload();
      })
      .catch((res) => {
        console.log(res);
        toast({
          title: `Something to wrong please try again`,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      })
      .finally(() => {
        setIsLogin(false);
      });
  };

  return (
    <VStack
      onSubmit={changeDataHandler}
      as="form"
      w="full"
      py="3"
      px={{ base: "0", md: "10" }}
      borderRadius="lg"
    >
      <Text
        fontSize="xl"
        fontWeight="bold"
        py="3"
        bg="rgba(255,255,255,.2)"
        w="full"
        textAlign="center"
        borderRadius="md"
      >
        Hi {userData.username}.You can change or set profile options
      </Text>
      <Stack
        w="full"
        direction={{ base: "column", lg: "row" }}
        justifyContent="center"
        alignItems="center"
        bg="rgba(0,0,0,.3)"
        shadow="md"
        py="4"
        px="10"
        borderRadius="lg"
      >
        <Box pos="relative">
          <Avatar boxSize={{ base: "40", lg: "60" }} src={userImg} />
          <Input
            cursor="pointer"
            onChange={userImageHandler}
            type="file"
            h="180"
            pos="absolute"
            left="0"
            zIndex="2"
            opacity="0"
          />
        </Box>
        <VStack px={{ base: "0", lg: "10" }} gap="5" w="full">
          <FormControl>
            <FormLabel my="0" mx="1" fontWeight="bold">
              Username
            </FormLabel>
            <Input
              type="text"
              h="50px"
              fontSize="lg"
              name="username"
              placeholder={user.username}
              onChange={inputChangeHandler}
            />
          </FormControl>
          <FormControl>
            <FormLabel my="0" mx="1" fontWeight="bold">
              Email
            </FormLabel>
            <Input
              type="email"
              h="50px"
              fontSize="lg"
              name="email"
              placeholder={user.email}
              onChange={inputChangeHandler}
            />
          </FormControl>
        </VStack>
      </Stack>
      {/*social media*/}
      <Stack w="full" direction={{ base: "column", lg: "row" }}>
        <VStack
          w="full"
          shadow="xl"
          bg="rgba(0,0,0,.3)"
          p="3"
          borderRadius="lg"
        >
          <Text fontSize="xl" fontWeight="bold">
            Social Media
          </Text>
          <FormControl>
            <FormLabel my="-5px" mx="1" fontWeight="bold">
              Telegram
            </FormLabel>
            <FormInput
              type="text"
              name="instagram"
              placeholder={
                user.telegram ? user.telegram : "Enter your Telegram Link"
              }
              icons={FaTelegramPlane}
              changeHandler={inputChangeHandler}
            />
          </FormControl>

          <FormControl>
            <FormLabel my="-5px" mx="1" fontWeight="bold">
              Instagram
            </FormLabel>
            <FormInput
              type="text"
              name="instagram"
              placeholder={
                user.instagram ? user.instagram : "Enter your Instagram Link"
              }
              icons={FaInstagram}
              changeHandler={inputChangeHandler}
            />
          </FormControl>

          <FormControl>
            <FormLabel my="-5px" mx="1" fontWeight="bold">
              Twitter
            </FormLabel>
            <FormInput
              type="text"
              name="twitter"
              placeholder={
                user.twitter ? user.twitter : "Enter your Twitter Link"
              }
              icons={AiOutlineTwitter}
              changeHandler={inputChangeHandler}
            />
          </FormControl>
        </VStack>

        <VStack
          w="full"
          bg="rgba(0,0,0,.3)"
          shadow="xl"
          p="3"
          borderRadius="lg"
        >
          <Text fontSize="xl" fontWeight="bold">
            Repository
          </Text>
          <FormControl>
            <FormLabel my="-5px" mx="1" fontWeight="bold">
              YouTube
            </FormLabel>
            <FormInput
              type="text"
              name="youtube"
              placeholder={
                user.youtube ? user.youtube : "Enter your YouTube Link"
              }
              icons={AiFillYoutube}
              changeHandler={inputChangeHandler}
            />
          </FormControl>
          <FormControl>
            <FormLabel my="-5px" mx="1" fontWeight="bold">
              Github
            </FormLabel>
            <FormInput
              type="text"
              name="github"
              placeholder={user.github ? user.github : "Enter your Github Link"}
              icons={AiFillGithub}
              changeHandler={inputChangeHandler}
            />
          </FormControl>
          <FormControl>
            <FormLabel my="-5px" mx="1" fontWeight="bold">
              Linkedin
            </FormLabel>
            <FormInput
              type="text"
              name="Linkedin"
              placeholder={
                user.linkedin ? user.linkedin : "Enter your Linkedin Link"
              }
              icons={AiFillLinkedin}
              changeHandler={inputChangeHandler}
            />
          </FormControl>
        </VStack>
      </Stack>
      <Button
        type="submit"
        bg="rgba(0,0,0,.8)"
        color="#fff"
        w="50%"
        _hover={{ bg: "rgba(0,0,0,.3)" }}
      >
        {!isLoding ? "Change Profile" : <Spinner />}
      </Button>
      <Text mt="5">
        Create this web with alirg1999 / ali.programer.1999@gmail.com
      </Text>
    </VStack>
  );
};

export default ProfileForm;
