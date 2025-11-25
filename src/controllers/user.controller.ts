// controllers/user.controller.ts
import { Request, Response } from "express";

// In-memory users array
let users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

const getAllUsers = (req: Request, res: Response) => {
  res.json(users);
};

const getUserById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

const createUser = (req: Request, res: Response) => {
  const { name, email } = req.body;
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
};

const updateUser = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return res.status(404).json({ message: "User not found" });
  users[index] = { id, name, email };
  res.json(users[index]);
};

const deleteUser = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  users = users.filter(u => u.id !== id);
  res.json({ message: "User deleted successfully" });
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};