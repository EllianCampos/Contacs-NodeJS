const sql = require('mssql')

const dbSettings = {
    user: 'ellian_SQLLogin_1',
    password: 'jbfq121ads',
    server: 'ellianSqlServerDB2.mssql.somee.com',
    database: 'ellianSqlServerDB2',
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