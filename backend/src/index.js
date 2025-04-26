import express from 'express';
import dotenv from 'dotenv'

dotenv.config();

const app = express();

app.get("/", (_, res) => {
    res.send("Welcome to DeepCodeLab server.")
});

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
})