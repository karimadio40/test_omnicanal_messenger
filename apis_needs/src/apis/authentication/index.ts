import express from 'express';
import { Routes } from "./routes";

let authRouter = express.Router();

Routes.setAuthRoutes(authRouter);

export const AuthRouters = authRouter;