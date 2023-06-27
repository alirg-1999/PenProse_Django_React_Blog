import React from "react";
import { Input, InputGroup, InputLeftElement, Icon } from "@chakra-ui/react";

const FormInput = ({
  icons,
  type,
  value,
  name,
  placeholder,
  changeHandler,
}) => {
  return (
    <InputGroup h="14" my="2">
      <InputLeftElement mx="1">
        <Icon as={icons} fontSize="xl" mt="4" />
      </InputLeftElement>
      <Input
        type={type}
        fontFamily="lato"
        fontWeight="bold"
        fontSize="15px"
        h="full"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={changeHandler}
      />
    </InputGroup>
  );
};
export default FormInput;
