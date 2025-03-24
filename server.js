import express from 'express';
import { ObjectId } from 'mongodb';
import connectDB from './db.js';
import User from './models/user.js';
connectDB();

const app = express();
const port = 3000;
app.use(express.json());

app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }
    const user = await User.findById(id);
    if (user.age < 21) {
      return res.status(400).json({ error: 'User is under 21' });
    }
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});