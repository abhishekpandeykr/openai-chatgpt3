import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import { Configuration, OpenAIApi } from "openai";

dotenv.config()
const PORT = 5000

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openAI = new OpenAIApi(configuration)

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", async (req, res) => {
    res.status(200).send({
        message:"Hello World!!"
    })
})

app.post("/", async(req, res) => {
    try {
        const prompt = req.body.prompt
        
        const response = await openAI.createCompletion({
            model: "text-davinci-003",
            prompt:`${prompt}` ,
            temperature: 0.2,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
            stop: ["\"\"\""],
        })
        res.status(200).send({
            bot: response.data.choices[0].text
        })
    } catch (error) {
        console.log("error", error)
        res.status(500).send({error})
    }
})

app.listen(PORT, () => {
    console.log(`server is runing at http://localhost:${PORT}`)
})