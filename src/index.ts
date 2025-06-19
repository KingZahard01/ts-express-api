// src/index.ts
import express, { Request, Response } from 'express';
import userRoutes from './routes/users';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World! This is a API with Typescript and Express.');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
