import ReservaController from "../controllers/ReservaController";
import { Router } from "express";

const app = Router()

app.get("/", ReservaController.list)
app.post("/", ReservaController.create)
app.put("/:id", ReservaController.update)
app.delete("/:id", ReservaController.delete)

export default app