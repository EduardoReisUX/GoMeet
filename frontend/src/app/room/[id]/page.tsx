"use client";
import { Chat } from "@/components/Chat";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SocketContext } from "@/contexts/SocketContext";
import { useContext, useEffect, useRef, useState } from "react";

interface RoomPageProps {
  params: {
    id: string;
  };
}

export default function RoomPage({ params }: RoomPageProps) {
  const { socket } = useContext(SocketContext);
  const localStream = useRef<HTMLVideoElement>(null);
  const peerConnections = useRef<Record<string, RTCPeerConnection>>({});
  const [remoteStreams, setRemoteStreams] = useState<MediaStream[]>([]);
  const [videoMediaStream, setVideoMediaStream] = useState<MediaStream | null>(
    null
  );

  useEffect(() => {
    socket?.on("connect", async () => {
      debugger;

      socket?.emit("subscribe", {
        roomId: params.id,
        socketId: socket.id,
      });

      try {
        await initLocalCamera();
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

    socket?.on(
      "sdp",
      async (data: { description: RTCSessionDescription; sender: string }) => {
        debugger;

        const peerConnection = peerConnections.current[data.sender];

        if (data.description.type === "offer") {
          await peerConnection.setRemoteDescription(data.description);

          const answer = await peerConnection.createAnswer();
          await peerConnection.setLocalDescription(answer);

          socket.emit("sdp", {
            to: data.sender,
            sender: socket.id,
            description: peerConnection.localDescription,
          });
        }

        if (data.description.type === "answer") {
          await peerConnection.setRemoteDescription(
            new RTCSessionDescription(data.description)
          );
        }
      }
    );

    socket?.on(
      "ice candidates",
      async (data: { candidate: RTCIceCandidate; sender: string }) => {
        debugger;
        const peerConnection = peerConnections.current[data.sender];

        if (!data.candidate) return;

        await peerConnection.addIceCandidate(
          new RTCIceCandidate(data.candidate)
        );
      }
    );
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
    const peerConnection = peerConnections.current[socketId];

    if (videoMediaStream) {
      videoMediaStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, videoMediaStream);
      });
    } else {
      const video = await initRemoteCamera();

      video.getTracks().forEach((track) => {
        peerConnection.addTrack(track, video);
      });
    }

    if (createOffer) {
      debugger;
      const peerConnection = peerConnections.current[socketId];

      const offer = await peerConnection.createOffer();

      await peerConnection.setLocalDescription(offer);

      socket?.emit("sdp", {
        to: socketId,
        sender: socket.id,
        description: peerConnection.localDescription,
      });

      return;
    }

    // Capturar a mídia
    peerConnection.ontrack = (event) => {
      const remoteStream = event.streams[0];

      // const dataStream = {
      //   id: socketId,
      //   stream: remoteStream
      // }

      setRemoteStreams((prevState) => [...prevState, remoteStream]);
    };

    peer.onicecandidate = (event) => {
      if (event.candidate) {
        socket?.emit("ice candidates", {
          to: socketId,
          sender: socket.id,
          candidate: event.candidate,
        });
      }
    };
  };

  const initLocalCamera = async () => {
    const video = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: {
        noiseSuppression: true,
        echoCancellation: true,
      },
    });

    setVideoMediaStream(video);

    if (!localStream.current) return;

    localStream.current.srcObject = video;
  };

  const initRemoteCamera = async () => {
    const video = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: {
        noiseSuppression: true,
        echoCancellation: true,
      },
    });

    return video;
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
            {remoteStreams.map((stream, index) => {
              return (
                <div
                  className="bg-gray-950 w-full rounded-md h-full p-2 relative"
                  key={index}
                >
                  <video
                    className="h-full w-full"
                    autoPlay
                    ref={(video) => {
                      if (video && video.srcObject !== stream)
                        video.srcObject = stream;
                    }}
                  ></video>
                  <span className="absolute bottom-3">Eduardo F</span>
                </div>
              );
            })}
          </div>
        </div>
        <Chat roomId={params.id} />
      </main>

      <Footer
        videoMediaStream={videoMediaStream}
        peerConnections={peerConnections.current}
        localStream={localStream.current}
      />
    </div>
  );
}
