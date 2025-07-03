import express from 'express';
import { connectMongoDB } from './config/mongo';

process.loadEnvFile()

const PORT = process.env.PORT;

const app = express();


app.listen(PORT, () => {
    console.log(`✅ Servidor en escucha en el puerto http://localhost:${PORT}`)
    connectMongoDB()
})
