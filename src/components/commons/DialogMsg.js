import React from 'react'
import { StyleSheet, } from 'react-native'
import { AlertDialog, Button } from "native-base";

const DialogMsg = (props) => {
    const { cancelRef, isOpen, onClose, onConfirm, title, description, textBtnPrimary, textBtnSecondary, isError, btnSecondary } = props;

    return (

        <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
            <AlertDialog.Content>
                <AlertDialog.CloseButton />
                <AlertDialog.Header>{title}</AlertDialog.Header>
                <AlertDialog.Body>{description}</AlertDialog.Body>
                <AlertDialog.Footer>
                    <Button.Group space={2}>
                        {btnSecondary ?
                            <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                                {textBtnSecondary}
                            </Button> : null
                        }
                        <Button colorScheme={isError ? "danger" : "success"} onPress={onConfirm}>
                            {textBtnPrimary}
                        </Button>
                    </Button.Group>
                </AlertDialog.Footer>
            </AlertDialog.Content>
        </AlertDialog>
    )
}

export default DialogMsg

const styles = StyleSheet.create({})