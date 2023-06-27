import React, { useState, useEffect } from "react";
import { Stack, HStack, Input, Select, Text } from "@chakra-ui/react";
import { CategoryApi } from "../api";

const SearchBox = ({ searchCategoryHandler, searchTitleHandler }) => {
  const [category, setCategory] = useState(null);

  useEffect(() => {
    CategoryApi().then((res) => {
      setCategory(res.data);
    });
  }, []);

  return (
    <Stack
      my="6"
      px="3"
      w="full"
      alignItems="center"
      direction={{ base: "column", lg: "row" }}
    >
      <HStack
        w={{ base: "full", md: "50%" }}
        bg="rgba(0,0,0,.4)"
        p="3"
        borderRadius="lg"
      >
        <Input
          type="search"
          placeholder="Search Post Title"
          h="12"
          onChange={searchTitleHandler}
        />
      </HStack>
      <Text>OR</Text>

      <HStack
        w={{ base: "full", md: "50%" }}
        bg="rgba(0,0,0,.4)"
        p="3"
        borderRadius="lg"
      >
        <Select
          variant="filled"
          bg="info"
          name="category"
          _hover={{ bg: "gray.700" }}
          onChange={searchCategoryHandler}
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
      </HStack>
    </Stack>
  );
};

export default SearchBox;
