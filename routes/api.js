import { TestController } from "../Http/Controllers/test.controller.js";
import { Router } from "express";

import authenticateBackend from "../Http/Middlewares/backend.middleware.js";

const router = Router();

router.post("/test", authenticateBackend, (req, res) => {
    TestController(req, res);
});

export default router;
 