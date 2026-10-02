import express from "express"
import authMiddleware, { authOuCadastroInicial } from "../middleware/cliente.js"
import { ControllerCliente } from "../controller/cliente.js"

const router = express.Router()

router.post("/login", ControllerCliente.Login)
router.get("/buscar", authMiddleware, ControllerCliente.Buscar)
router.get("/detalhe/:id", authMiddleware, ControllerCliente.Detalhe)
router.post("/criar", authOuCadastroInicial, ControllerCliente.Criar)
router.put("/alterar/:id", authMiddleware, ControllerCliente.Alterar)
router.delete("/deletar/:id", authMiddleware, ControllerCliente.Deletar)

export default router