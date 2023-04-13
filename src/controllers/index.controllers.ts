import { Request, Response } from "express";
import { QueryResult } from "pg";

import { pool } from "../database";

export const getUsers = async (req: Request,res: Response): Promise<Response> => {
    try {
    const response: QueryResult = await pool.query("SELECT * FROM users");
    return res.status(200).json(response.rows);
    } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error");
    }
};

export const getUserbyId = async (req: Request,res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    const response: QueryResult = await pool.query(
    "SELECT * FROM users WHERE id = $1",
    [id]);
    return res.json(response.rows);
};

export const createUser = async (req: Request,res: Response): Promise<Response> => {
    const { nombre, email } = req.body;
    const response: QueryResult = await pool.query(
    "INSERT INTO users(nombre, email) VALUES ($1, $2)",
    [nombre, email]);
    return res.json({
    message: "User created successfully",
    body: {
        user: {
        nombre,
        email,
        },
    },
    });
};

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    const { Nombre, email } = req.body;

    const response: QueryResult = await pool.query(
    "UPDATE users SET Nombre = $1, email = $2 WHERE id = $3",
    [Nombre, email, id]);

    return res.json(`User ${id} updated successfully`);
};

export const deleteUser = async (req: Request,res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    const response: QueryResult = await pool.query(
    "DELETE FROM users WHERE id = $1",
    [id]);
    return res.json(`User ${id} deleted successfully`);
};
