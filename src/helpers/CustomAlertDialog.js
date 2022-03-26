import React, { useRef } from "react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

const CustomAlertDialog = ({ dialogRef ,isOpen, onClose, onConfirm , title, children }) => {
  const cancelRef = useRef(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      blockScrollOnMount={true}
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>Alert!!!</AlertDialogHeader>

        <AlertDialogCloseButton onClick={onClose} />

        <AlertDialogBody fontFamily="roboto" fontSize="1.25rem">
          {title}
        </AlertDialogBody>

        <AlertDialogFooter>
          <Button
            ref={cancelRef}
            onClick={onClose}
            py="0.5rem"
            w="100px"
            fontFamily="cursive"
          >
            No
          </Button>

          <Button
            w="100px"
            py="0.5rem"
            onClick={onClose}
            ml={3}
            fontFamily="cursive"
          >
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomAlertDialog;
