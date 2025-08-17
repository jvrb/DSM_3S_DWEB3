import express from "express"
import { createPeople, deletePeople, getPeople, updatePeople } from "../controllers/peopleController"

const router = express.Router()

router.get("/", getPeople)
router.post("/cadastrarPessoa", createPeople)
router.put("/editPessoa", updatePeople)
router.delete("/delPessoa", deletePeople)

export const peopleRoutes = router