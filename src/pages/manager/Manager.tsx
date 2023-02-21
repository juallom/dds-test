import React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { Countries } from "./components/Countries";
import { YourTeam } from "./components/YourTeam";
import { Outlet } from "react-router-dom";
import { useMyTeam } from "../../providers";
import { Page, Header, Body, Footer } from "../../components";
import { useManager } from "./hooks/useManager";

const Manager: React.FC = () => {
  const {
    changeName,
    showErrors,
    state: { coach, playerIds, name: teamName, isStored },
  } = useMyTeam();
  const {
    inputRef,
    onSave,
    onCancel,
    onOpen,
    onClose,
    isOpen,
    onDelete,
    isInvalid,
  } = useManager();
  return (
    <>
      <Page>
        <Header>
          <Heading as={"h1"}>Team manager</Heading>
        </Header>
        <Body>
          <Stack p={5} height={"100%"} direction={"column"} spacing={3}>
            <FormControl isRequired isInvalid={isInvalid}>
              <FormLabel htmlFor="teamName" aria-required={true}>
                Team name
              </FormLabel>
              <Input
                data-testid={"teamName"}
                name={"teamName"}
                ref={inputRef}
                value={teamName}
                isInvalid={isInvalid}
                onChange={(e) => changeName(e.target.value)}
              />
              <FormErrorMessage>Team name is required.</FormErrorMessage>
            </FormControl>
            <Stack
              direction={"row"}
              spacing={5}
              alignItems={"flex-start"}
              mt={5}
              height={"calc(100% - 84px)"}
              overflow={"hidden"}
            >
              <Box
                borderWidth={2}
                borderRadius={4}
                borderColor={"gray.100"}
                flexBasis={"25%"}
                height={"100%"}
                overflowY={"auto"}
                p={5}
              >
                <Countries />
              </Box>
              <Box
                borderWidth={2}
                borderRadius={4}
                borderColor={"gray.100"}
                flexBasis={"45%"}
                height={"100%"}
                overflowY={"auto"}
                p={5}
                as={"main"}
              >
                <Outlet />
              </Box>
              <Box
                borderWidth={2}
                borderRadius={4}
                borderColor={showErrors ? "red.500" : "gray.100"}
                flexBasis={"30%"}
                height={"100%"}
                overflowY={"auto"}
                p={5}
                as={"aside"}
              >
                <YourTeam />
              </Box>
            </Stack>
          </Stack>
        </Body>
        <Footer>
          <Flex
            width={"100%"}
            alignItems={"baseline"}
            justifyContent={"flex-end"}
          >
            {(coach || playerIds.size > 0) && (
              <Button
                colorScheme={"red"}
                variant={"outline"}
                onClick={onOpen}
                mr={3}
              >
                Delete team
              </Button>
            )}
            {isStored && (
              <Button
                onClick={onCancel}
                colorScheme={"blue"}
                variant={"outline"}
                mr={3}
              >
                Cancel
              </Button>
            )}
            <Button colorScheme={"blue"} onClick={onSave}>
              Save team
            </Button>
          </Flex>
        </Footer>
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete team.</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Are you sure you want to delete your team? This action cannot be
              undone.
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                variant="outline"
                mr={3}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onDelete}>
                Confirm delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Page>
    </>
  );
};

export default Manager;
