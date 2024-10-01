import { Router } from "express";
import { AuthController } from "./controller/auth.controller";

export class Routes {
    public static setAuthRoutes(router) {
        router.post("/signUp", AuthController.signUp);
        router.post('/login', AuthController.login);
        router.post('/signOut', AuthController.signOut);
    }
}