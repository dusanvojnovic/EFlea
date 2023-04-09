// src/server/router/context.ts
import type { inferAsyncReturnType } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { NodeHTTPCreateContextFnOptions } from "@trpc/server/adapters/node-http";
import EventEmitter from "events";
import { IncomingMessage } from "http";
import type { Session } from "next-auth";
import { getSession } from "next-auth/react";
import ws from "ws";
import { prisma } from "../db/client";

const ee = new EventEmitter();

type CreateContextOptions = {
  session: Session | null;
};

/** Use this helper for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 **/
export const createContextInner = async (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    prisma,
    ee,
  };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (
  opts:
    | CreateNextContextOptions
    | NodeHTTPCreateContextFnOptions<IncomingMessage, ws>
) => {
  const req = opts?.req;

  const session = await getSession({ req });

  return await createContextInner({
    session,
  });
};

export type Context = inferAsyncReturnType<typeof createContext>;
