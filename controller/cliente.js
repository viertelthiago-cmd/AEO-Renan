import serviceCliente from "../service/cliente.js"

class ControllerCliente {
    async Buscar(_req, res) {
        try {
            const Clientes = await serviceCliente.Buscar()
            res.status(200).send({ Clientes })
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    }

    async Detalhe(req, res) {
        try {
            const Cliente = await serviceCliente.Detalhe(req.params.id)
            res.status(200).send({ Cliente })
        } catch (error) {
            res.status(404).send({ message: error.message })
        }
    }

    async Criar(req, res) {
        try {
            const { nome, senha } = req.body
            const Cliente = await serviceCliente.Criar(nome, senha)
            res.status(201).send({ Cliente })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    async Alterar(req, res) {
        try {
            const { nome, senha } = req.body
            const Cliente = await serviceCliente.Alterar(req.params.id, nome, senha)
            res.status(200).send({ Cliente })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    async Deletar(req, res) {
        try {
            await serviceCliente.Deletar(req.params.id)
            res.status(204).end()
        } catch (error) {
            res.status(404).send({ message: error.message })
        }
    }

    async Login(req, res) {
        try {
            const { nome, senha } = req.body
            const token = await serviceCliente.Login(nome, senha)
            res.status(200).send({ token })
        } catch (error) {
            res.status(401).send({ message: error.message })
        }
    }
}

export default new ControllerCliente()