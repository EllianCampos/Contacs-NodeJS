import { Router } from "express";

import {getAllContacts, createContact, getContactById, deleteContactById, getCountOfContacts, updateContactById} from '../controllers/contacts.controller'

const router = Router()

router.get('/contacts', getAllContacts)

router.post('/contacts', createContact)

router.get('/contacts/count', getCountOfContacts)

router.get('/contacts/:id', getContactById)

router.delete('/contacts/:id',deleteContactById)

router.put('/contacts/:id', updateContactById)

export default router