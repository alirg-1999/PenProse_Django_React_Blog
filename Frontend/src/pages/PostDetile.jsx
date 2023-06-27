import React, { useEffect, useState } from "react";
import { Box, Heading, Image, VStack, useToast } from "@chakra-ui/react";
import { useParams } from "react-router";
import { GetPostApi, LikePostApi, UserDataApi } from "../api";
import { MainHeader } from "../components/Header";
import UserHeaderPost from "../components/UserHeaderPost";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import LikeSection from "../components/LikeSection";

const PostDetail = () => {
  const toast = useToast();
  const { slug } = useParams();
  const [user, setUser] = useState(null);
  const [post, setPost] = useState(null);
  const [token, setToken] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  //like post
  const [userId, setUserId] = useState(null);
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

  useEffect(() => {
    const token = Cookies.get("token");
    setToken(token);
    const username = Cookies.get("user");

    if (username) {
      UserDataApi(username).then((res) => {
        setUserId(res.data.id);
      });
    }

    GetPostApi(slug).then((res) => {
      setPost(res.data);
    });
  }, []);

  useEffect(() => {
    if (post) {
      UserDataApi(post.author_username).then((userData) => {
        setUser(userData.data);
      });
    }
  }, [post]);

  const LikeItPost = () => {
    LikePostApi({ blog_post: post.id, user_id: userId, is_like: true }, token)
      .then(() => {
        toast({
          title: "Like it This post",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        });
      })
      .catch(() =>
        toast({
          title: "You have already liked this post",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        })
      );
  };

  if (post) {
    return (
      <VStack>
        <MainHeader />
        <VStack maxW="900px" mx="auto">
          <UserHeaderPost post={post} user={user} />;
          {scrollPosition > 200 ? (
            <Box
              as={motion.div}
              boxShadow="xl"
              initial={{ height: 0 }}
              animate={{ height: "60px" }}
              exit={{ height: 0 }}
              w="full"
              position="fixed"
              top="0"
              display={{ base: "none", md: "flex" }}
              transition=".1s"
              overflow="hidden"
            >
              <UserHeaderPost post={post} user={user} scrollShow={"fixed"} />
            </Box>
          ) : null}
          <Image
            mt="20px"
            src={post.postimg}
            alt={post.title}
            maxW="900px"
            w="full"
            boxShadow="md"
            borderRadius="lg"
            objectFit="contain"
          />
          <Box mt="3" p="3">
            <Heading fontSize={{ base: "30px", md: "5xl" }}>
              {post.title}
            </Heading>
          </Box>
          <Box>
            <Box as="div" dangerouslySetInnerHTML={{ __html: post.content }} />
          </Box>
        </VStack>
        <LikeSection likeEvent={LikeItPost} token={token} userId={userId} />
      </VStack>
    );
  }
};

export default PostDetail;
