import { Router, Request, Response } from "express";
import Livro from "../models/Livro";

const router = Router();

router.post("/", async (req, res) => {
	try {
		const novoLivro = new Livro(req.body);
		console.log(novoLivro);
		const livroSalvo = await novoLivro.save();
		res.status(201).json(livroSalvo);
	} catch (error) {
		res.status(500).json({ message: "Erro ao cadastrar livro", error });
	}
});

router.get("/", async (req, res) => {
	try {
		const livros = await Livro.find();
		res.json(livros);
	} catch (error) {
		res.status(500).json({ error: "Erro ao buscar livros" });
	}
});

router.put("/:id", async (req, res) => {
	const { id } = req.params;
	const { titulo, autor, anoPublicacao } = req.body;
	try {
		const livroAtualizado = await Livro.findByIdAndUpdate(id, { titulo, autor, anoPublicacao }, { new: true });
		if (!livroAtualizado) {
			return res.status(400).json({ error: "Livro não encontrado" });
		}
		res.json(livroAtualizado);
	} catch (error) {
		res.status(400).json({ error: "Erro ao atualizar livro" });
	}
});

router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const livroDeletado = await Livro.findByIdAndDelete(id);
		if (livroDeletado) {
			return res.status(400).json({ error: "Livro não encontrado" });
		}
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ error: "Erro ao deletar livros" });
	}
});

export default router;
