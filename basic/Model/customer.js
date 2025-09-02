const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// MongoDB connection
async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/relation', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to DB');
  } catch (err) {
    console.error('❌ Connection error:', err);
  }
}
main();

// Schemas
const orderSchema = new Schema({
  item: String,
  price: Number
});

const customerSchema = new Schema({
  name: String,
  orders: [{
    type: Schema.Types.ObjectId,
    ref: 'order'
  }]
});

// Models (⚡ must be before using them)
const order = mongoose.model('order', orderSchema);
const customer = mongoose.model('customer', customerSchema);

// Function to add customer + orders
const addCustomer = async () => {
  try {
    let o1 = new order({ item: 'laptop', price: 1200 });
    let o2 = new order({ item: 'phone', price: 800 });

    await o1.save();
    await o2.save();

    let c1 = new customer({ name: 'Alice', orders: [o1._id, o2._id] });
    await c1.save();

    console.log('✅ Saved Customer:');
    console.log(c1);
  } catch (err) {
    console.error('❌ Error saving customer:', err);
  }
};

// Call the function
addCustomer();
const showCustomer = async () => {
  let result = await customer.findOne({ name: 'Alice' }).populate('orders');
  console.log(result);
};
showCustomer();
