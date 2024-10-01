export interface IMessageService {
    sendSmsMessage(msg:any):void;
    sendWhatsAppMessage(msg:any):void;
    sendTelegramMessage(msg:any):void;
    sendMessengerMessage(msg:any):void;

    receiveSmsMessage(msg: any): void;
    receiveWhatsAppMessage(msg: any): void;
    receiveTelegramMessage(msg: any): void;
    receiveMessengerMessage(msg: any): void;
}