import { Header } from "@/components/Header";
import { Container } from "@/components/Container";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-col flex-1 mx-auto max-w-screen-sm w-full h-full justify-center">
        <Container>
          <div className="rounded-lg w-full max-w-screen-sm">
            <div className="flex justify-evenly">
              <span className="text-primary bg-secondary flex-1 py-2 rounded-lg rounded-b-none text-center">
                Ingressar
              </span>
              <span className="flex-1 py-2 rounded-lg rounded-b-none text-center">
                Nova Reunião
              </span>
            </div>
            <form className="space-y-8 bg-secondary p-14 pt-12">
              <Input type="text" placeholder="Digite o código da reunião" />
              <Input type="text" placeholder="ID da reunião" />
              <Button title={"Entrar"} />
            </form>
          </div>
        </Container>
      </main>
    </div>
  );
}
