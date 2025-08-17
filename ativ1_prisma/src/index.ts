import express from "express"
import dotenv from "dotenv"
import { peopleRoutes } from "./routes/peopleRoutes"
import { peopleCarsRoutes } from "./routes/peopleCarsRoutes"
// import { carsRoutes } from "./routes/carsRoutes"

// config
dotenv.config()
const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.send("API Locadora de Carros rodando!")
})

app.use("/pessoas", peopleRoutes)
// app.use("/carros", carsRoutes)
app.use("/alugados", peopleCarsRoutes)



app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000")
})