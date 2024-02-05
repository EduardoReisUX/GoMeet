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
  const peerConnections = useRef<Record<string, RTCPeerConnection>>({});

  useEffect(() => {
    socket?.on("connect", async () => {
      debugger;

      socket?.emit("subscribe", {
        roomId: params.id,
        socketId: socket.id,
      });

      try {
        await initCamera();
      } catch (error) {
        console.log(error);
      }
    });

    socket?.on("new user", (data) => {
      debugger;
      createPeerConnection(data.socketId, true);
      socket.emit("newUserStart", {
        to: data.socketId,
        sender: socket.id,
      });
    });

    socket?.on("newUserStart", (data) => {
      debugger;
      createPeerConnection(data.sender, false);
    });

    socket?.on("sdp", (data) => {
      debugger;
    });
  }, [socket]);

  // WEB RTC PEER2PEER
  const createPeerConnection = async (
    socketId: string,
    createOffer: boolean
  ) => {
    const config = {
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    };

    const peer = new RTCPeerConnection(config);
    peerConnections.current[socketId] = peer;

    if (createOffer) {
      const peerConnection = peerConnections.current[socketId];
      const offer = await peerConnection.createOffer();

      await peerConnection.setLocalDescription(offer);

      socket?.emit("sdp", {
        to: socketId,
        sender: socket.id,
        description: peerConnection.localDescription,
      });
    }
  };

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
                className="h-full w-full mirror-mode"
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
