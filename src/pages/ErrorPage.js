import React from "react";
import styled from "styled-components";
import { Link as ReactLink } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Box, Container, Flex, Heading, Link, HStack, Stack } from "@chakra-ui/react";

const ErrorPage = () => {
  return (
    <Container w="100%" h="600" align="center">
      <Box mt={100} w="100%" h="100%" align="center">
        <Heading>404</Heading>
        <Heading size="md">Sorry, the page you tried cannot be found</Heading>
        <Link as={ReactLink} to="/">
          <HStack pt="20" pl="30%">
          <ArrowBackIcon /> <Heading size="md" color="red">Back Home</Heading>
          </HStack>
        </Link>
      </Box>
    </Container>
  );
};

const Wrapper = styled.main`
  background: var(--clr-primary-10);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  h1 {
    font-size: 10rem;
  }
  h3 {
    text-transform: none;
    margin-bottom: 2rem;
  }
`;

export default ErrorPage;
