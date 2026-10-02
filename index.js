import express from "express"
import database from "./config/database.js"
import router from './router/cliente.js'

const app = express()
app.use(express.json())
app.use("/app/v1/petshop", router)

const porta =  3000

database.db.sync()
    .then(() => {
        app.listen(porta, () => {
            console.log(`Servidor rodando na porta ${porta}`)
        })
    })
    .catch((error) => {
        console.error("Não foi possível conectar ao banco de dados:", error.message)
        process.exitCode = 1
    })