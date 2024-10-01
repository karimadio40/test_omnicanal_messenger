import { TelegramBotInstance } from "./Instances/telegram.intance";
import { Conversation } from '../../../entity/Conversation.entity';
import { DateTime } from "luxon";
import { CHANNEL_TYPE, CONVERSION_STATUS, SENDER_TYPE } from "../../../constants/conversation.constant";
import { AppDataSource } from "../../../data-source";
import { Message } from '../../../entity/Message.entity';
import { handleError, handleOkResponse } from "../../../helpers/handler/message.handler";
import { SocketIOEventPublisher } from "../../../SocketIO/SocketIOEventPublisher";
import { Staff } from '../../../entity/Staff.entity';

export class MessageController {
    sendSmsMessage(req, res) {
        //TODO:
    };
    sendWhatsAppMessage(req, res) {
        //TODO:
    };
    async sendTelegramMessage(req, res) {
        //TODO:

        let conversationId = req.body.conversationId
        let messageContent = req.body.messageContent
       try {
           let conversationRepository = AppDataSource.getRepository(Conversation)
           let messageRepository = AppDataSource.getRepository(Message)
           let bot = TelegramBotInstance
           let conversation = await conversationRepository.findOne({
               where: {
                   id: conversationId
               }
           })
           let message = new Message()
           message.channelType = CHANNEL_TYPE.TELEGRAM
           message.body = messageContent
           message.senderType = SENDER_TYPE.STAFF
           message.receiverType = SENDER_TYPE.CUSTOMER
           message.sender = conversation.staff.id.toString()
           message.receiver = conversation.customerInfo.userName
           let chatId = conversation.chatId
           message = await messageRepository.save(message)
           bot.sendMessage(chatId, 'Received your message');

           return handleOkResponse(res,message)
       } catch (error) {
        return handleError(res,error)
       }

    };
    sendMessengerMessage(req, res) {
        //TODO:
    };

    receiveSmsMessage(req, res) {
        //TODO:
    };
    receiveWhatsAppMessage(req, res) {
        //TODO:

    };
    static async receiveTelegramMessage() {
        let conversationRepository = AppDataSource.getRepository(Conversation)
        let messageRepository = AppDataSource.getRepository(Message)
        let bot = TelegramBotInstance
        await bot.on('message', async (msg) => {
            const chatId = msg.chat.id;
            let conversationExist = await conversationRepository.findOne({
                where: {
                    customerInfo: {
                        userName: msg.chat?.username
                    },
                    channelType: CHANNEL_TYPE.TELEGRAM
                }
            })

            let message = new Message()
            message.channelType = CHANNEL_TYPE.TELEGRAM
            message.body = msg.text
            message.sender = msg.from?.username
            message.receiver = msg.chat?.username

            if (conversationExist){
                message.conversation = conversationExist
                SocketIOEventPublisher.publishEvent("PLATFORM_NOTIFICATION_TOPIC", message );
                return true
            }else{

                let conversation = new Conversation()
                conversation.startTime = DateTime.now().toJSDate()
                conversation.channelType = CHANNEL_TYPE.TELEGRAM
                conversation.title = msg.chat?.username
                let staff = await AppDataSource.getRepository(Staff).findOne({
                    where:{
                        isVerify:true
                    }
                })

                conversation.staff = staff

                conversation.customerInfo = {
                    firstName: msg.chat?.first_name,
                    lastName: msg.chat?.last_name,
                    userName: msg.chat?.username,
                }

                conversation.startTime = DateTime.now().toJSDate()
                conversationExist = await conversationRepository.save(conversation)
                
            }

        });
    };

    receiveMessengerMessage(req, res) {
        //TODO:
    };
}