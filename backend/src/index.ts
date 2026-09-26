import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 4000);
const JWT_SECRET = process.env.JWT_SECRET || 'development_secret';

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

const users = [{
  id: 1,
  fullName: 'Aisha Rahman',
  email: 'aisha@example.com',
  passwordHash: 'demo-user',
  headline: 'Senior Product Designer',
  about: 'Design systems lead focused on product clarity and user experience.'
}];

const posts = [
  {
    id: 1,
    author: 'Aisha Rahman',
    role: 'Senior Product Designer',
    content: 'Just shipped a new onboarding flow that improved activation by 22%.',
    likes: 128,
    comments: 24,
    time: '2h ago'
  },
  {
    id: 2,
    author: 'Daniel Kim',
    role: 'Frontend Engineer',
    content: 'We are hiring frontend engineers for a fast-growing AI product team.',
    likes: 89,
    comments: 13,
    time: '5h ago'
  }
];

const jobs = [
  { id: 1, title: 'Senior Frontend Engineer', company: 'Northstar Labs', location: 'Remote', type: 'Full-time' },
  { id: 2, title: 'Product Designer', company: 'Nova Studio', location: 'Hybrid', type: 'Full-time' },
  { id: 3, title: 'Data Analyst', company: 'Orion Cloud', location: 'New York, NY', type: 'Contract' }
];

const connections = [
  { id: 1, name: 'Sofia Chen', role: 'Product Manager', status: 'Connected' },
  { id: 2, name: 'Rafael Costa', role: 'Growth Lead', status: 'Pending' },
  { id: 3, name: 'Maya Patel', role: 'Software Engineer', status: 'Connected' }
];

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'LinkedIn Clone API is running' });
});

app.post('/api/auth/signup', (req, res) => {
  const { fullName, email, password } = req.body ?? {};

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: 'fullName, email, and password are required' });
  }

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const newUser = {
    id: users.length + 1,
    fullName,
    email,
    passwordHash: 'hashed-password-placeholder',
    headline: 'New member',
    about: 'Freshly joined the network.'
  };

  users.push(newUser);

  const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '7d' });

  return res.status(201).json({
    message: 'User created successfully',
    user: { id: newUser.id, fullName, email },
    token
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    return res.status(400).json({ message: 'email and password are required' });
  }

  const user = users.find((entry) => entry.email === email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

  return res.json({
    message: 'Login successful',
    user: { id: user.id, fullName: user.fullName, email: user.email },
    token
  });
});

app.get('/api/profile', (_req, res) => {
  const user = users[0];
  return res.json({
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      headline: user.headline,
      about: user.about,
      skills: ['Design Systems', 'UX Research', 'Figma', 'Prototyping']
    }
  });
});

app.get('/api/posts', (_req, res) => {
  return res.json({ posts });
});

app.get('/api/network', (_req, res) => {
  return res.json({ connections });
});

app.get('/api/jobs', (_req, res) => {
  return res.json({ jobs });
});

app.get('/api/messages', (_req, res) => {
  return res.json({
    threads: [
      { id: 1, name: 'Ibrahim Ali', time: '2m ago', unread: true },
      { id: 2, name: 'Nina Gomez', time: '18m ago', unread: false },
      { id: 3, name: 'Jason Reed', time: '1h ago', unread: false }
    ]
  });
});

app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
