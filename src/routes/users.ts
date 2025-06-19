// src/routes/users.ts
import { Router, Request, Response } from 'express';
import prisma from '../prisma';
import { userSchema } from '../schemas/userSchema';

const router = Router();

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
  try {
    const data = userSchema.parse(req.body);

    const newUser = await prisma.user.create({
      data: { name: data.name },
    });

    res.status(201).json(newUser);
  } catch (error) {
    if (error instanceof Error && 'errors' in error) {
      return res
        .status(400)
        .json({ error: 'Invalid data', details: (error as any).errors });
    }
    res.status(500).json({ error: 'Unexpected error' });
  }
});

export default router;
