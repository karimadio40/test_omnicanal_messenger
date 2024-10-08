import { AppDataSource } from "./data-source"
import express, { NextFunction, Request, Response } from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import { registerRoutes } from "./routes";
import path from "path";
import fs from "fs";
import * as dotenv from 'dotenv';
import logger from 'morgan';
import { swaggerDocs } from './swagger';

export class App {

    public static async runCluster() {
        try {
            const app = express();
            const httpServer = http.createServer(app);

            const envFile = path.join(`${__dirname}/.env/.env`);

            if (fs.existsSync(envFile)) {
                const result = dotenv.config({ debug: false, path: envFile });

                if (result.error) {
                    throw result.error;
                }
            }

            await App.init(app, httpServer);

            registerRoutes(app);

            try {
                await AppDataSource.initialize()
                console.log("database initialized");
                httpServer.listen(process.env.API_PORT, () => {
                    swaggerDocs(app, process.env.API_PORT)
                    console.log(`Server running on port ${process.env.API_PORT}`);
                });
            } catch (e) {
                console.log(`Server initialization failed`);
                console.error(e);
            }

            return app;

        } catch (e) {
            console.error("App error", e);
        }
    }

    private static async init(app: express.Express, httpServer: http.Server) {
        app.use(cors({
            origin: '*'
        }));

        app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Credentials", "true");
            res.header(
                "Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept"
            );
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            next();
        });
        app.use(bodyParser.json({
            limit: '200mb',
            verify: function (req: any, res: any, buf) {
            }
        }));

        app.use(logger("dev"));
        app.use(bodyParser.urlencoded({
            extended: true
        }));

        app.use(express.urlencoded({ extended: false }));
    }

}

