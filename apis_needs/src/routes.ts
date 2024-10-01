import { AuthRouters } from "./apis/authentication";
import { ConversationRoutes } from "./apis/conversation/routes";

export function registerRoutes(app) {

    /* ------------------------------------------------Routes ------------------------------------------------
    
    /**
     * Authenticated routes
     */
    app.use("/api/v1/auth", AuthRouters);

    /**
     * Conversation Routes
     */
    app.use("/api/v1/conversations", ConversationRoutes);
  
}
