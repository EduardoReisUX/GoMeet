import express, { Application } from "express";
import http from "http";
import { Server, Socket } from "socket.io";

export class App {
  private app: Application;
  private http: http.Server;
  private io: Server;

  constructor() {
    this.app = express();
    this.http = new http.Server(this.app);
    this.io = new Server(this.http, {
      cors: {
        origin: "*",
      },
    });
  }

  public listen() {
    this.http.listen(3333, () => console.log("Server running on port 3333"));
  }

  public listenSocket() {
    this.io.of("/streams").on("connect", this.socketEvents);
  }

  private socketEvents(socket: Socket) {
    console.log(`Socket connected: ${socket.id}`);

    socket.on("subscribe", (data) => {
      socket.join(data.roomId);
      socket.join(data.socketId);

      const roomsSession = Array.from(socket.rooms);

      if (roomsSession.length > 1) {
        socket.to(data.roomId).emit("new user", {
          socketId: socket.id,
          username: data.username,
        });
      }
    });

    socket.on("newUserStart", (data) => {
      debugger;
      socket.to(data.to).emit("newUserStart", {
        sender: data.sender,
      });
    });

    socket.on("sdp", (data) => {
      socket.to(data.to).emit("sdp", {
        description: data.description,
        sender: data.sender,
      });
    });

    socket.on("ice candidates", (data) => {
      socket.to(data.to).emit("ice candidates", {
        candidate: data.candidate,
        sender: data.sender,
      });
    });

    socket.on("chat", (data) => {
      socket.broadcast.to(data.roomId).emit("chat", {
        message: data.message,
        username: data.username,
        time: data.time,
      });
    });

    socket.on("disconnect", () => {
      socket.disconnect();
    });
  }
}
