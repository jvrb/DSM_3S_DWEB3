import express from "express"
import dotenv from "dotenv"
import { peopleRoutes } from "./routes/peopleRoutes"
// import { carsRoutes } from "./routes/carsRoutes"
// import { pepopleCarsRoutes } from "./routes/peopleCarsRoutes"

// config
dotenv.config()
const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.send("API Locadora de Carros rodando!")
})

app.use("/pessoas", peopleRoutes)
// app.use("/carros", carsRoutes)
// app.use("/alugados", pepopleCarsRoutes)


app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000")
})