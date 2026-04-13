const Customer = require('../models/Customer');

// Create customer inquiry
exports.createCustomer = async (req, res) => {
  try {
    const { name, email, phone, company, subject, message } = req.body;
    
    const customer = new Customer({
      name,
      email,
      phone,
      company,
      subject,
      message
    });
    
    const savedCustomer = await customer.save();
    res.status(201).json({ message: 'Message sent successfully! We will contact you soon.', customer: savedCustomer });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all customers (admin only)
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single customer (admin only)
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update customer status (admin only)
exports.updateCustomerStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    
    customer.status = status;
    const updatedCustomer = await customer.save();
    res.json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete customer (admin only)
exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    
    await customer.remove();
    res.json({ message: 'Customer deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};