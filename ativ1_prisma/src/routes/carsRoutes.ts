import express from "express"
import { createCars, deleteCars, getCar, updateCars,getOneCar, getAvaibleCars } from "../controllers/carsController"

const router = express.Router()

router.get("/", getCar)
router.get("/avaible", getAvaibleCars)
router.get("/:id", getOneCar)
router.post("/", createCars)
router.put("/:id", updateCars)
router.delete("/:id", deleteCars)

export const carsRoutes = router