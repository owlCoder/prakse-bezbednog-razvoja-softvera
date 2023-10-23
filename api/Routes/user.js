import express from 'express';

import {
  createUser,
  getUsers
} from '../Controllers/user.js';

const router = express.Router();

router.post('/new', createUser);
router.get('/', getUsers);
// router.get('/product/:id', getProduct);
// router.put('/update/:id', updateProduct);
// router.delete('/delete/:id', deleteProduct);

export default router;