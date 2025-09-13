"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Livro_1 = __importDefault(require("../models/Livro"));
const router = (0, express_1.Router)();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const novoLivro = new Livro_1.default(req.body);
        console.log(novoLivro);
        const livroSalvo = yield novoLivro.save();
        res.status(201).json(livroSalvo);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao cadastrar livro", error });
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const livros = yield Livro_1.default.find();
        res.json(livros);
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao buscar livros" });
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { titulo, autor, anoPublicacao } = req.body;
    try {
        const livroAtualizado = yield Livro_1.default.findByIdAndUpdate(id, { titulo, autor, anoPublicacao }, { new: true });
        if (!livroAtualizado) {
            return res.status(400).json({ error: "Livro não encontrado" });
        }
        res.json(livroAtualizado);
    }
    catch (error) {
        res.status(400).json({ error: "Erro ao atualizar livro" });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const livroDeletado = yield Livro_1.default.findByIdAndDelete(id);
        if (livroDeletado) {
            return res.status(400).json({ error: "Livro não encontrado" });
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao deletar livros" });
    }
}));
exports.default = router;
//# sourceMappingURL=livrosRoutes.js.map