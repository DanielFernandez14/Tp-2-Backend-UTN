import express from 'express';
import { connectMongoDB } from './config/mongo';
import { Schema, model } from 'mongoose';
import { Request, Response } from 'express';


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
app.use(express.json());

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

app.get("/api/books", async (request: Request, response: Response): Promise<any> => {
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

app.post("/api/books", async (req: Request, res: Response): Promise<any> => {
        try {
            const body = req.body;
            const { title, author, publishedYear, genre, available } = body;
            if (!title || !author || !publishedYear || !genre) {
                return res.status(400).json({
                    success: false,
                    message: "Data invalida."
                })}
                const newBook = new Book({title,author,publishedYear,genre,available: available || true})
                const savedBook = await newBook.save();
                res.status(201).json({
                    success: true,
                    data: savedBook,
                    message: "Libro creado exitosamente"
            })
            
        } catch (error) {
            const err = error as Error;
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
})

app.listen(PORT, () => {
    console.log(`✅ Servidor en escucha en el puerto http://localhost:${PORT}`)
    connectMongoDB()
})
