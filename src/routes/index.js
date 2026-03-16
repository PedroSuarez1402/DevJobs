import express from "express";
import authRoutes from "./authRoutes.js";
import perfilRoutes from "./perfilRoutes.js";
import {home} from "../controllers/homeController.js";
import { protegerRuta } from "../middlewares/authMiddleware.js";
import { formularioNuevaVacante } from "../controllers/vacantesController.js";

const router = express.Router();

router.get("/", home);
router.use("/auth", authRoutes);
router.use("/perfil", perfilRoutes);
router.use("/vacantes/nueva", protegerRuta, formularioNuevaVacante)

export default router;