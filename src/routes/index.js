import express from "express";
import authRoutes from "./authRoutes.js";
import perfilRoutes from "./perfilRoutes.js";
import {home} from "../controllers/homeController.js";
import vacanteRoutes from "./vacanteRoutes.js";
import postulacionesRoutes from "./postulacionesRoutes.js";
import adminRoutes from "./adminRoutes.js";
const router = express.Router();

router.get("/", home);
router.use("/auth", authRoutes);
router.use("/perfil", perfilRoutes);
router.use("/postulaciones", postulacionesRoutes);
router.use("/vacantes", vacanteRoutes);
router.use("/admin", adminRoutes);

export default router;
