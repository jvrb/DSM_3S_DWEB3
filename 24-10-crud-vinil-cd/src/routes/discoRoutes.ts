import { Router, Request, Response } from "express";
import Disco from "../models/Disco";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
	try {
		const novoDisco = new Disco(req.body);
		console.log(novoDisco);
		const discoSalvo = await novoDisco.save();
		res.status(201).json(discoSalvo);
	} catch (error) {
		res.status(500).json({ message: "Erro ao cadastrar disco", error });
	}
});

router.get("/", async (req: Request, res: Response) => {
	try {
		const discos = await Disco.find();
		res.json(discos);
	} catch (error) {
		res.status(500).json({ error: "Erro ao buscar discos" });
	}
});

router.put("/:id", async (req: Request, res: Response) => {
	const { id } = req.params;
	const { titulo, artista, ano, genero, formato, preco } = req.body;
	try {
		const discoAtualizado = await Disco.findByIdAndUpdate(id, { titulo, artista, ano, genero, formato, preco }, { new: true });
		if (!discoAtualizado) {
			return res.status(400).json({ error: "disco não encontrado" });
		}
		res.json(discoAtualizado);
	} catch (error) {
		res.status(400).json({ error: "Erro ao atualizar disco" });
	}
});

router.delete("/:id", async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const discoDeletado = await Disco.findByIdAndDelete(id);
		if (discoDeletado) {
			return res.status(400).json({ error: "Disco não encontrado" });
		}
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ error: "Erro ao deletar Discof" });
	}
});

export default router;
