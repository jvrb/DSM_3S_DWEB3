import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getPeople = async(req: Request, res: Response) => {
    const peoples = await prisma.pessoa.findMany()
    // debug
    console.log("Pessoas Encontradas:", peoples)
    res.json(peoples)
}

export const createPeople = async(req: Request, res: Response) => {
    const { nome, email } = req.body
    const people = await prisma.pessoa.create({
        data: {nome, email},
    })
    res.status(201).json(people)
}

export const updatePeople = async(req: Request, res: Response) => {
    const { id } = req.params
    const { nome, email} = req.body

    const newPeople = await prisma.pessoa.update({
        where: { id: Number(id) },
        data: {
            nome,
            email
        }
    })
    res.json(newPeople)
}

export const deletePeople = async(req: Request, res: Response) => {
    const { id } = req.params
    await prisma.pessoa.delete({
        where: { id: Number(id) }
    })
    res.status(204).send()
}