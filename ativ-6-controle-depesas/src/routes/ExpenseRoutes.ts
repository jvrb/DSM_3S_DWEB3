import ExpenseController from "../controllers/ExpenseController";
import { Router } from "express";

const app = Router()

app.get("/", ExpenseController.list)
app.post("/", ExpenseController.create)
app.put("/:id", ExpenseController.update)
app.delete("/:id", ExpenseController.delete)
app.get("/total", ExpenseController.getTotalExpenses)

export default app