import {config} from 'dotenv'

config()

export default{
    port: process.env.PORT || 3000,
    SECRET: process.env.SECRET,
    TOKENSEXPIRTATIONSECONS:process.env.TOKENSEXPIRTATIONSECONS,
    dbUser: process.env.dbUser,
    dbPassword: process.env.dbPassword,
    dbServer: process.env.dbServer,
    dbName: process.env.dbName,
}