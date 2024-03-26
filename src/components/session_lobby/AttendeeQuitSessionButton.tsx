import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  useDisclosure,
  Link,
} from '@nextui-org/react';
import { FaAngleLeft } from 'react-icons/fa6';

export default function AttendeeQuitSessionButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const handleQuitSession = () => {
    // TODO: Handle quit session
    // 1. Disconnect all users in session
    // 2. Delete/remove the session
    console.log('Quitting session... TODO');
  };

  return (
    <>
      <Button isIconOnly variant="flat" size="sm" onPress={onOpen}>
        <FaAngleLeft />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Are you sure you want to quit the session?
              </ModalHeader>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={handleQuitSession}
                  as={Link}
                  href="/"
                >
                  Quit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
