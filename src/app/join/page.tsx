import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import Link from 'next/link';

export default function Join() {
  return (
    <>
      <Card className="p-5">
        <CardHeader>
          <Link href="/">Back</Link>
        </CardHeader>
        <CardBody className="flex items-center gap-3">
          Enter your session code
          <Input></Input>
          <Button color="primary">Join Session</Button>
        </CardBody>
      </Card>
    </>
  );
}
