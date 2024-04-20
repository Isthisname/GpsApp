import express from 'express'
import authRoutes from './routes/auth.routes.js'
import taskRoutes from './routes/task.routes.js'
import groupRoutes from './routes/group.routes.js'
import groupAssignmentRoutes from './routes/groupAssigment.routes.js'
import userRoutes from './routes/user.routes.js'
import cors from 'cors';



const app = express ()

app.use(express.json());
app.use(cors());

app.use(authRoutes);
app.use(taskRoutes);
app.use(groupRoutes);
app.use(groupAssignmentRoutes);
app.use(userRoutes);

export default app;
