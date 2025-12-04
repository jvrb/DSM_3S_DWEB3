import { Request, Response} from "express"
import EventModel from "../models/EventModel"

class EventController{
    public async create(req: Request, res: Response){
        try {
            const { title, description, eventDate, locationEvent, amount } = req.body
            const newEvent = new EventModel({title, description, eventDate, locationEvent, amount})
            const response = await newEvent.save()
            return res.status(201).json(response)
        } catch (error: any) {
            return res.json({message: "Erro ao criar evento", error})
        }
    }

    public async list(req: Request, res: Response){
        try {
            const listEvent = await EventModel.find()
            return res.json(listEvent)
        } catch (error) {
            return res.json({message: "Erro listar Eventos", error})
        }
    }

    public async update(req: Request, res: Response){
        try {
            const {id} = req.params
            const { title, description, data, locationEvent, amount } = req.body
            const updateEvent = await EventModel.findByIdAndUpdate(id, {title, description, data, locationEvent, amount})
            return res.json(updateEvent)
        } catch (error) {
            return res.json({message: "Erro atualizar Evento", error})
        }
    }

    public async delete(req: Request, res: Response){
        try {
            const { id } = req.params
            const deleteEvent = await EventModel.findByIdAndDelete(id)
            if(!deleteEvent){
                return res.json({message: "Evento não Encontrada"})
            }
            return res.status(204).send()
        } catch (error) {
            return res.json({message: "Erro excluir Evento", error})
        }
    }
}

export default new EventController()