import { Request, Response} from "express"
import MesaModel from "../models/MesaModel"

class MesaController{
    public async create(req: Request, res: Response){
        try {
            const { numeroMesa, capacidade, localizacao} = req.body
            const newMesa = new MesaModel({numeroMesa, capacidade, localizacao})
            const response = await newMesa.save()
            return res.status(201).json(response)
        } catch (error: any) {
            return res.json({message: "Erro ao criar Mesa", error})
        }
    }

    public async list(req: Request, res: Response){
        try {
            const listMesa = await MesaModel.find()
            return res.json(listMesa)
        } catch (error) {
            return res.json({message: "Erro listar Mesas", error})
        }
    }

    public async update(req: Request, res: Response){
        try {
            const {id} = req.params
            const { numeroMesa, capacidade, localizacao } = req.body
            const updateMesa = await MesaModel.findByIdAndUpdate(id, {numeroMesa, capacidade, localizacao}, {new: true})
            return res.json(updateMesa)
        } catch (error) {
            return res.json({message: "Erro atualizar Mesa", error})
        }
    }

    public async delete(req: Request, res: Response){
        try {
            const { id } = req.params
            const deleteMesa = await MesaModel.findByIdAndDelete(id)
            if(!deleteMesa){
                return res.json({message: "Mesa não Encontrada"})
            }
            return res.status(204).send()
        } catch (error) {
            return res.json({message: "Erro excluir Mesa", error})
        }
    }
    public async listId(req: Request, res: Response){
        try {
            const { id } = req.params
            const listMesaId = await MesaModel.findById(id)
            if(!listMesaId){
                return res.json({message: "Mesa não Encontrada"})
            }
            return res.json(listMesaId)
        } catch (error) {
            return res.json({message: "Erro ao procurar mesa", error})
        }
    }
}

export default new MesaController()