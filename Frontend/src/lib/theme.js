import { extendTheme } from "@chakra-ui/react";

const styles = {
  global: {
    "&::-webkit-scrollbar": {
      width: "7px",
    },
    "&::-webkit-scrollbar-track": {
      bg: "info",
      width: "7px",
    },
    "&::-webkit-scrollbar-thumb": {
      bg: "rgba(0,0,0,.5)",
      borderRadius: "sm",
    },
    "html , body ": {
      bg: " linear-gradient(180deg, #070d2b, #042959)",
      color: "light",
      scrollBehavior: "smooth",
      transition: ".2s",
      minH: "100vh",
      fontFamily: "'Lato', sans-serif",
      letterSpacing: ".3px",
    },
  },
};

const colors = {
  light: "#F0F0F2",
  info: "#022859",
  light_transparent: "rgba(255,255,255,.7)",
};

export const theme = extendTheme({ styles, colors });
