
import express from 'express';
import auth from '../middleware/auth.js';
import requireRole from '../middleware/requireRole.js';
import adminCtrl from '../controllers/adminController.js';
import pool from '../db.js';
const router = express.Router();

router.use(auth, requireRole('admin'));

router.get('/dashboard', adminCtrl.dashboard);
router.post('/users', adminCtrl.createUser);
router.get('/users', adminCtrl.listUsers);
router.get('/users/:id', adminCtrl.getUser);
router.get('/stores', adminCtrl.listStores);
router.post('/stores', async (req, res, next) => {
	try {
		const { name, email, address, owner_id } = req.body;
		const [r] = await pool.query('INSERT INTO stores (name,email,address,owner_id) VALUES (?, ?, ?, ?)', [name, email, address || null, owner_id || null]);
		res.status(201).json({ id: r.insertId });
	} catch (err) { next(err); }
});

export default router;
