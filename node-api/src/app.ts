import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import tasksRoutes from './routes/tasksRoutes';

const app: Application = express();
app.use(cors());
app.use(express.json());

// Rota raiz
app.get('/', (req: Request, res: Response) => {
  return res.json({ message: 'API is running' });
});

// Rotas
app.use('/tasks', tasksRoutes);

export default app;