"use client";

import { FormEvent, useRef, useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";

function RenderForm({ selectedRoom }: { selectedRoom: "join" | "create" }) {
  const name = useRef<HTMLInputElement>(null);
  const id = useRef<HTMLInputElement>(null);

  function generateRandomString() {
    const randomString = Math.random().toString(36).substring(2, 7);
    return randomString;
  }

  function createRoom(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name.current || name.current.value.trim() === "") {
      return;
    }

    sessionStorage.setItem("username", name.current.value.trim());

    const roomId = generateRandomString();

    window.location.href = `/room/${roomId}`;
  }

  function joinRoom(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name.current || name.current.value.trim() === "") {
      return;
    }

    if (!id.current || id.current.value.trim() === "") {
      return;
    }

    sessionStorage.setItem("username", name.current.value.trim());

    const roomId = id.current.value;

    window.location.href = `/room/${roomId}`;
  }

  if (selectedRoom === "join") {
    return (
      <form
        className="space-y-8 bg-secondary p-14 pt-12"
        onSubmit={(e) => joinRoom(e)}
      >
        <Input type="text" placeholder="Seu nome" ref={name} />
        <Input type="text" placeholder="ID da reunião" ref={id} />
        <Button title={"Entrar"} />
      </form>
    );
  }

  return (
    <form
      className="space-y-8 bg-secondary p-14 pt-12"
      onSubmit={(e) => createRoom(e)}
    >
      <Input type="text" placeholder="Seu nome" ref={name} />
      <Button title={"Entrar"} />
    </form>
  );
}

export function FormWrapper() {
  const [selectedRoom, setSelectedRoom] = useState<"join" | "create">("join");

  return (
    <div className="rounded-lg w-full max-w-screen-sm">
      <div className="flex justify-evenly">
        <button
          onClick={() => setSelectedRoom("join")}
          className={`flex-1 py-2 rounded-lg rounded-b-none text-center ${
            selectedRoom === "join" && "text-primary bg-secondary"
          }`}
        >
          Ingressar
        </button>
        <button
          onClick={() => setSelectedRoom("create")}
          className={`flex-1 py-2 rounded-lg rounded-b-none text-center ${
            selectedRoom === "create" && "text-primary bg-secondary"
          }`}
        >
          Nova Reunião
        </button>
      </div>
      <RenderForm selectedRoom={selectedRoom} />
    </div>
  );
}
