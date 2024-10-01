import { AuthRouters } from "./apis/authentication";

export function registerRoutes(app) {

    /* ------------------------------------------------Routes ------------------------------------------------
    
    /**
     * Authenticated routes
     */
    app.use("/api/v1/auth", AuthRouters);

    /**
     * Authenticated routes
     */
    // app.use("/api/v1/api", );
  
}
