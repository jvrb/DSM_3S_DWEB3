import MesaController from "../controllers/MesaController";
import { Router } from "express";

const app = Router()

app.get("/", MesaController.list)
app.get("/:id", MesaController.listId)
app.post("/", MesaController.create)
app.put("/:id", MesaController.update)
app.delete("/:id", MesaController.delete)

export default app