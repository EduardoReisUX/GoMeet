import { Header } from "@/components/Header";
import { Container } from "@/components/Container";
import { FormWrapper } from "@/components/FormWrapper";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-col flex-1 mx-auto max-w-screen-sm w-full h-full justify-center">
        <Container>
          <FormWrapper />
        </Container>
      </main>
    </div>
  );
}
