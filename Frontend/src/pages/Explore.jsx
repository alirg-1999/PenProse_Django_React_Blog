import React, { useEffect, useState } from "react";
import { Box, Text, Grid, GridItem, HStack, Spinner } from "@chakra-ui/react";
import { CartPost } from "../components/Cart";
import { AllPostApi, FindCategoryApi, FindTitleApi } from "../api";
import SearchBox from "../components/SearchBox";

const Explore = () => {
  const [isLoad, setIsloading] = useState(true);
  const [postData, setPostData] = useState([]);

  //search with category
  const searchCategoryHandler = async (e) => {
    setIsloading(true);
    FindCategoryApi(e.target.value).then((res) => {
      setPostData(res.data);
      setIsloading(false);
    });
  };

  //search with Title
  const searchTitleHandler = async (e) => {
    setIsloading(true);
    FindTitleApi(e.target.value).then((res) => {
      setPostData(res.data);
      setIsloading(false);
    });
  };

  useEffect(() => {
    AllPostApi()
      .then((res) => {
        setPostData(res.data);
      })
      .then(() => setIsloading(false));
  }, []);

  return (
    <Box
      minH="100vh"
      py="5"
      id="post_explorer"
      maxW="1440px"
      w="full"
      mx="auto"
    >
      <Text textAlign="center" fontSize="3xl" fontWeight="bold">
        Post Explorer
      </Text>

      {/*search post */}
      <SearchBox
        searchCategoryHandler={searchCategoryHandler}
        searchTitleHandler={searchTitleHandler}
      />

      {isLoad ? (
        <Box
          w="full"
          justifyContent="center"
          display="flex"
          alignItems="center"
          gap="4"
        >
          <Text fontWeight="bold">Please Wait</Text>
          <Spinner />
        </Box>
      ) : (
        <Box>
          {/*show post */}
          {postData.length !== 0 ? (
            <Grid
              w="full"
              rowGap="10"
              templateColumns={{
                base: "repeat(1 , 1fr)",
                lg: "repeat(2 , 1fr)",
                xl: "repeat(3 , 1fr)",
              }}
            >
              {postData.map((item, index) => (
                <GridItem key={index} mx="auto">
                  <CartPost data={item} />
                </GridItem>
              ))}
            </Grid>
          ) : (
            <HStack w="full">
              <Text textAlign="center" fontWeight="bold" fontSize="xl" w="full">
                Not Found Post!!!
              </Text>
            </HStack>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Explore;
