import cliente from "../model/cliente.js"
import Cliente from "../service/cliente.js"

class repositoryCliente {
    async Find() {
        return cliente.findAll({ attributes: { exclude: ["senha"] } })
    }

    async FindById(id) {
        return cliente.findByPk(id, { attributes: { exclude: ["senha"] } })
    }

    async FindByNome(nome) {
        return cliente.findOne({ where: { nome } })
    }

    async Create(nome, senha) {
        const cliente = await cliente.create({ nome, senha })
        const resultado = cliente.toJSON()
        delete resultado.senha
        return resultado
    }

    async Update(id, dados) {
        const cliente = await cliente.findByPk(id)
        if (!cliente) {
            throw new Error("Funcionário não encontrado")
        }

        await cliente.update(dados)
        const resultado = cliente.toJSON()
        delete resultado.senha
        return resultado
    }

    async Delete(id) {
        const cliente = await cliente.findByPk(id)
        if (!cliente) {
            throw new Error("cliente não encontrado")
        }

        await cliente.destroy()
        return cliente
    }
}

export default new repositoryCliente()