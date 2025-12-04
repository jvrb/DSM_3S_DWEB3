import { Request, Response} from "express"
import ExpenseModel from "../models/ExpenseModel"

class ExpenseController{
    public async create(req: Request, res: Response){
        try {
            // Capturando o que vem do frontend, atraves do body da requisicao
            const { description, amount, date } = req.body

            // Criando um novo Modelo com os dados vindos do frontend
            const newExpense = await new ExpenseModel({description, amount, date})

            // Tentando salvar os dados no banco de dado
            const response = await newExpense.save()

            // Retornando a resposta para o frontend
            return res.status(201).json(response)
        } catch (error: any) {
            // Exibindo a mensagem caso ocorra algum erro para cadastrar a despesa
            return res.json({message: "Erro ao criar despesa", error})
        }
    }

    public async list(req: Request, res: Response){
        try {
            // Buscando todas as despesas cadastradas no banco
            const listExpense = await ExpenseModel.find()

            // Retornando as depesas para o frontend
            return res.json(listExpense)
        } catch (error) {
            return res.json({message: "Erro listar despesas", error})
        }
    }

    public async update(req: Request, res: Response){
        try {
            // Capturando o id pelos parametros da requisição
            const {id} = req.params

            // Capturando os dado pelo corpo da requisição
            const {description, amount, date} = req.body

            // Tentando atualizar os dados no bando, passando o id, e os dados que foram passados no body da requisição
            const updateExpense = await ExpenseModel.findByIdAndUpdate(id, {description,amount,date})
            return res.json(updateExpense)
        } catch (error) {
            return res.json({message: "Erro atualizar despesa", error})
        }
    }

    public async delete(req: Request, res: Response){
        try {
            // Capturando o id pelos parametros da requisição
            const { id } = req.params

            // Tentando buscar e deletar a despesa baseado no id 
            const deleteExpense = await ExpenseModel.findByIdAndDelete(id)

            // Caso não encontre a despesa, exibe uma mensagem
            if(!deleteExpense){
                return res.json({message: "Despesa não Encontrada"})
            }
            return res.status(204).send()
        } catch (error) {
            return res.json({message: "Erro excluir despesa", error})
        }
    }

    public async getTotalExpenses(req: Request, res: Response){
        try {
            const total = await ExpenseModel.aggregate([
                {
                    $group: {
                        _id: null,
                        totalAmount: { $sum: "$amount"}
                    }
                }
            ])

            const totalAmount = total.length > 0 ? total[0].totalAmount : 0

            return res.json({ totalAmount })
        } catch (error) {
            return res.status(500).json({ message: "Erro ao calcular despesa" })
        }
    }
}

export default new ExpenseController()