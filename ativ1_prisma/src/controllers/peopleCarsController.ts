import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export const getPeopleCars = async(req: Request, res: Response) => {
    const listPeopleCars = await prisma.pessoaPorCarro.findMany()
    res.json(listPeopleCars)
}

export const createPeopleCars = async(req: Request, res: Response) => {
    const {  pessoaId, carroId } = req.body
    const newRent = await prisma.pessoaPorCarro.create({
        data: {
            pessoaId,
            carroId
        }
    })
    res.status(201).json(newRent)
}

export const updatePeopleCars = async(req: Request, res: Response) => {
    const { id } = req.params
    const { pessoaId, carroId } = req.body
    const editRent = await prisma.pessoaPorCarro.update({
        where: { id: Number(id)},
        data: {
            pessoaId,
            carroId
        }
    })
    res.json(editRent)
}

export const deletePeopleCars = async(req: Request, res: Response) => {
    const { id } = req.params
    await prisma.pessoaPorCarro.delete({
        where: { id: Number(id) }
    })
}