import Image from "next/image";

export function Chat() {
  const date = new Date();
  const hours = date.getHours().toString();
  const minutes = date.getMinutes().toString();

  return (
    <aside className="relative h-full bg-[#2C2C2C] px-4 pt-4 w-[20%] rounded-md m-3 hidden md:block md:w-[15%]">
      <div className="relative h-full">
        <div className="bg-gray-950 rounded p-2">
          <header className="flex text-primary justify-between">
            <b>Eduardo F</b>
            <time>
              {hours}:{minutes}
            </time>
          </header>
          <p className="mt-5 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, eos?
          </p>
        </div>

        <form action="" className="absolute bottom-2 w-full">
          <div className="flex relative">
            <input
              type="text"
              className="px-3 py-2  bg-gray-950 rounded-md h-full w-full"
              placeholder="Enviar mensagem"
            />
            <Image
              className="absolute right-2 top-2 cursor-pointer"
              src="/send.svg"
              width={20}
              height={20}
              alt="Enviar mensagem"
            ></Image>
          </div>
        </form>
      </div>
    </aside>
  );
}
