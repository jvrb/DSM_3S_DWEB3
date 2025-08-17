import express from "express"
import { createPeople, deletePeople, getPeople, updatePeople } from "../controllers/peopleController"

const router = express.Router()

router.get("/", getPeople)
// router.get("/:id", getOnePeople)
router.post("/", createPeople)
router.put("/:id", updatePeople)
router.delete("/:id", deletePeople)

export const peopleRoutes = router