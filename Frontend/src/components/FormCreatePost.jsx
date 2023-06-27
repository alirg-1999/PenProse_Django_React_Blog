import React, { useEffect, useState } from "react";
import {
  Box,
  Image,
  Button,
  VStack,
  Textarea,
  Input,
  FormControl,
  Text,
  useToast,
  Spinner,
  Select,
} from "@chakra-ui/react";
import placeholderImg from "../assets/imageplaceholder.png";
import Cookies from "js-cookie";
//slugify import
import slugify from "slugify";
import ReactQuill from "react-quill";
import { EditorFormats, EditorModules } from "../lib/editor";
import { CategoryApi, UserDataApi, SavePostApi } from "../api";

const InputTitle = ({ title }) => {
  return (
    <Text fontWeight="bold" mb="2" fontSize="lg" ml="3">
      {title}
    </Text>
  );
};

const FormCreatePost = () => {
  const toast = useToast();
  const [isLoad, setisLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [category, setCategory] = useState(null);
  const [showImg, setImg] = useState(null);
  const [post, setPost] = useState({
    title: "",
    author: null,
    category: "",
    content: "",
    create_at: null,
    postimg: null,
    slug: null,
  });

  // get post data
  useEffect(() => {
    const username = Cookies.get("user");
    const token = Cookies.get("token");
    const currentDate = new Date().toISOString();
    setToken(token);
    UserDataApi(username).then((res) => {
      setPost({
        ...post,
        author: res.data.id,
        create_at: currentDate,
      });
    });
    //get category
    CategoryApi().then((res) => {
      setCategory(res.data);
    });
  }, []);

  const postImageHandler = (img) => {
    const file = img.target.files[0];
    setImg(URL.createObjectURL(file));
    setPost({ ...post, postimg: file });
  };

  const createSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  //send post to data base
  const submitHandler = (event) => {
    setisLoading(true);
    event.preventDefault();
    SavePostApi(token, post)
      .then(() => {
        toast({
          title: "Create Post success",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        window.location.href = "/posts";
      })
      .catch((res) => {
        console.log(res);
        toast({
          title: "Error in create post",
          description: "Maybe your one field is not full",
          status: "error",
          duration: 2000,
          position: "top",
          isClosable: true,
        });
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  return (
    <VStack
      p="5"
      bg="rgba(0,0,0,.2)"
      borderRadius="md"
      onSubmit={submitHandler}
      as="form"
      mx="auto"
      maxW="1200px"
    >
      <Text
        bg="light_transparent"
        w="full"
        p="4"
        borderRadius="md"
        textAlign="center"
        color="info"
        fontSize="xl"
        fontWeight="extrabold"
        userSelect="none"
      >
        Create your Post in PenProse
      </Text>
      {/*form data */}
      <VStack w="full" my="3">
        {/*post category selection*/}
        <Box w="full" mb="5">
          <InputTitle title="Category Post" />
          <Select
            variant="filled"
            bg="info"
            name="category"
            _hover={{ bg: "gray.700" }}
            onChange={(event) => {
              setPost({ ...post, category: event.target.value });
            }}
          >
            <option value="">Choise Categroy</option>
            {category ? (
              category.map((item) => (
                <option
                  style={{ background: "#000" }}
                  value={item.id}
                  key={item.id}
                >
                  {item.title}
                </option>
              ))
            ) : (
              <option>Waiting</option>
            )}
          </Select>
        </Box>
        {/*post image*/}
        <FormControl pos="relative" h={{ base: "400px", lg: "600px" }}>
          <InputTitle title="Post Image" />
          <Input
            type="file"
            onChange={postImageHandler}
            pos="absolute"
            h="full"
            opacity="0"
            cursor="pointer"
          />
          <Image
            src={showImg ? showImg : placeholderImg}
            alt="post image"
            h={{ base: "400px", lg: "600px" }}
            borderRadius="md"
            objectFit="cover"
            w="full"
          />
        </FormControl>
        {/*post title*/}
        <FormControl w="full" mt="14">
          <InputTitle title="Post Title" />
          <Textarea
            w="full"
            h="200px"
            onChange={(event) =>
              setPost({
                ...post,
                title: event.target.value,
                slug: createSlug(event.target.value),
              })
            }
          ></Textarea>
        </FormControl>
        {/*select category*/}

        <Box h={{ base: "650px", lg: "550px" }} w="full" my="8">
          <InputTitle title="Post Content" />
          <ReactQuill
            onChange={(content) => {
              setPost({ ...post, content });
            }}
            modules={EditorModules}
            formats={EditorFormats}
            value={post.content}
            style={{ width: "100%", height: "500px", color: "#fff" }}
          />
        </Box>
      </VStack>
      <Button w="50%" mb="10" fontFamily="lato" type="submit">
        {isLoad ? <Spinner /> : "Save Post"}
      </Button>
    </VStack>
  );
};

export default FormCreatePost;
