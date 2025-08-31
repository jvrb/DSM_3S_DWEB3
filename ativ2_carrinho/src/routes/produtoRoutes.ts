import { Router, Request, Response } from "express";
import Produto from "../models/Produto";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
	try {
		const newProduto = new Produto(req.body);
		console.log(newProduto);
		const produtoSalvo = await newProduto.save();
		res.status(201).json(produtoSalvo);
	} catch (erro: unknown) {
		if (erro instanceof Error) {
			res.status(400).json({ erro: erro.message });
		} else {
			res.status(400).json({ erro: String(erro) });
		}
	}
});

router.get("/", async (req: Request, res: Response) => {
	try {
		const produtos = await Produto.find();
		res.json(produtos);
	} catch (erro: unknown) {
		if (erro instanceof Error) {
			res.status(500).json({ erro: erro.message });
		} else {
			res.status(500).json({ erro: String(erro) });
		}
	}
});

router.put("/:id", async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const produtoAtualizado = await Produto.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		if (!produtoAtualizado) {
			return res.status(400).json({ erro: "Produto não encontrado!" });
		}
		res.json({ mensagem: "Produto atualizado com sucesso!" });
	} catch (erro: unknown) {
		if (erro instanceof Error) {
			res.status(400).json({ erro: erro.message });
		} else {
			res.status(400).json({ erro: String(erro) });
		}
	}
});

router.delete("/:id", async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const produtoDeletado = await Produto.findByIdAndDelete(id);
		if (!produtoDeletado) {
			return res.status(400).json({ erro: "Produto não encontrado " });
		}
		res.json({ mensagem: "Produto deletado com sucesso!" });
	} catch (erro: unknown) {
		if (erro instanceof Error) {
			res.status(400).json({ erro: erro.message });
		} else {
			res.status(400).json({ erro: String(erro) });
		}
	}
});

export default router;
