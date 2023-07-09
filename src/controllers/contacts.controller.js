// import { Int } from 'mssql'
import { getConnection, sql } from '../database/connection'

export const home = async (req, res) => {
    try{
        const pool = await getConnection()
        const result = await pool.request()
        .input('idx', sql.Int, req.userId)
        .query('SELECT * FROM Contacts where id_user = @idx')
        res.render('main',{contactsOfTheUser:result.recordset})
    }catch (error){
        res.send(error.message)
    }
}

export const getAllContacts = async (req, res) => {
    try{
        const pool = await getConnection()
        const result = await pool.request()
        .input('idx', sql.Int, req.userId)
        .query('SELECT * FROM Contacts where id_user = @idx')
        res.json(result.recordset)
    }catch (error){
        res.send(error.message)
    }
}

export const createContact = async (req, res) => {
    const {name, phone} = req.body

    if (name == null || phone == null) {
        return res.status(400).json({msg: 'Invalid request, Please fill al fields'})
    }

    const pool = await getConnection()

    try {
        await pool.request()
        .input('namex', sql.VarChar, name)
        .input('phonex', sql.Text, phone)
        .input('idx', sql.Int, req.userId)
        .query('INSERT INTO Contacts (name_contact, phone_contact, id_user) VALUES (@namex, @phonex, @idx)')

        // res.json({name, phone})
        res.redirect('/home')
    } catch (error) {
        res.status(500)
        res.send(error.message)
    } 
}

export const getContactById = async (req, res) => {
    const id_contact = req.params.id

    const pool = await getConnection()
    
    const result = await pool.request()
    .input('id_contactx', sql.Int, id_contact)
    .input('id_userx', sql.Int, req.userId)
    .query('SELECT * FROM Contacts WHERE id_contact = @id_contactx AND id_user = @id_userx')
    
    res.send(result.recordset)
}

export const deleteContactById = async (req, res) => {
    const id_contact = req.params.id

    const pool = await getConnection()
    
    const result = await pool.request()
    .input('id_contactx', sql.Int, id_contact)
    .input('id_userx', sql.Int, req.userId)
    .query('DELETE FROM Contacts WHERE id_contact = @id_contactx AND id_user = @id_userx')
    res.json({ok: true})
}

export const getCountOfContacts = async (req, res) => {
    const pool = await getConnection()
    
    const result = await pool.request()
    .input('id_userx', sql.Int, req.userId)
    .query('SELECT COUNT(*) FROM Contacts WHERE id_user = @id_userx')

    res.json(result.recordset[0][''])
}

export const updateContactById = async (req, res) => {
    const {name, phone} = req.body
    const id_contact = req.params.id

    if (name == null || phone == null) {
        return res.status(400).json({msg: 'Invalid request, Please fill al fields'})
    }

    const pool = await getConnection()

    await pool.request()
        .input('namex', sql.VarChar, name)
        .input('phonex', sql.VarChar, phone)
        .input('id_contactx', sql.Int, id_contact)
        .input('id_userx', sql.Int, req.userId)
        .query('UPDATE Contacts SET name_contact = @namex, phone_contact = @phonex WHERE id_contact = @id_contactx AND id_user = @id_userx')
    res.json({ok: true})
    // res.redirect('/home')
    // res.json({name, phone})
}