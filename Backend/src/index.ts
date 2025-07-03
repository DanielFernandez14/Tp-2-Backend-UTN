import express from 'express';
import { connectMongoDB } from './config/mongo';
import { Schema, model } from 'mongoose';


process.loadEnvFile()

const PORT = process.env.PORT;


const bookSchema = new Schema({
    title: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    publishedYear: { type: Number },
    genre: { type: String },
    available: { type: Boolean, default: true }
});

const Book = model("Book", bookSchema);



const app = express();

const getAllBooks = async () => {
    try {
        const books = await Book.find();
        return {
            success: true,
            data: books,
            message: "Libros obtenidos exitosamente"
        };
    } catch (error) {
        const err = error as Error;
        return {
            success: false,
            message: err.message
    }
}}

app.get("/api/books", async (request, response): Promise<any> => {
    try {
        const books = await Book.find();
        return response.json({
            success: true,
            data: books,
            message: "Libros obtenidos exitosamente"
        });
    } catch (error) {
        const err = error as Error;
        return response.json({
            success: false,
            message: err.message
    })
}})

app.listen(PORT, () => {
    console.log(`✅ Servidor en escucha en el puerto http://localhost:${PORT}`)
    connectMongoDB()
})
