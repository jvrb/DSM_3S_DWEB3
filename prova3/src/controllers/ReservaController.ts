import { Request, Response} from "express"
import ReservaModel from "../models/ReservaModel"


class ReservaController{
    public async create(req: Request, res: Response){
        try {
            const { nomeCliente, contatoCliente, numeroMesa, quatidadePessoas, dataReserva, obsReserva = "",  status} = req.body
            const newReserva = new ReservaModel({nomeCliente, contatoCliente, numeroMesa, quatidadePessoas, dataReserva, obsReserva,  status})
            const response = await newReserva.save()
            return res.status(201).json(response)
        } catch (error: any) {
            return res.json({message: "Erro ao criar Reserva", error})
        }
    }

    public async list(req: Request, res: Response){
        try {
            const listEvent = await ReservaModel.find()
            return res.json(listEvent)
        } catch (error) {
            return res.json({message: "Erro listar Reservas", error})
        }
    }

    public async update(req: Request, res: Response){
        try {
            const {id} = req.params
            const { nomeCliente, contatoCliente, numeroMesa, quatidadePessoas, dataReserva, obsReserva,  status } = req.body
            const updateReserva = await ReservaModel.findByIdAndUpdate(id, {nomeCliente, contatoCliente, numeroMesa, quatidadePessoas, dataReserva, obsReserva,  status}, {new: true})
            return res.json(updateReserva)
        } catch (error) {
            return res.json({message: "Erro atualizar Reserva", error})
        }
    }

    public async delete(req: Request, res: Response){
        try {
            const { id } = req.params
            const deleteReserva = await ReservaModel.findByIdAndDelete(id)
            if(!deleteReserva){
                return res.json({message: "Reserva não Encontrada"})
            }
            return res.status(204).send()
        } catch (error) {
            return res.json({message: "Erro excluir Reserva", error})
        }
    }
}

export default new ReservaController()