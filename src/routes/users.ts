import { Router, Request, Response } from 'express';

const router = Router();

interface User {
  id: number;
  name: string;
}

let users: User[] = [
  { id: 1, name: 'Yohanan' },
  { id: 2, name: 'Yishai' },
];

// get all users
router.get('/', (req: Request, res: Response) => {
  res.json(users);
});

// get one
router.get('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);
  if (user) res.json(user);
  else res.status(404).json({ mensaje: 'User not found' });
});

// create
router.post('/', (req: Request, res: Response) => {
  const newUser: User = {
    id: users.length + 1,
    name: req.body.name,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

export default router;
