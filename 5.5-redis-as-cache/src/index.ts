import express from 'express';
import { createClient } from "redis";

const app = express();
const PORT = 3000;

const redisClient = createClient();
redisClient.connect();

app.use(express.json());

app.get('/uncached', async (req, res) => {
    const data = await expensiveOperation();
    res.json(data);
});

app.get('/cached', async (req, res) => {
    const cachedData = await redisClient.get('data');
    if (cachedData) {
        return res.json(JSON.parse(cachedData));
    }
    const data = await expensiveOperation();
    await redisClient.set('data', JSON.stringify(data));

    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});

async function expensiveOperation() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
        username: "kirat",
        email: "kirat@gmail.com"
    }
}