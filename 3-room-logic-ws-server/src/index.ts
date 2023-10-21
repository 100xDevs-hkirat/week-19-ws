import express from "express";
import http from "http";
import { WebSocketServer } from "ws";

const app = express();
const port = 3000;

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

const users: { [key: string]: {
    room: string;
    ws: any;
} } = {};

let counter = 0;

wss.on("connection", async (ws, req) => {
    const wsId = counter++;
    ws.on("message", (message: string) => {
        const data = JSON.parse(message.toString());
        if (data.type === "join") {
            users[wsId] = {
                room: data.payload.roomId,
                ws
            };
        }

        if (data.type === "message") {
            const roomId = users[wsId].room;
            const message = data.payload.message;

            Object.keys(users).forEach((wsId) => {
                if (users[wsId].room === roomId) {
                    users[wsId].ws.send(JSON.stringify({
                        type: "message",
                        payload: {
                            message
                        }
                    }));
                }
            })
        }
    });
});

server.listen(port);