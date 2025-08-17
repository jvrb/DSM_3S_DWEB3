import express from "express"
import { createPeopleCars, getPeopleCars, updatePeopleCars } from "../controllers/peopleCarsController"

const router = express.Router()

router.get("/", getPeopleCars)
router.post("/", createPeopleCars)
router.put("/:id", updatePeopleCars)


export const peopleCarsRoutes = router