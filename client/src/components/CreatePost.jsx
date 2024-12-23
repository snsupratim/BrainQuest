import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postText, setPostText] = useState({
    text: "",
  });

  const user = useRecoilValue(userAtom);

  const handleCreatePost = async () => {
    const res = await fetch("/api/posts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postText }),
    });

    const data = await res.json();
    // if(data.error){
    //   showToast("Error",data.error,"error")
    //   return
    // }
    // showToast("Success","Post created succesfully","success")
    // onclose();
  };

  return (
    <>
      <Button
        position={"fixed"}
        bottom={10}
        right={10}
        leftIcon={<AddIcon />}
        bg={"gray.dark"}
        onClick={onOpen}
      >
        Post
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <Flex align={"center"} justify={"center"}>
            {/* <ModalHeader>Create Post</ModalHeader> */}
            {/* <ModalCloseButton /> */}

            <ModalBody pb={6}>
              <FormControl>
                <FormLabel></FormLabel>
                <Input
                  type="text"
                  onChange={(e) =>
                    setPostText({ postText, text: e.target.value })
                  }
                  value={postText.text}
                />
              </FormControl>

              {/* <FormControl mt={4}>
                <FormLabel>Last name</FormLabel>
                <Input placeholder="Last name" />
              </FormControl> */}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleCreatePost}>
                Post
              </Button>
            </ModalFooter>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
