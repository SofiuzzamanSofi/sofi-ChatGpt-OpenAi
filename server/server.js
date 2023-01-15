import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import colors from "colors";
import { Configuration, OpenAIApi } from "openai";

// inishilized the app---
const app = express();
// initialized the env file ---
dotenv.config();

// middleware---
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
    apiKey: process.env.OPEN_API_KEY,
})

const openai = new OpenAIApi(configuration)

app.get("/", async (req, res) => {
    res.status(200).send({
        success: true,
        message: "Hello World",
    })
})


app.post("/", async (req, res) => {

    try {
        const prompt = req.body.prompt;



    } catch (error) {
        console.log(`error from try > catch function: ${error}`.bgRed)
    }
})



app.listen()