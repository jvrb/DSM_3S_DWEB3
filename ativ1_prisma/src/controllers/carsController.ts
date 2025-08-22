import { PrismaClient } from "@prisma/client";
import { info } from "console";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export const getCar = async(req: Request, res: Response) => {
    const cars = await prisma.carro.findMany({
        include: {
            pessoas: true
        }
    })
    res.json(cars)
}

export const getAvaibleCars = async(req: Request, res: Response) => {
    const cars = await prisma.carro.findMany({
        where: {
            pessoas: {
                none: {}
            }
        }
    })
    res.json(cars)
}

export const createCars = async(req: Request, res: Response) => {
    const { modelo, marca, ano } = req.body
    const car = await prisma.carro.create({
        data: {
            modelo,
            marca,
            ano
        }
    })
    res.status(201).json(car)
}

export const getOneCar = async (req: Request, res: Response) => {
    const { id } = req.params
    console.log(id)
    const car = await prisma.carro.findUnique({
        where: {
            id: Number(id)
        }
    })
    // debug
    console.log("Carro Encontrado:", car)
    res.json(car)
}

export const updateCars = async(req: Request, res: Response) => {
    const { id } = req.params
    const { modelo, marca, ano} = req.body
    const infoDb = await prisma.carro.findUnique({
        where: {
            id: Number(id)
        }
    })

    let newModelo:any = infoDb?.modelo
    let newMarca:any = infoDb?.marca
    let newAno:any = infoDb?.ano

    if (modelo && modelo != "") {
        newModelo = modelo
    }
    if (marca && marca != "") {
        newMarca = marca
    }
    if (ano && ano != "") {
        newAno = ano
    }

    const newCar = await prisma.carro.update({
        where: { id: Number(id) },
        data: {
            modelo: newModelo,
            marca: newMarca,
            ano: newAno
        }
    })
    res.json(newCar)
}

export const deleteCars = async(req: Request, res: Response) => {
    const { id } = req.params
    await prisma.carro.delete({
        where: { id: Number(id) }
    })
    res.status(204).send()
}
