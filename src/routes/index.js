import express from "express";
import authRoutes from "./authRoutes.js";
import {home} from "../controllers/homeController.js";

const router = express.Router();

router.get("/", home);
router.use("/auth", authRoutes);

export default router;