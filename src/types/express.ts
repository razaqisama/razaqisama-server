import { Request as ExpressRequest } from "express";

export type AuthRequest = ExpressRequest & {
  userId?: string;
};