import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import storesRoutes from './routes/stores.js';
import ownerRoutes from './routes/owner.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/stores', storesRoutes);
app.use('/api/owner', ownerRoutes);

// 404
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

export default app;