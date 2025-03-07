import express from 'express'
const router = express.Router()
import { login, logout, signup, updateProfile,  } from '../controllers/auth.controller'
import { protectRoute } from '../middeleware/auth.middleware'


router.post('/signup', signup)

router.post('/login', login)

router.post('/logout', logout)

router.put("/update-profile", protectRoute, updateProfile)


export default router;