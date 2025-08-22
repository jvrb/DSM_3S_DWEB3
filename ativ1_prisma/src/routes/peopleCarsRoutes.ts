import express from "express"
import { createPeopleCars, deletePeopleCars, getPeopleCars, updatePeopleCars } from "../controllers/peopleCarsController"

const router = express.Router()

router.get("/", getPeopleCars)
router.post("/", createPeopleCars)
router.put("/:id", updatePeopleCars)
router.delete("/:id", deletePeopleCars)


export const peopleCarsRoutes = router