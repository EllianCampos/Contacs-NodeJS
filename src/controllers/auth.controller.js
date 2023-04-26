import config from '../config'
import {encryptPassword, comparePassword} from '../lib/password'
import { getConnection, sql } from '../database/connection'
import jwt from 'jsonwebtoken'

export const getAllUsers = async (req, res) =>{
    try{
        const pool = await getConnection()
        const result = await pool.request().query('SELECT * FROM UsersContactsDB')
        res.json(result.recordset)
    }catch (error){
        res.send(error.message)
    }
}

export const singUp = async (req, res) => {
    const {username, password} = req.body

    if (username == null || password == null) {
        return res.status(400).json({msg: 'Invalid request, Please fill al fields'})
    }

    const encryptedPassword = await encryptPassword(password)
 
    const pool = await getConnection()

    try {
        const result = await pool.request()
        .input('namex', sql.VarChar, username)
        .input('passwordx', sql.Text, encryptedPassword)
        .query('INSERT INTO UsersContactsDB VALUES (@namex, @passwordx); SELECT SCOPE_IDENTITY() AS id')

        // const id_contact = result.recordset[0].id

        // const token = jwt.sign({id:id_contact}, 'SECRET',{expiresIn:86400})

        res.json({OK:true})
    } catch (error) {
        res.status(500)
        res.send(error.message)
    } 
}

export const singIn = async (req, res) => {
    // Destructuring
    const {id, username, password} = req.body

    // Consulta a la base de datos
    const pool = await getConnection()
    
    const result = await pool.request()
    .input('idx', id)
    .query('SELECT * FROM UsersContactsDB WHERE id_user = @idx')

    // Validar usuario
    if (result.rowsAffected == 0) {
        return res.status(400).json({message:"User not found"})
    } else if (result.recordset[0].name_user != username){
        return res.status(400).json({message:"User no match with the id"})
    }

    // Validar contraseña
    const matchPassword = await comparePassword(password, result.recordset[0].password_user)
    if (!matchPassword) return res.status(401).json({token:null, message:'Invalid password'})
    
    // General token
    const token = jwt.sign({id}, config.SECRET,{expiresIn:config.TOKENSEXPIRTATIONSECONS})

    res.json({token})
}