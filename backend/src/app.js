import express from 'express'
import authRoutes from './routes/auth.routes.js'
import taskRoutes from './routes/task.routes.js'
import cors from 'cors';


const app = express ()

app.use(express.json());
app.use(cors());

app.use(authRoutes);
app.use(taskRoutes);

export default app;
