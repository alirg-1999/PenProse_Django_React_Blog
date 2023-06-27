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
  Spinner,
  Select,
  HStack,
  useToast,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import ReactQuill from "react-quill";
import { EditorFormats, EditorModules } from "../lib/editor";
import { CategoryApi, EditPostApi, GetPostApi } from "../api";
import { useParams } from "react-router";
import axios from "axios";
import { ProfileHeader } from "../components/Header";
import placeholderImg from "../assets/imageplaceholder.png";

const InputTitle = ({ title }) => {
  return (
    <Text fontWeight="bold" mb="2" fontSize="lg" ml="3">
      {title}
    </Text>
  );
};

const PostEdit = () => {
  const toast = useToast();
  const { slug } = useParams();
  const [isLoad, setIsLoading] = useState(false);
  const [category, setCategory] = useState(null);
  const [showImg, setImg] = useState(null);
  const [post, setPost] = useState(null);

  useEffect(() => {
    //get edit Post
    GetPostApi(slug).then((res) => setPost(res.data));
    //get category
    CategoryApi().then((res) => {
      setCategory(res.data);
    });
  }, []);

  // select img handler
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
  const submitHandler = async (event) => {
    setIsLoading(true);
    console.log(post);
    const token = Cookies.get("token");
    event.preventDefault();
    EditPostApi(slug, token, post)
      .then(() => {
        window.location.href = `/posts/`;
      })
      .catch(() => {
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
        setIsLoading(false);
      });
  };

  if (post) {
    return (
      <Box>
        <ProfileHeader />
        <VStack
          p="5"
          encType="multipart/form-data"
          method="post"
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
            Edit your Post in PenProse
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
                value={post.category}
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
                value={post.title}
                onChange={(event) =>
                  setPost({
                    ...post,
                    title: event.target.value,
                    slug: createSlug(event.target.value.slice(0, 40)),
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
            {isLoad ? <Spinner /> : "Save Edit"}
          </Button>
        </VStack>
      </Box>
    );
  } else {
    return (
      <HStack h="50vh" w="full" justifyContent="center">
        <Text fontSize="2xl" fontWeight="bold">
          Loading
        </Text>
        <Spinner size="lg" />
      </HStack>
    );
  }
};

export default PostEdit;
