import Image from "next/image";
import { Container } from "./Container";

export function Header() {
  return (
    <>
      <header className="bg-gray-1000 p-4">
        <Container>
          <div className="flex justify-between">
            <Image alt="GoMeet" src="/chat.svg" width={80} height={80}></Image>
            <Image
              alt="Hero Code"
              src="/logo.svg"
              width={40}
              height={40}
            ></Image>
          </div>
        </Container>
      </header>
    </>
  );
}
