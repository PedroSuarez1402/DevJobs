import express from 'express';
import { panelPrincipal } from '../controllers/adminController.js';
import { protegerRuta } from '../middlewares/authMiddleware.js';
import verificarAdmin from '../middlewares/verificarAdmin.js';

const router = express.Router();

router.use(protegerRuta);
router.use(verificarAdmin);

router.get('/', panelPrincipal);

export default router;
