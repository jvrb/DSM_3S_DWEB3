import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import ReservaRoutes from "./routes/ReservaRoutes";
import MesaRoutes from "./routes/MesaRoutes"
import path from "path";

const app = express();
const PORT = 3000;
const MONGODB_URL = "mongodb://localhost:27017/reserva";

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "views")));

mongoose
	.connect(MONGODB_URL)
	.then(() => "Mongo Conectado")
	.catch((err) => console.log("Erro ao conectar ao Banco de Dados: ", err));

app.use("/reserva", ReservaRoutes);
app.use("/mesa", MesaRoutes)

app.listen(PORT, () => {
	console.log(`Servidor em http://localhost:${PORT}`);
});
