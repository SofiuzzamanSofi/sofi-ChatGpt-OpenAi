import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import colors from "colors";
import { Configuration, OpenAIApi } from 'openai'

// inishilized the app---
const app = express()
// initialized the env file ---
dotenv.config()

// middleware---
app.use(cors())
app.use(express.json())


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});


console.log(process.env.OPENAI_API_KEY)

const openai = new OpenAIApi(configuration);

app.get('/', async (req, res) => {
    res.status(200).send({
        success: true,
        message: 'Hello from CodeX!'
    })
})


app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;

        console.log(prompt)
        // text-davinchi-003 --- ( open ai api- )
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        })
        console.log(response.data.choices[0].text);

        res.status(200).send({
            bot: response.data.choices[0].text
        });

    } catch (error) {
        console.log(`error from try > catch function: ${error}`.bgRed)
        res.status(500).send({ error } || 'Something went wrong');
    }
})



app.listen(5001, () => console.log('AI server started on http://localhost:5001'.bgCyan))