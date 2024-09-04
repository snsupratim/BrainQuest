"use client";

import { useState } from "react";
import styles from "./Signup.module.css";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../atoms/authAtom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const setauthScreen = useSetRecoilState(authScreenAtom);

  return (
    <Flex
      className={styles.container}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} className={styles.wrapper}>
        <Stack align={"center"}>
          <Heading className={styles.heading}>Login</Heading>
        </Stack>
        <Box className={styles.formContainer}>
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input type="text" placeholder="username" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button className={styles.button} loadingText="Submitting">
                Login
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text className={styles.loginText}>
                Don't have an account?{" "}
                <Link
                  className={styles.link}
                  onClick={() => setauthScreen("signup")}
                >
                  Sign Up
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
