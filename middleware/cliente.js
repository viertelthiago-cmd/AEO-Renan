import jwt from "jsonwebtoken"
import cliente from "../model/cliente.js"

const segredo = process.env.JWT_SECRET || "M3uS3gr3d0"

if (!process.env.JWT_SECRET && process.env.NODE_ENV === "production") {
    throw new Error("JWT_SECRET deve ser configurado em produção")
}

export default function authMiddleware(req, res, next) {
    const authorization = req.headers.authorization
    const token = authorization?.startsWith("Bearer ")
        ? authorization.slice(7)
        : authorization

    if (!token) {
        return res.status(401).send({ message: "Token não informado" })
    }

    try {
        req.session = jwt.verify(token, segredo)
        return next()
    } catch {
        return res.status(401).send({ message: "Token inválido ou expirado" })
    }
}

export async function authOuCadastroInicial(req, res, next) {
    if (req.headers.authorization) {
        return authMiddleware(req, res, next)
    }

    try {
        if (await cliente.count() === 0) {
            return next()
        }
        return res.status(401).send({ message: "Token não informado" })
    } catch (error) {
        return next(error)
    }
}