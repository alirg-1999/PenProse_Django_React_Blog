import React, { useState } from "react";
import {
  Text,
  VStack,
  Image,
  Heading,
  Button,
  Link,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import FormInput from "../components/FormInput";
import Logo from "../assets/logo.svg";
import { AiOutlineUserAdd } from "react-icons/ai";
import { MdAlternateEmail, MdPassword } from "react-icons/md";
import { RegisterApi } from "../api";
import { Link as LinkDom, useNavigate } from "react-router-dom";

const Register = () => {
  const toast = useToast();
  const router = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });

  const validateUsername = (letter) => {
    const regex = /^[^.{?!"'\[\]}{^\s}]+$/;
    setUser({ ...user, username: letter.target.value });
    setIsValid(regex.test(letter.target.value));
  };

  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    RegisterApi(user)
      .then(() => {
        toast({
          title: "Create account success",
          description: `Welcome to PenProse.`,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        router("/signin");
      })
      .catch(() => {
        toast({
          title: "An error occurred!!!",
          description: "User with that username or email already exists.",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "bottom",
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <VStack minH="95vh" h="full" justifyContent="space-between" mt="3">
      <Image src={Logo} alt="Logo" w="200px" pt="10" />
      <VStack
        as="form"
        onSubmit={submitHandler}
        w="full"
        maxW="550px"
        p="5"
        borderRadius="lg"
        bg="rgba(0,0,0,.2)"
      >
        <Heading mb="10">Register in PenProse</Heading>
        <Text fontSize="10px" color="red.300" mb="-10px">
          *The username must be without spaces and without special symbols*
        </Text>
        <FormInput
          type="text"
          placeholder="Enter Username"
          value={user.username}
          icons={AiOutlineUserAdd}
          name="username"
          changeHandler={validateUsername}
        />
        <FormInput
          type="email"
          placeholder="Enter Email"
          value={user.email}
          icons={MdAlternateEmail}
          name="email"
          changeHandler={onChangeHandler}
        />

        <FormInput
          type="password"
          placeholder="Enter Password"
          value={user.password}
          icons={MdPassword}
          name="password"
          changeHandler={onChangeHandler}
        />
        <Button
          w="full"
          type="submit"
          bg="rgba(0,0,0,.3)"
          color="#fff"
          _hover={{ bg: "rgba(0,0,0,.6)" }}
          isDisabled={isValid ? false : true}
        >
          {isLoading ? <Spinner size="sm" /> : "Register"}
        </Button>
        <Link
          as={LinkDom}
          to="/signin"
          textDecoration="underline"
          fontWeight="bold"
          color="gray.500"
          _hover={{ color: "gray.200" }}
        >
          I have Account!!!
        </Link>
      </VStack>
      <Text>Create this app by Alirg1999</Text>
    </VStack>
  );
};

export default Register;
