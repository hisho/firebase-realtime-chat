import { Modal, ModalHeader } from '@chakra-ui/modal'
import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { useCallback } from 'react'
import { SignInForm } from '@src/feature/auth/component/SignInForm/SignInForm'
import { useSignInForm } from '@src/feature/auth/component/SignInForm/useSignInForm'

export const useSignInFormModal = () => {
  const { onClose: _onClose, onOpen, isOpen } = useDisclosure()
  const { form, handleSignIn, isLoading } = useSignInForm({
    onCompleted: () => {
      _onClose()
    },
  })

  const onClose = useCallback(() => {
    form.reset()
    _onClose()
  }, [_onClose, form])

  const renderSignInFormModal = useCallback(() => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ログインして続ける</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SignInForm form={form} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              閉じる
            </Button>
            <Button
              variant="ghost"
              onClick={form.handleSubmit(handleSignIn)}
              isLoading={isLoading}
            >
              ログイン
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  }, [form, handleSignIn, isLoading, isOpen, onClose])

  return {
    renderSignInFormModal,
    onClose,
    onOpen,
  } as const
}
