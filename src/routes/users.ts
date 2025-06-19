import { Router, Request, Response } from 'express';
import prisma from '../prisma';

const router = Router();

// interface User {
//   id: number;
//   name: string;
// }

// let users: User[] = [
//   { id: 1, name: 'Yohanan' },
//   { id: 2, name: 'Yishai' },
// ];

// get all users
router.get('/', async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// get one
router.get('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = await prisma.user.findUnique({ where: { id } });
  if (user) res.json(user);
  else res.status(404).json({ mensaje: 'User not found' });
});

// create
router.post('/', async (req: Request, res: Response) => {
  const { name } = req.body;
  const newUser = await prisma.user.create({ data: { name } });
  res.status(201).json(newUser);
});

export default router;
