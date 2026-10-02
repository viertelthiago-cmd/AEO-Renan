import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import repositoryCliente from "../repository/cliente.js"


const segredo =  "M3uS3gr3d0"

if (!process.env.JWT_SECRET && process.env.NODE_ENV === "production") {
    throw new Error("JWT_SECRET deve ser configurado em produção")
}

class ServiceCliente {
    async Buscar() {
        return repositoryCliente.Find()
    }

    async Detalhe(id) {
        if (!id) {
            throw new Error("Id não informado")
        }

        const cliente = await repositoryCliente.FindById(id)
        if (!cliente) {
            throw new Error(`Id ${id} não encontrado`)
        }
        return cliente
    }

    async Criar(nome, senha) {
        if (!nome || !senha) {
            throw new Error("Nome e senha são obrigatórios")
        }

        const senhaCriptografada = await bcrypt.hash(senha, 12)
        return repositoryCliente.Create(nome, senhaCriptografada)
    }

    async Alterar(id, nome, senha) {
        if (!id) {
            throw new Error("Id não informado")
        }
        if (!nome && !senha) {
            throw new Error("Informe o nome ou a senha para alterar")
        }

        const dados = {}
        if (nome) dados.nome = nome
        if (senha) dados.senha = await bcrypt.hash(senha, 12)
        return repositoryCliente.Update(id, dados)
    }

    async Deletar(id) {
        if (!id) {
            throw new Error("Id não informado")
        }
        return repositoryCliente.Delete(id)
    }

    async Login(nome, senha) {
        if (!nome || !senha) {
            throw new Error("Nome e senha são obrigatórios")
        }

        const cliente = await repositoryCliente.FindByNome(nome)
        if (!cliente || !await bcrypt.compare(senha, cliente.senha)) {
            throw new Error("Nome ou senha inválidos")
        }

        return jwt.sign({ id: cliente.id, nome: cliente.nome }, segredo, {
            expiresIn: "1h"
        })
    }
}

export default new ServiceCliente()