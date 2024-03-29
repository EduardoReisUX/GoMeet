"use client";
import { useState } from "react";
import { Container } from "./Container";
import Image from "next/image";

const width = 16;
const height = 16;

interface FooterProps {
  videoMediaStream: MediaStream | null;
  peerConnections: Record<string, RTCPeerConnection>;
  localStream: HTMLVideoElement | null;
  logout: () => void;
}

export function Footer({
  videoMediaStream,
  peerConnections,
  localStream,
  logout,
}: FooterProps) {
  const date = new Date();
  const hours = date.getHours().toString();
  const minutes = date.getMinutes().toString();

  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const toggleMuted = () => {
    setIsMuted(!isMuted);
    videoMediaStream?.getAudioTracks().forEach((track) => {
      track.enabled = !isMuted;
    });

    Object.values(peerConnections).forEach((peerConnection) => {
      peerConnection.getSenders().forEach((sender) => {
        if (sender.track?.kind === "audio") {
          sender.replaceTrack(
            videoMediaStream
              ?.getAudioTracks()
              .find((track) => track.kind === "audio") || null
          );
        }
      });
    });
  };

  const toggleCamera = () => {
    setIsCameraOff(!isCameraOff);
    videoMediaStream?.getVideoTracks().forEach((track) => {
      track.enabled = !isCameraOff;
    });

    Object.values(peerConnections).forEach((peerConnection) => {
      peerConnection.getSenders().forEach((sender) => {
        if (sender.track?.kind === "video") {
          sender.replaceTrack(
            videoMediaStream
              ?.getVideoTracks()
              .find((track) => track.kind === "video") || null
          );
        }
      });
    });
  };

  const toggleScreenSharing = async () => {
    if (!isScreenSharing) {
      const videoShareScreen = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });

      if (localStream?.srcObject) {
        localStream.srcObject = videoShareScreen;
      }

      Object.values(peerConnections).forEach((peerConnection) => {
        peerConnection.getSenders().forEach((sender) => {
          if (sender.track?.kind === "video") {
            sender.replaceTrack(videoShareScreen.getVideoTracks()[0]);
          }
        });
      });

      setIsScreenSharing(!isCameraOff);
      return;
    }

    if (localStream?.srcObject) {
      localStream.srcObject = videoMediaStream;
    }

    Object.values(peerConnections).forEach((peerConnection) => {
      peerConnection.getSenders().forEach((sender) => {
        if (sender.track?.kind === "video") {
          sender.replaceTrack(videoMediaStream?.getVideoTracks()[0] || null);
        }
      });
    });

    setIsScreenSharing(!isCameraOff);
  };

  return (
    <footer className="fixed bottom-0 bg-black py-2 w-full">
      <Container>
        <section className="grid grid-cols-3 w-full items-center">
          <time className="font-medium text-2xl">
            {hours}:{minutes}
          </time>
          <div className="flex items-center justify-center space-x-3">
            <button
              className="px-4 py-2 rounded-lg bg-gray-950"
              onClick={toggleMuted}
            >
              {isMuted ? (
                <>
                  <Image
                    className="h-6 w-8"
                    alt="GoMeet"
                    src="/no-microphone.svg"
                    width={width}
                    height={height}
                  ></Image>
                </>
              ) : (
                <Image
                  className="h-6 w-8"
                  alt="GoMeet"
                  src="/microphone.svg"
                  width={width}
                  height={height}
                ></Image>
              )}
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-gray-950"
              onClick={toggleCamera}
            >
              {isCameraOff ? (
                <Image
                  className="h-6 w-8"
                  alt="GoMeet"
                  src="/no-cam.svg"
                  width={width}
                  height={height}
                ></Image>
              ) : (
                <Image
                  className="h-6 w-8"
                  alt="GoMeet"
                  src="/cam.svg"
                  width={width}
                  height={height}
                ></Image>
              )}
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-gray-950"
              onClick={toggleScreenSharing}
            >
              {isScreenSharing ? (
                <Image
                  className="h-6 w-8"
                  alt="GoMeet"
                  src="/no-computer.svg"
                  width={width}
                  height={height}
                ></Image>
              ) : (
                <Image
                  className="h-6 w-8"
                  alt="GoMeet"
                  src={`/computer.svg`}
                  width={width}
                  height={height}
                ></Image>
              )}
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/80"
              onClick={logout}
            >
              <Image
                className="h-6 w-8"
                alt="GoMeet"
                src="/phone.svg"
                width={width}
                height={height}
              ></Image>
            </button>
          </div>
        </section>
      </Container>
    </footer>
  );
}
