import StartSessionButton from '@/components/StartSessionButton';
import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Card className="p-5">
        <CardHeader className="flex items-center">
          <h4 className="text-large font-large">
            Welcome to BetterAttendance!
          </h4>
        </CardHeader>
        <CardBody className="flex items-center">
          <StartSessionButton />
          <Divider className="my-4" />
          <Link href="join" className="text-blue-700">
            I have a code
          </Link>
        </CardBody>
      </Card>
    </>
  );
}
