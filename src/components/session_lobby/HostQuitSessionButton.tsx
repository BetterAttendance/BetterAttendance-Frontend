import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Link,
} from '@nextui-org/react';
import { FaAngleLeft } from 'react-icons/fa6';
import { useSocket } from '../../context/socket.context';
import EVENTS from '@/config/events';
import { useParams } from 'next/navigation';

export default function HostQuitSessionButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { socket } = useSocket();
  const { sessionCode } = useParams();

  const handleQuitSession = () => {
    // TODO: Handle quit session
    // 1. Disconnect all users in session
    // 2. Delete/remove the session
    socket.emit(EVENTS.CLIENT.HOST_QUIT_SESSION, {
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
              <ModalBody>
                <p className="text-sm">
                  Quitting the session will disconnect all attendees and you
                  will lose your current session.
                </p>
              </ModalBody>
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
