import { Router } from "express";

const router = Router()

import * as authController from '../controllers/auth.controller'
import { getAllContacts } from "../controllers/contacts.controller";

router.get('', authController.getAllUsers)

router.post('/singup', authController.singUp)

router.post('/singin', authController.singIn)

export default router