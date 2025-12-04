import EventController from "../controllers/EventController";
import { Router } from "express";

const app = Router()

app.get("/", EventController.list)
app.post("/", EventController.create)
app.put("/:id", EventController.update)
app.delete("/:id", EventController.delete)

export default app