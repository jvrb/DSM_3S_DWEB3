import express from "express"
import { createCars, deleteCars, getCar, updateCars } from "../controllers/carsController"

const router = express.Router()

router.get("/", getCar)
router.post("/", createCars)
router.put("/:id", updateCars)
router.delete("/:id", deleteCars)

export const carsRoutes = router