import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react"
import { useEffect } from "react";
import sleep from "../../../utils/sleep";

const ConfirmDialog: Function = (props: any): JSX.Element => {
    return (
        <AlertDialog
            isOpen={props.isOpen}
            leastDestructiveRef={props.cancelRef}
            onClose={props.onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Delete Customer
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Are you sure? You can't undo this action afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={props.cancelRef} onClick={props.onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='red' onClick={props.onClose} ml={3}>
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

export default ConfirmDialog;