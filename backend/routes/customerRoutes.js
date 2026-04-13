const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const auth = require('../middleware/auth');

// Public routes
router.post('/', customerController.createCustomer);

// Protected routes (admin only)
router.get('/', auth, customerController.getCustomers);
router.get('/:id', auth, customerController.getCustomerById);
router.put('/:id', auth, customerController.updateCustomerStatus);
router.delete('/:id', auth, customerController.deleteCustomer);

module.exports = router;