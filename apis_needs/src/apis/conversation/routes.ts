import { Router } from "express";
import { ConversationController } from "./controller/conversation.controller";
import { isAuthorized } from "../authentication/middleware/auth.middleware";

var router = Router();


router.get('/getConversationTurnTime', isAuthorized, ConversationController.getConversationTurnTime);
router.get('/getConversations', isAuthorized, ConversationController.getConversations);
router.get('/getConversationsByChannel', isAuthorized, ConversationController.getConversationsByChannel);
router.post('/closeConversation', isAuthorized, ConversationController.closeConversation);

export const ConversationRoutes = router