const sql = require('mssql')

const dbSettings = {
    user: 'elliandev',
    password: 'egcc',
    server: 'localhost',
    database: 'webdb',
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
      }
}

export async function getConnection(){
    try {
        const pool = await sql.connect(dbSettings)
        return pool
    } catch (error) {
        console.error(error)
    }
}

export {sql}