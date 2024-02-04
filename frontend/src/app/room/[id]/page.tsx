"use client";
import { Chat } from "@/components/Chat";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SocketContext } from "@/contexts/SocketContext";
import { useContext, useEffect, useRef } from "react";

interface RoomPageProps {
  params: {
    id: string;
  };
}

export default function RoomPage({ params }: RoomPageProps) {
  const { socket } = useContext(SocketContext);
  const localStream = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    socket?.on("connection", async () => {
      console.log("logou");
      socket?.emit("subscribe", {
        roomId: params.id,
        socketId: socket.id,
      });
      await initCamera();
    });
  }, [socket]);

  const initCamera = async () => {
    const video = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: {
        noiseSuppression: true,
        echoCancellation: true,
      },
    });

    if (!localStream.current) return;

    localStream.current.srcObject = video;
  };

  return (
    <div className="h-screen">
      <Header />

      <main className="flex h-[80%]">
        <div className="w-full m-3 md:w-[85%]">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="bg-gray-950 w-full rounded-md h-full p-2 relative">
              <video
                className="h-full w-full"
                ref={localStream}
                autoPlay
                playsInline
              ></video>
              <span className="absolute bottom-3">Eduardo F</span>
            </div>
            <div className="bg-gray-950 w-full rounded-md h-full p-2 relative">
              <video className="h-full w-full"></video>
              <span className="absolute bottom-3">Eduardo F</span>
            </div>
            <div className="bg-gray-950 w-full rounded-md h-full p-2 relative">
              <video className="h-full w-full"></video>
              <span className="absolute bottom-3">Eduardo F</span>
            </div>
          </div>
        </div>
        <Chat roomId={params.id} />
      </main>

      <Footer />
    </div>
  );
}
