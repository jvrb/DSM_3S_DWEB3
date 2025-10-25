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
const Disco_1 = __importDefault(require("../models/Disco"));
const router = (0, express_1.Router)();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const novoDisco = new Disco_1.default(req.body);
        console.log(novoDisco);
        const discoSalvo = yield novoDisco.save();
        res.status(201).json(discoSalvo);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao cadastrar disco", error });
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const discos = yield Disco_1.default.find();
        res.json(discos);
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao buscar discos" });
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { titulo, artista, ano, genero, formato, preco } = req.body;
    try {
        const discoAtualizado = yield Disco_1.default.findByIdAndUpdate(id, { titulo, artista, ano, genero, formato, preco }, { new: true });
        if (!discoAtualizado) {
            return res.status(400).json({ error: "disco não encontrado" });
        }
        res.json(discoAtualizado);
    }
    catch (error) {
        res.status(400).json({ error: "Erro ao atualizar disco" });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const discoDeletado = yield Disco_1.default.findByIdAndDelete(id);
        if (discoDeletado) {
            return res.status(400).json({ error: "Disco não encontrado" });
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao deletar Discof" });
    }
}));
exports.default = router;
//# sourceMappingURL=discoRoutes.js.map