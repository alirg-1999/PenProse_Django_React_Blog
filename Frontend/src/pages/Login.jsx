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
import { MdPassword } from "react-icons/md";
import Cookies from "js-cookie";
import { LoginApi } from "../api";
import { Link as LinkDom } from "react-router-dom";

const Login = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    LoginApi(user)
      .then((res) => {
        Cookies.set("user", user.username);
        Cookies.set("token", res.data.token);
        toast({
          title: "Login success",
          description: `Welcome to PenProse.`,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        window.location.href = `/profile`;
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "An error occurred!!!",
          description: "We cannot find this user.try again.",
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
        <Heading mb="10">Login in PenProse</Heading>
        <FormInput
          type="text"
          placeholder="Enter Username"
          value={user.username}
          icons={AiOutlineUserAdd}
          name="username"
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
        >
          {isLoading ? <Spinner size="sm" /> : "Login"}
        </Button>
        <Link
          as={LinkDom}
          to="/signup"
          textDecoration="underline"
          fontWeight="bold"
          color="gray.500"
          _hover={{ color: "gray.200" }}
        >
          I don&apos;t have Account!!!
        </Link>
      </VStack>
      <Text>Create this app by Alirg1999</Text>
    </VStack>
  );
};

export default Login;
