import { CONVERSION_STATUS } from "../../../constants/conversation.constant"
import { AppDataSource } from "../../../data-source"
import { Conversation } from '../../../entity/Conversation.entity';
import { handleInvalidInput, handleOkResponse } from "../../../helpers/handler/message.handler"

export class ConversationController {
    static async getConversations(req,res) {
        let staffId = req.query.staffId
        if (!staffId) {
            return handleInvalidInput(res, "channelType is required")
        }

        let conversationRepository = AppDataSource.getRepository(Conversation)

        let conversations = await conversationRepository.find({
            where: {
                staff: { id: staffId }
            }
        })

        return handleOkResponse(res, conversations)
    }

    static async getConversationsByChannel(req,res) {
        let channelType = req.query.channelType
        let staffId = req.query.staffId
        if (!channelType || !staffId){
            return handleInvalidInput(res,"channelType is required")
        }
        let conversationRepository = AppDataSource.getRepository(Conversation)

        let conversations = await conversationRepository.find({
            where: {
                channelType: channelType,
                staff: { id: staffId }
            }
        })

        return handleOkResponse(res,conversations)

    }

    static async getConversationTurnTime(req,res) {
        let conversationId = req.query.conversationId
        if (!conversationId){
            return handleInvalidInput(res,"conversation ID is required")
        }
        let conversationRepository = AppDataSource.getRepository(Conversation)

        let conversation = await conversationRepository.findOne({
            where: {
                id: conversationId,
            }
        })

        if (!conversation) {
            return handleInvalidInput(res, "Conversation not found")
        }
        let totalTime = conversation.endTime.getTime() - conversation.startTime.getTime()

        return handleOkResponse(res, totalTime)
    }

    static async closeConversation(req, res) {
        let conversationId = req.body.conversationId
        let closeTime = req.body.closeTime
        
        if (!conversationId) {
            return handleInvalidInput(res, "conversationId is required")
        }
        let conversationRepository = AppDataSource.getRepository(Conversation)

        let conversation:Conversation = await conversationRepository.findOne(conversationId)
        if (!conversation) {
            return handleInvalidInput(res, "Conversation not found")
        }
        conversation.status = CONVERSION_STATUS.CLOSED
        conversation.endTime = new Date(closeTime)
        await conversationRepository.save(conversation)
    }

}