import { PrismaClient } from "@prisma/client";
import { error } from "console";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getPeople = async (req: Request, res: Response) => {
    const peoples = await prisma.pessoa.findMany({
        include: {
            telefone: true
        }
    })
    // debug
    console.log("Pessoas Encontradas:", peoples)
    res.json(peoples)
}

export const getAvaiblePeople = async (req: Request, res: Response) => {
    const peoples = await prisma.pessoa.findMany({
        where: {
            carros: {
                none: {}
            }
        },
        include: {
            telefone: true
        }
    })
    // debug
    console.log("Pessoas Encontradas:", peoples)
    res.json(peoples)
}

export const getOnePeople = async (req: Request, res: Response) => {
    const { id } = req.params
    const people = await prisma.pessoa.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            telefone: true
        }
    })
    // debug
    console.log("Pessoas Encontradas:", people)
    res.json(people)
}

export const createPeople = async (req: Request, res: Response) => {
    try {
        const { nome, email, telefone } = req.body
        if (!nome || !email || !telefone) {
            return res.status(400).json({
                error: "Nome, email e telefone são obrigatórios!"
            });
        }
        const people = await prisma.pessoa.create({
            data: { nome, email },
        })
        await prisma.telefone.create({
            data: {
                numero: telefone,
                pessoaId: people.id
            }
        })
        const peopleWithTelefone = await prisma.pessoa.findUnique({
            where: { id: people.id },
            include: {
                telefone: true
            }
        })
        res.status(201).json(peopleWithTelefone)
    } catch (e) {
        console.error("Erro ao criar Cliente:", e);
    }
}

export const updatePeople = async (req: Request, res: Response) => {
    const { id } = req.params
    const { nome, email, telefone } = req.body

    const existeTelfone = await prisma.telefone.findUnique({
        where: {
            pessoaId: Number(id)
        }
    })

    if (!existeTelfone && telefone !== "") {
        await prisma.telefone.create({
            data: {
                numero: telefone,
                pessoaId: Number(id)
            }
        })
    } else if (telefone !== ""){
        await prisma.telefone.update({
            where: { pessoaId: Number(id) },
            data: {
                numero: telefone,
            }
        })
    }
    const newPeople = await prisma.pessoa.update({
        where: { id: Number(id) },
        data: {
            nome,
            email
        }
    })

    const peopleWithTelefone = await prisma.pessoa.findUnique({
        where: { id: newPeople.id },
        include: {
            telefone: true
        }
    })
    res.json(peopleWithTelefone)
}

export const deletePeople = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const pessoa = await prisma.pessoa.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!pessoa) {
            return res.status(404).json({ error: "Pessoa não encontrada" });
        }

        await prisma.telefone.deleteMany({
            where: { pessoaId: Number(id) }
        })
        await prisma.pessoa.delete({
            where: { id: Number(id) }
        })
        res.status(204).send()
    } catch (e) {
        console.error("Erro ao deletar pessoa:", e);
        res.status(500).json({ error: "Erro ao deletar pessoa" });
    }
}