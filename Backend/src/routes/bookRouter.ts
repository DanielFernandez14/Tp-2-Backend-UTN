import { Router } from "express";
import { Request, Response } from 'express';
import { Book } from "../models/bookModel";

const bookRouter = Router();

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

bookRouter.get("/api/books", async (request: Request, response: Response): Promise<any> => {
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

bookRouter.get("/api/books/:id", async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        const book = await Book.findById(id);

    if (!book) {
        return res.status(404).json({
        success: false,
        message: "Libro no encontrado"
        });
    }

    res.json({
        success: true,
        data: book,
        message: "Libro obtenido exitosamente"
    });
    } catch (error) {
    const err = error as Error;
    res.status(500).json({
        success: false,
        message: err.message
    });
    }
});

bookRouter.post("/api/books", async (req: Request, res: Response): Promise<any> => {
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

bookRouter.delete("/api/books/:id", async (req: Request, res: Response): Promise<any> => {
    try {
        const id = req.params.id;
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({
                success: false,
                message: "Libro no encontrado"
            });
        } res.json({success: deletedBook, message: "Libro eliminado exitosamente"});
    } catch (error) {
        const err = error as Error;
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
})

bookRouter.patch("/api/books/:id", async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const body = req.body;

    if (!body || Object.keys(body).length === 0) {
        return res.status(400).json({
        success: false,
        message: "No se proporcionaron campos para actualizar."
        });
    }

    const updatedBook = await Book.findByIdAndUpdate(id, body, { new: true, runValidators: true });

    if (!updatedBook) {
        return res.status(404).json({
        success: false,
        message: "Libro no encontrado"
        });
    }

    res.json({
        success: true,
        data: updatedBook,
        message: "Libro actualizado exitosamente"
    });
    } catch (error) {
    const err = error as Error;
    res.status(500).json({
        success: false,
        message: err.message
    });
    }
});

export { bookRouter };
