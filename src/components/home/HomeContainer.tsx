'use client';

import StartSessionButton from '@/components/session_lobby/StartSessionButton';
import { Card, CardBody, CardHeader, Divider, Link } from '@nextui-org/react';

export default function HomeContainer() {
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