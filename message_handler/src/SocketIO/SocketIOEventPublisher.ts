import { SocketIOInstance } from "./SocketIOInstance";


export class SocketIOEventPublisher {

    constructor() {
    }

    public static publishEvent(eventType: string, eventMessage: any): void {
        try {
            const io = SocketIOInstance.getInstance().io;

            const topicName = `PLATFORM_NOTIFICATION_TOPIC_${eventMessage?.restaurantId?.toString()}`;

            if (io) {
                io.to(topicName).emit(`CHANNEL_EVENT:${eventType}`, eventMessage);
            } else {
                throw new Error('Socket.IO instance not available.');
            }
        } catch (error) {
            console.error('Error publishing event:', error);
        }
    }

}
