import express from "express"
import dotenv from "dotenv"
import path from "path"
import { peopleRoutes } from "./routes/peopleRoutes"
import { peopleCarsRoutes } from "./routes/peopleCarsRoutes"
import { carsRoutes } from "./routes/carsRoutes"

// config
dotenv.config()
const app = express()
app.use(express.json())

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(express.static(path.join(__dirname, "views")))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"))
})
app.get("/cadastrarCliente", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "./pagesCliente/cliente.html"))
})
app.get("/cadastrarCarro", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "./pagesCar/car.html"))
})
app.get("/cadastrarAluguel", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "./pagesAlugados/alugados.html"))
})

app.use("/pessoas", peopleRoutes)
app.use("/carros", carsRoutes)
app.use("/alugados", peopleCarsRoutes)

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000")
})