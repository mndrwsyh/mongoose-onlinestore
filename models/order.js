const { Schema, model } = require("mongoose");

/*
fields needed for order
- customer name
- customer email
- products
- total price
- status
    pending, paid, failed, completed
- billpls_id
- paid_at (when they do the payment)
*/

const orderSchema = new Schema({
  customerName: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  products: {
    type: Array,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "paid", "faild", "completed"], // enum limit the value to the provided option only
  },
  billplz_id: String,
  paid_at: Date,
});

const Order = model("Order", orderSchema);
module.exports = Order;
