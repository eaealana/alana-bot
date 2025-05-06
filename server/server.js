import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import OpenAI from 'openai'

dotenv.config()

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello from CodeX',
    })
})

app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{role: 'user', content: prompt}],
            temperature: 0.7
        })

        res.status(200).send({
            bot: response.choices[0].message.content,
        })
    } catch (error) {
        console.log('Erro na requisição OpenAI:', error)
        res.status(500).send({ error: error.message })
    }
})

app.listen(5000, () =>
    console.log('Server is running or port http://localhost:5000')
)