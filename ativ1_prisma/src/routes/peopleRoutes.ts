import express from "express"
import { getPeople } from "../controllers/peopleController"

const router = express.Router()

router.get("/", getPeople)

export const peopleRoutes = router