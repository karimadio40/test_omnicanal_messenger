import {SocketIOInstance} from "./SocketIOInstance";

export class SocketIOEventHandler {

    public static async handleEvents(socket) {
        const io = SocketIOInstance.getInstance().io;
        const sockets = await io.fetchSockets();
    }
}