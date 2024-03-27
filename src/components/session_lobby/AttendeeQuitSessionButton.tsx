import EVENTS from '@/config/events';
import { useSocket } from '@/context/socket.context';
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
  const { socket, sessionCode } = useSocket();

  const handleQuitSession = () => {
    socket.emit(EVENTS.CLIENT.ATTENDEE_QUIT_SESSION, {
      sessionCode: sessionCode,
      userId: localStorage.getItem('userId'),
    });
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
