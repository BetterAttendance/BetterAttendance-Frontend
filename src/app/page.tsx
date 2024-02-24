import StartSessionButton from '@/components/StartSessionButton';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      Welcome to BetterAttendance!
      <StartSessionButton />
    </main>
  );
}
