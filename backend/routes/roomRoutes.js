import express from 'express';
import * as roomController from '../controllers/roomController.js';

const router = express.Router();

router.route('/messages').post(roomController.getMsgThread);
router.route('/messages/add').post(roomController.addMessage);

export default router;