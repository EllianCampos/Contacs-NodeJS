import Jwt from "jsonwebtoken"
import config from "../config"
import { getConnection, sql } from '../database/connection'

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"] || req.params.token || req.cookies.token

        // Validar que venga un token
        if (!token) return res.status(403).json({message:"No token provided"})
    
        // Decodificar el token
        const decoded = Jwt.verify(token,config.SECRET)
        req.userId = decoded.id
    
        // Encontrar el usuario asociado al token
        const pool = await getConnection()
    
        const result = await pool.request()
        .input('idx', req.userId)
        .query('SELECT * FROM Users WHERE id_user = @idx')
    
        // Validar si el usuario existe
        if (result.rowsAffected == 0) {
            return res.status(400).json({message:"User not found"})
        } /*else if (result.recordset[0].name_user != username){
            return res.status(400).json({message:"User no match with the id"})
        }*/
        
        // Siguiente funcion en la rutas
        next()   

    } catch (error) {
        console.log(error)
        return res.status(401).json({message: 'Unauthorized'})
    }
}