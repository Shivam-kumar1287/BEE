const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Connect to MongoDB
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

// Define schema
const userSchema = new Schema({
  userName: String,
  address: {
    location: String,
    city: String,
  }
});

// Create model
const User = mongoose.model('User', userSchema);

// Add users
const adduser = async () => {
  try {
    const u1 = new User({ userName: 'John', address: { location: '123 Main St', city: 'New York' } });
    const u2 = new User({ userName: 'Jane', address: { location: '456 Maple Ave', city: 'Los Angeles' } });

    await u1.save();
    await u2.save();

    console.log('Saved Users:');
    console.log(u1);
    console.log(u2);
  } catch (err) {
    console.error('Error saving users:', err);
  }
};

// setTimeout(adduser, 1000);