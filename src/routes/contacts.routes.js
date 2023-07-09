import { Router } from "express";

import {home, getAllContacts, createContact, getContactById, deleteContactById, getCountOfContacts, updateContactById} from '../controllers/contacts.controller'
import { verifyToken, verifyTokenURL } from "../lib/auth";

const router = Router()

router.get('/', verifyToken, home)

router.get('/contacts', verifyToken, getAllContacts)

router.post('/contacts', verifyToken, createContact)

router.get('/contacts/count', verifyToken, getCountOfContacts)

router.get('/contacts/:id', verifyToken, getContactById)

router.delete('/contacts/:id', verifyToken, deleteContactById)

router.put('/contacts/:id', verifyToken, updateContactById)

export default router