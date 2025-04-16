// models/Order.js

const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    artwork: { type: mongoose.Schema.Types.ObjectId, ref: 'work', required: true },
    quantity: { type: Number, required: true, default: 1 },    
    price: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  currency: { type: String, default: 'EUR' },
  orderDate: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled', 'refunded'],
    default: 'pending' 
  },
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  billingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  paymentMethod: { type: String, required: true }, // e.g., Stripe, PayPal, credit card
  paymentDetails: {
    transactionId: { type: String },
    paymentDate: { type: Date },
    paymentStatus: { type: String, enum: ['successful', 'failed', 'pending'] }
  },
  trackingNumber: { type: String },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

OrderSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Order', OrderSchema);