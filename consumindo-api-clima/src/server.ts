import express, { Request, Response} from 'express'
import dotenv from 'dotenv'
import axios from 'axios'
import path from 'path'

dotenv.config()

const app = express()
const PORT = 3000

app.use(express.static(path.join(__dirname, '../views')))

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../views/index.html'))
})


app.get('/search', async(req: Request, res: Response) => {
    const { cidade } = req.query
    
    try {
        const apiKey = process.env.API_KEY
        const url_geo = `http://api.openweathermap.org/geo/1.0/direct?q=${cidade}&limit=1&appid=${apiKey}`
        const response_geo = await axios.get(url_geo)
        console.log(response_geo.data)
        
        const latitude = response_geo.data[0].lat
        const longitude = response_geo.data[0].lon

        const API_WEATHER = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=pt_br&units=metric`
        const response_weather = await axios.get(API_WEATHER)
        
        const data = response_weather.data

        const clima_response = {
            cidade: data['name'],
            pais: data['sys'].country,
            temp_atual: data['main'].temp,
            sens_term: data['main'].feels_like,
            umidade: data['main'].humidity,
            cond_temp: data['weather'][0].description,
            icon: data['weather'][0].icon
        }

        
        res.json(clima_response)
    }catch(e) {
        res.status(500).json({error: "Erro ao buscar cidade"})
    }


})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})