import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import discosRoutes from "./routes/discoRoutes";

const app = express();
const PORT = 3000;
const MONGODB_URL = "mongodb://localhost:27017/crud-cds";

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

mongoose.connect(MONGODB_URL)
    .then(() => console.log('MongoDB Conectado'))
    .catch(err => console.log('Erro ao conectar ao Banco de Dados: ', err))


app.use('/discos', discosRoutes)
app.listen(PORT, () => {
	console.log("Servidor Rodando em http://localhost:3000");
});