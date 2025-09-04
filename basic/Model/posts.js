const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// MongoDB connection
async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/relation');
    console.log('✅ Connected to DB');
  } catch (err) {
    console.error('❌ Connection error:', err);
  }
}
main();

const userSchema = new Schema({
  username: String,
  email: String
});

const postSchema = new Schema({
  content: String,
  likes: Number,
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});

// ✅ Models use PascalCase
const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);

const adddata = async () => {
  let existingUser = await User.findOne({ username: 'john' });

  if (existingUser) { 
    console.log('User already exists:', existingUser);
    return;
  }

  let newUser1 = new User({ username: 'ram', email: 'kk@sdfk' });
  let newUser  = new User({ username: 'shivam', email: 'sads@dfk' });

  let post11 = new Post({ content: 'my first post1', likes: 1010, user: newUser._id });
  let post1  = new Post({ content: 'my first post', likes: 10, user: newUser._id });

  await newUser1.save();
  await post11.save();
  await newUser.save();
  await post1.save();

  console.log('✅ Saved User and Post:');
  console.log(newUser);
  console.log(post1);
};
// adddata();

const showdata = async () => {
  let result = await Post.findOne({ content: 'my first post1' }).populate('user');
  console.log('✅ Post with populated user:');
  console.log(result);
};
showdata();

const deletedata = async () => {
  try {
    // Replace with a valid ObjectId from your DB
    let result = await User.deleteOne({ _id: new mongoose.Types.ObjectId("68b9723ae9803e213889952f") });
    console.log('✅ Delete result:', result);
  } catch (err) {
    console.error("❌ Error deleting user:", err);
  }
};

deletedata();
