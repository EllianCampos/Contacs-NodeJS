// import { Int } from 'mssql'
import { getConnection, sql } from '../database/connection'

export const getAllContacts = async (req, res) => {
    try{
        const pool = await getConnection()
        const result = await pool.request().query('SELECT * FROM Contacts')
        res.json(result.recordset)
    }catch{
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
        .query('INSERT INTO Contacts VALUES (@namex, @phonex)')

        res.json({name, phone})
    } catch (error) {
        res.status(500)
        res.send(error.message)
    } 
}

export const getContactById = async (req, res) => {
    const {id} = req.params

    const pool = await getConnection()
    
    const result = await pool.request()
    .input('idx', id)
    .query('SELECT * FROM Contacts WHERE id_contact = @idx')

    res.send(result.recordset[0])
}

export const deleteContactById = async (req, res) => {
    const {id} = req.params

    const pool = await getConnection()
    
    const result = await pool.request()
    .input('idx', id)
    .query('DELETE FROM Contacts WHERE id_contact = @idx')

    res.sendStatus(204)
}

export const getCountOfContacts = async (req, res) => {
    const pool = await getConnection()
    
    const result = await pool.request()
    .query('SELECT COUNT(*) FROM Contacts')

    res.json(result.recordset[0][''])
}

export const updateContactById = async (req, res) => {
    const {name, phone} = req.body
    const {id} = req.params

    if (name == null || phone == null) {
        return res.status(400).json({msg: 'Invalid request, Please fill al fields'})
    }

    const pool = await getConnection()

    await pool.request()
        .input('namex', sql.VarChar, name)
        .input('phonex', sql.VarChar, phone)
        .input('idx', sql.Int, id)
        .query('UPDATE Contacts SET name_contact = @namex, phone_contact = @phonex WHERE id_contact = @idx')

    res.json({name, phone})
}