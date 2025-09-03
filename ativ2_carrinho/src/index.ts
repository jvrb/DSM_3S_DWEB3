import mongoose from "mongoose";
import express from "express";
import path from "path";
import produtoRoutes from "./routes/produtoRoutes";

const app = express();

app.use(express.json());

mongoose
	.connect("mongodb://127.0.0.1:27017/shopping-list")
	.then(() => console.log("Conectado ao banco"))
	.catch((erro) => console.log("Erro ao conectar ao banco: ", erro));

app.use("/shoppingitems", produtoRoutes);

app.use(express.static(path.join(__dirname, "../public")));

app.listen(3000, () => {
	console.log("Servidor Rodando em http://localhost:3000");
});
