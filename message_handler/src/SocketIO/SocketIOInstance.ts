import {Server} from 'socket.io';
import {Server as HTTPServer} from 'http';
import { AppDataSource } from "../data-source";
import { Staff } from "../entity/Staff.entity";

export class SocketIOInstance {
    private static instance: SocketIOInstance;
    private readonly _io: Server;

    private constructor(httpServer: HTTPServer) {
        this._io = new Server(httpServer, {
            cors: {
                origin: '*',
                credentials: true
            }
        });

        this.initializeConnection();
    }

    public static initInstance(httpServer: HTTPServer) {
        if (!SocketIOInstance.instance) {
            SocketIOInstance.instance = new SocketIOInstance(httpServer);
        }
    }

    public static getInstance(): SocketIOInstance {
        return SocketIOInstance.instance;
    }

    private initializeConnection(): void {

        this._io.use(async (socket: any, next) => {

            const auth: { staffId: string, topic: string } = socket.handshake.auth;

            if (!auth) {
                return next(new Error("unauthorized"));
            }

            let staff = await AppDataSource.getRepository(Staff).findOne({
                where:{
                    id: parseInt(auth.staffId)
                }
            })

            if (!staff) {
                return next(new Error("Unauthorized"));
            }

            let staffId = staff.id
            const subscribeToTopic: string = auth.topic || "";
            const topicName = `${subscribeToTopic}_${staffId?.toString()}`;
            console.log(`${socket.id} joined topic ${topicName} `);
            socket.userId = staffId;
            socket.join(topicName);
            next();
        });

        this._io.on("connection", (socket) => {

            // console.log(`scoket ${socket.id} connected`);
            socket.on("error", (err) => {
                if (err && err.message === "unauthorized") {
                    socket.emit("connect_error", err.message);
                    socket.disconnect();
                }
                console.log(`${socket.id} disconnected`);
            });

            socket.emit("connected", `${socket.id} connected`);

            //require("./PubSub/socketio").default(socket);
        });
    }

    public get io(): Server {
        return this._io;
    }
}
