import ws from "ws";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import { appRouter } from "./trpc/router/_app";
import { createContext } from "./trpc/context";

export const wss = new ws.Server({
  port: 3001,
});

const handler = applyWSSHandler({ wss, createContext, router: appRouter });

wss.on("connection", (ws) => {
  console.log(`++ ws connection ${wss.clients.size}`);

  ws.once("close", () => {
    console.log(`-- ws connection ${wss.clients.size}`);
  });
});

console.log("ws server started");

process.on("SIGTERM", () => {
  console.log("SIGTERM");
  handler.broadcastReconnectNotification();

  wss.close();
});
