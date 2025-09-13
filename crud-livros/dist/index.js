"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const livrosRoutes_1 = __importDefault(require("./routes/livrosRoutes"));
const app = (0, express_1.default)();
const PORT = 3000;
const MONGODB_URL = "mongodb://localhost:27017/crud_livros";
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.static("public"));
app.use(express_1.default.json());
mongoose_1.default.connect(MONGODB_URL)
    .then(() => console.log('MongoDB Conectado'))
    .catch(err => console.log('Erro ao conectar ao Banco de Dados: ', err));
app.use('/livros', livrosRoutes_1.default);
//# sourceMappingURL=index.js.map