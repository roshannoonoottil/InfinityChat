import express from 'express'
import { protectRoute } from '../middeleware/auth.middleware';
import { getMessages, getUserForSidebar, sendMessage } from '../controllers/message.controller';
const router = express.Router();


router.get('/user', protectRoute, getUserForSidebar)
router.get('/:id', protectRoute, getMessages)
router.post('/send/:id', protectRoute, sendMessage)

export default router;